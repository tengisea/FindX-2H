"use client";
import React, { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { getProvinceName } from "@/lib/province-utils";
import { formatClassYear, formatDateShortMongolian } from "@/lib/dateUtils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MandatData {
  mandatNumber: string;
  studentName: string;
  studentEmail: string;
  school: string;
  class: string;
  province: string;
  region: string;
  olympiadName: string;
  olympiadLocation: string;
  olympiadDate: string;
  classType: string;
  roomNumber?: string;
  organizerName: string;
  organizerLogo?: string;
  registrationDate: string;
  studentPhoto?: string;
}

interface Props {
  mandatData: MandatData;
  variant?: "classic" | "modern" | "elegant" | "premium";
  onBack?: () => void;
  showBackButton?: boolean;
  hideControls?: boolean;
}

// Enhanced lighting setup
function PremiumLighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.elapsedTime;
      lightRef.current.intensity = 1.2 + Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} color="#f8fafc" />
      <directionalLight
        ref={lightRef}
        position={[10, 10, 5]}
        intensity={1.0}
        color="#ffffff"
        castShadow={false}
      />
    </>
  );
}

// Removed particle functions for cleaner 3D view

function PremiumMandatMesh({
  mandatData,
  variant = "premium",
  onShowModal,
}: {
  mandatData: MandatData;
  variant: "classic" | "modern" | "elegant" | "premium";
  onShowModal?: () => void;
}) {
  const ref = useRef<THREE.Group>(null!);
  const cardRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showBack, setShowBack] = useState(false);

  useFrame((state, delta) => {
    if (ref.current && cardRef.current) {
      const time = state.clock.elapsedTime;

      // Gentle floating animation
      ref.current.position.y = Math.sin(time * 0.8) * 0.15;
      ref.current.position.x = Math.sin(time * 0.4) * 0.08;
      ref.current.position.z = Math.cos(time * 0.6) * 0.05;

      // Smooth rotation transitions
      const targetRotationY = showBack ? Math.PI : 0;
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        targetRotationY,
        3 * delta
      );

      // Subtle breathing effect
      const baseScale = hovered ? 1.03 : 1.0;
      const breathScale = 1 + Math.sin(time * 1.2) * 0.01;
      const targetScale = baseScale * breathScale;

      cardRef.current.scale.setScalar(
        THREE.MathUtils.lerp(cardRef.current.scale.x, targetScale, 4 * delta)
      );

      // Gentle rotation on hover
      if (hovered) {
        cardRef.current.rotation.x = THREE.MathUtils.lerp(
          cardRef.current.rotation.x,
          Math.sin(time * 0.6) * 0.03,
          2 * delta
        );
        cardRef.current.rotation.z = THREE.MathUtils.lerp(
          cardRef.current.rotation.z,
          Math.cos(time * 0.4) * 0.02,
          2 * delta
        );
      }
    }
  });

  const getVariantColors = () => {
    const variants = {
      classic: {
        primary: "#ffffff",
        secondary: "#ffffff",
        accent: "#ffffff",
        gold: "#000000",
        background: "#ffffff",
        text: "#000000",
        border: "#ffffff",
        header: "#ffffff",
      },
      modern: {
        primary: "#ffffff",
        secondary: "#ffffff",
        accent: "#ffffff",
        gold: "#000000",
        background: "#ffffff",
        text: "#000000",
        border: "#ffffff",
        header: "#ffffff",
      },
      elegant: {
        primary: "#ffffff",
        secondary: "#ffffff",
        accent: "#ffffff",
        gold: "#000000",
        background: "#ffffff",
        text: "#000000",
        border: "#ffffff",
        header: "#ffffff",
      },
      premium: {
        primary: "#ffffff",
        secondary: "#ffffff",
        accent: "#ffffff",
        gold: "#000000",
        background: "#ffffff",
        text: "#000000",
        border: "#ffffff",
        header: "#ffffff",
      },
    };
    return variants[variant];
  };

  const colors = getVariantColors();

  return (
    <group ref={ref}>
      <group
        ref={cardRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          // Only flip the card, don't open modal when already in a modal
          setClicked(!clicked);
          setShowBack(!showBack);
        }}
      >
        {/* Main Card Background - Vertical ID Card Style */}
        <RoundedBox args={[2.2, 3.5, 0.02]} radius={0.08}>
          <meshStandardMaterial
            color={colors.background}
            metalness={0.0}
            roughness={1.0}
          />
        </RoundedBox>

        {/* Front Side Content - ID Card Style */}
        {!showBack && (
          <>
            {/* Header Title */}
            <Text
              position={[0, 1.4, 0.02]}
              fontSize={0.12}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              ОЛИМПИАД МАНДАТ
            </Text>

            {/* Mandat Number */}
            <Text
              position={[0, 1.1, 0.02]}
              fontSize={0.08}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              № {mandatData.mandatNumber}
            </Text>

            {/* Student Photo */}
            <RoundedBox
              args={[0.6, 0.8, 0.01]}
              radius={0.05}
              position={[-0.7, 0.4, 0.01]}
            >
              <meshStandardMaterial
                color="#ffffff"
                metalness={0.0}
                roughness={1.0}
              />
            </RoundedBox>

            {/* Photo Text or Image */}
            {mandatData.studentPhoto ? (
              <Text
                position={[-0.7, 0.4, 0.02]}
                fontSize={0.04}
                color="#000000"
                anchorX="center"
                anchorY="middle"
              >
                [ФОТО]
              </Text>
            ) : (
              <Text
                position={[-0.7, 0.4, 0.02]}
                fontSize={0.04}
                color="#000000"
                anchorX="center"
                anchorY="middle"
              >
                ЗУРАГ
              </Text>
            )}

            {/* Student Name */}
            <Text
              position={[-0.3, 0.6, 0.02]}
              fontSize={0.1}
              color="#000000"
              anchorX="left"
              anchorY="middle"
              fontWeight="bold"
            >
              {mandatData.studentName}
            </Text>

            {/* School */}
            <Text
              position={[-0.3, 0.4, 0.02]}
              fontSize={0.06}
              color="#000000"
              anchorX="left"
              anchorY="middle"
              maxWidth={1.2}
            >
              {mandatData.school}
            </Text>

            {/* Class */}
            <Text
              position={[-0.3, 0.2, 0.02]}
              fontSize={0.06}
              color="#000000"
              anchorX="left"
              anchorY="middle"
            >
              {formatClassYear(mandatData.class)}
            </Text>

            {/* Event Title */}
            <Text
              position={[0, 0.0, 0.02]}
              fontSize={0.08}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
            >
              {mandatData.olympiadName}
            </Text>

            {/* Event Details */}
            <Text
              position={[0, -0.15, 0.02]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.8}
            >
              {mandatData.olympiadLocation}
            </Text>

            <Text
              position={[0, -0.3, 0.02]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              {formatDateShortMongolian(mandatData.olympiadDate)}
            </Text>

            {/* Organizer Section */}
            <Text
              position={[0, -0.7, 0.02]}
              fontSize={0.06}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              maxWidth={2.0}
            >
              Зохион байгуулагч: {mandatData.organizerName}
            </Text>

            {/* Registration Date */}
            <Text
              position={[0, -0.9, 0.02]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              Бүртгүүлсэн:{" "}
              {formatDateShortMongolian(mandatData.registrationDate)}
            </Text>

            {/* Room Number if available */}
            {mandatData.roomNumber && (
              <Text
                position={[0, -1.1, 0.02]}
                fontSize={0.05}
                color="#000000"
                anchorX="center"
                anchorY="middle"
              >
                Өрөө: {mandatData.roomNumber}
              </Text>
            )}
          </>
        )}

        {/* Back Side Content - Additional Information */}
        {showBack && (
          <>
            <Text
              position={[0, 1.4, -0.02]}
              fontSize={0.12}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
              fontWeight="bold"
            >
              ДЭЛГЭРЭНГҮЙ МЭДЭЭЛЭЛ
            </Text>

            {/* Contact Information */}
            <Text
              position={[0, 0.8, -0.02]}
              fontSize={0.08}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
              fontWeight="bold"
            >
              Холбоо барих мэдээлэл
            </Text>

            <Text
              position={[0, 0.5, -0.02]}
              fontSize={0.06}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
              maxWidth={2.0}
            >
              {mandatData.organizerName}
            </Text>

            <Text
              position={[0, 0.2, -0.02]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
            >
              Бүртгүүлсэн:{" "}
              {formatDateShortMongolian(mandatData.registrationDate)}
            </Text>

            <Text
              position={[0, -0.1, -0.02]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
            >
              {getProvinceName(mandatData.province)}, {mandatData.region}
            </Text>

            {/* Security Features */}
            <Text
              position={[0, -0.6, -0.02]}
              fontSize={0.04}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
            >
              Энэ мандат зөвхөн хууль ёсны зорилгоор ашиглагдана
            </Text>

            <Text
              position={[0, -0.8, -0.02]}
              fontSize={0.04}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
            >
              © 2025 FindX
            </Text>
          </>
        )}
      </group>
    </group>
  );
}

function FallbackMandat({ mandatData, variant = "premium" }: Props) {
  const getVariantStyles = () => {
    const variants = {
      classic: {
        primaryColor: "#ffffff",
        secondaryColor: "#ffffff",
        accentColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ffffff",
        headerColor: "#ffffff",
        goldColor: "#000000",
      },
      modern: {
        primaryColor: "#ffffff",
        secondaryColor: "#ffffff",
        accentColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ffffff",
        headerColor: "#ffffff",
        goldColor: "#000000",
      },
      elegant: {
        primaryColor: "#ffffff",
        secondaryColor: "#ffffff",
        accentColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ffffff",
        headerColor: "#ffffff",
        goldColor: "#000000",
      },
      premium: {
        primaryColor: "#ffffff",
        secondaryColor: "#ffffff",
        accentColor: "#ffffff",
        backgroundColor: "#ffffff",
        textColor: "#000000",
        borderColor: "#ffffff",
        headerColor: "#ffffff",
        goldColor: "#000000",
      },
    };
    return variants[variant || "premium"];
  };

  const colors = getVariantStyles();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        background: colors.backgroundColor,
        border: "none",
        borderRadius: "0px",
        padding: "0",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: colors.textColor,
        position: "relative",
        overflow: "hidden",
        boxShadow: "none",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          background: colors.backgroundColor,
          color: colors.textColor,
          padding: "20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0 0 8px 0",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          ОЛИМПИАД МАНДАТ
        </h1>
        <div
          style={{
            display: "inline-block",
            background: colors.backgroundColor,
            color: colors.textColor,
            padding: "4px 12px",
            borderRadius: "0px",
            fontSize: "12px",
            fontWeight: "bold",
            border: "none",
          }}
        >
          № {mandatData.mandatNumber}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        {/* Student Photo and Info Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            gap: "15px",
          }}
        >
          {/* Photo Placeholder */}
          <div
            style={{
              width: "80px",
              height: "100px",
              background: colors.backgroundColor,
              border: "none",
              borderRadius: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              color: colors.textColor,
              fontWeight: "bold",
              backgroundImage: mandatData.studentPhoto
                ? `url(${mandatData.studentPhoto})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!mandatData.studentPhoto && "ЗУРАГ"}
          </div>

          {/* Student Information */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: colors.textColor,
                margin: "0 0 8px 0",
                lineHeight: "1.2",
              }}
            >
              {mandatData.studentName}
            </h2>
            <p
              style={{
                fontSize: "12px",
                color: colors.textColor,
                margin: "4px 0",
                lineHeight: "1.3",
              }}
            >
              {mandatData.school}
            </p>
            <div
              style={{
                display: "inline-block",
                background: colors.backgroundColor,
                color: colors.textColor,
                padding: "2px 8px",
                borderRadius: "0px",
                fontSize: "11px",
                border: "none",
                marginTop: "4px",
              }}
            >
              {formatClassYear(mandatData.class)}
            </div>
          </div>
        </div>

        {/* Event Information Section */}
        <div
          style={{
            background: colors.backgroundColor,
            border: "none",
            borderRadius: "0px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              color: colors.headerColor,
              margin: "0 0 10px 0",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {mandatData.olympiadName}
          </h3>
          <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
            <p style={{ margin: "3px 0", textAlign: "center" }}>
              📍 {mandatData.olympiadLocation}
            </p>
            <p style={{ margin: "3px 0", textAlign: "center" }}>
              📅 {formatDateShortMongolian(mandatData.olympiadDate)}
            </p>
            {mandatData.roomNumber && (
              <p style={{ margin: "3px 0", textAlign: "center" }}>
                🏢 Өрөө: {mandatData.roomNumber}
              </p>
            )}
          </div>
        </div>

        {/* Organizer Information */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              color: colors.textColor,
              margin: "3px 0",
            }}
          >
            <strong>Зохион байгуулагч:</strong> {mandatData.organizerName}
          </p>
          <p
            style={{
              fontSize: "10px",
              color: colors.textColor,
              margin: "3px 0",
            }}
          >
            Бүртгүүлсэн: {formatDateShortMongolian(mandatData.registrationDate)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: colors.backgroundColor,
          borderTop: "none",
          padding: "10px",
          textAlign: "center",
          fontSize: "9px",
          color: colors.textColor,
        }}
      >
        <p style={{ margin: "0" }}>© 2025 FindX</p>
      </div>
    </div>
  );
}

export default function EnhancedMandat3D(props: Props) {
  const {
    variant = "premium",
    onBack,
    showBackButton = false,
    hideControls = false,
  } = props;
  const [webglError, setWebglError] = useState(false); // Default to 3D view
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);

  // Debug: Log the mandat data to see what logo is being passed
  React.useEffect(() => {
    console.log("Mandat3D - Props mandatData:", props.mandatData);
    console.log("Mandat3D - Organizer logo:", props.mandatData?.organizerLogo);
  }, [props.mandatData]);

  // Sample data for demonstration
  const sampleData: MandatData = props.mandatData || {
    mandatNumber: "MN-2025-001",
    studentName: "Батбаяр Энхжаргал",
    studentEmail: "batbayar.e@email.com",
    school: "1-р сургууль",
    class: "GRADE_11",
    province: "SUKHBAATAR_DUUREG",
    region: "Сүхбаатар дүүрэг",
    olympiadName: "Математикийн олон улсын олимпиад",
    olympiadLocation: "Монгол Улсын Их Сургууль",
    olympiadDate: "2025-10-15",
    classType: "Ахлах анги",
    roomNumber: "А-205",
    organizerName: "Боловсролын Яам",
    organizerLogo: "/images/MCS_Group_Logo.png", // Add sample logo
    registrationDate: "2025-09-20",
    studentPhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  };

  React.useEffect(() => {
    // WebGL support check
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
          setWebglError(true);
        }
      } catch (error) {
        setWebglError(true);
      }
      setLoading(false);
    };

    setTimeout(checkWebGL, 500);
  }, []);

  const getBackgroundGradient = () => {
    return "#ffffff"; // Pure white background
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: getBackgroundGradient(),
          color: "white",
          fontSize: "18px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(255,255,255,0.3)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p>3D мандат ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "700px",
        height: "700px",
        background: getBackgroundGradient(),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Control Panel */}
      {!hideControls && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 10,
          }}
        >
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              style={{
                padding: "12px 20px",
                background: "#ffffff",
                color: "#000000",
                border: "none",
                borderRadius: "0px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
                backdropFilter: "none",
                transition: "none",
              }}
            >
              🔙 Буцах
            </button>
          )}

          <button
            onClick={() => {
              const printContent = document.querySelector("[data-print]");
              if (printContent) {
                const newWindow = window.open("", "_blank");
                if (newWindow) {
                  newWindow.document.write(`
                  <html>
                    <head>
                      <title>Олимпиад мандат - ${sampleData.mandatNumber}</title>
                      <style>
                        body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
                        @page { size: A4; margin: 20mm; }
                        @media print { body { -webkit-print-color-adjust: exact; } }
                      </style>
                    </head>
                    <body>${printContent.innerHTML}</body>
                  </html>
                `);
                  newWindow.document.close();
                  newWindow.print();
                }
              }
            }}
            style={{
              padding: "12px 20px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "0px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              backdropFilter: "none",
              transition: "none",
            }}
          >
            🖨️ Хэвлэх
          </button>

          <button
            onClick={() => setWebglError(!webglError)}
            style={{
              padding: "12px 20px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "0px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              backdropFilter: "none",
              transition: "none",
            }}
          >
            {webglError ? "🎮 3D харах" : "📄 2D харах"}
          </button>

          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "12px 20px",
              background: "#ffffff",
              color: "#000000",
              border: "none",
              borderRadius: "0px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              backdropFilter: "none",
              transition: "none",
            }}
          >
            🏆 Сертификат харах
          </button>
        </div>
      )}

      {/* Main Content */}
      {webglError ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: "20px",
          }}
        >
          <div data-print>
            <FallbackMandat mandatData={sampleData} variant={variant} />
          </div>
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "#ffffff",
              backdropFilter: "none",
              borderRadius: "0px",
              textAlign: "center",
              color: "#000000",
            }}
          >
            <p
              style={{
                margin: "0 0 15px 0",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              📋 2D форматаар мандат харуулж байна
            </p>
            <p style={{ margin: "0", fontSize: "14px", opacity: 0.8 }}>
              3D харагдац авахын тулд дээрх товчийг дарна уу
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* 3D Canvas */}
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      border: "4px solid rgba(255,255,255,0.3)",
                      borderTop: "4px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                      margin: "0 auto 20px",
                    }}
                  />
                  <p>3D мандат ачааллаж байна...</p>
                </div>
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 50 }}
              style={{ width: "100%", height: "100%" }}
              dpr={[1, 2]}
              onCreated={({ gl, scene }) => {
                gl.setClearColor(new THREE.Color(0x000000), 0);
                gl.shadowMap.enabled = false;
                gl.toneMapping = THREE.ACESFilmicToneMapping;
                gl.toneMappingExposure = 1.2;
              }}
            >
              <PremiumLighting />
              <PremiumMandatMesh
                mandatData={sampleData}
                variant={variant}
                onShowModal={() => setShow3DModal(true)}
              />

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={4}
                maxDistance={12}
                maxPolarAngle={Math.PI / 1.6}
                minPolarAngle={Math.PI / 8}
                enableDamping
                dampingFactor={0.05}
                autoRotate={false}
                rotateSpeed={1.0}
                zoomSpeed={1.0}
              />
            </Canvas>
          </Suspense>
        </>
      )}

      {/* Hidden print version */}
      <div
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
        data-print
      >
        <FallbackMandat mandatData={sampleData} variant={variant} />
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {/* Certificate Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "800px",
              height: "600px",
              position: "relative",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                Олимпиад Мандат Сертификат
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px",
                  minWidth: "auto",
                }}
              >
                <X size={20} />
              </Button>
            </div>

            {/* Modal Content */}
            <div
              style={{
                flex: 1,
                padding: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9fafb",
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  backgroundColor: "#ffffff",
                  padding: "40px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Certificate Header */}
                <div style={{ marginBottom: "30px" }}>
                  <h1
                    style={{
                      fontSize: "32px",
                      fontWeight: "bold",
                      color: "#000000",
                      margin: "0 0 10px 0",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                    }}
                  >
                    ОЛИМПИАД МАНДАТ
                  </h1>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#000000",
                      margin: "0",
                      fontWeight: "600",
                    }}
                  >
                    № {sampleData.mandatNumber}
                  </p>
                </div>

                {/* Student Information */}
                <div style={{ marginBottom: "30px" }}>
                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#000000",
                      margin: "0 0 20px 0",
                    }}
                  >
                    {sampleData.studentName}
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      margin: "5px 0",
                    }}
                  >
                    {sampleData.school}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      margin: "5px 0",
                    }}
                  >
                    {formatClassYear(sampleData.class)}
                  </p>
                </div>

                {/* Event Information */}
                <div style={{ marginBottom: "30px" }}>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#000000",
                      margin: "0 0 15px 0",
                    }}
                  >
                    {sampleData.olympiadName}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      margin: "5px 0",
                    }}
                  >
                    {sampleData.olympiadLocation}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      margin: "5px 0",
                    }}
                  >
                    {formatDateShortMongolian(sampleData.olympiadDate)}
                  </p>
                </div>

                {/* Organizer */}
                <div style={{ marginBottom: "30px" }}>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#000000",
                      margin: "5px 0",
                    }}
                  >
                    Зохион байгуулагч: {sampleData.organizerName}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#000000",
                      margin: "5px 0",
                    }}
                  >
                    Бүртгүүлсэн:{" "}
                    {formatDateShortMongolian(sampleData.registrationDate)}
                  </p>
                </div>

                {/* Footer */}
                <div
                  style={{
                    borderTop: "1px solid #e5e7eb",
                    paddingTop: "20px",
                    marginTop: "30px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#000000",
                      margin: "0",
                    }}
                  >
                    © 2025 Олимпиад Мандат Систем
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3D Mandat Modal */}
      {show3DModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShow3DModal(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "800px",
              height: "600px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                3D Олимпиад Мандат
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShow3DModal(false)}
                style={{
                  padding: "8px",
                  minWidth: "auto",
                }}
              >
                <X size={20} />
              </Button>
            </div>

            {/* 3D Content */}
            <div
              style={{
                flex: 1,
                position: "relative",
                backgroundColor: "#f9fafb",
              }}
            >
              <Suspense fallback={<div>Loading 3D...</div>}>
                <Canvas
                  camera={{
                    position: [0, 0, 6],
                    fov: 50,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                  }}
                >
                  <ambientLight intensity={0.6} />
                  <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                  />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />

                  <PremiumMandatMesh
                    mandatData={sampleData}
                    variant={variant}
                    onShowModal={() => setShow3DModal(true)}
                  />

                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={4}
                    maxDistance={12}
                    maxPolarAngle={Math.PI / 1.6}
                    minPolarAngle={Math.PI / 8}
                    dampingFactor={0.05}
                    rotateSpeed={1.0}
                    zoomSpeed={1.0}
                  />
                </Canvas>
              </Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
