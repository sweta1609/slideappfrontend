import { GoComment } from "react-icons/go";

const SlidePreview = (props) => {
  return (
    <div
      onClick={() => props.onSelect(props.data.slideNumber)}
      className="slide slide-thumbnail"
      style={{
        border:
          props.data.activeSlide == props.data.slideNumber
            ? "1px solid black"
            : "1px solid #cac9e6",
      }}
    >
      <div className="slide-content-title">
        <div className="slide-content-title-text ">Title of the slide</div>
        <GoComment className="slide-content-title-icon" />
      </div>
      <img src={props.data.image} className="slide-image" />
      <div className="comment-text">{props.data.comment}</div>
      <div
        className="slide-number"
        style={{
          backgroundColor:
            props.data.activeSlide == props.data.slideNumber
              ? "black"
              : "#e0e6ec",
        }}
      >
        <div
          className="slide-number-text"
          style={{
            color:
              props.data.activeSlide == props.data.slideNumber
                ? "white"
                : "black",
          }}
        >
          {props.data.slideNumber + 1}
        </div>
      </div>
    </div>
  );
};

export default SlidePreview;
