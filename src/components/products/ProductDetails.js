import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";
import CircularProgress from "@material-ui/core/CircularProgress";

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../logistic_assets/cover_image_1.png";
import { Category } from "@material-ui/icons";
import history from "../../history";
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
import CategoryProductsCard from "../CategoryProductsCard";
import ProductDetailCard from "./ProductDetailCard";
import UpperFooter from "../ui/UpperFooter";
import SendCourseToCheckoutForm from "./SendCourseToCheckoutForm";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },

  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

function ProductDetails(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [product, setProduct] = useState({});
  const [isOnPromo, setIsOnPromo] = useState(false);
  const [promoPrice, setPromoPrice] = useState();
  const [promoMinQuantity, setPromoMinQuantity] = useState();
  const [course, setCourse] = useState({});
  const [creator, setCreator] = useState({});
  const [isLoading, setIsLoading] = useState(null);
  const [brandId, setBrandId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const[brandName, setBrandName] = useState("");
  const [brandCountry, setBrandCountry] = useState("");

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const slug = params.slug;

 // console.log('user id:', props.userId);
 // console.log('categorySlug is:',categorySlug)

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };


  //getting the brand id
   useEffect(() => {
           const fetchData = async () => {
             let allData = {};
             if(props.userId){
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
              const response = await api.get(`/brands`,{
               params:{
                user:props.userId
              }});
              const workingData = response.data.data.data;
 
                         
        
             
             if(workingData.length > 0){
                   
              setBrandId(workingData[0].id);
              setBrandName(workingData[0].name);
              setBrandCountry(workingData[0].country[0].id);
            
              
              }
             }
             
             
           };
       
           //call the function
       
           fetchData().catch(console.error);
         }, [props.token, props.userId]);

  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/creators`, {
        params: { slug: slug },
      });
      const creator = response.data.data.data;

      if (creator.length >= 1) {
        allData.push({
          id: creator[0]._id,
            name: creator[0].name,
            image: creator[0].image,
            bio: creator[0].bio,
            user: creator[0].user,
            currency: creator[0].currency,
            videoPrice: creator[0].videoPrice,
            videoHookPrice: creator[0].videoHookPrice,
            videoDeliveryDays: creator[0].videoDeliveryDays,
            soundPrice: creator[0].soundPrice,
            soundHookPrice: creator[0].soundHookPrice,
            soundDeliveryDays: creator[0].soundDeliveryDays,
            age: creator[0].age,
            gender: creator[0].gender,
            rate: creator[0].rate,
            country: creator[0].country,
            category:creator[0].category,
            niches: creator[0].niches,
            languages: creator[0].languages,
            slug: creator[0].slug,
            status: creator[0].status,
            creatorContactPhoneNumber: creator[0].creatorContactPhoneNumber,
            creatorContactEmailAddress: creator[0].creatorContactEmailAddress,
          
        });

        setCreator({
          id: allData[0].id,
            name: allData[0].name,
            image: allData[0].image,
            bio: allData[0].bio,
            user: allData[0].user,
            currency: allData[0].currency,
            videoPrice: allData[0].videoPrice,
            videoHookPrice: allData[0].videoHookPrice,
            videoDeliveryDays: allData[0].videoDeliveryDays,

            soundPrice: allData[0].soundPrice,
            soundHookPrice: allData[0].soundHookPrice,
            soundDeliveryDays: allData[0].soundDeliveryDays,
            age: allData[0].age,
            gender: allData[0].gender,
            rate: allData[0].rate,
            country: allData[0].country,
            category:allData[0].category,
            niches: allData[0].niches,
            languages: allData[0].languages,
            slug: allData[0].slug,
            status: allData[0].status,
            creatorContactPhoneNumber: allData[0].creatorContactPhoneNumber,
            creatorContactEmailAddress: allData[0].creatorContactEmailAddress,
        });
        setCreatorId(allData[0].id);


        setIsLoading(false);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [slug]);

  
  
  

  const Str = require("@supercharge/strings");

  const creatorData = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          <ProductDetailCard
            creator={creator}
            creatorId={creator.id}
            name= {creator.name}
            image= {creator.image}
            bio = {creator.bio}
            user= {creator.user}
            currency={creator.currency}
            videoPrice={creator.videoPrice}
            videoHookPrice={creator.videoHookPrice}
            videoDeliveryDays={creator.videoDeliveryDays}

            soundPrice={creator.soundPrice}
            soundHookPrice={creator.soundHookPrice}
            soundDeliveryDays={creator.soundDeliveryDays}
            age={creator.age}
            gender={creator.gender}
            rate= {creator.rate}
            country={creator.country}
            category={creator.category}
            categoryName = {creator.category ? creator.category[0].name : ""}
            categoryCode = {creator.category ? creator.category[0].code : ""}
            niches={creator.niches}
            languages={creator.languages}
            slug= {creator.slug}
            status={creator.status}
            creatorContactPhoneNumber= {creator.creatorContactPhoneNumber}
            creatorContactEmailAddress={creator.creatorContactEmailAddress}
            key={creator.id}
            token={props.token}
            userId={props.userId}
            setToken={props.setToken}
            setUserId={props.setUserId}
            handleSuccessfulCreateSnackbar={
              props.handleSuccessfulCreateSnackbar
            }
            handleFailedSnackbar={props.handleFailedSnackbar}
            cartCounterHandler={props.cartCounterHandler}
            brandId={brandId}
            brandCountry={brandCountry}
            brandName={brandName}
          />
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <ProductDetailCard
              creator={creator}
              creatorId={creator.id}
              name= {creator.name}
              image= {creator.image}
              bio = {creator.bio}
              user= {creator.user}
              currency={creator.currency}
              videoPrice={creator.videoPrice}
              videoHookPrice={creator.videoHookPrice}
              videoDeliveryDays={creator.videoDeliveryDays}
  
              soundPrice={creator.soundPrice}
              soundHookPrice={creator.soundHookPrice}
              soundDeliveryDays={creator.soundDeliveryDays}
              age={creator.age}
              gender={creator.gender}
              rate= {creator.rate}
              country={creator.country}
              category={creator.category}
              categoryName = {creator.category ? creator.category[0].name : ""}
              categoryCode = {creator.category ? creator.category[0].code : ""}
              niches={creator.niches}
              languages={creator.languages}
              slug= {creator.slug}
              status={creator.status}
              creatorContactPhoneNumber= {creator.creatorContactPhoneNumber}
              creatorContactEmailAddress={creator.creatorContactEmailAddress}
              key={creator.id}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              cartCounterHandler={props.cartCounterHandler}
              brandId={brandId}
              brandCountry={brandCountry}
              brandName={brandName}
          />
        </Grid>
      }
    </React.Fragment>
  );

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ marginTop: "10px" }}>
        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}

        {!isLoading && <Grid item>{creatorData}</Grid>}

        {/*....INFORMATION BLOCK....*/}
      </Grid>
      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default ProductDetails;



