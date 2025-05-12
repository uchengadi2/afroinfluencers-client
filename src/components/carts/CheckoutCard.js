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
    marginTop: "-3.5em",
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
      const response = await api.get(`/creators/${props.creator}`);
      const creator = response.data.data.data;

      allData.push({
         id: creator._id,
          name: creator.name,
          description: creator.description,
          videoPrice: creator.videoPrice,
          videoHookPrice: creator.videoHookPrice,
          videoDeliveryDays: creator.videoDeliveryDays,
          soundPrice: creator.soundPrice,
          soundHookPrice: creator.soundHookPrice,
          soundDeliveryDays: creator.soundDeliveryDays,
          age: creator.age,
          gender:creator.gender,
          rate: creator.rate,
          country: creator.country,
          category: creator.category,
          categoryCode: creator.category? creator.category[0].code : "",
          categoryName: creator.category ? creator.category[0].name : "",
          countryId: creator.country? creator.country[0].id : "",
          niche: creator.niches,
          nicheId: creator.niches ? creator.niches[0].id :"",
          language: creator.languages,
          languageId: creator.languages ? creator.languages[0].id :"",
          currency: creator.currency,
          slug: creator.slug,
          image: creator.image,
          createBy: creator.createBy,
          createdAt: creator.createdAt,
          bio:creator.bio
      });

      if (!allData) {
        return;
      }
      setCreator({
       
        id: allData[0].id,
          name: allData[0].name,
          description: allData[0].description,
          videoPrice: allData[0].videoPrice,
          videoHookPrice: allData[0].videoHookPrice,
          videoDeliveryDays: allData[0].videoDeliveryDays,
          soundPrice: allData[0].soundPrice,
          soundHookPrice: allData[0].soundHookPrice,
          soundDeliveryDays: allData[0].soundDeliveryDays,
          age: allData[0].age,
          gender:allData[0].gender,
          rate: allData[0].rate,
          country: allData[0].country,
          category: allData[0].category,
          categoryCode: allData[0].categoryCode,
          caegoryName: allData[0].categoryName,
          countryId: allData[0].countryId,
          niche: allData[0].niche,
          nicheId: allData[0].nicheId,
          language: allData[0].language,
          languageId: allData[0].languageId,
          currency: allData[0].currency,
          slug: allData[0].slug,
          image: allData[0].image,
          createBy: allData[0].createBy,
          createdAt: allData[0].createdAt,
          bio:allData[0].bio
      });
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  

  

  let imageUrl = "";
  if (creator) {
    imageUrl = `${baseURL}/images/creators/${creator.image}`;
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

  if (!course) {
    return <></>;
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
                alt={creator.name}
                image={imageUrl}
                //title={product.name}
                crossOrigin="anonymous"
              />
            </Grid>
            <Grid item style={{ width: "46.19%", border: "1px dotted grey" }}>
              <CardContent disableRipple>
                {creator.categoryCode === 'video-and-audio-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                                    {creator.name}
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                                      <em> ({creator.country[0].name}, Video & Jingle Creator,  {creator.age} years)</em>
                                    </span>
                </Typography>}
               {creator.categoryCode === 'video-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                                    {creator.name}
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                                      <em> ({creator.country[0].name}, Video Creator,  {creator.age} years)</em>
                                    </span>
                 </Typography>}
                {creator.categoryCode === 'audio-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                                    {creator.name}
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                                      <em> ({creator.country[0].name}, Jingle Creator,  {creator.age} years)</em>
                                    </span>
                </Typography>}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 20 }}
                >
                  {Str(creator.bio).limit(200, "...").get()}
                </Typography>
                
                
                <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 13 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Reference Number:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {props.refNumber} &nbsp;
                    </span>
                  </Typography>
                   <Typography style={{marginLeft:10}}><strong>Niches:</strong></Typography>
                                
                                 {creator.niche && <Grid container direction="row" style={{marginLeft:30}}>
                                                {creator.niche.map((niche, index) => (
                                                  <Typography>{niche.niche},  </Typography>
                  
                                                ))}
                                              </Grid>}
                                  <Typography style={{marginLeft:10}}><strong>Languages:</strong></Typography>
                                  
                                  {creator.language && <Grid container direction="row" style={{marginLeft:30}}>
                                                {creator.language.map((lang, index) => (
                                                  <Typography>{lang.language},  </Typography>
                  
                                                ))}
                                              </Grid>}
                  

                
                
               
              </CardContent>
            </Grid>

            <Grid item style={{ width: "26.30%", border: "1px dotted grey" }}>
              {props.grandTotal && (
                <CheckoutActionPage
                  grandTotal={props.grandTotal}
                  brandName={props.brandName}
                  minimumQuantity={creator.minimumQuantity}
                  creatorId={creator.id}
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
              {creator.categoryCode === 'video-and-audio-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                                    {creator.name}
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                                      <em> ({creator.country[0].name}, Video & Jingle Creator,  {creator.age} years)</em>
                                    </span>
                </Typography>}
               {creator.categoryCode === 'video-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                                    {creator.name}
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                                      <em> ({creator.country[0].name}, Video Creator,  {creator.age} years)</em>
                                    </span>
                 </Typography>}
                {creator.categoryCode === 'audio-only-creators'  && <Typography variant="h4" color="textSecondary" component="p">
                                    {creator.name}
                                    <span style={{ fontSize: 16, fontWeight: 700 }}>
                                      <em> ({creator.country[0].name}, Jingle Creator,  {creator.age} years)</em>
                                    </span>
                </Typography>}
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  component="p"
                  style={{ marginTop: 20 }}
                >
                  {Str(creator.bio).limit(200, "...").get()}
                </Typography>
                
                
                <Typography
                    variant="h5"
                    style={{ color: "black", fontSize: 13 }}
                  >
                    <span style={{ marginRight: 20 }}>
                      <strong>Reference Number:</strong>
                    </span>
                    <span style={{ marginLeft: 3, textAlign: "center" }}>
                      {props.refNumber} &nbsp;
                    </span>
                  </Typography>
                   <Typography style={{marginLeft:10}}><strong>Niches:</strong></Typography>
                                
                                 {creator.niche && <Grid container direction="row" style={{marginLeft:30}}>
                                                {creator.niche.map((niche, index) => (
                                                  <Typography>{niche.niche},  </Typography>
                  
                                                ))}
                                              </Grid>}
                                  <Typography style={{marginLeft:10}}><strong>Languages:</strong></Typography>
                                  
                                  {creator.language && <Grid container direction="row" style={{marginLeft:30}}>
                                                {creator.language.map((lang, index) => (
                                                  <Typography>{lang.language},  </Typography>
                  
                                                ))}
                                              </Grid>}
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
              {props.grandTotal && (
                <CheckoutActionPage
                  grandTotal={props.grandTotal}
                  brandName={props.brandName}
                  minimumQuantity={creator.minimumQuantity}
                  creatorId={creator.id}
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
