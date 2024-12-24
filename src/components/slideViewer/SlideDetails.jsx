import { IoLogoBuffer } from "react-icons/io5";
import "./slideDetails.css";

const SlideDetails = () => {
  return (
    <div className="slide-header-left">
      <div className="slide-logo">
        <IoLogoBuffer size={24} />
      </div>
      <div className="slide-details">
        <div className="slide-title">Weekly Business Review</div>
        <div className="slide-status">
          <span className="status-indicator">Draft</span> Finalizes in
          <span> 3 </span>days
        </div>
      </div>
    </div>
  );
};

export default SlideDetails;
