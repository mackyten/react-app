import { TailSpin } from "react-loader-spinner";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="Loading-Spinner">
      <div className="spinner">
        <TailSpin
          height="80"
          width="80"
          color="#2a9d8f"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
