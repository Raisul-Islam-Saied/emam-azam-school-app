import Button from "./Button";
import style from "./styles/ProgressBar.module.css";
import { useState } from "react";
// eslint-disable-next-line react/prop-types
function ProgerssBar({ next, prev, progress, submit }) {
  const [toolTipShow, setTooltipShow] = useState(false);
  return (
    <div className={style.progressBar}>
      <div className={style.backButton} onClick={prev}>
        <span className="material-icons-outlined">arrow_back</span>
      </div>
      <div className={style.rangeArea}>
        <div
          className={style.tooltip}
          style={
            toolTipShow
              ? { display: "block", left: `calc(${progress}% - 56px)` }
              : { display: "none" }
          }
        >
          {progress}% Cimplete!
        </div>
        <div className={style.rangeBody}>
          <div
            className={style.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={() => {
              setTooltipShow(true);
            }}
            onMouseLeave={() => {
              setTooltipShow(false);
            }}
          ></div>
        </div>
      </div>

      <Button className={style.next} onClick={progress === 100 ? submit : next}>
        <span className={style.nextQuection}>
          {progress === 100 ? "Submit Quiz" : "Next Question"}
        </span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}

export default ProgerssBar;
