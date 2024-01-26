import React from "react";

const OutputWindow = ({ outputDetails }) => {
  const renderOutput = () => {
    const statusId = outputDetails?.status?.id;
    const decodedCompileOutput = atob(outputDetails?.compile_output);
    const decodedStdout = atob(outputDetails?.stdout);
    const decodedStderr = atob(outputDetails?.stderr);

    switch (statusId) {
      case 6: // Compilation error
        return <pre className="error-output">{decodedCompileOutput}</pre>;
      case 3: // Successful output
        return <pre className="success-output">{decodedStdout || null}</pre>;
      case 5: // Time Limit Exceeded
        return <pre className="error-output">Time Limit Exceeded</pre>;
      default: // Other cases (e.g., stderr)
        return <pre className="error-output">{decodedStderr}</pre>;
    }
  };

  return (
    <>
      <h1 className="font-bold text-xl text-white-800 mb-2">Output</h1>
      <div className="w-full h-56 bg-gray-800 rounded-md text-gray-200 font-normal text-sm overflow-y-auto">
        {outputDetails && renderOutput()}
      </div>
    </>
  );
};

export default OutputWindow;
