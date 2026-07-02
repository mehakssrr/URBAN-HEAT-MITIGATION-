const cityData = {
  Delhi: {
    avgTemp: "37.8°C",
    peakTemp: "48.1°C",
    humidity: "68%",
    wind: "12.4 km/h",
    insight: "Industrial Zone shows highest heat risk.",
    chartData: [
      { name: "Cool Roof", value: 12 },
      { name: "Trees", value: 9 },
      { name: "Green Roof", value: 7 },
      { name: "Paint", value: 5 }
    ]
  },

  Mumbai: {
    avgTemp: "34.5°C",
    peakTemp: "43.2°C",
    humidity: "78%",
    wind: "16.1 km/h",
    insight: "Coastal winds reduce heat stress.",
    chartData: [
      { name: "Cool Roof", value: 8 },
      { name: "Trees", value: 12 },
      { name: "Green Roof", value: 10 },
      { name: "Paint", value: 4 }
    ]
  },

  Bengaluru: {
    avgTemp: "29.8°C",
    peakTemp: "38.5°C",
    humidity: "62%",
    wind: "10.5 km/h",
    insight: "Tree cover keeps temperatures lower.",
    chartData: [
      { name: "Cool Roof", value: 6 },
      { name: "Trees", value: 15 },
      { name: "Green Roof", value: 9 },
      { name: "Paint", value: 3 }
    ]
  }
};

export default cityData;
