import { Fragment, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Card } from "../components/Fragments/Card";
import Button from "../components/Elements/Button";
import { BsSearch } from "react-icons/bs";
import { fetcher } from "../libs/utils/fetcher";
// import { baseURL } from "../libs/utils/api";
import LoadingBars from "../loading";
import Swal from "sweetalert2";

export const StatisticsPage = () => {
  const [detectionData, setDetectionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await Swal.fire({
      title: "Are you sure?",
      text: "You will logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Success Logout", "", "success");
        // WARNING : hanya untuk development set timeout loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.removeItem("email");
        localStorage.removeItem("password");

        // localStorage.removeItem("access_token")
        // localStorage.removeItem("refresh_token")
        window.location.href = "/";
      } else {
        Swal.fire("Error!", "Failed to log out. Please try again.", "error");
      }
    });
  };

  const dummyImageData = [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ];

  const chartRef = useRef(null);

  const getDetectionData = async () => {
    try {
      setLoading(true);

      // WARNING : hanya untuk development set timeout loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      // const response = await fetcher(`${baseURL}/detection_data`, {
      //   method: 'GET'
      // })

      // WARNING : dummy data tidak digunakan jika BE sudah memberikan data real.
      const response = await fetcher(`https://gist.githubusercontent.com/IkhsanHamid/d65ec5d62c0f7d12a07606372f8f7016/raw/a9b67851d45f7711f266996ef13eeee4240a33ff/data_dummy.json.json`, {
        method: 'GET'
      })
      setDetectionData(response);
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetectionData();
  }, []);

  console.log(detectionData["detection"])
  const getTotalCount = (detectionData, type) => {
    if (detectionData?.detection) {
      const totalCount = detectionData.detection.reduce((acc, hourData) => {
        const count = hourData[Object.keys(hourData)[0]][type];
        return acc + count;
      }, 0);
      return totalCount;
    }
    return "N/A";
  };

  useEffect(() => {
    if (!loading) {
      const ctx = chartRef.current.getContext("2d");

      // Extracting data for the chart
      const chartData = detectionData?.detection.map((hourData) => {
        const timestamp = Object.keys(hourData)[0];
        const tbsIsi = hourData[timestamp].tbs_isi;
        const tbsKosong = hourData[timestamp].tbs_kosong;

        // Calculating total loss percentage
        const totalLoss = (tbsIsi / tbsKosong) * 100;

        return {
          x: new Date(timestamp).toLocaleTimeString(),
          y: totalLoss,
        };
      });

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: chartData.map((data) => data.x),
          datasets: [
            {
              label: "Total Loss",
              data: chartData.map((data) => data.y),
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
        myChart.destroy();
      };
    }
  }, [loading, detectionData]);

  const currentDate = new Date().toLocaleDateString("id-ID");

  return (
    <>
      {loading ? (
        <LoadingBars />
      ) : (
        <Fragment>
          <div className="h-16 bg-gray-400 text-white flex justify-between items-center px-10">
            <h1 className="text-center text-black flex-grow">
              LOSS COUNTER - TANDAN BUAH SEGAR KELAPA SAWIT -{" "}
              <span className="font-bold">PTPN IV</span>
            </h1>
            <Button onClick={handleLogout} variant="bg-gray-500">
              Logout
            </Button>
          </div>
          <div className="flex justify-center py-5">
            <div className="flex p-10">
              <Card>
                <Card.Header title={`Statistik Hari Ini ${currentDate}`} />
                <div className="flex justify-between mt-8">
                  <Card.Body title="TBS Isi">{getTotalCount(detectionData, "tbs_isi")}</Card.Body>
                  <Card.Body title="TBS Kosong">{getTotalCount(detectionData, "tbs_kosong")}</Card.Body>
                </div>
                <div className="p-2">
                  <canvas ref={chartRef} width={400} height={300}></canvas>
                </div>
              </Card>
              <div className="ml-5">
                <Card>
                  <Card.Header title="Explore" />
                  <div className="p-2 flex items-center">
                    <input
                      type="text"
                      placeholder="Pilih Jam Pengambilan Sample"
                      className="w-full p-2 border border-gray-300 rounded-md mr-2"
                    />
                    <BsSearch className="text-gray-500 cursor-pointer" />{" "}
                  </div>
                  <div className="flex flex-wrap justify-center p-4">
                    {dummyImageData.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="m-2"
                        style={{ width: "150px", height: "150px" }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Fragment>
      )}

    </>
  );
};
