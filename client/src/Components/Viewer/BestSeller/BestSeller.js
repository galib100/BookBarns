import React from "react";
import data from "./demoData";

const BestSeller = () => {
  return (
    <div>
      {data.map((item) => (
        <div className="text-primary">{item.name}</div>
      ))}
    </div>
  );
};

export default BestSeller;
