export default function InfectionBanner({ indicators }) {
    return (
      <div style={{
        background: "linear-gradient(45deg, #8B0000, #FF0000)",
        color: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "30px",
        animation: "glow 1s infinite alternate",
        maxWidth: "600px",
        margin: "20px auto",
      }}>
        <h2 style={{
          fontSize: "1.8rem",
          marginBottom: "15px",
          textAlign: "center",
          textShadow: "0 0 10px #FF0000"
        }}>🚨 YOU'RE INFECTED!</h2>
        <ul style={{
          listStyle: "inside",
          textAlign: "left",
          fontSize: "1.1rem"
        }}>
          {indicators.map((ind, idx) => (
            <li key={idx}>{ind}</li>
          ))}
        </ul>
        <style jsx>{`
          @keyframes glow {
            from { box-shadow: 0 0 10px #FF0000; }
            to { box-shadow: 0 0 20px #FF4500; }
          }
        `}</style>
      </div>
    );
  }
  