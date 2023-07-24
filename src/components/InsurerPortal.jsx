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
import { useEffect, useState } from "react";
import TableList from "./TableList";
import { ImUpload3 } from "react-icons/im";
import { TbDatabaseSearch } from "react-icons/tb";
import { AiOutlineArrowDown } from "react-icons/ai";
import RateConfigContext from "../context/rateConfigContext";
import CarImg from "../assets/car_img.svg";
import useGetAllDbList from "../hooks/serviceHooks/useGetAllDbList";
import { FallingLines, Rings } from "react-loader-spinner";
import Loader from "./Loader";
import DbItem from "./DbItem";

const InsurerPortal = () => {
  const [excelData, convertToJson] = useXlsx();
  const [createDbres, postSourceData, isLoading] = useCreateDb();
  const [getAllList, getAllFetchRateConfigs, getAllResStatus] =
    useFetch(MAFAC_API_URL);
  const [tableNameInput, setTableNameInput] = useState("");
  const [rowName, setRowName] = useState("");
  const [rowId, setRowId] = useState("");
  const [isBtnExpanded, setIsBtnExpanded] = useState(false);
  const [dataSrcList, getDbList, dbListRes] = useGetAllDbList();

  useEffect(() => {
    getDbList();
  }, []);
  // console.log("Insuerer portal", dataSrcList);
  const emitFileEvent = (e) => convertToJson(e);

  const uploadTableData = async () => {
    await postSourceData(POST_TABLE_URL, excelData);
    getDbList();
  };

  const fetchDataList = (path, queryData) =>
    getAllFetchRateConfigs(path, queryData);

  // const apiFunction = (btnName) => {
  //   setIsBtnExpanded((state) => !state);
  //   switch (btnName) {
  //     case "getAll":
  //       fetchDataList("get-all", { tableName: tableNameInput });
  //       break;
  //     case "getOneByName":
  //       fetchDataList("get-one-by-name", {
  //         tableName: tableNameInput,
  //         rowName,
  //       });
  //     default:
  //       break;
  //   }
  // };

  const getTableData = (tableData) => {
    setIsBtnExpanded(false);
    fetchDataList("get-all", { tableName: tableData });
  };

  const rotateArrow = isBtnExpanded ? "rotate(0)" : "rotate(-135deg)";

  const renderDataSrcList = () => {};

  const renderTable = () => {
    const { tableName, data } = getAllList;
    // console.log(getAllResStatus);
    switch (getAllResStatus) {
      case RESPONSE_STATUS.failure:
        return <h1>Something went wrong. Try other database.</h1>;
      case RESPONSE_STATUS.progress:
        return <Loader />;
      case RESPONSE_STATUS.success:
        return (
          <RateConfigContext.Provider value={{tableName, refreshTable: getTableData}}>
            <TableList tableList={data} />
          </RateConfigContext.Provider>
        );
      default:
        return (
          <div className="flex h-52 text-center grow items-center justify-center">
            <p className="text-slate-700 font-bold">
              Fetch Some data to display...
            </p>
          </div>
        );
    }
  };

  // console.log('Excel data', createDbres)
  return (
    <div className="p-4 md:p-8 flex justify-center min-h-screen bg-[#FFF4DB]">
      <div className="p-4 max-w-6xl w-full">
        <div className="flex">
          <div className="min-w-[50%]">
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
                {isLoading ? (
                  <div className="absolute -right-8 pl-10 pr-4 w-[109.13px]">
                    <Rings
                      height="50"
                      width="80"
                      color="#36241b"
                      radius="6"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="rings-loading"
                    />
                  </div>
                ) : (
                  <button
                    type="click"
                    onClick={uploadTableData}
                    className="before:content-[''] pointer-events-auto before:pointer-events-none after:pointer-events-none before:p-[2px] before:-top-[0] before:z-[100] before:left-[1.85rem] before:absolute before:rounded-l-full before:shadow-[-3px_-2px_0_1px_#FFF4DB] after:content-[''] after:p-[2px] after:-bottom-[0] after:z-[100] after:left-[1.85rem] after:absolute after:rounded-l-full after:shadow-[-3px_2px_0_1px_#FFF4DB] after:bg-#ecccbb absolute -right-8 inset-y-1 pl-10 pr-4 bg-[#ecccbb] text-[#36241b] font-mavenPro font-semibold rounded-full hover:tracking-wider w-[109.13px] transition-all hover:bg-[#c7ab9c]"
                  >
                    Upload
                  </button>
                )}
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
                {dataSrcList.map((dataSrcItem) => (
                  <Button
                    key={dataSrcItem.id}
                    tableData={dataSrcItem}
                    indexVal={dataSrcList.indexOf(dataSrcItem)}
                    apiCall={getTableData}
                    isBtnExpanded={isBtnExpanded}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="md:flex w-[300px] justify-end items-center hidden">
              <img src={CarImg} className="w-full" alt="car image" />
            </div>
          </div>
        </div>
        <div className="flex">
          <ul className="flex flex-col gap-1 mt-[1.3rem]">
            <li className="bg-[#A06A50] py-[2rem] px-4 rounded-tl-[50px] shadow-lg">
              <h1 className="text-[#ecccbb] font-medium">Tables</h1>
            </li>
            {dataSrcList.map((dataSrcItem) => (
              <DbItem
                key={dataSrcItem.id}
                tableData={dataSrcItem}
                apiCall={getTableData}
              />
            ))}
          </ul>
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default InsurerPortal;
