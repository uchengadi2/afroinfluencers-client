import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
} from "../../actions/types";
import CheckoutPage from "./CheckoutPage";
import Paystack from "../../Paystack";
import history from "../../history";
import ThankYou from "../thankyou/ThankYou";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
    height: 350,
    maxWidth: "100%",
    width: "1380px",
  },
  rootMobile: {
    maxWidth: 350,
    //height: 440,
    //height: 950,
    width: "100%",

    //marginLeft: "-10px",
    //borderRadius: 30,
    marginTop: "2em",
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 210,
    marginLeft: 200,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitAuditButton: {
    borderRadius: 10,
    height: 40,
    width: 380,
    marginLeft: 150,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 210,
    marginLeft: 80,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitAuditButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 70,
    marginTop: 10,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 190,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  bankDetails: {
    fontSize: 12,
    marginBottom: 4,
    padding: 10,
    //width:210
  },
  info: {
    fontSize: 15,
    marginBottom: 4,
    padding: 10,
  },
}));

const renderRecipientNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Name"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 600 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

const renderRecipientAddressField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Address"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      multiline
      minRows={4}
    />
  );
};

const renderRecipientPhoneNumberField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Recipient Phone Number"
      label={label}
      id={input.name}
      name={input.name}
      fullWidth
      type={type}
      //style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
            //fontSize: "2em",
          },
        },
      }}
    />
  );
};

function CheckoutDeliveryAndPayment(props) {
  const theme = useTheme();
  const { totalCost, currency, token, userId } = props;
  const [quantity, setQuantity] = useState(+props.quantity);
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [cartId, setCartId] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [isVisible, setIsVisible] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('foreigner');

  // const [paymentMethod, setPaymentMethod] = useState();

  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [orderDetails, setOrderpDetails] = useState({});
  const [ordered, setOrdered] = useState(false);
  // const [isOnlinePayment, setIsOnlinePayment] = useState(
  //   props.acceptablePaymentOptions === '' && props.isCourseAuditable && props.courseList.length === 1
  //     ? false
  //     : !props.isCourseAuditable && props.acceptablePaymentOptions && props.courseList.length >= 1
  //     ? false
  //     : true
  // );
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const [customerEmail, setCustomerEmail] = useState();
  const [customerName, setCustomerName] = useState();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState();
  const [currencyName, setCurrencyName] = useState(props.currency);
  const [total, setTotal] = useState();
  const [ukRate, setUkRate] = useState(650);
  const [usRate, setUsRate] = useState(560);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const [orderNumber, setOrderNumber] = useState(
    "OR-" + Math.floor(Math.random() * 10000000000000) + "-" + "ES"
  );

  const dispatch = useDispatch();

  const classes = useStyles();
  // const [total, setTotal] = useState(
  //   price
  //     ? (+props.quantity * price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  //     : 0
  // );
  const [loading, setLoading] = useState();

  // useEffect(() => {
  //   // 👇️ scroll to top on page load
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (props.isCourseAuditable && props.courseList.length === 1) {
  //       setIsOnlinePayment(false);
  //       //setPaymentMethod("audit");
  //     } else {
  //       if (
  //         !props.isCourseAuditable &&
  //         props.courseList.length >= 1 &&
  //         props.acceptablePaymentOptions === "only-online"
  //       ) {
  //         setIsOnlinePayment(true);
  //         // setPaymentMethod("card");
  //       } else {
  //         setIsOnlinePayment(false);
  //         //setPaymentMethod("foreigner");
  //       }
  //     }
  //   };

  //   //call the function

  //   fetchData().catch(console.error);
  // }, [props]);

  //get the email address of the customer

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
  }, []);

  

  const onRecipientNameChange = (e) => {
    setRecipientName(e.target.value);
  };

  const onRecipientPhoneNumberChange = (e) => {
    setRecipientPhoneNumber(e.target.value);
  };

  const onRecipientAddressChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value === productLocation) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
    setIsCheckoutVisible(false);
    setProvideDeliveryCost(true);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "card") {
      setIsOnlinePayment(true);
    } else {
      setIsOnlinePayment(false);
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  //get the state list
  const renderLocationList = () => {
    return stateList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
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

  const renderProductCountryField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="locationCountry"
            id="locationCountry"
            value={country}
            onChange={handleCountryChange}
            label="Country"
            style={
              matchesMD
                ? { width: 350, marginLeft: 0, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProductLocationField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            label="Location"
            style={
              matchesMD
                ? { width: 415, marginLeft: 20, height: 38 }
                : { width: 350, height: 38, marginTop: 10 }
            }
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText style={{ marginLeft: 0 }}>
            State/Region
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPaymentMethodField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="paymentMethod"
            id="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            label="Payment Method"
            style={{ height: 38, width: matchesMD ? 380 : 300, marginTop: 0, marginLeft: 10 }}
          >
            {/* {props.isCourseAuditable && props.courseList.length === 1 && (
              <MenuItem value={"audit"}>Audit Course(s) for Free</MenuItem>
            )} */}
            {/* {props.isCourseAuditable &&
              (props.acceptablePaymentOptions === "all-types" ||
                (props.acceptablePaymentOptions === "only-online" && (
                  <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
                )))} */}
            {/* {(props.acceptablePaymentOptions === "all-types" ||
              props.acceptablePaymentOptions === "only-online") && (
              
            )} */}
            <MenuItem value={"card"}>Credit/Debit Card</MenuItem>
            {/* {(props.acceptablePaymentOptions === "all-types" ||
              props.acceptablePaymentOptions === "only-bank-transfer") && (
              <MenuItem value={"foreigner"}>
                Register and Pay Later via Bank Transfer
              </MenuItem>
            )} */}
            
              <MenuItem value={"foreigner"}>
                Make Payment via Bank Transfer
              </MenuItem>
            
          </Select>
          <FormHelperText>
            Payment Method (Choose "Credit/Debit Card" for online card payment for Naira Transactions only)
      
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  let totalDeliveryCost = 0;

  const totalProductCost = parseFloat(props.contractProcessingFeeLocal) + totalDeliveryCost;
  const totalProductCostForUk = totalProductCost / +ukRate;
  const totalProductCostForUS =parseFloat(props.contractProcessingFeeInternational) + totalDeliveryCost;
  const totalProductCostForDisplay = totalProductCost.toLocaleString();
  const totalProductCostForUSDisplay = totalProductCostForUS.toLocaleString();
  

  //   .toFixed(2)
  //   .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // const totalProductCostForUkForDisplay = totalProductCostForUk
  //   .toFixed(2)
  //   .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // const totalProductCostForUsForDisplay = totalProductCostForUS
  //   .toFixed(2)
  //   .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // const totalDeliveryCostForDisplay = totalDeliveryCost
  //   .toFixed(2)
  //   .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const amountForPayment = +totalProductCost.toFixed(2) * 100;

  const buttonContent = () => {
    return <React.Fragment>Initiate Contract(s)</React.Fragment>;
  };

  const buttonAuditContent = () => {
    return (
      <React.Fragment>
        {props.cartList.length === 1
          ? "Audit this Course for FREE"
          : "Audit these Courses for FREE"}
      </React.Fragment>
    );
  };

  const renderThankYou = () => {
    return <ThankYou />;
  };

  


      

  const onSubmit = () => {
    setLoading(true);

    if (!paymentMethod) {
      props.handleFailedSnackbar("the payment method field cannot be empty");
      setLoading(false);
      return;
    }

    const transData = {
      orderNumber: orderNumber,
      recipientName: customerName,
      recipientPhoneNumber: customerPhoneNumber,
      recipientEmailAddress: customerEmail,
      totalLocalContractProcessingFee: props.contractProcessingFeeLocal,
      totalInternationalContractProcessingFee: props.contractProcessingFeeInternational,
      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.userId,
      //productCurrency: "Payment in Naira By Bank Transfer",
      status: "unprocessed",
      brand:props.brand,
      project:props.project,
      totalNumberOfInfluencers:props.cartList.length,     

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

          props.cartList.map((cart, index) => {
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
              contractProcessingFee: cart.currency && cart.currency.name.toLowerCase() === "naira" ? props.policy.contractProcessingFeeForLocals : props.policy.contractProcessingFeeForNonLocals,

              agencyServicePlan: cart.agencyServicePlan,

              cartId: cart.id,
              dateAddedToCart: cart.dateAddedToCart,              
              paymentMethod: paymentMethod,
              paymentStatus: "to-be-confirmed",
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
    props.cartList.map((cart, index) => {
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
      `Thank you for your patronage, we will process your request as soon as possible`
    );
    history.push("/thankyou");
  };


  //this is for the auditing scenario

  const onAuditSubmit = () => {
    setLoading(true);

    if (!paymentMethod) {
      props.handleFailedSnackbar("the payment method field cannot be empty");
      setLoading(false);
      return;
    }

    const transData = {
      orderNumber: orderNumber,
      recipientName: customerName,
      recipientPhoneNumber: customerPhoneNumber,
      recipientEmailAddress: customerEmail,
      totalDeliveryCost: totalDeliveryCost ? totalDeliveryCost.toFixed(2) : 0,
      totalProductCost: totalProductCost,
      totalProductCostUk: totalProductCostForUk,
      totalProductCostUs: totalProductCostForUS,

      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.userId,
      productCurrency: "any",
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

          props.cartList.map((cart, index) => {
            const data = {
              orderNumber: orderNumber,
              transactionId: transId,
              product: cart.course,
              orderedPrice: cart.price,
              recipientName: customerName,
              recipientPhoneNumber: customerPhoneNumber,
              recipientEmailAddress: customerEmail,
              //preferredStartDate: cart.preferredStartDate,

              totalDeliveryCost: totalDeliveryCost
                ? totalDeliveryCost.toFixed(2)
                : 0,
              totalProductCostUk: totalProductCostForUk,
              totalProductCostUs: totalProductCostForUS,

              totalProductCost: totalProductCost,

              cartId: cart.id,
              quantityAdddedToCart: cart.quantity,
              orderedQuantity: cart.quantity,
              dateAddedToCart: cart.dateAddedToCart,
              productCurrency: "any",
              paymentMethod: paymentMethod,
              paymentStatus: "to-be-confirmed",
              orderedBy: cart.cartHolder,

              isCourseAuditable: cart.isCourseAuditable,
              weekdayAuditDays: cart.weekdayAuditDays,
              weekendAuditDays: cart.weekendAuditDays,
              venue: cart.venue,
              venueLink: cart.venueLink,
              weekdaySessionPeriod: cart.weekdaySessionPeriod,
              weekendSessionPeriod: cart.weekendSessionPeriod,
              type: cart.type,
              lectureDuration: cart.lectureDuration,
              projectDuration: cart.projectDuration,
              capstoneProject: cart.capstoneProject,
              passGrade: cart.passGrade,
              hasMentorshipCredit: cart.hasMentorshipCredit,
              mentorshipCredit: cart.mentorshipCredit,
              mentorshipDuration: cart.mentorshipDuration,
              costPerMentorshipCredit: cart.costPerMentorshipCredit,
              videoId: cart.videoId,
              previewVideoId: cart.previewVideoId,
              deliveryMethod: cart.deliveryMethod,
              duration: cart.duration,
              category: cart.category,
              channel: cart.channel,
              programme: cart.programme,
              hasMentorshipCredit: cart.hasMentorshipCredit,
              mentorshipCredit: cart.mentorshipCredit,
              mentorshipDuration: cart.mentorshipDuration,
              costPerMentorshipCredit: cart.costPerMentorshipCredit,
              series: cart.series,
              hasSeries: cart.hasSeries,
              commencementWeekdaysDate: cart.commencementWeekdaysDate,
              commencementWeekendsDate: cart.commencementWeekendsDate,
              isInstallmentalPaymentAllowed: cart.isInstallmentalPaymentAllowed,
              maximumInstallmentalPayment: cart.maximumInstallmentalPayment,
              paymentOptions: cart.paymentOptions,
              slug: cart.slug,
              allowLifeTimeAccess: cart.allowLifeTimeAccess,
              videoType: cart.videoType,
              priceLabel: cart.priceLabel,
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
    props.cartList.map((cart, index) => {
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
      `Thank you for your patronage, see you in class `
    );
    history.push("/thankyou");
  };

  

  const renderOnlinePayment = (
    email,
    amount,
    orderNumber,
    phoneNumber,
    name
  ) => {
    const data = {
      orderNumber: orderNumber,
      recipientName: customerName,
      recipientPhoneNumber: phoneNumber,
      recipientEmailAddress: email,
      totalLocalContractProcessingFee: props.contractProcessingFeeLocal,
      totalInternationalContractProcessingFee: props.contractProcessingFeeInternational,
      paymentMethod: paymentMethod,
      paymentStatus: "to-be-confirmed",
      orderedBy: props.userId,
      //productCurrency: "Payment in Naira By Bank Transfer",
      status: "unprocessed",
      brand:props.brand,
      project:props.project,
      totalNumberOfInfluencers:props.cartList.length,
    };
    
    return (
      <Paystack
        email={email}
        amount={parseInt(amount)}
        text={"Initiate Contract(s) & Pay Online"}
        orderNumber={orderNumber}
        data={data}
        productList={props.cartList}
        policy={props.policy}
        token={props.token}
        handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
        handleFailedSnackbar={props.handleFailedSnackbar}
      />
    );
  };

  return (
    <>
      {matchesMD ? (
        <Grid container direction="row" className={classes.root}>
          <Grid
            item
            container
            style={{
              width: "60%",
              marginLeft: 5,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Grid
              item
              container
              direction="column"
              style={{ marginTop: 10, marginBottom: 10 }}
              justifyContent="center"
            >
              <Box
                sx={{
                  //width: 1200,
                  //height: 450,
                  width: "80%",
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h5">
                  ControlSoft Limited Bank Details(For Naira Transactions Only):
                </Typography>
                
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; First Bank Plc
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp; 2018268898
                </Typography>
                
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp;
                  controlsoftng@gmail.com
                </Typography>

                <Typography>
                  =======================================================================================
                </Typography>

                <Typography variant="h5">
                  ControlSoft Limited Bank Details(For US Dollar Transactions Only):
                </Typography>
               
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; FCMB
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp;  2206083028
                </Typography>
                 <Typography>
                  <strong>SWIFT/BIC: </strong>&nbsp; &nbsp;   FCMBNGLAWEB
                </Typography>
               
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp;
                  controlsoftng@gmail.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            container
            style={{
              width: "35%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >

             <Typography variant="h5" style={{ color: "black", fontSize: 15, marginTop: 20 }}><strong>Total Contract Processing Fee For Other Country Influencers:</strong></Typography>
             <Typography
              style={{
                width: 400,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
                fontWeight:700,
                marginBottom: 10
              }}
            >
              
              &#36;{totalProductCostForUSDisplay}&nbsp;<em style={{fontSize:12}}>(This Payment Should be done Offline)</em>
            </Typography>
            <Typography variant="h5" style={{ color: "black", fontSize: 15, marginTop: 20 }}><strong>Total Contract Processing Fee For Nigeria Infuencers:</strong></Typography>
            <Typography
              style={{
                width: 400,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
                fontWeight:700,
                marginBottom: 30
              }}
            >
              
              &#8358;{totalProductCostForDisplay}&nbsp;<em style={{fontSize:12}}>(This Payment could be done Online or Offline)</em>
            </Typography>
           
            

            {renderPaymentMethodField()}
            {!isOnlinePayment && paymentMethod === "foreigner" && (
              <Typography className={classes.bankDetails}>
                Make payment to the accounts as detailed on the adjacent blocks
              </Typography>
            )}
            {!isOnlinePayment && paymentMethod === "foreigner" && (
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
            )}

            {!isOnlinePayment &&
              paymentMethod === "audit" &&
              props.isCourseAuditable && (
                <Button
                  variant="contained"
                  className={classes.submitAuditButton}
                  onClick={onAuditSubmit}
                >
                  {loading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    buttonAuditContent()
                  )}
                </Button>
              )}

            {isOnlinePayment &&
              renderOnlinePayment(
                customerEmail,
                amountForPayment,
                orderNumber,
                customerPhoneNumber,
                customerName
              )}
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
          <Grid
            item
            container
            style={{
              //width: "60%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
            <Grid
              item
              container
              direction="column"
              style={{ marginTop: 10, marginBottom: 10 }}
              justifyContent="center"
            >
              <Box
                sx={{
                  //width: 1200,
                  //height: 450,
                  width: "80%",
                }}
                noValidate
                autoComplete="off"
              >
                <Typography variant="h5">
                  ControlSoft Limited Bank Details (For Naira Transactions Only):
                </Typography>
                
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; First Bank Plc
                </Typography>
                <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp; 2018268898
                </Typography>
               
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp;
                  controlsoftng@gmail.com
                </Typography>

                <Typography>=====================================</Typography>

                <Typography variant="h5">
                  ControlSoft Limited Bank Details (For US Dollar Transactions Only):
                </Typography>
                
                <Typography>
                  <strong>Pay To:</strong>
                </Typography>
                <Typography>
                  <strong>Beneficiary:</strong> &nbsp; &nbsp; ControlSoft
                  Limited
                </Typography>
                <Typography>
                  <strong>Bank Name: </strong>&nbsp; &nbsp; FCMB
                </Typography>
               <Typography>
                  <strong>Account Number: </strong>&nbsp; &nbsp;  2206083028
                </Typography>
                 <Typography>
                  <strong>SWIFT/BIC: </strong>&nbsp; &nbsp;   FCMBNGLAWEB
                </Typography>
                <Typography style={{ marginTop: 15 }}>
                  Send proof of payment to: &nbsp; &nbsp;
                  controlsoftng@gmail.com
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            container
            style={{
              // width: "34%",
              marginLeft: 15,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
             <Typography variant="h5" style={{ color: "black", fontSize: 15, marginTop: 20 }}><strong>Total Contract Processing Fee For Other Country Influencers:</strong></Typography>
             <Typography
              style={{
                width: 400,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
                fontWeight:700,
                marginBottom: 10
              }}
            >
              
              &#36;{totalProductCostForUSDisplay}&nbsp;<em style={{fontSize:12}}>(This Payment Should be done Offline)</em>
            </Typography>
            <Typography variant="h5" style={{ color: "black", fontSize: 15, marginTop: 20 }}><strong>Total Contract Processing Fee For Nigeria Infuencers:</strong></Typography>
            <Typography
              style={{
                width: 400,
                fontSize: 20,
                marginTop: 15,
                marginLeft: 10,
                fontWeight:700,
                marginBottom: 30
              }}
            >
              
              &#8358;{totalProductCostForDisplay}&nbsp;<em style={{fontSize:12}}>(This Payment could be done Online or Offline)</em>
            </Typography>

            {renderPaymentMethodField()}
            {!isOnlinePayment && paymentMethod && (
              <Typography className={classes.bankDetails}>
                Make payment to the accounts as detailed on the adjacent blocks
              </Typography>
            )}
            {!isOnlinePayment && paymentMethod === "foreigner" && (
              <Button
                variant="contained"
                className={classes.submitButtonMobile}
                // onClick={[onSubmit, <ThankYou />]}
                 onClick={[onSubmit]}
                 //style={{width:280}}
              >
                {loading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : (
                  buttonContent()
                )}
              </Button>
              
            )}
            {!isOnlinePayment &&
              paymentMethod === "audit" &&
              props.isCourseAuditable && (
                <Button
                  variant="contained"
                  className={classes.submitAuditButtonMobile}
                  onClick={onAuditSubmit}
                >
                  {loading ? (
                    <CircularProgress size={30} color="inherit" />
                  ) : (
                    buttonAuditContent()
                  )}
                </Button>
              )}

            {isOnlinePayment &&
              renderOnlinePayment(customerEmail, amountForPayment, orderNumber)}
            {isSuccessful && <ThankYou />}
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default reduxForm({
  form: "checkoutDeliveryAndPayment",
})(CheckoutDeliveryAndPayment);
