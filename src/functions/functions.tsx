import { useState, useEffect } from "react";
import moment, { Moment } from "moment";

interface UseTurnSchedulerProps {
  currentDate: Moment;
  currentTurn: number;
  lastSunday: Moment;
  startDate: Moment;
  turns: string[];
  hasTakenTurn: boolean[];
  setHasTakenTurn: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const useTurnScheduler = (props: UseTurnSchedulerProps) => {
  const {
    currentDate,
    currentTurn,
    lastSunday,
    startDate,
    turns,
    hasTakenTurn,
    setHasTakenTurn,
  } = props;

  const isSunday = currentDate.format("dddd") === "Sunday";

  useEffect(() => {
    if (isSunday) {
      if (currentDate.diff(lastSunday, "days") >= 7) {
        setHasTakenTurn((prev) => {
          const updated = [...prev];
          let nextTurn = (currentTurn + 1) % turns.length;
          while (updated[nextTurn]) {
            nextTurn = (nextTurn + 1) % turns.length;
          }
          updated[nextTurn] = true;
          return updated;
        });
      }
    } else {
      const daysElapsed = currentDate.diff(startDate, "days");
      const newTurn = Math.floor((daysElapsed / 2) % turns.length);
      setCurrentTurn(newTurn);
    }
  }, [
    currentDate,
    currentTurn,
    isSunday,
    lastSunday,
    startDate,
    turns,
    setHasTakenTurn,
  ]);

  const nextTurn = () => {
    setCurrentTurn((prevTurn) => (prevTurn + 1) % turns.length);
  };

  const handleAdvance = () => {
    nextTurn();
    advanceDate(isSunday ? 1 : 2);
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + turns.length) % turns.length);
    advanceDate(currentDate.format("dddd") === "Monday" ? -1 : -2);
  };

  const advanceDate = (days: number) => {
    const newDate = moment(currentDate).add(days, "days");
    setCurrentDate(newDate);
  };

  let isCurrentDateOdd = currentDate.date() % 2 === 1;

  const startDateAdvance = moment(currentDate)
    .startOf("day")
    .set({ hour: 19, minute: 0, second: 0 });
  const endDateAdvance = moment(startDateAdvance).add(1, "days");

  return {
    currentTurn,
    currentDate: currentDate.format("dddd, MMMM D, YYYY"),
    handleAdvance,
    handleBackward,
    date1startAdvance: startDateAdvance.format("dddd, MMMM D, YYYY"),
    date2startAdvance: endDateAdvance.format("dddd, MMMM D, YYYY"),
    turns,
    isSunday,
    isCurrentDateOdd,
  };
};

export default useTurnScheduler;
