import React from "react";
import "../App.css";

interface LoadingSpinnerProps {
  isLoading: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  return (
    <div className={`loading-spinner ${isLoading ? "visible" : "hidden"}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
