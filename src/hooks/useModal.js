import React, { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  return {
    isShowing,
    setIsShowing,
  };
};

export default useModal;
