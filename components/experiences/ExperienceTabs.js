"use client";

import { useState, useEffect } from "react";

const tabs = ["Overview", "Details", "Itinerary", "Operator", "Reviews"];

export function ExperienceTabs({ initialTab = "Overview" }) {
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      
      const sections = tabs.map(tab => ({
        id: tab.toLowerCase(),
        element: document.getElementById(tab.toLowerCase())
      })).filter(s => s.element);

      const scrollPosition = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element.offsetTop <= scrollPosition) {
          setActiveTab(tabs.find(t => t.toLowerCase() === section.id) || initialTab);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialTab]);

  const scrollToSection = (tab) => {
    const sectionId = tab.toLowerCase();
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(tab);
    }
  };

  return (
    <div
      className={`${isSticky ? "fixed left-0 right-0 top-0 z-40 shadow-md" : "relative"} bg-white transition-all`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => scrollToSection(tab)}
              className={`${
                activeTab === tab
                  ? "border-b-2 border-black font-semibold text-black"
                  : "text-gray-600 hover:text-black"
              } px-6 py-4 text-sm transition-colors`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
