import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import moment from "moment";
import "../App.css";
import useTurnScheduler from "../functions/functions";
import { IoRefresh } from "react-icons/io5";

const TurnScheduler: React.FC = () => {
  const {
    currentTurn,
    handleAdvance,
    handleBackward,
    date1startAdvance,
    date2startAdvance,
    turns,
    isSunday,
    setCurrentDate,
  } = useTurnScheduler();

  const today = moment();

  const date1Style = today.isSame(date1startAdvance, "day")
    ? { border: "1px solid rgb(26, 102, 255)" }
    : { border: "1px solid gray" };
  const date2Style = today.isSame(date2startAdvance, "day")
    ? { border: "1px solid rgb(26, 102, 255)" }
    : { border: "1px solid gray" };

  const handleRefresh = () => {
    const currentDate = moment();
    setCurrentDate(currentDate);
  };

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
              {turns[currentTurn]} <p>Turn Scheduler</p>
            </b>
          </div>
          <div onClick={handleBackward} className="icon">
            <IoChevronBack size={20} style={{ marginRight: "4px" }} />
          </div>
          <div onClick={handleRefresh} className="icon">
            <IoRefresh size={20} style={{ marginRight: "4px" }} />
          </div>
        </div>
        <hr />
        <i>Check Your Turn</i>
        {isSunday ? (
          <div
            className="dateWrapper"
            style={{ border: "1px solid rgb(26, 102, 255)" }}
          >
            <div className="dateIcon">
              <MdOutlineDateRange size={30} />
            </div>
            <div className="dateTextWrap">
              <p>Day 1</p>
              <strong>{date1startAdvance}</strong>
            </div>
          </div>
        ) : (
          <>
            <div className="dateWrapper" style={date1Style!}>
              <div className="dateIcon">
                <MdOutlineDateRange size={30} />
              </div>
              <div className="dateTextWrap">
                <p>Day 1</p>
                <strong>{date1startAdvance}</strong>
              </div>
            </div>
            <div className="dateWrapper2" style={date2Style}>
              <div className="dateIcon">
                <MdOutlineDateRange size={30} />
              </div>
              <div className="dateTextWrap">
                <p>Day 2</p>
                <strong>{date2startAdvance}</strong>
              </div>
            </div>
          </>
        )}
        <button type="button" onClick={handleAdvance}>
          Next person
        </button>
      </div>
    </div>
  );
};

export default TurnScheduler;
