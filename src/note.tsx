import "../App.css";
import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

const TurnScheduler: React.FC = () => {
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
    advanceDate(2); // Advance by 1 day
  };

  const handleBackward = () => {
    setCurrentTurn((prevTurn) => (prevTurn - 1 + names.length) % names.length);
    advanceDate(-2); // Go back by 1 day
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

    return [date1startAdvance, date2startAdvance];
  };

  const [date1startAdvance, date2startAdvance] = getTurnDates();

  return (
    <div className="container">
      <h2>
        <em>Turn Scheduler</em>
      </h2>
      <div className="card">
        <div className="wrap">
          <div className="header">
            <div className="img"></div>
            <b>
              {names[currentTurn]} <p>Turn Scheduler</p>
            </b>
          </div>
          <div onClick={handleBackward} className="icon">
            <IoChevronBack size={20} style={{ marginRight: "4px" }} />
          </div>
        </div>
        <hr />
        <i>Check Your Turn</i>
        <div className="dateWrapper">
          <div className="dateIcon">
            <MdOutlineDateRange size={30} />
          </div>
          <div className="dateTextWrap">
            <p>Day 1</p>
            <strong>{date1startAdvance}</strong>
          </div>
        </div>
        <div className="dateWrapper2">
          <div className="dateIcon">
            <MdOutlineDateRange size={30} />
          </div>
          <div className="dateTextWrap">
            <p>Day 2</p>
            <strong>{date2startAdvance}</strong>
          </div>
        </div>
        <button type="button" onClick={handleAdvance}>
          Next person
        </button>
      </div>
    </div>
  );
};

export default TurnScheduler;
