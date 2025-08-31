"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parseExcelFile, setExcelData } from "../store/excelSlice";
import toast from "react-hot-toast";
import { GiCloudUpload } from "react-icons/gi";
import { useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const { colorTheme, error } = useSelector((state) => state.excel);
  const router = useRouter();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      dispatch(parseExcelFile(uploadedFile));
      toast.success("File uploaded successfully");
      if (!error) {
        router.push("/");
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="p-8 w-2/5 h-72 flex flex-col justify-center items-center border-2 border-dashed border-cyan-400 rounded-2xl shadow-md hover:shadow-lg transition duration-300 ease-in-out bg-white">
        <input
          type="file"
          id="myFile"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Gradient Icon */}
        <GiCloudUpload
          size={70}
          className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] text-transparent bg-clip-text mb-4"
        />

        {/* Upload Label */}
        <label
          htmlFor="myFile"
          className={`text-lg font-semibold rounded-xl cursor-pointer px-6 py-3  ${colorTheme} text-white hover:scale-105 transition-transform`}
        >
          Click here to upload
        </label>

        <p className="text-sm text-gray-500 mt-3">
          Supported formats: csv, xlsx
        </p>
      </div>
    </div>
  );
};

export default Page;
