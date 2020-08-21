import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton.js";

//Redux stuff
import { connect } from "react-redux";
import { editUserSettings } from "../../redux/actions/dataActions.js";

//MUI stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

//MUI Icons
import SettingsIcon from "@material-ui/icons/Settings";

const styles = (theme) => ({
  ...theme.spreadIt,
  button: {
    float: "right",
    zIndex: "10",
  },
});

export class UserSettings extends Component {
  state = {
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    errors: {},
    disable: false,
    open: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ email: "", newPassword: "", confirmNewPassword: "", errors:{} });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmitEmail = () => {
    const userEmail = {
      type: "email",
      body: this.state.email,
    };
    this.props.editUserSettings(userEmail);
  };

  handleSubmitPassword = () => {
    const userPassword = {
      type: "newPassword",
      body: [this.state.newPassword, this.state.confirmNewPassword],
    };
    this.props.editUserSettings(userPassword);
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      email: credentials.email ? credentials.email : "",
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <MyButton
          tip="User Settings"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <SettingsIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Update Email / Password</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="email"
                type="email"
                label="Update Email"
                className={classes.textField}
                error={errors.email ? true : false}
                helperText={errors.email}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                disabled={this.state.disable}
                variant="outlined"
                onClick={this.handleSubmitEmail}
                color="secondary"
              >
                Submit New Email
              </Button>
              <TextField
                name="newPassword"
                type="text"
                label="Update Password"
                error={errors.password ? true : false}
                helperText={errors.password}
                className={classes.textField}
                value={this.state.newPassword}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="confirmNewPassword"
                type="text"
                label="Confirm Updated Password"
                error={errors.password ? true : false}
                helperText={errors.password}
                className={classes.textField}
                value={this.state.confirmNewPassword}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                disabled={this.state.disable}
                variant="outlined"
                onClick={this.handleSubmitPassword}
                color="secondary"
              >
                Submit New Password
              </Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={this.handleClose}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

UserSettings.propTypes = {
  editUserSettings: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, { editUserSettings })(
  withStyles(styles)(UserSettings)
);
