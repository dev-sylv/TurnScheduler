import { useState, useEffect } from "react";
import moment from "moment";

const useTurnScheduler = () => {
  const turns: string[] = ["Dami", "Dennis", "Grace", "Tola"];
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentDate, setCurrentDate] = useState(moment());

  const startDate = moment("2023-08-01");

  const isSunday = currentDate.format("dddd") === "Sunday";
  const isMonday = currentDate.format("dddd") === "Monday";

  useEffect(() => {
    if (isSunday) {
      const lastSundayTurn =
        Math.floor((currentDate.diff(startDate, "days") - 7) / 2) %
        turns.length;
      if (currentTurn === lastSundayTurn) {
        setCurrentTurn((prevTurn) => (prevTurn + 1) % turns.length);
      }
    } else {
      const daysElapsed = currentDate.diff(startDate, "days");
      const newTurn = Math.floor((daysElapsed / 2) % turns.length);
      setCurrentTurn(newTurn);
    }
  }, [currentDate, currentTurn, isSunday]);

  const handleAdvance = () => {
    setCurrentTurn((prevTurn) => (prevTurn + 1) % turns.length);
    advanceDate(isSunday ? 1 : 2);
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + turns.length) % turns.length);
    advanceDate(isMonday ? -1 : -2);
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
