"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useCameraData } from "@/hooks/useCameraData";
import HeroSection from "./HeroSection";
import Filters from "./Filters";
import Sidebar from "./Sidebar";
import Instructions from "./Instructions";
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
  const [selectedCameraStats, setSelectedCameraStats] = useState<CameraStats | null>(null);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#e94560]/30 border-t-[#e94560] rounded-full animate-spin mx-auto mb-4" />
          <div className="text-xl text-gray-400">Cargando datos...</div>
        </div>
      </div>
    );
  }

  if (error || !segmentos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">{error || "Error loading data"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="px-4 lg:px-8 pb-12 max-w-[1800px] mx-auto">
        {/* Instructions */}
        <Instructions />

        {/* Filters */}
        <Filters
          severityFilter={severityFilter}
          principalFilter={principalFilter}
          principalOptions={principalOptions}
          onSeverityChange={setSeverityFilter}
          onPrincipalChange={setPrincipalFilter}
        />

        {/* Map and Sidebar Row */}
        <div className="flex gap-6 mb-6">
          {/* Left: Sidebar (40%) */}
          <div className="w-[40%]">
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

          {/* Right: Map (60%) */}
          <div className="w-[60%]">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden h-full">
              <div className="h-[500px]">
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
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Accidentes por Mes
            <span className="text-sm font-normal text-gray-400 ml-3">
              Haga clic en una línea para ver la fecha de instalación de la cámara
            </span>
          </h3>
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

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <p className="text-center text-sm text-gray-500">
            Datos de accidentes de tránsito en Bogotá (2018-2022) • 
            Análisis de efectividad de cámaras salvavidas
          </p>
        </div>
      </div>
    </div>
  );
}