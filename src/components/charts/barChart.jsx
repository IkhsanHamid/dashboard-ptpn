import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
  const barChartRef = useRef(null);

  useEffect(() => {
    const barChartCtx = barChartRef.current.getContext("2d");

    const barChartData = data.map((hourData) => {
      const timestamp = hourData.timestamp;
      const tbsIsi = hourData.class_count.tbs_isi;
      const tbsKosong = hourData.class_count.tbs_kosong;

      return {
        x: new Date(timestamp).toLocaleTimeString(),
        tbsIsi: tbsIsi,
        tbsKosong: tbsKosong,
      };
    });

    const barChart = new Chart(barChartCtx, {
      type: "bar",
      data: {
        labels: barChartData.map((data) => data.x),
        datasets: [
          {
            label: "TBS Isi",
            data: barChartData.map((data) => data.tbsIsi),
            backgroundColor: "rgb(255, 99, 132)",
          },
          {
            label: "TBS Kosong",
            data: barChartData.map((data) => data.tbsKosong),
            backgroundColor: "rgb(54, 162, 235)",
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
              text: "Jumlah TBS",
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
      barChart.destroy();
    };
  }, [data]);

  return <canvas ref={barChartRef} width={400} height={300}></canvas>;
};

BarChart.propTypes = {
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

export default BarChart;
