import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
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
import LoginForm from "../../authForms/LoginForm";
import UserSignUp from "../../users/UserSignUp";
import UserPasswordReset from "../../users/UserPasswordReset";
import heroSection from "./../../../assets/images/covers/food2.png";
import backgroundDerica from "./../../../assets/images/covers/food2.png";
import backgroundPaint from "./../../../assets/images/covers/delivery.png";
import backgroundBulk from "./../../../assets/images/covers/payment1.png";
import backgroundRetail from "./../../../assets/images/covers/delivery.png";

import backgroundProduct from "./../../../assets/images/covers/aboutus-cover.jpg";
import backgroundGrowth from "./../../../assets/images/covers/channels.jpg";
import backgroundMetrics from "./../../../assets/images/covers/assessment.jpg";
import heroImage from "./../../../assets/images/influencers/cover1.webp";
import InfluencerRecruitmentForm from "../BrandServices/InfluencerRecruitmentForm";

import { baseURL } from "./../../../apis/util";

import theme from "./../../ui/Theme";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        //height: "100%",
        //height: 350,
        width: "100%",
    
        marginLeft: "10px",
        //borderRadius: 30,
        //marginTop: "2em",
        //marginBottom: "1em",
        padding: 0,
        // "&:hover": {
        //   //border: "solid",
        //   //borderColor: theme.palette.common.grey,
        // },
      },
    
      uppercard: {
        maxWidth: "100%",
        height: 900,
        //height: 350,
        width: "100%",
    
        marginLeft: "10px",
        //borderRadius: 30,
        marginTop: "3em",
       // marginBottom: "1em",
        padding: 40,
        backgroundColor:"#FEF3E2"
        // "&:hover": {
        //   //border: "solid",
        //   //borderColor: theme.palette.common.grey,
        // },
      },
      uppercardMobile: {
       maxWidth: "100%",
        height: 630,
        //height: 350,
        width: "100%",
    
        marginLeft: "0px",
        //borderRadius: 30,
        marginTop: "1em",
        marginBottom: "1em",
        padding: 10,
       backgroundColor:"#FEF3E2"
        // "&:hover": {
        //   //border: "solid",
        //   //borderColor: theme.palette.common.grey,
        // },
      },

      
      uppercardsec: {
        maxWidth: "100%",
        height: 950,
        //height: 350,
        width: "100%",
    
        marginLeft: "10px",
        //borderRadius: 30,
        //marginTop: "2em",
        marginBottom: "10em",
        padding: 0,
        // "&:hover": {
        //   //border: "solid",
        //   //borderColor: theme.palette.common.grey,
        // },
      },
      rootMobile: {
        maxWidth: "100%",
        height: 1250,
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
        width: 105,
        marginLeft: 7,
        marginTop: 1,
        marginBottom: 20,
        borderRadius: 100,
        color: "white",
        fontSize: 10,
        backgroundColor: theme.palette.common.orange,
        "&:hover": {
          backgroundColor: theme.palette.common.white,
        },
      },
      actionPlusButton: {
        borderRadius: 10,
        height: 40,
        width: 220,
        marginLeft: 50,
        marginTop: 1,
        marginBottom: 20,
        borderRadius: 100,
        color: "white",
        backgroundColor: theme.palette.common.orange,
        "&:hover": {
          backgroundColor: theme.palette.common.white,
        },
      },
    
      actionPlusMobileButton: {
        borderRadius: 10,
        height: 40,
        width: 130,
        marginLeft: 1,
        marginTop: 1,
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
      heroSection: {
        backgroundImage: `url(${heroSection})`,
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
        backgroundImage: `url(${backgroundPaint})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        //backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "35em",
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
        backgroundImage: `url(${backgroundBulk})`,
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
    
      backgroundProduct: {
        backgroundImage: `url(${backgroundProduct})`,
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
    
      backgroundGrowth: {
        backgroundImage: `url(${backgroundGrowth})`,
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
      heroImage: {
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        //backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "27em",
        width: "50%",
        marginLeft: "8em",
        marginBottom: "0.5em",
        marginTop:"10px",
        marginRight: 0,
        borderRadius: 25,
        [theme.breakpoints.down("md")]: {
          // backgroundImage: `url(${mobileBackground})`,
          backgroundAttachment: "inherit",
        },
      },
      heroImageMobile: {
              backgroundImage: `url(${heroImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              //backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
              height: "15em",
              width: "55%",
              marginLeft: "0px",
              marginBottom: "0.5em",
              marginTop:"10px",
              marginRight: 0,
              borderRadius: 25,
              [theme.breakpoints.down("md")]: {
                // backgroundImage: `url(${mobileBackground})`,
                backgroundAttachment: "inherit",
              },
    },
      button: {
        ...theme.typography.estimate,
        borderRadius: "250px",
        marginLeft: "25%",
        marginTop: "100px",
        marginRight: "150px",
        height: "35px",
        width: "240px",
          marginBottom:100,
    
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
          color: "white",
        },
      },
      buttonMobile: {
        ...theme.typography.estimate,
        borderRadius: "250px",
        marginLeft: "0%",
        marginRight: "0px",
        //height: "35px",
        width: "240px",
        fontSize:11,
        marginTop:40,
      
    
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
          color: "white",
        },
      },
}));

export default function InfluencerRecruitmentWhatWeDoforYou(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  const [openRecruitmentForm, setOpenRecruitmentForm] =useState(false);

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

  const handleLoginDialogOpenStatus = () => {
          // history.push("/categories/new");
          setOpenLoginForm(false);
        };
        const handleLoginDialogCloseStatus = () => {
          // history.push("/categories/new");
          setOpenLoginForm(false);
        };
      
        const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
          // history.push("/categories/new");
      
          setAlert({
            open: true,
            message: message,
            backgroundColor: "#4BB543",
          });
          setOpenLoginForm(false);
          setOpenDrawer(false);
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
      
        const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
          // history.push("/categories/new");
      
          setAlert({
            open: true,
            message: message,
            backgroundColor: "#4BB543",
          });
          setOpenSignUpForm(false);
          setOpenDrawer(false);
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
      
      
      
        // const handleCurrentClick = () => {
        //   ref.current.focus();
        // };
      
        const handleMakeOpenLoginFormDialogStatus = () => {
          // history.push("/categories/new");
          setOpenSignUpForm(false);
          //setOpenCreatorSignUpForm(false);
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
         // setOpenCreatorSignUpForm(false);
        };
      
         
      
        const handleMakeCloseSignUpDialogStatus = () => {
          // history.push("/categories/new");
          setOpenSignUpForm(false);
          //setOpenCreatorSignUpForm(false);
        };
      
 
        const handleSuccessfulForgotPasswordDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");

    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
    setOpenForgotPasswordForm(false);
    setOpenDrawer(false);
  };

  const handleFailedForgotPasswordDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenForgotPasswordForm(false);
  };
          
   const handleOpenRecriutmentFormDialogOpenStatus = () => {
          // history.push("/categories/new");
          setOpenRecruitmentForm(false);
        };
      
      
        const renderRecruitmentForm = () => {
            return (
              <Dialog
                //style={{ zIndex: 1302 }}
                fullScreen={matchesXS}
               open={openRecruitmentForm}
                onClose={() => [setOpenRecruitmentForm(false)]}
              >
                <DialogContent>
                  <InfluencerRecruitmentForm
                    token={props.token}
                    userId={props.userId}
                    brandId={props.brandId}
                    customerEmail={props.customerEmail}
                    customerName={props.customerName}
                    customerPhoneNumber={props.customerPhoneNumber}
                    policy={props.policy}
                    setToken={props.setToken}
                    setUserId={props.setUserId}
                    handleOpenRecriutmentFormDialogOpenStatus={handleOpenRecriutmentFormDialogOpenStatus}
                    // updateUserInfoHandler={updateUserInfoHandler}
                    // handleMakeChangeNameDialogForm={handleMakeChangeNameDialogForm}
                    // handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
                    // handleFailedSnackbar={handleFailedSnackbar}
                    // user={user}
                    handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
                    handleFailedSnackbar={props.handleFailedSnackbar}
                  />
                </DialogContent>
              </Dialog>
            );
          };
      
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
                  // onClose={() => [setOpenSignUpForm(false), history.push("/")]}
                  onClose={() => [setOpenSignUpForm(false)]}
                >
                  <DialogContent>
                    <UserSignUp
                    // {/* <SignUpForm  
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
                  
                      handleLoginDialogOpenStatus={
                        handleLoginDialogOpenStatus
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
                                      handleSuccessfulForgotPasswordDialogOpenStatusWithSnackbar={
                                        handleSuccessfulForgotPasswordDialogOpenStatusWithSnackbar
                                      }
                                      handleFailedForgotPasswordDialogOpenStatusWithSnackbar={
                                        handleFailedForgotPasswordDialogOpenStatusWithSnackbar
                                      }
                                    />
                                  </DialogContent>
                                </Dialog>
                              );
                            };

  const Str = require("@supercharge/strings");

  const keyFeatures = "* **Tailored Influencer Sourcing**: We identify influencers who match your specific requirements, including niche, target audience, demographics, location, brand style, engagement quality, and campaign objectives.\n\n* **Comprehensive Vetting & Verification**: Every influencer we recommend goes through rigorous evaluation, including: * Follower authenticity checks * Engagement quality analysis * Audience demographic insights * Content style and brand-fit review * Reputation and safety screening * Collaboration history (where applicable)   You receive only influencers who are credible and aligned with your goals. \n\n* **Curated Influencer Shortlist**: We deliver a structured list of vetted influencers tailored to your campaign brief — complete with key insights and rationale for each recommendation.\n\n* **Verified Contact Information**: Your team receives accurate, verified contact details for each influencer, ensuring smooth and direct communication.\n\n* **You Manage the Campaign**:Once we deliver the vetted influencers, your team handles outreach, negotiations, content approvals, and overall execution — maintaining full creative and operational control.";
  const armyProcess = "* **Step 1: Register & Verify**: Sign up, verify your identity and social accounts. You’ll be assessed and placed into engagement tiers.\n\n* **Step 2: Browse Campaigns**: Choose from open missions based on your platforms and interests. See required actions and rewards per task.\n\n* **Step 3: Complete Tasks**: Engage with brand content exactly as instructed. The more precise and impactful your action, the higher your reward.\n\n* **Step 4: Get Paid**: Receive rewards directly into your wallet for every verified engagement or delivery.";
      return (
        <>
          {matchesMDUp ? (
            <>
              <Box className={classes.uppercard} disableRipple={true}>
                {/* <Typography variant="h3" style={{marginLeft:"40%", marginBottom:40, width:"100%", fontSize:40, fontWeight:700}}>What We Do for You</Typography> */}
                <Grid
                  container
                  direction="row"
                  style={{ marginTop: 0, height: "100%" }}
                  
                >
                  
                  {/* <Typography variant="h4" style={{marginLeft:'50%',marginBottom:30, fontSize:30, fontWeight:700, color:"black"}}>Airport Protocol Services</Typography> */}
                    <Grid
                      item
                      // alignItems="center"
                      // justifyContent="center"
                      //style={{ height: "60%", marginLeft: "3.5em" }}
                      style={{ height: "90%", marginLeft: "10%", width:"50%", padding:10,marginTop:70  }}
                    >
                     <Typography variant="h3" style={{marginLeft:'30%',marginBottom:30}}>What We Do for You</Typography>
                     {/* <Typography style={{marginTop:0, padding: 0,fontSize:17}}>
                          <strong><ReactMarkdown>Fast-Track Your Arrival. Elevate Your Departure.</ReactMarkdown></strong>
                    </Typography> */}
                      <Typography style={{marginTop:10, fontSize:15}}>
                            <ReactMarkdown>{keyFeatures}</ReactMarkdown>
                      </Typography>
                      {/* <Typography style={{marginTop:30, fontSize:15}}>
                          <ReactMarkdown>From business strategy and process optimization to performance management and organizational development, we deliver insights and frameworks that turn complexity into clarity. With a focus on measurable outcomes, we help you strengthen your competitive position and achieve sustainable excellence.</ReactMarkdown>
                    </Typography> */}
                      {/* <Typography style={{marginTop:30, fontSize:15}}>
                          <em><ReactMarkdown>Skip the lines, avoid delays, and focus on what matters — your business.</ReactMarkdown></em>
                    </Typography> */}
                     {props.token && <Button 
                        variant="contained" 
                        disabled={false}
                        color="secondary" 
                        justifyContent="center" 
                        className={classes.button}
                        onClick={() => [setOpenRecruitmentForm(true)]}
                    
                    >
                        Request Your Influencer Shortlist
                    </Button>}
                    {!props.token && <Button 
                        variant="contained" 
                        disabled={false}
                        color="secondary" 
                        justifyContent="center" 
                        className={classes.button}
                        onClick={() => [setOpenLoginForm(true)]}
                    
                    >
                        Request Your Influencer Shortlist
                    </Button>}
                    </Grid>
                    <Grid
                    container
                    direction="row"
                    className={classes.heroImage}
                    style={{ marginLeft: 20, width: "30%", marginTop: 100, marginBottom:100 }}
                    alignItems="center"
                    
                    justifyContent={matchesSM ? "center" : "space-between"}
                    //direction={matchesSM ? "column" : "row"}
                    item
                  >
                    {/* <Typography variant="h5" style={{marginLeft:"30%", marginBottom:20, width:"60%"}}>Our Process</Typography> */}
                    
                  </Grid>
                   
                    
                  
                 
                </Grid>
                {renderRecruitmentForm()}
              {renderLoginForm()}
              {renderSignUpForm()}
               {renderForgotPasswordForm()}
               
              </Box>
            </>
          ) : (
            <Box className={classes.uppercardMobile} disableRipple>
                {/* <Typography variant="h4" style={{marginLeft:'40%',marginBottom:10}}>Our Brand Services</Typography> */}
                    <Grid
                            container
                            direction="column"
                            style={{ marginTop: 20, height: "100%" }}
                            
                          >
                            <Grid
                              container
                              direction="row"
                              style={{ marginLeft: 3, width: "30%", marginTop: 0 }}
                              alignItems="center"
                              className={classes.heroImageMobile}
                              justifyContent={matchesSM ? "center" : "space-between"}
                              //direction={matchesSM ? "column" : "row"}
                              item
                            >
                              {/* <Typography variant="h5" style={{marginLeft:"30%", marginBottom:20, width:"60%"}}>Our Process</Typography> */}
                              
                            </Grid>
                            {/* <Typography style={{marginTop:0, padding: 70}}>
                                      <ReactMarkdown>{whatwedoSection}</ReactMarkdown>
                                </Typography> */}
                              <Grid
                                item
                                // alignItems="center"
                                // justifyContent="center"
                                //style={{ height: "60%", marginLeft: "3.5em" }}
                                style={{ height: "90%", marginLeft: "2%", width:"70%", padding:2, marginRight:"10%"  }}
                              >
                               <Typography variant="h5" style={{marginLeft:'0%',marginBottom:30, fontWeight:700}}>What We Do for You</Typography>
                              {/* <Typography style={{marginTop:0, padding: 0,fontSize:10}}>
                                  <strong><ReactMarkdown>Fast-Track Your Arrival. Elevate Your Departure.</ReactMarkdown></strong>
                              </Typography> */}
                                <Typography style={{marginTop:10, fontSize:10}}>
                                <ReactMarkdown>{keyFeatures}</ReactMarkdown>
                              </Typography>
                              {/* <Typography style={{marginTop:30, fontSize:10}}>
                                <ReactMarkdown>From business strategy and process optimization to performance management and organizational development, we deliver insights and frameworks that turn complexity into clarity. With a focus on measurable outcomes, we help you strengthen your competitive position and achieve sustainable excellence.</ReactMarkdown>
                              </Typography> */}
                               {/* <Typography style={{marginTop:30, fontSize:10}}>
                                <em><ReactMarkdown>Skip the lines, avoid delays, and focus on what matters — your business.</ReactMarkdown></em>
                              </Typography> */}
                              {props.token && <Button 
                                variant="contained"
                                color="secondary" 
                                 disabled={false}
                                justifyContent="center" 
                                className={classes.buttonMobile}
                                 onClick={() => [setOpenRecruitmentForm(true)]}
                    
                          >
                              Request Your Influencer Shortlist
                          </Button>}
                          {!props.token && <Button 
                                variant="contained"
                                color="secondary" 
                                 disabled={false}
                                justifyContent="center" 
                                className={classes.buttonMobile}
                                 onClick={() => [setOpenLoginForm(true)]}
                    
                          >
                              Request Your Influencer Shortlist
                          </Button>}
                      </Grid>
                              
                            
                           
                          </Grid>
                           {renderRecruitmentForm()}
                          {renderLoginForm()}
                          {renderSignUpForm()}
                           {renderForgotPasswordForm()}
                      </Box>
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
