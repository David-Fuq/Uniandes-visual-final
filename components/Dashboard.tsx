"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { useCameraData } from "@/hooks/useCameraData";
import HeroSection from "./HeroSection";
import Filters from "./Filters";
import Sidebar from "./Sidebar";
import Instructions from "./Instructions";
import LineChart from "./LineChart";
import { CameraStats } from "@/types";
import { MapIcon, LineChart as LineChartIcon } from "lucide-react";

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

  const contentRef = useRef<HTMLDivElement>(null);

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

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-xl text-gray-400">Cargando datos...</div>
        </div>
      </div>
    );
  }

  if (error || !segmentos) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
        <div className="text-xl text-red-400">{error || "Error loading data"}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Hero Section */}
      <HeroSection onScrollToContent={scrollToContent} />

      {/* Main Content */}
      <div ref={contentRef} className="min-h-screen p-4 lg:p-6">
        {/* Section Header */}
        <div className="max-w-[1800px] mx-auto mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Herramientas de Análisis
          </h2>
          <p className="text-gray-400">
            Explore los datos de accidentes antes y después de la instalación de cada cámara
          </p>
        </div>

        <div className="max-w-[1800px] mx-auto flex gap-4 lg:gap-6">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-4">
            <Filters
              severityFilter={severityFilter}
              principalFilter={principalFilter}
              principalOptions={principalOptions}
              onSeverityChange={setSeverityFilter}
              onPrincipalChange={setPrincipalFilter}
            />
            <Instructions />
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

          {/* Main Content Area */}
          <div className="flex-1 space-y-4">
            {/* Map */}
            <div className="bg-[#132238]/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden">
              <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-cyan-400" />
                <h3 className="font-semibold text-white">Mapa de Cámaras</h3>
                <span className="text-xs text-gray-400 ml-auto">
                  Haga clic en un segmento para ver detalles
                </span>
              </div>
              <div className="h-[400px]">
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
            <div className="bg-[#132238]/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden">
              <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center gap-2">
                <LineChartIcon className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-white">Accidentes por Mes</h3>
                <span className="text-xs text-gray-400 ml-auto">
                  Haga clic en una línea para ver la fecha de instalación
                </span>
              </div>
              <div className="p-4">
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

        {/* Footer */}
        <div className="max-w-[1800px] mx-auto mt-8 pt-6 border-t border-gray-800">
          <p className="text-center text-sm text-gray-500">
            Datos de accidentes de tránsito en Bogotá (2018-2022) • 
            Análisis de efectividad de cámaras salvavidas
          </p>
        </div>
      </div>
    </div>
  );
}