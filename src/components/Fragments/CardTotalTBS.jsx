import { Card } from "./Card";
import PropTypes from "prop-types";

const CardTotalTBS = ({ detectionData, getTotalCount }) => {
  return (
    <div className="flex flex-col items-center">
      <Card margin="mt-10" padding="py-14 px-20">
        <Card.Header title="Total TBS Isi" />
        <div className="flex justify-center mt-5">
          <Card.Body
            text="text-4xl"
            title={getTotalCount(detectionData, "tbs_isi")}
          />
        </div>
      </Card>
      <Card margin="mt-10" padding="p-10">
        <Card.Header title="Total TBS Kosong" />
        <div className="flex justify-center mt-5">
          <Card.Body
            text="text-4xl"
            title={getTotalCount(detectionData, "tbs_kosong")}
          />
        </div>
      </Card>
    </div>
  );
};

CardTotalTBS.propTypes = {
  detectionData: PropTypes.shape({
    data: PropTypes.array,
  }).isRequired,
  getTotalCount: PropTypes.func.isRequired,
};

export default CardTotalTBS;
