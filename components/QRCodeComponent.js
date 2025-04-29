import QRCode from "react-qr-code";

export default function QRCodeComponent() {
  return (
    <div style={{ marginTop: "20px" }}>
      <QRCode value={typeof window !== "undefined" ? window.location.href : ""} size={200} />
    </div>
  );
}
