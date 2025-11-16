import "./style.css";

const ACCOMMODATIONS = [
  { id: "suite", label: "Suíte Jardim" },
  { id: "chale", label: "Chalé Família" },
];

export function AcomodacaoSelector({ value, onChange }) {
  return (
    <div className="acm-container">
      {ACCOMMODATIONS.map((accommodation) => (
        <button
          key={accommodation.id}
          className={`acm-btn ${value === accommodation.id ? "selected" : ""}`}
          onClick={() => onChange(accommodation.id)}
        >
          {accommodation.label}
        </button>
      ))}
    </div>
  );
}

