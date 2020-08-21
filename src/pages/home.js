import React, { Component } from "react";
import PropTypes from "prop-types";
import Scream from "../components/scream/Scream.js";
import Profile from "../components/profile/Profile.js";
import ScreamSkeleton from "../util/ScreamSkeleton.js";

//MUI stuff
import Grid from "@material-ui/core/Grid";

//Redux stuff
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions.js";

export class Home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton/>
    );
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            {recentScreamsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreams })(Home);
