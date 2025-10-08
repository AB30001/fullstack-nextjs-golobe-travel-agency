"use client";
import { useRef } from "react";
export function Notice() {
  const ref = useRef(null);
  function expandLines() {
    ref.current.classList.toggle("line-clamp-2");
  }
  return (
    <div className="bg-secondary p-2 text-center text-[0.75rem] font-semibold text-secondary text-white">
      <div ref={ref} className="line-clamp-2">
        This website is still in development. Some functionalities may not be
        available or don&apos;t work properly.
      </div>
      <button
        className="text-primary underline underline-offset-4 min-[583px]:hidden"
        onClick={expandLines}
      >
        View more
      </button>
    </div>
  );
}
