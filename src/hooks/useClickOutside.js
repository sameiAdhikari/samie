import { useEffect, useRef } from "react";

export default function useClickOutside(handler, defaultEvent = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, defaultEvent);
      return () =>
        document.removeEventListener("click", handleClick, defaultEvent);
    },
    [handler, defaultEvent]
  );
  return ref;
}
