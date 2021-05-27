import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import "./style.scss";

const PlottedGraph: React.FC<WithProps> = ({
  data,
  graphWidth,
  graphHeight,
}) => {
  const sgTrend = data.SGTrend;
  const scatterGraph = useRef();
  const width = graphWidth;
  const height = graphHeight;

  useEffect(() => {
    generateData();
  }, []);

  const generateData = () => {
    let chartData = [];

    for (let i = 0; i < sgTrend.length; i++) {
      const value = sgTrend[i].SGTotal;
      let removeLeadingZero = parseInt(sgTrend[i].Date, 10);

      const date = {
        day: removeLeadingZero,
        month: new Date(sgTrend[i].Date).getMonth(),
        year: new Date(sgTrend[i].Date).getFullYear(),
      };

      chartData.push({
        date: +(date.month + "." + date.day),
        label: i,
        value,
        tooltipContent: `${value}`,
      });
    }

    drawGraph(chartData);
  };

  const drawGraph = (chartData: any) => {
    const margin = { top: 10, right: 20, bottom: 10, left: 25 };

    const svg = d3
      .select(scatterGraph.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // .attr(
      //   "viewBox",
      //   `0 0 ${width + margin.left + margin.right} ${
      //     height + margin.top + margin.bottom
      //   }`
      // )
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleLinear()
      .domain(
        // @ts-ignore
        d3.extent(chartData, (d: any) => {
          return d.label;
        })
      )
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(
        d3.extent(chartData, (d: any) => {
          return +d.value;
        })
      )
      .range([height, 0]);

    svg
      .append("line")
      .attr("class", "medianLine")
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("x1", 0)
      .attr("x2", width)
      .attr("stroke", "#C0C6CB")
      .attr("stroke-width", 1);

    svg
      .append("g")
      .attr("transform", "translate(-8,0)")
      .call(d3.axisLeft(y).tickSize(0).tickSizeOuter(0))
      .attr(
        "style",
        "stroke-width: 0px; font-size: 12px; font-weight: normal; color: #46555F;"
      );

    const areagrad = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "areagrad")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    areagrad
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#007AFF")
      .attr("stop-opacity", 0.6);
    areagrad
      .append("stop")
      .attr("offset", "80%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "#007AFF")
      .attr("fill-opacity", 0.3)
      .attr("stroke", "none")
      .style("fill", "url(#areagrad)")
      .attr(
        "d",
        d3
          .area()
          .x((d: any) => {
            return x(d.label);
          })
          .y0(height)
          .y1((d: any) => {
            return y(d.value);
          })
      );

    svg
      .append("path")
      .datum(chartData)
      .attr("fill", "none")
      .attr("stroke", "#007AFF")
      .attr("stroke-width", 1)
      .attr(
        "d",
        d3
          .line()
          .x((d: any) => {
            return x(d.label);
          })
          .y((d: any) => {
            return y(d.value);
          })
      );

    svg
      .selectAll("myCircles")
      .data(chartData)
      .enter()
      .append("circle")
      .attr("fill", "white")
      .attr("stroke", "#007AFF")
      .attr("stroke-width", 1)
      .attr("drop-shadow", "0px -1px 2px 20px")
      .attr("cx", (d: any) => {
        return x(d.label);
      })
      .attr("cy", (d: any) => {
        return y(d.value);
      })
      .attr("r", 9 / 2);

    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "block")
      .style("opacity", 0);

    focus
      .append("circle")
      .attr("r", 9 / 2)
      .attr("class", "circle")
      .attr("fill", "#007AFF");

    const tooltip = focus
      .append("text")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute");

    const mousemove = (event: any) => {
      const bisect = d3.bisector((d: any) => d.label).left;
      const xPos = d3.pointer(event)[0];
      const x0 = bisect(chartData, x.invert(xPos));
      const d0 = chartData[x0];
      focus.attr("transform", `translate(${x(d0.label)},${y(d0.value)})`);
      tooltip.transition().duration(300).style("opacity", 1);
      tooltip.html(d0.tooltipContent || d0.label);
    };

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("position", "relative")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0)
      .on("mouseenter", () => {
        focus.transition().duration(100).style("opacity", 1);
        tooltip.transition().duration(300).style("opacity", 1);
      })
      .on("mouseout", () => {
        focus.transition().duration(100).style("opacity", 0);
        tooltip.transition().duration(300).style("opacity", 0);
      })
      .on("mousemove", mousemove);
  };

  return <div className="scattergraph" ref={scatterGraph} />;
};

export default PlottedGraph;

interface WithProps {
  data: any;
  graphWidth: number;
  graphHeight: number;
}
