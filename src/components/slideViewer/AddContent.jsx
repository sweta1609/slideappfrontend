import { MdOutlineAddBox } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import { VscGraph } from "react-icons/vsc";
import { BsTextParagraph } from "react-icons/bs";
import { RiImage2Line } from "react-icons/ri";

import "./addContent.css";
import MetricPopup from "./MetricPopup";
import { useState } from "react";
const AddContent = ({onDataFromAddContent}) => {
  const [showMetrics, setShowMetrics] = useState(false);
  const [lookData, setLookData] = useState(null);
  const handleLookData = (data) => {
    setLookData(data); 
    onDataFromAddContent(data);
  };
  return (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Menu
        menuButton={
          <MenuButton>
            <div className="newcontent">
              <MdOutlineAddBox size={20} />
              <div className="newcontent-text">New Content</div>
              <MdKeyboardArrowDown />
            </div>
          </MenuButton>
        }
      >
        <div className="menu-title">Select Type</div>
        <MenuItem onClick={() => setShowMetrics(true)}>
          <VscGraph size={18} className="menu-icon" />
          Metric
        </MenuItem>
        <MenuItem onClick={() => setAddComment(true)}>
          <BsTextParagraph size={18} className="menu-icon" />
          Text
        </MenuItem>
        <MenuItem>
          <RiImage2Line size={18} className="menu-icon" />
          Image
        </MenuItem>
      </Menu>
      {showMetrics == true && (
        <div>
          <MetricPopup onClose={() => setShowMetrics(false)} 
          onLookData={handleLookData}/>
        </div>
      )}
    </div>
  );
};

export default AddContent;
