import React, { useState, useEffect, useRef } from "react";
import MainCalendar from "../components/MainCalendar";
import SubCalendar from "../components/SubCalendar";

const HomePage = () => {
  const [showSubCalendar, setShowSubCalendar] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const breakpoint = 1024; // lg breakpoint
        setShowSubCalendar(containerWidth >= breakpoint);
      }
    };

    window.addEventListener("resize", checkSize);
    checkSize(); // 初期チェック

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-center items-start">
          {/* SubCalendar */}
          <div
            className={`sub-calendar-container ${
              showSubCalendar ? "block" : "hidden"
            } lg:block lg:w-80 fixed left-4 top-20 lg:sticky lg:top-4 lg:left-auto`}
          >
            <SubCalendar />
          </div>
          {/* MainCalendar */}
          <div className="main-calendar-container w-full max-w-3xl lg:ml-8">
            <MainCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;