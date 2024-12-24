import { useContext, useEffect, useState } from "react";

import Loader from "../loader/Loader";
import "./slideViewer.css";
import "@szhsin/react-menu/dist/index.css";

import SlideDetails from "./SlideDetails";
import AddContent from "./AddContent";
import SlideActions from "./SlideActions";
import SlidePreview from "./SlidePreview";
import Slide from "./Slide";
import SpeakerNotes from "./SpeakerNotes";

const SlideViewer = () => {
  const [active, setActive] = useState(0);
  const [comment, setComment] = useState("");
  const [slideData, setSlideData] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [lookImageData, setLookImageData] = useState(null);
  useEffect(() => {
    getMetrics();
  }, []);

 
  const getMetrics = async () => {
    let items = [
      { image: "", comment: "comment1", lookImageData: null },
      { image: "", comment: "comment2", lookImageData: null },
      { image: "", comment: "comment3", lookImageData: null },
      { image: "", comment: "comment4", lookImageData: null },
      { image: "", comment: "comment5", lookImageData: null },
      { image: "", comment: "comment6", lookImageData: null },
    ];
  
    if (items) setSlideData(items);
  };
  
  const handleDataFromAddContent = (data) => {
    if (data) {
      let updatedSlideData = [...slideData];
      updatedSlideData[active].lookImageData = data;
      setSlideData(updatedSlideData);
      setLookImageData(data);
    }
  };
  
  
  
  

  const updateComment = () => {
    let temp = slideData;
    temp[active].comment = comment;
    setSlideData(temp);
    localStorage.setItem("metrics", JSON.stringify(temp));
    setComment("");
  };



  if (slideData.length == 0) {
    return <Loader />;
  } else
    return (
      <div className="slideviewer-container">
        <div className="slideviewer-header">
          <SlideDetails />
          <AddContent onDataFromAddContent={handleDataFromAddContent}/>
          <SlideActions  slideData={slideData}  />
        </div>

        <div className="slide-container">
          <div className="left-panel">
            {/* <button onClick={() => exportPPT()}>Export PPT</button> */}
            {slideData.map((item, index) => {
              return (
                <SlidePreview
                  key={index}
                  data={{ ...item, slideNumber: index, activeSlide: active }}
                  onSelect={(slideNumber) => setActive(slideNumber)}
                />
              );
            })}
          </div>
          <div className="right-panel">
            {slideData.map((item, index) => {
              return (
                active == index && <Slide key={index} data={{ ...item }}  />
              );
            })}
  

            <div className="divider"></div>
            <SpeakerNotes />
            {addComment && (
              <div className="addcomment-container">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="comment-input"
                />
                <button
                  onClick={() => updateComment(active)}
                  className="comment-btn"
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default SlideViewer;
