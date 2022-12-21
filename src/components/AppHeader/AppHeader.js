import "./AppHeader.css";
import { GiNotebook } from "react-icons/gi";

function AppHeader() {
  return (
    <div className="container">
      <h3>
        <GiNotebook size={40} /> React Note Taker App
      </h3>
    </div>
  );
}

export default AppHeader;
