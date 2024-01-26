import React from "react";

const Metric = ({ label, value }) => (
  <p className="text-sm text-[#e2e8f0]">
    {`${label}: `}
    <span
      className="font-semibold px-2 py-1 rounded-md"
      style={{ backgroundColor: "#1E2022", color: "#e2e8f0" }}
    >
      {value}
    </span>
  </p>
);

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <Metric label="Status" value={outputDetails?.status?.description} />
      <Metric label="Memory" value={outputDetails?.memory} />
      <Metric label="Time" value={outputDetails?.time} />
    </div>
  );
};

export default OutputDetails;
