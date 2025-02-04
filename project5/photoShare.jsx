import React, {useEffect }  from "react";
import ReactDOM from "react-dom";
import { Grid, Typography, Paper } from "@mui/material";
import { HashRouter, Route, Switch } from "react-router-dom";

import "./styles/main.css";
import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import fetchModel from "./lib/fetchModelData.js";

function Homepage({setText}) {
  useEffect(() => {
    setText("Homepage");
    
  }, []);
  return (
    <Typography variant="body1">
      Welcome to your photosharing app! This{" "}
      <a href="https://mui.com/components/paper/">Paper</a>{" "}
      component displays the main content of the application.
      The {"sm={9}"} prop in the{" "}
      <a href="https://mui.com/components/grid/">Grid</a> item
      component makes it responsively display 9/12 of the
      window. The Switch component enables us to conditionally
      render different components to this part of the screen.
      You don&apos;t need to display anything here on the
      homepage, so you should delete this Route component once
      you get started.
    </Typography>
  );
} 

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightTopText:"",
      version:"",
    };

    this.setRightTopText = (text) => {
      this.setState({rightTopText:text});
    };

    this.getVersion = async () => {
      try {
        let ver= (await fetchModel("http://localhost:3000/test/info" )).data.__v;
        this.setState({ version:ver }); 
      } catch (error) {
        console.error(error);
      }
    };
  }

  componentDidMount() {
    this.getVersion();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar ver={this.state.version} rightTopText = {this.state.rightTopText}/>
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            <Grid item sm={3}>
              <Paper className="cs142-main-grid-item">
                <UserList />
              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="cs142-main-grid-item">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Homepage setText={this.setRightTopText}/>
                    )}
                  />
                  <Route
                    path="/users/:userId"
                    render={(props) => <UserDetail {...props} setText={this.setRightTopText} />}
                  />
                  <Route
                    path="/photos/:userId"
                    render={(props) => <UserPhotos {...props} setText={this.setRightTopText} />}
                  />
                  <Route path="/users" component={UserList} />
                </Switch>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
