// src/components/FiltroTexto.tsx
import React, { useEffect, useState } from "react";

type Props = {
  value?: string;
  onChange: (value: string) => void; // será chamado DEPOIS do debounce
  placeholder?: string;
  debounceMs?: number;
  ariaLabel?: string;
  className?: string;
};

export default function FiltroTexto({
  value = "",
  onChange,
  placeholder = "Filtrar...",
  debounceMs = 500,                // <- 500ms como padrão do requisito
  ariaLabel = "Filtro",
  className,
}: Props) {
  const [texto, setTexto] = useState(value);

  useEffect(() => setTexto(value), [value]);

  useEffect(() => {
    const id = setTimeout(() => onChange(texto), debounceMs);
    return () => clearTimeout(id);
  }, [texto, debounceMs, onChange]);

  return (
    <div className={className} style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        inputMode="numeric"
        style={{ padding: ".5rem .75rem", borderRadius: 8, border: "1px solid #ccc", width: "100%", maxWidth: 420 }}
      />
      {texto && (
        <button
          type="button"
          onClick={() => setTexto("")}
          aria-label="Limpar filtro"
          style={{ padding: ".5rem .75rem", borderRadius: 8, border: "1px solid #ccc", background: "#f5f5f5", cursor: "pointer" }}
        >
          Limpar
        </button>
      )}
    </div>
  );
}
