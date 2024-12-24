import { BsThreeDotsVertical } from "react-icons/bs";
import "./slideActions.css";
import pptxgen from "pptxgenjs";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import DispatchContext from "../../Context/App/DispatchContext";
import { useNavigate } from "react-router-dom";
import {
  removeLocalToken,
  removeLocalUserData,
  removeAccessToken
} from "../../LocalStorage/userData";
import { useContext } from "react";
import { LuPresentation } from "react-icons/lu";
import { FaGoogleDrive } from "react-icons/fa";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const SlideActions = ({slideData,lookImageData}) => {
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const logout = () => {
    removeLocalUserData();
    removeLocalToken();
    removeAccessToken();
    navigate("/");
    window.location.reload();
  };
 

  
  const exportPPT = () => {
    let pres = new pptxgen();
    console.log(slideData);
    
    slideData.forEach((item) => {
      let slide = pres.addSlide();
  
      if (item.lookImageData) {
        const dataURI = `data:image/png;base64,${btoa(item?.lookImageData)}`;
        slide.addImage({
          x: "10%",
          y: "10%",
          w: "80%",
          h: "60%",
          data: dataURI,
        });
      }
  
      let textboxText = item.comment;
      let textboxOpts = { x: "30%", y: "80%" };
      slide.addText(textboxText, textboxOpts);
    });
  
    pres.writeFile();
  };
  
  
  return (
    <div className="header-right-container">
      <Menu
        menuButton={
          <MenuButton>
            <BsThreeDotsVertical size={20} />
          </MenuButton>
        }
      >
        {/* <div className="menu-title">Select Type</div> */}
        <MenuItem onClick={() => exportPPT()}>
          <LuPresentation size={20} className="menu-icon" />
          Export PPT
        </MenuItem>
        <MenuItem>
          <FaGoogleDrive size={20} className="menu-icon" />
          View Google Drive
        </MenuItem>
        <MenuItem>
          <MdOutlinePublishedWithChanges size={20} className="menu-icon" />
          Publish Now
        </MenuItem>
        <MenuItem onClick={() => logout()}>
          <IoLogOut size={20} className="menu-icon" />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SlideActions;
