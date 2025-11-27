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
      <div className="container pb-5">
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

        {/* Map, Sidebar and Line Chart Row */}
        <div className="row g-3 mb-4">
          {/* Left Column: Sidebar and Line Chart */}
          <div className="col-lg-4">
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

          {/* Right Column: Map and Line Chart */}
          <div className="col-lg-8">
            {/* Map */}
            <div className="card shadow-sm mb-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0,0,0,0.1)' }}>
              <div style={{ height: '400px' }}>
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

            {/* Line Chart */}
            <div>
              <h3 className="h6 fw-semibold mb-2" style={{ color: '#1a1a1a' }}>
                Accidentes por Mes
                <span className="small fw-normal text-muted ms-2">
                  Haga clic en una línea para ver la fecha de instalación
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
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-top">
          <p className="text-center small text-muted">
            Datos de accidentes de tránsito en Bogotá (2018-2022) • 
            Análisis de efectividad de cámaras salvavidas
          </p>
        </div>
      </div>
    </div>
  );
}