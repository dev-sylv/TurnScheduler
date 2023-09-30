// TurnFunctions.ts
export const names = ["Dami", "Dennis", "Tola", "Grace"];

export const getNextTurn = (currentTurn: number) => currentTurn + 1;

export const getTurnDates = (currentDate: Date, currentTurn: number) => {
  const startDateAdvance = new Date(currentDate);
  startDateAdvance.setDate(startDateAdvance.getDate() + currentTurn * 2); // Advance by 2 days for each turn
  startDateAdvance.setHours(19, 0, 0); // Set the time to 7:00 PM

  const endDateAdvance = new Date(startDateAdvance);

  endDateAdvance.setDate(endDateAdvance.getDate() + 1); // Move to the next day for Date and Time 2

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date1startAdvance = startDateAdvance.toLocaleString("en-US", options);
  const date2startAdvance = endDateAdvance.toLocaleString("en-US", options);

  return [date1startAdvance, date2startAdvance];
};
