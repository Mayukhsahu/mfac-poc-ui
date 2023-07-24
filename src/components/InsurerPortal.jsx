import useXlsx from "../hooks/utilityHooks/useXlsx";
import {
  BUTTONS_ARRAY,
  MAFAC_API_URL,
  POST_TABLE_URL,
  RESPONSE_STATUS,
} from "../utils/constants";
import Button from "./Button";
import useCreateDb from "../hooks/serviceHooks/useCreateDb";
import useFetch from "../hooks/serviceHooks/useFetch";
import { useState } from "react";
import TableList from "./TableList";
import { ImUpload3 } from "react-icons/im";
import { TbDatabaseSearch } from "react-icons/tb";
import { AiOutlineArrowDown } from "react-icons/ai";
import RateConfigContext from "../context/rateConfigContext";
import CarImg from "../assets/car_img.svg"

const InsurerPortal = () => {
  const [excelData, convertToJson] = useXlsx();
  const [createDbres, postSourceData, isLoading] = useCreateDb();
  const [getAllList, getAllFetchRateConfigs, getAllResStatus] =
    useFetch(MAFAC_API_URL);
  const [tableNameInput, setTableNameInput] = useState("");
  const [rowName, setRowName] = useState("");
  const [rowId, setRowId] = useState("");
  const [isBtnExpanded, setIsBtnExpanded] = useState(false);

  const emitFileEvent = (e) => convertToJson(e);

  const uploadTableData = () => postSourceData(POST_TABLE_URL, excelData);

  const fetchDataList = (path, queryData) =>
    getAllFetchRateConfigs(path, queryData);

  const apiFunction = (btnName) => {
    setIsBtnExpanded((state) => !state);
    switch (btnName) {
      case "getAll":
        fetchDataList("get-all", { tableName: tableNameInput });
        break;
      case "getOneByName":
        fetchDataList("get-one-by-name", { tableName: tableNameInput, rowName });
      default:
        break;
    }
  };

  const rotateArrow = isBtnExpanded ? "rotate(0)" : "rotate(-135deg)";

  const renderTable = () => {
    const {tableName, data } = getAllList;
    switch (getAllResStatus) {
      case RESPONSE_STATUS.failure:
        return "Failed";
      case RESPONSE_STATUS.progress:
        return "Loading...";
      case RESPONSE_STATUS.success:
        return (
          <RateConfigContext.Provider value={tableName}>
            <TableList tableList={data} />
          </RateConfigContext.Provider>
        );
      default:
        return "Fetch Some data to display...";
    }
  };

  // console.log('Excel data', createDbres)
  return (
    <div className="p-4 md:p-8 flex justify-center bg-[#FFF4DB]">
      <div className="p-4 max-w-6xl w-full">
        <div className="flex justify-between">
          <div className="min-w-[70%]">
            <div className="my-4">
              {createDbres.length === 0 ? (
                <h1 className="font-bold text-slate-700">
                  Upload an excel sheet
                </h1>
              ) : (
                createDbres?.message
              )}
            </div>
            <div className="mb-16">
              <div className="relative w-[220px] h-12 -ml-3">
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
              <ul className="mt-4 -left-2 relative w-[250px] h-20 mb-20">
                <li
                  id="maskList"
                  onClick={() => setIsBtnExpanded((state) => !state)}
                  className="cursor-pointer overflow-hidden z-50 flex gap-2 bg-[#ecccbb] inset-0 justify-between rounded-full absolute shadow-lg"
                >
                  <div className="flex gap-2 items-center overflow-hidden">
                    <span className="px-2 bg-[#A06A50] self-stretch flex items-center justify-center">
                      <TbDatabaseSearch className="h-5 w-5 text-[#FFF4DB]" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#36241b]">
                        Premium Rate Configs
                      </p>
                      <p className="text-xs font-medium text-[#855943]">
                        Filter options
                      </p>
                    </div>
                  </div>
                  <span
                    id="arrowIcon"
                    style={{ transform: rotateArrow }}
                    className="transition-all ease-in-out p-2 bg-[#A06A50] rounded-full mr-2 aspect-square flex items-center justify-center self-center"
                  >
                    <AiOutlineArrowDown className="text-[#FFF4DB]" />
                  </span>
                </li>
                {BUTTONS_ARRAY.map((button) => (
                  <Button
                    key={button.id}
                    btnData={button}
                    indexVal={BUTTONS_ARRAY.indexOf(button)}
                    apiCall={apiFunction}
                    isBtnExpanded={isBtnExpanded}
                  />
                ))}
              </ul>
            </div>
            {/* <div className="flex gap-2 flex-wrap">
              <div className="flex-col flex gap-1">
                <label
                  className="ml-[.90rem] text-sm font-medium text-[#36241b]"
                  htmlFor="table"
                >
                  Table name
                </label>
                <input
                  id="table"
                  type="text"
                  className="rounded-lg pl-4 py-1 outline-none bg-[#665F4E] text-[#FFF4DB] placeholder:text-[#dad1ba]"
                  placeholder="table"
                  value={tableNameInput}
                  onChange={(e) => setTableNameInput(e.target.value)}
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
            </div> */}
          </div>
          <div>
            <div className="flex justify-end items-center">
              <img src={CarImg} className="w-full" alt="car image" />
            </div>
          </div>
        </div>
        {renderTable()}
      </div>
    </div>
  );
};

export default InsurerPortal;
