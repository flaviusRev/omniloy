/** @format */

// dashboardData.ts
export const cardData = [
  {
    title: "Total sales",
    value: "$4,782,457,65",
    percentage: "15,90",
    isPercentagePositive: true,
  },
  {
    title: "Total receipts",
    value: "387,098",
    percentage: "8,32",
    isPercentagePositive: true,
  },
  {
    title: "Active customers",
    value: "16,467",
    percentage: "7,49",
    isPercentagePositive: false,
  },
  {
    title: "Loyalty sales",
    value: "$2,982,236,02",
    percentage: "0,90",
    isPercentagePositive: true,
  },
  {
    title: "Loyalty receipts",
    value: "78,127",
    percentage: "11,39",
    isPercentagePositive: false,
  },
  {
    title: "New customers",
    value: "234",
    percentage: "11,39",
    isPercentagePositive: false,
  },
  {
    title: "Frequency",
    value: "6,20",
    percentage: "5,47",
    isPercentagePositive: false,
  },
  {
    title: "Massification",
    value: "32,34",
    percentage: "23,88",
    isPercentagePositive: true,
  },
];

export const barChartData = [
  {
    title: "Sales Summary",
    bars: [
      {
        label: "Total sales",
        value: "$6,345,678",
        barPercentage: 100,
      },
      {
        label: "Identified sales",
        value: "$5,905,278",
        barPercentage: 75,
      },
      {
        label: "% Identified sales",
        value: "94%",
        barPercentage: 94,
      },
    ],
  },
  {
    title: "Customer Engagement",
    bars: [
      {
        label: "Total customers",
        value: "14,500",
        barPercentage: 85,
      },
      {
        label: "Engaged last month",
        value: "9,200",
        barPercentage: 65,
      },
      {
        label: "Engagement rate",
        value: "63%",
        barPercentage: 63,
      },
    ],
  },
  {
    title: "Loyalty Program",
    bars: [
      {
        label: "Members enrolled",
        value: "3,780",
        barPercentage: 95,
      },
      {
        label: "Active members",
        value: "3,000",
        barPercentage: 80,
      },
      {
        label: "Retention rate",
        value: "79%",
        barPercentage: 79,
      },
    ],
  },
  {
    title: "Product Sales",
    bars: [
      {
        label: "Total products",
        value: "125,000",
        barPercentage: 70,
      },
      {
        label: "Products sold",
        value: "95,000",
        barPercentage: 55,
      },
      {
        label: "Sell-through rate",
        value: "76%",
        barPercentage: 76,
      },
    ],
  },
  {
    title: "Revenue Streams",
    bars: [
      {
        label: "Primary revenue",
        value: "$10,000,000",
        barPercentage: 100,
      },
      {
        label: "Secondary revenue",
        value: "$2,500,000",
        barPercentage: 25,
      },
      {
        label: "Tertiary revenue",
        value: "$500,000",
        barPercentage: 5,
      },
    ],
  },
  // {
  //   title: "Operational Efficiency",
  //   bars: [
  //     {
  //       label: "Operational costs",
  //       value: "$1,000,000",
  //       barPercentage: 40,
  //     },
  //     {
  //       label: "Revenue to cost ratio",
  //       value: "10:1",
  //       barPercentage: 100,
  //     },
  //     {
  //       label: "Overhead percentage",
  //       value: "10%",
  //       barPercentage: 10,
  //     },
  //   ],
  // },
];

export const infoChartData = [
  {
    title: "Sales Summary",
    data: [
      {
        key: "Total sales",
        value: "$6,345,678",
      },
      {
        key: "Identified sales",
        value: "$5,905,278",
      },
      {
        key: "% Identified sales",
        value: "94%",
      },
    ],
  },
  {
    title: "Customer Insights",
    data: [
      {
        key: "New customers",
        value: "1,240",
      },
      {
        key: "Returning customers",
        value: "3,456",
      },
      {
        key: "Engagement rate",
        value: "78%",
      },
    ],
  },
  {
    title: "Operational Metrics",
    data: [
      {
        key: "Active campaigns",
        value: "12",
      },
      {
        key: "Avg. conversion rate",
        value: "4.7%",
      },
      {
        key: "Customer satisfaction",
        value: "92%",
      },
    ],
  },
];

export const donutChartData = {
  totalLabel: "All Customers",
  totalValue: "4,209",
  segments: [
    {
      color: "#3182CE",
      percentage: 68,
      label: "68% New",
    },
    {
      color: "#63B3ED",
      percentage: 11,
      label: "11% Returning",
    },
    {
      color: "#CBD5E0",
      percentage: 21,
      label: "21% Inactive",
    },
  ],
};

export const newDonutChartData = {
  totalLabel: "Customers in Loyalty Program",
  totalValue: "3,305",
  segments: [
    {
      color: "#3182CE", // Assuming a color similar to the previous chart
      percentage: 60, // Example percentage based on the image
      label: "60% Female",
    },
    {
      color: "#63B3ED", // Lighter shade of blue for contrast
      percentage: 40, // Example percentage based on the image
      label: "40% Male",
    },
    // Add more segments if necessary
  ],
};

export const linearChartData = [
  { firstBar: { value: 50 }, secondBar: { value: 70 } },
  { firstBar: { value: 60 }, secondBar: { value: 80 } },
  { firstBar: { value: 40 }, secondBar: { value: 65 } },
  { firstBar: { value: 75 }, secondBar: { value: 85 } },
  { firstBar: { value: 55 }, secondBar: { value: 95 } },
  { firstBar: { value: 65 }, secondBar: { value: 55 } },
  { firstBar: { value: 70 }, secondBar: { value: 60 } },
  { firstBar: { value: 85 }, secondBar: { value: 50 } },
];
