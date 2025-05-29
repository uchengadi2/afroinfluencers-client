import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { PaystackButton } from "react-paystack";
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
import CheckoutActionPage from "./CheckoutActionPage";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: 440,
    height: "100%",
    width: "100%",

    marginLeft: "3px",
    //borderRadius: 30,
    marginTop: "3.5em",
    marginBottom: "3em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    // maxWidth: 600,
    maxWidth: 350,
    height: "100%",
    //height: 545,
    //width: 400,
    width: "97%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "-1.0em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    //height: 200,
    height: "100%",
    //width: 200,
    width: "100%",
    //marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
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

export default function CheckoutCard(props) {
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
  const [creator, setCreator] = useState({});
  const [course, setCourse] = useState({});

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
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
      setCreator({
       
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

  const handleSuccessfulLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
    setAlert({
      open: true,
      message: "You have successfully logged in",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedLoginDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not logged you in. Please ensure your login credentials are correct",
      backgroundColor: "#FF3232",
    });
    setOpenLoginForm(false);
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

  const handleFailedSignUpDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message:
        "Could not sign you up. Please ensure you are connected to the internet and all required fields are completed",
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

  if (!props.creator) {
    return <></>;
  }

   //calculating total reach
  let totalReach =0;
  if(props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookTotalFollowers){
  totalReach += props.creator.facebookTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramTotalFollowers){
  totalReach += props.creator.instagramTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterTotalFollowers){
  totalReach += props.creator.twitterTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokTotalFollowers){
  totalReach += props.creator.tiktokTotalFollowers;
  }
  if(props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogTotalVisitorsPerMonth){ 
  totalReach += props.creator.blogTotalVisitorsPerMonth;
  }
  if(props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedInTotalFollowers){
  totalReach += props.creator.linkedInTotalFollowers;
  }

  //computing the average engagement rate
  let averageEngagementRate = 0;
  let totalEngagementRate = 0;
  if(props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookEngagementRate){
  totalEngagementRate += props.creator.facebookEngagementRate;
  }
  if(props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagramEngagementRate){
  totalEngagementRate += props.creator.instagramEngagementRate;
  }
  if(props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twitterEngagementRate){
  totalEngagementRate += props.creator.twitterEngagementRate;
  }
  if(props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokEngagementRate){
  totalEngagementRate += props.creator.tiktokEngagementRate;
  }
  // if(props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogEngagementRate){
  // totalEngagementRate += props.creator.blogEngagementRate;
  // }
  if(props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedInEngagementRate){
  totalEngagementRate += props.creator.linkedInEngagementRate;
  }

  if(props.platforms && props.platforms.length > 0){
  averageEngagementRate = totalEngagementRate / props.platforms.length;
  }


  //computing the total cost per post
  let totalCostPerPost = 0;
  if(props.platforms && props.platforms.includes("facebook") && props.creator && props.creator.facebookCostPerPost){
      totalCostPerPost += props.creator.facebookCostPerPost;
  }
  if(props.platforms && props.platforms.includes("instagram") && props.creator && props.creator.instagranCostPerPost){
      totalCostPerPost += props.creator.instagranCostPerPost;
  }
  if(props.platforms && props.platforms.includes("twitter") && props.creator && props.creator.twiiterCostPerPost){
      totalCostPerPost += props.creator.twiiterCostPerPost;
  }
  if(props.platforms && props.platforms.includes("tiktok") && props.creator && props.creator.tiktokCostPerPost){
      totalCostPerPost += props.creator.tiktokCostPerPost;
  }
  if(props.platforms && props.platforms.includes("blog") && props.creator && props.creator.blogCostPerPost){
      totalCostPerPost += props.creator.blogCostPerPost;
  }
  if(props.platforms && props.platforms.includes("linkedin") && props.creator && props.creator.linkedInCostPerPost){
      totalCostPerPost += props.creator.linkedInCostPerPost;
  }
  //computing the average cost per reach
  let averageCostPerReach = 0;
  if(totalReach > 0){
  averageCostPerReach = (totalCostPerPost / totalReach);
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

                     <Typography variant="h5" style={{ color: "black", fontSize: 16, marginTop: 20, marginBottom:0 }}><strong>Influencer's Cumulative Stats In Summary</strong></Typography>
                     <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Total Reach</strong>:&nbsp;&nbsp;{totalReach.toLocaleString()}</Typography>
                    <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Engagement Rate</strong>:&nbsp;&nbsp;{averageEngagementRate.toLocaleString()}%</Typography>
                    {props.currency.name.toLowerCase()==='naira' && <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{averageCostPerReach.toLocaleString()}</Typography>}
                    {props.currency.name.toLowerCase()!=='naira' && <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{averageCostPerReach.toLocaleString()}</Typography>}               
                
                    <Typography variant="h5" style={{ color: "black", fontSize: 18, marginTop: 20 }}><strong>Selected Agency Plan</strong></Typography>
                   {props.agencyServicePlan && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Agency Service Plan</strong>:&nbsp;&nbsp;{props.agencyServicePlan.charAt(0).toUpperCase() + props.agencyServicePlan.slice(1)}</Typography>
                )}
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.30%", border: "1px dotted grey" }}>
              {props.creator && (
                <CheckoutActionPage
                  creator={props.creator}
                  brand={props.brand}
                  platforms={props.platforms}
                  creatorId={props.creator.id}
                  creativeQuantity={props.creativeQuantity}
                  creativeHookQuantity={props.creativeHookQuantity}
                  creativeType={props.creativeType}
                  projectName= {props.projectName}
                  projectType= {props.projectType}
                  projectLanguage= {props.projectLanguage}
                  token={props.token}
                  userId={props.userId}
                  quantity={props.quantity}
                  preferredStartDate={props.preferredStartDate}
                  cartId={props.cartId}
                  currency={creator.currency}
                  dateAddedToCart={props.dateAddedToCart}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  renderCheckoutUpdate={props.renderCheckoutUpdate}
                  policy={props.policy}
                />
              )}
            </Grid>
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          {/* <CardActionArea disableRipple> */}
          <Grid container direction="column">
            <Grid item style={{ width: "100%", height: "100%" }}>
              <CardMedia
                className={classes.mediaMobile}
                component="img"
                alt={creator.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid
              item
              style={{
                width: "100%",
                //height: "100%",
                border: "1px dotted grey",
              }}
            >
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

                     <Typography variant="h5" style={{ color: "black", fontSize: 16, marginTop: 20, marginBottom:0 }}><strong>Influencer's Cumulative Stats In Summary</strong></Typography>
                     <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Total Reach</strong>:&nbsp;&nbsp;{totalReach.toLocaleString()}</Typography>
                    <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Engagement Rate</strong>:&nbsp;&nbsp;{averageEngagementRate.toLocaleString()}%</Typography>
                    {props.currency.name.toLowerCase()==='naira' && <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{averageCostPerReach.toLocaleString()}</Typography>}
                    {props.currency.name.toLowerCase()!=='naira' && <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{averageCostPerReach.toLocaleString()}</Typography>}               
                
                    <Typography variant="h5" style={{ color: "black", fontSize: 18, marginTop: 20 }}><strong>Selected Agency Plan</strong></Typography>
                   {props.agencyServicePlan && (
                  <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Agency Service Plan</strong>:&nbsp;&nbsp;{props.agencyServicePlan.charAt(0).toUpperCase() + props.agencyServicePlan.slice(1)}</Typography>
                )}
              </CardContent>
            </Grid>

            <Grid
              item
              style={{
                width: "100%",
                marginTop: "10px",
                //marginBottom: 10,
                border: "1px dotted grey",
              }}
            >
              {props.creator && (
                <CheckoutActionPage
                  creator={props.creator}
                  brand={props.brand}
                  platforms={props.platforms}
                  creatorId={props.creator.id}
                  creativeQuantity={props.creativeQuantity}
                  creativeHookQuantity={props.creativeHookQuantity}
                  creativeType={props.creativeType}
                  projectName= {props.projectName}
                  projectType= {props.projectType}
                  projectLanguage= {props.projectLanguage}
                  token={props.token}
                  userId={props.userId}
                  quantity={props.quantity}
                  cartId={props.cartId}
                  currency={course.currency}
                  dateAddedToCart={props.dateAddedToCart}
                  handleMakeOpenLoginFormDialogStatus={
                    handleMakeOpenLoginFormDialogStatus
                  }
                  getCurrencyCode={getCurrencyCode}
                  handleCartItemForCheckoutBox={
                    props.handleCartItemForCheckoutBox
                  }
                  handleSuccessfulCreateSnackbar={
                    props.handleSuccessfulCreateSnackbar
                  }
                  handleFailedSnackbar={props.handleFailedSnackbar}
                  renderCheckoutUpdate={props.renderCheckoutUpdate}
                  policy={props.policy}
                />
              )}
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
