"use client";

import { SeverityFilter, PrincipalFilter } from "@/types";
import { AlertTriangle, Skull, Bandage, Car } from "lucide-react";

interface FiltersProps {
  severityFilter: SeverityFilter;
  principalFilter: PrincipalFilter;
  principalOptions: string[];
  onSeverityChange: (value: SeverityFilter) => void;
  onPrincipalChange: (value: PrincipalFilter) => void;
}

export default function Filters({
  severityFilter,
  principalFilter,
  principalOptions,
  onSeverityChange,
  onPrincipalChange,
}: FiltersProps) {
  const severityOptions: { value: SeverityFilter; label: string; icon: React.ReactNode; color: string }[] = [
    { value: "TODOS", label: "Todos", icon: <AlertTriangle className="w-4 h-4" />, color: "text-gray-400" },
    { value: "CON MUERTOS", label: "Con muertos", icon: <Skull className="w-4 h-4" />, color: "text-red-400" },
    { value: "CON HERIDOS", label: "Con heridos", icon: <Bandage className="w-4 h-4" />, color: "text-amber-400" },
    { value: "SOLO DAÑOS", label: "Solo daños", icon: <Car className="w-4 h-4" />, color: "text-cyan-400" },
  ];

  return (
    <div className="bg-[#132238]/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
      <h3 className="text-sm font-semibold text-white mb-4">Filtros</h3>

      {/* Severity Filter */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
          Gravedad del accidente
        </label>
        <div className="space-y-2">
          {severityOptions.map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${
                severityFilter === option.value
                  ? "bg-cyan-500/20 border border-cyan-500/50"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <input
                type="radio"
                name="severity"
                value={option.value}
                checked={severityFilter === option.value}
                onChange={(e) => onSeverityChange(e.target.value as SeverityFilter)}
                className="sr-only"
              />
              <span className={option.color}>{option.icon}</span>
              <span className={`text-sm ${severityFilter === option.value ? "text-white" : "text-gray-300"}`}>
                {option. label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Principal Filter */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
          Vía principal
        </label>
        <select
          value={principalFilter}
          onChange={(e) => onPrincipalChange(e. target.value)}
          className="w-full p-3 bg-[#0a1628] border border-gray-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
        >
          {principalOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}