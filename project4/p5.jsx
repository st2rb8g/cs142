import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Example from "./components/Example";
import States from "./components/States";
import Header from "./components/Header";
import "./styles/p5.css";

function NavigateButton({url, buttonName}) {
    const [redirect, setRedirect] = useState(false);
    const navClick = () => {
        setRedirect(true);
    };
    if(redirect === true) {
        return <Redirect to={url} />;
    }
    return <div><button onClick={navClick}>{buttonName}</button></div>;
}

function HomePage() {
    return (
            <div>
                Home Page
                <nav className="toolbar">
                    <NavigateButton url = {"/example"} buttonName={"Go to Example"} />
                    <NavigateButton url = {"/states"} buttonName={"Go to States"} />
                </nav>
            </div>
        );
}

function StatesPage() {
    return (
        <>
            <nav className="toolbar">
                <NavigateButton url = {"/example"} buttonName={"Go to Example"} />
                <NavigateButton url = {"/home"} buttonName={"Go to home"} />
            </nav>
            <States />
        </>
    );
}

function ExamplePage() {
    return (
        <>
            <nav className="toolbar">
                <NavigateButton url = {"/states"} buttonName={"Go to States"} />
                <NavigateButton url = {"/home"} buttonName={"Go to home"} />
            </nav>
            <Example />
        </>
    );
}

function P4() {

    return (
            
            <Switch>               
                <Route path="/example" component={ExamplePage} />
                <Route path="/states" component={StatesPage} />
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>             
                <Route path="/home" component={HomePage} />
            </Switch>
    );
}
ReactDOM.render(<Header/>, document.getElementById("header"));

ReactDOM.render(<HashRouter>
                    <P4 />
                </HashRouter>, document.getElementById("reactapp"));