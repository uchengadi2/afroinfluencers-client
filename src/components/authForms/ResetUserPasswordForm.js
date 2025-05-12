import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useDispatch } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { TextField, Typography } from "@material-ui/core";
import background from "./../../logistic_assets/cover_image_1.png";
import history from "./../../history";
import api from "./../../apis/local";
import { CHANGE_OWN_PASSWORD } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10,
    fontSize: "1.1rem",
    backgroundColor: theme.palette.common.blue,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
    [theme.breakpoints.down("sm")]: {
      height: 40,
      width: 225,
    },
  },
  root: {
    maxWidth: 600,
    marginTop: '10em',
    marginLeft:'35em'
  },
  rootMobile: {
    maxWidth: 350,
    marginTop: '10em',
    marginLeft:'1em'
  },
    
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "10em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

const renderTextField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      helperText={label}
      variant="outlined"
      id={input.name}
      fullWidth
      required={true}
      defaultValue={input.value}
      type={type}
      //{...input}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const ResetUserPasswordForm = (props) => {
  const classes = useStyles();
  const params = useParams();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState({
      open: false,
      message: "",
      backgroundColor: "",
    })

  const dispatch = useDispatch();
  
  const resetToken = params.token;

 

  const handleSuccessfulCreateSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };
  

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  const buttonContent = () => {
    return <React.Fragment>Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    // if (!formValues.passwordCurrent) {
    //   props.handleFailedSnackbar(
    //     "Please enter your current password and try again"
    //   );
    //   setLoading(false);
    //   return;
    // }
    if (!formValues.password) {
      handleFailedSnackbar(
        "Please enter your new password and try again"
      );
      setLoading(false);
      return;
    }
    if (!formValues.passwordConfirm) {
      handleFailedSnackbar(
        "Please the confirmed password field cannot be empty"
      );
      setLoading(false);
      return;
    }

    if (formValues.password !== formValues.passwordConfirm) {
      handleFailedSnackbar(
        "Your new Password and the Confirmed Password must be the same"
      );
      setLoading(false);
      return;
    }

    if (formValues) {
      const createForm = async () => {
        //api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/users/resetpassword/${resetToken}`,formValues);
        console.log('response is:',response)

       
        if (response.status === 200) {
        //   const token = {
        //     status: "success",
        //     token: response.data.token,
        //     userId: response.data.data.user.id,
        //   };

        //   props.setToken(token);
        //   //props.setUserId(token);
        //   dispatch({
        //     type: CHANGE_OWN_PASSWORD,
        //     payload: response.data,
        //   });

          handleSuccessfulCreateSnackbar(
            `Your password has been changed successfully. Please login again using the new password!!!`
          );

          history.push("/");
          setLoading(false);
        } else {
          handleFailedSnackbar("It is most likely that this token had expired. Please make a fresh reqest for password reset");

          //props.updateUserInfoHandler();
          setLoading(false);
          //props.handleMakeChangePasswordDialogForm();

          return;
        }
      };
      createForm().catch((err) => {
        console.log("err:", err.message);
        handleFailedSnackbar("It is most likely that this token had expired. Please make a fresh reqest for password reset");
        setLoading(false);

        return;
      });
    }
    //props.handleMakeChangePasswordDialogForm();

    //setLoading(false);
  };

  return (
    <>
      {matchesMD ? (
        <Box className={classes.root}>
          <Grid item container justifyContent="left">
            <FormLabel
              style={{ color: "blue", fontSize: "1.5em" }}
              component="legend"
            >
              <Typography variant="h5">Enter New Password</Typography>
            </FormLabel>
          </Grid>
          <Box
            component="div"
            id="userChangePasswordForm"
            // onSubmit={onSubmit}
            sx={{
              width: 350,
              //height: 340,
            }}
            noValidate
            autoComplete="off"
            // style={{ marginTop: 20 }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: 15 }}
            >
              
              <Grid item>
                <Field
                  label="New Password"
                  id="password"
                  name="password"
                  //value={user.email || ""}
                  type="password"
                  component={renderTextField}
                  style={{ marginTop: 10, width: 340 }}
                />
              </Grid>
              <Grid item>
                <Field
                  label="Confirm Password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  //value={user.email || ""}
                  type="password"
                  component={renderTextField}
                  style={{ marginTop: 10, width: 340 }}
                />
              </Grid>
              <Button
                variant="contained"
                className={classes.sendButton}
                onClick={props.handleSubmit(onSubmit)}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
            </Grid>
          </Box>
        </Box>
      ) : (
        <>
          <Box className={classes.rootMobile}>
            <Grid item container justifyContent="center">
              <FormLabel
                style={{ color: "blue", fontSize: "1.5em" }}
                component="legend"
              >
                <Typography variant="h5">Enter New Password</Typography>
              </FormLabel>
            </Grid>
            <Box
              component="div"
              id="userChangePasswordForm"
              // onSubmit={onSubmit}
              sx={{
                width: 350,
                //height: 340,
              }}
              noValidate
              autoComplete="off"
              // style={{ marginTop: 20 }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ marginTop: 15 }}
              >
                {/* <Grid item>
                  <Field
                    label="Current Password"
                    id="passwordCurrent"
                    name="passwordCurrent"
                    type="password"
                    component={renderTextField}
                    style={{ marginTop: 10, width: 340 }}
                  />
                </Grid> */}
                <Grid item>
                  <Field
                    label="New Password"
                    id="password"
                    name="password"
                    //value={user.email || ""}
                    type="password"
                    component={renderTextField}
                    style={{ marginTop: 10, width: 340 }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    label="Confirm Password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    //value={user.email || ""}
                    type="password"
                    component={renderTextField}
                    style={{ marginTop: 10, width: 340 }}
                  />
                </Grid>
                <Button
                  variant="contained"
                  className={classes.sendButton}
                  onClick={props.handleSubmit(onSubmit)}
                >
                  Submit
                </Button>
              </Grid>
            </Box>
           
          </Box>
        </>
      )}
       <Snackbar
                      open={alert.open}
                      message={alert.message}
                      ContentProps={{
                        style: { backgroundColor: alert.backgroundColor },
                      }}
                      anchorOrigin={{ vertical: "top", horizontal: "center" }}
                      onClose={() => setAlert({ ...alert, open: false })}
                      autoHideDuration={4000}
                    />
    </>
  );
};

const validate = (formValues) => {
  const errors = {};
  let valid;

  if (!formValues.email) {
    errors.email = "Invalid email";
  } else if (
    !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formValues.email)
  ) {
    errors.email = "Invalid email";
  }

  if (!formValues.password) {
    errors.password = "Please enter your password";
  }
  if (!formValues.passwordCurrent) {
    errors.passwordCurrent = "Please enter your current password";
  }
  if (!formValues.passwordConfirm) {
    errors.passwordConfirm = "Please re-enter the new password again";
  }
  return errors;
};

export default reduxForm({
  form: "userChangePasswordForm",
  validate: validate,
})(ResetUserPasswordForm);
