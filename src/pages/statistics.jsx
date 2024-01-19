import { Fragment, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Card } from "../components/Fragments/Card";
import Button from "../components/Elements/Button";
import { BsSearch } from "react-icons/bs";
import { fetcher } from "../libs/utils/fetcher";
import { baseURL } from "../libs/utils/api";
import LoadingBars from "../loading";

export const StatisticsPage = () => {
  const [detectionData, setDetectionData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    // localStorage.removeItem("access_token")
    window.location.href = "/";
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
      await new Promise(resolve => setTimeout(resolve, 5000));

      const response = await fetcher(`${baseURL}/detection_data`, {
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


  useEffect(() => {
    if (!loading) {
      const ctx = chartRef.current.getContext("2d");

      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
          datasets: [
            {
              label: "Dataset",
              data: [7, 10, 8, 5, 2],
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
                text: "Total Loss",
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
  }, [loading]);

  return (
    <>
    {loading ? (
      <LoadingBars/>
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
          <div className="flex p-5">
            <Card>
              <Card.Header title="Statistik Hari Ini" />
              <div className="flex justify-between mt-8">
              {detectionData.detection ? (
                <>
                  <Card.Body title="TBS Isi">{detectionData.detection[0]?.tbs_isi}</Card.Body>
                  <Card.Body title="TBS Kosong">{detectionData.detection[0]?.tbs_kosong}</Card.Body>
                </>
              ) : (
                <>
                  <Card.Body title="TBS Isi">Loading...</Card.Body>
                  <Card.Body title="TBS Kosong">Loading...</Card.Body>
                </>
              )}
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
