import { useState, useEffect } from "react";
import MapView, { cities } from "./MapView.jsx";
import Charts from "./Charts.jsx";

const aiSolutions = {
  CRITICAL: [
    { rank: 1, title: "Cool Roof Coating", cost: "₹150/sqm", saving: "₹2.3L/yr", roi: "340%", time: "2 months", temp: "-4.2°C", badge: "BEST VALUE" },
    { rank: 2, title: "Emergency Misting", cost: "₹80/unit", saving: "₹1.1L/yr", roi: "210%", time: "2 weeks", temp: "-3°C", badge: "FASTEST" },
    { rank: 3, title: "Green Roof System", cost: "₹320/sqm", saving: "₹1.8L/yr", roi: "180%", time: "6 months", temp: "-3.9°C", badge: null },
  ],
  HIGH: [
    { rank: 1, title: "Solar Reflective Paint", cost: "₹90/sqm", saving: "₹1.5L/yr", roi: "280%", time: "1 month", temp: "-3.4°C", badge: "BEST VALUE" },
    { rank: 2, title: "Cool Pavement", cost: "₹280/sqm", saving: "₹1.2L/yr", roi: "140%", time: "3 months", temp: "-2.8°C", badge: null },
    { rank: 3, title: "Urban Tree Cover", cost: "₹80/tree", saving: "₹0.9L/yr", roi: "210%", time: "ongoing", temp: "-2°C", badge: null },
  ],
  WARNING: [
    { rank: 1, title: "Urban Tree Cover", cost: "₹80/tree", saving: "₹0.9L/yr", roi: "210%", time: "ongoing", temp: "-2°C", badge: "BEST VALUE" },
    { rank: 2, title: "Permeable Pavement", cost: "₹200/sqm", saving: "₹0.8L/yr", roi: "120%", time: "4 months", temp: "-1.9°C", badge: null },
    { rank: 3, title: "Shade Structures", cost: "₹120/sqm", saving: "₹0.6L/yr", roi: "150%", time: "2 months", temp: "-1.5°C", badge: null },
  ],
  MODERATE: [
    { rank: 1, title: "Green Corridors", cost: "₹60/sqm", saving: "₹0.5L/yr", roi: "180%", time: "ongoing", temp: "-1.2°C", badge: "BEST VALUE" },
    { rank: 2, title: "Cool Roof Coating", cost: "₹150/sqm", saving: "₹1.0L/yr", roi: "200%", time: "2 months", temp: "-4.2°C", badge: null },
    { rank: 3, title: "Reflective Surfaces", cost: "₹70/sqm", saving: "₹0.4L/yr", roi: "130%", time: "1 month", temp: "-1.0°C", badge: null },
  ],
  LOW: [
    { rank: 1, title: "Preventive Monitoring", cost: "₹20/mo", saving: "₹0.3L/yr", roi: "500%", time: "ongoing", temp: "-0.5°C", badge: "BEST VALUE" },
    { rank: 2, title: "Park Expansion", cost: "₹40/sqm", saving: "₹0.3L/yr", roi: "200%", time: "1 year", temp: "-0.8°C", badge: null },
    { rank: 3, title: "Cool Roof Coating", cost: "₹150/sqm", saving: "₹0.8L/yr", roi: "160%", time: "2 months", temp: "-4.2°C", badge: null },
  ],
};

const vulnerabilityData = {
  CRITICAL: { total: "12,847", elderly: "2,140", children: "1,890", workers: "3,200" },
  HIGH: { total: "8,420", elderly: "1,450", children: "1,200", workers: "2,100" },
  WARNING: { total: "5,280", elderly: "890", children: "760", workers: "1,400" },
  MODERATE: { total: "3,100", elderly: "520", children: "440", workers: "800" },
  LOW: { total: "1,200", elderly: "200", children: "180", workers: "300" },
};

export default function App() {
  const [selectedCity, setSelectedCity] = useState(cities[2]);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toTimeString().slice(0, 8));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const city = selectedCity;
  const solutions = aiSolutions[city.risk] || aiSolutions["LOW"];
  const vuln = vulnerabilityData[city.risk] || vulnerabilityData["LOW"];

  return (
    <div style={s.root}>
      {/* TOP BAR */}
      <div style={s.topbar}>
        <div style={s.topbarLeft}>
          <div style={s.logoDot}><div style={s.logoDotInner} /></div>
          <div>
            <div style={s.title}>Urban Heat Intelligence</div>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1 }}>Metropolitan Thermal Monitoring System</div>
          </div>
        </div>
        <div style={s.topbarRight}>
          <span style={{ ...s.badge, background: "#00e67622", border: "1px solid #00e676", color: "#00e676" }}>ACTIVE</span>
          <span style={{ ...s.badge, background: "#ff222222", border: "1px solid #ff2222", color: "#ff2222" }}>HIGH</span>
          <span style={{ color: "#4a7fa5", fontSize: 11 }}>v4.8.2</span>
          <span style={s.clock}>{time}</span>
        </div>
      </div>

      <div style={s.mainWrap}>
        {/* SIDEBAR */}
        <div style={s.sidebar}>
          {["⊞", "≡", "⊕", "∿", "↗", "⚠", "⚙"].map((icon, i) => (
            <div key={i} style={{ ...s.sideIcon, color: i === 0 ? "#00ffe7" : "#4a7fa5" }}>{icon}</div>
          ))}
          <div style={s.liveIndicator}>
            <div style={s.liveDot} />
            <span style={{ fontSize: 8, letterSpacing: 1, color: "#00e676" }}>LIVE</span>
          </div>
        </div>

        {/* LEFT PANEL */}
        <div style={s.leftPanel}>
          <div style={{ background: `${city.color}22`, border: `1px solid ${city.color}`, borderRadius: 6, padding: "6px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 9, color: city.color, letterSpacing: 2 }}>SELECTED ZONE</div>
            <div style={{ fontSize: 13, color: city.color, fontWeight: 700, marginTop: 2 }}>{city.name}</div>
            <div style={{ fontSize: 9, color: city.color, opacity: 0.7, marginTop: 2 }}>RISK: {city.risk}</div>
          </div>

          {[
            { icon: "🌡️", label: "AVG SURFACE TEMP", value: city.avgTemp, unit: "°C", color: "#ff8c00" },
            { icon: "🔥", label: "PEAK SURFACE TEMP", value: city.peakTemp, unit: "°C", color: "#ff2222" },
            { icon: "💨", label: "WIND SPEED", value: city.wind, unit: "km/h", color: "#00c8ff" },
            { icon: "💧", label: "REL. HUMIDITY", value: city.humidity, unit: "%", color: "#a78bfa" },
          ].map((m, i) => (
            <div key={i} style={s.metricCard}>
              <span style={{ fontSize: 20 }}>{m.icon}</span>
              <div>
                <div style={s.metricLabel}>{m.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: m.color, lineHeight: 1 }}>
                  {m.value}<span style={{ fontSize: 11, opacity: 0.7 }}>{m.unit}</span>
                </div>
              </div>
            </div>
          ))}

          <div style={s.riskPanel}>
            <div style={s.sectionTitle}>
              Heat Risk Ranking
              <span style={{ color: "#4a7fa5", fontSize: 9 }}>BY SCORE</span>
            </div>
            {cities.map((z, i) => (
              <div
                key={z.id}
                onClick={() => setSelectedCity(z)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: z.id === city.id ? "#0a2040" : "transparent",
                  borderLeft: z.id === city.id ? `2px solid ${z.color}` : "2px solid transparent",
                  paddingLeft: 4, borderRadius: 4, marginBottom: 8,
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: 10, color: "#4a7fa5", width: 12 }}>{i + 1}</span>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: z.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#cce8ff" }}>{z.name}</div>
                  <div style={{ height: 3, background: "#0d2a45", borderRadius: 2, marginTop: 3 }}>
                    <div style={{ width: `${z.bar}%`, height: "100%", background: z.color, borderRadius: 2 }} />
                  </div>
                </div>
                <span style={{ fontSize: 10, color: z.color }}>{z.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER PANEL — MAP */}
        <div style={s.centerPanel}>
          <div style={s.mapHeader}>
            <span style={{ fontSize: 11, letterSpacing: 2, color: "#00ffe7" }}>⚡ Thermal Satellite Feed</span>
            <span style={s.criticalBadge}>3 CRITICAL ZONES</span>
            <span style={{ fontSize: 10, color: "#4a7fa5" }}>{time}</span>
          </div>

          <div style={{ flex: 1, minHeight: 0 }}>
            <MapView onCitySelect={setSelectedCity} selectedCity={selectedCity} />
          </div>

          <div style={s.statusRow}>
            {[
              ["CRITICAL", cities.filter(c => c.risk === "CRITICAL").length, "#ff2222"],
              ["WARNING", cities.filter(c => c.risk === "WARNING").length, "#ff9900"],
              ["MONITORED", cities.length, "#00c8ff"],
              ["SCAN CYCLE", "2.6s", "#00ffe7"],
            ].map(([lbl, val, col]) => (
              <div key={lbl} style={s.statusCard}>
                <div style={s.statusLabel}>{lbl}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI SOLUTIONS PANEL */}
        <div style={s.aiPanel}>
          <div style={{ ...s.sectionTitle, color: "#00ffe7", fontSize: 12, marginBottom: 12 }}>
            🤖 AI Solutions
          </div>
          {/* AI SOLUTIONS PANEL */}
<div style={s.aiPanel}>
  
  {/* Header */}
  <div
    style={{
      fontSize: 12,
      fontWeight: 700,
      color: "#00ffe7",
      letterSpacing: 1,
      marginBottom: 10,
      paddingBottom: 8,
      borderBottom: "1px solid #0d2a45",
    }}
  >
    🤖 AI SOLUTIONS
  </div>

  {/* Solutions Cards */}
  <div style={s.aiList}>
    
    <div style={s.aiCard}>
      <div style={s.aiTitle}>🌳 Urban Greening</div>
      <div style={s.aiDesc}>
        High heat zones me trees aur green cover increase karo.
      </div>
    </div>

    <div style={s.aiCard}>
      <div style={s.aiTitle}>🏠 Cool Roof System</div>
      <div style={s.aiDesc}>
        Reflective paint use karke building heat reduce karo.
      </div>
    </div>

    <div style={s.aiCard}>
      <div style={s.aiTitle}>🚶 Heat Alert System</div>
      <div style={s.aiDesc}>
        12PM–4PM outdoor activity avoid karne ka AI alert.
      </div>
    </div>

    <div style={s.aiCard}>
      <div style={s.aiTitle}>💧 Cooling Zones</div>
      <div style={s.aiDesc}>
        Crowded areas me mist spray system lagao.
      </div>
    </div>

    <div style={s.aiCard}>
      <div style={s.aiTitle}>🚗 Traffic Control AI</div>
      <div style={s.aiDesc}>
        Congestion reduce karke heat + pollution kam karo.
      </div>
    </div>

  </div>
</div>
         


          {/* ML Model Stats */}
          <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1, marginBottom: 8 }}>ML MODEL VALIDATION</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {[
                { val: "89.3%", label: "Accuracy", color: "#00ffe7" },
                { val: "0.87", label: "R² Score", color: "#00ffe7" },
                { val: "0.9°C", label: "MAE Error", color: "#00ffe7" },
                { val: "HIGH", label: "Confidence", color: "#00e676" },
              ].map((s2, i) => (
                <div key={i} style={{ background: "#020b18", border: "1px solid #0d2a45", borderRadius: 4, padding: "6px 8px", textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: s2.color }}>{s2.val}</div>
                  <div style={{ fontSize: 8, color: "#4a7fa5", marginTop: 2, letterSpacing: 1 }}>{s2.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 8, color: "#2a4a65", marginTop: 8 }}>
              Sources: <span style={{ color: "#00a8d4" }}>Landsat-8</span> · <span style={{ color: "#00a8d4" }}>Sentinel-2</span> · <span style={{ color: "#00a8d4" }}>ERA-5</span>
            </div>
          </div>

          {/* People at Risk */}
          <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1, marginBottom: 6 }}>PEOPLE AT RISK</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#ff2222", marginBottom: 8 }}>
              {vuln.total} <span style={{ fontSize: 10, color: "#4a7fa5", fontWeight: 400 }}>residents</span>
            </div>
            {[
              { icon: "👴", label: "Elderly (60+)", val: vuln.elderly, pct: "55%", color: "#ff2222" },
              { icon: "👶", label: "Children (0-12)", val: vuln.children, pct: "48%", color: "#ff9900" },
              { icon: "⛏️", label: "Outdoor Workers", val: vuln.workers, pct: "80%", color: "#ffd600" },
            ].map((v, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 6, marginBottom: 6, borderBottom: i < 2 ? "1px solid #0d2a45" : "none" }}>
                <span style={{ fontSize: 14 }}>{v.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: "#4a7fa5" }}>{v.label}</div>
                  <div style={{ fontSize: 11, color: "#cce8ff", fontWeight: 600 }}>{v.val}</div>
                </div>
                <div style={{ width: 50, height: 4, background: "#0d2a45", borderRadius: 2 }}>
                  <div style={{ width: v.pct, height: "100%", background: v.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Cost-Benefit */}
          <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1, marginBottom: 8 }}>COST–BENEFIT ANALYSIS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {solutions.map((sol, i) => (
                <div key={i} style={{
                  background: "#020b18",
                  border: `1px solid ${sol.badge === "BEST VALUE" ? "#00e676" : "#0d2a45"}`,
                  borderRadius: 4, padding: 8,
                  boxShadow: sol.badge === "BEST VALUE" ? "0 0 8px #00e67622" : "none"
                }}>
                  <div style={{ fontSize: 10, color: "#cce8ff", fontWeight: 600, marginBottom: 4 }}>{sol.title}</div>
                  <div style={{ fontSize: 9, color: "#ff8c00" }}>Cost: {sol.cost}</div>
                  <div style={{ fontSize: 9, color: "#00e676" }}>Save: {sol.saving}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#00ffe7", marginTop: 3 }}>ROI {sol.roi}</div>
                  {sol.badge && (
                    <div style={{ fontSize: 7, color: "#00e676", border: "1px solid #00e67644", background: "#00e67611", borderRadius: 2, padding: "1px 4px", display: "inline-block", marginTop: 3 }}>✦ {sol.badge}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Timeline */}
          <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: 10, marginBottom: 10 }}>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1, marginBottom: 8 }}>ACTION PLAN</div>
            {[
              { when: "IMMEDIATE · 0–2 WEEKS", action: solutions[1]?.title || "Deploy emergency cooling", impact: `↓ Feels-like temp by 3–5°C`, color: "#ff2222" },
              { when: "SHORT TERM · 1–3 MONTHS", action: solutions[0]?.title || "Cool Roof Coating", impact: `↓ Surface temp by ${solutions[0]?.temp || "-4°C"}`, color: "#ff9900" },
              { when: "LONG TERM · 6–12 MONTHS", action: solutions[2]?.title || "Green Roof System", impact: `↓ Area heat index by 2.1°C`, color: "#00ffe7" },
            ].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, paddingBottom: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, flexShrink: 0, marginTop: 2 }} />
                  {i < 2 && <div style={{ width: 1, flex: 1, background: "#0d2a45", margin: "3px 0" }} />}
                </div>
                <div style={{ paddingBottom: 4 }}>
                  <div style={{ fontSize: 8, color: "#4a7fa5", letterSpacing: 1 }}>{t.when}</div>
                  <div style={{ fontSize: 10, color: "#cce8ff", marginTop: 2 }}>{t.action}</div>
                  <div style={{ fontSize: 9, color: "#00e676", marginTop: 2 }}>{t.impact}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: 10 }}>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1, marginBottom: 6 }}>COOLING POTENTIAL</div>
            <Charts />
          </div>
        </div>

        {/* RIGHT PANEL — Materials & Interventions */}
        <div style={s.rightPanel}>
          <div style={s.sectionTitle}>Material Performance</div>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 10 }}>
            <thead>
              <tr>
                {["Material", "Albedo", "ΔTemp", "Grade"].map(h => (
                  <th key={h} style={{ fontSize: 9, color: "#4a7fa5", textTransform: "uppercase", letterSpacing: 1, padding: "3px 4px", textAlign: "left", borderBottom: "1px solid #0d2a45" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {city.materials.map((m, i) => (
                <tr key={i}>
                  <td style={{ fontSize: 10, color: "#cce8ff", padding: "5px 4px", borderBottom: "1px solid #0d2a4540" }}>{m.name}</td>
                  <td style={{ fontSize: 10, color: "#00ffe7", padding: "5px 4px", borderBottom: "1px solid #0d2a4540" }}>{m.albedo}</td>
                  <td style={{ fontSize: 10, color: "#00e676", padding: "5px 4px", borderBottom: "1px solid #0d2a4540" }}>{m.temp}</td>
                  <td style={{ padding: "5px 4px", borderBottom: "1px solid #0d2a4540" }}>
                    <span style={{ background: `${m.gradeColor}22`, border: `1px solid ${m.gradeColor}`, color: m.gradeColor, padding: "1px 5px", borderRadius: 3, fontSize: 10 }}>{m.grade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={s.sectionTitle}>Priority Interventions</div>
          {city.interventions.map((iv, i) => (
            <div key={i} style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: "8px 10px", display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: iv.color, flexShrink: 0, marginTop: 3 }} />
              <div>
                <div style={{ fontSize: 11, color: "#cce8ff", lineHeight: 1.4 }}>{iv.text}</div>
                <div style={{ fontSize: 9, letterSpacing: 1.5, marginTop: 4, fontWeight: 700, color: iv.color }}>● {iv.level}</div>
              </div>
            </div>
          ))}

          {/* Why is it hot */}
          <div style={{ background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: 10, marginTop: 4 }}>
            <div style={{ fontSize: 10, color: "#4a7fa5", letterSpacing: 1, marginBottom: 8 }}>WHY IS THIS AREA HOT?</div>
            {[
              { label: "Vegetation Loss", pct: 35, color: "#00e676" },
              { label: "Concrete Surfaces", pct: 30, color: "#ff9900" },
              { label: "Population Density", pct: 15, color: "#00ffe7" },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#cce8ff", marginBottom: 3 }}>
                  <span>{f.label}</span><span>{f.pct}%</span>
                </div>
                <div style={{ height: 4, background: "#0d2a45", borderRadius: 2 }}>
                  <div style={{ width: `${f.pct * 2}%`, height: "100%", background: f.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 10px #00ffe7} 50%{box-shadow:0 0 24px #00ffe7,0 0 40px #00ffe744} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { font-family: 'Inter', 'Segoe UI', sans-serif; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:#020b18} ::-webkit-scrollbar-thumb{background:#0d2a45;border-radius:2px}
        .leaflet-container { background: #020e1f !important; }
      `}</style>
    </div>
  );
}

const s = {
  root: { background: "#020b18", color: "#cce8ff", fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 13, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 18px", borderBottom: "1px solid #0d2a45", background: "#020d1c", flexShrink: 0 },
  topbarLeft: { display: "flex", alignItems: "center", gap: 14 },
  logoDot: { width: 30, height: 30, borderRadius: "50%", border: "2px solid #00ffe7", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2s infinite" },
  logoDotInner: { width: 10, height: 10, background: "#00ffe7", borderRadius: "50%" },
  title: { fontFamily: "'Inter','Segoe UI',sans-serif", fontSize: 16, fontWeight: 700, color: "#00c8ff" },
  topbarRight: { display: "flex", alignItems: "center", gap: 18, fontSize: 12 },
  badge: { padding: "3px 10px", borderRadius: 3, fontSize: 11, fontWeight: 600, letterSpacing: 1 },
  clock: { color: "#00c8ff", fontSize: 14 },
  sidebar: { width: 44, background: "#020d1c", borderRight: "1px solid #0d2a45", display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0", gap: 18, flexShrink: 0 },
  sideIcon: { width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", borderRadius: 4, fontSize: 16 },
  liveIndicator: { marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingBottom: 10 },
  liveDot: { width: 6, height: 6, borderRadius: "50%", background: "#00e676", animation: "blink 1s infinite" },
  leftPanel: { width: 220, borderRight: "1px solid #0d2a45", display: "flex", flexDirection: "column", padding: 10, gap: 8, overflowY: "auto", flexShrink: 0 },
  metricCard: { background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 },
  metricLabel: { fontSize: 10, color: "#4a7fa5", letterSpacing: 1, textTransform: "uppercase" },
  riskPanel: { background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: "10px 12px" },
  sectionTitle: { fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "#00c8ff", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "uppercase" },
  centerPanel: { flex: 1, display: "flex", flexDirection: "column", padding: 10, gap: 8, overflow: "hidden", minWidth: 0 },
  mapHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 },
  criticalBadge: { fontSize: 10, color: "#ff2222", border: "1px solid #ff2222", padding: "2px 8px", borderRadius: 3, background: "#ff222210", letterSpacing: 1, animation: "blink 1.5s infinite" },
  statusRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, flexShrink: 0 },
  statusCard: { background: "#040f1e", border: "1px solid #0d2a45", borderRadius: 6, padding: "8px 12px", textAlign: "center" },
  statusLabel: { fontSize: 9, letterSpacing: 1.5, color: "#4a7fa5", textTransform: "uppercase", marginBottom: 4 },
  aiPanel: { width: 260, borderLeft: "1px solid #0d2a45", borderRight: "1px solid #0d2a45", display: "flex", flexDirection: "column", padding: 10, gap: 0, overflowY: "auto", flexShrink: 0 },
  rightPanel: { width: 230, display: "flex", flexDirection: "column", padding: 10, gap: 6, overflowY: "auto", flexShrink: 0 },
  mainWrap: { display: "flex", flex: 1, overflow: "hidden" },
};
