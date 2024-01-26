import PropTypes from "prop-types";
import BarChart from "../charts/barChart";
import { Card } from "./Card";

const BarChartCard = ({ detectionData }) => (
  <Card>
    <Card.Header title={`Total TBS Today`} />
    <div className="p-2">
      <BarChart data={detectionData.data} />
    </div>
  </Card>
);
BarChartCard.propTypes = {
  detectionData: PropTypes.shape({
    data: PropTypes.array,
  }).isRequired,
  // currentDate: PropTypes.string.isRequired,
};

export default BarChartCard;
