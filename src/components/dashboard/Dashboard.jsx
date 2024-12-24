import DispatchContext from "../../Context/App/DispatchContext";
import { useContext,useEffect } from "react";
import "./dashboard.css";
import { removeLocalUserData } from "../../LocalStorage/userData";
import useDrivePicker from 'react-google-drive-picker'
import { useNavigate } from "react-router-dom";
import { FaGoogleDrive } from "react-icons/fa";
import { TbSquareArrowRightFilled } from "react-icons/tb";
import axios from "axios";

const Dashboard = () => {
  const [openPicker,data,authResponse] =useDrivePicker()
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);

  const logoutUser = () => {
    removeLocalUserData();
    appDispatch({ type: "logoutUser" });
  };


  const handleOpenPicker = async () => {
    openPicker({
      clientId: import.meta.env.VITE_CLIENT_ID,
      developerKey: import.meta.env.VITE_API_KEY,
      viewId: "PRESENTATIONS",
      supportDrives: true,
      multiselect: true,
      callbackFunction: async (data) => {
        if (data.action === 'picked') {        
          const selectedData = {
            id: data.docs[0].id,
            name: data.docs[0].name,
            embedUrl: data.docs[0].embedUrl,
          };
          // localStorage.setItem('presentationId',selectedData.id)
          getPresentationDataInJson(selectedData.id)
          navigate("/slides");
        }
        console.log(data.docs[0].id, data.docs[0].name, data.docs[0].embedUrl);
      },
    });
  };
  
 
  
 

  const getPresentationDataInJson = async (presentationId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/presentation/${presentationId}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        }
      );
  
      console.log('Presentation data:', response.data);
    } catch (error) {
      console.error('Error getting presentation data:', error);
    }
  };
  


  return (
    <div className="container dashboard-content">
      <div className="header"></div>

      <div className="dashbaord-btn-container">
        <div className="dashboard-title-text">Select presentation template</div>
        <div className="dashboard-subtitle-text">
          Describe what role presentation template plays in this whole thing
        </div>
        <div className="selection-btn-container">
          <div onClick={() => handleOpenPicker()} className="dashboard-btn">
            <div className="select-btn-text">
              Select from an existing presentation
            </div>
            <TbSquareArrowRightFilled size={24} className="select-btn-icon" />
          </div>
          <div
            onClick={() => alert("Under development...")}
            className="dashboard-btn"
          >
            <div className="select-btn-text">Create a new presentation</div>
            <TbSquareArrowRightFilled size={24} className="select-btn-icon" />
          </div>
        </div>
      </div>
      {/* <button onClick={() => openExistingPpt()} className="dashboard-btn">
        <FaGoogleDrive size={18} /> Select Existing PPT
      </button>
      <button
        onClick={() => alert("Under development...")}
        className="dashboard-btn"
      >
        <IoIosAddCircle size={18} />
        Create New PPT
      </button>
      <button onClick={() => logoutUser()} className="dashboard-btn">
        <IoLogOut size={18} />
        Logout
      </button> */}
    </div>
  );
};

export default Dashboard;
