import { useEffect, useRef } from "react";

export function useOutsideClick(handleClickOutside, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClickOutside();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handleClickOutside, listenCapturing]
  );

  return ref;
}
