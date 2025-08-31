import React, { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { useSelector } from "react-redux";

const records = [
  "2020 Census",
  "Base MSRP",
  "City",
  "CAFV",
  "Country",
  "Vehicle ID",
  "Electric Range",
  "Electric Utility",
  "Vehicle Type",
  "LegislativeDistrict",
  "Make",
  "Model",
  "Model Year",
  "Postal Code",
  "State",
  "VIN(1-10)",
  "Vehicle Location",
];
const Tables = () => {
  const { excelData, tableContent, groupData } = useSelector(
    (state) => state.excel
  );

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  let table = [];
  if (excelData && groupData && tableContent) {
    table = groupData[tableContent] || [];
  }

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = table?.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math?.ceil(table.length / rowsPerPage);

  return (
    <>
      <div className="flex flex-row items-center mt-4 p-2 -mb-1 gap-2 justify-start max-w-60 bg-white rounded-t-lg">
        <label className=" ">{tableContent}</label>
        <FaClipboardList color="blacl" />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {records.map((item, id) => (
                <th key={id} className="px-6 py-3 text-nowrap">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table &&
              currentRows?.map((item, id) => (
                <tr
                  key={id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td className="px-6 py-4 text-nowrap">
                    {item["2020CensusTract"]}
                  </td>
                  <td className="px-6 py-4 text-nowrap">{item.BaseMSRP}</td>
                  <td className="px-6 py-4 text-nowrap">{item.City}</td>
                  <td className="px-6 py-4 text-nowrap">
                    {item["CleanAlternativeFuelVehicle(CAFV)Eligibility"]}
                  </td>
                  <td className="px-6 py-4 text-nowrap">{item.County}</td>
                  <td className="px-6 py-4 text-nowrap">{item.DOLVehicleID}</td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.ElectricRange}
                  </td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.ElectricUtility}
                  </td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.ElectricVehicleType}
                  </td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.LegislativeDistrict}
                  </td>
                  <td className="px-6 py-4 text-nowrap">{item.Make}</td>
                  <td className="px-6 py-4 text-nowrap">{item.Model}</td>
                  <td className="px-6 py-4 text-nowrap">{item.ModelYear}</td>
                  <td className="px-6 py-4 text-nowrap">{item.PostalCode}</td>
                  <td className="px-6 py-4 text-nowrap">{item.State}</td>
                  <td className="px-6 py-4 text-nowrap">
                    {item["VIN(1 - 10)"]}
                  </td>
                  <td className="px-6 py-4 text-nowrap">
                    {item.VehicleLocation}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Tables;
