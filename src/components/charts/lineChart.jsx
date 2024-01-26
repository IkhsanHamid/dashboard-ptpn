import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
  const lineChartRef = useRef(null);

  useEffect(() => {
    const lineChartCtx = lineChartRef.current.getContext("2d");

    const lineChartData = data.map((hourData) => {
      const timestamp = hourData.timestamp;
      const tbsIsi = hourData.class_count.tbs_isi;
      const tbsKosong = hourData.class_count.tbs_kosong;

      // Calculating total loss percentage for line chart
      const totalLoss = (tbsIsi / tbsKosong) * 100;

      return {
        x: new Date(timestamp).toLocaleTimeString(),
        y: totalLoss,
      };
    });

    const lineChart = new Chart(lineChartCtx, {
      type: "line",
      data: {
        labels: lineChartData.map((data) => data.x),
        datasets: [
          {
            label: "Total Loss",
            data: lineChartData.map((data) => data.y),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.5,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Jam",
              color: "black",
              font: {
                weight: "bold",
              },
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Loss (%)",
              color: "black",
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    });

    return () => {
      lineChart.destroy();
    };
  }, [data]);

  return <canvas ref={lineChartRef} width={400} height={300}></canvas>;
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      class_count: PropTypes.shape({
        tbs_isi: PropTypes.number.isRequired,
        tbs_kosong: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default LineChart;
