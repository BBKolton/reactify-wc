import React from "react";
import "./Root.css";

import "./webComponent.js";
import Reactify from "reactify-wc";
const ReactifiedWC = Reactify("web-component");

const Root = () => {
  return (
    <ReactifiedWC
      someString="yes"
      customFunction={() => console.log("ayylmaooo")}
    >
      Hello World
    </ReactifiedWC>
  );
};

export default Root;
