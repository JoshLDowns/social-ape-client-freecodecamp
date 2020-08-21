import React, { Fragment } from 'react';
import NoImg from "../images/no-image.png";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI stuff
import Paper from "@material-ui/core/Paper";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const styles = theme => ({
  ...theme.spreadIt,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto"
  },
  fullLine: {
    height: 15,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    margin: "0 auto 10px auto"
  }
})


const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-image"/>
          </div>
          <hr/>
          <div className="profile-details">
            <div className={classes.handle}/>
            <hr/>
            <div className={classes.fullLine} />
            <div className={classes.fullLine} />
            <hr/>
            <LocationOn color="secondary"/><span>Location</span>
            <hr/>
            <LinkIcon color="secondary"/>website.com
            <hr/>
            <CalendarToday color="secondary" /> Joined date
          </div>
        </div>
      </Paper>
      
    </div>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
