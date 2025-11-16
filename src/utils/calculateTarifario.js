const ACCOMMODATION_RULES = {
  suite: { nome: "Suíte Jardim", diaria: 300, minima: 2, limpeza: 80 },
  chale: { nome: "Chalé Família", diaria: 450, minima: 2, limpeza: 100 },
};

const ONE_DAY_MS = 1000 * 60 * 60 * 24;
const WEEKEND_MULTIPLIER = 1.2;
const LONG_STAY_DISCOUNT = 0.9;
const LONG_STAY_THRESHOLD = 7;
const SUNDAY = 0;
const SATURDAY = 6;

function calculateNights(checkIn, checkOut) {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end - start) / ONE_DAY_MS);
}

function isWeekend(dayOfWeek) {
  return dayOfWeek === SUNDAY || dayOfWeek === SATURDAY;
}

function calculateDailyRates(rule, nights, checkIn) {
  let totalDiarias = 0;
  const current = new Date(checkIn);

  for (let i = 0; i < nights; i++) {
    const dayOfWeek = current.getDay();
    let dailyRate = rule.diaria;

    if (isWeekend(dayOfWeek)) {
      dailyRate *= WEEKEND_MULTIPLIER;
    }

    totalDiarias += dailyRate;
    current.setDate(current.getDate() + 1);
  }

  return totalDiarias;
}

export function calculateTarifario({ acomodacao, checkIn, checkOut, adults }) {
  if (!acomodacao || !checkIn || !checkOut || !adults) {
    return { error: "Preencha todos os campos." };
  }

  const start = new Date(checkIn);
  const end = new Date(checkOut);

  if (end <= start) {
    return { error: "O check-out deve ser após o check-in." };
  }

  const rule = ACCOMMODATION_RULES[acomodacao];
  if (!rule) {
    return { error: "Acomodação inválida." };
  }

  const nights = calculateNights(checkIn, checkOut);

  if (nights < rule.minima) {
    return { error: `A estadia mínima é de ${rule.minima} noites.` };
  }

  const totalDiarias = calculateDailyRates(rule, nights, checkIn);
  let total = totalDiarias + rule.limpeza;

  if (nights > LONG_STAY_THRESHOLD) {
    total *= LONG_STAY_DISCOUNT;
  }

  return {
    acomodacao: rule.nome,
    nights,
    valorDiarias: totalDiarias,
    taxaLimpeza: rule.limpeza,
    totalFinal: total,
  };
}
