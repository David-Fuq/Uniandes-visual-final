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
  const severityOptions: SeverityFilter[] = [
    "TODOS",
    "CON MUERTOS",
    "CON HERIDOS",
    "SOLO DAÑOS",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-700 mb-4">Filtros</h3>

      {/* Severity Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Filtrar por gravedad
        </label>
        <div className="space-y-2">
          {severityOptions.map((option) => (
            <label key={option} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="severity"
                value={option}
                checked={severityFilter === option}
                onChange={(e) => onSeverityChange(e.target.value as SeverityFilter)}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Principal Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Filtrar por vía principal
        </label>
        <select
          value={principalFilter}
          onChange={(e) => onPrincipalChange(e. target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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