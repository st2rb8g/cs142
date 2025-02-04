import React, { useState, useEffect } from "react";
import {Divider, 
        Card,
        CardHeader,
        CardContent,
        Avatar,
        CardMedia,
        List, ListItem, ListItemAvatar, ListItemButton, ListItemText,
        Box,
        Button} from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */

function PhotoCard({userId, userInfo, photo }){
  
  function stringToColor(string){
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
  }

  function stringAvatar(first_name, last_name){
    function getUpperCase(s) {
      return s ? s.charAt(0).toUpperCase() : "?";
    }

    const name = first_name + last_name;
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: getUpperCase(first_name) + getUpperCase(last_name),
    };
  }

  function routeChange(userid) {
    window.location.href = "http://localhost:3000/photo-share.html#/users/"+ userid;
  }


  const [imgDim, setImgDim] = useState({width:0, height:0});
  useEffect(() => {
    const img = new Image();
    img.src = "images/"+photo.file_name;
    img.onload = () => {
      setImgDim({width:img.width, height:img.height});
    };
  },[]);

  const dateString = photo.date_time;
  const date = new Date(dateString.replace(" ", "T")); 

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long", // "short" -> "Sep", "long" -> "September"
    day: "numeric",
  });

  return (
    <Card sx={{maxHeight:400, overflowY: 'auto', width:imgDim.width }}>
      <CardHeader
        onClick={()=>routeChange(userId)}
        avatar = {<Avatar {...stringAvatar(userInfo.first_name, userInfo.last_name)}/>}
        title = {userInfo.first_name + ' ' + userInfo.last_name}
        subheader = {formattedDate}
        sx = {{
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
      />
      <CardMedia
        sx={{ height: imgDim.height}}
        image = {"images/"+photo.file_name}
      />
      {photo.comments && (
        <CardContent>
          <List>
            {photo.comments.map((comment) => (
              <div key = {comment._id}>
                <ListItem
                  sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'flex-start',
          
                  }}
                >
                  <ListItemButton
                    href = {"http://localhost:3000/photo-share.html#/users/"+comment.user._id}
                  >
                    <ListItemAvatar>
                      <Avatar {...stringAvatar(comment.user.first_name, comment.user.last_name)} />
                    </ListItemAvatar>
                    <ListItemText
                      primary = {comment.user.first_name+' '+comment.user.last_name}
                    />
                  </ListItemButton>
                  <ListItemText>
                    {comment.comment}
                  </ListItemText>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
              
            ))}
          </List>
        </CardContent>
      )}
    </Card>
  );
}
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardIndex:0,
      imgDim:{width:0, height:0},
      prevUserId:'',
      userInfo:'',
      photosOfUser:null,
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

    this.handleNextCard = () => {
      this.setState({cardIndex:this.state.cardIndex+1});
    };

    this.handlePrevCard = () => {
      this.setState({cardIndex:this.state.cardIndex-1});
    };
    
    this.getUserInfo = async (userId) => {
      try {
        let userInfo = (await fetchModel("http://localhost:3000/user/" + userId)).data;
        let photos = (await fetchModel("http://localhost:3000/photosOfUser/" + userId)).data;
        this.setState({ prevUserId:userId, userInfo:userInfo, photosOfUser:photos }); 
        console.log(this.state);
        this.props.setText("Photos of "+userInfo.first_name + " " + userInfo.last_name);
      } catch (error) {
        console.error(error);
      }
    };
  }
  componentDidMount() {
    this.getUserInfo(this.props.match.params.userId);
  }

  componentDidUpdate() {
    if(this.state.prevUserId !== this.props.match.params.userId) {
      this.getUserInfo(this.props.match.params.userId);
    }
  }

  render() {
    const userId = this.props.match.params.userId;
    const userInfo = this.state.userInfo;
    const photos = this.state.photosOfUser;
    if(photos===null) {
      return <div></div>;
    }
    const photo = photos[this.state.cardIndex];

    

    console.log(photos);
    return (
      <div>
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', gap:2}}>
          {(this.state.cardIndex > 0)&&(
            <Button variant = "contained" onClick={this.handlePrevCard}>
              Last Photo
            </Button>
          )}
          <PhotoCard
            userId = {userId}
            userInfo = {userInfo}
            photo = {photo}
          />
          {(this.state.cardIndex < photos.length-1)&&(
            <Button variant = "contained" onClick={this.handleNextCard}>
              Next photo
            </Button>
          )}
        </Box>
      </div>
      


      
    );
  }
}

export default UserPhotos;
