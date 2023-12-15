/** @format */

// Dashboard.tsx
import React from "react";
import { Card } from "../components/Card";
import BarChartCard from "../components/BarChart";
import InfoChart from "../components/InfoChart";
import DonutChart from "../components/DonutChart";
import LinearChart from "../components/LinearChart";
import {
  cardData,
  barChartData,
  infoChartData,
  donutChartData,
  newDonutChartData,
  linearChartData,
} from "./../utils/dashboardData"; // Import data from a separate file

export function Dashboard() {
  return (
    <>
      <div className="p-4 flex items-center justify-between my-4 mt-8">
        <div className="grid grid-cols-4 gap-4 items-center w-full">
          <div className="col-span-1">
            <button className="w-full px-4 py-2 bg-white rounded-full leading-tight focus:outline-none focus:shadow-outline text-start">
              Timeframe: All-time
              <i className="fas fa-chevron-down ml-2"></i>
            </button>
          </div>
          <div className="col-span-1">
            <button className="w-full px-4 py-2 bg-white rounded-full leading-tight focus:outline-none focus:shadow-outline text-start">
              Tier: Gold
              <i className="fas fa-chevron-down ml-2"></i>
            </button>
          </div>
          <div className="col-span-2 flex gap-4 justify-between">
            <button className="flex px-4 py-2 bg-white text-base rounded-full leading-tight focus:outline-none focus:shadow-outline">
              + ADD FILTER
            </button>
            <div className="flex flex-row">
              <button className="flex p-2 bg-[#3E54AC] text-white rounded-lg leading-tight focus:outline-none focus:shadow-outline text-sm">
                Configure Dashboard
              </button>
              <button className="flex-grow px-4 py-2 bg-transparent  rounded-lg leading-tight focus:outline-none focus:shadow-outline">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-1">
          <DonutChart {...donutChartData} />
        </div>
        <div className="col-span-1">
          <DonutChart {...newDonutChartData} />
        </div>
        <div className="col-span-2">
          <LinearChart
            title="Coupon redemption rate"
            barPairs={linearChartData}
          />
        </div>
        {cardData.map((data, index) => (
          <Card
            key={index}
            title={data.title}
            value={data.value}
            percentage={data.percentage}
            isPercentagePositive={data.isPercentagePositive}
          />
        ))}
        {barChartData.map((data, index) => (
          <BarChartCard key={index} title={data.title} bars={data.bars} />
        ))}
        {infoChartData.map((data, index) => (
          <InfoChart key={index} title={data.title} data={data.data} />
        ))}
      </div>
    </>
  );
}
