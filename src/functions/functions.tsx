import { useState, useEffect } from "react";
import moment from "moment";

const useTurnScheduler = () => {
  const turns: string[] = ["Dami", "Dennis", "Grace", "Tola"];
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentDate, setCurrentDate] = useState(moment());
  const [lastSunday, setLastSunday] = useState(currentDate.clone());
  const [hasTakenTurn, setHasTakenTurn] = useState(
    Array(turns.length).fill(false)
  );
  const startDate = moment("2023-08-01");

  useEffect(() => {
    const isSunday = currentDate.format("dddd") === "Sunday";
    const isMonday = currentDate.format("dddd") === "Monday";

    if (isSunday) {
      if (currentDate.diff(lastSunday, "days") >= 7) {
        setLastSunday(currentDate.clone());
        let nextTurn = (currentTurn + 1) % turns.length;
        while (hasTakenTurn[nextTurn]) {
          nextTurn = (nextTurn + 1) % turns.length;
        }
        setCurrentTurn(nextTurn);
        setHasTakenTurn((prev) => {
          const updated = [...prev];
          updated[nextTurn] = true;
          return updated;
        });
      }
    } else {
      const daysElapsed = currentDate.diff(startDate, "days");
      const newTurn = Math.floor((daysElapsed / 2) % turns.length);
      setCurrentTurn(newTurn);
    }
  }, [currentDate, currentTurn, hasTakenTurn, lastSunday, startDate, turns]);

  const nextTurn = () => {
    setCurrentTurn((prevTurn) => (prevTurn + 1) % turns.length);
  };

  const handleAdvance = () => {
    nextTurn();
    advanceDate(1);
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + turns.length) % turns.length);
    advanceDate(-2);
  };

  const advanceDate = (days: number) => {
    const newDate = moment(currentDate).add(days, "days");
    setCurrentDate(newDate);
  };

  const isCurrentDateOdd = currentDate.date() % 2 === 1;

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
      turns,
      isSunday: currentDate.format("dddd") === "Sunday",
      isCurrentDateOdd,
    };
  };

  return getTurnDates();
};

export default useTurnScheduler;
