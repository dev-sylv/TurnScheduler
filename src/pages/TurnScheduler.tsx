import React, { useState } from "react";
import { getTurnDates, names } from "../functions/useGetTurnsDate";
import { useTurnState } from "../functions/useTurnState";
import "../App.css";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";

const TurnScheduler: React.FC = () => {
  const {
    currentTurn,
    currentDate,
    handleNextTurn,
    setCurrentDate,
    setCurrentTurn,
  } = useTurnState();

  const handleAdvance = () => {
    handleNextTurn();
  };
  const handleBackward = () => {
    if (currentTurn > 0) {
      setCurrentTurn(currentTurn - 1); // Go back to the previous person
    }
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 2); // Go back to the previous person
    setCurrentDate(newDate);
  };
  const [date1startAdvance, date2startAdvance] = getTurnDates(
    currentDate,
    currentTurn
  );

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
              {
                names[
                  ((currentTurn % names.length) + names.length) % names.length
                ]
              }{" "}
              <p>Turn Scheduler</p>
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
            <p>Date 1</p>
            <strong>{date1startAdvance}</strong>
          </div>
        </div>
        <div className="dateWrapper2">
          <div className="dateIcon">
            <MdOutlineDateRange size={30} />
          </div>
          <div className="dateTextWrap">
            <p>Date 2</p>
            <strong>{date2startAdvance}</strong>
          </div>
        </div>
        <button type="button" onClick={handleAdvance}>
          next person
        </button>
      </div>
    </div>
  );
};

export default TurnScheduler;
