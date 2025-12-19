export function getCurrentDateTime() {
  const date = new Date();
  const month = date.getMonth() + 1; // 12 (0-indexed)
  const year = date.getFullYear(); // 2025
  const day = date.getDay();
  const hour = date.getHours(); // 14
  const minute = date.getMinutes(); // 35
  const second = date.getSeconds(); // 12

  return { year, month, day, hour, minute };
}
