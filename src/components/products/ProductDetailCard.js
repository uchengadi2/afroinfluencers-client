import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";

import { Link } from "react-router-dom";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
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
import Grid from "@material-ui/core/Grid";

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import LoginForm from "../authForms/LoginForm";
import UserSignUp from "./../users/UserSignUp";
import SignUpForm from "../authForms/SignUpForm";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import SendProductToCartForm from "./SendProductToCartForm";
import SendCourseToCheckoutForm from "./SendCourseToCheckoutForm";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import { RoomSharp } from "@material-ui/icons";
import SendCreatorToCheckoutForm from "./SendCreatorToCheckoutForm";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 325,
    maxWidth: "100%",
    //height: 440,
    //height: 500,
    width:'100%',
    
    //marginLeft: "0.1%",
    borderRadius: 0,
    marginTop: "6em",
    padding: 0,
    // "&:hover": {
    //   border: "solid",
    //   borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: 800,
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "-2.00em",
    marginBottom: "3em",
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
    //marginLeft: "100px",
  },
  media: {
    height: 400,
    //width: 400,
    width:"100%"
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
  secondRow: {
    marginLeft: "0",
    //width: 500,
    width:"45%",
    border: "1px dotted",
    padding: 20,
  },
  imageColumn: {
    //marginLeft: 5,
    width: 380,

    border: "1px dotted",
    //padding: 5,
  },
  secondRowMobile: {
    marginLeft: 0,
    marginTop: 50,
    //width: 380,
    width: "100%",
    border: "1px dotted",
    padding: 10,
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  thirdRow: {
    marginLeft: "0.0%",
   // width: 350,
   width:"30%",
    border: "1px dotted",
    padding: 0,
  },
  thirdRowMobile: {
    marginLeft: 10,
    marginTop: 30,
    //width: 380,
    width: "100%",
    border: "1px dotted",
    padding: 20,
  },

  secondColumn: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "22%",
  },
  secondColumnMobile: {
    marginTop: 50,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  thirdColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  thirdColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  forthColumn: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  forthColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  fifthColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  fifthColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  sixthColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  sixthColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  seventhColumn: {
    marginTop: 20,
    marginBottom: 50,
    border: "1px dotted",
    padding: 20,
    width: "98%",
  },
  seventhColumnMobile: {
    marginTop: 15,
    marginBottom: 50,
    border: "1px dotted",
    padding: 10,
    width: "98%",
  },
  videoMedia: {
    height: 400,
    width: "100%",
  },
}));

export default function ProductDetailCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [currencyName, setCurrencyName] = useState();
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [price, setPrice] = useState();
  const [minQuantity, setMinQuantity] = useState();
  const [samplesList, setSamplesList] = useState([]);

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
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

  //const imageUrl = `${baseURL}/images/categories/${props.image}`;
  const imageUrl = `${baseURL}/images/creators/${props.creator.image}`;

  const Str = require("@supercharge/strings");

  // console.log(
  //   "this is description trim:",
  //   Str(props.description).limit(100, "...").get()
  // );

 

  useEffect(() => {
    setPrice(props.creator.price);
    setCurrencyName(props.creator.currency ? props.creator.currency[0].name : "")
  }, [props.creator]);


  

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies/${props.creator.currency}`);
      const item = response.data.data.data;
      //workingData.map((vendor) => {
      allData.push({ name: item.name });
      //});

      
      setCurrencyName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.creator.currency]);


  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/samples`, {
        params:{
          creator:props.creatorId,
          status:"visible",
          isAllowedOnThePlatform:true
        }});
      const workingData = response.data.data.data;
      workingData.map((sample) => {
      allData.push({ refNumber: sample.refNumber, 
        youtubeId:sample.youtubeId, 
        status:sample.status,
        sampleType:sample.sampleType,
        creator:sample.creator,
        isAllowedOnThePlatform:sample.isAllowedOnThePlatform
       });
      });

      
      setSamplesList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.creatorId]);

  

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleBookingsOpenDialogStatus = () => {
    setOpen(false);
  };
  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleLoginDialogCloseStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
  };

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: "You have successfully logged in",
      backgroundColor: "#4BB543",
    });
  };

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    setOpen({ open: false });
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message,
      backgroundColor: "#FF3232",
    });
    setOpen({ open: false });
  };
  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(true);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: "You have successfully signed up",
      backgroundColor: "#4BB543",
    });
  };

 
  const handleFailedSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenSignUpForm(true);
  };

  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };
  const handleMakeOpenForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(true);
    setOpenLoginForm(false);
  };
  const handleMakeCloseForgotPasswordFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenForgotPasswordForm(false);
    setOpenLoginForm(false);
  };
  const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
  };

  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };

  // const handleLogOutDialogOpenStatus = () => {
  //   // history.push("/categories/new");
  //   setOpenLogOut(false);
  // };
  const renderLoginForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openLoginForm}
        //onClose={() => [setOpenLoginForm(false), history.push("/")]}
        onClose={() => [setOpenLoginForm(false)]}
      >
        <DialogContent>
          <LoginForm
            handleLoginDialogOpenStatus={handleLoginDialogOpenStatus}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleLoginDialogCloseStatus={handleLoginDialogCloseStatus}
            handleMakeOpenForgotPasswordFormDialogStatus={
              handleMakeOpenForgotPasswordFormDialogStatus
            }
            handleSuccessfulLoginDialogOpenStatusWithSnackbar={
              handleSuccessfulLoginDialogOpenStatusWithSnackbar
            }
            handleFailedLoginDialogOpenStatusWithSnackbar={
              handleFailedLoginDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderSignUpForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openSignUpForm}
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}\
        onClose={() => [setOpenSignUpForm(false)]}
      >
        <DialogContent>
          <UserSignUp
            token={props.token}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleSuccessfulSignUpDialogOpenStatusWithSnackbar={
              handleSuccessfulSignUpDialogOpenStatusWithSnackbar
            }
            handleFailedSignUpDialogOpenStatusWithSnackbar={
              handleFailedSignUpDialogOpenStatusWithSnackbar
            }
            setToken={props.setToken}
            setUserId={props.setUserId}
          />
        </DialogContent>
      </Dialog>
    );
  };

  const renderForgotPasswordForm = () => {
    return (
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={openForgotPasswordForm}
        //onClose={() => [setOpenForgotPasswordForm(false), history.push("/")]}
        onClose={() => [setOpenForgotPasswordForm(false)]}
      >
        <DialogContent>
          <UserPasswordReset
            token={props.token}
            userId={props.userId}
            handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
            handleMakeCloseSignUpDialogStatus={
              handleMakeCloseSignUpDialogStatus
            }
            handleMakeOpenLoginFormDialogStatus={
              handleMakeOpenLoginFormDialogStatus
            }
            handleMakeCloseForgotPasswordFormDialogStatus={
              handleMakeCloseForgotPasswordFormDialogStatus
            }
          />
        </DialogContent>
      </Dialog>
    );
  };

  const getCurrencyCode = () => {
    if (currencyName) {
      if (currencyName.toLowerCase() === "naira") {
        return <span>&#8358;</span>;
      } else {
        return;
      }
    }
  };

  

  return (
    <>
      {matchesMDUp ? (
        <Grid container direction="column" className={classes.root}>
          <Grid item container direction="row">
            <Grid item style={{width:'25%'}}>
              <Card>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt={props.creator.name}
                  image={imageUrl}
                  //   title={props.name}
                  crossOrigin="anonymous"
                />
              </Card>
            </Grid>
            <Grid item className={classes.secondRow}>
              <Box>
              {props.creator.category[0].code === 'video-and-audio-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.creator.country[0].name}, Video & Jingle Creator,  {props.creator.age} years)</em>
                    </span>
                  </Typography>}
                  {props.creator.category[0].code === 'video-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.creator.country[0].name}, Video Creator,  {props.creator.age} years)</em>
                    </span>
                  </Typography>}
                  {props.creator.category[0].code === 'audio-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.creator.country[0].name}, Jingle Creator,  {props.creator.age} years)</em>
                    </span>
                  </Typography>}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {Str(props.bio).limit(200, "...").get()}
                </Typography>
                {props.creator.category[0].code === 'video-and-audio-creators'  && <Typography
                  variant="h4"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5, marginBottom: 15 }}
                >
                  <span style={{ marginLeft: 30 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.videoPrice
                        ? props.creator.videoPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/per video</span>
                  <span>&</span>
                  <span style={{ marginLeft: 20 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.soundPrice
                        ? props.creator.soundPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/per jingle</span>
                </Typography>}

                {props.creator.category[0].code === 'video-only-creators' && <Typography
                  variant="h4"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5, marginBottom: 15 }}
                >
                  <span style={{ marginLeft: 30 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.videoPrice
                        ? props.creator.videoPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/per video</span>
                  
                </Typography>}

                {props.creator.category[0].code === 'audio-only-creators' && <Typography
                  variant="h4"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5, marginBottom: 15 }}
                >
                   <span style={{ marginLeft: 20 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.soundPrice
                        ? props.creator.soundPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/per jingle</span>
                  
                </Typography>}
                {props.creator.category[0].code === 'video-and-audio-creators' && <Typography
                      style={{ marginTop: 9, color: "red", marginBottom: 15 }}
                    >
                      <span
                        style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                      >
                        {/* <strong>Delivery Method:</strong> &nbsp; */}
                        <span>{"This is the price for the production of a 10 to 40 seconds marketing video or jingle"}</span>
                      </span>
                    </Typography>}
                    {props.creator.category[0].code === 'video-only-creators' && <Typography
                      style={{ marginTop: 9, color: "red", marginBottom: 15 }}
                    >
                      <span
                        style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                      >
                        {/* <strong>Delivery Method:</strong> &nbsp; */}
                        <span>{"This is the price for the production of a 10 to 40 seconds marketing video"}</span>
                      </span>
                    </Typography>}
                    {props.creator.category[0].code === 'audio-only-creators' && <Typography
                      style={{ marginTop: 9, color: "red", marginBottom: 15 }}
                    >
                      <span
                        style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                      >
                        {/* <strong>Delivery Method:</strong> &nbsp; */}
                        <span>{"This is the price for the production of a 10 to 40 seconds marketing jingle"}</span>
                      </span>
                    </Typography>}
               
                
                {(props.creator.category[0].code === 'video-and-audio-creators' || props.creator.category[0].code === 'video-only-creators') && <Typography>
                  
                    <strong style={{marginLeft:10}}> Cost for An Extra Video Hook:</strong>
                    <span style={{ marginLeft: 5 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.videoHookPrice
                        ? props.creator.videoHookPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                    
          
                </Typography>}
                {(props.creator.category[0].code === 'video-and-audio-creators' || props.creator.category[0].code === 'audio-only-creators') && <Typography>
                  
                  <strong style={{marginLeft:10}}> Cost for An Extra Sound Hook:</strong>
                  <span style={{ marginLeft: 5 }}>
                  <strong>
                    {getCurrencyCode()}
                    {props.creator.soundHookPrice
                      ? props.creator.soundHookPrice
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : 0}
                  </strong>
                 
                </span>
                  
        
              </Typography>}
               
                  
                
                {(props.creator.category[0].code === 'video-and-audio-creators' || props.creator.category[0].code === 'video-only-creators') && <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Video Delivery Period:</strong>
                    <span>{props.creator.videoDeliveryDays} days</span>
                  </span>
                </Typography>}
                {(props.creator.category[0].code === 'video-and-audio-creators' || props.creator.category[0].code === 'audio-only-creators') && <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Jingle Delivery Period:</strong>
                    <span>{props.creator.soundDeliveryDays} days</span>
                  </span>
                </Typography>}
                <Typography style={{marginLeft:10}}><strong>Niches:</strong></Typography>
              
               <Grid container direction="row" style={{marginLeft:30}}>
                              {props.creator.niches.map((niche, index) => (
                                <Typography>{niche.niche},  </Typography>

                              ))}
                            </Grid>
                <Typography style={{marginLeft:10}}><strong>Languages:</strong></Typography>
                
                <Grid container direction="row" style={{marginLeft:30}}>
                              {props.creator.languages.map((lang, index) => (
                                <Typography>{lang.language},  </Typography>

                              ))}
                            </Grid>


                <Typography style={{marginTop: 20}}>
                    <span style={{ fontSize: 14, marginLeft: 12, color:"red",  }}>
                      <strong>
                       Note: A hook is the initial 2 to 5 seconds of a video or jingle designed to immediately capture the audience's attention and encourage them to continue watching or listening.
                      </strong>
                     
                    </span>
                  </Typography>
              </Box>
            </Grid>
            <Grid item className={classes.thirdRow}>
              <Box sx={{
                //width: 100,
                //height: 430,
               }}>
                <SendCreatorToCheckoutForm
                  videoPrice={props.creator.videoPrice}
                  videoHookPrice={props.creator.videoHookPrice}
                  creatorId={props.creator.id}
                  soundPrice = {props.creator.soundPrice}
                  soundHookPrice = {props.creator.soundHookPrice}
                  videoDeliveryDays = {props.creator.videoDeliveryDays}
                  soundDeliveryDays = {props.creator.soundDeliveryDays}
                  brandId={props.brandId}
                  brandName={props.brandName}
                   brandCountry={props.brandCountry}
                  categoryName={props.categoryName}
                  categoryCode={props.categoryCode}
                  currency={props.creator.currency}
                  creatord={props.creatorId}
                  creator={props.creator}
                  image={props.creator.image}
                  creatorLanguages={props.creator.languages}
                  token={props.token}
                  userId={props.userId}
                  handleMakeOpenSignUpDialogStatus={
                    handleMakeOpenSignUpDialogStatus
                  }
                  handleMakeCloseSignUpDialogStatus={
                    handleMakeCloseSignUpDialogStatus
                  }
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleMakeCloseForgotPasswordFormDialogStatus={
                    handleMakeCloseForgotPasswordFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  handleFailedSignUpDialogOpenStatusWithSnackbar={
                    handleFailedSignUpDialogOpenStatusWithSnackbar
                  }
                  cartCounterHandler={props.cartCounterHandler}
                />
              </Box>
            </Grid>
          </Grid>
          {samplesList.length >=1 && <Typography style={{marginLeft:'40%',marginTop:20, fontSize:20, fontWeight:700}}>Creator Work Samples</Typography>}
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%", marginTop:50 }}
            justifyContent="center"
          >
          
           <Grid item style={{width:'22.5%'}}><Typography></Typography></Grid>
           <Grid item container direction="row" style={{width:'40%'}}> 
          
           {samplesList.map((sample, index) => (
                  <Grid item style={{width:'100%', marginTop:30}}>
                         <Card>
                             <CardMedia
                                      className={classes.videoMedia}
                                      component="iframe"
                                      alt={'creator sample'}
                                      height="140"
                                      src={`https://www.youtube.com/embed/${sample.youtubeId}`}
                                      allow="autoPlay"
                                      allowfullscreen="allowfullscreen"
                                      controls
                                    />
                  
                              
                              </Card>
                              
                              </Grid>

                              ))}
            
           
            
           
            </Grid>
           <Grid item style={{width:'22.5%', marginLeft:'5%'}}><Typography></Typography></Grid>

           
          </Grid>
          
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
          <Grid item container direction="column">
            <Grid item style={{ width: "100%" }}>
              <Card>
                <CardMedia
                  className={classes.mediaMobile}
                  component="img"
                  alt={props.creator.name}
                  image={imageUrl}
                  //   title={props.name}
                  crossOrigin="anonymous"
                />
              </Card>
            </Grid>
            <Grid item className={classes.secondRowMobile}>
              {props.creator.category && props.creator.country && <Box>
              {props.creator.category[0].code === 'video-and-audio-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.creator.country[0].name}, Video & Jingle Creator,  {props.creator.age} years)</em>
                    </span>
                  </Typography>}
                  {props.creator.category[0].code === 'video-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.creator.country[0].name}, Video Creator,  {props.creator.age} years)</em>
                    </span>
                  </Typography>}
                  {props.creator.category[0].code === 'audio-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}
                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                      <em> ({props.creator.country[0].name}, Jingle Creator,  {props.creator.age} years)</em>
                    </span>
                  </Typography>}
                  <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                >
                  {Str(props.bio).limit(200, "...").get()}
                </Typography>
                {props.creator.category[0].code === 'video-and-audio-creators'  && <Typography
                  variant="h5"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5, marginBottom: 15 }}
                >
                  <span style={{ marginLeft: 0 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.videoPrice
                        ? props.creator.videoPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/video</span>
                  <span>&</span>
                  <span style={{ marginLeft: 10 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.soundPrice
                        ? props.creator.soundPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/jingle</span>
                </Typography>}

                {props.creator.category[0].code === 'video-only-creators' && <Typography
                  variant="h4"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5, marginBottom: 15 }}
                >
                  <span style={{ marginLeft: 30 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.videoPrice
                        ? props.creator.videoPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/per video</span>
                  
                </Typography>}

                {props.creator.category[0].code === 'audio-only-creators' && <Typography
                  variant="h4"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 5, marginBottom: 15 }}
                >
                   <span style={{ marginLeft: 20 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.soundPrice
                        ? props.creator.soundPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                  <span style={{fontSize:12,marginLeft:0}}>/per jingle</span>
                  
                </Typography>}
                {props.creator.category[0].code === 'video-and-audio-creators' && <Typography
                      style={{ marginTop: 9, color: "red", marginBottom: 15 }}
                    >
                      <span
                        style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                      >
                        {/* <strong>Delivery Method:</strong> &nbsp; */}
                        <span>{"This is the price for the production of a 10 to 40 seconds marketing video or jingle"}</span>
                      </span>
                    </Typography>}
                    {props.creator.category[0].code === 'video-only-creators' && <Typography
                      style={{ marginTop: 9, color: "red", marginBottom: 15 }}
                    >
                      <span
                        style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                      >
                        {/* <strong>Delivery Method:</strong> &nbsp; */}
                        <span>{"This is the price for the production of a 10 to 40 seconds marketing video"}</span>
                      </span>
                    </Typography>}
                    {props.creator.category[0].code === 'audio-only-creators' && <Typography
                      style={{ marginTop: 9, color: "red", marginBottom: 15 }}
                    >
                      <span
                        style={{ fontSize: 14, marginLeft: 10, marginTop: 20 }}
                      >
                        {/* <strong>Delivery Method:</strong> &nbsp; */}
                        <span>{"This is the price for the production of a 10 to 40 seconds marketing jingle"}</span>
                      </span>
                    </Typography>}
               
                
                {(props.creator.category[0].code === 'video-and-audio-creators' || props.creator.category[0].code === 'video-only-creators') && <Typography>
                  
                    <strong style={{marginLeft:10}}> Cost for An Extra Video Hook:</strong>
                    <span style={{ marginLeft: 5 }}>
                    <strong>
                      {getCurrencyCode()}
                      {props.creator.videoHookPrice
                        ? props.creator.videoHookPrice
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : 0}
                    </strong>
                   
                  </span>
                    
          
                </Typography>}
                {(props.creator.category[0].code === 'video-and-audio-creators' || props.creator.category[0].code === 'audio-only-creators') && <Typography>
                  
                  <strong style={{marginLeft:10}}> Cost for An Extra Sound Hook:</strong>
                  <span style={{ marginLeft: 5 }}>
                  <strong>
                    {getCurrencyCode()}
                    {props.creator.soundHookPrice
                      ? props.creator.soundHookPrice
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                      : 0}
                  </strong>
                 
                </span>
                  
        
              </Typography>}
               
                  
                
                <Typography>
                  <span style={{ fontSize: 14, marginLeft: 10 }}>
                    <strong> Delivery Period:</strong>
                    <span>{props.creator.videoDeliveryDays} days</span>
                  </span>
                </Typography>
                <Typography style={{marginLeft:10}}><strong>Niches:</strong></Typography>
              
               {props.creator.niches && <Grid container direction="row" style={{marginLeft:30}}>
                              {props.creator.niches.map((niche, index) => (
                                <Typography>{niche.niche},  </Typography>

                              ))}
                            </Grid>}
                <Typography style={{marginLeft:10}}><strong>Languages:</strong></Typography>
                
                {props.creator.languages && <Grid container direction="row" style={{marginLeft:30}}>
                              {props.creator.languages.map((lang, index) => (
                                <Typography>{lang.language},  </Typography>

                              ))}
                            </Grid>}


                <Typography style={{marginTop: 20}}>
                    <span style={{ fontSize: 14, marginLeft: 12, color:"red",  }}>
                      <strong>
                       Note: A hook is the initial 2 to 5 seconds of a video designed to immediately capture the audience's attention and encourage them to continue watching.
                      </strong>
                     
                    </span>
                  </Typography>
              </Box>}
            </Grid>
            <Grid item className={classes.thirdRowMobile}>
              <Box>
                <SendCreatorToCheckoutForm
                   videoPrice={props.creator.videoPrice}
                   videoHookPrice={props.creator.videoHookPrice}
                   creatorId={props.creator.id}
                   soundPrice = {props.creator.soundPrice}
                   soundHookPrice = {props.creator.soundHookPrice}
                   videoDeliveryDays = {props.creator.videoDeliveryDays}
                   soundDeliveryDays = {props.creator.soundDeliveryDays}
                   brandId={props.brandId}
                   brandName={props.brandName}
                    brandCountry={props.brandCountry}
                   categoryName={props.categoryName}
                   categoryCode={props.categoryCode}
                   currency={props.creator.currency}
                   creatord={props.creatorId}
                   creator={props.creator}
                   image={props.creator.image}
                   creatorLanguages={props.creator.languages}
                   token={props.token}
                   userId={props.userId}
                   handleMakeOpenSignUpDialogStatus={
                     handleMakeOpenSignUpDialogStatus
                   }
                   handleMakeCloseSignUpDialogStatus={
                     handleMakeCloseSignUpDialogStatus
                   }
                   handleMakeOpenLoginFormDialogStatus={
                     handleMakeOpenLoginFormDialogStatus
                   }
                   handleMakeCloseForgotPasswordFormDialogStatus={
                     handleMakeCloseForgotPasswordFormDialogStatus
                   }
                   handleSuccessfulCreateSnackbar={
                     props.handleSuccessfulCreateSnackbar
                   }
                   handleFailedSnackbar={props.handleFailedSnackbar}
                   handleFailedSignUpDialogOpenStatusWithSnackbar={
                     handleFailedSignUpDialogOpenStatusWithSnackbar
                   }
                   cartCounterHandler={props.cartCounterHandler}
                />
              </Box>
            </Grid>
          </Grid>
          {samplesList.length >=1 &&<Typography style={{marginLeft:'25%',marginTop:20, fontSize:20, fontWeight:700}}>Creator Work Samples</Typography>}
          <Grid
            item
            container
            direction="row"
            style={{ width: "100%" }}
            justifyContent="center"
          >
            <Grid item style={{width:'7%'}}><Typography></Typography></Grid>
           <Grid item container direction="row" style={{width:'74%'}}> 
          
           {samplesList.map((sample, index) => (
                  <Grid item style={{width:'100%', marginTop:30}}>
                         <Card>
                             <CardMedia
                                      className={classes.videoMedia}
                                      component="iframe"
                                      alt={'creator sample'}
                                      height="140"
                                      src={`https://www.youtube.com/embed/${sample.youtubeId}`}
                                      allow="autoPlay"
                                      allowfullscreen="allowfullscreen"
                                      controls
                                    />
                  
                              
                              </Card>
                              
                              </Grid>

                              ))}
            
           
            
           
            </Grid>
           <Grid item style={{width:'7%', marginLeft:'2%'}}><Typography></Typography></Grid>

           
          
          </Grid>       

         
        </Grid>
      )}
      {renderLoginForm()}
      {renderSignUpForm()}
      {renderForgotPasswordForm()}
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
