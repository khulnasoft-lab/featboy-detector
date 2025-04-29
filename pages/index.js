import { useState, useEffect } from "react";
import InfectionBanner from "../components/InfectionBanner";
import QRCodeComponent from "../components/QRCodeComponent";

export default function Home() {
  const [infected, setInfected] = useState(false);
  const [indicators, setIndicators] = useState([]);

  useEffect(() => {
    const checkIoCs = async () => {
      const foundIndicators = [];

      // Check for IoCs (Indicators of Compromise)
      if (localStorage.getItem("featboy_session")) {
        foundIndicators.push("FeatBoy session found in localStorage");
      }

      if (navigator.userAgent.includes("Python-requests")) {
        foundIndicators.push("Suspicious Python-requests User-Agent detected");
      }

      if (document.title.includes("Feat Boy Panel")) {
        foundIndicators.push("Feat Boy Panel detected in page title");
      }

      if (foundIndicators.length > 0) {
        setInfected(true);
        setIndicators(foundIndicators);

        // Send report to server
        await fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            indicators: foundIndicators,
            userAgent: navigator.userAgent,
            url: window.location.href,
          }),
        });

        // Auto-generate YARA rule based on findings
        await fetch("/api/yararule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ indicators: foundIndicators }),
        });
      }
    };

    checkIoCs();
  }, []);

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0d0d0d, #001f3f)",
      color: "#00FF41",
      fontFamily: "monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      textAlign: "center",
      overflow: "hidden"  // Ensure no unwanted scrollbars appear
    }}>
      <div style={{
        boxShadow: "none"  // Removing the box shadow from the background
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "10px" }}>🛡️ FeatBoy Malware Scanner</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#ccc" }}>
          Scanning your device/network for active threats...
        </p>
      </div>

      {infected && <InfectionBanner indicators={indicators} />}

      <div style={{
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 20px #00FF41",
        marginTop: "30px"
      }}>
        <h2 style={{ fontSize: "1.5rem", color: "#00FF41" }}>📱 Scan QR on Mobile</h2>
        <QRCodeComponent />
      </div>

      <footer style={{ marginTop: "40px", fontSize: "0.9rem", color: "#555" }}>
        © 2025 KhulnaSoft, Cybersecurity Research Initiative
      </footer>
    </main>
  );
}
