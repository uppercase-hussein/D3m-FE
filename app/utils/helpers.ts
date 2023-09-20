export function formatNumber(num: number, decimalPlaces: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

export function getColor(alpha: number = 1): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return alpha ? `#${randomColor}${Math.floor(alpha * 255).toString(16)}` : `#${randomColor}`;
}

