import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./ui/ButtonArrow";
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

import LoginForm from "./authForms/LoginForm";
import UserSignUp from "./users/UserSignUp";
import UserPasswordReset from "./users/UserPasswordReset";
import UserSignUpCreator from "./users/UserSignUpCreator";

import data from "../apis/local";
import CallToAction from "./ui/CallToAction";
import animationData from "../animations/landinganimation/data";

import revolutionBackground from "./../assets/repeatingBackground.svg";
import infoBackground from "./../assets/infoBackground.svg";

import background from "./../assets/images/influencers/cover1.webp";
import UpperFooter from "./ui/UpperFooter";
import TopCover from "./homePageCards/TopCover";
import LearningPath from "./homePageCards/LearningPath";
import TopCoverNew from "./homePageCards/TopCoverNew";
import TopCoverServices from "./homePageCards/TopCoverServices";
import ServicePreferences from "./homePageCards/ServicePreferences";
import HeroSection from "./homePageCards/HeroSection";
import OurProcesses from "./homePageCards/OurProcesses";
//import mobileBackground from "./../../assets/mobileBackground.jpg";

import AllCourses from "./homePageCards/AllCourses";

import { baseURL } from "../apis/util";
import AllCreatorsOnList from "./homePageCards/AllCreatorsOnList";
import AllProductsInCardDesign from "./homePageCards/AllProductsInCardDesign.";
import OurServicePlans from "./homePageCards/OurServicePlans";
import InfluencersBoard from "./homePageCards/InfluencersBoard"


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
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 250,
    marginRight: 10,
    marginLeft: 130,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  estimateButtonMobile: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 220,
    marginRight: 10,
    marginLeft: 20,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: "white",
    },
  },
  buttonContainer: {
    marginTop: "3.9em",
    marginLeft: "6.9em",
  },
  buttonContainerMobile: {
    marginTop: "4.2em",
    marginLeft: "3.5em",
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
    width: 250,
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

  topCover: {
    marginTop: "20em",
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
  backgroundMobile: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "50em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  category: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
  vendor: {
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  logistics: {
    marginTop: "15rem",
    marginBottom: "5rem",
  },
  promotion: {
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  features: {
    marginTop: "5rem",
    marginBottom: "5rem",
  },
}));

const InfluencerCentral = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [coursesList, setCourseList] = useState([]);
  const [creatorsList, setCreatorsList] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [updateLearningPath, setUpdateLearningPath] = useState(false);
  const [updateServicePath, setUpdateServicePath] = useState(false);
  //const [path, setPath] = useState("crash-course");
  const [path, setPath] = useState("all");
  const [updateAgePath, setUpdateAgePath] = useState('all');
  const [updatePricePath, setUpdatePricePath] = useState('all');
  const [updateGenderPath, setUpdateGenderPath] = useState('all');
  const [updateLanguagePath, setUpdateLanguagePath] = useState(0);
  const [updateNichePath, setUpdateNichePath] = useState(0);
  const [updateCountryPath, setUpdateCountryPath] = useState(0);
  const [updateDeliveryDaysPath, setUpdateDeliveryDaysPath] = useState('all');
  const [updatePlatformPath, setUpdatePlatformPath] = useState('all');
  const [countryCode, setCountryCode] = useState("");
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openInfluencerSignUpForm, setInfluencerOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);
  


  // const [courseType, setCourseType] = useState(0);
  const [channel, setChannel] = useState(0);
  const [programme, setProgramme] = useState(0);

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const updatePathHandler = (value) => {
    //console.log("this is the active learning path:", value);
    setPath(value);
  };

  const updateLearningPathInfoInfo = () => {
    setUpdateLearningPath((prevState) => !prevState);
  };

 

  const updateAgePathInfoHandler = (value) => {
    setUpdateAgePath(value);
  };
  const updatePricePathHandler = (value) => {
    setUpdatePricePath(value);
  };

  const updateGenderPathHandler = (value) => {
    setUpdateGenderPath(value);
  };

  const updateLanguagePathHandler = (value) => {
    setUpdateLanguagePath(value);
  };

  const updateNichePathHandler = (value) => {
    setUpdateNichePath(value);
  };

  const updateCountryPathHandler = (value) => {
    setUpdateCountryPath(value);
  };

  const updateDeliveryDaysPathHandler = (value) => {
    setUpdateDeliveryDaysPath(value);
  };
  
  const updatePlatformPathHandler = (value) => {
    setUpdatePlatformPath(value);
  };

   const updateCountryCodeHandler = (value) => {
    setCountryCode(value);
  };
  

 

  const updateServicePathInfoInfo = () => {
    setUpdateServicePath((prevState) => !prevState);
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


   const handleMakeOpenSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(true);
    setOpenLoginForm(false);
    setInfluencerOpenSignUpForm(false)
    
  };
  const handleMakeOpenInfluencerSignUpDialogStatus = () => {
    // history.push("/categories/new");   
    setInfluencerOpenSignUpForm(true)
    setOpenSignUpForm(false);
    setOpenLoginForm(false);
  };

  
  const handleMakeOpenLoginFormDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
    setOpenLoginForm(true);
  };

  const handleLoginDialogOpenStatus = () => {
    // history.push("/categories/new");
    setOpenLoginForm(false);
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

  const handleSuccessfulSignUpInfluencerDialogOpenStatusWithSnackbar = () => {
    // history.push("/categories/new");
    setInfluencerOpenSignUpForm(false);
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


  const handleFailedSignUpDialogInfluencerOpenStatusWithSnackbar = (message) => {
    // history.push("/categories/new");
    setAlert({
      open: true,
      message: message,

      backgroundColor: "#FF3232",
    });
    setInfluencerOpenSignUpForm(true);
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

 
  const handleMakeCloseSignUpDialogStatus = () => {
    // history.push("/categories/new");
    setOpenSignUpForm(false);
  };


  const handleMakeCloseSignUpInfluencerDialogStatus = () => {
    // history.push("/categories/new");
    setInfluencerOpenSignUpForm(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];

      

     if (updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all') {
        //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await data.get("/creators?sort=desc",{params:{status:"active"}});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            

            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all' ){
        //creators from a particular country
        
        const response = await data.get("/creators?sort=desc",{params:{country:updateCountryPath,status:"active"}});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //creators from a particular country but male
        const response = await data.get("/creators?sort=desc",{params:{country:updateCountryPath,gender:updateGenderPath,status:"active"}});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
         //creators from a particular country but male
         const response = await data.get("/creators?sort=desc",{params:{country:updateCountryPath,gender:updateGenderPath,status:"active"}});

         const workingData = response.data.data.data;
         //console.log('working Data:',workingData)
 
         workingData.map((creator) => {
           allData.push({
             id: creator._id,
             name: creator.name,
             image: creator.image,
             bio: creator.bio,
             user: creator.user,
             currency: creator.currency,
            
             age: creator.age,
             gender: creator.gender,
             rate: creator.rate,
             country: creator.country,
             category:creator.category,
             niches: creator.niches,
             languages: creator.languages,
             slug: creator.slug,
             status: creator.status,
             creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
             creatorContactEmailAddress: creator.creatorContactEmailAddress,
             platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
             
             
           });
         });
         setCreatorsList(allData);
         setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath !==0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //creators from a particular country with language selection
        const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            languages:updateLanguagePath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "male" && updateLanguagePath !==0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
         //creators from a particular country with language selection and male gender
         const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            languages:updateLanguagePath,
            gender:updateGenderPath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "female" && updateLanguagePath !==0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //creators from a particular country with language selection and female gender
        const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            languages:updateLanguagePath,
            gender:updateGenderPath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath ===0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //creators from a particular country with niche selection
        const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            niches:updateNichePath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "male" && updateLanguagePath ===0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath==='all'){
         //creators from a particular country with niche selection with gender
         const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            niches:updateNichePath,
            gender:updateGenderPath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "female" && updateLanguagePath ===0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath==='all'){
         //creators from a particular country with niche selection with gender
         const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            niches:updateNichePath,
            gender:updateGenderPath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath !==0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //creators from a particular country with niche and language selection
        const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            niches:updateNichePath,
            languages:updateLanguagePath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);

      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "male" && updateLanguagePath !==0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath==='all'){
          //creators from a particular country with niche and language selection
        const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            niches:updateNichePath,
            languages:updateLanguagePath,
            gender:updateGenderPath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);

      }else if(updateAgePath === "all" && updatePricePath==="all" && updateGenderPath === "female" && updateLanguagePath !==0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath==='all'){
          //creators from a particular country with niche and language selection
        const response = await data.get("/creators?sort=desc",{
          params:{
            country:updateCountryPath,
            niches:updateNichePath,
            languages:updateLanguagePath,
            gender:updateGenderPath,
            status:"active"
          }});

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);

      }else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){

        //selecting country and ages between 18 & 24
        const response = await data.get(`/creators?sort=desc`,{
          params:{
            country:updateCountryPath,
            status:"active",
            'age[gte]':18,
            'age[lte]':24,
                       
            
            }        
          });

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath === "25-34" && updatePricePath==="all" && updateGenderPath === "all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //selecting country and age between 25 & 34
        const response = await data.get(`/creators?sort=desc`,{
          params:{
            country:updateCountryPath,
            status:"active",
            'age[gte]':25,
            'age[lte]':34,           
            
            }        
          });

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //selecting country age between 35 & 45
        const response = await data.get(`/creators?sort=desc`,{
          params:{
            country:updateCountryPath,
            status:"active",
            'age[gte]':35,
            'age[lte]':45,           
            
            }        
          });

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);

      }else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
        //selecting country, and age above 45
        const response = await data.get(`/creators?sort=desc`,{
          params:{
            country:updateCountryPath,
            status:"active",
            'age[gt]':45,
                      
            
            }        
          });

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
           
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);

      }else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
         //selecting age above 45 only
         const response = await data.get(`/creators?sort=desc`,{
          params:{
             'age[gt]':45,
             status:"active"
                      
            
            }        
          });

        const workingData = response.data.data.data;
        //console.log('working Data:',workingData)

        workingData.map((creator) => {
          allData.push({
            id: creator._id,
            name: creator.name,
            image: creator.image,
            bio: creator.bio,
            user: creator.user,
            currency: creator.currency,
            
            age: creator.age,
            gender: creator.gender,
            rate: creator.rate,
            country: creator.country,
            category:creator.category,
            niches: creator.niches,
            languages: creator.languages,
            slug: creator.slug,
            status: creator.status,
            creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
            creatorContactEmailAddress: creator.creatorContactEmailAddress,
            platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
            
            
          });
        });
        setCreatorsList(allData);
        setIsLoading(false);
      }else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
        //selecting age above  between 35 and 45
        const response = await data.get(`/creators?sort=desc`,{
         params:{
            'age[gte]':35,
            'age[lte]':45,
            status:"active"
                     
           
           }        
         });

       const workingData = response.data.data.data;
       //console.log('working Data:',workingData)

       workingData.map((creator) => {
         allData.push({
           id: creator._id,
           name: creator.name,
           image: creator.image,
           bio: creator.bio,
           user: creator.user,
           currency: creator.currency,
           
           age: creator.age,
           gender: creator.gender,
           rate: creator.rate,
           country: creator.country,
           category:creator.category,
           niches: creator.niches,
           languages: creator.languages,
           slug: creator.slug,
           status: creator.status,
           creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
           creatorContactEmailAddress: creator.creatorContactEmailAddress,
           platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
           
           
         });
       });
       setCreatorsList(allData);
       setIsLoading(false);
     }else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
      //selecting age above  between 25 and 34
      const response = await data.get(`/creators?sort=desc`,{
       params:{
          'age[gte]':25,
          'age[lte]':34,
          status:"active"
                   
         
         }        
       });

     const workingData = response.data.data.data;
     //console.log('working Data:',workingData)

     workingData.map((creator) => {
       allData.push({
         id: creator._id,
         name: creator.name,
         image: creator.image,
         bio: creator.bio,
         user: creator.user,
         currency: creator.currency,
         
         age: creator.age,
         gender: creator.gender,
         rate: creator.rate,
         country: creator.country,
         category:creator.category,
         niches: creator.niches,
         languages: creator.languages,
         slug: creator.slug,
         status: creator.status,
         creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
         creatorContactEmailAddress: creator.creatorContactEmailAddress,
         platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
         
         
       });
     });
     setCreatorsList(allData);
     setIsLoading(false);
   }else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
    //selecting age above  between 25 and 34
    const response = await data.get(`/creators?sort=desc`,{
     params:{
        'age[gte]':18,
        'age[lte]':24,
        status:"active"
                 
       
       }        
     });

   const workingData = response.data.data.data;
   //console.log('working Data:',workingData)

   workingData.map((creator) => {
     allData.push({
       id: creator._id,
       name: creator.name,
       image: creator.image,
       bio: creator.bio,
       user: creator.user,
       currency: creator.currency,
      
       age: creator.age,
       gender: creator.gender,
       rate: creator.rate,
       country: creator.country,
       category:creator.category,
       niches: creator.niches,
       languages: creator.languages,
       slug: creator.slug,
       status: creator.status,
       creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
       creatorContactEmailAddress: creator.creatorContactEmailAddress,
       platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
       
       
     });
   });
   setCreatorsList(allData);
   setIsLoading(false);
 }else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 25 and 34 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 25 and 34 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 25 and 34 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 25 and 34 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 35 and 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 35 and 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age above 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age above 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age above 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age above 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age above 45 and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age between 32 and 45 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age between 25 and 34 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age between 25 and 34 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age between 18 and 24 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='all'){
  //selecting age between 18 and 24 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      'country':updateCountryPath,
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="female" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 18 and 24 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active"
      //'country':updateCountryPath,
      //'age[gte]':18,
      //'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="male" && updateLanguagePath ===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting age between 18 and 24 and country and male gender
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      gender:updateGenderPath,
      status:"active",
      //'country':updateCountryPath,
      //'age[gte]':18,
      //'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath!==0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting language only
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      languages:updateLanguagePath,
      status:"active",
      //'country':updateCountryPath,
      //'age[gte]':18,
      //'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath!==0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting niches only
  const response = await data.get(`/creators?sort=desc`,{
   params:{
      niches:updateNichePath,
      status:"active",
      //'country':updateCountryPath,
      //'age[gte]':18,
      //'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting prices that are less than N100,000 only
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoPrice':updateNichePath,
      //'country':updateCountryPath,
      'videoPrice[lt]':100000,
      status:"active"
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting prices is between 100000 and 200000
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoPrice':updateNichePath,
      //'country':updateCountryPath,
      'videoPrice[gte]':100000,
      'videoPrice[lte]':200000,
      status:"active"
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting prices is between 200000 and 400000
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoPrice':updateNichePath,
      //'country':updateCountryPath,
      'videoPrice[gte]':200000,
      'videoPrice[lt]':400000,
      status:"active"
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting prices is between 400000 and 600000
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoPrice':updateNichePath,
      //'country':updateCountryPath,
      'videoPrice[gte]':400000,
      'videoPrice[lt]':600000,
      status:"active"
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting prices is between 600000 and 1000000
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoPrice':updateNichePath,
      //'country':updateCountryPath,
      'videoPrice[gte]':600000,
      'videoPrice[lt]':1000000,
      status:"active"
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,
     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='all'){
  //selecting prices is between 600000 and 1000000
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoPrice':updateNichePath,
      //'country':updateCountryPath,
      'videoPrice[gt]':1000000,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of 1
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    'platforms':updatePlatformPath,
    status:"active"
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':1,
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of less than or equalt to 2
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      'platforms':updatePlatformPath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of less than or equalt to 3
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      'platforms':updatePlatformPath,
      'niches':updateNichePath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
     
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath!==0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of less than or equalt to 4
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      'platforms':updatePlatformPath,
      'niches':updateNichePath,
      'languages':updateLanguagePath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath !=="all" && updateLanguagePath!==0 && updateNichePath!==0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of less than or equalt to 5
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      'platforms':updatePlatformPath,
      'niches':updateNichePath,
      'languages':updateLanguagePath,
      'gender':updateGenderPath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath !=="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of less than or equalt to 6
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      'platforms':updatePlatformPath,
      'gender':updateGenderPath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath!==0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days of less than or equalt to 7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[lte]':7,
      'platforms':updatePlatformPath,
      'languages':updateLanguagePath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="all" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath!==0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      'niches':updateNichePath,
      status:"active"
      //'videoPrice[lt]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="18-24" && updatePricePath==="all" && updateGenderPath !=="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      'gender':updateGenderPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath !=="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      'gender':updateGenderPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath !=="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      'gender':updateGenderPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath !=="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      'gender':updateGenderPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform, ages and gender begins
}else if(updateAgePath === "18-24" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform, age and country
}else if(updateAgePath === "18-24" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':18,
      'age[lte]':24,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="25-34" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':25,
      'age[lte]':34,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="35-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gte]':35,
      'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);
}else if(updateAgePath ==="above-45" && updatePricePath==="all" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath===updatePlatformPath){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'age[gt]':45,
      //'age[lte]':45,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform, age and country
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'facebookCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':100000,
      'facebookCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':200000,
      'facebookCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':400000,
      'facebookCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':600000,
      'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'instagramCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':100000,
      'instagramCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':200000,
      'instagramCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':400000,
      'instagramCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':600000,
      'instagramCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === instagram, price
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'twitterCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':100000,
      'twitterCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':200000,
      'twitterCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':400000,
      'twitterCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':600000,
      'twitterCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === twitter, price
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'tiktokCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':100000,
      'tiktokCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':200000,
      'tiktokCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':400000,
      'tiktokCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':600000,
      'tiktokCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === tiktok, price
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'linkedInCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':100000,
      'linkedInCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':200000,
      'linkedInCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':400000,
      'linkedInCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':600000,
      'linkedInCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === linkedin, price
}else if(updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'blogCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':100000,
      'blogCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':200000,
      'blogCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':400000,
      'blogCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':600000,
      'blogCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath===0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      //'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === blog, price

 //platform== facebook, price and country begins here
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'facebookCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':100000,
      'facebookCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':200000,
      'facebookCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':400000,
      'facebookCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':600000,
      'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'instagramCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':100000,
      'instagramCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':200000,
      'instagramCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':400000,
      'instagramCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':600000,
      'instagramCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === instagram, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'twitterCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':100000,
      'twitterCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':200000,
      'twitterCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':400000,
      'twitterCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':600000,
      'twitterCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === twitter, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'tiktokCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':100000,
      'tiktokCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':200000,
      'tiktokCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':400000,
      'tiktokCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':600000,
      'tiktokCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === tiktok, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'linkedInCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':100000,
      'linkedInCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':200000,
      'linkedInCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':400000,
      'linkedInCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':600000,
      'linkedInCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === linkedin, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'blogCostPerPost[lt]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="100000-200000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':100000,
      'blogCostPerPost[lte]':200000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="200000-400000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':200000,
      'blogCostPerPost[lte]':400000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="400000-600000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':400000,
      'blogCostPerPost[lte]':600000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="600000-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':600000,
      'blogCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode === '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-1000000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gt]':1000000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === blog, price and country !== Nigeria starts here

 
}else if(countryCode !=='682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-500" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'facebookCostPerPost[lt]':500,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="500-3000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':500,
      'facebookCostPerPost[lte]':3000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="3000-20000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':3000,
      'facebookCostPerPost[lte]':20000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="20000-50000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':20000,
      'facebookCostPerPost[lte]':50000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="50000-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gte]':50000,
      'facebookCostPerPost[lte]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='facebook'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'facebookCostPerPost[gt]':100000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-500" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'instagramCostPerPost[lt]':500,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="500-3000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':500,
      'instagramCostPerPost[lte]':3000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="3000-20000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':3000,
      'instagramCostPerPost[lte]':20000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="20000-50000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':20000,
      'instagramCostPerPost[lte]':50000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="50000-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gte]':50000,
      'instagramCostPerPost[lte]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='instagram'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'instagramCostPerPost[gt]':100000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === instagram, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-500" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'twitterCostPerPost[lt]':500,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="500-3000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':500,
      'twitterCostPerPost[lte]':3000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="3000-20000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':3000,
      'twitterCostPerPost[lte]':20000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="20000-50000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':20000,
      'twitterCostPerPost[lte]':50000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="50000-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gte]':50000,
      'twitterCostPerPost[lte]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='twitter'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'twitterCostPerPost[gt]':100000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === twitter, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-500" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'tiktokCostPerPost[lt]':500,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="500-3000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':500,
      'tiktokCostPerPost[lte]':3000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="3000-20000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':3000,
      'tiktokCostPerPost[lte]':20000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="20000-50000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':20000,
      'tiktokCostPerPost[lte]':50000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="50000-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gte]':50000,
      'tiktokCostPerPost[lte]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='tiktok'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'tiktokCostPerPost[gt]':100000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === tiktok, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-500" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'linkedInCostPerPost[lt]':500,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="500-3000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':500,
      'linkedInCostPerPost[lte]':3000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="3000-20000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':3000,
      'linkedInCostPerPost[lte]':20000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="20000-50000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':20000,
      'linkedInCostPerPost[lte]':50000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="50000-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gte]':50000,
      'linkedInCostPerPost[lte]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='linkedin'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'linkedInCostPerPost[gt]':100000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === linkedin, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="less-than-500" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      //'age[gt]':45,
      'blogCostPerPost[lt]':500,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="500-3000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':500,
      'blogCostPerPost[lte]':3000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="3000-20000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':3000,
      'blogCostPerPost[lte]':20000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="20000-50000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':20000,
      'blogCostPerPost[lte]':50000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="50000-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gte]':50000,
      'blogCostPerPost[lte]':100000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === facebook, price
}else if(countryCode !== '682211ebd6574a66fcbe10e3' && updateAgePath ==="all" && updatePricePath==="above-100000" && updateGenderPath ==="all" && updateLanguagePath===0 && updateNichePath===0 && updateCountryPath!==0 && updatePlatformPath==='blog'){
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{
   params:{
    //'videoDeliveryDays':1,
      'country':updateCountryPath,
      //'videoDeliveryDays[gt]':7,
      'platforms':updatePlatformPath,
      //'niches':updateNichePath,
      status:"active",
      'blogCostPerPost[gt]':100000,
      //'facebookCostPerPost[lte]':1000000,
               
     
     }        
   });

 const workingData = response.data.data.data;
 //console.log('working Data:',workingData)

 workingData.map((creator) => {
   allData.push({
     id: creator._id,
     name: creator.name,
     image: creator.image,
     bio: creator.bio,
     user: creator.user,
     currency: creator.currency,
    
     age: creator.age,
     gender: creator.gender,
     rate: creator.rate,
     country: creator.country,
     category:creator.category,
     niches: creator.niches,
     languages: creator.languages,
     slug: creator.slug,
     status: creator.status,
     creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
     creatorContactEmailAddress: creator.creatorContactEmailAddress,

     platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
     
     
   });
 });
 setCreatorsList(allData);
 setIsLoading(false);

 //platform === blog, price and country

 
}else{
  //selecting delivery days above  7
  const response = await data.get(`/creators?sort=desc`,{params:{status:"active"}});
 
  const workingData = response.data.data.data;
  //console.log('working Data:',workingData)
 
  workingData.map((creator) => {
    allData.push({
      id: creator._id,
      name: creator.name,
      image: creator.image,
      bio: creator.bio,
      user: creator.user,
      currency: creator.currency,
      age: creator.age,
      gender: creator.gender,
      rate: creator.rate,
      country: creator.country,
      category:creator.category,
      niches: creator.niches,
      languages: creator.languages,
      slug: creator.slug,
      status: creator.status,
      creatorContactPhoneNumber: creator.creatorContactPhoneNumber,
      creatorContactEmailAddress: creator.creatorContactEmailAddress,

      platforms: creator.platforms,
            facebookProfileLink: creator.facebookProfileLink,
            instagramProfileLink: creator.instagramProfileLink,
            tiktokProfileLink: creator.tiktokProfileLink,
            twitterProfileLink: creator.twitterProfileLink,
            linkedInProfileLink: creator.linkedInProfileLink,
            blogSiteLink: creator.blogSiteLink,
            facebookTotalFollowers: creator.facebookTotalFollowers,
            instagramTotalFollowers: creator.instagramTotalFollowers,
            tiktokTotalFollowers: creator.tiktokTotalFollowers,
            twitterTotalFollowers: creator.twitterTotalFollowers,
            linkedInTotalFollowers: creator.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth: creator.blogTotalVisitorsPerMonth,
            facebookEngagementRate: creator.facebookEngagementRate,
            instagramEngagementRate: creator.instagramEngagementRate,
            tiktokEngagementRate: creator.tiktokEngagementRate,
            twitterEngagementRate: creator.twitterEngagementRate,
            linkedInEngagementRate: creator.linkedInEngagementRate,
            facebookCostPerPost: creator.facebookCostPerPost,
            instagramCostPerPost: creator.instagramCostPerPost,
            tiktokCostPerPost: creator.tiktokCostPerPost,
            twitterCostPerPost: creator.twitterCostPerPost,
            linkedInCostPerPost: creator.linkedInCostPerPost,
            blogCostPerPost: creator.blogCostPerPost,
            blogPostCostDuration: creator.blogPostCostDuration,
      
      
    });
  });
  setCreatorsList(allData);
  setIsLoading(false);
 } //ends here

      
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateAgePath, 
    updatePricePath,
    updateGenderPath,
    updateLanguagePath,
    updateNichePath,
    updateCountryPath,
    updatePlatformPath
  ]);


  
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const Str = require("@supercharge/strings");

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



    const renderInfluencerSignUpForm = () => {
      return (
        <Dialog
          //style={{ zIndex: 1302 }}
          fullScreen={matchesXS}
          open={openInfluencerSignUpForm}
          //onClose={() => [setOpenSignUpForm(false), history.push("/")]}
          onClose={() => [setInfluencerOpenSignUpForm(false)]}
        >
          <DialogContent>
            <UserSignUpCreator
              token={props.token}
              handleMakeOpenInfluencerSignUpDialogStatus={handleMakeOpenInfluencerSignUpDialogStatus}
              handleMakeCloseSignUpInfluencerDialogStatus={
                handleMakeCloseSignUpInfluencerDialogStatus
              }
              handleMakeOpenLoginFormDialogStatus={
                handleMakeOpenLoginFormDialogStatus
              }
              handleSuccessfulSignUpInfluencerDialogOpenStatusWithSnackbar={
                handleSuccessfulSignUpInfluencerDialogOpenStatusWithSnackbar
              }
              handleFailedSignUpDialogInfluencerOpenStatusWithSnackbar={
                handleFailedSignUpDialogInfluencerOpenStatusWithSnackbar
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




  //This is the working code that had been tested
  const allCreatorsList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
        <Box>
          {creatorsList.map((creator, index) => (
            <AllCreatorsOnList
            name={creator.name}
            creatorId={creator.id}
              key={`${creator.id}${index}`}
              bio={Str(creator.bio)
                .limit(500, "...")
                .get()}
                //bio={course.bio}
                user={creator.user}
                currency={creator.currency}
                videoPrice={creator.videoPrice}
                videoHookPrice={creator.videoHookPrice}
                videoDeliveryDays={creator.videoDeliveryDays}
                soundPrice={creator.soundPrice}
                soundHookPrice={creator.soundHookPrice}
                soundDeliveryDays={creator.soundDeliveryDays}
                age={creator.age}
                gender={creator.gender}
                rate={creator.rate}
                country={creator.country}
                category={creator.category}
                niches={creator.niches}
                languages={creator.languages}
                slug={creator.slug}
                status={creator.status}
                creatorContactPhoneNumber={creator.creatorContactPhoneNumber}
                creatorContactEmailAddress={creator.creatorContactEmailAddress}
                image={creator.image}
                token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              updateLearningPathInfoInfo={updateLearningPathInfoInfo}
              path={path}
            />
          ))}
           </Box>
        </Grid>
       


        //This is the new code for Card implementation
        // <Box>
         
        //     <AllProductsInCardDesign
        //      creatorsList={creatorsList}
              
        //         token={props.token}
        //         userId={props.userId}
        //         setToken={props.setToken}
        //         setUserId={props.setUserId}
        //         updateLearningPathInfoInfo={updateLearningPathInfoInfo}
        //         path={path}
        //     />
        

        // </Box>
       
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        //This is teh first design for Card implementation

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
        <Box>
     
          {creatorsList.map((creator, index) => (
            <AllCreatorsOnList
            name={creator.name}
            creatorId={creator.id}
            key={`${creator.id}${index}`}
            bio={Str(creator.bio)
              .limit(500, "...")
              .get()}
              //bio={course.bio}
              user={creator.user}
              currency={creator.currency}
              videoPrice={creator.videoPrice}
              videoHookPrice={creator.videoHookPrice}
              videoDeliveryDays={creator.videoDeliveryDays}
              soundPrice={creator.soundPrice}
              soundHookPrice={creator.soundHookPrice}
              soundDeliveryDays={creator.soundDeliveryDays}
              age={creator.age}
              gender={creator.gender}
              rate={creator.rate}
              country={creator.country}
              category={creator.category}
              niches={creator.niches}
              languages={creator.languages}
              slug={creator.slug}
              status={creator.status}
              creatorContactPhoneNumber={creator.creatorContactPhoneNumber}
              creatorContactEmailAddress={creator.creatorContactEmailAddress}
              image={creator.image}
              token={props.token}
            userId={props.userId}
            setToken={props.setToken}
            setUserId={props.setUserId}
            updateLearningPathInfoInfo={updateLearningPathInfoInfo}
            path={path}
            />
          ))}
       </Box>
    </Grid>
        
        
    //This is the second design for Card implementation
        
        // <Box>         
        //     <AllProductsInCardDesign
        //      creatorsList={creatorsList}
              
        //         token={props.token}
        //         userId={props.userId}
        //         setToken={props.setToken}
        //         setUserId={props.setUserId}
        //         updateLearningPathInfoInfo={updateLearningPathInfoInfo}
        //         path={path}
        //     />
        //     </Box>
      }
    </React.Fragment>
  );

  return (
    <>
      {/* <Grid container direction="row" className={classes.mainContainer}> */}
      <Grid container direction="row" className={classes.root}>
        {/* <section className={classes.root}> */}
       

       <InfluencersBoard />
        <ServicePreferences
          //updateCourseTypeHandler={updateCourseTypeHandler}
          updateAgePathInfoHandler={updateAgePathInfoHandler}
          updatePricePathHandler={updatePricePathHandler}
          updateGenderPathHandler={updateGenderPathHandler}
          updateLanguagePathHandler={updateLanguagePathHandler}
          updateNichePathHandler={updateNichePathHandler}
          updateCountryPathHandler={updateCountryPathHandler}
          updatePlatformPathHandler={updatePlatformPathHandler}
          updateServicePathInfoInfo={updateServicePathInfoInfo}
          updateCountryCodeHandler={updateCountryCodeHandler}
          token={props.token}
          userId={props.userId}
          setToken={props.setToken}
          setUserId={props.setUserId}
          policy={props.policy}
          handleMakeOpenSignUpDialogStatus={handleMakeOpenSignUpDialogStatus}
          handleMakeOpenLoginFormDialogStatus={handleMakeOpenLoginFormDialogStatus}
          handleSuccessfulSignUpDialogOpenStatusWithSnackbar={handleSuccessfulSignUpDialogOpenStatusWithSnackbar}
          handleFailedSignUpDialogOpenStatusWithSnackbar={handleFailedSignUpDialogOpenStatusWithSnackbar}
          handleMakeOpenInfluencerSignUpDialogStatus={handleMakeOpenInfluencerSignUpDialogStatus}
          handleSuccessfulSignUpInfluencerDialogOpenStatusWithSnackbar={handleSuccessfulSignUpInfluencerDialogOpenStatusWithSnackbar}
          handleFailedSignUpDialogInfluencerOpenStatusWithSnackbar={handleFailedSignUpDialogInfluencerOpenStatusWithSnackbar}
          
    
        />

        

        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}
        {/**if there is no course */}
        {!isLoading && creatorsList.length === 0 && (
          <Typography
            variant="h4"
            color="textSecondary"
            component="p"
            style={{ marginTop: 60, marginLeft: 170 }}
          >
            No Influencer Is Found
          </Typography>
        )}
        {/** This is for path = crash-course**/}
       
        {/** This is for path = all**/}
       
        {/* {!isLoading && path === "all" && (
          <Grid item>{allCreatorsList}</Grid>
        )} */}
         {!isLoading && path === "all" && (
          // <Grid item>{allCreatorsList}</Grid>
          <AllProductsInCardDesign
             creatorsList={creatorsList}
             //service={service}
                token={props.token}
                userId={props.userId}
                setToken={props.setToken}
                setUserId={props.setUserId}
                updateLearningPathInfoInfo={updateLearningPathInfoInfo}
                path={path}
            />
        )}
          {renderLoginForm()}
          {renderSignUpForm()}
          {renderForgotPasswordForm()}
          {renderInfluencerSignUpForm()}
        <Grid item className={classes.footer}>
          <UpperFooter />
        </Grid>
      </Grid>
    </>
  );
};

export default InfluencerCentral;
