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
    return totalCameras > 0 ?  ((value / totalCameras) * 100). toFixed(1) : "0";
  };

  return (
    <div className="space-y-4 h-full">
      {/* Summary Stats */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
        <h3 className="text-base font-semibold text-white mb-4">Resumen</h3>
        
        <div className="text-sm text-gray-400 mb-4 space-y-2">
          <div className="flex justify-between">
            <span>Gravedad:</span>
            <span className="text-[#e94560] font-medium">{severityFilter}</span>
          </div>
          <div className="flex justify-between">
            <span>Vía:</span>
            <span className="text-[#e94560] font-medium">{principalFilter}</span>
          </div>
          <div className="flex justify-between">
            <span>Cámaras mostradas:</span>
            <span className="text-white font-semibold">{totalCameras}</span>
          </div>
        </div>

        {/* Stats bars */}
        <div className="space-y-4">
          {/* Reduction */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-green-400 flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Reducción
              </span>
              <span className="text-white font-medium">
                {statsCount.reduction} ({getPercentage(statsCount. reduction)}%)
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(statsCount.reduction)}%` }}
              />
            </div>
          </div>

          {/* Increase */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-red-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Aumento
              </span>
              <span className="text-white font-medium">
                {statsCount.increase} ({getPercentage(statsCount.increase)}%)
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(statsCount.increase)}%` }}
              />
            </div>
          </div>

          {/* No change */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400 flex items-center gap-2">
                <Minus className="w-4 h-4" />
                Sin cambio
              </span>
              <span className="text-white font-medium">
                {statsCount. noChange} ({getPercentage(statsCount.noChange)}%)
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gray-600 to-gray-400 rounded-full transition-all duration-500"
                style={{ width: `${getPercentage(statsCount.noChange)}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs text-gray-500 mb-2">Leyenda del mapa:</div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 rounded-sm bg-[#228B22]" />
              <span className="text-gray-400">Reducción</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 rounded-sm bg-[#DC143C]" />
              <span className="text-gray-400">Aumento</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 rounded-sm bg-[#888888]" />
              <span className="text-gray-400">Igual</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Camera Info */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 flex-1">
        <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#e94560]" />
          Cámara Seleccionada
        </h3>
        
        {selectedCamera && info && cameraStats ?  (
          <div
            className="p-4 rounded-lg border transition-all"
            style={{
              backgroundColor: cameraStats.color + "15",
              borderColor: cameraStats.color + "40",
            }}
          >
            <div
              className="font-bold text-xl mb-3"
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
            
            <hr className="my-4 border-white/10" />
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Promedio Antes</div>
                <div className="text-2xl font-bold text-white">
                  {cameraStats.avgBefore.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">acc/mes</div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="text-xs text-gray-400 mb-1">Promedio Después</div>
                <div className="text-2xl font-bold text-white">
                  {cameraStats.avgAfter. toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">acc/mes</div>
              </div>
            </div>
            
            <div
              className="mt-4 text-center py-3 rounded-lg font-semibold text-lg"
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
        ) : (
          <div className="text-center text-gray-500 py-8">
            <MousePointer className="w-8 h-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">
              Seleccione una cámara en el mapa o en el gráfico para ver sus detalles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Import at the top
import { MousePointer } from "lucide-react";