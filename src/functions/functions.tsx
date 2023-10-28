import { useState, useEffect } from "react";
import moment from "moment";

const useTurnScheduler = () => {
  const turns: string[] = ["Dami", "Dennis", "Grace", "Tola"];
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentDate, setCurrentDate] = useState(moment());
  const [lastSunday, setLastSunday] = useState(currentDate.clone());
  const startDate = moment("2023-08-01");

  const isSunday = currentDate.format("dddd") === "Sunday";
  const isMonday = currentDate.format("dddd") === "Monday";

  useEffect(() => {
    const daysElapsed = currentDate.diff(startDate, "days");

    if (isSunday && currentDate.diff(lastSunday, "days") >= 7) {
      setLastSunday(currentDate.clone());
      setCurrentTurn((prevTurn) => (prevTurn + 1) % turns.length);
    } else if (!isSunday && daysElapsed % 2 === 1) {
      const newTurn = Math.floor((daysElapsed / 2) % turns.length);
      setCurrentTurn(newTurn);
    }
  }, [currentDate, isSunday, lastSunday, startDate, turns.length]);

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
    };
  };

  return getTurnDates();
};

export default useTurnScheduler;
