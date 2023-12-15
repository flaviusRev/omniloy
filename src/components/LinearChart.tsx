/** @format */

// BarChart.tsx
import React from "react";

interface Bar {
  value: number;
}

interface BarPair {
  firstBar: Bar;
  secondBar: Bar;
}

interface BarChartProps {
  title: string;
  barPairs: BarPair[];
}

const LinearChart: React.FC<BarChartProps> = ({ title, barPairs }) => {
  const maxValue = Math.max(
    ...barPairs.flatMap((pair) => [pair.firstBar.value, pair.secondBar.value])
  );

  // Calculate the width for each bar within a pair
  const barWidth = `calc(${200 / barPairs.length}%)`; // Adjust the -2px for spacing between bars

  return (
    <div className="bg-white p-4 rounded-3xl flex flex-col h-full">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="flex-grow flex px-2">
        {barPairs.map((pair, index) => (
          <div
            key={index}
            className="flex justify-center items-end px-1 h-full flex-grow space-x-1"
          >
            <div
              className="bg-[#C1D2FD] transition-height duration-300 ease-in-out"
              style={{
                width: barWidth,
                height: `${(pair.firstBar.value / maxValue) * 100}%`,
                marginTop: "auto", // Pushes the bar to the bottom
              }}
            />
            <div
              className="bg-[#1C5AF8] transition-height duration-300 ease-in-out"
              style={{
                width: barWidth,
                height: `${(pair.secondBar.value / maxValue) * 100}%`,
                marginTop: "auto", // Pushes the bar to the bottom
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinearChart;
