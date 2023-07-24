import React from 'react'
import { BsArrowLeftRight } from 'react-icons/bs';

const DbItem = ({ tableData, apiCall }) => {
  
  return (
    <li className="bg-[#ecccbb] w-40 hover:bg-[#c7ab9c] shadow-md inset-x-0 h-8 text-white flex justify-between">
      <button
        onClick={() => apiCall(`${tableData?.table_name}`)}
        className="w-full text-[#36241b] font-medium text-xs pl-5 hover:tracking-wider transition-all flex gap-1 items-center"
      >
        <p className="text-[#5f4030]">
          {`${tableData?.table_name}_${tableData?.id}`}
        </p>
      </button>
      <BsArrowLeftRight className="text-black self-center mr-4" />
    </li>
  );
};

export default DbItem