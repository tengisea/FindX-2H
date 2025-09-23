"use client";
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

interface Props {
  name: string;
  event: string;
  rank: "gold" | "silver" | "bronze";
  rankLabel: string;
  score?: number;
  maxScore?: number;
  category?: string;
  completionTime?: string;
  certificateId?: string;
  date?: string;
  variant?: "classic" | "modern" | "elegant";
  onBack?: () => void;
  showBackButton?: boolean;
}

// Enhanced lighting component
function EnhancedLighting() {
  return (
    <>
      {/* Minimal lighting for stability */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  );
}

function CardMesh({
  name,
  event,
  rank,
  rankLabel,
  score = 98,
  maxScore = 100,
  category = "Mathematics - Algebra",
  completionTime = "45 minutes",
  certificateId,
  date,
  variant = "classic",
}: Props) {
  const ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);

  // Enhanced rotation and floating animation with multiple phases
  useFrame((state, delta) => {
    if (ref.current && groupRef.current) {
      const time = state.clock.elapsedTime;

      // Smooth floating motion with multiple harmonics
      groupRef.current.position.y =
        Math.sin(time * 0.5) * 0.1 + Math.sin(time * 0.3) * 0.05;
      groupRef.current.position.x = Math.sin(time * 0.2) * 0.05;

      // Enhanced rotation with multiple phases
      if (hovered) {
        ref.current.rotation.y = THREE.MathUtils.lerp(
          ref.current.rotation.y,
          Math.sin(time * 0.8) * 0.15 + Math.cos(time * 0.3) * 0.05,
          3 * delta
        );
        ref.current.rotation.x = THREE.MathUtils.lerp(
          ref.current.rotation.x,
          Math.sin(time * 0.6) * 0.05,
          2 * delta
        );
        ref.current.rotation.z = THREE.MathUtils.lerp(
          ref.current.rotation.z,
          Math.sin(time * 0.4) * 0.02,
          1.5 * delta
        );
      } else {
        ref.current.rotation.y = THREE.MathUtils.lerp(
          ref.current.rotation.y,
          0,
          2 * delta
        );
        ref.current.rotation.x = THREE.MathUtils.lerp(
          ref.current.rotation.x,
          0,
          2 * delta
        );
        ref.current.rotation.z = THREE.MathUtils.lerp(
          ref.current.rotation.z,
          0,
          1.5 * delta
        );
      }

      // Scale animation on hover with bounce effect
      const targetScale = hovered ? 1.08 : 1.0;
      const currentScale = THREE.MathUtils.lerp(
        ref.current.scale.x,
        targetScale,
        3 * delta
      );
      ref.current.scale.setScalar(currentScale);

      // Animation phase progression
      if (clicked) {
        setAnimationPhase((prev) => (prev + delta * 2) % (Math.PI * 2));
      }
    }
  });

  const rankColor =
    rank === "gold" ? "#FFD700" : rank === "silver" ? "#E5E5E5" : "#CD7F32";

  // Certificate variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "modern":
        return {
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "16px",
          textColor: "#1a365d",
          accentColor: "#ff6b35",
          fontFamily: "'Inter', sans-serif",
        };
      case "elegant":
        return {
          background:
            "linear-gradient(135deg, #00040a 0%, #1a1a2e 50%, #16213e 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "12px",
          textColor: "#1a365d",
          accentColor: "#ff6b35",
          fontFamily: "'Inter', sans-serif",
        };
      default:
        return {
          background:
            "linear-gradient(135deg, #00040a 0%, #1a1a2e 50%, #16213e 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "16px",
          textColor: "#1a365d",
          accentColor: "#ff6b35",
          fontFamily: "'Inter', sans-serif",
        };
    }
  };

  const variantStyles = getVariantStyles();

  const certId =
    certificateId ||
    `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <group ref={groupRef}>
      {/* Sparkle effects around the certificate */}
      {hovered && (
        <Sparkles
          count={30}
          scale={[8, 6, 4]}
          size={3}
          speed={0.4}
          color={rankColor}
          opacity={0.8}
        />
      )}

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.1}>
        {/* Formal Certificate Design */}
        <Html position={[0, 0.08, 1.85]} transform occlude distanceFactor={10}>
          <div
            style={{
              width: "740px",
              height: "512px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "48px 60px",
              boxSizing: "border-box",
              background: "#ffffff",
              color: "#1a365d",
              border: "8px solid #1a365d",
              boxShadow: hovered
                ? "0 20px 60px rgba(26, 54, 93, 0.3), inset 0 0 30px rgba(255,255,255,0.5)"
                : "0 12px 35px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.3)",
              position: "relative",
              fontFamily: "'Times New Roman', serif",
              transition: "all 0.3s ease",
            }}
          >
            {/* Elegant Border Design */}
            <div
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                right: "15px",
                bottom: "15px",
                border: "3px solid #FFD700",
                borderRadius: "8px",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "25px",
                right: "25px",
                bottom: "25px",
                border: "1px solid #1a365d",
                borderRadius: "4px",
                pointerEvents: "none",
              }}
            />

            {/* Corner Flourishes */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                width: "40px",
                height: "40px",
                borderTop: "3px solid #FFD700",
                borderLeft: "3px solid #FFD700",
                borderTopLeftRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "40px",
                height: "40px",
                borderTop: "3px solid #FFD700",
                borderRight: "3px solid #FFD700",
                borderTopRightRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                width: "40px",
                height: "40px",
                borderBottom: "3px solid #FFD700",
                borderLeft: "3px solid #FFD700",
                borderBottomLeftRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "40px",
                height: "40px",
                borderBottom: "3px solid #FFD700",
                borderRight: "3px solid #FFD700",
                borderBottomRightRadius: "8px",
              }}
            />

            {/* Main Title */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  letterSpacing: "6px",
                  color: "#1a365d",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                  fontFamily: "var(--font-libre-baskerville), serif",
                }}
              >
                CERTIFICATE
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "normal",
                  letterSpacing: "3px",
                  color: "#1a365d",
                  marginTop: "8px",
                  fontFamily: "var(--font-libre-baskerville), serif",
                }}
              >
                OF ACHIEVEMENT
              </div>
            </div>

            {/* Introductory Phrase */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "16px",
                  color: "#1a365d",
                  fontFamily: "'Arial', sans-serif",
                  fontStyle: "italic",
                }}
              >
                This certificate is proudly awarded to
              </div>
            </div>

            {/* Recipient's Name */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  color: "#1a365d",
                  textShadow: "3px 3px 6px rgba(0,0,0,0.1)",
                  fontFamily: "var(--font-great-vibes), cursive",
                  fontStyle: "italic",
                  borderBottom: "2px solid #1a365d",
                  paddingBottom: "12px",
                  display: "inline-block",
                }}
              >
                {name}
              </div>
            </div>

            {/* Achievement Details */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
                paddingBottom: "30px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "#1a365d",
                  fontFamily: "'Arial', sans-serif",
                  lineHeight: "1.6",
                  maxWidth: "500px",
                  margin: "0 auto",
                  paddingBottom: "20px",
                }}
              >
                This certificate is given to {name} for achieving {rankLabel} in{" "}
                {event}.{/* Medal Impact Display */}
                {category && (
                  <div style={{ marginTop: "12px", fontSize: "16px" }}>
                    {category}
                  </div>
                )}
                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "16px",
                    fontStyle: "italic",
                  }}
                >
                  Hopefully this certificate will be a great motivation for
                  continued excellence.
                </div>
              </div>
            </div>
          </div>
        </Html>

        {/* Enhanced details popup on click */}
        {clicked && (
          <Html position={[0, 0.08, 2.5]} transform occlude distanceFactor={10}>
            <div
              style={{
                width: "400px",
                padding: "24px",
                borderRadius: "16px",
                background: "rgba(0,0,0,0.95)",
                color: "#fff",
                fontSize: "14px",
                textAlign: "center",
                boxShadow: `0 12px 40px rgba(0,0,0,0.7), 0 0 20px ${variantStyles.accentColor}44`,
                border: `2px solid ${variantStyles.accentColor}`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "12px",
                  fontSize: "16px",
                  color: rankColor,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                🏆 Achievement Details
              </div>
              <div style={{ marginBottom: "6px", opacity: 0.9 }}>
                Final Score: {score}/{maxScore}
              </div>
              <div style={{ marginBottom: "6px", opacity: 0.9 }}>
                Category: {category}
              </div>
              <div style={{ marginBottom: "6px", opacity: 0.9 }}>
                Completion Time: {completionTime}
              </div>
              {date && (
                <div style={{ marginBottom: "6px", opacity: 0.9 }}>
                  Date: {date}
                </div>
              )}
              <div
                style={{
                  fontSize: "12px",
                  opacity: "0.7",
                  marginTop: "12px",
                  padding: "8px 12px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                Certificate ID: {certId}
              </div>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
}

// Fallback 2D Certificate component for when WebGL fails
function FallbackCertificate(props: Props) {
  const {
    name,
    event,
    rank,
    rankLabel,
    score = 98,
    category = "Mathematics - Algebra",
    completionTime = "45 minutes",
    certificateId,
    date,
    variant = "classic",
    onBack,
    showBackButton = false,
  } = props;

  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rankColor =
    rank === "gold" ? "#FFD700" : rank === "silver" ? "#E5E5E5" : "#CD7F32";

  const getVariantStyles = () => {
    switch (variant) {
      case "modern":
        return {
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "16px",
          textColor: "#1a365d",
          accentColor: "#ff6b35",
          fontFamily: "'Inter', sans-serif",
        };
      case "elegant":
        return {
          background:
            "linear-gradient(135deg, #00040a 0%, #1a1a2e 50%, #16213e 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "12px",
          textColor: "#1a365d",
          accentColor: "#ff6b35",
          fontFamily: "'Inter', sans-serif",
        };
      default:
        return {
          background:
            "linear-gradient(135deg, #00040a 0%, #1a1a2e 50%, #16213e 100%)",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "16px",
          textColor: "#1a365d",
          accentColor: "#ff6b35",
          fontFamily: "'Inter', sans-serif",
        };
    }
  };

  const variantStyles = getVariantStyles();

  const issueDate =
    date ||
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const certId =
    certificateId ||
    `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Back Button for Fallback */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 100,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.9)";
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.7)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          ←
        </button>
      )}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "400px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px",
            boxSizing: "border-box",
            background: variantStyles.background,
            color: variantStyles.textColor,
            border: `${variantStyles.borderWidth} ${variantStyles.borderStyle} ${variantStyles.accentColor}`,
            boxShadow: isHovered
              ? "0 25px 80px rgba(0,0,0,0.4), inset 0 0 40px rgba(255,255,255,0.2)"
              : "0 20px 60px rgba(0,0,0,0.3), inset 0 0 30px rgba(255,255,255,0.1)",
            borderRadius: variantStyles.borderRadius,
            fontFamily: variantStyles.fontFamily,
            transform: isClicked
              ? "scale(0.98)"
              : isHovered
              ? "scale(1.02)"
              : "scale(1)",
            transition: "all 0.3s ease",
            cursor: "pointer",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
          onTouchStart={() => setIsClicked(true)}
          onTouchEnd={() => setIsClicked(false)}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "3px",
                color: variantStyles.accentColor,
                textShadow:
                  variant === "modern" || variant === "elegant"
                    ? "2px 2px 8px rgba(0,0,0,0.5)"
                    : "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              CERTIFICATE OF ACHIEVEMENT
            </div>
          </div>

          {/* Certification text */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                fontSize: "12px",
                color:
                  variant === "modern" || variant === "elegant"
                    ? "#f0f0f0"
                    : "#7f8c8d",
                fontStyle: "italic",
                marginBottom: "8px",
              }}
            >
              This is to certify that
            </div>
          </div>

          {/* Name section */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                letterSpacing: "1px",
                color: variantStyles.accentColor,
                textShadow:
                  variant === "modern" || variant === "elegant"
                    ? "2px 2px 8px rgba(0,0,0,0.5)"
                    : "3px 3px 6px rgba(0,0,0,0.1)",
                fontFamily: "'Georgia', serif",
                borderBottom: `3px solid ${rankColor}`,
                paddingBottom: "6px",
                display: "inline-block",
              }}
            >
              {name}
            </div>
          </div>

          {/* Event and Rank */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: variantStyles.accentColor,
                marginBottom: "8px",
              }}
            >
              has achieved {rankLabel} in {event}
            </div>
            <div
              style={{
                marginTop: "10px",
                fontSize: "18px",
                color: "#fff",
                fontWeight: "bold",
                background: `linear-gradient(45deg, ${variantStyles.accentColor}, ${variantStyles.accentColor}cc)`,
                padding: "6px 16px",
                borderRadius: "16px",
                display: "inline-block",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              🏆 {rankLabel}
            </div>
          </div>

          {/* Achievement description */}
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color:
                variant === "modern" || variant === "elegant"
                  ? "#f0f0f0"
                  : "#7f8c8d",
              fontStyle: "italic",
              marginBottom: "20px",
              maxWidth: "400px",
              lineHeight: "1.5",
              opacity: 0.9,
            }}
          >
            Demonstrated exceptional skill and dedication in achieving
            outstanding results
            {score && (
              <div
                style={{
                  marginTop: "6px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: rankColor,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Score: {score}/{maxScore}
              </div>
            )}
            {category && (
              <div style={{ marginTop: "4px" }}>Category: {category}</div>
            )}
          </div>

          {/* Bottom section */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "2px solid rgba(255,255,255,0.2)",
              paddingTop: "15px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: variantStyles.accentColor,
                  marginBottom: "4px",
                }}
              />
              <div
                style={{
                  fontSize: "10px",
                  color:
                    variant === "modern" || variant === "elegant"
                      ? "#f0f0f0"
                      : "#7f8c8d",
                  fontWeight: "600",
                }}
              >
                SIGNATURE
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "8px 12px",
                background: `linear-gradient(45deg, ${rankColor}22, transparent)`,
                borderRadius: "6px",
                border: `1px solid ${rankColor}44`,
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: variantStyles.accentColor,
                }}
              >
                {issueDate}
              </div>
              <div
                style={{
                  fontSize: "8px",
                  color:
                    variant === "modern" || variant === "elegant"
                      ? "#f0f0f0"
                      : "#7f8c8d",
                  marginTop: "2px",
                }}
              >
                DATE OF ISSUE
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "80px",
                  height: "2px",
                  backgroundColor: variantStyles.accentColor,
                  marginBottom: "4px",
                }}
              />
              <div
                style={{
                  fontSize: "10px",
                  color:
                    variant === "modern" || variant === "elegant"
                      ? "#f0f0f0"
                      : "#7f8c8d",
                  fontWeight: "600",
                }}
              >
                OFFICIAL SEAL
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "80px",
              color: `${rankColor}08`,
              fontWeight: "bold",
              zIndex: -1,
              pointerEvents: "none",
            }}
          >
            ★
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certificate(props: Props) {
  const { variant = "classic", onBack, showBackButton = false } = props;
  const [webglError, setWebglError] = useState(false);
  const [contextLossCount, setContextLossCount] = useState(0);

  // Dynamic background based on variant
  const getBackgroundStyle = () => {
    switch (variant) {
      case "modern":
        return "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)";
      case "elegant":
        return "linear-gradient(135deg, #fef5e7 0%, #f6e6d3 100%)";
      default:
        return "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)";
    }
  };

  // WebGL check with context loss handling
  React.useEffect(() => {
    // Check if we should force fallback mode
    const forceFallback = localStorage.getItem("forceWebGLFallback");
    if (forceFallback === "true") {
      console.log("Forcing 2D fallback mode due to previous WebGL issues");
      setWebglError(true);
      return;
    }

    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl =
          canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) {
          setWebglError(true);
          return;
        }

        // Test WebGL functionality
        if (
          gl instanceof WebGLRenderingContext ||
          gl instanceof WebGL2RenderingContext
        ) {
          const testProgram = gl.createProgram();
          if (!testProgram) {
            setWebglError(true);
            return;
          }
          gl.deleteProgram(testProgram);
        }

        setWebglError(false);
      } catch (error) {
        console.warn("WebGL check failed:", error);
        setWebglError(true);
      }
    };

    checkWebGL();

    // Listen for context lost events on the main canvas
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      const newCount = contextLossCount + 1;
      setContextLossCount(newCount);
      console.warn(
        `WebGL context lost (${newCount} times), switching to fallback`
      );
      setWebglError(true);

      // Force fallback after 2 context losses
      if (newCount >= 2) {
        console.warn(
          "Multiple WebGL context losses detected, forcing 2D fallback mode"
        );
        localStorage.setItem("forceWebGLFallback", "true");
      }
    };

    const mainCanvas = document.querySelector("canvas");
    if (mainCanvas) {
      mainCanvas.addEventListener("webglcontextlost", handleContextLost);
    }

    return () => {
      if (mainCanvas) {
        mainCanvas.removeEventListener("webglcontextlost", handleContextLost);
      }
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        background: getBackgroundStyle(),
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Simple Back Button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            zIndex: 100,
            background: "rgba(0,0,0,0.7)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          ←
        </button>
      )}

      {/* Reset Button (only show in fallback mode) */}
      {webglError && (
        <button
          onClick={() => {
            localStorage.removeItem("forceWebGLFallback");
            setWebglError(false);
            setContextLossCount(0);
            window.location.reload();
          }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 100,
            background: "rgba(255,215,0,0.8)",
            color: "black",
            border: "none",
            borderRadius: "20px",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          🔄 Try 3D
        </button>
      )}

      {webglError ? (
        <FallbackCertificate {...props} />
      ) : (
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Loading 3D Certificate...
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0, 18], fov: 50 }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "low-power",
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: true,
              stencil: false,
              depth: false,
              logarithmicDepthBuffer: false,
            }}
            onCreated={({ gl }) => {
              gl.setClearColor("#000000", 0);
              gl.shadowMap.enabled = false;

              // Add context lost listener
              const canvas = gl.domElement;
              canvas.addEventListener("webglcontextlost", (event) => {
                event.preventDefault();
                const newCount = contextLossCount + 1;
                setContextLossCount(newCount);
                console.warn(
                  `WebGL context lost (${newCount} times), switching to fallback`
                );
                setWebglError(true);

                // Force fallback after 2 context losses
                if (newCount >= 2) {
                  console.warn(
                    "Multiple WebGL context losses detected, forcing 2D fallback mode"
                  );
                  localStorage.setItem("forceWebGLFallback", "true");
                }
              });

              canvas.addEventListener("webglcontextrestored", () => {
                console.log("WebGL context restored");
                setWebglError(false);
              });
            }}
            onError={(error) => {
              console.error("Canvas error:", error);
              setWebglError(true);
            }}
            style={{ touchAction: "none" }}
          >
            <EnhancedLighting />
            {/* Ultra-minimal scene to prevent context loss */}
            {/* Removed Environment, ContactShadows, and ParticleSystem to reduce GPU load */}
            <CardMesh {...props} />
            <OrbitControls
              enablePan={false}
              minDistance={12}
              maxDistance={35}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 8}
              enableDamping
              dampingFactor={0.05}
              autoRotate={false}
              enableZoom={true}
              enableRotate={true}
            />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
