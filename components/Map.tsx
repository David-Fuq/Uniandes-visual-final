"use client";

import { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as d3 from "d3";
import type { GeoJSON as GeoJSONType } from "geojson";
import {
  SegmentosGeoJSON,
  ProcessedAccident,
  CameraInfo,
  SeverityFilter,
  CameraStats,
  Segment,
} from "@/types";
import { calculateEffectiveness } from "@/utils/dataProcessing";

interface MapProps {
  segmentos: SegmentosGeoJSON;
  accidentesProcessed: ProcessedAccident[];
  cameraInfo: globalThis.Map<string, CameraInfo>;
  accidentesByCamera: globalThis.Map<string, ProcessedAccident[]>;
  severityFilter: SeverityFilter;
  principalFilter: string;
  selectedCamera: string | null;
  onCameraSelect: (cameraId: string | null) => void;
  onStatsUpdate: (
    stats: { reduction: number; increase: number; noChange: number },
    total: number,
    selectedStats: CameraStats | null
  ) => void;
}

export default function Map({
  segmentos,
  accidentesProcessed,
  cameraInfo,
  accidentesByCamera,
  severityFilter,
  principalFilter,
  selectedCamera,
  onCameraSelect,
  onStatsUpdate,
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const layersRef = useRef<globalThis.Map<string, L.GeoJSON>>(new globalThis.Map());

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef. current || mapRef.current) return;

    const bounds = d3.geoBounds(segmentos as unknown as GeoJSONType);
    const center: [number, number] = [
      (bounds[0][1] + bounds[1][1]) / 2,
      (bounds[0][0] + bounds[1][0]) / 2,
    ];

    mapRef.current = L.map(mapContainerRef.current). setView(center, 12);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap © CARTO",
        maxZoom: 19,
        subdomains: "abcd",
      }
    ). addTo(mapRef.current);

    layerGroupRef.current = L. layerGroup().addTo(mapRef.current);

    // Fit bounds
    const geoJsonLayer = L.geoJSON(segmentos as unknown as GeoJSONType);
    mapRef.current.fitBounds(geoJsonLayer.getBounds(), { padding: [20, 20] });

    return () => {
      mapRef. current?.remove();
      mapRef.current = null;
    };
  }, [segmentos]);

  // Filter and calculate stats
  const { filteredFeatures, segmentStats, statsCount } = useMemo(() => {
    const stats = new globalThis.Map<string, CameraStats>();
    const count = { reduction: 0, increase: 0, noChange: 0 };

    const filtered = segmentos.features.filter((f) => {
      const info = cameraInfo.get(f.properties.camera_id);
      if (!info) return false;

      if (principalFilter === "Todas") return true;
      if (principalFilter === "Otros")
        return info.principal == null || info.principal === "";
      return info.principal === principalFilter;
    });

    const processedCameras = new Set<string>();

    filtered.forEach((f) => {
      const cameraId = f.properties.camera_id;
      if (! processedCameras.has(cameraId)) {
        processedCameras.add(cameraId);
        const effectiveness = calculateEffectiveness(
          cameraId,
          cameraInfo,
          accidentesByCamera,
          severityFilter
        );
        stats.set(cameraId, effectiveness);

        if (effectiveness. status === "Reducción") count.reduction++;
        else if (effectiveness.status === "Aumento") count.increase++;
        else count.noChange++;
      }
    });

    return { filteredFeatures: filtered, segmentStats: stats, statsCount: count };
  }, [
    segmentos,
    cameraInfo,
    accidentesByCamera,
    severityFilter,
    principalFilter,
  ]);

  // Update parent with stats
  useEffect(() => {
    const selectedStats = selectedCamera
      ? segmentStats.get(selectedCamera) || null
      : null;
    const uniqueCameras = new Set(filteredFeatures.map((f) => f.properties.camera_id));
    onStatsUpdate(statsCount, uniqueCameras.size, selectedStats);
  }, [statsCount, filteredFeatures, selectedCamera, segmentStats, onStatsUpdate]);

  // Update map layers
  useEffect(() => {
    if (!layerGroupRef.current) return;

    layerGroupRef.current.clearLayers();
    layersRef.current. clear();

    filteredFeatures. forEach((f) => {
      const cameraId = f.properties.camera_id;
      const stats = segmentStats.get(cameraId);
      const isSelected = selectedCamera === cameraId;

      const layer = L.geoJSON(f as unknown as GeoJSONType, {
        style: {
          color: stats?. color || "#888888",
          weight: isSelected ?  8 : 4,
          opacity: isSelected ? 1 : 0.9,
          lineCap: "round",
          lineJoin: "round",
        },
      });

      layer.on("mouseover", (e) => {
        if (selectedCamera !== cameraId) {
          (e.target as L.GeoJSON).setStyle({ weight: 8, opacity: 1 });
        }
      });

      layer.on("mouseout", (e) => {
        if (selectedCamera !== cameraId) {
          (e.target as L.GeoJSON).setStyle({ weight: 4, opacity: 0.9 });
        }
      });

      layer.on("click", () => {
        onCameraSelect(selectedCamera === cameraId ? null : cameraId);
      });

      const tooltipContent = `
        <b>Cámara:</b> ${cameraId}<br>
        ${f.properties.principal ?  `<b>Vía:</b> ${f.properties. principal}<br>` : ""}
        <b>Estado:</b> ${stats?.status || "N/A"}
      `;
      layer.bindTooltip(tooltipContent, { sticky: true });

      layerGroupRef.current?. addLayer(layer);
      layersRef.current.set(cameraId, layer);
    });
  }, [filteredFeatures, segmentStats, selectedCamera, onCameraSelect]);

  // Highlight selected camera
  useEffect(() => {
    layersRef.current.forEach((layer, cameraId) => {
      const isSelected = selectedCamera === cameraId;

      layer.setStyle({
        weight: isSelected ? 8 : 4,
        opacity: isSelected ? 1 : 0.9,
      });

      if (isSelected && mapRef.current) {
        mapRef.current.fitBounds(layer.getBounds(), { padding: [100, 100] });
      }
    });
  }, [selectedCamera, segmentStats]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    />
  );
}