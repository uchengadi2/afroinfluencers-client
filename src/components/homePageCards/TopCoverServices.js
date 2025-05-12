import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
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
import backgroundChannels from "./../../assets/images/covers/channels.png";
import backgroundProgrammes from "./../../assets/images/covers/programmes.png";
import backgroundNuggets from "./../../assets/images/covers/nuggets.png";
import backgroundRetail from "./../../assets/images/covers/delivery.png";
import Channels from "../Channels";
import Programmes from "../Programmes";
import Nuggets from "../Nuggets";

import { baseURL } from "../../apis/util";

import theme from "../ui/Theme";
import { PropaneSharp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    height: 530,
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
    height: 690,
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
  channelsButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 100,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  channelsMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 5,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 100,
    fontSize: 9,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  programmesButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 100,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  programmesMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 5,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 100,
    fontSize: 9,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  nuggetsButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 100,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  nuggetsMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 5,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    fontSize: 9,
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
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
  actionButton: {
    borderRadius: 10,
    height: 40,
    width: 180,
    marginLeft: 80,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  actionWholesaleButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  backgroundDerica: {
    backgroundImage: `url(${backgroundChannels})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  backgroundPaint: {
    backgroundImage: `url(${backgroundProgrammes})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  backgroundBulk: {
    backgroundImage: `url(${backgroundNuggets})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  backgroundRetail: {
    backgroundImage: `url(${backgroundRetail})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function TopCoverServices(props) {
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

  const channelsSection = () => {
    return <React.Fragment>Show Channels</React.Fragment>;
  };
  const programmesSection = () => {
    return <React.Fragment>Show Programmes</React.Fragment>;
  };
  const nuggetsSection = () => {
    return <React.Fragment>Show Nuggets</React.Fragment>;
  };
  const channelsMobileSection = () => {
    return <React.Fragment>Show Channels</React.Fragment>;
  };
  const programmesMobileSection = () => {
    return <React.Fragment>Show Programmes</React.Fragment>;
  };
  const nuggetsMobileSection = () => {
    return <React.Fragment>Show Nuggets</React.Fragment>;
  };

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple={true}>
          {/** place the grid here */}

          <Grid
            container
            direction="row"
            style={{ marginTop: 20, height: "100%" }}
          >
            <Grid
              container
              direction="column"
              style={{ marginLeft: 20, width: "30%", marginTop: 0 }}
            >
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundDerica}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "45%", marginLeft: "3.5em" }}
              >
                <Typography>
                  At Nextchamp, Channels are the foundation for organizing and
                  delivering impactful learning experiences. Each Channel is a
                  dedicated space where related programs, courses, and resources
                  are curated to provide a focused and structured learning
                  journey. Designed to align with specific industries, skills,
                  or topics, Channels allow learners, mentors, and instructors
                  to collaborate effectively within a unified theme.
                </Typography>
                <br />
                {/* <Typography style={{ marginTop: 0 }}>
                  Join Nextchamp today and turn your expertise into a legacy.
                  Let’s create champions together
                </Typography> */}
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "10%", marginLeft: "1.5em" }}
              >
                <Button
                  // component={Link}
                  // // to="/mobileapps"
                  // // to={`/categories/${categoryId}/${productId}`}
                  // to={`/channels`}
                  // varaint="outlined"
                  // className={classes.channelsButton}
                  // onClick={() => <Channels />}
                  variant="text"
                  className={classes.channelsButton}
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
                    channelsSection()
                  )}
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              style={{ marginLeft: 20, width: "30%", marginTop: 0 }}
            >
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundPaint}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "45%", marginLeft: "3.5em" }}
              >
                <Typography>
                  On Nextchamp, Programmes are designed to bring structure and
                  focus to the learning experience by organizing related courses
                  into cohesive, goal-driven learning tracks. Each Programme is
                  a comprehensive roadmap that guides learners through
                  progressive stages of skill development, ensuring a logical
                  flow of knowledge and building expertise step-by-step.
                </Typography>
                <br />
                {/* <Typography style={{ marginTop: 0 }}>
                  Join us in creating impactful learning experiences that
                  transform potential into proven expertise while advancing
                  performance, quality, and innovation.
                </Typography> */}
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "10%", marginLeft: "1.5em" }}
              >
                <Button
                  variant="text"
                  className={classes.programmesButton}
                  component={Link}
                  // to="/mobileapps"
                  // to={`/categories/${categoryId}/${productId}`}
                  to={`/programmes`}
                  varaint="outlined"
                  onClick={() => <Programmes />}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    programmesSection()
                  )}
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              style={{ marginLeft: 20, width: "30%", marginTop: 0 }}
            >
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundBulk}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "45%", marginLeft: "3.5em" }}
              >
                <Typography>
                  On Nextchamp, we offer Nuggets—short, focused courses designed
                  to address specific challenges or problem cases. Ranging from
                  5 to 60 minutes, Nuggets provide concise, on-demand knowledge
                  that allows users to quickly gain practical insights and
                  proffer immediate solutions. Think of Nuggets as your go-to
                  resource for quick, actionable learning whenever you need it.
                </Typography>
                <br />
                {/* <Typography style={{ marginTop: 0 }}>
                  Join us to shape the next generation of champions and drive
                  the future of learning and leadership.
                </Typography> */}
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "10%", marginLeft: "1.5em" }}
              >
                <Button
                  variant="text"
                  className={classes.nuggetsButton}
                  component={Link}
                  // to="/mobileapps"
                  // to={`/categories/${categoryId}/${productId}`}
                  to={`/nuggets`}
                  varaint="outlined"
                  onClick={() => <Nuggets />}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    nuggetsSection()
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <Grid
            container
            direction="row"
            style={{ marginTop: 15, height: 380 }}
          >
            <Grid
              container
              direction="column"
              style={{ marginLeft: 10, width: "30%", marginTop: 0 }}
            >
              <CardActionArea></CardActionArea>
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundDerica}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "17%", marginTop: 0, marginLeft: 10 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "50%", marginLeft: 10, marginBottom: 25 }}
              >
                <Typography style={{ fontSize: 11 }}>
                  At Nextchamp, Channels are the foundation for organizing and
                  delivering impactful learning experiences. Each Channel is a
                  dedicated space where related programs, courses, and resources
                  are curated to provide a focused and structured learning
                  journey. Designed to align with specific industries, skills,
                  or topics, Channels allow learners, mentors, and instructors
                  to collaborate effectively within a unified theme.
                </Typography>
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "17%", marginLeft: "1.5em", marginTop: 40 }}
              >
                <Button
                  // variant="text"
                  // className={classes.channelsMobileButton}
                  // component={Link}
                  // // to="/mobileapps"
                  // // to={`/categories/${categoryId}/${productId}`}
                  // to={`/channels`}
                  // varaint="outlined"
                  // onClick={() => <Channels />}
                  variant="text"
                  className={classes.channelsMobileButton}
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
                    channelsMobileSection()
                  )}
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              style={{ marginLeft: 0, width: "30%", marginTop: 0 }}
            >
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundPaint}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "17%", marginTop: 0, marginLeft: 20 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "50%", marginLeft: 25, marginBottom: 25 }}
              >
                <Typography style={{ fontSize: 11 }}>
                  On Nextchamp, Programmes are designed to bring structure and
                  focus to the learning experience by organizing related courses
                  into cohesive, goal-driven learning tracks. Each Programme is
                  a comprehensive roadmap that guides learners through
                  progressive stages of skill development, ensuring a logical
                  flow of knowledge and building expertise step-by-step.
                </Typography>
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "17%", marginLeft: "1.5em", marginTop: 40 }}
              >
                <Button
                  variant="text"
                  className={classes.programmesMobileButton}
                  component={Link}
                  // to="/mobileapps"
                  // to={`/categories/${categoryId}/${productId}`}
                  to={`/programmes`}
                  varaint="outlined"
                  onClick={() => <Programmes />}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    programmesMobileSection()
                  )}
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              direction="column"
              style={{ marginLeft: 0, width: "30%", marginTop: 0 }}
            >
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundBulk}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "17%", marginTop: 0, marginLeft: 20 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "50%", marginLeft: 25, marginBottom: 25 }}
              >
                <Typography style={{ fontSize: 11 }}>
                  On Nextchamp, we offer Nuggets—short, focused courses designed
                  to address specific challenges or problem cases. Ranging from
                  5 to 60 minutes, Nuggets provide concise, on-demand knowledge
                  that allows users to quickly gain practical insights and
                  proffer immediate solutions. Think of Nuggets as your go-to
                  resource for quick, actionable learning whenever you need it.
                </Typography>
              </Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "17%", marginLeft: "1.5em", marginTop: 30 }}
              >
                <Button
                  variant="text"
                  className={classes.nuggetsMobileButton}
                  component={Link}
                  // to="/mobileapps"
                  // to={`/categories/${categoryId}/${productId}`}
                  to={`/nuggets`}
                  varaint="outlined"
                  onClick={() => <Nuggets />}
                >
                  {isLoading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    nuggetsMobileSection()
                  )}
                </Button>
              </Grid>
            </Grid>
            {/* <Grid
              container
              direction="column"
              style={{ marginLeft: 0, width: "22%", marginTop: 0 }}
            ></Grid> */}
          </Grid>
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
