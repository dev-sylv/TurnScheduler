// useTurnScheduler.ts
import { useState, useEffect } from "react";

const useTurnScheduler = () => {
  const names: string[] = ["Dami", "Dennis", "Tola", "Grace"];
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTurn((prevTurn) => (prevTurn + 1) % names.length);
      advanceDate(1); // Advance by 1 day
    }, 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleAdvance = () => {
    setCurrentTurn((prevTurn) => (prevTurn + 1) % names.length);
    advanceDate(2); // Advance by 2 days
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + names.length) % names.length);
    advanceDate(-2); // Go back by 2 days
  };

  const advanceDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const getTurnDates = () => {
    const startDateAdvance = new Date(currentDate);
    startDateAdvance.setHours(19, 0, 0);

    const endDateAdvance = new Date(startDateAdvance);
    endDateAdvance.setDate(endDateAdvance.getDate() + 1);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date1startAdvance = startDateAdvance.toLocaleDateString(
      "en-US",
      options
    );
    const date2startAdvance = endDateAdvance.toLocaleDateString(
      "en-US",
      options
    );

    return {
      currentTurn,
      currentDate,
      handleAdvance,
      handleBackward,
      date1startAdvance,
      date2startAdvance,
      names,
    };
  };

  return getTurnDates();
};

export default useTurnScheduler;
