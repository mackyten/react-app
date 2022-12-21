import { TbFaceIdError } from "react-icons/tb";
import "./Error.css";

function Error() {
  console.log(" EEEEEEEEEEEEEERRRRRR");
  return (
    <div className="Error-container">
      <div className="Error-Icon">
        <TbFaceIdError size={70} />
      </div>
      <h1>Uh oh! We cannot connect you to the server.</h1>
      <p>
        There is an error that occurred when we were trying to connect to the
        server.
      </p>
    </div>
  );
}
export default Error;
