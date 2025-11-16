import "./style.css";

const CURRENCY_FORMAT = {
  locale: "pt-BR",
  options: { minimumFractionDigits: 2 },
};

function formatCurrency(value) {
  return value.toLocaleString(CURRENCY_FORMAT.locale, CURRENCY_FORMAT.options);
}

export function Summary({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="error-box">
        <strong>Período inválido</strong>
        <p>{result.error}</p>
      </div>
    );
  }

  return (
    <div className="summary-card">
      <h3 className="summary-title">Resumo da Estadia</h3>

      <div className="summary-row">
        <span className="label">Acomodação</span>
        <span className="value">{result.acomodacao}</span>
      </div>

      <div className="summary-row">
        <span className="label">Número de noites</span>
        <span className="value">{result.nights}</span>
      </div>

      <div className="summary-row">
        <span className="label">Valor das diárias</span>
        <span className="value">R$ {formatCurrency(result.valorDiarias)}</span>
      </div>

      <div className="summary-row">
        <span className="label">Taxa de limpeza</span>
        <span className="value">R$ {formatCurrency(result.taxaLimpeza)}</span>
      </div>

      <div className="summary-total">
        <span className="label-total">Total</span>
        <span className="value-total">R$ {formatCurrency(result.totalFinal)}</span>
      </div>
    </div>
  );
}
