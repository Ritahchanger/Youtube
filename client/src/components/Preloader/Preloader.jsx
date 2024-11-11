import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="preloader flex-col">
      <div className="spinner"></div>
       <p className="text-4xl font-semibold mt-[1.5rem] text-orange-500 downloading">DOWNLOADING</p>
    </div>
  );
};

export default Preloader;
