import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const cities = [
  {
    id: "industrial",
    name: "Industrial Zone",
    lat: 28.6448,
    lng: 77.2167,
    temp: 48.1,
    color: "#ff2222",
    risk: "CRITICAL",
    avgTemp: "48.1",
    peakTemp: "51.2",
    wind: "8.2",
    humidity: "72",
    bar: 97,
    score: 9.7,
    interventions: [
      { text: "Deploy emergency misting arrays immediately", level: "CRITICAL", color: "#ff2222" },
      { text: "Evacuate heat-sensitive workers", level: "CRITICAL", color: "#ff2222" },
      { text: "Install cool roof panels on factories", level: "HIGH", color: "#ff9900" },
    ],
    materials: [
      { name: "White Membrane Roof", albedo: "0.82", temp: "-4.2°C", grade: "A+", gradeColor: "#00e676" },
      { name: "Cool Asphalt Blend", albedo: "0.68", temp: "-2.8°C", grade: "A", gradeColor: "#00c8ff" },
      { name: "Solar Reflective Paint", albedo: "0.75", temp: "-3.4°C", grade: "A", gradeColor: "#00c8ff" },
    ],
  },
  {
    id: "downtown",
    name: "Downtown Core",
    lat: 28.6328,
    lng: 77.2197,
    temp: 46.9,
    color: "#ff6600",
    risk: "CRITICAL",
    avgTemp: "46.9",
    peakTemp: "49.8",
    wind: "10.1",
    humidity: "65",
    bar: 92,
    score: 9.2,
    interventions: [
      { text: "Activate reflective surface protocol", level: "HIGH", color: "#ff9900" },
      { text: "Open cooling centers for residents", level: "HIGH", color: "#ff9900" },
      { text: "Increase tree canopy coverage", level: "MEDIUM", color: "#ffd600" },
    ],
    materials: [
      { name: "Green Roof System", albedo: "0.51", temp: "-3.9°C", grade: "A+", gradeColor: "#00e676" },
      { name: "Cool Asphalt Blend", albedo: "0.68", temp: "-2.8°C", grade: "A", gradeColor: "#00c8ff" },
      { name: "Permeable Concrete", albedo: "0.44", temp: "-1.9°C", grade: "B+", gradeColor: "#ffd600" },
    ],
  },
  {
    id: "financial",
    name: "Financial District",
    lat: 28.6258,
    lng: 77.2095,
    temp: 45.8,
    color: "#ff9900",
    risk: "HIGH",
    avgTemp: "45.8",
    peakTemp: "47.5",
    wind: "12.4",
    humidity: "68",
    bar: 88,
    score: 8.8,
    interventions: [
      { text: "Green roof fast-track permitting", level: "MEDIUM", color: "#ffd600" },
      { text: "Cool pavement pilot on main streets", level: "MEDIUM", color: "#ffd600" },
      { text: "Smart shade structure installation", level: "SCHEDULED", color: "#00c8ff" },
    ],
    materials: [
      { name: "White Membrane Roof", albedo: "0.82", temp: "-4.2°C", grade: "A+", gradeColor: "#00e676" },
      { name: "Solar Reflective Paint", albedo: "0.75", temp: "-3.4°C", grade: "A", gradeColor: "#00c8ff" },
      { name: "Green Roof System", albedo: "0.51", temp: "-3.9°C", grade: "A+", gradeColor: "#00e676" },
    ],
  },
  {
    id: "midtown",
    name: "Midtown East",
    lat: 28.6388,
    lng: 77.2350,
    temp: 39.6,
    color: "#ffd600",
    risk: "WARNING",
    avgTemp: "39.6",
    peakTemp: "42.1",
    wind: "14.2",
    humidity: "60",
    bar: 81,
    score: 8.1,
    interventions: [
      { text: "Install solar reflective paint on buildings", level: "SCHEDULED", color: "#00c8ff" },
      { text: "Urban greening along main corridor", level: "SCHEDULED", color: "#00c8ff" },
      { text: "Monitor temperature every 2 hours", level: "MEDIUM", color: "#ffd600" },
    ],
    materials: [
      { name: "Cool Asphalt Blend", albedo: "0.68", temp: "-2.8°C", grade: "A", gradeColor: "#00c8ff" },
      { name: "Permeable Concrete", albedo: "0.44", temp: "-1.9°C", grade: "B+", gradeColor: "#ffd600" },
      { name: "Solar Reflective Paint", albedo: "0.75", temp: "-3.4°C", grade: "A", gradeColor: "#00c8ff" },
    ],
  },
  {
    id: "westside",
    name: "West Side",
    lat: 28.6298,
    lng: 77.1950,
    temp: 35.5,
    color: "#00e676",
    risk: "MODERATE",
    avgTemp: "35.5",
    peakTemp: "37.8",
    wind: "16.5",
    humidity: "55",
    bar: 74,
    score: 7.4,
    interventions: [
      { text: "Maintain current green infrastructure", level: "SCHEDULED", color: "#00c8ff" },
      { text: "Expand park areas near residential zones", level: "SCHEDULED", color: "#00c8ff" },
      { text: "Routine pavement temperature checks", level: "SCHEDULED", color: "#00c8ff" },
    ],
    materials: [
      { name: "Green Roof System", albedo: "0.51", temp: "-3.9°C", grade: "A+", gradeColor: "#00e676" },
      { name: "Permeable Concrete", albedo: "0.44", temp: "-1.9°C", grade: "B+", gradeColor: "#ffd600" },
      { name: "White Membrane Roof", albedo: "0.82", temp: "-4.2°C", grade: "A+", gradeColor: "#00e676" },
    ],
  },
  {
    id: "suburban",
    name: "Suburban District",
    lat: 28.6528,
    lng: 77.2050,
    temp: 29.8,
    color: "#00c8ff",
    risk: "LOW",
    avgTemp: "29.8",
    peakTemp: "32.1",
    wind: "18.3",
    humidity: "48",
    bar: 60,
    score: 6.0,
    interventions: [
      { text: "No immediate action required", level: "SCHEDULED", color: "#00c8ff" },
      { text: "Continue monitoring heat index", level: "SCHEDULED", color: "#00c8ff" },
      { text: "Prepare cool zone plans for summer", level: "SCHEDULED", color: "#00c8ff" },
    ],
    materials: [
      { name: "Cool Asphalt Blend", albedo: "0.68", temp: "-2.8°C", grade: "A", gradeColor: "#00c8ff" },
      { name: "Green Roof System", albedo: "0.51", temp: "-3.9°C", grade: "A+", gradeColor: "#00e676" },
      { name: "Permeable Concrete", albedo: "0.44", temp: "-1.9°C", grade: "B+", gradeColor: "#ffd600" },
    ],
  },
];

export { cities };

export default function MapView({ onCitySelect, selectedCity }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [28.6380, 77.2090],
      zoom: 13,
      zoomControl: true,
      attributionControl: false,
    });

    // Dark tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    // Add city markers
    cities.forEach((city) => {
      // Heat circle
      const circle = L.circle([city.lat, city.lng], {
        color: city.color,
        fillColor: city.color,
        fillOpacity: 0.25,
        weight: 2,
        radius: 600,
      }).addTo(map);

      // Custom marker icon
      const icon = L.divIcon({
        className: "",
        html: `
          <div style="
            background: #000000cc;
            border: 2px solid ${city.color};
            border-radius: 4px;
            padding: 3px 7px;
            color: ${city.color};
            font-size: 11px;
            font-family: monospace;
            white-space: nowrap;
            box-shadow: 0 0 10px ${city.color}88;
            cursor: pointer;
          ">
            ${city.temp}°C — ${city.name}
          </div>
        `,
        iconAnchor: [0, 0],
      });

      const marker = L.marker([city.lat, city.lng], { icon }).addTo(map);

      marker.on("click", () => {
        onCitySelect(city);
      });

      circle.on("click", () => {
        onCitySelect(city);
      });

      markersRef.current.push({ marker, circle, city });
    });

    mapInstanceRef.current = map;
  }, []);

  // Highlight selected city
  useEffect(() => {
    if (!selectedCity) return;
    markersRef.current.forEach(({ circle, city }) => {
      if (city.id === selectedCity.id) {
        circle.setStyle({ fillOpacity: 0.5, weight: 3 });
      } else {
        circle.setStyle({ fillOpacity: 0.2, weight: 1.5 });
      }
    });
  }, [selectedCity]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 6,
        overflow: "hidden",
        border: "1px solid #0d2a45",
      }}
    />
  );
}
