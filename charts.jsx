export default function Charts() {
  const bars = [
    { label: "Cool Roofs", value: 17.4, height: "100%", color: "#00c8ff" },
    { label: "Cool Pavmt", value: 9.8, height: "57%", color: "#00c8ff" },
    { label: "Hi Albedo", value: 6.3, height: "36%", color: "#ffd600" },
    { label: "Green Roof", value: 7.1, height: "41%", color: "#00e676" },
    { label: "Urban Green", value: 5.4, height: "31%", color: "#00e676" },
  ];

  return (
    <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: "10px 12px", marginBottom: 10 }}>
      <div style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#00c8ff", marginBottom: 8 }}>
        COOLING POTENTIAL BY STRATEGY
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
        {bars.map((b) => (
          <div key={b.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%" }}>
            <div style={{ fontSize: 8, color: "#4a7fa5", fontFamily: "monospace" }}>{b.value}°</div>
            <div style={{ width: "100%", flex: 1, display: "flex", alignItems: "flex-end" }}>
              <div style={{ width: "100%", height: b.height, background: b.color, opacity: 0.85, borderRadius: "2px 2px 0 0", minHeight: 4 }} />
            </div>
            <div style={{ fontSize: 8, color: "#4a7fa5", textAlign: "center", lineHeight: 1.2 }}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
