/** @format */

// Navbar.tsx
import React from "react";
import { useSelection } from "./../utils/SelectionContext";

const Navbar = () => {
  const { selectedOption } = useSelection();

  return (
    <div className="bg-[#FAFAFA] px-4 py-4 flex justify-between items-center z-10">
      <h1 className="text-base font-normal p-4">
        Learn about my database
        <span className="ml-2 ">{`>`}</span>
        <span className="text-[#3E54AC] font-medium ml-2 ">
          {selectedOption}
        </span>
      </h1>

      <div className="absolute bottom-0 left-0 right-0 pl-0 pr-4">
        <div className="border-b-2 border-[#C5CCE6]"></div>
      </div>
    </div>
  );
};

export default Navbar;
