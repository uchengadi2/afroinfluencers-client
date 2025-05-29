import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
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

import ButtonArrow from "./../ui/ButtonArrow";
import UserLogin from "./../users/UserLogin";
import UserSignUp from "./../users/UserSignUp";
import UserPasswordReset from "./../users/UserPasswordReset";
import Bookings from "./../Bookings";
import history from "../../history";
import ProductsForCategory from "./../products/ProductsForCategory";
import ProductDetails from "./../products/ProductDetails";
import api from "./../../apis/local";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";
import CartUpdateAndDeliveryForm from "./CartUpdateAndDeliveryForm";
import AllCourses from "../homePageCards/AllCourses";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: 440,
    height: "100%",
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  media: {
    height: 400,
    // width: 350,
    //height: "100%",
    width: "100%",
    //padding: 20,
  },
  rootMobile: {
    //maxWidth: 600,
    maxWidth: "100%",
    height: "100%",
    //height: 780,
    //width: 400,
    width: "95%",

    marginLeft: "1px",
    //borderRadius: 30,
    marginTop: "-4.0em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    // height: 200,
    // width: 200,
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
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

export default function CartProductCard(props) {
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
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();
  const [price, setPrice] = useState();
  const [minQuantity, setMinQuantity] = useState(1);
  const [influencer, setInfluencer] = useState({});

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

  useEffect(() => {
    //setPrice(props.course.price);
    //setMinQuantity(props.course.minimumQuantity);
  }, [props]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  console.log('props.creator:', props.creator);
  //get the product details
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/creators/${props.creator.id}`);
      const influencer = response.data.data.data;

      allData.push({
        id: influencer._id,
          creator: influencer.creator,
          brand: influencer.brand,
          cartHolder: influencer.cartHolder,
          dateAddedToCart: influencer.dateAddedToCart,
          refNumber: influencer.refNumber,
          quantity: influencer.quantity,
          status: influencer.status,
          agencyServicePlan:influencer.agencyServicePlan,
          project: influencer.project,
          creativeLanguage: influencer.creativeLanguage,
          currency: influencer.currency,
          slug: influencer.slug,
          creatorImage: influencer.creatorImage,
          platforms: influencer.platforms,
          facebookPostQuantity: influencer.facebookPostQuantity,
          instagramPostQuantity: influencer.instagramPostQuantity,
          twitterPostQuantity: influencer.twitterPostQuantity,
          tiktokPostQuantity: influencer.tiktokPostQuantity,
          linkedInPostQuantity: influencer.linkedInPostQuantity,
          blogPostQuantity: influencer.blogPostQuantity,
      });

      if (!allData) {
        return;
      }
      setInfluencer({
        
        id: allData[0]._id,
          creator: allData[0].creator,
          brand: allData[0].brand,
          cartHolder: allData[0].cartHolder,
          dateAddedToCart: allData[0].dateAddedToCart,
          refNumber: allData[0].refNumber,
          quantity: allData[0].quantity,
          status: allData[0].status,
          agencyServicePlan:allData[0].agencyServicePlan,
          project: allData[0].project,
          creativeLanguage: allData[0].creativeLanguage,
          currency: allData[0].currency,
          slug: allData[0].slug,
          creatorImage: allData[0].creatorImage,
          platforms: allData[0].platforms,
          facebookPostQuantity: allData[0].facebookPostQuantity,
          instagramPostQuantity: allData[0].instagramPostQuantity,
          twitterPostQuantity: allData[0].twitterPostQuantity,
          tiktokPostQuantity: allData[0].tiktokPostQuantity,
          linkedInPostQuantity: allData[0].linkedInPostQuantity,
          blogPostQuantity: allData[0].blogPostQuantity,
      });
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  let imageUrl = "";
  if (props.creator) {
    imageUrl = `${baseURL}/images/creators/${props.creator.image}`;
  }

  const Str = require("@supercharge/strings");

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

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
  };

  const handleSuccessfulSignUpDialogOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setAlert({
      open: true,
      message: message,
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
    setOpenSignUpForm(false);
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

  const handleSuccessfulCreateSnackbar = (message) => {
    // history.push("/categories/new");
    // setOpen({ open: false });
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
    //setOpen({ open: false });
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
          <UserLogin
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
        //onClose={() => [setOpenSignUpForm(false), history.push("/")]}
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

  if (!influencer) {
    return <></>;
  }

 
  let facebookCostPerReach = 0;
  let instagramCostPerReach = 0;
  let twitterCostPerReach = 0;
  let tiktokCostPerReach = 0;
  let linkedInCostPerReach = 0;
  let blogCostPerReach = 0;
  if(props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookCostPerPost && props.creator.facebookTotalFollowers){
    facebookCostPerReach = props.creator.facebookCostPerPost/props.creator.facebookTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramCostPerPost && props.creator.instagramTotalFollowers){
    instagramCostPerReach = props.creator.instagramCostPerPost/props.creator.instagramTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterCostPerPost && props.creator.twitterTotalFollowers){
    twitterCostPerReach = props.creator.twitterCostPerPost/props.creator.twitterTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokCostPerPost && props.creator.tiktokTotalFollowers){
    tiktokCostPerReach = props.creator.tiktokCostPerPost/props.creator.tiktokTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedInCostPerPost && props.creator.linkedinTotalFollowers){
    linkedInCostPerReach = props.creator.linkedInCostPerPost/props.creator.linkedinTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogCostPerPost && props.creator.blogTotalVisitorsPerMonth){
    blogCostPerReach = props.creator.blogCostPerPost/props.creator.blogTotalVisitorsPerMonth;
  }


  

  
  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="row">
            <Grid item style={{ width: "26.94%" }}>
              <CardMedia
                className={classes.media}
                component="img"
                alt={props.creator.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
               
                  <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}<scan style={{fontSize:15, fontWeight:500}}>{props.creator.country && ` (${props.creator.country[0].name}, ${props.creator.age}years ${props.creator.gender.charAt(0).toUpperCase() + props.creator.gender.slice(1)})` }</scan>
                  </Typography>
                
               
                
                {props.project && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15, marginTop: 20 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Project:</strong>
                    </span>
                    {props.project.name}
                  </Typography>
                )}
                {props.brand && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Project Owner:</strong>
                    </span>
                    {props.brand.name}
                  </Typography>
                )}
                <Typography variant="h5" style={{ color: "black", fontSize: 15, marginLeft:15, marginTop:10 }}><strong>Selected Platforms for the Campaign</strong></Typography>
               <Typography style={{marginLeft:25}}>
                {props.platforms && props.platforms.map((platform, index)=> (
               
                    <span style={{ marginRight: 10, marginLeft: 5 }} key={index}>
                     {platform},
                    </span>
                    
                    
                
                ))}
                </Typography>
                {props.platforms && props.platforms.includes("facebook") && props.facebookPostQuantity && (
                  <Typography  variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15, marginTop:10 }}><strong>Number of Facebook Post Required</strong>:&nbsp;&nbsp;{props.facebookPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.creator.facebookCostPerPost && props.currency.name.toLowerCase() ==='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.facebookCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.creator.facebookCostPerPost && props.currency.name.toLowerCase() !=='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.facebookCostPerPost.toLocaleString()}</Typography>
                )}
           

                {props.platforms && props.platforms.includes("instagram") && props.instagramPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Instagram Post Required</strong>:&nbsp;&nbsp;{props.instagramPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.creator.instagramCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.instagramCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.creator.instagramCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.instagramCostPerPost.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("twitter") && props.twitterPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Twitter Post Required</strong>:&nbsp;&nbsp;{props.twitterPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.creator.twitterCostPerPost && props.currency.name.toLowerCase() ==='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.twitterCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.creator.twitterCostPerPost && props.currency.name.toLowerCase() !=='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.twitterCostPerPost.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("tiktok") && props.tiktokPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Tiktok Post Required</strong>:&nbsp;&nbsp;{props.tiktokPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.creator.tiktokCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.tiktokCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.creator.tiktokCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.tiktokCostPerPost.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("linkedin") && props.linkedInPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of LinkedIn Post Required</strong>:&nbsp;&nbsp;{props.linkedInPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.creator.linkedInCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.linkedInCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.creator.linkedInCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.linkedInCostPerPost.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("blog") && props.blogPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Blog Post Required</strong>:&nbsp;&nbsp;{props.blogPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.blogCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.blogCostPerPost.toLocaleString()}&nbsp;&nbsp;{props.creator.blogPostCostDuration}</Typography>
                  // <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.blogCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.blogCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.blogCostPerPost.toLocaleString()}&nbsp;&nbsp;{props.creator.blogPostCostDuration}</Typography>
                )}



                <Typography variant="h5" style={{ color: "black", fontSize: 18, marginTop: 20 }}><strong>Social Media Influencer Stats</strong></Typography>

                {props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15, marginTop:10 }}><strong>Facebook Total Followers</strong>:&nbsp;&nbsp;{props.creator.facebookTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Facebook Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.facebookEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{facebookCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{facebookCostPerReach.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Instagram Total Followers</strong>:&nbsp;&nbsp;{props.creator.instagramTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Instagram Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.instagramEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{instagramCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{instagramCostPerReach.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Twitter Total Followers</strong>:&nbsp;&nbsp;{props.creator.twitterTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Twitter Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.twitterEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.currency.name.toLowerCase()==='naira' && (
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{twitterCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.currency.name.toLowerCase()!=='naira' && (
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{twitterCostPerReach.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Tiktok Total Followers</strong>:&nbsp;&nbsp;{props.creator.tiktokTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Tiktok Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.tiktokEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{tiktokCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{tiktokCostPerReach.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedinTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>LinkedIn Total Followers</strong>:&nbsp;&nbsp;{props.creator.linkedinTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedinEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated LinkedIn Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.linkedinEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{linkedInCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{linkedInCostPerReach.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogTotalVisitorsPerMonth &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Blog Average Number Of Visitors Per Month</strong>:&nbsp;&nbsp;{props.creator.blogTotalVisitorsPerMonth.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Blog Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.blogEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{blogCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{blogCostPerReach.toLocaleString()}</Typography>
                )}



                <Typography variant="h5" style={{ color: "black", fontSize: 18, marginTop: 20 }}><strong>Selected Agency Plan</strong></Typography>

               
                {props.agencyServicePlan && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Agency Service Plan</strong>:&nbsp;&nbsp;{props.agencyServicePlan.charAt(0).toUpperCase() + props.agencyServicePlan.slice(1)}</Typography>
                )}
                
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.50%", border: "1px dotted grey" }}>
              {props.creator && (
                <CartUpdateAndDeliveryForm
                  creator={props.creator}
                  platforms={props.platforms}
                  creatorId={props.creator.id}
                  currency={props.currency}
                  cartCounterHandler={props.cartCounterHandler}
                  token={props.token}
                  userId={props.userId}
                  cartId={props.cartId}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  renderCartUpdate={props.renderCartUpdate}
                  renderCartUpdateAfterRemoval={
                    props.renderCartUpdateAfterRemoval
                  }
                />
              )}
            </Grid>
          </Grid>
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="column">
            <Grid item style={{ width: "100%" }}>
              <CardMedia
                className={classes.mediaMobile}
                component="img"
                alt={props.creator.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
               
                  <Typography variant="h4" color="textSecondary" component="p">
                    {props.creator.name}<scan style={{fontSize:15, fontWeight:500}}>{props.creator.country && ` (${props.creator.country[0].name}, ${props.creator.age}years ${props.creator.gender.charAt(0).toUpperCase() + props.creator.gender.slice(1)})` }</scan>
                  </Typography>
                
               
                
                {props.project && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15, marginTop: 20 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Project:</strong>
                    </span>
                    {props.project.name}
                  </Typography>
                )}
                {props.brand && (
                  <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 15 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      {" "}
                      <strong>Project Owner:</strong>
                    </span>
                    {props.brand.name}
                  </Typography>
                )}
                <Typography variant="h5" style={{ color: "black", fontSize: 15, marginLeft:15, marginTop:10 }}><strong>Selected Platforms for the Campaign</strong></Typography>
               <Typography style={{marginLeft:25}}>
                {props.platforms && props.platforms.map((platform, index)=> (
               
                    <span style={{ marginRight: 10, marginLeft: 5 }} key={index}>
                     {platform},
                    </span>
                    
                    
                
                ))}
                </Typography>
                {props.platforms && props.platforms.includes("facebook") && props.facebookPostQuantity && (
                  <Typography  variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15, marginTop:10 }}><strong>Number of Facebook Post Required</strong>:&nbsp;&nbsp;{props.facebookPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.creator.facebookCostPerPost && props.currency.name.toLowerCase() ==='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.facebookCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.creator.facebookCostPerPost && props.currency.name.toLowerCase() !=='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.facebookCostPerPost.toLocaleString()}</Typography>
                )}
           

                {props.platforms && props.platforms.includes("instagram") && props.instagramPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Instagram Post Required</strong>:&nbsp;&nbsp;{props.instagramPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.creator.instagramCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.instagramCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.creator.instagramCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.instagramCostPerPost.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("twitter") && props.twitterPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Twitter Post Required</strong>:&nbsp;&nbsp;{props.twitterPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.creator.twitterCostPerPost && props.currency.name.toLowerCase() ==='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.twitterCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.creator.twitterCostPerPost && props.currency.name.toLowerCase() !=='naira' && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.twitterCostPerPost.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("tiktok") && props.tiktokPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Tiktok Post Required</strong>:&nbsp;&nbsp;{props.tiktokPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.creator.tiktokCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.tiktokCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.creator.tiktokCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.tiktokCostPerPost.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("linkedin") && props.linkedInPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of LinkedIn Post Required</strong>:&nbsp;&nbsp;{props.linkedInPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.creator.linkedInCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.linkedInCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.creator.linkedInCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.creator.linkedInCostPerPost.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("blog") && props.blogPostQuantity && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Number of Blog Post Required</strong>:&nbsp;&nbsp;{props.blogPostQuantity}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.blogCostPerPost && props.currency.name.toLowerCase() ==='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.blogCostPerPost.toLocaleString()}&nbsp;&nbsp;{props.creator.blogPostCostDuration}</Typography>
                  // <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Post</strong>:&nbsp;&nbsp;&#8358;{props.creator.blogCostPerPost.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.blogCostPerPost && props.currency.name.toLowerCase() !=='naira' &&(
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Post</strong>:&nbsp;&nbsp;&#36;{props.blogCostPerPost.toLocaleString()}&nbsp;&nbsp;{props.creator.blogPostCostDuration}</Typography>
                )}



                <Typography variant="h5" style={{ color: "black", fontSize: 18, marginTop: 20 }}><strong>Social Media Influencer Stats</strong></Typography>

                {props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15, marginTop:10 }}><strong>Facebook Total Followers</strong>:&nbsp;&nbsp;{props.creator.facebookTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Facebook Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.facebookEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{facebookCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("facebook") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Facebook Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{facebookCostPerReach.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Instagram Total Followers</strong>:&nbsp;&nbsp;{props.creator.instagramTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Instagram Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.instagramEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{instagramCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("instagram") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Instagram Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{instagramCostPerReach.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Twitter Total Followers</strong>:&nbsp;&nbsp;{props.creator.twitterTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Twitter Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.twitterEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.currency.name.toLowerCase()==='naira' && (
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{twitterCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("twitter") && props.currency.name.toLowerCase()!=='naira' && (
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Twitter Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{twitterCostPerReach.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Tiktok Total Followers</strong>:&nbsp;&nbsp;{props.creator.tiktokTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Tiktok Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.tiktokEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{tiktokCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("tiktok") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Tiktok Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{tiktokCostPerReach.toLocaleString()}</Typography>
                )}


                {props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedinTotalFollowers &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>LinkedIn Total Followers</strong>:&nbsp;&nbsp;{props.creator.linkedinTotalFollowers.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedinEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated LinkedIn Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.linkedinEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{linkedInCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("linkedin") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>LinkedIn Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{linkedInCostPerReach.toLocaleString()}</Typography>
                )}



                {props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogTotalVisitorsPerMonth &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Blog Average Number Of Visitors Per Month</strong>:&nbsp;&nbsp;{props.creator.blogTotalVisitorsPerMonth.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogEngagementRate &&(
                  
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Estmated Blog Engagement Rate:</strong>:&nbsp;&nbsp;{props.creator.blogEngagementRate.toLocaleString()}%</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.currency.name.toLowerCase()==='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{blogCostPerReach.toLocaleString()}</Typography>
                )}
                {props.platforms && props.platforms.includes("blog") && props.currency.name.toLowerCase()!=='naira' &&(
                        
                  <Typography variant="h5" style={{fontSize: 15,marginLeft:15,marginBottom:7 }}><strong>Blog Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{blogCostPerReach.toLocaleString()}</Typography>
                )}



                <Typography variant="h5" style={{ color: "black", fontSize: 18, marginTop: 20 }}><strong>Selected Agency Plan</strong></Typography>

               
                {props.agencyServicePlan && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Agency Service Plan</strong>:&nbsp;&nbsp;{props.agencyServicePlan.charAt(0).toUpperCase() + props.agencyServicePlan.slice(1)}</Typography>
                )}
                
              </CardContent>
            </Grid>

            <Grid item style={{ width: "100%", border: "1px dotted grey" }}>
              {props.creator && (
                <CartUpdateAndDeliveryForm
                   creator={props.creator}
                   platforms={props.platforms}
                  creatorIdId={props.creator.id}
                  currency={props.currency}
                  cartCounterHandler={props.cartCounterHandler}
                  token={props.token}
                  userId={props.userId}
                  cartId={props.cartId}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  renderCartUpdate={props.renderCartUpdate}
                  renderCartUpdateAfterRemoval={
                    props.renderCartUpdateAfterRemoval
                  }
                />
              )}
            </Grid>
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

          <Bookings
            token={props.token}
            userId={props.userId}
            handleBookingsOpenDialogStatus={handleBookingsOpenDialogStatus}
          />
        </DialogContent>
      </Dialog>
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
