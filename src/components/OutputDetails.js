import React from "react";

const OutputDetails = ({ outputDetails }) => {
  const renderMetric = (label, value) => (
    <p className="text-sm" key={label}>
      {`${label}: `}
      <span className="font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: "#1E2022" }}>
        {value}
      </span>
    </p>
  );

  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      {renderMetric("Status", outputDetails?.status?.description)}
      {renderMetric("Memory", outputDetails?.memory)}
      {renderMetric("Time", outputDetails?.time)}
    </div>
  );
};

export default OutputDetails;
