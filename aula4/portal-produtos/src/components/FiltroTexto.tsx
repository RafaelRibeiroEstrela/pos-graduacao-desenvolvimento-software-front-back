// src/components/FiltroTexto.tsx
import React, { useEffect, useState } from "react";

type FiltroTextoProps = {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number; // padrão 300ms
  ariaLabel?: string;
  className?: string;
};

export default function FiltroTexto({
  value = "",
  onChange,
  placeholder = "Filtrar...",
  debounceMs = 500,
  ariaLabel = "Filtro",
  className,
}: FiltroTextoProps) {
  const [texto, setTexto] = useState(value);

  // Mantém sincronizado se o valor externo mudar
  useEffect(() => setTexto(value), [value]);

  // Dispara onChange com debounce
  useEffect(() => {
    const id = setTimeout(() => onChange(texto), debounceMs);
    return () => clearTimeout(id);
  }, [texto, debounceMs, onChange]);

  return (
    <div
      className={className}
      style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
    >
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        style={{
          padding: ".5rem .75rem",
          borderRadius: 8,
          border: "1px solid #ccc",
          width: "100%",
          maxWidth: 420,
        }}
      />
      {texto && (
        <button
          type="button"
          onClick={() => setTexto("")}
          aria-label="Limpar filtro"
          style={{
            padding: ".5rem .75rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            background: "#f5f5f5",
            cursor: "pointer",
          }}
        >
          Limpar
        </button>
      )}
    </div>
  );
}
