import useXlsx from "../hooks/utilityHooks/useXlsx";
import {
  BUTTONS_ARRAY,
  MAFAC_API_URL,
  POST_TABLE_URL,
} from "../utils/constants";
import Button from "./Button";
import useCreateDb from "../hooks/serviceHooks/useCreateDb";
import useFetch from "../hooks/serviceHooks/useFetch";
import { useState } from "react";
import TableList from "./TableList";
import { ImUpload3 } from "react-icons/im";

const InsurerPortal = () => {
  const [excelData, convertToJson] = useXlsx();
  const [createDbres, postSourceData, isLoading] = useCreateDb();
  const [getAllList, getAllFetchRateConfigs, isLoadingGetAll] =
    useFetch(MAFAC_API_URL);
  const [tableName, setTableName] = useState("");
  const [rowName, setRowName] = useState("");
  const [rowId, setRowId] = useState("");

  const emitFileEvent = (e) => convertToJson(e);

  const uploadTableData = () => postSourceData(POST_TABLE_URL, excelData);

  const fetchDataList = (path, queryData) =>
    getAllFetchRateConfigs(path, queryData);

  const apiFunction = (btnName) => {
    switch (btnName) {
      case "getAll":
        fetchDataList("get-all", { tableName });
        break;
      case "getOneByName":
        fetchDataList("get-one-by-name", { tableName, rowName });
      default:
        break;
    }
  };

  // console.log('Excel data', createDbres)
  return (
    <div className="p-4 md:p-8 flex justify-center bg-[#FFF4DB]">
      <div className="p-4 max-w-6xl w-full border border-black">
        <div className="">
          <div className="relative w-[188px] h-12 -ml-4">
            <label
              id="label"
              htmlFor="file-upload"
              className="absolute cursor-pointer select-none inset-0 right-10 bg-[#ecccbb] z-10 rounded-full border-8 border-[#FFF4DB]"
            >
              <p className="absolute top-1/2 -translate-y-1/2 left-3 font-mavenPro text-[#36241b] font-semibold">
                Choose file
              </p>
              <span
                id="uploadIcon"
                className="transition-all ease-in-out absolute right-1 bg-[#A06A50] rounded-full inset-y-1 aspect-square flex items-center justify-center"
              >
                <ImUpload3 className="text-[#FFF4DB]" />
              </span>
              <input
                type="file"
                id="file-upload"
                className="absolute hidden"
                onChange={emitFileEvent}
              />
            </label>
            <button
              type="click"
              onSubmit={uploadTableData}
              className="before:content-[''] before:p-[2px] before:-top-[0] before:z-[100] before:left-[1.85rem] before:absolute before:rounded-l-full before:shadow-[-3px_-2px_0_1px_#FFF4DB] after:content-[''] after:p-[2px] after:-bottom-[0] after:z-[100] after:left-[1.85rem] after:absolute after:rounded-l-full after:shadow-[-3px_2px_0_1px_#FFF4DB] after:bg-#ecccbb absolute -right-8 inset-y-1 pl-10 pr-4 bg-[#ecccbb] text-[#36241b] font-mavenPro font-semibold rounded-full hover:tracking-wider w-[109.13px] transition-all hover:bg-[#c7ab9c]"
            >
              Upload
            </button>
          </div>
          <div className="flex justify-center items-center">
            {createDbres.length === 0 ? (
              <h1 className="text-center font-bold text-slate-700">
                Upload an excel sheet
              </h1>
            ) : (
              createDbres?.message
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-col flex gap-1">
            <label
              className="ml-[.90rem] text-sm font-medium text-[#36241b]"
              htmlFor="tableName"
            >
              Table name
            </label>
            <input
              id="tableName"
              type="text"
              className="rounded-lg pl-4 py-1 outline-none bg-[#665F4E] text-[#FFF4DB] placeholder:text-[#dad1ba]"
              placeholder="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
          </div>
          <div className="flex-col flex gap-1">
            <label
              className="ml-[.90rem] text-sm font-medium text-[#36241b]"
              htmlFor="type"
            >
              Type
            </label>
            <input
              id="type"
              type="text"
              className="rounded-lg pl-4 py-1 outline-none bg-[#665F4E] text-[#FFF4DB] placeholder:text-[#dad1ba]"
              placeholder="rowName"
              value={rowName}
              onChange={(e) => setRowName(e.target.value)}
            />
          </div>
          <div className="flex-col flex gap-1">
            <label
              className="ml-[.90rem] text-sm font-medium text-[#36241b]"
              htmlFor="id"
            >
              Id
            </label>
            <input
              id="id"
              type="text"
              className="rounded-lg pl-4 py-1 outline-none bg-[#665F4E] text-[#FFF4DB] placeholder:text-[#dad1ba]"
              placeholder="rowId"
              value={rowId}
              onChange={(e) => setRowId(e.target.value)}
            />
          </div>
        </div>
        <ul className="mt-2">
          {BUTTONS_ARRAY.map((button) => (
            <Button key={button.id} btnData={button} apiCall={apiFunction} />
          ))}
        </ul>

        <TableList tableList={getAllList} />
      </div>
    </div>
  );
};

export default InsurerPortal;
