import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./style.scss";

const BarGraph: React.FC<WithProps> = ({ data }) => {
  const barContainer = useRef();
  useEffect(() => {
    drawBar();
  }, []);

  const drawBar = () => {
    const svg = d3.select(barContainer.current);
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };

    svg.style("display", "flex");

    svg
      .attr("width", "70%")
      .attr("height", 20)
      .style("margin", "auto")

      .append("g")
      .attr("width", 100)
      .attr("height", 20)
      .style("display", "flex");
  };

  return (
    <div className="bargraph">
      <span className="SGleft">
        {data["SG_Category_Detail"].replace(/_/g, " ")}
      </span>
      <svg className="bar" ref={barContainer} />
      <span className="SGright">{data["avg-SG-per-round"]}</span>
    </div>
  );
};

export default BarGraph;

interface WithProps {
  data: any;
}
