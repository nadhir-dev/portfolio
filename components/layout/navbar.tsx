"use client";

import { useEffect, useState } from "react";

import { NavbarIsland } from "./navbar-island";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const y = window.scrollY;
      const delta = y - lastY;
      const navHasFocus = Boolean(
        document.activeElement?.closest("nav"),
      );

      if (y < 180 || navHasFocus) {
        setHidden(false);
      } else if (delta > 12) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastY = y;
    };

    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center transition-transform duration-300 ease-out will-change-transform"
      style={{
        transform: hidden
          ? "translateY(calc(-100% - 1rem))"
          : "translateY(0)",
      }}
    >
      <div className="pointer-events-auto">
        <NavbarIsland />
      </div>
    </div>
  );
}
