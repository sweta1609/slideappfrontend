import { GoComment } from "react-icons/go";

const Slide = (props) => {
  console.log(props.data);
  const imageBinaryData = props?.data?.lookImageData
  const dataURI = `data:image/png;base64,${btoa(imageBinaryData)}`;


  return (
    <div className="slide">
      <div className="slide-content-title">
        <div className="slide-content-title-text ">Title of the slide</div>
        <GoComment className="slide-content-title-icon" />
      </div>
      <img src={props.data.image} className="slide-image" />
      <div className="comment-text">{props.data.comment}</div>
      {props.data.lookImageData && (
        <div className="look-image">
          <img
            src={dataURI}
            alt="Look Image"
            style={{ width: "200px", height: "300px" }}
          />
        </div>
      )}
    </div>
  );
};

export default Slide;
