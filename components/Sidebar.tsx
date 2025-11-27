"use client";

import { CameraInfo, CameraStats } from "@/types";
import { Camera, MapPin, Calendar, TrendingDown, TrendingUp, Minus } from "lucide-react";

interface SidebarProps {
  selectedCamera: string | null;
  cameraInfo: globalThis.Map<string, CameraInfo>;
  cameraStats: CameraStats | null;
  statsCount: { reduction: number; increase: number; noChange: number };
  totalCameras: number;
  severityFilter: string;
  principalFilter: string;
}

export default function Sidebar({
  selectedCamera,
  cameraInfo,
  cameraStats,
  statsCount,
  totalCameras,
  severityFilter,
  principalFilter,
}: SidebarProps) {
  const info = selectedCamera ? cameraInfo. get(selectedCamera) : null;

  const getPercentage = (value: number) => {
    return totalCameras > 0 ?  ((value / totalCameras) * 100).toFixed(1) : "0";
  };

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="bg-[#132238]/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
        <h3 className="text-sm font-semibold text-white mb-4">Resumen</h3>
        
        <div className="text-xs text-gray-400 mb-4 space-y-1">
          <div className="flex justify-between">
            <span>Filtro actual:</span>
            <span className="text-cyan-400">{severityFilter}</span>
          </div>
          <div className="flex justify-between">
            <span>Vía:</span>
            <span className="text-cyan-400">{principalFilter}</span>
          </div>
          <div className="flex justify-between">
            <span>Cámaras:</span>
            <span className="text-white font-medium">{totalCameras}</span>
          </div>
        </div>

        {/* Stats bars */}
        <div className="space-y-3">
          {/* Reduction */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-green-400 flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                Reducción
              </span>
              <span className="text-gray-300">
                {statsCount.reduction} ({getPercentage(statsCount. reduction)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(statsCount.reduction)}%` }}
              />
            </div>
          </div>

          {/* Increase */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-red-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Aumento
              </span>
              <span className="text-gray-300">
                {statsCount.increase} ({getPercentage(statsCount.increase)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(statsCount. increase)}%` }}
              />
            </div>
          </div>

          {/* No change */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400 flex items-center gap-1">
                <Minus className="w-3 h-3" />
                Sin cambio
              </span>
              <span className="text-gray-300">
                {statsCount.noChange} ({getPercentage(statsCount. noChange)}%)
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gray-600 to-gray-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(statsCount.noChange)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Selected Camera Info */}
      {selectedCamera && info && cameraStats && (
        <div className="bg-[#132238]/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            Cámara Seleccionada
          </h3>
          
          <div
            className="p-4 rounded-lg border transition-all"
            style={{
              backgroundColor: cameraStats.color + "15",
              borderColor: cameraStats.color + "40",
            }}
          >
            <div
              className="font-bold text-lg mb-3"
              style={{ color: cameraStats.color }}
            >
              {selectedCamera}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{info.principal || "Otras vías"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{info.installDate. toLocaleDateString("es-CO")}</span>
              </div>
            </div>
            
            <hr className="my-3 border-gray-700" />
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-black/20 rounded-lg p-2">
                <div className="text-xs text-gray-400">Antes</div>
                <div className="text-lg font-bold text-white">
                  {cameraStats.avgBefore.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">acc/mes</div>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <div className="text-xs text-gray-400">Después</div>
                <div className="text-lg font-bold text-white">
                  {cameraStats.avgAfter. toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">acc/mes</div>
              </div>
            </div>
            
            <div
              className="mt-3 text-center py-2 rounded-lg font-semibold"
              style={{
                backgroundColor: cameraStats. color + "30",
                color: cameraStats.color,
              }}
            >
              {cameraStats.status === "Reducción" && "↓ "}
              {cameraStats.status === "Aumento" && "↑ "}
              {cameraStats.status === "Sin cambio" && "= "}
              {cameraStats.status}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}