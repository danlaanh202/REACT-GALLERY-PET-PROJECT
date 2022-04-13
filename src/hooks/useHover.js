import { useEffect, useRef, useState } from "react";

export function useHover() {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    const handleMouseOver = () => {
      setHovered(true);
    };
    const hanleMouseOut = () => {
      setHovered(false);
    };
    const dom = nodeRef.current;
    if (dom) {
      dom.addEventListener("mouseover", handleMouseOver);
      dom.addEventListener("mouseout", hanleMouseOut);
    }
    return () => {
      if (dom) {
        dom.removeEventListener("mouseover", handleMouseOver);
        dom.removeEventListener("mouseout", hanleMouseOut);
      }
    };
  }, []);
  return {
    hovered,
    setHovered,
    nodeRef,
  };
}
