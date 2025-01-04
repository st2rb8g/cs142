import React, { useState } from "react";
import ReactDOM from "react-dom";

import Example from "./components/Example";
import States from "./components/States";
import Header from "./components/Header";

function P4() {
    const [view, setView] = useState(false);
    if(view === false) {
        return (
            <>
                <button onClick={() =>{setView(true);}} > Switch to States </button>
                <Example />
            </>
        );
    } else {
        return (
            <>
                <button onClick={() =>{setView(false);}} >Switch to Example </button>
                <States />
            </>
        );
    }
}

ReactDOM.render(<Header/>, document.getElementById("header"));

ReactDOM.render(<P4 />, document.getElementById("reactapp"));