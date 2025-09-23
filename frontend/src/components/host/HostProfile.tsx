"use client";

import { useState, useEffect } from "react";
import { useGetOrganizerQuery } from "@/generated";
import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import ProfileEditModal from "./ProfileEditModal";
import { OlympiadDetailModal } from "./OlympiadDetailModal";


interface HostProfileProps {
    organizerId: string;
    onNavigateToManage?: () => void;
}

const HostProfile = ({ organizerId, onNavigateToManage }: HostProfileProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOlympiadId, setSelectedOlympiadId] = useState<string | null>(null);

    const { data: organizerData, loading, error, refetch } = useGetOrganizerQuery({
        variables: { getOrganizerId: organizerId },
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network'
    });

    const organizer = organizerData?.getOrganizer;
    const olympiads = organizer?.Olympiads || [];

    // Debug: Log olympiad data to see what we're getting
    console.log("Olympiads from organizer query:", olympiads);
    console.log("Sample olympiad:", olympiads[0]);

    // Date formatting function
    const formatDate = (dateString?: string | null) => {
        if (!dateString || dateString === null || dateString === undefined || dateString === "") {
            return "Set date";
        }

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return "Invalid date";
            }
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch (error) {
            console.error("Date formatting error:", error, "for date:", dateString);
            return "Invalid date";
        }
    };

    // Refetch data when component mounts or organizerId changes
    useEffect(() => {
        refetch();
    }, [organizerId, refetch]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">
                    Error loading profile: {error.message}
                </p>
            </div>
        );
    }

    if (!organizer) {
        return (
            <div className="p-4 bg-muted/10 border border-muted/20 rounded-lg">
                <p className="text-muted-foreground text-sm">No profile data available</p>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'UNDER_REVIEW':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'CLOSED':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'FINISHED':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'OPEN':
                return 'Active';
            case 'UNDER_REVIEW':
                return 'Under Review';
            case 'CLOSED':
                return 'Closed';
            case 'FINISHED':
                return 'Finished';
            default:
                return status;
        }
    };

    return (
        <div className="space-y-6">
            {/* Profile Header */}
            <Card className="p-6">
                <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden">
                        {organizer.logo ? (
                            <img
                                src={organizer.logo}
                                alt={`${organizer.organizationName} logo`}
                                className="w-full h-full object-cover rounded-2xl"
                                onError={(e) => {
                                    // Fallback to default icon if image fails to load
                                    e.currentTarget.style.display = 'none';
                                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                    if (nextElement) {
                                        nextElement.style.display = 'block';
                                    }
                                }}
                            />
                        ) : null}
                        <svg
                            className={`w-10 h-10 text-primary ${organizer.logo ? 'hidden' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-black mb-2">
                                {organizer.organizationName}
                            </h2>
                            <div className="flex items-center space-x-2">
                                <Button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="text-white hover:opacity-80 text-sm font-medium bg-[#FF8400]"
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </div>
                        <p className="text-muted-foreground mb-4">{organizer.email}</p>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center   space-x-2">
                                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm text-muted-foreground">
                                    Member since {new Date().getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Recent Olympiads */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-black">Recent Olympiads</h3>
                </div>

                {olympiads.length === 0 ? (
                    <div className="text-center py-8">
                        <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <p className="text-muted-foreground">No olympiads created yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Create your first olympiad to get started</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {olympiads.slice(0, 5).map((olympiad) => (
                            <div
                                key={olympiad.id}
                                className="flex items-center justify-between p-4 bg-white rounded-lg border-b border-gray-200 cursor-pointer hover:bg-white transition-colors"
                                onClick={() => setSelectedOlympiadId(olympiad.id)}
                            >
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h4 className="font-medium text-black">{olympiad.name}</h4>
                                        <span className="px-3 py-1 rounded-full text-sm font-medium  bg-[#ff8400] text-white">
                                            {olympiad.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{olympiad.description}</p>

                                    {/* Date Information */}
                                    <div className="flex items-center space-x-4 text-xs">
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className={!olympiad.closeDay ? "text-orange-500" : "text-muted-foreground"}>
                                                Close: {formatDate(olympiad.closeDay)}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className={!olympiad.occurringDay ? "text-orange-500" : "text-muted-foreground"}>
                                                Event: {formatDate(olympiad.occurringDay)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Profile Edit Modal */}
            {organizer && (
                <ProfileEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    organizerId={organizerId}
                    currentData={{
                        organizationName: organizer.organizationName,
                        email: organizer.email,
                        logo: organizer.logo,
                    }}
                    onSuccess={() => {
                        refetch();
                    }}
                />
            )}

            {/* Olympiad Detail Modal */}
            {selectedOlympiadId && (
                <OlympiadDetailModal
                    isOpen={!!selectedOlympiadId}
                    onClose={() => {
                        setSelectedOlympiadId(null);
                        // Refetch organizer data to ensure consistency
                        refetch();
                    }}
                    olympiadId={selectedOlympiadId}
                    onEdit={() => {
                        setSelectedOlympiadId(null);
                        if (onNavigateToManage) {
                            onNavigateToManage();
                        }
                    }}
                />
            )}
        </div>
    );
};

export default HostProfile;