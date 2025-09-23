"use client";

import React, { useState, useEffect } from "react";
import { uploadMultipleToCloudinary } from "@/utils/cloudinary";

interface StudentAnswerFormProps {
    studentAnswer: any;
    questions: any[];
    classType: any;
    onUpdateScore: (options: { variables: { studentAnswerId: string; questionId: string; score: number } }) => Promise<any>;
    onAddResult: (options: { variables: { input: any } }) => Promise<any>;
}

export const StudentAnswerForm: React.FC<StudentAnswerFormProps> = ({
    studentAnswer,
    questions,
    classType,
    onUpdateScore,
    onAddResult
}) => {
    const [answers, setAnswers] = useState<any[]>([]);
    const [uploadedImages, setUploadedImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateTimeout, setUpdateTimeout] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (studentAnswer?.answers && studentAnswer.answers.length > 0) {
            setAnswers([...studentAnswer.answers]);
        } else if (questions.length > 0) {
            // Initialize with empty answers for each question
            const initialAnswers = questions.map(question => ({
                questionId: question.id,
                score: 0,
                description: ""
            }));
            setAnswers(initialAnswers);
        } else {
            setAnswers([]);
        }
    }, [studentAnswer, questions]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }
        };
    }, [updateTimeout]);

    const handleScoreChange = async (questionId: string, newScore: number) => {
        
        const question = questions.find(q => q.id === questionId);
        if (!question) {
            console.error("❌ Question not found for ID:", questionId);
            return;
        }

        // Validate score is within bounds
        const score = Math.max(0, Math.min(newScore, question.maxScore));

        // Store previous score for potential revert
        const previousAnswer = answers.find(a => a.questionId === questionId);
        const previousScore = previousAnswer?.score || 0;

        // Update local state - ensure we have an answer for this question
        setAnswers(prev => {
            const existingAnswer = prev.find(a => a.questionId === questionId);
            
            if (existingAnswer) {
                // Update existing answer
                const updated = prev.map(answer => 
                    answer.questionId === questionId 
                        ? { ...answer, score }
                        : answer
                );
                return updated;
            } else {
                // Add new answer for this question only
                const newAnswer = {
                    questionId,
                    score,
                    description: ""
                };
                const updated = [...prev, newAnswer];
                return updated;
            }
        });

        // Update in database if student answer exists (with debounce)
        if (studentAnswer?.id) {
            // Clear existing timeout
            if (updateTimeout) {
                clearTimeout(updateTimeout);
            }
            
            // Set new timeout for debounced update
            const timeout = setTimeout(async () => {
                try {
                    await onUpdateScore({
                        variables: { studentAnswerId: studentAnswer.id, questionId, score }
                    });
                } catch (error) {
                    console.error("Error updating score:", error);
                    
                    // Check if it's a version conflict error
                    if (error instanceof Error && error.message && error.message.includes("No matching document found")) {
                        // Don't revert on version conflict, let the parent component refetch
                        return;
                    }
                    
                    // Revert local state on other errors
                    setAnswers(prev => {
                        const updated = prev.map(answer => 
                            answer.questionId === questionId 
                                ? { ...answer, score: previousScore }
                                : answer
                        );
                        return updated;
                    });
                }
            }, 500); // 500ms debounce
            
            setUpdateTimeout(timeout);
        }
    };

    const handleDescriptionChange = (questionId: string, description: string) => {
        setAnswers(prev => prev.map(answer => 
            answer.questionId === questionId 
                ? { ...answer, description }
                : answer
        ));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setUploadedImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (index: number) => {
        setUploadedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!studentAnswer?.id) return;

        setIsSubmitting(true);
        try {
            // Upload images to Cloudinary
            let imageUrls: string[] = [];
            if (uploadedImages.length > 0) {
                console.log("Uploading images to Cloudinary...");
                try {
                    imageUrls = await uploadMultipleToCloudinary(uploadedImages);
                    console.log("Images uploaded successfully:", imageUrls);
                } catch (cloudinaryError) {
                    console.error("Cloudinary upload failed:", cloudinaryError);
                    // Fallback: use local blob URLs temporarily
                    console.log("Using local blob URLs as fallback...");
                    imageUrls = uploadedImages.map(file => URL.createObjectURL(file));
                    alert("Image upload to Cloudinary failed. Using temporary URLs. Please set up Cloudinary upload preset for permanent storage.");
                }
            }
            
            // Include all answers (including those with score 0)
            const validAnswers = answers.filter(answer => 
                answer.score >= 0 || (answer.description && answer.description.trim() !== "")
            );
            
            console.log("Submitting answers:", validAnswers);
            console.log("Image URLs:", imageUrls);
            
            await onAddResult({
                variables: {
                    input: {
                        studentAnswerId: studentAnswer.id,
                        answers: validAnswers,
                        image: imageUrls
                    }
                }
            });
            
            console.log("Result submitted successfully!");
        } catch (error) {
            console.error("Error submitting result:", error);
            alert("Error submitting result. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateTotalScore = () => {
        return answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
    };

    const getScoreColor = (score: number, maxScore: number) => {
        const percentage = (score / maxScore) * 100;
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    if (!studentAnswer || !questions.length) return null;

    return (
        <div className="space-y-6">
            {/* Student Info Header */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-xl font-bold text-foreground">
                            Student {studentAnswer.mandatNumber}
                        </h4>
                        <p className="text-muted-foreground">
                            Grade {classType.classYear.replace('GRADE_', '')} - {questions.length} Questions
                        </p>
                    </div>
                    <div className="text-right">
                        <div className={`text-3xl font-bold ${getScoreColor(calculateTotalScore(), classType.maxScore)}`}>
                            {calculateTotalScore()}/{classType.maxScore}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {Math.round((calculateTotalScore() / classType.maxScore) * 100)}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions and Scoring */}
            <div className="space-y-4">
                <h5 className="text-lg font-semibold text-foreground">Question Scoring</h5>
                {questions.map((question, index) => {
                    const answer = answers.find(a => a.questionId === question.id);
                    const score = answer?.score || 0;
                    
                    return (
                        <div key={question.id} className="bg-card rounded-lg border border-border p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h6 className="font-medium text-foreground mb-2">
                                        Question {index + 1}: {question.questionName}
                                    </h6>
                                    <p className="text-sm text-muted-foreground">
                                        Maximum Score: {question.maxScore} points
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className={`text-2xl font-bold ${getScoreColor(score, question.maxScore)}`}>
                                        {score}/{question.maxScore}
                                    </div>
                                </div>
                            </div>

                            {/* Score Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Score
                                </label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        min="0"
                                        max={question.maxScore}
                                        value={score}
                                        onChange={(e) => handleScoreChange(question.id, parseInt(e.target.value) || 0)}
                                        className="w-24 px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Description/Notes */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Notes/Description
                                </label>
                                <textarea
                                    value={answer?.description || ""}
                                    onChange={(e) => handleDescriptionChange(question.id, e.target.value)}
                                    placeholder="Add notes about the student's answer..."
                                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Image Upload */}
            <div className="bg-card rounded-lg border border-border p-6">
                    <h5 className="text-lg font-semibold text-foreground mb-4">Upload Student's Exam Paper</h5>
                    
                    <div className="mb-4">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    {/* Uploaded Images Preview */}
                    {uploadedImages.length > 0 && (
                        <div className="space-y-2">
                            <h6 className="font-medium text-foreground">Uploaded Images:</h6>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {uploadedImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Upload ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg border border-border"
                                        />
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                        <span>{isSubmitting ? "Saving..." : "Save Results"}</span>
                    </button>
                </div>

            {/* Existing Images Display */}
            {studentAnswer.image && studentAnswer.image.length > 0 && (
                <div className="bg-card rounded-lg border border-border p-6">
                    <h5 className="text-lg font-semibold text-foreground mb-4">Student's Exam Paper</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {studentAnswer.image.map((imageUrl: string, index: number) => (
                            <div key={index} className="relative">
                                <img
                                    src={imageUrl}
                                    alt={`Exam paper ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border border-border"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
