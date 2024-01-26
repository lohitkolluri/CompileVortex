import { useState, useEffect, useCallback } from "react";

const useKeyPress = function (targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = useCallback(({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }, [targetKey]);

  const upHandler = useCallback(({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  }, [targetKey]);

  useEffect(() => {
    const handleKeyDown = (event) => downHandler(event);
    const handleKeyUp = (event) => upHandler(event);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [downHandler, upHandler]);

  return keyPressed;
};

export default useKeyPress;
