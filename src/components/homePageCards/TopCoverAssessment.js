import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactMarkdown from "react-markdown";
import Card from "@material-ui/core/Card";
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
    width: 180,
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

export default function TopCoverAssessment() {
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
    return <React.Fragment>Become an Assessor</React.Fragment>;
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
                    At **Nextchamp**, we specialize in providing comprehensive
                    assessments and mock services designed to support both
                    professionals and academic students at all levels of
                    education. Our services cater to individuals seeking to
                    enhance their knowledge, skills, and preparedness for
                    real-world challenges, academic evaluations, and
                    professional certification exams.
                  </ReactMarkdown>
                </Typography>
                <br />
                <Typography variant="h5" color="textSecondary" component="p">
                  <ReactMarkdown>
                    Whether you are a student preparing for exams, an aspiring
                    professional looking to gain a competitive edge, or an
                    organization seeking structured evaluation tools, our
                    meticulously crafted assessments and mock exams ensure you
                    are well-equipped for success.
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
                    We offer:
                    <ReactMarkdown>
                      * **Academic Assessments & Mocks Tests** – Tailored
                      evaluations for students at all educational levels, from
                      primary school to postgraduate studies.
                    </ReactMarkdown>
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      * **Professional Mock Tests** – Simulated exams for
                      various industries and certification programs to help
                      professionals excel in their fields.
                    </ReactMarkdown>
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      * **Customized Testing Solutions** – Personalized
                      assessments designed to meet specific academic or
                      corporate needs.
                    </ReactMarkdown>
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="p">
                    At Nextchamp, we are committed to enhancing learning
                    outcomes, boosting confidence, and refining skills through
                    our expertly designed assessment solutions.
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
                    At **Nextchamp**, we specialize in providing comprehensive
                    assessments and mock services designed to support both
                    professionals and academic students at all levels of
                    education. Our services cater to individuals seeking to
                    enhance their knowledge, skills, and preparedness for
                    real-world challenges, academic evaluations, and
                    professional certification exams.
                  </ReactMarkdown>
                </Typography>
                <br />
                <Typography variant="h5" color="textSecondary" component="p">
                  <ReactMarkdown>
                    Whether you are a student preparing for exams, an aspiring
                    professional looking to gain a competitive edge, or an
                    organization seeking structured evaluation tools, our
                    meticulously crafted assessments and mock exams ensure you
                    are well-equipped for success.
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
                    We offer:
                    <ReactMarkdown>
                      * **Academic Assessments & Mocks Tests** – Tailored
                      evaluations for students at all educational levels, from
                      primary school to postgraduate studies.
                    </ReactMarkdown>
                  </Typography>

                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      * **Professional Mock Tests** – Simulated exams for
                      various industries and certification programs to help
                      professionals excel in their fields.
                    </ReactMarkdown>
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="p">
                    <ReactMarkdown>
                      * **Customized Testing Solutions** – Personalized
                      assessments designed to meet specific academic or
                      corporate needs.
                    </ReactMarkdown>
                  </Typography>
                  <Typography variant="h5" color="textSecondary" component="p">
                    At Nextchamp, we are committed to enhancing learning
                    outcomes, boosting confidence, and refining skills through
                    our expertly designed assessment solutions.
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
