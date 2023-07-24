import React from "react";
import TableItem from "./TableItem";

const TableList = ({ tableList }) => {
  const tableHeads =
    tableList &&
    Object.keys(tableList[0]).map((head) => head.replaceAll("_", " "));
  if (tableHeads) {
    return (
      <section className="p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl">
          <div className="bg-[#ecccbb] max-h-[700px] overflow-auto relative shadow-md sm:rounded-tr-[50px]">
            <div className="overflow-x-auto">
              {tableList.length !== 0 ? (
                <table className="w-full text-sm text-left text-gray-500 table-fixed">
                  <thead className="text-xs text-[#ecccbb] uppercase h-[5.5rem] bg-[#A06A50] w-full">
                    <tr className="">
                      {tableHeads.map((head) => (
                        <th
                          className="px-4 pl-8 py-3"
                          key={tableHeads.indexOf(head)}
                        >
                          {head}
                        </th>
                      ))}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableList.map((tableData) => (
                      <TableItem tableData={tableData} key={tableData.id} />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-[25%] ml-[42%] mb-[25%]">Nothing to show!</p>
              )}
            </div>
            <nav
              className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                Showing
                <span className="font-semibold">1-10</span>
                of
                <span className="font-semibold">1000</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-[#FFF4DB] bg-[#66552F] rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-[#FFF4DB] bg-[#66552F] border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-[#FFF4DB] bg-[#66552F] border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight bg-[#66552F] text-[#FFF4DB] border border-primary-300 hover:bg-primary-100 hover:text-primary-700"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-[#FFF4DB] bg-[#66552F] border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-[#FFF4DB] bg-[#66552F] border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-[#FFF4DB] bg-[#66552F] rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    );
  }
  return <h1 className="text-center mt-64 font-bold text-slate-700 ml-20">Oops!!! This Something is wrong with this database. Try others.</h1>;
};

export default TableList;
