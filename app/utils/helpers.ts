export function formatNumber(num: number, decimalPlaces: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}
