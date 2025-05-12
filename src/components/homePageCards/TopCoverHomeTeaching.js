import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 350,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "1em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "2.5em",
    marginBottom: "0.5em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  instructorsButton: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 400,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  instructorsMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 210,
    marginLeft: 60,
    marginTop: 1,
    marginBottom: 100,
    borderRadius: 50,
    //fontSize: 9,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  mediaMobile: {
    height: "100%",
    width: "100%",
    // marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
    //marginTop: "80px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function TopCoverHomeTeaching() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();
  const [minLearnerSlot, setMinLearnerSlot] = useState(1);

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/courses/${product.imageCover}`;
  }

  const Str = require("@supercharge/strings");

  const instructorSection = () => {
    // return <React.Fragment>Learn More About Instructors</React.Fragment>;
    return <React.Fragment>Become a Private Instructor</React.Fragment>;
  };

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple={true}>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="row">
            <Grid item style={{ width: "48%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                <Typography variant="h5" color="textSecondary" component="p">
                  <ReactMarkdown>
                    At **Nextchamp**, we are committed to providing top-quality
                    private and home tutoring services tailored to meet the
                    unique learning needs of our clients. Whether you are a
                    professional seeking to enhance your skills or a student
                    striving for academic excellence, our expert tutors are here
                    to support your journey.
                  </ReactMarkdown>
                </Typography>
                <br />
                <Typography variant="h5" color="textSecondary" component="p">
                  <ReactMarkdown>
                    Our services cater to learners across all educational tiers,
                    from primary and secondary school students to college and
                    university attendees, as well as working professionals
                    looking to advance in their careers. We offer personalized,
                    one-on-one tutoring designed to enhance comprehension, boost
                    confidence, and achieve outstanding results.
                  </ReactMarkdown>
                </Typography>
              </CardContent>
            </Grid>

            <Grid
              item
              direction="column"
              style={{
                width: "50%",
                marginLeft: "1.7%",
                border: "1px dotted grey",
              }}
            >
              <Grid item>
                <CardContent disableRipple>
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      With a flexible and student-focused approach, we bring
                      expert guidance directly to your home or preferred
                      location, ensuring a comfortable and effective learning
                      experience. Our qualified tutors specialize in various
                      subjects and professional fields, making learning
                      accessible, convenient, and tailored to individual goals.
                    </ReactMarkdown>
                  </Typography>
                  <br />
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      Let Nextchamp help you unlock your full potential with our
                      expert tutoring solutions.
                    </ReactMarkdown>
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "10%", marginLeft: "1.5em" }}
              >
                <Button
                  variant="text"
                  className={classes.instructorsButton}
                  component={"a"}
                  //href="https://www.linkedin.com/company/e-shield-africa/"
                  href="#"
                  rel="noopener noreferrer"
                  target="_self"
                  //onClick={props.handleSubmit(onSubmitToCart)}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    instructorSection()
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="column">
            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                <Typography variant="h5" color="textSecondary" component="p">
                  <ReactMarkdown>
                    At **Nextchamp**, we are committed to providing top-quality
                    private and home tutoring services tailored to meet the
                    unique learning needs of our clients. Whether you are a
                    professional seeking to enhance your skills or a student
                    striving for academic excellence, our expert tutors are here
                    to support your journey.
                  </ReactMarkdown>
                </Typography>
                <br />
                <Typography variant="h5" color="textSecondary" component="p">
                  <ReactMarkdown>
                    Our services cater to learners across all educational tiers,
                    from primary and secondary school students to college and
                    university attendees, as well as working professionals
                    looking to advance in their careers. We offer personalized,
                    one-on-one tutoring designed to enhance comprehension, boost
                    confidence, and achieve outstanding results.
                  </ReactMarkdown>
                </Typography>
              </CardContent>
            </Grid>

            <Grid
              item
              direction="row"
              style={{
                width: "100%",
                marginLeft: "0%",
                marginTop: 10,
                border: "1px dotted grey",
              }}
            >
              <Grid item>
                <CardContent disableRipple>
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      With a flexible and student-focused approach, we bring
                      expert guidance directly to your home or preferred
                      location, ensuring a comfortable and effective learning
                      experience. Our qualified tutors specialize in various
                      subjects and professional fields, making learning
                      accessible, convenient, and tailored to individual goals.
                    </ReactMarkdown>
                  </Typography>
                  <br />
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      Let Nextchamp help you unlock your full potential with our
                      expert tutoring solutions.
                    </ReactMarkdown>
                  </Typography>
                </CardContent>
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "10%", marginLeft: "1.5em" }}
              >
                <Button
                  variant="text"
                  className={classes.instructorsMobileButton}
                  component={"a"}
                  //href="https://www.linkedin.com/company/e-shield-africa/"
                  href="#"
                  rel="noopener noreferrer"
                  target="_self"
                  //onClick={props.handleSubmit(onSubmitToCart)}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    instructorSection()
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>

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
}
