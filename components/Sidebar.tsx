"use client";

import { CameraInfo, CameraStats } from "@/types";

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
  const info = selectedCamera ? cameraInfo.get(selectedCamera) : null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Legend */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-3">Leyenda</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded" style={{ backgroundColor: "#228B22" }}></div>
            <span>Reducción de accidentes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded" style={{ backgroundColor: "#DC143C" }}></div>
            <span>Aumento de accidentes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 rounded" style={{ backgroundColor: "#888888" }}></div>
            <span>Sin cambio</span>
          </div>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Summary */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-3">Resumen</h3>
        <div className="text-xs text-gray-500 mb-2">
          <div>Gravedad: {severityFilter}</div>
          <div>Vía: {principalFilter}</div>
          <div>Mostrando: {totalCameras} cámaras</div>
        </div>
        <div className="space-y-1 text-sm">
          <div style={{ color: "#228B22" }}>
            ✓ Reducción: {statsCount.reduction} (
            {totalCameras > 0
              ? ((statsCount.reduction / totalCameras) * 100).toFixed(1)
              : 0}
            %)
          </div>
          <div style={{ color: "#DC143C" }}>
            ✗ Aumento: {statsCount.increase} (
            {totalCameras > 0
              ? ((statsCount.increase / totalCameras) * 100). toFixed(1)
              : 0}
            %)
          </div>
          <div style={{ color: "#888888" }}>
            ○ Sin cambio: {statsCount.noChange} (
            {totalCameras > 0
              ? ((statsCount.noChange / totalCameras) * 100).toFixed(1)
              : 0}
            %)
          </div>
        </div>
      </div>

      {/* Selected Camera Info */}
      {selectedCamera && info && cameraStats && (
        <>
          <hr className="my-4 border-gray-200" />
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">Cámara Seleccionada</h3>
            <div
              className="p-3 rounded-md"
              style={{ backgroundColor: cameraStats.color + "20" }}
            >
              <div
                className="font-semibold mb-2"
                style={{ color: cameraStats.color }}
              >
                {selectedCamera}
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <div>
                  <b>Vía:</b> {info.principal || "Otros"}
                </div>
                <div>
                  <b>Instalación:</b>{" "}
                  {info.installDate. toLocaleDateString("es-CO")}
                </div>
                <hr className="my-2 border-gray-300" />
                <div>
                  <b>Promedio antes:</b> {cameraStats. avgBefore.toFixed(2)} acc/mes
                </div>
                <div>
                  <b>Promedio después:</b> {cameraStats.avgAfter.toFixed(2)} acc/mes
                </div>
                <div
                  className="mt-2 font-semibold"
                  style={{ color: cameraStats. color }}
                >
                  {cameraStats.status === "Reducción" && "✓ "}
                  {cameraStats.status === "Aumento" && "✗ "}
                  {cameraStats.status === "Sin cambio" && "○ "}
                  {cameraStats.status}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}