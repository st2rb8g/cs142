import React from "react";
import { Typography, Card, Grid, Button} from "@mui/material";
import fetchModel from "../../lib/fetchModelData.js";

import "./styles.css";

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */

function CardItem({title, content}) {
  return (

    <Card sx={{ width: 300, padding: 2 }}>
          <Typography gutterBottom sx={{color:'text.secondary', fontSize:14,}}>
            {title}
          </Typography>
          <Typography variant="h5">
            {content}
          </Typography>
    </Card>
  );
}

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevUserId:'',
      userInfo:'',
    };
    this.getUserInfo = async (userId) => {
      try {
        let userInfo= (await fetchModel("http://localhost:3000/user/" + userId)).data;
        this.setState({ prevUserId:userId, userInfo:userInfo }); 
        this.props.setText(userInfo.first_name + " " + userInfo.last_name);
      } catch (error) {
        console.error(error);
      }
    };
  }

  componentDidMount() {
    this.getUserInfo(this.props.match.params.userId);
  }

  componentDidUpdate() {
    if (this.props.match.params.userId !== this.state.prevUserId) {
      this.getUserInfo(this.props.match.params.userId);
    }
  }

  

  render() {
    
    let userId = this.props.match.params.userId;
    let userInfo = this.state.userInfo;
    if(!userId || userId === ":userId") {
      return (
        <Typography variant="body1">
          This should be the UserDetail view of the PhotoShare app. Since it is
          invoked from React Router the params from the route will be in property
          match. So this should show details of user:
          {this.props.match.params.userId}. You can fetch the model for the user
          from window.cs142models.userModel(userId).
        </Typography>
      );
    }

    

    return (
      <div>
        <Typography variant="h2">
          {userInfo.first_name + ' ' + userInfo.last_name}
          <Button 
            variant="contained" 
            sx={{marginLeft:5}}
            href={"http://localhost:3000/photo-share.html#/photos/" + userInfo._id}
          >
            Photos
          </Button>
        </Typography>
        <br></br>
        <Grid container spacing='5'>
          <Grid item>
            <CardItem
              title = "location"
              content={userInfo.location}
            />
          </Grid>
          
          <Grid item>
            <CardItem
              title = "description"
              content={userInfo.description}
            />
          </Grid>
          
          <Grid item>
            <CardItem
              title = "occupation"
              content={userInfo.occupation}
            />
          </Grid>
        </Grid>
      </div>
      
    );
    
  }
}

export default UserDetail;
