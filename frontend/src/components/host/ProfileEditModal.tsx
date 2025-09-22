"use client";

import { useState } from "react";
import { Modal, ModalContent, ModalFooter } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateOrganizerMutation } from "@/generated";

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    organizerId: string;
    currentData: {
        organizationName: string;
        email: string;
        logo: string;
    };
    onSuccess?: () => void;
}

const ProfileEditModal = ({
    isOpen,
    onClose,
    organizerId,
    currentData,
    onSuccess
}: ProfileEditModalProps) => {
    const [formData, setFormData] = useState({
        organizationName: currentData.organizationName,
        email: currentData.email,
        logo: currentData.logo,
    });

    const [updateOrganizer, { loading }] = useUpdateOrganizerMutation({
        onCompleted: (data) => {
            alert("Profile updated successfully!");
            onSuccess?.();
            onClose();
        },
        onError: (error) => {
            alert(`Failed to update profile: ${error.message}`);
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.organizationName.trim() || !formData.email.trim() || !formData.logo.trim()) {
            alert("Please fill in all required fields");
            return;
        }

        if (!formData.email.includes("@")) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            await updateOrganizer({
                variables: {
                    updateOrganizerId: organizerId,
                    input: {
                        organizationName: formData.organizationName.trim(),
                        email: formData.email.trim(),
                        logo: formData.logo.trim(),
                    }
                }
            });
        } catch (error) {
            console.error("Error updating organizer:", error);
        }
    };

    const handleClose = () => {
        // Reset form data to current values when closing
        setFormData({
            organizationName: currentData.organizationName,
            email: currentData.email,
            logo: currentData.logo,
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="md"
            className="bg-card"
            showCloseButton={false}
        >
            <form onSubmit={handleSubmit}>
                {/* Custom Header */}
                <div className="flex items-center justify-between p-4 sm:p-6  bg-card">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold text-white leading-none truncate">
                            Edit Profile
                        </h2>
                        <p className="text-sm text-gray-300 mt-1">
                            Update your organization information
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="ml-2 sm:ml-4 h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 flex-shrink-0"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <ModalContent className="bg-card">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="organizationName" className="text-white">
                                Organization Name *
                            </Label>
                            <Input
                                id="organizationName"
                                type="text"
                                value={formData.organizationName}
                                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                                placeholder="Enter organization name"
                                required
                                disabled={loading}
                                className="bg-card border-gray-500 text-white placeholder:text-gray-400 "
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">
                                Email Address *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="Enter email address"
                                required
                                disabled={loading}
                                className="bg-card border-gray-500 text-white placeholder:text-gray-400 "
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo" className="text-white">
                                Logo URL *
                            </Label>
                            <Input
                                id="logo"
                                type="url"
                                value={formData.logo}
                                onChange={(e) => handleInputChange("logo", e.target.value)}
                                placeholder="Enter logo URL"
                                required
                                disabled={loading}
                                className="bg-card border-gray-500 text-white placeholder:text-gray-400 "
                            />
                        </div>
                    </div>
                </ModalContent>

                <ModalFooter className="bg-card border-black">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading}
                        className="text-white  hover:opacity-80"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="min-w-[100px] bg-[#FF8400] text-black hover:opacity-80"
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4  border-black"></div>
                                <span>Saving...</span>
                            </div>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default ProfileEditModal;