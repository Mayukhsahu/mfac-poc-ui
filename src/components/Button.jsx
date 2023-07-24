import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";

const Button = ({ btnData, apiCall, indexVal, isBtnExpanded }) => {
  const expandClass = isBtnExpanded
    ? `translateY(calc(${100 * (indexVal + 1)}% + 8px))`
    : "translateY(0)";
  return (
    <li
      style={{
        top: `${(indexVal + 1) * 5}px`,
        "zIndex": `${40 - (indexVal + 1)}`,
        transition: "all .3s cubic-bezier(0,.93,1,1.18)",
        transform: expandClass,
      }}
      className="bg-[#ecccbb] hover:bg-[#c7ab9c] shadow-lg absolute inset-x-0 h-20 text-white rounded-full flex justify-between"
    >
      <button
        onClick={() => apiCall(btnData.name)}
        className="w-full text-[#36241b] font-bold hover:tracking-wider transition-all"
      >
        {btnData.name}()
      </button>
      <BsArrowLeftRight className="text-black self-center mr-4" />
    </li>
  );
};
export default Button;
