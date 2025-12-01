import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";

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
import CartProductCard from "./CartProductCard";
import UpperFooter from "../ui/UpperFooter";
import { CREATE_ORDER, CREATE_TRANSACTION, DELETE_CART, EDIT_CART } from "../../actions/types";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "40vh",
    marginTop: "4em",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
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
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 410,
    marginLeft: 950,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 55,
    width: '100%',
    //marginLeft: 1100,
    marginLeft: 120,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },


   submitSubscriptionButton: {
    borderRadius: 10,
    height: 40,
    width: 320,
    marginLeft: 1000,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitSubscriptionButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: '100%',
    //marginLeft: 1100,
    marginLeft: 120,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },


  
}));

function ShowCustomerCart(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [cartProductList, setCartProductList] = useState([]);
  const [cartProductListForSubscription, setCartProductListForSubscription] = useState([]);
  const [cartProductListForManagedService, setCartProductListForManagedService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCart, setUpdateCart] = useState();
  const [count, setCount] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [isOnsubscription, setIsOnSubscription] = useState(false);
  const [isOnManagedService, setIsOnManagedService] = useState(false);
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [orderNumber, setOrderNumber] = useState(
      "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "ES"
    );
  

  const dispatch = useDispatch();

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

  const cartHolder = props.userId;

  const renderCartUpdate = (value) => {
    setUpdateCart(value);
  };



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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: cartHolder,
          status: "unmarked-for-checkout",
          //isDeleted: false,
        },
      });
      const items = response.data.data.data;

      if (!items) {
        return;
      }

      items.map((cart) => {
        allData.push({
          id: cart._id,
          creator: cart.creator,
          brand: cart.brand,
          cartHolder: cart.cartHolder,
          dateAddedToCart: cart.dateAddedToCart,
          refNumber: cart.refNumber,
          quantity: cart.quantity,
          status: cart.status,
          agencyServicePlan:cart.agencyServicePlan,
          project: cart.project,
          creativeLanguage: cart.creativeLanguage,
          currency: cart.currency,
          slug: cart.slug,
          creatorImage: cart.creatorImage,
          platforms: cart.platforms,
          facebookPostQuantity: cart.facebookPostQuantity,
          instagramPostQuantity: cart.instagramPostQuantity,
          twitterPostQuantity: cart.twitterPostQuantity,
          tiktokPostQuantity: cart.tiktokPostQuantity,
          linkedInPostQuantity: cart.linkedInPostQuantity,
          blogPostQuantity: cart.blogPostQuantity,
          servicePreference:cart.servicePreference

        });
      });

      if (!allData) {
        return;
      }
      setCartProductList(allData);
      setIsLoading(false);
      for(let item = 0;item<allData.length;++item){
        if(allData[item].servicePreference ==="subscription"){
          setIsOnSubscription(true)
          //setCartProductListForSubscription(allData[item]);
        }
          
      }
      for(let item = 0;item<allData.length;++item){
        if(allData[item].servicePreference ==="managed"){
          setIsOnManagedService(true)
          //setCartProductListForManagedService(allData[item])
        }
          
      }

      
    };

    //call the function

    fetchData().catch(console.error);
  }, [updateCart]);


//retrieve logged in user details
  useEffect(() => {
      const fetchData = async () => {
        let allData = [];
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/users/${props.userId}`);
        const user = response.data.data.data;
        allData.push({
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phoneNumber,
        });
        setCustomerEmail(allData[0].email);
        setCustomerName(allData[0].name);
        setCustomerPhoneNumber(allData[0].phone);
      };
  
      //call the function
  
      fetchData().catch(console.error);
    }, [props.userId, props.token]);
  

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const Str = require("@supercharge/strings");

  const cartList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {cartProductList.map((cart, index) => (
            <CartProductCard
              creator={cart.creator}
              brand={cart.brand}
              agencyServicePlan={cart.agencyServicePlan}
              project={cart.project}
              creativeLanguage={cart.creativeLanguage}
              currency={cart.currency}
              slug={cart.slug}
              platforms={cart.platforms}
              facebookPostQuantity={cart.facebookPostQuantity}
              instagramPostQuantity={cart.instagramPostQuantity}
              twitterPostQuantity={cart.twitterPostQuantity}
              tiktokPostQuantity={cart.tiktokPostQuantity}
              linkedInPostQuantity={cart.linkedInPostQuantity}
              blogPostQuantity={cart.blogPostQuantity}
              blogCostPerPost={cart.creator.blogCostPerPost}
              image={cart.creatorImage}
              key={`${cart.id}${index}`}
              cartHolder={cart.cartHolder}
              cartId={cart.id}
              dateAddedToCart={cart.dateAddedToCart}
              //preferredStartDate={cart.preferredStartDate}
              cartCounterHandler={props.cartCounterHandler}
              refNumber={cart.refNumber}
              servicePreference={cart.servicePreference}
             // quantity={cart.quantity}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              renderCartUpdate={renderCartUpdate}
              renderCartUpdateAfterRemoval={props.renderCartUpdateAfterRemoval}
         
            />
          ))}
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
          {cartProductList.map((cart, index) => (
            <CartProductCard
              creator={cart.creator}
              brand={cart.brand}
              agencyServicePlan={cart.agencyServicePlan}
              project={cart.project}
              creativeLanguage={cart.creativeLanguage}
              currency={cart.currency}
              slug={cart.slug}
              platforms={cart.platforms}
              facebookPostQuantity={cart.facebookPostQuantity}
              instagramPostQuantity={cart.instagramPostQuantity}
              twitterPostQuantity={cart.twitterPostQuantity}
              tiktokPostQuantity={cart.tiktokPostQuantity}
              linkedInPostQuantity={cart.linkedInPostQuantity}
              blogPostQuantity={cart.blogPostQuantity}
              blogCostPerPost={cart.creator.blogCostPerPost}
              image={cart.creatorImage}
              key={`${cart.id}${index}`}
              cartHolder={cart.cartHolder}
              cartId={cart.id}
              dateAddedToCart={cart.dateAddedToCart}
              //preferredStartDate={cart.preferredStartDate}
              cartCounterHandler={props.cartCounterHandler}
              refNumber={cart.refNumber}
              servicePreference={cart.servicePreference}
             // quantity={cart.quantity}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              handleCartItemForCheckoutBox={props.handleCartItemForCheckoutBox}
              handleSuccessfulCreateSnackbar={
                props.handleSuccessfulCreateSnackbar
              }
              handleFailedSnackbar={props.handleFailedSnackbar}
              renderCartUpdate={renderCartUpdate}
              renderCartUpdateAfterRemoval={props.renderCartUpdateAfterRemoval}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );



  const buttonContent = () => {
    return <React.Fragment>Forward "Managed Service Influencers" to Checkout</React.Fragment>;
  };


    const buttonSubscriptionContent = () => {
    return <React.Fragment>Add Influencers to Subscription List</React.Fragment>;
  };


   

   


  const onSubmit = () => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    let data = {
      status: "marked-for-checkout",
    };

    let allData = [];

    
    cartProductList.map((cart) => {
      allData.push({
        id: cart.id,
        servicePreference:cart.servicePreference
      });
    });

   


    let count;

    for (count = 0; count < allData.length; ++count) {
      if (data && allData[count].servicePreference ==='managed') {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.patch(`/carts/${allData[count].id}`, data);

          if (response.data.status === "success") {
            dispatch({
              type: EDIT_CART,
              payload: response.data.data.data,
            });

            setLoading(false);
            // setIsCheckoutVisible(true);
          } else {
            // props.handleFailedSnackbar(
            //   "Something went wrong, please try again!!!"
            // );
          }
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        //props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    }

    if (+count > 0) {
      // props.handleSuccessfulCreateSnackbar(
      //   `Please proceed to checkout page to effect payment!`
      // );
    } else {
      //props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }

    history.push(`/checkouts`);
  };







  //adding influencers to subscription list
  const onSubscriptionListSubmit = () => {
      setLoading(true);


      //get all items for only sunscription preference

   let allSubs = [];
     cartProductList.map((cart) => {
      if(cart.servicePreference ==='subscription'){
          allSubs.push(
         
          cart
      );
      }
      
    });
     
      const transData = {
        orderNumber: orderNumber,
        recipientName: customerName,
        recipientPhoneNumber: customerPhoneNumber,
        recipientEmailAddress: customerEmail,
        totalLocalContractProcessingFee: 0,
        totalInternationalContractProcessingFee: 0,
        paymentMethod: "not-applicable",
        paymentStatus: "not-applicable",
        orderedBy: props.userId,
        //productCurrency: "Payment in Naira By Bank Transfer",
        status: "unprocessed",
        brand:allSubs[0].brand,
        //project:props.project,
        totalNumberOfInfluencers:allSubs.length,
        servicePreference:"subscription",    
  
      };
  
         //write to the transaction table first
      if (transData) {
        const createForm = async () => {
          api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          const response = await api.post(`/transactions`, transData);
  
         const transId = response.data.data.data.id;
  
          if (response.data.status === "success") {
            dispatch({
              type: CREATE_TRANSACTION,
              payload: response.data.data.data,
            });
  
            setLoading(false);
  
            allSubs.map((cart, index) => {
              let cumulativeAgencyServiceFee = 0;
              let totalProjectCost = 0;
              if(cart.platforms.includes("facebook")){
                totalProjectCost = totalProjectCost + cart.facebookPostQuantity * cart.creator.facebookCostPerPost
              }else if(cart.platforms.includes('instagram')){
                totalProjectCost += cart.instagramPostQuantity * cart.creator.instagranCostPerPost
              }else if(cart.platforms.includes('twitter')){
                totalProjectCost += cart.twitterPostQuantity * cart.creator.twiiterCostPerPost
              }else if(cart.platforms.includes('tiktok')){
                totalProjectCost += cart.tiktokPostQuantity * cart.creator.tiktokCostPerPost
              }else if(cart.platforms.includes('linkedin')){
                totalProjectCost += cart.linkedInPostQuantity * cart.creator.linkedInCostPerPost
              }else if(cart.platforms.includes('blog')){
                totalProjectCost += cart.blogCostPerPost * cart.creator.blogCostPerPost
              }
              //computing cumulative agency service plan
              if (cart.agencyServicePlan === "platinum") {
                cumulativeAgencyServiceFee = props.policy.platinumAgencyServiceFee/100 * totalProjectCost;
              } else if (cart.agencyServicePlan === "gold") {
                cumulativeAgencyServiceFee = props.policy.goldAgencyServiceFee/100 * totalProjectCost;
              }else if (cart.agencyServicePlan === "bronze") {
                if(cart.platforms && cart.platforms.includes('facebook')){
                  if(cart.creator.facebookCategory === "celebrity-influencer"){
                    cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                  }else if(cart.creator.facebookCategory === "mega-influencer"){
                    cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                  }else if(cart.creator.facebookCategory === "macro-influencer"){
                    cumulativeAgencyServiceFee =props.policy.macroInfluencerRecruitmentFee
                  }else if(cart.creator.facebookCategory === "micro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                  }else if(cart.creator.facebookCategory === "nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                  }else if(cart.creator.facebookCategory === "sub-nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                  }
                }
                if(cart.platforms && cart.platforms.includes('instagram')){
                  if(cart.creator.instagramCategory === "celebrity-influencer"){
                    cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                  }else if(cart.creator.instagramCategory === "mega-influencer"){
                    cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                  }else if(cart.creator.instagramCategory === "macro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                  }else if(cart.creator.instagramCategory === "micro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                  }else if(cart.creator.instagramCategory === "nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                  }else if(cart.creator.instagramCategory === "sub-nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                  }
                }
                if(cart.platforms && cart.platforms.includes('twitter')){
                  if(cart.creator.twitterCategory === "celebrity-influencer"){
                    cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                  }else if(cart.creator.twitterCategory === "mega-influencer"){
                    cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                  }else if(cart.creator.twitterCategory === "macro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                  }else if(cart.creator.twitterCategory === "micro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                  }else if(cart.creator.twitterCategory === "nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                  }else if(cart.creator.twitterCategory === "sub-nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                  }
                }
                if(cart.platforms && cart.platforms.includes('tiktok')){
                  if(cart.creator.tiktokCategory === "celebrity-influencer"){
                    cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                  }else if(cart.creator.tiktokCategory === "mega-influencer"){
                    cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                  }else if(cart.creator.tiktokCategory === "macro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                  }else if(cart.creator.tiktokCategory === "micro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                  }else if(cart.creator.tiktokCategory === "nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                  }else if(cart.creator.tiktokCategory === "sub-nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                  }
                }
                if(cart.platforms && cart.platforms.includes('linkedin')){
                  if(cart.creator.linkedInCategory === "celebrity-influencer"){
                    cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                  }else if(cart.creator.linkedInCategory === "mega-influencer"){
                    cumulativeAgencyServiceFee =props.policy.megaInfluencerRecruitmentFee
                  }else if(cart.creator.linkedInCategory === "macro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                  }else if(cart.creator.linkedInCategory === "micro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                  }else if(cart.creator.linkedInCategory === "nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                  }else if(cart.creator.linkedInCategory === "sub-nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                  }
                }
                if(cart.platforms && cart.platforms.includes('blog')){
                  if(cart.creator.blogCategory === "celebrity-influencer"){
                    cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                  }else if(cart.creator.blogCategory === "mega-influencer"){
                    cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                  }else if(cart.creator.blogCategory === "macro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                  }else if(cart.creator.blogCategory === "micro-influencer"){
                    cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                  }else if(cart.creator.blogCategory === "nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                  }else if(cart.creator.blogCategory === "sub-nano-influencer"){
                    cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                  }
                }
              }
  
              const data = {
                orderNumber: orderNumber,
                transactionId: transId,
                creator: cart.creator.id,
                brand: cart.brand.id,
                project: cart.project.id,
                recipientName: customerName,
                recipientPhoneNumber: customerPhoneNumber,
                recipientEmailAddress: customerEmail,
                platforms: cart.platforms,
                currency: cart.currency.id,
                contractProcessingFee: 0,
                servicePreference:"subscription",
  
                agencyServicePlan: "not-applicable",
  
                cartId: cart.id,
                dateAddedToCart: cart.dateAddedToCart,              
                paymentMethod: "not-applicable",
                paymentStatus: "not-applicable",
                orderedBy: cart.cartHolder,
  
                //cumulativeAgencyServiceFee: cumulativeAgencyServiceFee,
                facebookPostQuantity: cart.platforms && cart.platforms.includes('facebook') ?cart.facebookPostQuantity :0,
                instagramPostQuantity: cart.platforms && cart.platforms.includes('instagram') ? cart.instagramPostQuantity:0,
                twitterPostQuantity: cart.platforms && cart.platforms.includes('twitter') ? cart.twitterPostQuantity:0,
                tiktokPostQuantity: cart.platforms && cart.platforms.includes('tiktok') ? cart.tiktokPostQuantity :0,
                linkedInPostQuantity: cart.platforms && cart.platforms.includes('linkedin') ? cart.linkedInPostQuantity :0,
                blogPostQuantity: cart.platforms && cart.platforms.includes('blog') ? cart.blogPostQuantity :0,
                facebookProfileLink: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookProfileLink : "",
                instagramProfileLink: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramProfileLink : "",
                twitterProfileLink: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterProfileLink : "",
                tiktokProfileLink: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokProfileLink: "",
                linkedInProfileLink: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInProfileLink : "",
                blogSiteLink: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogSiteLink: "",
  
                facebookTotalFollowers: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookTotalFollowers :0,
                instagramTotalFollowers: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramTotalFollowers:0,
                twitterTotalFollowers: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterTotalFollowers:0,
                tiktokTotalFollowers: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokTotalFollowers:0,
                linkedInTotalFollowers: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInTotalFollowers:0,
                blogTotalVisitorsPerMonth: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogTotalVisitorsPerMonth:0,
  
                facebookEngagementRate: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookEngagementRate:0,
                instagramEngagementRate: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramEngagementRate:0,
                twitterEngagementRate: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterEngagementRate :0,
                tiktokEngagementRate: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokEngagementRate:0,
                linkedInEngagementRate: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInEngagementRate:0,
  
                facebookCostPerPost: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookCostPerPost :0,
                instagramCostPerPost: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramCostPerPost:0,
                twitterCostPerPost: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterCostPerPost :0,
                tiktokCostPerPost: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokCostPerPost:0,
                linkedInCostPerPost: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInCostPerPost:0,
                blogCostPerPost: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogCostPerPost:0,
                blogPostCostDuration: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogPostCostDuration:"weekly",
  
                facebookCategory: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookCategory: "",
                instagramCategory: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramCategory: "",
                twitterCategory: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterCategory: "",
                tiktokCategory: cart.platforms && cart.platforms.includes('tiktok') ?cart.creator.tiktokCategory: "",
                linkedInCategory: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInCategory: "",
                blogCategory: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogCategory: "",
                
                slug: cart.slug,
                
              };
  
             
  
              if (data) {
                const createForm = async () => {
                  api.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${props.token}`;
                  const response2 = await api.post(`/orders`, data);
  
                  if (response2.data.status === "success") {
                    dispatch({
                      type: CREATE_ORDER,
                      payload: response2.data.data.data,
                    });
  
                    setLoading(false);
                  } else {
                    props.handleFailedSnackbar(
                      "Something went wrong, please try again!!!"
                    );
                  }
                };
                createForm().catch((err) => {
                  //props.handleFailedSnackbar();
                  console.log("err:", err.message);
                });
              } else {
                //props.handleFailedSnackbar("Something went wrong, please try again!!!");
              }
            });
          } else {
            // props.handleFailedSnackbar(
            //   "Something went wrong, please try again!!!"
            // );
          }
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      }
  
      const cartData = {
        status: "checkedout",
      };
  
      //change the status of this cart items
      allSubs.map((cart, index) => {
        const createForm = async () => {
          api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          await api.delete(`/carts/${cart.id}`);
  
          dispatch({
            type: DELETE_CART,
            //payload: response2.data.data.data,
          });
        };
        createForm().catch((err) => {
          props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      });
      props.handleSuccessfulCreateSnackbar(
        `These influencers  are successfully added to the subscription list`
      );
      history.push("/");
    };




  return (
    <Grid container direction="row" className={classes.root}>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        {/* <Button
          variant="contained"
          className={classes.submitButton}
          onClick={onSubmit}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button> */}
        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}

        {!isLoading && cartProductList.length === 0 ? (
          <p style={{ marginTop: 20, marginLeft: 10 }}>
            There are no items in your collection
          </p>
        ) : (
          <Grid item>{cartList}</Grid>
        )}
        {/*....INFORMATION BLOCK....*/}
      </Grid>

      {matchesMD
        ? !isLoading && isOnManagedService && 
          (cartProductList.length === 0 ? (
            ""
          ) : (

            <Button
              variant="contained"
              className={classes.submitButton}
              onClick={onSubmit}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonContent()
              )}
            </Button>
          ))
        : !isLoading && isOnManagedService && (
            <Button
              variant="contained"
              className={classes.submitButtonMobile}
              onClick={onSubmit}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonContent()
              )}
            </Button>
          )}

           {matchesMD
        ? !isLoading && isOnsubscription && 
          (cartProductList.length === 0 ? (
            ""
          ) : (

            <Button
              variant="contained"
              className={classes.submitSubscriptionButton}
              onClick={onSubscriptionListSubmit}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonSubscriptionContent()
              )}
            </Button>
          ))
        : !isLoading && isOnsubscription && (
            <Button
              variant="contained"
              className={classes.submitSubscriptionButtonMobile}
              onClick={onSubscriptionListSubmit}
            >
              {loading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                buttonSubscriptionContent()
              )}
            </Button>
          )}

          

      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default ShowCustomerCart;
