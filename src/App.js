import { useState } from "react";

import { Card } from "./components/Card";
import { AcomodacaoSelector } from "./components/AcomodacaoSelector";
import { DateRangePicker, formatDate } from "./components/DateRangePicker";
import { AdultsInput } from "./components/AdultsInput";
import { Summary } from "./components/Summary";

import { calculateTarifario } from "./utils/calculateTarifario";
import "./App.css";

export default function App() {
  const [acomodacao, setAcomodacao] = useState("");
  const [datas, setDatas] = useState({ checkIn: "", checkOut: "" });
  const [adults, setAdults] = useState(1);
  const [result, setResult] = useState(null);
  const [visible, setVisible] = useState(false);

  function handleCalculate() {
    const calculationResult = calculateTarifario({
      acomodacao,
      checkIn: datas.checkIn,
      checkOut: datas.checkOut,
      adults,
    });
    setVisible(true);
    setResult(calculationResult);
  }

  function handleDateChange(newDates) {
    setDatas(newDates);
  }

  return (
    <div className="reservation-container">
      <div className="form-area">
        <Card>
          <h1>Simule sua Reserva</h1>
          <p>Preencha os campos abaixo para calcular o valor da sua estadia.</p>

          <h3>Acomodação</h3>
          <AcomodacaoSelector value={acomodacao} onChange={setAcomodacao} />

          <h3>Período da Estadia</h3>
          <div className="date-display">
            <div className="date-item">
              <span className="date-label">Check-in:</span>
              <span className="date-value">{datas.checkIn ? formatDate(datas.checkIn) : "--/--/----"}</span>
            </div>
            <div className="date-item">
              <span className="date-label">Check-out:</span>
              <span className="date-value">{datas.checkOut && datas.checkOut !== datas.checkIn ? formatDate(datas.checkOut) : "--/--/----"}</span>
            </div>
          </div>
          <DateRangePicker
            checkIn={datas.checkIn}
            checkOut={datas.checkOut}
            onChange={handleDateChange}
          />

          <h3>Número de Adultos</h3>
          <AdultsInput value={adults} onChange={setAdults} />

          <button className="calculate-button" onClick={handleCalculate}>
            Calcular valor da estadia
          </button>
        </Card>
      </div>

      {visible && (
        <div className="summary-area">
          <Card>
            <Summary result={result} />
          </Card>
        </div>
      )}
    </div>
  );
}
