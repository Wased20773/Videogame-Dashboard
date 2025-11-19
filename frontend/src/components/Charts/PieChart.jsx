import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../../styles/PieChart.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ genreCount }) => {
  if (!genreCount || genreCount.length === 0) {
    return <div>No data yet...</div>;
  }

  // Begin Splitting genreCount for each genre in the array
  // Array [ "Genre", 12345 ]

  // Labels
  const labels = genreCount.slice(0, 9).map((entry) => entry[0]);
  const labels_others = genreCount
    .slice(10, genreCount.length)
    .map((entry) => entry[0]);

  // Counts
  const counts = genreCount.slice(0, 9).map((entry) => entry[1]);
  const counts_others = genreCount
    .slice(10, genreCount.length)
    .map((entry) => entry[1]);
  let counts_others_sum = 0;
  counts_others.forEach((c) => {
    counts_others_sum += c;
  });

  const labels_full = [...labels, "Others"];
  const counts_full = [...counts, counts_others_sum];
  const data = {
    labels: labels_full,
    datasets: [
      {
        label: "Count",
        data: counts_full,
        backgroundColor: [
          "rgba(255,99,132,0.6)",
          "rgba(255, 46, 91, 0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(10, 101, 161, 0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(158, 118, 15, 0.6)",
          "rgba(75,192,192,0.6)",
          "rgba(16, 119, 119, 0.6)",
          "rgba(222, 89, 255, 0.6)",
          "rgba(140, 7, 173, 0.6)",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <Pie data={data} />
      <div className="others-container">
        <div>Others Genres and Counts</div>
        {labels_others.map((label, i) => (
          <div key={i} className="others-contents">
            {label}: <div>{counts_others[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
