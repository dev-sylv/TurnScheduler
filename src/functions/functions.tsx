import { useState, useEffect } from "react";
import moment from "moment";

const useTurnScheduler = () => {
  const names: string[] = ["Dami", "Dennis", "Grace", "Tola"];
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentDate, setCurrentDate] = useState(moment());

  // .set({ month: 9, date: 1 })
  const startDate = moment("2023-08-01"); // Start date is August 1st, 2023

  const isSunday = currentDate.format("dddd") === "Sunday";
  const isMonday = currentDate.format("dddd") === "Monday";

  useEffect(() => {
    if (isSunday) {
      setCurrentTurn(1);
    } else {
      const daysElapsed = currentDate.diff(startDate, "days");
      const newTurn = Math.floor((daysElapsed / 2) % names.length);
      setCurrentTurn(newTurn);
    }
  }, [currentDate]);

  const handleAdvance = () => {
    setCurrentTurn((prevTurn) => (prevTurn + 1) % names.length);
    console.log("ee", currentTurn);

    advanceDate(isSunday ? 1 : 2); // Advance by 2 days
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + names.length) % names.length);
    advanceDate(isMonday ? -1 : -2); // Go back by 2 days
  };

  const advanceDate = (days: number) => {
    const newDate = moment(currentDate).add(days, "days");
    setCurrentDate(newDate);
  };

  const getTurnDates = () => {
    const startDateAdvance = moment(currentDate)
      .startOf("day")
      .set({ hour: 19, minute: 0, second: 0 });

    const endDateAdvance = moment(startDateAdvance).add(1, "days");

    const date1startAdvance = startDateAdvance.format("dddd, MMMM D, YYYY");
    const date2startAdvance = endDateAdvance.format("dddd, MMMM D, YYYY");

    return {
      currentTurn,
      currentDate: currentDate.format("dddd, MMMM D, YYYY"),
      handleAdvance,
      handleBackward,
      date1startAdvance,
      date2startAdvance,
      names,
      isSunday,
    };
  };

  return getTurnDates();
};

export default useTurnScheduler;
