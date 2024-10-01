import React from "react";
import ProgressCircle from "./ProgressCircle";
const StatBox = ({ title, amount, icon, increase, progress }) => {


  return (
    <div className="bg-info p-2 " style={{borderRadius:10+'px'}}>
      <div className="d-flex justify-content-between text-center">
        <div className="text-center mt-2">
          <div className="h4 text-dark fw-bold">{new Intl.NumberFormat().format(amount)}</div>
          <div className="h5 fw-bold">{title}</div>
        </div>
        <div className="align-content-center d-flex">
            <ProgressCircle progress={progress} className="position-relative"/>
            <div className="fs-2 position-absolute" style={{margin:"15px 0 0 25px"}}>{icon}</div>
        </div>
      </div>
    </div>
  );
};

export default StatBox;
