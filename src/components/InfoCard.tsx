/** @format */

import React from "react";

interface InfoCardProps {
  title: string;
  data: number | string;
  percentage: number;
  isPercentagePositive?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  data,
  percentage,
  isPercentagePositive = true,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center h-full">
      <div className="flex flex-col space-y-10">
        <div className="text-sm font-medium ">{title}</div>
        <div className="text-3xl font-semibold">{data}</div>
      </div>
      <div
        className={`flex flex-col items-center justify-end h-auto mt-auto ${
          isPercentagePositive
            ? "text-[#387D00] font-semibold bg-[#EAFBD5] p-2 rounded-full"
            : "text-[#C8455F] font-semibold bg-[#FFE4E9] p-2 rounded-full"
        }`}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${isPercentagePositive ? "" : "rotate-180"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className="text-sm ml-1">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
