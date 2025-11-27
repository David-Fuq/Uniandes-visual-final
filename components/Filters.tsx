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
    <div className="card shadow-sm mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(0,0,0,0.1)' }}>
      <div className="card-body">
        <div className="row g-4">
          {/* Severity Filter */}
          <div className="col-lg-6">
            <label className="form-label fw-semibold" style={{ color: '#404040' }}>
              Filtrar por gravedad
            </label>
            <div className="btn-group d-flex flex-wrap gap-2" role="group">
              {severityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSeverityChange(option.value)}
                  className={`btn ${severityFilter === option.value ? 'btn-danger' : 'btn-outline-secondary'}`}
                  style={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    fontSize: '0.875rem'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Principal Filter */}
          <div className="col-lg-6">
            <label className="form-label fw-semibold" style={{ color: '#404040' }}>
              Filtrar por vía principal
            </label>
            <div className="btn-group d-flex flex-wrap gap-2" role="group">
              {principalOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onPrincipalChange(option)}
                  className={`btn ${principalFilter === option ? 'btn-danger' : 'btn-outline-secondary'}`}
                  style={{
                    flex: '1 1 auto',
                    minWidth: '100px',
                    fontSize: '0.875rem'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}