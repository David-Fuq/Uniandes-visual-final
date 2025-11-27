"use client";

import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import {
  ProcessedAccident,
  CameraInfo,
  SeverityFilter,
  LineData,
  LineDataPoint,
} from "@/types";
import { buildLineData } from "@/utils/dataProcessing";

interface LineChartProps {
  accidentesProcessed: ProcessedAccident[];
  cameraInfo: globalThis.Map<string, CameraInfo>;
  allMonths: Date[];
  severityFilter: SeverityFilter;
  principalFilter: string;
  selectedCamera: string | null;
  onCameraSelect: (cameraId: string | null) => void;
}

export default function LineChart({
  accidentesProcessed,
  cameraInfo,
  allMonths,
  severityFilter,
  principalFilter,
  selectedCamera,
  onCameraSelect,
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const lineData = useMemo(() => {
    return buildLineData(
      accidentesProcessed,
      cameraInfo,
      severityFilter,
      principalFilter,
      allMonths
    );
  }, [accidentesProcessed, cameraInfo, severityFilter, principalFilter, allMonths]);

  useEffect(() => {
    if (! svgRef.current) return;

    const svg = d3. select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);

    const width = 1000;
    const height = 400;
    const margin = { top: 40, right: 30, bottom: 50, left: 60 };

    svg.selectAll("*").remove();

    if (lineData.length === 0) {
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("text-anchor", "middle")
        .attr("fill", "#666")
        .text("No hay datos para los filtros seleccionados");
      return;
    }

    // Scales
    const xScale = d3
      .scaleTime()
      .domain([allMonths[0], allMonths[allMonths.length - 1]])
      .range([margin.left, width - margin.right]);

    const maxCount = d3.max(lineData, (d) => d3.max(d.points, (p) => p.count)) || 1;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxCount])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleOrdinal(d3.schemeTableau10)
      .domain(lineData.map((d) => d.cameraId));

    // Grid lines
    svg
      .append("g")
      .selectAll("line")
      .data(yScale.ticks(10))
      .join("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", (d) => yScale(d))
      .attr("y2", (d) => yScale(d))
      .attr("stroke", "#eee")
      .attr("stroke-width", 1);

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          . ticks(d3.timeYear. every(1))
          .tickFormat((d) => d3.timeFormat("%Y")(d as Date))
      )
      . selectAll("text")
      .attr("font-size", "11px")
      .attr("fill", "#666");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale). ticks(10))
      .selectAll("text")
      .attr("font-size", "11px")
      .attr("fill", "#666");

    // Line generator
    const line = d3
      .line<LineDataPoint>()
      .x((d) => xScale(d. date))
      .y((d) => yScale(d.count))
      .curve(d3.curveMonotoneX);

    // Installation line (hidden initially)
    const installLine = svg
      .append("line")
      .attr("stroke", "#e94560")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6,4")
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .style("display", "none");

    const installLabel = svg
      .append("text")
      .attr("font-size", "12px")
      . attr("fill", "#e94560")
      .attr("font-weight", "600")
      .attr("text-anchor", "middle")
      . style("display", "none");

    // Draw lines
    svg
      .append("g")
      .selectAll("path")
      .data(lineData)
      .join("path")
      .attr("d", (d) => line(d.points))
      .attr("fill", "none")
      .attr("stroke", (d) => colorScale(d. cameraId))
      .attr("stroke-width", (d) => (selectedCamera === d.cameraId ? 4 : 1.5))
      .attr("opacity", (d) => (selectedCamera === d.cameraId ? 1 : 0.6))
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        if (selectedCamera !== d.cameraId) {
          d3.select(this). attr("stroke-width", 4). attr("opacity", 1);
        }

        tooltip
          .style("display", "block")
          .html(
            `
            <b>Cámara:</b> ${d.cameraId}<br>
            <b>Vía:</b> ${d.principal || "Otros"}<br>
            <b>Total:</b> ${d.totalAccidents} accidentes<br>
            <span style="color: #888; font-size: 11px;">Clic para seleccionar</span>
          `
          );
      })
      .on("mousemove", function (event) {
        const [x, y] = d3. pointer(event, svgRef. current);
        tooltip.style("left", x + 15 + "px").style("top", y + 15 + "px");
      })
      . on("mouseout", function (event, d) {
        if (selectedCamera !== d.cameraId) {
          d3. select(this).attr("stroke-width", 1.5).attr("opacity", 0.6);
        }
        tooltip.style("display", "none");
      })
      .on("click", function (event, d) {
        onCameraSelect(selectedCamera === d.cameraId ? null : d.cameraId);
      });

    // Show install line for selected camera
    if (selectedCamera) {
      const selectedData = lineData.find((d) => d.cameraId === selectedCamera);
      if (selectedData?. installDate) {
        const xPos = xScale(selectedData. installDate);
        installLine.attr("x1", xPos).attr("x2", xPos). style("display", "block");
        installLabel
          .attr("x", xPos)
          .attr("y", margin.top - 10)
          .text(`Instalación: ${selectedData.installDate. toLocaleDateString("es-CO")}`)
          .style("display", "block");
      }
    }

    // Title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      . attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text(`Accidentes Mensuales por Cámara (${severityFilter})`);

    // Axis labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      . attr("font-size", "12px")
      .attr("fill", "#666")
      .text("Año");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      . attr("font-size", "12px")
      .attr("fill", "#666")
      .text("Número de Accidentes");
  }, [lineData, allMonths, severityFilter, selectedCamera, onCameraSelect]);

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 400"
        className="w-full"
        style={{ backgroundColor: "white" }}
      />
      <div
        ref={tooltipRef}
        className="absolute hidden bg-white text-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 text-sm pointer-events-none z-50"
        style={{ display: "none" }}
      />
    </div>
  );
}