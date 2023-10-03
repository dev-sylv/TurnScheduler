import { useState, useEffect } from "react";
import moment from "moment";

const useTurnScheduler = () => {
  const turns: string[] = ["Dami", "Dennis", "Grace", "Tola"];
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
      const newTurn = Math.floor((daysElapsed / 2) % turns.length);
      setCurrentTurn(newTurn);
    }
  }, [currentDate]);

  const handleAdvance = () => {
    setCurrentTurn((prevTurn) => (prevTurn + 1) % turns.length);
    advanceDate(isSunday ? 1 : 2); // Advance by 2 days
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + turns.length) % turns.length);
    advanceDate(isMonday ? -1 : -2); // Go back by 2 days
  };

  const advanceDate = (days: number) => {
    const newDate = moment(currentDate).add(days, "days");
    setCurrentDate(newDate);
  };

  let isCurrentDateOdd = currentDate.date() % 2 === 1;
  const getTurnDates = () => {
    const startDateAdvance = moment(currentDate)
      .startOf("day")
      .set({ hour: 19, minute: 0, second: 0 });

    let endDateAdvance = moment(startDateAdvance).add(1, "days");
    let date1startAdvance = startDateAdvance.format("dddd, MMMM D, YYYY");
    let date2startAdvance = endDateAdvance.format("dddd, MMMM D, YYYY");

    if (isCurrentDateOdd) {
      date2startAdvance = date1startAdvance;
      // If today's date is odd, set date1startAdvance to the day before itself,
      // and date2startAdvance to date1startAdvance
      date1startAdvance = moment(startDateAdvance)
        .subtract(1, "days")
        .format("dddd, MMMM D, YYYY");
    }

    return {
      currentTurn,
      currentDate: currentDate.format("dddd, MMMM D, YYYY"),
      handleAdvance,
      handleBackward,
      date1startAdvance,
      date2startAdvance,
      turns,
      isSunday,
      isCurrentDateOdd,
    };
  };

  return getTurnDates();
};

export default useTurnScheduler;
