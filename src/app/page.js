"use client";
import { useDispatch, useSelector } from "react-redux";
import { deleteDB, getExcelData } from "./utils/db";
import { setExcelData, setTableContent, groupByMake } from "./store/excelSlice";
import { useEffect, useState } from "react";
import Tables from "./components/Tables";
import Cards from "./components/Cards";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";

export default function Dashboard() {
  const { excelData } = useSelector((state) => state.excel);
  const [showNav, setShowNav] = useState(false);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!excelData) {
        const stored = await getExcelData("excelData");
        if (stored) {
          dispatch(setExcelData(stored));
          dispatch(groupByMake(stored));
        } else {
          router.push("/uploads");
        }
      } else {
        setLoader(false);
      }
    })();
  }, [dispatch, excelData, router]);

  useEffect(() => {
    const handleScroll = () => {
      // show navbar once user scrolls beyond 50px
      if (window.scrollY > 50) {
        setShowNav(true);
      } else {
        setShowNav(false); // remove this line if you want navbar to stay forever after first scroll
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      {excelData && (
        <div className="bg-[#f0f2f5] p-4 relative">
          <div
            className={`w-[79%] p-4 fixed top-2 z-50 border border-white 
        backdrop-blur-md bg-white/10 shadow-sm rounded-md 
        transition-all duration-300
        ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      `}
          >
            <p className="text-gray-700">Electric Vehicle Population Data</p>
          </div>
          <Cards />
          <Tables />
        </div>
      )}
      {/* <button onClick={deleteDB}>delete</button> */}
    </>
  );
}
