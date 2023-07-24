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
  const [deleteRowDb, putResStatus] = useDeleteRowDb();
  const { refreshTable, tableName } = useContext(RateConfigContext);

  useEffect(() => {
    setTableInputValue({ ...tableData });
  }, []);
  // console.log(tableInputValue);
  const updateValueToDb = async () => {
    await updateDb({ tableName, data: tableInputValue })
    setInputEnabled(false);
    if (resStatus === RESPONSE_STATUS.success) {
    }
    refreshTable(tableName)

  };

  const deleteRow = async () => {
    await deleteRowDb({ tableName, id: tableData.id });
    refreshTable(tableName)
  };

  return (
    <tr className="border-b">
      {Object.entries(tableData).map((rowVal) => {
        if (rowVal[0] !== "id") {
          return (
            <td
              key={rowVal[0]}
              className="px-4 pl-8 py-3 text-[#855943] font-medium"
            >
              {inputEnabled ? (
                <input
                  className="rounded-md px-2 w-5/6"
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
          <Popup
            trigger={
              <span
                className="p-2 px-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center"
              >
                <AiOutlineSave />
              </span>
            }
            modal
          >
            {(close) => {
              return (
                <div className="w-[300px] h-[200px] flex flex-col justify-between p-4 py-8 text-center rounded-3xl bg-[#A06A50]">
                  <p className="w-full text-[#FFF4DB] font-medium">
                    Are you sure want to update the relavent changes into the database?
                  </p>
                  <div className="flex w-full items-center justify-center gap-4">
                    <button
                      onClick={() => {  
                        updateValueToDb()
                        close()
                      }}
                      className="hover:tracking-wider transition-all px-6 py-2 text-[#432d22] font-medium bg-[#FFF4DB] rounded-full"
                    >
                      Confirm
                    </button>
                    <button
                      className="hover:tracking-wider transition-all px-6 py-[.40rem] text-[#FFF4DB] border-2 border-[#FFF4DB] font-medium rounded-full"
                      onClick={() => {
                        setInputEnabled(state => !state)
                        close()}
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            }}
          </Popup>
        ) : (
          <span
            onClick={() => setInputEnabled(true)}
            className="p-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center"
          >
            <FiEdit />
          </span>
        )}

        <Popup
          trigger={
            <span className="p-2 cursor-pointer text-[#FFF4DB] transition-all ease-in-out bg-[#A06A50] rounded-full aspect-square flex items-center justify-center">
              <AiFillDelete />
            </span>
          }
          modal
        >
          {(close) => {
            return (
              <div className="w-[300px] h-[200px] flex flex-col justify-between p-4 py-8 text-center rounded-3xl bg-[#A06A50]">
                <p className="w-full text-[#FFF4DB] font-medium">
                  Are you sure want to delete the row with id {tableData.id}
                </p>
                <div className="flex w-full items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      deleteRow()
                      close()
                    }}
                    className="hover:tracking-wider transition-all px-6 py-2 text-[#432d22] font-medium bg-[#FFF4DB] rounded-full"
                  >
                    Confirm
                  </button>
                  <button
                    className="hover:tracking-wider transition-all px-6 py-[.40rem] text-[#FFF4DB] border-2 border-[#FFF4DB] font-medium rounded-full"
                    onClick={() => close()}
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          }}
        </Popup>
      </td>
    </tr>
  );
};

export default TableItem;
