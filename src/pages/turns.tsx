import React, { useState, useEffect } from "react";
import moment from "moment";

const TurnComponent: React.FC = () => {
  const turns: string[] = ["Dami", "Dennis", "Grace", "Tola"];
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(moment("2023-10-02")); // Changed start date to October 2nd

  useEffect(() => {
    // Calculate the current person's turn
    const currentPersonIndexWithOffset =
      Math.floor(currentDate.diff(moment("2023-10-02"), "days") / 2) %
      turns.length; // Adjusted the base date
    setCurrentPersonIndex(currentPersonIndexWithOffset);
  }, [currentDate]);

  const handleNextPerson = () => {
    const newDate = currentDate.clone().add(1, "day");

    if (newDate.day() === 0) {
      setCurrentDate(newDate.clone().add(1, "day"));
    } else {
      setCurrentDate(newDate);
    }
  };

  const handlePrevPerson = () => {
    const newDate = currentDate.clone().subtract(1, "day");

    if (newDate.isBefore(moment("2023-10-02"))) {
      // Adjusted the base date
      alert("The schedule starts from October 2nd, 2023."); // Adjusted alert message
    } else {
      setCurrentDate(newDate);
    }
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevPerson}>Previous Person</button>
        <button onClick={handleNextPerson}>Next Person</button>
      </div>
      <div>
        <h2>{turns[currentPersonIndex]}'s Turn</h2>
        <p>Day 1</p>
        <p>{currentDate.format("dddd, MMMM D, YYYY")}</p>
        <p>Day 2</p>
        <p>{currentDate.clone().add(1, "day").format("dddd, MMMM D, YYYY")}</p>
      </div>
    </div>
  );
};

export default TurnComponent;
