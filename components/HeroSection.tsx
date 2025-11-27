"use client";

interface HeroSectionProps {
  totalCameras?: number;
  totalYears?: string;
  totalAccidents?: string;
}

export default function HeroSection({ 
  totalCameras = 84, 
  totalYears = "5 años", 
  totalAccidents = "15963" 
}: HeroSectionProps) {
  return (
    <section className="container py-5">
      {/* Title */}
      <h1 className="display-1 fw-bold text-blue text-center mb-4">
        ¿Las cámaras salvavidas salvan vidas? 
      </h1>

      {/* Introduction paragraph */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10 col-xl-8">
          <div className="fs-5 text-center" style={{ color: '#404040', lineHeight: '1.8' }}>
            <p className="mb-4">
              Hace varios años, el gobierno de Bogotá instaló{" "}
              <span className="text-danger fw-semibold">cámaras salvavidas</span>{" "}
              en las principales vías de la ciudad. Estas cámaras tienen como función principal 
              identificar vehículos infractores cuya velocidad supera la máxima permitida.
            </p>
            
            <p className="mb-4">
              La idea detrás de estas cámaras es{" "}
              <span className="text-danger fw-semibold">salvar vidas</span>, 
              reduciendo los accidentes de tránsito causados por el exceso de velocidad.
              En ese orden de ideas... ¿Estas cámaras salvavidas{" "}
              <span className="text-decoration-underline" style={{ textDecorationColor: '#e94560', textDecorationThickness: '2px' }}>
                sí salvan vidas
              </span>?
            </p>
            
            <p style={{ color: '#737373' }}>
              Para responder a esta pregunta, hemos creado las siguientes herramientas 
              visuales interactivas para que{" "}
              <span className="text-dark fw-semibold">usted mismo encuentre la respuesta</span>. 
            </p>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <table className="table table-hover">
            <tbody>
              <tr>
                <td className="fs-5 py-3" style={{ color: '#404040' }}>Cámaras analizadas</td>
                <td className="text-end py-3">
                  <span className="display-6 fw-bold" style={{ color: '#e94560' }}>{totalCameras}</span>
                </td>
              </tr>
              <tr>
                <td className="fs-5 py-3" style={{ color: '#404040' }}>De datos</td>
                <td className="text-end py-3">
                  <span className="display-6 fw-bold" style={{ color: '#533483' }}>{totalYears}</span>
                  <span className="ms-2 text-muted">(2018-2022)</span>
                </td>
              </tr>
              <tr>
                <td className="fs-5 py-3" style={{ color: '#404040' }}>De accidentes registrados</td>
                <td className="text-end py-3">
                  <span className="display-6 fw-bold text-dark">{totalAccidents}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}