"use client";

interface HeroSectionProps {
  totalCameras?: number;
  totalYears?: string;
  totalAccidents?: string;
}

export default function HeroSection({ 
  totalCameras = 84, 
  totalYears = "5 años", 
  totalAccidents = "Miles" 
}: HeroSectionProps) {
  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-8 leading-tight">
        ¿Las cámaras salvavidas
        <br />
        salvan vidas? 
      </h1>

      {/* Introduction paragraph */}
      <div className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto space-y-6 text-center mb-12">
        <p>
          Hace varios años, el gobierno de Bogotá instaló{" "}
          <span className="text-[#e94560] font-semibold">cámaras salvavidas</span>{" "}
          en las principales vías de la ciudad. Estas cámaras tienen como función principal 
          identificar vehículos infractores cuya velocidad supera la máxima permitida.
        </p>
        
        <p>
          La idea detrás de estas cámaras es{" "}
          <span className="text-[#e94560] font-semibold">salvar vidas</span>, 
          reduciendo los accidentes de tránsito causados por el exceso de velocidad.
          En ese orden de ideas...  ¿Estas cámaras salvavidas{" "}
          <span className="underline decoration-[#e94560] decoration-2 underline-offset-4">
            sí salvan vidas
          </span>?
        </p>
        
        <p className="text-gray-400">
          Para responder a esta pregunta, hemos creado las siguientes herramientas 
          visuales interactivas para que{" "}
          <span className="text-white">usted mismo encuentre la respuesta</span>. 
        </p>
      </div>

      {/* Stats Table */}
      <div className="max-w-2xl mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                Métrica
              </th>
              <th className="py-3 px-4 text-right text-sm font-medium text-gray-400 uppercase tracking-wider">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-gray-300">Cámaras analizadas</td>
              <td className="py-4 px-4 text-right">
                <span className="text-2xl font-bold text-[#e94560]">{totalCameras}</span>
              </td>
            </tr>
            <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-gray-300">Período de datos</td>
              <td className="py-4 px-4 text-right">
                <span className="text-2xl font-bold text-[#533483]">{totalYears}</span>
                <span className="text-sm text-gray-400 ml-2">(2018-2022)</span>
              </td>
            </tr>
            <tr className="hover:bg-white/5 transition-colors">
              <td className="py-4 px-4 text-gray-300">Accidentes registrados</td>
              <td className="py-4 px-4 text-right">
                <span className="text-2xl font-bold text-white">{totalAccidents}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}