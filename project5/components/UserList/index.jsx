import React from "react";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData.js";

/**
 * Define UserList, a React component of CS142 Project 5.
 * 
 */
 

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList:null,
    };


    this.stringToColor = (string) => {
      let hash = 0;
      let i = 0;

      /* eslint-disable no-bitwise */
      for(i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
      }

      let color = '#';
      for(i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */

      return color;
    };

    this.stringAvatar = (first_name, last_name) => {
      function getUpperCase(s) {
        return s ? s.charAt(0).toUpperCase() : "?";
      }

      const name = first_name + last_name;
      return {
        sx: {
          bgcolor: this.stringToColor(name),
        },
        children: getUpperCase(first_name) + getUpperCase(last_name),
      };
    };

    this.getUserList = async () => {
      try {
        let userList= (await fetchModel("http://localhost:3000/user/list" )).data;
        this.setState({ userList:userList }); 
      } catch (error) {
        console.error(error);
      }
    };
  }
  
  componentDidMount() {
    this.getUserList();
  }


  render(){
    if(this.state.userList === null) {
      return <div></div>;
    }
    return (
      <div>
        <Typography variant="body1">
          This is the user list, which takes up 3/12 of the window. You might
          choose to use <a href="https://mui.com/components/lists/">Lists</a>{" "}
          and <a href="https://mui.com/components/dividers/">Dividers</a> to
          display your users like so:
        </Typography>
        <List component="nav">
          {this.state.userList.map((user, i) => (
            <ListItemButton
              key = {i}
              href = { "http://localhost:3000/photo-share.html#/users/"+ user._id}
            >
              <ListItemAvatar>
                <Avatar {...this.stringAvatar(user.first_name, user.last_name)} />
              </ListItemAvatar>
              <ListItemText 
                primary = {user.first_name + ' '+ user.last_name}
                secondary = {user.occupation}
              />
            </ListItemButton>
          )) }
        </List>
      </div>
    );
  }
}

export default UserList;
