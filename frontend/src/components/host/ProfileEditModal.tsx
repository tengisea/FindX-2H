"use client";

import { useState, useRef } from "react";
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

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [updateOrganizer, { loading }] = useUpdateOrganizerMutation({
        onCompleted: (data) => {
            alert("Профайл амжилттай шинэчлэгдлээ!");
            onSuccess?.();
            onClose();
        },
        onError: (error) => {
            alert(`Профайл шинэчлэхэд алдаа гарлаа: ${error.message}`);
        },
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Зөвхөн зураг файл оруулна уу');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Файлын хэмжээ 5MB-аас бага байх ёстой');
                return;
            }

            setLogoFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveFile = () => {
        setLogoFile(null);
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.organizationName.trim() || !formData.email.trim() || (!formData.logo.trim() && !logoFile)) {
            alert("Бүх заавал оруулах талбарыг бөглөнө үү");
            return;
        }

        if (!formData.email.includes("@")) {
            alert("Зөв и-мэйл хаяг оруулна уу");
            return;
        }

        try {
            let logoUrl = formData.logo.trim();

            // If a file is selected, convert it to base64
            if (logoFile) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const base64String = e.target?.result as string;
                    await updateOrganizer({
                        variables: {
                            updateOrganizerId: organizerId,
                            input: {
                                organizationName: formData.organizationName.trim(),
                                email: formData.email.trim(),
                                logo: base64String,
                            }
                        }
                    });
                };
                reader.readAsDataURL(logoFile);
            } else {
                await updateOrganizer({
                    variables: {
                        updateOrganizerId: organizerId,
                        input: {
                            organizationName: formData.organizationName.trim(),
                            email: formData.email.trim(),
                            logo: logoUrl,
                        }
                    }
                });
            }
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
        setLogoFile(null);
        setLogoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="md"
            className="bg-white"
            showCloseButton={false}
        >
            <form onSubmit={handleSubmit}>
                {/* Custom Header */}
                <div className="flex items-center justify-between p-4 sm:p-6  bg-white">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-semibold text-black leading-none truncate">
                            Профайл засах
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Байгууллагын мэдээлэл шинэчлэх
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="ml-2 sm:ml-4 h-8 w-8 text-gray-600 hover:text-black hover:bg-gray-100 flex-shrink-0"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Хаах</span>
                    </Button>
                </div>

                <ModalContent className="bg-white">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="organizationName" className="text-black">
                                Байгууллагын нэр *
                            </Label>
                            <Input
                                id="organizationName"
                                type="text"
                                value={formData.organizationName}
                                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                                placeholder="Байгууллагын нэр оруулна уу"
                                required
                                disabled={loading}
                                className="bg-white border-gray-300 text-black placeholder:text-gray-500 "
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-black">
                                И-мэйл хаяг *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                placeholder="И-мэйл хаяг оруулна уу"
                                required
                                disabled={loading}
                                className="bg-white border-gray-300 text-black placeholder:text-gray-500 "
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo" className="text-black">
                                Лого зураг *
                            </Label>

                            {/* File Upload Section */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="logo-file"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={loading}
                                        className="text-black border-gray-300 hover:bg-gray-50"
                                    >
                                        Файл сонгох
                                    </Button>
                                    {logoFile && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleRemoveFile}
                                            disabled={loading}
                                            className="text-red-600 border-red-300 hover:bg-red-50"
                                        >
                                            Устгах
                                        </Button>
                                    )}
                                </div>

                                {/* Logo Preview */}
                                {(logoPreview || formData.logo) && (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                                            <img
                                                src={logoPreview || formData.logo}
                                                alt="Logo preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {logoFile ? `Сонгосон файл: ${logoFile.name}` : 'Одоогийн лого'}
                                        </div>
                                    </div>
                                )}

                                {/* URL Input as fallback */}
                                <div className="text-sm text-gray-500">
                                    Эсвэл URL хаяг оруулна уу:
                                </div>
                                <Input
                                    id="logo"
                                    type="url"
                                    value={formData.logo}
                                    onChange={(e) => handleInputChange("logo", e.target.value)}
                                    placeholder="Лого URL оруулна уу"
                                    disabled={loading || !!logoFile}
                                    className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                                />
                            </div>
                        </div>
                    </div>
                </ModalContent>

                <ModalFooter className="bg-white border-gray-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        disabled={loading}
                        className="text-black border-gray-300 hover:bg-gray-50"
                    >
                        Цуцлах
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="min-w-[100px] bg-[#FF8400] text-white hover:opacity-80"
                    >
                        {loading ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4  border-white"></div>
                                <span>Хадгалж байна...</span>
                            </div>
                        ) : (
                            "Хадгалах"
                        )}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default ProfileEditModal;