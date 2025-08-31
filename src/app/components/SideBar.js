"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColorTheme, setColorValue } from "../store/excelSlice";
import { AiFillDashboard } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const SideBar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { colorTheme, colorValue } = useSelector((state) => state.excel);
  const pathname = usePathname();

  const navigation = [
    {
      name: "Dashboard",
      links: "/",
      icon: <AiFillDashboard size={17} color="white" />,
    },
    {
      name: "Uploads",
      links: "/uploads",
      icon: <FiUpload size={17} color="white" />,
    },
    {
      name: "Description",
      links: "/Des",
      icon: <FaPencilAlt size={17} color="white" />,
    },
    {
      name: "Profile",
      links: "/profile",
      icon: <CgProfile size={17} color="white" />,
    },
  ];

  // Normalize paths for reliable matching
  const normalize = (p) => {
    if (!p) return "/";
    const trimmed = p.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed.toLowerCase();
  };

  const isActive = (path, link) => {
    const a = normalize(path);
    const b = normalize(link);
    if (b === "/") return a === "/";
    return a === b || a.startsWith(b + "/");
  };

  useEffect(() => {
    let gradient = "bg-gradient-to-br from-[#49a3f1] to-[#1A73E8]";
    switch (colorValue) {
      case "blue":
        gradient = "bg-gradient-to-br from-[#49a3f1] to-[#1A73E8]";
        break;
      case "pink":
        gradient = "bg-gradient-to-br from-[#f093fb] to-[#f5576c]";

        break;
      case "green":
        gradient = "bg-gradient-to-br from-[#43e97b] to-[#38f9d7]";

        break;
      case "yellow":
        gradient = "bg-gradient-to-br from-[#fa709a] to-[#fee140]";

        break;
      case "darkBlue":
        gradient = "bg-gradient-to-br from-[#30cfd0] to-[#330867]";

        break;
    }
    dispatch(setColorTheme(gradient));
  }, [colorValue, dispatch]);

  return (
    <div>
      {/* Mobile toggle */}
      <button
        type="button"
        aria-controls="default-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-72 h-screen flex justify-center items-center transition-transform bg-[#f0f2f5] ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div
          className={`relative px-3 w-64 py-4 drop-shadow-md overflow-y-auto h-[93%] bg-white rounded-xl dark:bg-gray-800`}
        >
          {/* Logo */}
          <div className="w-full h-18 flex items-end">
            <Image
              src="/analytics.png"
              alt="data analytics"
              width={40}
              height={40}
            />
            <p className="p-2">Dashboard Analytics</p>
          </div>

          {/* Divider */}
          <div className="h-px bg-[linear-gradient(to_right,rgba(52,71,103,0),rgba(52,71,103,0.4),rgba(52,71,103,0))] mt-5 mb-5" />

          {/* Menu */}
          <ul className="space-y-2 font-medium">
            {navigation.map((item) => {
              const active = isActive(pathname, item.links);
              const baseItem = "flex items-center p-2 rounded-lg transition";
              const inactive =
                colorValue === "blue"
                  ? "text-gray/900 hover:bg-gray-100"
                  : "text-gray-900 hover:bg-gray-100";
              const activeCls = `${colorTheme} text-white shadow`;

              return (
                <li key={item.links}>
                  <Link
                    href={item.links}
                    className={`${baseItem} ${active ? activeCls : inactive}`}
                  >
                    <div className="w-full flex justify-between items-center">
                      <span className="ms-3">{item.name}</span>
                      <div>{item.icon}</div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Color picker */}
          <div className="absolute bottom-8 left-0 right-0">
            <div className={`m-3 rounded-lg p-2 mt-4 ${colorTheme}`}>
              <p className=" text-white ">Colors</p>
            </div>
            <div className="flex flex-row ms-3 gap-5">
              <button
                aria-label="Blue theme"
                className="bg-gradient-to-br from-[#49a3f1] to-[#1A73E8] w-6 h-6 rounded-full"
                onClick={() => dispatch(setColorValue("blue"))}
              />
              <button
                aria-label="Pink theme"
                className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] w-6 h-6 rounded-full"
                onClick={() => dispatch(setColorValue("pink"))}
              />
              <button
                aria-label="Green theme"
                className="bg-gradient-to-br from-[#43e97b] to-[#38f9d7] w-6 h-6 rounded-full"
                onClick={() => dispatch(setColorValue("green"))}
              />
              <button
                aria-label="Yellow theme"
                className="bg-gradient-to-br from-[#fa709a] to-[#fee140] w-6 h-6 rounded-full"
                onClick={() => dispatch(setColorValue("yellow"))}
              />
              <button
                aria-label="Dark blue theme"
                className="bg-gradient-to-br from-[#30cfd0] to-[#330867] w-6 h-6 rounded-full"
                onClick={() => dispatch(setColorValue("darkBlue"))}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
