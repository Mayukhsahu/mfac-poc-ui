import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";

const Button = ({ tableData, apiCall, indexVal, isBtnExpanded }) => {
  const expandClass = isBtnExpanded
    ? `translateY(calc(${100 * (indexVal + 1)}% + 8px))`
    : "translateY(0)";
  return (
    <li
      style={{
        top: `${(indexVal + 1) * .8}px`,
        zIndex: `${40 - (indexVal + 1)}`,
        transition: "all .3s ease-out",
        transform: expandClass,
      }}
      className="bg-[#ecccbb] hover:bg-[#c7ab9c] shadow-md absolute inset-x-0 h-20 text-white rounded-full flex justify-between"
    >
      <button
        onClick={() => apiCall(`${tableData?.table_name}`)}
        className="w-full text-[#36241b] font-medium text-xs pl-5 hover:tracking-wider transition-all flex gap-1 items-center"
      >
        <p className="text-[#5f4030]">
          <span className="text-[#050303]">Db Name: </span>
          {`${tableData?.table_name}_${tableData?.id}`}
        </p>
      </button>
      <BsArrowLeftRight className="text-black self-center mr-4" />
    </li>
  );
};
export default Button;
