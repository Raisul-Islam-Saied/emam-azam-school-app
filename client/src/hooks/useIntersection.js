import { useEffect, useRef, useState } from "react";

const useIntersection = (option) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [screen, setScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setScreen(entry.isIntersecting);
      }
      if (entry.isIntersecting) {
        setVisible(entry.isIntersecting);
      }
    }, option);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, option]);
  return [ref, visible, screen];
};
export default useIntersection;
