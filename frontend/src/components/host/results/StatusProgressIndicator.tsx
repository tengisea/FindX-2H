"use client";

import React from "react";

interface StatusProgressIndicatorProps {
    status: string;
    getStatusColor: (status: string) => string;
    getStatusDescription: (status: string) => string;
}

const statusSteps = [
    { key: "DRAFT", label: "Идэвхгүй" },
    { key: "OPEN", label: "Нээлттэй" },
    { key: "CLOSED", label: "Хаалттай" },
    { key: "MEDALS_PREVIEW", label: "Медал урьдчилан харах" },
    { key: "FINISHED", label: "Дууссан" }
];

export const StatusProgressIndicator: React.FC<StatusProgressIndicatorProps> = ({
    status,
    getStatusColor,
    getStatusDescription
}) => {
    const currentStepIndex = statusSteps.findIndex(step => step.key === status);

    return (
        <div className="mb-6">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary">
                        Олимпиадын төлөв
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
                        {statusSteps.find(step => step.key === status)?.label || status}
                    </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                    {getStatusDescription(status)}
                </p>

                {/* Progress Steps */}
                <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => {
                        const isActive = index <= currentStepIndex;
                        const isCurrent = index === currentStepIndex;

                        return (
                            <div key={step.key} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${isActive
                                        ? isCurrent
                                            ? "bg-primary text-primary-foreground shadow-lg"
                                            : "bg-primary/20 text-primary"
                                        : "bg-muted text-muted-foreground"
                                    }`}>
                                    {isActive ? index + 1 : index + 1}
                                </div>
                                <span className={`text-xs mt-2 text-center ${isActive ? "text-foreground font-medium" : "text-muted-foreground"
                                    }`}>
                                    {step.label}
                                </span>

                                {/* Connector Line */}
                                {index < statusSteps.length - 1 && (
                                    <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${index < currentStepIndex ? "bg-primary" : "bg-muted"
                                        }`} style={{ transform: 'translateX(50%)' }} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
