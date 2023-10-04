import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const getOutput = () => {
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.compile_output)}
        </pre>
      );
    } else if (statusId === 3) {
      // Successful output
      return (
        <pre className="px-2 py-1 font-normal text-xs" style={{ color: "#CCC8C3" }}>
          {atob(outputDetails.stdout) !== null
            ? `${atob(outputDetails.stdout)}`
            : null}
        </pre>
      );
    } else if (statusId === 5) {
      // Time Limit Exceeded
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </pre>
      );
    } else {
      // Other cases (e.g., stderr)
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {atob(outputDetails?.stderr)}
        </pre>
      );
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl text-white-800 mb-2">Output</h1>
      <div className="w-full h-56 bg-gray-800 rounded-md text-gray-200 font-normal text-sm overflow-y-auto">
        {outputDetails ? <>{getOutput()}</> : null}
      </div>
    </>
  );
};

export default OutputWindow;