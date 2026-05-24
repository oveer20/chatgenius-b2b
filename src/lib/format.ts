export function formatCOP(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "$0";
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatUSD(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return "$0";
  return value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function formatPrice(value: number | null | undefined, isUSD: boolean): string {
  if (value == null || isNaN(value)) return isUSD ? "$0" : "$0";
  try {
    return value.toLocaleString(isUSD ? "en-US" : "es-CO");
  } catch {
    return String(value);
  }
}
