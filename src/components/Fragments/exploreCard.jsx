import PropTypes from "prop-types";
import { Fragment } from "react";
import { Card } from "./Card";

const ExploreCard = ({
  selectedTimestamp,
  fileDetection,
  handleTimestampChange,
  timestamps,
}) => {
  const firstData = fileDetection.data && fileDetection.data[0];
  return (
    <Card>
      <Card.Header title="Explore" />
      <div className="p-2 flex items-center my-5">
        <select
          id="timestamp"
          onChange={(e) => handleTimestampChange(e.target.value)}
          value={selectedTimestamp}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="" disabled selected>
            Choose a timestamp
          </option>
          {timestamps.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center p-4">
        <Card.Body title="Image TBS Isi">
          <div className="flex flex-wrap">
            {firstData?.file_paths?.tbs_isi &&
              firstData.file_paths.tbs_isi.map((imageUrl, index) => (
                <Fragment key={index}>
                  <img
                    src={imageUrl}
                    alt={`Image TBS Isi ${index}`}
                    className="m-2"
                    style={{ width: "150px", height: "150px" }}
                  />
                </Fragment>
              ))}
          </div>
        </Card.Body>
        <Card.Body title="Image TBS Kosong">
          <div className="flex flex-wrap">
            {firstData?.file_paths?.tbs_kosong &&
              firstData.file_paths.tbs_kosong.map((imageUrl, index) => (
                <Fragment key={index}>
                  <img
                    src={imageUrl}
                    alt={`Image TBS Kosong ${index}`}
                    className="m-2"
                    style={{ width: "150px", height: "150px" }}
                  />
                </Fragment>
              ))}
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

ExploreCard.propTypes = {
  selectedTimestamp: PropTypes.string.isRequired,
  fileDetection: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        file_paths: PropTypes.shape({
          tbs_isi: PropTypes.arrayOf(PropTypes.string),
          tbs_kosong: PropTypes.arrayOf(PropTypes.string),
        }),
      })
    ),
  }).isRequired,
  handleTimestampChange: PropTypes.func.isRequired,
  timestamps: PropTypes.func.isRequired,
};

export default ExploreCard;
