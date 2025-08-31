import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen p-4 bg-white flex justify-center items-center">
      <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  );
};

export default Loader;
