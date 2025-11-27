"use client";

import { MousePointer, Filter, GitCompare } from "lucide-react";

export default function Instructions() {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Cómo usar las herramientas
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e94560]/20 flex items-center justify-center flex-shrink-0">
            <Filter className="w-5 h-5 text-[#e94560]" />
          </div>
          <div>
            <span className="text-white font-medium block mb-1">Filtros</span>
            <span className="text-sm text-gray-400">
              Use los toggles para seleccionar el tipo de accidente y la vía principal que desea analizar. 
            </span>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-[#533483]/20 flex items-center justify-center flex-shrink-0">
            <MousePointer className="w-5 h-5 text-[#533483]" />
          </div>
          <div>
            <span className="text-white font-medium block mb-1">Interacción</span>
            <span className="text-sm text-gray-400">
              Haga clic en cualquier segmento del mapa o línea del gráfico para ver detalles de esa cámara.
            </span>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <GitCompare className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <span className="text-white font-medium block mb-1">Sincronización</span>
            <span className="text-sm text-gray-400">
              Ambas visualizaciones están conectadas.  Al seleccionar una cámara, se resaltará en ambos gráficos.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}