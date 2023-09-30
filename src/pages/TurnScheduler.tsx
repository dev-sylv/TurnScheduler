import "../App.css";
import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import useTurnScheduler from "../functions/functions";

const TurnScheduler: React.FC = () => {
  const {
    currentTurn,
    handleAdvance,
    handleBackward,
    date1startAdvance,
    date2startAdvance,
    names,
  } = useTurnScheduler();
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
