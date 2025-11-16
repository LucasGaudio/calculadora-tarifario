import { useState, useEffect } from "react";
import "./style.css";

export function AdultsInput({ value, onChange }) {
  const [internal, setInternal] = useState(String(value ?? 1));

  useEffect(() => {
    setInternal(String(value ?? 1));
  }, [value]);

  function handleInput(event) {
    const inputValue = event.target.value;
    
    if (inputValue === "") {
      setInternal("");
      onChange(0);
      return;
    }

    if (/^\d+$/.test(inputValue)) {
      setInternal(inputValue);
      const numValue = parseInt(inputValue, 10);
      onChange(numValue || 0);
    }
  }

  return (
    <div className="adults-input-wrapper">
      <input
        type="text"
        className="adults-input"
        inputMode="numeric"
        value={internal}
        onChange={handleInput}
      />
    </div>
  );
}