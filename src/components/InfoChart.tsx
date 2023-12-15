/** @format */

// InfoChart.tsx
import React from "react";

interface InfoData {
  key: string;
  value: string;
}

interface InfoChartProps {
  title: string;
  data: InfoData[];
}

export const InfoChart: React.FC<InfoChartProps> = ({ title, data }) => {
  return (
    <div className="bg-white rounded-3xl  p-6 m-2">
      <div className="text-lg font-semibold mb-4">{title}</div>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className="mb-4">
            <div className="text-sm font-medium text-[#0C1122]">{item.key}</div>
            <div className="text-3xl font-bold text-[#387D00] my-2">
              {item.value}
            </div>
            <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden"></div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default InfoChart;
