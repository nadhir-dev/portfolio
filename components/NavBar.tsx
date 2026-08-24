"use client";
import { useState } from "react";
export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white relative px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between">
      <a href="#" className="md:hidden font-semibold text-zinc-900">
        Nadhir<span className="text-indigo-600">.</span>
      </a>

      <div className="hidden md:flex mx-auto items-center bg-zinc-50 border border-zinc-200 rounded-full px-1 py-1 gap-2 fixed top-3 z-20  right-1/2 translate-x-1/2">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${item.label === "About" ? "bg-white border border-zinc-200 font-medium text-zinc-800 hover:text-zinc-600" : "text-zinc-500 hover:text-zinc-400"}`}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1"
      >
        <span
          className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-zinc-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-zinc-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        ></span>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-zinc-200 flex flex-col p-5 gap-1 md:hidden z-50">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm ${item.label === "About" ? "bg-zinc-50 font-medium text-zinc-800" : "text-zinc-500 hover:bg-zinc-50"}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
