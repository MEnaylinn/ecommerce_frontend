import React from "react";
import {Box} from "@mui/material"
const ProgressCircle = ({ progress = "0.75", size = "80" }) => {

  const angle = progress * 360;

  const circleStyle = {
    background: `radial-gradient(circle at center, #0DCAF0 40%, transparent 60%),
                 conic-gradient(transparent 0deg ${angle}deg, white ${angle}deg 360deg),
                 blue`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
  };

  

  return (
    <Box
    sx={{
      background: `radial-gradient(white 50%, transparent 70%),
            conic-gradient(transparent 0deg ${angle}deg, white ${angle}deg 360deg),
            blue`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
    }}
    />
  );
};

export default ProgressCircle;
