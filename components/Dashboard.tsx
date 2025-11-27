"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useCameraData } from "@/hooks/useCameraData";
import Filters from "./Filters";
import Sidebar from "./Sidebar";
import LineChart from "./LineChart";
import { CameraStats } from "@/types";

// Dynamic import for Map to avoid SSR issues with Leaflet
const Map = dynamic(() => import("./Map"), { ssr: false });

export default function Dashboard() {
  const {
    segmentos,
    accidentesProcessed,
    cameraInfo,
    accidentesByCamera,
    allMonths,
    principalOptions,
    loading,
    error,
    severityFilter,
    principalFilter,
    selectedCamera,
    setSeverityFilter,
    setPrincipalFilter,
    handleCameraSelect,
  } = useCameraData();

  const [statsCount, setStatsCount] = useState({
    reduction: 0,
    increase: 0,
    noChange: 0,
  });
  const [totalCameras, setTotalCameras] = useState(0);
  const [selectedCameraStats, setSelectedCameraStats] =
    useState<CameraStats | null>(null);

  const handleStatsUpdate = useCallback(
    (
      stats: { reduction: number; increase: number; noChange: number },
      total: number,
      selectedStats: CameraStats | null
    ) => {
      setStatsCount(stats);
      setTotalCameras(total);
      setSelectedCameraStats(selectedStats);
    },
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Cargando datos...</div>
      </div>
    );
  }

  if (error || !segmentos) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-600">{error || "Error loading data"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Efectividad de Cámaras de Velocidad — Bogotá
      </h1>

      <div className="flex gap-4">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-4">
          <Filters
            severityFilter={severityFilter}
            principalFilter={principalFilter}
            principalOptions={principalOptions}
            onSeverityChange={setSeverityFilter}
            onPrincipalChange={setPrincipalFilter}
          />
          <Sidebar
            selectedCamera={selectedCamera}
            cameraInfo={cameraInfo}
            cameraStats={selectedCameraStats}
            statsCount={statsCount}
            totalCameras={totalCameras}
            severityFilter={severityFilter}
            principalFilter={principalFilter}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {/* Map */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-[500px]">
            <Map
              segmentos={segmentos}
              accidentesProcessed={accidentesProcessed}
              cameraInfo={cameraInfo}
              accidentesByCamera={accidentesByCamera}
              severityFilter={severityFilter}
              principalFilter={principalFilter}
              selectedCamera={selectedCamera}
              onCameraSelect={handleCameraSelect}
              onStatsUpdate={handleStatsUpdate}
            />
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <LineChart
              accidentesProcessed={accidentesProcessed}
              cameraInfo={cameraInfo}
              allMonths={allMonths}
              severityFilter={severityFilter}
              principalFilter={principalFilter}
              selectedCamera={selectedCamera}
              onCameraSelect={handleCameraSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}