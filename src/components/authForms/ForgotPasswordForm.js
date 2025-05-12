import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
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
import SignUpForm from "./SignUpForm";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  sendButton: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 50,
    width: 140,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    // fontSize: "1.25rem",
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
  sendButtonMobile: {
    ...theme.typography.estimate,
    borderRadius: 10,
    height: 50,
    width: 140,
    marginLeft: '28%',
    marginTop: 10,
    marginBottom: 10,
    // fontSize: "1.25rem",
    backgroundColor: theme.palette.common.blue,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
    [theme.breakpoints.down("sm")]: {
      height: 50,
      width: 140,
    },
  },
  root: {
    maxWidth: 600,
  },
  rootMobile: {
    maxWidth: 350,
    marginTop: 150,
    padding: 10,
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
      // helperText="Email"

      variant="outlined"
      placeholder={label}
      // label={label}
      defaultValue={input.value}
      id={input.name}
      fullWidth
      type={type}
      //{...input}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const ForgotPasswordForm = (props) => {
  const classes = useStyles();

  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHelper, setPasswordHelper] = useState("");
  const [islogged, setIsLogged] = useState(false);

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginDialogOpenStatus = () => {
    props.handleLoginDialogOpenStatus();
  };


  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

    const buttonContent = () => {
      return <React.Fragment>Reset Password</React.Fragment>;
    };

  const onSubmit = (formValues) => {
    //props.onSubmit(formValues);
    setLoading(false);

    if (!validateEmail(formValues["email"])) {
      props.handleFailedForgotPasswordDialogOpenStatusWithSnackbar(
        "You just entered an invalid email address. Please correct it and try again"
      );
      setLoading(false);

      return;
    }

    const email = formValues.email;
     if (formValues) {
          const createForm = async () => {
            // api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
            const response = await api.post(`/users/forgotpassword/`,{
              email
            });
                
            if (response.status === 200) {
             
        
              props.handleSuccessfulForgotPasswordDialogOpenStatusWithSnackbar(
                `If an account is associated with the provided email address, a password reset link has been sent. Please check your email.`
              );
              //props.onSubmit(response.data.token);
              props.handleMakeCloseForgotPasswordFormDialogStatus();
    
              setLoading(false);
              return
            }else {
              props.handleFailedForgotPasswordDialogOpenStatusWithSnackbar(
                "If an account is associated with the provided email address, a password reset link has been sent. Please check your email."
              );
              setLoading(false);
    
              return;
            }
          };
          createForm().catch((err) => {
            
            // console.log("err:", err.message);
            props.handleFailedForgotPasswordDialogOpenStatusWithSnackbar(
              "If an account is associated with the provided email address, a password reset link has been sent. Please check your email."
            );
            props.handleMakeCloseForgotPasswordFormDialogStatus();
            setLoading(false);
    
            return;
          });
        }
    
        setLoading(true);

  };

  return (
    <>
      {matchesMD ? (
        <Box className={classes.root}>
          <Grid item container justifyContent="center">
            <FormLabel
              style={{ color: "blue", fontSize: "1.5em" }}
              component="legend"
            >
              {/* New Route Details */}
            </FormLabel>
          </Grid>
          <Box
            component="form"
            id="ForgotPasswordForm"
            // onSubmit={onSubmit}
            sx={{
              width: 520,
              height: 140,
            }}
            noValidate
            autoComplete="off"
            // style={{ marginTop: 20 }}
          >
            <Grid container direction="row">
              <Grid item style={{ wdith: "70%" }}>
                <Field
                  label="Enter your registered email address"
                  id="email"
                  name="email"
                  type="text"
                  component={renderTextField}
                  style={{ marginTop: 10, width: 360 }}
                />
              </Grid>
              <Grid item style={{ wdith: "25%" }}>
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
            </Grid>
          </Box>
          {/* </form> */}
        </Box>
      ) : (
        <>
          <Box className={classes.rootMobile}>
            <Grid item container justifyContent="center">
              <FormLabel
                style={{ color: "blue", fontSize: "1.5em" }}
                component="legend"
              >
                {/* New Route Details */}
              </FormLabel>
            </Grid>
            <Box
              component="form"
              id="ForgotPasswordForm"
              // onSubmit={onSubmit}
              sx={{
                width: 350,
                //height: 140,
              }}
              noValidate
              autoComplete="off"
              // style={{ marginTop: 20 }}
            >
              <Grid container direction="column">
                <Grid item style={{ wdith: "90%" }}>
                  <Field
                    label="Enter your registered email address"
                    id="email"
                    name="email"
                    type="text"
                    component={renderTextField}
                    style={{ marginTop: 10 }}
                  />
                </Grid>
                {/* <Grid item style={{ wdith: "35%" }}> */}
                <Grid item >
                  <Button
                    variant="contained"
                    className={classes.sendButtonMobile}
                    onClick={props.handleSubmit(onSubmit)}
                  >
                    {loading ? (
                                  <CircularProgress size={30} color="inherit" />
                                ) : (
                                  buttonContent()
                                )}
                  </Button>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item style={{ wdith: "100%" }}>
                  <Button
                    variant="text"
                    onClick={() => [
                      props.handleMakeCloseForgotPasswordFormDialogStatus(),
                      history.push("/"),
                    ]}
                  >
                    <span style={{ fontSize: 10, marginRight: 50 }}>
                      Cancel
                    </span>
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {/* </form> */}
          </Box>
        </>
      )}
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

  return errors;
};

export default reduxForm({
  form: "ForgotPasswordForm",
  validate: validate,
})(ForgotPasswordForm);
