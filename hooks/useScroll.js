import { useEffect, useState, useRef } from "react";

function useSticky() {
  const [isSticky, setSticky] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const element = useRef(null);

  const handleScroll = () => {
    window.scrollY > 150 ? setSticky(true) : setSticky(false);
    setScrollPosition(window.scrollY);
  };

  // This function handles the scroll performance issue
  const debounce = (func, wait = 5, immediate = true) => {
    let timeOut;
    return () => {
      const context = this;
      const args = arguments;
      const later = () => {
        timeOut = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeOut;
      clearTimeout(timeOut);
      timeOut = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll));
    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, [debounce, handleScroll]);

  return { isSticky, element, scrollPosition };
}

export default useSticky;
