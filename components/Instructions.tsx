"use client";

import { MousePointer, Filter, GitCompare, Info } from "lucide-react";

export default function Instructions() {
  return (
    <div className="bg-[#132238]/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
      <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
        <Info className="w-4 h-4" />
        Cómo usar las herramientas
      </h3>
      
      <div className="space-y-3 text-xs text-gray-300">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Filter className="w-3 h-3 text-cyan-400" />
          </div>
          <div>
            <span className="text-white font-medium">Filtros:</span>{" "}
            Use los filtros para seleccionar el tipo de accidente y la vía principal que desea analizar. 
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MousePointer className="w-3 h-3 text-amber-400" />
          </div>
          <div>
            <span className="text-white font-medium">Interacción:</span>{" "}
            Haga clic en cualquier segmento del mapa o línea del gráfico para ver detalles de esa cámara.
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <GitCompare className="w-3 h-3 text-green-400" />
          </div>
          <div>
            <span className="text-white font-medium">Sincronización:</span>{" "}
            Ambas visualizaciones están conectadas.  Al seleccionar una cámara, se resaltará en ambos gráficos.
          </div>
        </div>
      </div>
      
      {/* Color legend reminder */}
      <div className="mt-4 pt-3 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-sm bg-[#228B22]" />
            <span className="text-gray-400">Reducción</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-sm bg-[#DC143C]" />
            <span className="text-gray-400">Aumento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-sm bg-[#888888]" />
            <span className="text-gray-400">Sin cambio</span>
          </div>
        </div>
      </div>
    </div>
  );
}