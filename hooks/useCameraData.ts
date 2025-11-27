"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import {
  Accident,
  ProcessedAccident,
  SegmentosGeoJSON,
  CameraInfo,
  SeverityFilter,
  PrincipalFilter,
} from "@/types";
import {
  processAccidents,
  buildCameraInfo,
  getUniquePrincipals,
  generateAllMonths,
} from "@/utils/dataProcessing";

export function useCameraData() {
  const [segmentos, setSegmentos] = useState<SegmentosGeoJSON | null>(null);
  const [accidentes, setAccidentes] = useState<Accident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>("TODOS");
  const [principalFilter, setPrincipalFilter] = useState<PrincipalFilter>("Todas");

  // Selected camera (synced between map and chart)
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    async function loadData() {
      try {
        const [segmentosRes, accidentesRes] = await Promise.all([
          fetch("/camera_segments_100m_metrics.geojson"),
          fetch("/accidentes_camaras_2018_2022_v2.csv"),
        ]);

        const segmentosData = await segmentosRes.json();
        const accidentesText = await accidentesRes.text();
        const accidentesData = d3.csvParse(accidentesText) as unknown as Accident[];

        setSegmentos(segmentosData);
        setAccidentes(accidentesData);
        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Processed data
  const accidentesProcessed = useMemo<ProcessedAccident[]>(() => {
    if (!accidentes.length) return [];
    return processAccidents(accidentes);
  }, [accidentes]);

  const cameraInfo = useMemo<globalThis.Map<string, CameraInfo>>(() => {
    if (!segmentos) return new globalThis.Map();
    return buildCameraInfo(segmentos);
  }, [segmentos]);

  const principalOptions = useMemo<string[]>(() => {
    if (!segmentos) return [];
    return ["Todas", ...getUniquePrincipals(segmentos), "Otros"];
  }, [segmentos]);

  const allMonths = useMemo(() => generateAllMonths(), []);

  const accidentesByCamera = useMemo(() => {
    return d3.group(accidentesProcessed, (d) => d.id_camera);
  }, [accidentesProcessed]);

  // Camera selection handler
  const handleCameraSelect = useCallback((cameraId: string | null) => {
    setSelectedCamera(cameraId);
  }, []);

  return {
    // Data
    segmentos,
    accidentes,
    accidentesProcessed,
    cameraInfo,
    accidentesByCamera,
    allMonths,
    principalOptions,

    // State
    loading,
    error,
    severityFilter,
    principalFilter,
    selectedCamera,

    // Actions
    setSeverityFilter,
    setPrincipalFilter,
    handleCameraSelect,
  };
}