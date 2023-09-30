// TurnState.ts
import { useState, useEffect } from "react";
import { getNextTurn } from "./useGetTurnsDate";

export const useTurnState = () => {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNextTurn = () => {
    setCurrentTurn(getNextTurn(currentTurn));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Automatically advance to the next turn every 2 days
      setCurrentTurn((prevTurn) => getNextTurn(prevTurn));
      setCurrentDate(new Date());
    }, 2 * 24 * 60 * 60 * 1000); // 2 days in milliseconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  return {
    currentTurn,
    currentDate,
    handleNextTurn,
    setCurrentDate,
    setCurrentTurn
  };
};
