import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/chart.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  plugins,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Histogram = ({ dates }) => {
  let totalCount = 0;
  dates.forEach((entry) => (totalCount += entry.count));

  const data = {
    labels: dates.map((date) => date.year),
    datasets: [
      {
        label: "Games Released",
        data: dates.map((date) => date.count),
        fill: false,
        borderColor: "rgba(255, 255, 255, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: { display: false },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Release Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Games",
        },
      },
    },
  };

  return (
    <div className="chart">
      <p>Total Collected: {totalCount}</p>
      <Line data={data} options={options} />
    </div>
  );
};

export default Histogram;
