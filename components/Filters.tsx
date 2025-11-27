"use client";

import { SeverityFilter, PrincipalFilter } from "@/types";

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
  const severityOptions: { value: SeverityFilter; label: string }[] = [
    { value: "TODOS", label: "Todos" },
    { value: "CON MUERTOS", label: "Con muertos" },
    { value: "CON HERIDOS", label: "Con heridos" },
    { value: "SOLO DAÑOS", label: "Solo daños" },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Severity Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-3">
            Filtrar por gravedad
          </label>
          <div className="toggle-container">
            {severityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSeverityChange(option.value)}
                className={`toggle-option ${severityFilter === option.value ? "active" : ""}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-16 bg-white/10" />

        {/* Principal Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-400 mb-3">
            Filtrar por vía principal
          </label>
          <div className="toggle-container">
            {principalOptions.map((option) => (
              <button
                key={option}
                onClick={() => onPrincipalChange(option)}
                className={`toggle-option ${principalFilter === option ? "active" : ""}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}