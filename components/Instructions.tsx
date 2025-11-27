"use client";

import { MousePointer, Filter, GitCompare } from "lucide-react";

export default function Instructions() {
  return (
    <div className="card shadow-sm mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0,0,0,0.1)' }}>
      <div className="card-body">
        <h3 className="card-title h5 fw-bold mb-4" style={{ color: '#1a1a1a' }}>
          Cómo usar la herramienta
        </h3>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'rgba(233, 69, 96, 0.2)' 
                  }}
                >
                  <Filter className="text-danger" size={20} />
                </div>
              </div>
              <div>
                <span className="fw-semibold d-block mb-1" style={{ color: '#1a1a1a' }}>Filtros</span>
                <span className="small" style={{ color: '#737373' }}>
                  Use los toggles para seleccionar el tipo de accidente y la vía principal que desea analizar. 
                </span>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'rgba(83, 52, 131, 0.2)' 
                  }}
                >
                  <MousePointer style={{ color: '#533483' }} size={20} />
                </div>
              </div>
              <div>
                <span className="fw-semibold d-block mb-1" style={{ color: '#1a1a1a' }}>Interacción</span>
                <span className="small" style={{ color: '#737373' }}>
                  Haga clic en cualquier segmento del mapa o línea del gráfico para ver detalles de esa cámara.
                </span>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="d-flex align-items-start">
              <div className="flex-shrink-0 me-3">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    backgroundColor: 'rgba(34, 139, 34, 0.2)' 
                  }}
                >
                  <GitCompare className="text-success" size={20} />
                </div>
              </div>
              <div>
                <span className="fw-semibold d-block mb-1" style={{ color: '#1a1a1a' }}>Sincronización</span>
                <span className="small" style={{ color: '#737373' }}>
                  Ambas visualizaciones están conectadas. Al seleccionar una cámara, se resaltará en ambos gráficos.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}