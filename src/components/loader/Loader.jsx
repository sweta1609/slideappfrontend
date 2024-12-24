import "./loader.css";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
    <div className="container">
      <ClipLoader color={"#0000ff8f"} loading={true} size={30} />
    </div>
  );
};

export default Loader;
