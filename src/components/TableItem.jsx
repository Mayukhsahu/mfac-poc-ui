import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete, AiOutlineSave } from "react-icons/ai";
import RateConfigContext from "../context/rateConfigContext";
import useUpdateDb from "../hooks/serviceHooks/useUpdateDb";
import { RESPONSE_STATUS } from "../utils/constants";
import useDeleteRowDb from "../hooks/serviceHooks/useDeleteRowDb";

const TableItem = ({ tableData }) => {
  const [inputEnabled, setInputEnabled] = useState(false);
  const [tableInputValue, setTableInputValue] = useState({});
  const [updateDb, resStatus] = useUpdateDb();
  const [deleteRowDb, putResStatus] = useDeleteRowDb()

  const tableName = useContext(RateConfigContext);
  useEffect(() => {
    setTableInputValue({ ...tableData });
  }, []);

  useEffect(() => {
    if (!inputEnabled) {
      console.log("Input changed to readonly");
    }
  }, [inputEnabled]);
  // console.log(tableInputValue);
  const updateValueToDb = () => {
    updateDb({ tableName, data: tableInputValue });
    setInputEnabled(false);
    if (resStatus === RESPONSE_STATUS.success) {
    }
  };

  const deleteRow = () => {
    deleteRowDb({tableName, id: tableData.id})
  }

  return (
    <tr className="border-b">
      {Object.entries(tableData).map((rowVal) => {
        if (rowVal[0] !== "id") {
          return (
            <td key={rowVal[0]} className="px-4 pl-8 py-3 text-[#855943] font-medium">
              {inputEnabled ? (
                <input
                  className="rounded-md px-2"
                  value={tableInputValue[rowVal[0]]}
                  onChange={(e) =>
                    setTableInputValue((prevInput) => ({
                      ...prevInput,
                      [rowVal[0]]: e.target.value,
                    }))
                  }
                />
              ) : (
                <p>{rowVal[1]}</p>
              )}
            </td>
          );
        }
        return (
          <td key={rowVal[0]} className="px-4 pl-8 py-3 ">
            <p>{rowVal[1]}</p>
          </td>
        );
      })}
      <td className="px-4 py-3 flex gap-2 items-center justify-end">
        {inputEnabled ? (
          <span
            onClick={updateValueToDb}
            className="p-2 px-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center"
          >
            <AiOutlineSave />
          </span>
        ) : (
          <span
            onClick={() => setInputEnabled(true)}
            className="p-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center"
          >
            <FiEdit />
          </span>
        )}
        <span onClick={deleteRow} className="p-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center">
          <AiFillDelete />
        </span>
        {/* <Popup
          trigger={
            <span className="p-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center">
              <AiFillDelete />
            </span>
          }
          modal
          nested
        >
          {close => {
            <div className="bg-blue-500 w-[300px] h-[180px]">
              <p className="w-full">Are you sure want to delete the row with id ${tableData.id}</p>
              <button>Confirm</button>
              <button onClick={() => close()}>Close</button>
            </div>
          }}
        </Popup> */}
      </td>
    </tr>
  );
};

export default TableItem;
