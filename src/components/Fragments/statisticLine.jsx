import PropTypes from "prop-types";
import { Card } from "./Card";
import LineChart from "../charts/lineChart";

const LineChartCard = ({ detectionData }) => (
  <Card>
    <Card.Header title={`Total Losses Today`} />
    <div className="p-2">
      <LineChart data={detectionData.data} />
    </div>
  </Card>
);
LineChartCard.propTypes = {
  detectionData: PropTypes.shape({
    data: PropTypes.array,
  }).isRequired,
  // currentDate: PropTypes.string.isRequired,
};

export default LineChartCard;
