import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "../../styles/chart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ColumnChart = ({ tagCount, displayOption, selectedTag }) => {
  if (!tagCount || tagCount.length === 0) {
    return <div>No data...</div>;
  }

  // Begin Splitting tagCount for each genre in the array
  // tagCount = Array [ "Identifier", count_value ]
  // console.log(tagCount);

  // Total Counts
  let total_sum = 0;
  tagCount.forEach((entry) => {
    total_sum += entry[1];
  });

  // Labels
  const labels = tagCount.slice(0, 10).map((entry) => entry[0]);
  const labels_others = tagCount
    .slice(10, tagCount.length)
    .map((entry) => entry[0]);

  // Counts
  const counts = tagCount.slice(0, 10).map((entry) => entry[1]);
  const counts_others = tagCount
    .slice(10, tagCount.length)
    .map((entry) => entry[1]);

  const data_short = {
    labels: [...labels],
    datasets: [
      {
        data: [...counts],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 46, 91, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(10, 101, 161, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(158, 118, 15, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(16, 119, 119, 0.8)",
          "rgba(222, 89, 255, 0.8)",
          "rgba(140, 7, 173, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        categoryPercentage: 1,
      },
    ],
  };

  const data_long = {
    labels: [...labels, ...labels_others],
    datasets: [
      {
        data: [...counts, ...counts_others],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 46, 91, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(10, 101, 161, 0.8)",
          "rgba(255, 206,86, 0.8)",
          "rgba(158, 118, 15, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(16, 119, 119, 0.8)",
          "rgba(222, 89, 255, 0.8)",
          "rgba(140, 7, 173, 0.8)",
        ],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
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
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="chart">
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0",
        }}
      >
        Most Common {selectedTag}
      </h2>
      <p>Total Collected: {total_sum}</p>
      {displayOption === "no" ? (
        <div className="chart-sizing">
          <Bar data={data_short} options={options} />
        </div>
      ) : (
        <div className="chart-sizing">
          <Bar data={data_long} options={options} />
        </div>
      )}
    </div>
  );
};

export default ColumnChart;
