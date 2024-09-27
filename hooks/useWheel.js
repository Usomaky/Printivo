import { useEffect, useState, useRef } from "react";

function useWheel() {
  const [isCollapse, setIsCollapse] = useState(false);

  let lastScrollTop;
  if (typeof window !== "undefined") {
    lastScrollTop = window.pageYOffset;
  }
  const toggleCollapse = () => {
    const currentScrollTop = document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      if (!isCollapse) {
        setIsCollapse(true);
      }
    } else {
      setIsCollapse(false);
    }
    lastScrollTop = currentScrollTop;
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
    window.addEventListener("scroll", debounce(toggleCollapse));
    return () => {
      window.removeEventListener("scroll", () => toggleCollapse);
    };
  }, [debounce, toggleCollapse]);

  return {
    isCollapse,
  };
}

export default useWheel;
