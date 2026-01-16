import React from "react";
import { View } from "react-native";
import Svg, { Rect, Polygon, Line, Text as SvgText } from "react-native-svg";

// Partes de la casa, habitaciones y traducción al árabe
const houseParts = [
  { nameEs: "Tejado", nameAr: "سقف", x: 120, y: 40, labelX: 30, labelY: 30 },
  {
    nameEs: "Ventana",
    nameAr: "نافذة",
    x: 70,
    y: 120,
    labelX: 10,
    labelY: 120,
  },
  { nameEs: "Puerta", nameAr: "باب", x: 120, y: 180, labelX: 180, labelY: 200 },
  {
    nameEs: "Salón",
    nameAr: "غرفة الجلوس",
    x: 210,
    y: 120,
    labelX: 250,
    labelY: 100,
  },
  {
    nameEs: "Cocina",
    nameAr: "مطبخ",
    x: 210,
    y: 180,
    labelX: 260,
    labelY: 180,
  },
  {
    nameEs: "Dormitorio",
    nameAr: "غرفة النوم",
    x: 70,
    y: 60,
    labelX: 10,
    labelY: 60,
  },
  { nameEs: "Baño", nameAr: "حمام", x: 210, y: 60, labelX: 260, labelY: 60 },
];

export default function HouseDiagram() {
  return (
    <View style={{ alignItems: "center", marginVertical: 24 }}>
      <Svg height="260" width="320">
        {/* Fondo */}
        <Rect x="0" y="0" width="320" height="260" fill="#b3e5fc" />
        {/* Casa base */}
        <Rect
          x="60"
          y="80"
          width="160"
          height="120"
          fill="#fffde7"
          stroke="#222"
          strokeWidth="3"
          rx="10"
        />
        {/* Tejado */}
        <Polygon points="60,80 140,20 220,80" fill="#ff8a65" stroke="#222" strokeWidth="3" />
        {/* Puerta */}
        <Rect
          x="125"
          y="150"
          width="30"
          height="50"
          fill="#ffe082"
          stroke="#222"
          strokeWidth="2"
          rx="5"
        />
        {/* Ventana izq */}
        <Rect
          x="75"
          y="110"
          width="30"
          height="30"
          fill="#b3e5fc"
          stroke="#222"
          strokeWidth="2"
          rx="5"
        />
        {/* Ventana der (cocina) */}
        <Rect
          x="175"
          y="110"
          width="30"
          height="30"
          fill="#b3e5fc"
          stroke="#222"
          strokeWidth="2"
          rx="5"
        />
        {/* Habitaciones (dormitorio y baño) */}
        <Rect
          x="75"
          y="60"
          width="30"
          height="20"
          fill="#c8e6c9"
          stroke="#222"
          strokeWidth="2"
          rx="4"
        />
        <Rect
          x="175"
          y="60"
          width="30"
          height="20"
          fill="#ffe0b2"
          stroke="#222"
          strokeWidth="2"
          rx="4"
        />
        {/* Flechas y etiquetas */}
        {houseParts.map((part, idx) => (
          <SvgText
            key={idx}
            x={part.x}
            y={part.y - 10}
            fontSize="13"
            fill="#1976d2"
            fontWeight="bold"
            textAnchor="middle"
          >
            {part.nameEs}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}
