import { DayPicker } from "react-day-picker";
import moment from "moment";
import "react-day-picker/dist/style.css";
import { ptBR } from "react-day-picker/locale";

import "./style.css";

function toDate(str) {
  if (!str) return undefined;
  const date = new Date(str + "T00:00:00");
  return isNaN(date) ? undefined : date;
}

function toISODateString(date) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate(dateString) {
  if (!dateString) return "--/--/----";
  return moment(dateString).format("DD/MM/YYYY");
}

export function DateRangePicker({ checkIn, checkOut, onChange }) {
  const from = toDate(checkIn);
  const to = toDate(checkOut);

  const range = from && to ? { from, to } : from ? { from, to: from } : undefined;

  const handleSelect = (selection) => {
    if (!selection) {
      onChange({ checkIn: "", checkOut: "" });
      return;
    }

    if (selection.from && selection.to) {
      onChange({
        checkIn: toISODateString(selection.from),
        checkOut: toISODateString(selection.to),
      });
      return;
    }

    if (selection.from && !selection.to) {
      onChange({
        checkIn: toISODateString(selection.from),
        checkOut: "",
      });
    }
  };

  return (
    <div className="drp-calendar">
      <DayPicker
        mode="range"
        selected={range}
        defaultMonth={from || undefined}
        locale={ptBR}
        onSelect={handleSelect}
        modifiersClassNames={{
          selected: "rdp-selected",
          range_start: "rdp-range-start",
          range_end: "rdp-range-end",
          disabled: "rdp-disabled",
        }}
      />
    </div>
  );
}
