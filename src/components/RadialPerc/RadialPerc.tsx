import * as d3 from "d3";
import React, { useRef } from "react";

const RadialPerc: React.FC<WithProps> = (props) => {
  const { svgWidth, arcWidth, progressPercentage, colorIndicator } = props;
  const svgHeight = svgWidth;
  const arcOuterRadius = svgWidth / 2;
  const arcInnerRadius = svgWidth / 2 - arcWidth;
  const arcGenerator: any = d3
    .arc()
    .innerRadius(arcInnerRadius)
    .outerRadius(arcOuterRadius)
    .startAngle(0)
    .cornerRadius(5);

  const progressArc = (value: number) =>
    arcGenerator({
      endAngle: 2 * Math.PI * value,
    });

  return (
    <svg height={svgHeight} width={svgWidth}>
      <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
        <path d={progressArc(1)} fill="#E6E8EB" strokeWidth="3" />
      </g>
      <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
        <path
          d={progressArc(progressPercentage / 100)}
          strokeWidth="3"
          fill={colorIndicator}
        />
      </g>
    </svg>
  );
};

export default RadialPerc;

interface WithProps {
  svgWidth: number;
  arcWidth: number;
  progressPercentage: number;
  colorIndicator: string;
}
