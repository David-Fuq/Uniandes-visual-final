"use client";

import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  onScrollToContent: () => void;
}

export default function HeroSection({ onScrollToContent }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-6 py-12">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#132238] pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Icon/Visual element */}
        <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0ms", animationFillMode: "forwards" }}>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-amber-500/20 border border-cyan-500/30">
            <svg
              className="w-10 h-10 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 
          className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          <span className="bg-gradient-to-r from-cyan-400 via-white to-amber-400 bg-clip-text text-transparent">
            ¿Las cámaras salvavidas
          </span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-white to-cyan-400 bg-clip-text text-transparent">
            salvan vidas?
          </span>
        </h1>

        {/* Subtitle/Introduction */}
        <div 
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto space-y-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <p>
            Hace varios años, el gobierno de Bogotá instaló{" "}
            <span className="text-cyan-400 font-semibold">cámaras salvavidas</span>{" "}
            en las principales vías de la ciudad. Estas cámaras tienen como función principal 
            identificar vehículos infractores cuya velocidad supera la máxima permitida. 
          </p>
          
          <p>
            La idea detrás de estas cámaras es{" "}
            <span className="text-amber-400 font-semibold">salvar vidas</span>, 
            reduciendo los accidentes de tránsito causados por el exceso de velocidad.
          </p>
          
          <p className="text-white font-medium">
            En ese orden de ideas...  ¿Estas cámaras salvavidas{" "}
            <span className="underline decoration-cyan-400 decoration-2 underline-offset-4">
              sí salvan vidas
            </span>? 
          </p>
          
          <p className="text-gray-400 text-base mt-8">
            Para responder a esta pregunta, hemos creado las siguientes herramientas 
            visuales interactivas para que{" "}
            <span className="text-white">usted mismo encuentre la respuesta</span>. 
          </p>
        </div>

        {/* Stats preview */}
        <div 
          className="flex justify-center gap-8 mt-12 animate-fade-in-up opacity-0"
          style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">84</div>
            <div className="text-sm text-gray-400">Cámaras analizadas</div>
          </div>
          <div className="w-px bg-gray-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400">5 años</div>
            <div className="text-sm text-gray-400">De datos (2018-2022)</div>
          </div>
          <div className="w-px bg-gray-700" />
          <div className="text-center">
            <div className="text-3xl font-bold text-white">Miles</div>
            <div className="text-sm text-gray-400">De accidentes registrados</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={onScrollToContent}
        className="absolute bottom-8 left-1/2 animate-bounce-scroll cursor-pointer group"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">
            Explorar datos
          </span>
          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        </div>
      </button>
    </section>
  );
}