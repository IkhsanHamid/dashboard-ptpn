import { Fragment, useEffect, useState } from "react";
import Button from "../components/Elements/Button";
import { fetcher } from "../libs/utils/fetcher";
import { baseURL } from "../libs/utils/api";
import LoadingBars from "../loading";
import Swal from "sweetalert2";
import BarChartCard from "../components/Fragments/statisticBar";
import LineChartCard from "../components/Fragments/statisticLine";
import ExploreCard from "../components/Fragments/exploreCard";
import CardTotalTBS from "../components/Fragments/CardTotalTBS";
// import { currentDate } from "../libs/utils/utils";

export const StatisticsPage = () => {
  const [detectionData, setDetectionData] = useState([]);
  const [fileDetection, setFileDetection] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTimestamp, setSelectedTimestamp] = useState("");

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
        // WARNING: hanya untuk development set timeout loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
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

  const getDetectionData = async () => {
    try {
      setLoading(true);
      // WARNING: hanya untuk development set timeout loading
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // WARNING: dummy data tidak digunakan jika BE sudah memberikan data real.
      const response = await fetcher(`${baseURL}/api/detections/getData`, {
        method: "GET",
      });

      setDetectionData(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filesData = async ({ search }) => {
    try {
      setLoading(true);
      let files;
      if (search) {
        files = await fetcher(
          `${baseURL}/api/detections/getFiles?search=${search}`,
          {
            method: "GET",
          }
        );
      } else {
        files = await fetcher(`${baseURL}/api/detections/getFiles`, {
          method: "GET",
        });
      }
      setFileDetection(files);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDetectionData();
        await filesData({ search: "" });
        await handleTimeStamp();
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, []);

  const getTotalCount = (detectionData, tbsType) => {
    if (detectionData?.data) {
      let totalCount = 0;

      detectionData.data.forEach((item) => {
        if (item.class_count) {
          totalCount += item.class_count[tbsType] || 0;
        }
      });

      return totalCount;
    }

    return "N/A";
  };

  const handleTimestampChange = async (selectedTimestamp) => {
    try {
      await filesData({ search: selectedTimestamp });
      setSelectedTimestamp(selectedTimestamp);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleTimeStamp = async () => {
    try {
      let time = await fetcher(`${baseURL}/api/detections/getTimeStamp`, {
        method: "GET",
      });
      setTimestamps(time);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBars />
      ) : (
        <Fragment>
          <div className="h-16 bg-gray-400 text-white flex justify-between items-center px-10 fixed w-full top-0 z-10 mb-10">
            <h1 className="text-center text-black flex-grow">
              LOSS COUNTER - TANDAN BUAH SEGAR KELAPA SAWIT -{" "}
              <span className="font-bold">PTPN IV</span>
            </h1>
            <Button onClick={handleLogout} variant="bg-gray-500">
              Logout
            </Button>
          </div>
          <div className="flex justify-center mt-14">
            <div className="flex p-5">
              <LineChartCard
                detectionData={detectionData}
                getTotalCount={getTotalCount}
              />
              <BarChartCard
                detectionData={detectionData}
                getTotalCount={getTotalCount}
              />
              <CardTotalTBS
                detectionData={detectionData}
                getTotalCount={getTotalCount}
              />
            </div>
          </div>
          <div className="m-10">
            <ExploreCard
              selectedTimestamp={selectedTimestamp}
              fileDetection={fileDetection}
              handleTimestampChange={handleTimestampChange}
              timestamps={timestamps}
            />
          </div>
        </Fragment>
      )}
    </>
  );
};
