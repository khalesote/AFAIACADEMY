import React from "react";
import { View } from "react-native";
import Svg, { Line, Circle, Rect, Text as SvgText, Polygon, Ellipse } from "react-native-svg";

// Etiquetas en español y árabe
const bodyParts = [
  { nameEs: "Cabeza", x: 160, y: 55, labelX: 60, labelY: 30 },
  { nameEs: "Ojo", x: 148, y: 78, labelX: 90, labelY: 70 },
  { nameEs: "Ojo", x: 172, y: 78, labelX: 230, labelY: 70 },
  { nameEs: "Boca", x: 160, y: 97, labelX: 70, labelY: 110 },
  { nameEs: "Oreja", x: 125, y: 80, labelX: 40, labelY: 90 },
  { nameEs: "Oreja", x: 195, y: 80, labelX: 280, labelY: 90 },
  { nameEs: "Cuello", x: 160, y: 120, labelX: 60, labelY: 135 },
  { nameEs: "Hombro", x: 100, y: 170, labelX: 30, labelY: 170 },
  { nameEs: "Hombro", x: 220, y: 170, labelX: 290, labelY: 170 },
  { nameEs: "Brazo", x: 60, y: 220, labelX: 10, labelY: 240 },
  { nameEs: "Brazo", x: 260, y: 220, labelX: 310, labelY: 240 },
  { nameEs: "Mano", x: 40, y: 300, labelX: 0, labelY: 320 },
  { nameEs: "Mano", x: 280, y: 300, labelX: 320, labelY: 320 },
  { nameEs: "Pecho", x: 160, y: 170, labelX: 210, labelY: 150 },
  { nameEs: "Abdomen", x: 160, y: 230, labelX: 210, labelY: 230 },
  { nameEs: "Pierna", x: 140, y: 330, labelX: 80, labelY: 390 },
  { nameEs: "Pierna", x: 180, y: 330, labelX: 240, labelY: 390 },
  { nameEs: "Pie", x: 140, y: 400, labelX: 100, labelY: 420 },
  { nameEs: "Pie", x: 180, y: 400, labelX: 220, labelY: 420 },
];

export default function HumanBodyDiagram() {
  return (
    <View style={{ alignItems: "center", marginVertical: 24 }}>
      <Svg height="420" width="320">
        {/* Fondo llamativo */}
        <Rect x="0" y="0" width="320" height="420" fill="#ffe082" />
        {/* Cuerpo: cabeza */}
        <Circle cx="160" cy="80" r="35" stroke="#222" strokeWidth="3" fill="#eaeaea" />
        {/* Ojos */}
        <Circle cx="148" cy="78" r="4" fill="#222" />
        <Circle cx="172" cy="78" r="4" fill="#222" />
        {/* Boca */}
        <Ellipse cx="160" cy="95" rx="10" ry="5" fill="none" stroke="#222" strokeWidth="2" />
        {/* Orejas */}
        <Ellipse cx="125" cy="80" rx="6" ry="12" fill="#eaeaea" stroke="#222" strokeWidth="2" />
        <Ellipse cx="195" cy="80" rx="6" ry="12" fill="#eaeaea" stroke="#222" strokeWidth="2" />
        {/* Cuerpo: torso */}
        <Rect
          x="140"
          y="115"
          width="40"
          height="120"
          rx="16"
          stroke="#222"
          strokeWidth="3"
          fill="#eaeaea"
        />
        {/* Cuerpo: brazos */}
        <Line x1="160" y1="150" x2="60" y2="250" stroke="#222" strokeWidth="3" />
        <Line x1="160" y1="150" x2="260" y2="250" stroke="#222" strokeWidth="3" />
        {/* Cuerpo: piernas */}
        <Line x1="160" y1="235" x2="140" y2="400" stroke="#222" strokeWidth="3" />
        <Line x1="160" y1="235" x2="180" y2="400" stroke="#222" strokeWidth="3" />
        {/* Cuerpo: manos */}
        <Circle cx="60" cy="250" r="15" stroke="#222" strokeWidth="3" fill="#eaeaea" />
        <Circle cx="260" cy="250" r="15" stroke="#222" strokeWidth="3" fill="#eaeaea" />
        {/* Cuerpo: pies */}
        <Circle cx="140" cy="400" r="12" stroke="#222" strokeWidth="3" fill="#eaeaea" />
        <Circle cx="180" cy="400" r="12" stroke="#222" strokeWidth="3" fill="#eaeaea" />
        {/* Flechas y etiquetas */}
        {bodyParts.map((part, idx) => {
          // Calcular la dirección de la flecha
          const dx = part.x - part.labelX;
          const dy = part.y - part.labelY;
          const length = Math.sqrt(dx * dx + dy * dy);
          // Punto final de la línea (antes de la punta de flecha)
          const arrowLength = 12;
          const ratio = (length - arrowLength) / length;
          const x2 = part.labelX + dx * ratio;
          const y2 = part.labelY + dy * ratio;
          // Puntos para la punta de flecha
          const angle = Math.atan2(dy, dx);
          const arrowAngle = Math.PI / 7;
          const arrowSize = 7;
          const arrowPoint1 = {
            x: part.x - arrowSize * Math.cos(angle - arrowAngle),
            y: part.y - arrowSize * Math.sin(angle - arrowAngle),
          };
          const arrowPoint2 = {
            x: part.x - arrowSize * Math.cos(angle + arrowAngle),
            y: part.y - arrowSize * Math.sin(angle + arrowAngle),
          };
          return (
            <React.Fragment key={idx}>
              {/* Línea de la flecha */}
              <Line
                x1={part.labelX}
                y1={part.labelY}
                x2={x2}
                y2={y2}
                stroke="#1976d2"
                strokeWidth="2"
              />
              {/* Punta de flecha manual */}
              <Polygon
                points={`${part.x},${part.y} ${arrowPoint1.x},${arrowPoint1.y} ${arrowPoint2.x},${arrowPoint2.y}`}
                fill="#1976d2"
              />
              {/* Etiqueta */}
              <SvgText
                x={part.labelX}
                y={part.labelY - 5}
                fontSize="12"
                fill="#1976d2"
                fontWeight="bold"
              >
                {part.nameEs}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}
