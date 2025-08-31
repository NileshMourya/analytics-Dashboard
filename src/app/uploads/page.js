"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseExcelFile, setExcelData } from "../store/excelSlice";
import toast from "react-hot-toast";

const Page = () => {
  const dispatch = useDispatch();
  const { excelData, loading, error } = useSelector((state) => state.excel);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      dispatch(parseExcelFile(uploadedFile));
      toast.success("File uploaded successfully");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="p-6 w-2/5 h-60 flex justify-center items-center border border-dashed border-cyan-500 rounded-xl"
        style={{ flexDirection: "column" }}
      >
        <p>Upload file here</p>
        <input
          type="file"
          id="myFile"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="myFile"
          className="bg-[#007bff] text-white rounded-xl cursor-pointer p-4"
        >
          Choose File
        </label>
      </div>
    </div>
  );
};

export default Page;
