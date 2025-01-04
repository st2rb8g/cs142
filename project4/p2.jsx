import React from "react";
import ReactDOM from "react-dom";

import States from "./components/States";
import Header from "./components/Header";
ReactDOM.render(<Header/>, document.getElementById("header"));

ReactDOM.render(<States />, document.getElementById("reactapp"));
