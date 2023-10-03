import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language = "c", code = "", theme = "light" }) => {
  const [value, setValue] = useState(code);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
    onChange("code", newValue);
  };

  return (
    <div className="code-editor-overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width="100%"
        language={language}
        value={value}
        theme={theme}
        defaultValue="// Start typing your C code..."
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;
