/** @format */

// Card.tsx
import React from "react";
import arrowUp from "./../assets/icons/arrow_up.svg";
import arrowDown from "./../assets/icons/arrow_down.svg";

interface CardProps {
  title: string;
  value: string;
  percentage: string;
  isPercentagePositive: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  value,
  percentage,
  isPercentagePositive,
}) => {
  const arrowIcon = isPercentagePositive ? arrowUp : arrowDown;

  return (
    <div className="flex flex-col bg-white rounded-3xl p-6 m-2">
      <div>
        <div className="text-base font-semibold text-[#0C1122]">{title}</div>
        <div
          className={`text-2xl font-bold mt-1 mb-2 ${
            isPercentagePositive ? "text-[#387D00]" : "text-[#D50000]"
          }`}
        >
          {value}
        </div>
      </div>
      <div
        className={`flex items-center text-sm px-2 py-1 font-semibold rounded-xl mr-auto ${
          isPercentagePositive
            ? "bg-[#EAFBD5] text-[#387D00]"
            : "bg-[#FBD7D5] text-[#D50000]"
        }`}
      >
        {/* Render the SVG icon */}
        <img src={arrowIcon} alt="Trend icon" className="w-4 h-4 mr-1" />
        {percentage}%
      </div>
    </div>
  );
};

export default Card;
