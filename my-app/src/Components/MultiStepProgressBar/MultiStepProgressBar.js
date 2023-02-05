import React from "react";
import "./MultiStepProgressBar.css";

import "../../css/MultiStep.css"
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  var stepPercentage = 0;
  if (page === "Home") {
    stepPercentage = 16;
  } else if (page === "Projects") {
    stepPercentage = 49.5;
  } else if (page === "About") {
    stepPercentage = 82.5;
  } else if (page === "Contact") {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`MultiStep-indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("Home")}
          >
            {"Home"}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`MultiStep-indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("Projects")}
          >
            {"Projects"}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`MultiStep-indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("About")}
          >
            {"About"}
          </div>
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div
            className={`MultiStep-indexedStep ${accomplished ? "accomplished" : null}`}
            onClick={() => onPageNumberClick("Contact")}
          >
            {"Contact"}
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
