"use client";
import React from "react";
import { useSelector } from "react-redux";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Profile = () => {
  const { colorTheme } = useSelector((state) => state.excel);

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = "/Nilesh.pdf";
    downloadLink.download = "resume.pdf";
    downloadLink.click();

    const about = document.querySelector("#about");
    if (about) {
      about.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl text-center">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <div
            className={`w-28 h-28 rounded-full ${colorTheme} flex items-center justify-center text-white text-4xl font-bold shadow-md`}
          >
            N
          </div>
          <h1 className="text-3xl font-bold mt-4">Nilesh Mourya</h1>
          <p className="text-gray-600 mt-2 text-md">
            Full Stack Developer || App Developer
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://www.linkedin.com/in/nilesh-mourya-16006027b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border rounded-xl shadow-sm hover:scale-105 hover:bg-blue-50 transition"
          >
            <FaLinkedin className="text-blue-600 text-xl" />
            <span className="font-medium">LinkedIn</span>
          </a>

          <a
            href="https://github.com/NileshMourya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border rounded-xl shadow-sm hover:scale-105 hover:bg-gray-100 transition"
          >
            <FaGithub className="text-gray-800 text-xl" />
            <span className="font-medium">GitHub</span>
          </a>

          <a
            href="https://leetcode.com/u/Nil7/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border rounded-xl shadow-sm hover:scale-105 hover:bg-yellow-50 transition"
          >
            <SiLeetcode className="text-yellow-600 text-xl" />
            <span className="font-medium">LeetCode</span>
          </a>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className={`mt-10 px-8 py-3 border-2 ${colorTheme} text-white font-semibold rounded-lg hover:scale-105 hover:bg-black transition`}
        >
          📄 Download Resume
        </button>
      </div>
    </div>
  );
};

export default Profile;
