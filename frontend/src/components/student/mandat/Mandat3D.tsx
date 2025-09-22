"use client";
import React, { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { getProvinceName } from "@/lib/province-utils";
import { formatClassYear } from "@/lib/dateUtils";
import { formatDateMongolian, formatDateShortMongolian } from "@/lib/dateUtils";

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
}

interface Props {
  mandatData: MandatData;
  variant?: "classic" | "modern" | "elegant" | "premium";
  onBack?: () => void;
  showBackButton?: boolean;
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
}: {
  mandatData: MandatData;
  variant: "classic" | "modern" | "elegant" | "premium";
}) {
  const ref = useRef<THREE.Group>(null!);
  const cardRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showBack, setShowBack] = useState(false);

  useFrame((state, delta) => {
    if (ref.current && cardRef.current) {
      const time = state.clock.elapsedTime;

      // Complex floating animation
      ref.current.position.y =
        Math.sin(time * 0.6) * 0.2 +
        Math.sin(time * 0.4) * 0.1 +
        Math.sin(time * 1.2) * 0.05;

      ref.current.position.x = Math.sin(time * 0.3) * 0.1;
      ref.current.position.z = Math.cos(time * 0.5) * 0.08;

      // Smooth rotation transitions
      const targetRotationY = showBack
        ? Math.PI
        : hovered
        ? Math.sin(time * 0.5) * 0.1
        : 0;
      cardRef.current.rotation.y = THREE.MathUtils.lerp(
        cardRef.current.rotation.y,
        targetRotationY,
        3 * delta
      );

      // Subtle breathing effect
      const baseScale = hovered ? 1.05 : 1.0;
      const breathScale = 1 + Math.sin(time * 1.5) * 0.015;
      const targetScale = baseScale * breathScale;

      cardRef.current.scale.setScalar(
        THREE.MathUtils.lerp(cardRef.current.scale.x, targetScale, 5 * delta)
      );

      // Gentle rotation on hover
      if (hovered) {
        cardRef.current.rotation.x = THREE.MathUtils.lerp(
          cardRef.current.rotation.x,
          Math.sin(time * 0.8) * 0.05,
          2 * delta
        );
        cardRef.current.rotation.z = THREE.MathUtils.lerp(
          cardRef.current.rotation.z,
          Math.cos(time * 0.6) * 0.03,
          2 * delta
        );
      }
    }
  });

  const getVariantColors = () => {
    const variants = {
      classic: {
        primary: "#1e3a8a",
        secondary: "#3b82f6",
        accent: "#60a5fa",
        gold: "#f59e0b",
        background: "#ffffff",
        text: "#1e293b",
        border: "#1e40af",
      },
      modern: {
        primary: "#0f172a",
        secondary: "#334155",
        accent: "#64748b",
        gold: "#fbbf24",
        background: "#f8fafc",
        text: "#0f172a",
        border: "#3b82f6",
      },
      elegant: {
        primary: "#7c2d12",
        secondary: "#dc2626",
        accent: "#f97316",
        gold: "#eab308",
        background: "#fffbeb",
        text: "#431407",
        border: "#dc2626",
      },
      premium: {
        primary: "#111827",
        secondary: "#374151",
        accent: "#6366f1",
        gold: "#f59e0b",
        background: "#ffffff",
        text: "#111827",
        border: "#6366f1",
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
          setClicked(!clicked);
          setShowBack(!showBack);
        }}
      >
        {/* Simple certificate background */}
        <RoundedBox args={[3.5, 2.2, 0.01]} radius={0.02}>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.0}
            roughness={1.0}
          />
        </RoundedBox>

        {/* Simple border */}
        <RoundedBox
          args={[3.6, 2.3, 0.005]}
          radius={0.03}
          position={[0, 0, -0.002]}
        >
          <meshStandardMaterial
            color="#000000"
            metalness={0.0}
            roughness={1.0}
          />
        </RoundedBox>

        {/* Front Side Content - Standard Certificate */}
        {!showBack && (
          <>
            {/* Certificate Title */}
            <Text
              position={[0, 0.9, 0.008]}
              fontSize={0.14}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              ОЛИМПИАД МАНДАТ
            </Text>

            {/* Certificate Number */}
            <Text
              position={[0, 0.6, 0.008]}
              fontSize={0.08}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              № {mandatData.mandatNumber}
            </Text>

            {/* Student Name */}
            <Text
              position={[0, 0.3, 0.008]}
              fontSize={0.12}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              {mandatData.studentName}
            </Text>

            {/* School */}
            <Text
              position={[0, 0.1, 0.008]}
              fontSize={0.07}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.0}
            >
              {mandatData.school}
            </Text>

            {/* Class */}
            <Text
              position={[0, -0.1, 0.008]}
              fontSize={0.07}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              {formatClassYear(mandatData.class)}
            </Text>

            {/* Event */}
            <Text
              position={[0, -0.3, 0.008]}
              fontSize={0.06}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.0}
            >
              {mandatData.olympiadName}
            </Text>

            {/* Location */}
            <Text
              position={[0, -0.5, 0.008]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.0}
            >
              {mandatData.olympiadLocation}
            </Text>

            {/* Date */}
            <Text
              position={[0, -0.7, 0.008]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
            >
              {formatDateShortMongolian(mandatData.olympiadDate)}
            </Text>

            {/* Organizer */}
            <Text
              position={[0, -0.9, 0.008]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              maxWidth={3.0}
            >
              Зохион байгуулагч: {mandatData.organizerName}
            </Text>
          </>
        )}

        {/* Back Side Content - Simple Information */}
        {showBack && (
          <>
            {/* Header */}
            <Text
              position={[0, 0.8, -0.008]}
              fontSize={0.12}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
            >
              ДЭЛГЭРЭНГҮЙ МЭДЭЭЛЭЛ
            </Text>

            {/* Contact Information */}
            <Text
              position={[0, 0.4, -0.008]}
              fontSize={0.06}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
              maxWidth={3.0}
            >
              Холбоо барих: {mandatData.organizerName}
            </Text>

            <Text
              position={[0, 0.1, -0.008]}
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
              position={[0, -0.2, -0.008]}
              fontSize={0.05}
              color="#000000"
              anchorX="center"
              anchorY="middle"
              rotation={[0, Math.PI, 0]}
            >
              {getProvinceName(mandatData.province)}, {mandatData.region}
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
        primaryColor: "#1e3a8a",
        secondaryColor: "#3b82f6",
        accentColor: "#60a5fa",
        backgroundColor: "#f8fafc",
        textColor: "#1e293b",
        borderColor: "#1e40af",
      },
      modern: {
        primaryColor: "#0f172a",
        secondaryColor: "#334155",
        accentColor: "#64748b",
        backgroundColor: "#f1f5f9",
        textColor: "#0f172a",
        borderColor: "#3b82f6",
      },
      elegant: {
        primaryColor: "#7c2d12",
        secondaryColor: "#dc2626",
        accentColor: "#f97316",
        backgroundColor: "#fffbeb",
        textColor: "#431407",
        borderColor: "#dc2626",
      },
      premium: {
        primaryColor: "#111827",
        secondaryColor: "#374151",
        accentColor: "#6366f1",
        backgroundColor: "#ffffff",
        textColor: "#111827",
        borderColor: "#6366f1",
      },
    };
    return variants[variant || "premium"];
  };

  const colors = getVariantStyles();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        background: "#ffffff",
        border: "2px solid #000000",
        borderRadius: "5px",
        padding: "30px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: colors.textColor,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
            borderBottom: `4px solid ${colors.primaryColor}`,
            paddingBottom: "20px",
            position: "relative",
          }}
        >
          {/* Organization Logo */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              width: "60px",
              height: "60px",
              border: "1px solid #cccccc",
              borderRadius: "3px",
              backgroundImage: `url('${
                mandatData.organizerLogo || "/images/MCS_Group_Logo.png"
              }')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#000000",
              margin: "0 0 10px 0",
              textTransform: "uppercase",
            }}
          >
            ОЛИМПИАД МАНДАТ
          </h1>
          <div
            style={{
              display: "inline-block",
              background: "#f0f0f0",
              color: "#000000",
              padding: "5px 15px",
              borderRadius: "3px",
              fontSize: "14px",
              fontWeight: "normal",
              border: "1px solid #cccccc",
            }}
          >
            № {mandatData.mandatNumber}
          </div>
        </div>

        {/* Student Information */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "25px",
            padding: "15px",
            background: "#ffffff",
            border: "1px solid #cccccc",
            borderRadius: "3px",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000000",
              margin: "0 0 10px 0",
            }}
          >
            {mandatData.studentName}
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#000000",
              margin: "5px 0",
            }}
          >
            {mandatData.school}
          </p>
          <div
            style={{
              display: "inline-block",
              background: "#f0f0f0",
              color: "#000000",
              padding: "3px 10px",
              borderRadius: "3px",
              fontSize: "14px",
              border: "1px solid #cccccc",
            }}
          >
            {formatClassYear(mandatData.class)}
          </div>
        </div>

        {/* Event Information */}
        <div
          style={{
            padding: "15px",
            background: "#ffffff",
            border: "1px solid #cccccc",
            borderRadius: "3px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              color: "#000000",
              margin: "0 0 10px 0",
              fontWeight: "bold",
            }}
          >
            Олимпиадын мэдээлэл
          </h3>
          <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
            <p style={{ margin: "5px 0" }}>
              <strong>Нэр:</strong> {mandatData.olympiadName}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Байршил:</strong> {mandatData.olympiadLocation}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Огноо:</strong>{" "}
              {formatDateShortMongolian(mandatData.olympiadDate)}
            </p>
            {mandatData.roomNumber && (
              <p style={{ margin: "5px 0" }}>
                <strong>Өрөө:</strong> {mandatData.roomNumber}
              </p>
            )}
          </div>
        </div>

        {/* Organizer Information */}
        <div
          style={{
            background: "#ffffff",
            padding: "15px",
            border: "1px solid #cccccc",
            borderRadius: "3px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              color: "#000000",
              margin: "0 0 10px 0",
              fontWeight: "bold",
            }}
          >
            Зохион байгуулагч
          </h3>
          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            {mandatData.organizerName}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid #cccccc",
            paddingTop: "15px",
            fontSize: "12px",
            color: "#000000",
          }}
        >
          <p style={{ margin: "0" }}>© 2025 Олимпиад Мандат Систем</p>
        </div>
      </div>
    </div>
  );
}

export default function EnhancedMandat3D(props: Props) {
  const { variant = "premium", onBack, showBackButton = false } = props;
  const [webglError, setWebglError] = useState(false); // Default to 3D view
  const [loading, setLoading] = useState(true);

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
        width: "100%",
        height: "100vh",
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
              background: "rgba(239, 68, 68, 0.9)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
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
            background: "rgba(16, 185, 129, 0.9)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          🖨️ Хэвлэх
        </button>

        <button
          onClick={() => setWebglError(!webglError)}
          style={{
            padding: "12px 20px",
            background: webglError
              ? "rgba(59, 130, 246, 0.9)"
              : "rgba(107, 114, 128, 0.9)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {webglError ? "🎮 3D харах" : "📄 2D харах"}
        </button>
      </div>

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
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              textAlign: "center",
              color: "white",
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
              camera={{ position: [0, 0, 8], fov: 45 }}
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
              <PremiumMandatMesh mandatData={sampleData} variant={variant} />

              <OrbitControls
                enablePan={false}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={15}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 6}
                enableDamping
                dampingFactor={0.03}
                autoRotate={false}
                rotateSpeed={0.8}
                zoomSpeed={0.8}
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
    </div>
  );
}
