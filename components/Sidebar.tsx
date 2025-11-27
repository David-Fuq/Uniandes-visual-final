"use client";

import { CameraInfo, CameraStats } from "@/types";
import { Camera, MapPin, Calendar, TrendingDown, TrendingUp, Minus, MousePointer } from "lucide-react";

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

  const getPercentage = (value: number) => {
    return totalCameras > 0 ? ((value / totalCameras) * 100).toFixed(1) : "0";
  };

  return (
    <div className="h-100 d-flex flex-column gap-3">
      {/* Summary Stats */}
      <div className="card shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <h3 className="card-title h6 fw-bold mb-3" style={{ color: '#1a1a1a' }}>Resumen</h3>
          
          <div className="small mb-3" style={{ color: '#737373' }}>
            <div className="d-flex justify-content-between mb-2">
              <span>Gravedad:</span>
              <span className="text-danger fw-semibold">{severityFilter}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Vía:</span>
              <span className="text-danger fw-semibold">{principalFilter}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Cámaras mostradas:</span>
              <span className="fw-bold" style={{ color: '#1a1a1a' }}>{totalCameras}</span>
            </div>
          </div>

          {/* Stats bars */}
          <div className="d-flex flex-column gap-3">
            {/* Reduction */}
            <div>
              <div className="d-flex justify-content-between small mb-2">
                <span className="text-success d-flex align-items-center gap-2">
                  <TrendingDown size={16} />
                  Reducción
                </span>
                <span className="fw-semibold" style={{ color: '#1a1a1a' }}>
                  {statsCount.reduction} ({getPercentage(statsCount.reduction)}%)
                </span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: `${getPercentage(statsCount.reduction)}%` }}
                  aria-valuenow={statsCount.reduction}
                  aria-valuemin={0}
                  aria-valuemax={totalCameras}
                />
              </div>
            </div>

            {/* Increase */}
            <div>
              <div className="d-flex justify-content-between small mb-2">
                <span className="text-danger d-flex align-items-center gap-2">
                  <TrendingUp size={16} />
                  Aumento
                </span>
                <span className="fw-semibold" style={{ color: '#1a1a1a' }}>
                  {statsCount.increase} ({getPercentage(statsCount.increase)}%)
                </span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: `${getPercentage(statsCount.increase)}%` }}
                  aria-valuenow={statsCount.increase}
                  aria-valuemin={0}
                  aria-valuemax={totalCameras}
                />
              </div>
            </div>

            {/* No change */}
            <div>
              <div className="d-flex justify-content-between small mb-2">
                <span className="text-secondary d-flex align-items-center gap-2">
                  <Minus size={16} />
                  Sin cambio
                </span>
                <span className="fw-semibold" style={{ color: '#1a1a1a' }}>
                  {statsCount.noChange} ({getPercentage(statsCount.noChange)}%)
                </span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div
                  className="progress-bar bg-secondary"
                  role="progressbar"
                  style={{ width: `${getPercentage(statsCount.noChange)}%` }}
                  aria-valuenow={statsCount.noChange}
                  aria-valuemin={0}
                  aria-valuemax={totalCameras}
                />
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-3 pt-3 border-top">
            <div className="small text-muted mb-2">Leyenda del mapa:</div>
            <div className="d-flex align-items-center justify-content-between small">
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '16px', height: '8px', backgroundColor: '#228B22', borderRadius: '2px' }} />
                <span className="text-muted">Reducción</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '16px', height: '8px', backgroundColor: '#DC143C', borderRadius: '2px' }} />
                <span className="text-muted">Aumento</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '16px', height: '8px', backgroundColor: '#888888', borderRadius: '2px' }} />
                <span className="text-muted">Igual</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Camera Info */}
      <div className="card shadow-sm flex-grow-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <h3 className="card-title h6 fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: '#1a1a1a' }}>
            <Camera size={16} style={{ color: '#e94560' }} />
            Cámara Seleccionada
          </h3>
          
          {selectedCamera && info && cameraStats ? (
            <div
              className="p-3 rounded border"
              style={{
                backgroundColor: cameraStats.color + "15",
                borderColor: cameraStats.color + "40",
              }}
            >
              <div
                className="fw-bold fs-5 mb-3"
                style={{ color: cameraStats.color }}
              >
                {selectedCamera}
              </div>
              
              <div className="d-flex flex-column gap-2 small">
                <div className="d-flex align-items-center gap-2" style={{ color: '#404040' }}>
                  <MapPin size={16} className="text-muted" />
                  <span>{info.principal || "Otras vías"}</span>
                </div>
                
                <div className="d-flex align-items-center gap-2" style={{ color: '#404040' }}>
                  <Calendar size={16} className="text-muted" />
                  <span>{info.installDate.toLocaleDateString("es-CO")}</span>
                </div>
              </div>
              
              <hr className="my-3" />
              
              <div className="row g-3 text-center">
                <div className="col-6">
                  <div className="p-3 rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <div className="small text-muted mb-1">Promedio Antes</div>
                    <div className="fs-4 fw-bold" style={{ color: '#1a1a1a' }}>
                      {cameraStats.avgBefore.toFixed(2)}
                    </div>
                    <div className="small text-muted">acc/mes</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <div className="small text-muted mb-1">Promedio Después</div>
                    <div className="fs-4 fw-bold" style={{ color: '#1a1a1a' }}>
                      {cameraStats.avgAfter.toFixed(2)}
                    </div>
                    <div className="small text-muted">acc/mes</div>
                  </div>
                </div>
              </div>
              
              <div
                className="mt-3 text-center py-3 rounded fw-semibold fs-5"
                style={{
                  backgroundColor: cameraStats.color + "30",
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
            <div className="text-center text-muted py-4">
              <MousePointer size={32} className="mx-auto mb-3 opacity-50" />
              <p className="small">
                Seleccione una cámara en el mapa o en el gráfico para ver sus detalles
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}