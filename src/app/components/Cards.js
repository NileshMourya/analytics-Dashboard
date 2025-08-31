import React, { useEffect } from "react";
import { FaCar } from "react-icons/fa";
import { getExcelData } from "../utils/db";
import { setExcelData, setTableContent } from "../store/excelSlice";
import { useDispatch, useSelector } from "react-redux";

const Cards = () => {
  const { excelData, tableContent, groupData, summary } = useSelector(
    (state) => state.excel
  );
  const dispatch = useDispatch();

  console.log(tableContent);

  const gradients = [
    "from-[#49a3f1] to-[#1A73E8]",
    "from-[#f093fb] to-[#f5576c]",
    "from-[#43e97b] to-[#38f9d7]",
    "from-[#fa709a] to-[#fee140]",
    "from-[#30cfd0] to-[#330867]",
  ];
  return (
    <div className="w-full overflow-auto flex flex-row px-2 py-2 gap-10">
      {summary?.map((item, id) => {
        const gradient = gradients[id % gradients.length];
        return (
          <div
            key={id}
            className="relative min-w-64 h-32 p-2 bg-white rounded-xl drop-shadow-md mt-5 cursor-pointer"
            onClick={() => dispatch(setTableContent(item.make))}
          >
            <div
              className={`absolute -top-5 left-5 bg-gradient-to-br ${gradient} p-4 rounded-xl shadow-md`}
            >
              <FaCar color="white" size={20} />
            </div>
            <div className="flex flex-col justify-center items-end mt-5 pr-2">
              <p className="text-gray-500 text-sm">Total cars</p>
              <p className="text-lg font-bold text-gray-700 mt-2">
                {item.count}
              </p>
            </div>
            <div className="h-px bg-[linear-gradient(to_right,rgba(52,71,103,0),rgba(52,71,103,0.4),rgba(52,71,103,0))] mt-2"></div>
            <p className="p-2 mb-2">{item.make}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
