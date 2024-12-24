import { RiImage2Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import "./metricPopup.css";
import { useContext, useEffect, useState } from "react";
import {
  downloadLookWithQueryId,
  getDashboardsFromLooker,
  getSingleDashboardFromLooker,
} from "../../api/looker.api";
import Loader from "../loader/Loader";
import ClipLoader from "react-spinners/ClipLoader";
import StateContext from "../../Context/App/StateContext";

const MetricPopup = (props) => {
  const appState = useContext(StateContext);
  const [dashboardsData, setDashboardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [looksData, setLooksData] = useState([]);
  useEffect(() => {
    console.log("app state", appState);
    getDashboardsData();
  }, []);
  const getDashboardsData = async () => {
    setLoading(true);
    let res = await getDashboardsFromLooker(appState.token);
    console.log("looker dashboards response", res);
    if (res && res.status == 200) {
      setDashboardsData(res.data.lookerDashboards);
    }
    setLoading(false);
  };
  const getSingleDashboardData = async (dashboard_id) => {
    setLoading(true);
    let res = await getSingleDashboardFromLooker(dashboard_id, appState.token);
    console.log("looker single dashboard response", res);
    if (res && res.status == 200) {
      setLooksData(res.data.dashboard.dashboard_elements);
    }
    setLoading(false);
  };

  const blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const downloadLook = async (query_id) => {
    setLoading(true);
    let res = await downloadLookWithQueryId(query_id, appState.token);
    console.log("download look response", res.data?.lookImage?.imageData);

    if (res && res.status == 200) {
      console.log("download success");
      const dataToPass = res?.data?.lookImage?.imageData;
      props.onLookData(dataToPass);

      var rawResponse = "PNG"; // This is your response object
      var encodedResponse = btoa(rawResponse);

      var img = new Image();
      var container = document.getElementById("newImg");

      img.src = "data:image/gif;base64," + encodedResponse;

      img.onload = function () {
        container.appendChild(img);
      };
    }
    setLoading(false);
  };
  return (
    <div className="metricpopup-container">
      <div className="metricpopup-wrapper">
        <div className="metricpopup-search-item">
          <div className="metricpopup-search-container">
            <FaSearch size={18} className="menu-icon" color="lightgrey" />
            <div className="metricpopup-search-text">Search</div>
          </div>
          <div className="metricpopup-new-btn">New</div>
        </div>

        {looksData.length == 0 &&
          dashboardsData.length > 0 &&
          loading == false &&
          dashboardsData.map((item, index) => {
            return (
              <div
                key={index}
                className="metricpopup-item"
                onClick={() => getSingleDashboardData(item.id)}
              >
                <RiImage2Line size={18} className="menu-icon" color="white" />
                <div style={{ color: "white", fontSize: "16px" }}>
                  {item.title}
                </div>
              </div>
            );
          })}

        {looksData.length > 0 &&
          looksData.map((item, index) => {
            return (
              <div
                key={index}
                className="metricpopup-item"
                onClick={() => downloadLook(item.query_id)}
              >
                <RiImage2Line size={18} className="menu-icon" color="white" />
                <div style={{ color: "white", fontSize: "16px" }}>
                  {item.title}
                </div>
              </div>
            );
          })}

        {loading ? (
          <div className="metricpopup-close">
            <ClipLoader color={"white"} loading={true} size={30} />
          </div>
        ) : (
          <div onClick={() => props.onClose()} className="metricpopup-close">
            Close
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricPopup;
