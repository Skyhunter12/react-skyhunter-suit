"use client";
import { useEffect, useState } from "react";
import { AstronautData } from "../utils/interfaces";

const AstronautWithAdvancedAttachments = ({
    showRespirationRate,
    showBodyTemperature,
    showBloodOxygen,
    showRegulatedPressure,
    showLeakDetection,
    showHeartRate,
    showActuators,
    showBloodPressure,
    astronautsData,
  }: {
    showRespirationRate?: boolean;
    showBodyTemperature?: boolean;
    showBloodOxygen?: boolean;
    showRegulatedPressure?: boolean;
    showLeakDetection?: boolean;
    showMaterialInnovations?: boolean;
    showRapidPressurization?: boolean;
    showHeartRate?:boolean,
    showActuators?:boolean,
    showBloodPressure?:boolean,
    astronautsData?: AstronautData[] | null;
  }) => {
    const centerX = 200; // Astronaut's center X
  const centerY = 200; // Astronaut's center Y
  const radius = 180; // Distance from the astronaut to the rectangles
  const rectWidth = 60; // Width of the rectangles
  const rectHeight = 30; // H Above the rectangle
  
  let [currentCondition, setCurrentCondition] = useState<AstronautData | null>(null)
  const previousHrtState = currentCondition?.name?.split(" ")
  
  if(previousHrtState){
  currentCondition?.values?.map((item:any, i:any) => {
    item = `${previousHrtState[i]} ${item}`
  })
  }
  
  const attachments = [
    { label: "BP", show: showBloodPressure , value: currentCondition?.bp},
    { label: "Actuators", show: showActuators, value: currentCondition?.Actuators},
    { label: "Previous Heart Rate", show: showHeartRate, value:currentCondition?.values[0] },
    { label: "Current Heart Rate", show: showHeartRate, value: previousHrtState ?currentCondition?.values?.splice(1,1):0 },
    { label: "Respiration", show: showRespirationRate, value: showRespirationRate ?currentCondition?.respiration_rate :0},
    { label: "Temp", show: showBodyTemperature, value: showBodyTemperature? currentCondition?.body_temperature :0},
    { label: "Pressure", show: showRegulatedPressure, value:showRegulatedPressure ? currentCondition?.regulated_pressure :0},
    { label: "Leak", show: showLeakDetection, value: showLeakDetection ?currentCondition?.leak_detection :0},
  ].filter((attachment) => attachment.show); // Only include active attachments
  
  useEffect(() => {
    if (astronautsData) {
      let randomIndex = Math.floor(Math.random() * astronautsData.length);
      let randomData = astronautsData[randomIndex];
      console.log("randomData", randomData);
      setCurrentCondition(randomData);
    }
  }, [astronautsData]);
  
  const angleStep = (2 * Math.PI) / attachments.length; // Angle between each rectangle
  
  return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 400"
        width="800"
        height="800"
      >
        {/* Astronaut */}
        <circle cx={centerX} cy={centerY - 100} r="60" fill="#d9d9d9" />
        <circle cx={centerX} cy={centerY - 100} r="50" fill="#2c2c2c" />
        <rect x={centerX - 40} y={centerY - 40} width="80" height="120" rx="10" fill="#d9d9d9" />
        <rect x={centerX - 90} y={centerY - 30} width="50" height="20" rx="5" fill="#d9d9d9" />
        <rect x={centerX + 40} y={centerY - 30} width="50" height="20" rx="5" fill="#d9d9d9" />
        <rect x={centerX - 30} y={centerY + 80} width="20" height="60" rx="5" fill="#d9d9d9" />
        <rect x={centerX + 10} y={centerY + 80} width="20" height="60" rx="5" fill="#d9d9d9" />
  
        {/* Attachments in circular order */}
        {attachments.map((attachment, index) => {
          const angle = index * angleStep; // Angle for this attachment
          const rectX = centerX + radius * Math.cos(angle) - rectWidth / 2; // X position
          const rectY = centerY + radius * Math.sin(angle) - rectHeight / 2; // Y position
  
          return (
            <g key={index}>
              {/* Rectangle */}
              <rect
                x={rectX}
                y={rectY}
                width={rectWidth}
                height={rectHeight}
                rx="5"
                fill="#4caf50"
                z={1}
              />
              {/* Label */}
              <text
                x={rectX + rectWidth / 2}
                y={rectY + rectHeight / 2 + 4} // Center the text
                textAnchor="middle"
                fontSize="10"
                fill="#ffffff"
                z={1}
              >
                {attachment.label} {attachment.value}
              </text>
              {/* Line connecting to astronaut */}
              <line
                x1={centerX}
                y1={centerY}
                x2={rectX + rectWidth / 2}
                y2={rectY + rectHeight / 2}
                stroke="#4caf50"
                strokeWidth="2"
              />
            </g>
          );
        })}
      </svg>
    );
  };
  
  export default AstronautWithAdvancedAttachments;