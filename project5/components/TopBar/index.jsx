import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant="h5" color="inherit">
            Kasumi Toyama
          </Typography>
          <Typography variant="h6" color = "inherit">
            {this.props.ver}
          </Typography>
          <Typography variant="h5" color="inherit">
            {this.props.rightTopText}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
