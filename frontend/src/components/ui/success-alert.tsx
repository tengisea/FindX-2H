'use client';
import { useState, useEffect } from 'react';

interface SuccessAlertProps {
    handleGoToManageOlympiad: () => void;
}

const SuccessAlert: React.FC<SuccessAlertProps> = ({ handleGoToManageOlympiad }) => {
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(false);

    // Анимацыг эхлүүлэх ба товчийг хойшлуулах
    useEffect(() => {
        setShowSuccessAlert(true);

        // SVG анимацын хугацаа (3 секунд) дууссаны дараа товчийг харуулах
        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 3000); // 3 секундтэй тааруулсан

        // Компонент unmount хийгдэхэд state цэвэрлэнэ
        return () => {
            setShowSuccessAlert(false);
            setShowButton(false);
            clearTimeout(buttonTimer);
        };
    }, []);

    return (
        <>
            {showSuccessAlert && (
                <div className="flex justify-center items-center mb-4 animate-in slide-in-from-top-2 duration-500">
                    <div className="flex-col w-fit max-w-md animate-in fade-in-0 zoom-in-95 duration-300 flex items-center justify-center">
                        <svg
                            className="h-70 w-70 text-[#FF8400] check-animation"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="draw"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        {showButton && (
                            <div className="mt-2 flex justify-center animate-in slide-in-from-bottom-2 duration-500">
                                <button
                                    onClick={handleGoToManageOlympiad}
                                    className="bg-[#FF8400] text-white rounded-xl hover:opacity-80 text-xl px-5 py-2 transition-all duration-200 hover:scale-105"
                                >
                                    Олимпиадруу очих
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <style>
                {`
          .check-animation .draw {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
            animation: draw 2.3s ease-in-out forwards;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
            </style>
        </>
    );
};

export default SuccessAlert;