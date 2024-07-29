import React from "react";
import master from "../../image/master.png";
import visa from "../../image/visa.png";
import jcb from "../../image/jcb.png";
import union from "../../image/union.png";

const CardShortcut = () => {
  return (
    <div>
      <img src={master} alt="master" className="credit-card" />
      <img src={visa} alt="visa" className="credit-card" />
      <img src={jcb} alt="jcb" className="credit-card" />
      <img src={union} alt="union" className="credit-card" />
    </div>
  );
};

export default CardShortcut;
