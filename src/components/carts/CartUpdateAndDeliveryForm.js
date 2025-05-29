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
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../apis/local";
import { EDIT_CART, DELETE_CART } from "../../actions/types";
import CheckoutPage from "./CheckoutPage";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 70,
    marginTop: 30,
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
    // color: "white",
    // backgroundColor: theme.palette.common.green,
    // "&:hover": {
    //   backgroundColor: theme.palette.common.green,
    // },
  },

  removeItem: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 80,
    marginTop: 30,
    marginBottom: 20,
    // color: "white",
    // backgroundColor: theme.palette.common.green,
    // "&:hover": {
    //   backgroundColor: theme.palette.common.green,
    // },
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
      style={{ marginTop: 10, width: 300 }}
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
      style={{ marginTop: 10, width: 300 }}
      onChange={input.onChange}
      multiline
      minRows={2}
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
      style={{ marginTop: 10, width: 300 }}
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

const renderRequestedQuantityField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Requested Learner Slot"
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      //defaultValue={quantity}
      onChange={input.onChange}
      //   inputProps={{
      //     style: {
      //       height: 1,
      //     },

      //   }}
      InputProps={{
        inputProps: {
          min: 1,
          style: {
            height: 1,
          },
          readOnly: true,
        },
      }}
    />
  );
};

function CartUpdateAndDeliveryForm(props) {
  const { price, productId, token, userId } = props;
  const [quantity, setQuantity] = useState(+props.quantity);
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [cartId, setCartId] = useState();
  const [sameProductAlreadyInCart, setSameProductAlreadyInCart] =
    useState(false);
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [recipientName, setRecipientName] = useState();
  const [recipientPhoneNumber, setRecipientPhoneNumber] = useState();
  const [recipientAddress, setRecipientAddress] = useState();

  const [isVisible, setIsVisible] = useState(false);
  const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);
  const [provideDeliveryCost, setProvideDeliveryCost] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [total, setTotal] = useState();
  const [minimumQuantity, setMinimumQuantity] = useState(1);

  const dispatch = useDispatch();

  const classes = useStyles();

  const [loading, setLoading] = useState();
  const [loadingRemoval, setLoadingRemoval] = useState();

  useEffect(() => {
    if (!price) {
      return;
    }
    if (!quantity) {
      return;
    }
    const sum = price * quantity;
    setTotal(sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  }, [price, quantity]);

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          productLocation: location,
          product: productId,
          // isDeleted: false,
        },
      });

      const item = response.data.data.data;

      allData.push({
        id: item[0]._id,
        quantity: item[0].quantity,
        location: item[0].productLocation,
        locationCountry: item[0].locationCountry,
        cartHolder: item[0].cartHolder,
        preferredStartDate: item[0].preferredStartDate,
      });

      if (allData[0].quantity) {
        setProductQuantityInCart(allData[0].quantity);
      }
      if (allData[0].location) {
        setProductLocation(allData[0].location);
      }
      if (allData[0].locationCountry) {
        setProductLocationCountry(allData[0].locationCountry);
      }
      if (allData[0].cartHolder) {
        setCartHolder(allData[0].cartHolder);
      }

      setSameProductAlreadyInCart(true);
      if (allData[0].id) {
        setCartId(allData[0].id);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const onChange = (e) => {
    const quantity = parseFloat(e.target.value);
    setQuantity(quantity);
    const newTotal = quantity * parseFloat(price);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
  };

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

  const renderTotalField = ({
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
        helperText="Course Cost"
        label={label}
        id={input.name}
        name={input.name}
        value={total}
        //defaultValue={total}
        fullWidth
        type={type}
        style={{ marginTop: 10, width: 250 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
              //fontSize: "2em",
            },
          },
          readOnly: true,
        }}
      />
    );
  };

  const renderMinimumQuantityField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText="Minimum Learners Slot Required"
        variant="outlined"
        label={label}
        id={input.name}
        //value={input.value}
        fullWidth
        //required
        type={type}
        {...custom}
        defaultValue={`${minimumQuantity} `}
        onChange={input.onChange}
        //   inputProps={{
        //     style: {
        //       height: 1,
        //     },

        //   }}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 1,
            },
          },
          readOnly: true,
        }}
      />
    );
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
            style={{ width: 140, marginTop: 0, height: 38 }}
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
            style={{ width: 150, marginTop: 0, marginLeft: 30, height: 38 }}
            //{...input}
          >
            {renderLocationList()}
          </Select>
          <FormHelperText style={{ marginLeft: 40 }}>
            State/Region
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  let totalDeliveryCost;

  const diff = +quantity - +props.maxmumQuantityForBaselineDelivery;

  if (diff <= 0) {
    totalDeliveryCost = parseFloat(
      props.baselineDeliveryCostWithinProductLocation
    );
  } else {
    const quantityUnitsForNonBaselineDelivery =
      parseInt(quantity) - parseInt(props.maxmumQuantityForBaselineDelivery);
    const costforNonBaselineDelivery =
      +quantityUnitsForNonBaselineDelivery *
      parseFloat(props.deliveryCostPerUnitWithinProductLocation);
    totalDeliveryCost =
      +costforNonBaselineDelivery +
      parseFloat(props.baselineDeliveryCostWithinProductLocation);
  }

  const totalProductCost = price * quantity + totalDeliveryCost;
  const totalProductCostForDisplay = totalProductCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  const totalDeliveryCostForDisplay = totalDeliveryCost
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,");

  //const amountForPayment = +totalProductCost.toFixed(2) * 100;

  const buttonContent = () => {
    return <React.Fragment>Update</React.Fragment>;
  };

  const offLocationButtonContent = () => {
    return <React.Fragment>Get Me The Delivery Cost</React.Fragment>;
  };

  const checkoutButtonContent = () => {
    return <React.Fragment>Remove from Collection</React.Fragment>;
  };

  console.log('props.creator:', props.creator);
  console.log("props:", props);

  const onItemRemovalSubmit = () => {
    setLoadingRemoval(true);

    let data = {};

    data = {
      isDeleted: true,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${props.cartId}`);

        //if (response.data.status === "success") {
        dispatch({
          type: DELETE_CART,
          //payload: response.data.data.data,
        });

        props.handleSuccessfulCreateSnackbar(
          `This item is removed successfully!!!`
        );

        setLoadingRemoval(false);
        props.cartCounterHandler(-1);
        props.renderCartUpdate(props.cartId);
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    if (!quantity) {
      props.handleFailedSnackbar("The order quantity cannot be empty");
      setLoading(false);
      return;
    }

    if (quantity <= 0) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);
      return;
    }

    if (+quantity < +props.minimumQuantity) {
      props.handleFailedSnackbar(
        "The order quantity cannot be lower than the Minimum Quantity Required(MQR)"
      );
      setLoading(false);
      return;
    }

    let data = {};

    data = {
      quantity: quantity,
      price: props.price,
      currency: props.currency,
      // totalDeliveryCost: totalDeliveryCost,
      contactMeForTheDeliveryCost: false,
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/carts/${props.cartId}`, data);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_CART,
            payload: response.data.data.data,
          });
          //history.push("/");
          props.handleSuccessfulCreateSnackbar(
            `This item is updated successfully!!!`
          );

          setLoading(false);
          props.renderCartUpdate(props.cartId);
          //setIsCheckoutVisible(true);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

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
    <form id="cartUpdateAndDeliveryForm">
      <Box
        sx={{
          width: 400,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
        className={classes.root}
      >
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>
       
        <Typography variant="h5" style={{ color: "black", fontSize: 16, marginTop: 20, marginBottom:20 }}><strong>Influencer's Cumulative Stats In Summary</strong></Typography>
        <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Total Reach</strong>:&nbsp;&nbsp;{totalReach.toLocaleString()}</Typography>
        <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Engagement Rate</strong>:&nbsp;&nbsp;{averageEngagementRate.toLocaleString()}%</Typography>
        {props.currency.name.toLowerCase()==='naira' && <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Cost Per Reach</strong>:&nbsp;&nbsp;&#8358;{averageCostPerReach.toLocaleString()}</Typography>}
        {props.currency.name.toLowerCase()!=='naira' && <Typography variant="h5" style={{ color: "black", fontSize: 15,marginLeft:15 }}><strong>Average Cost Per Reach</strong>:&nbsp;&nbsp;&#36;{averageCostPerReach.toLocaleString()}</Typography>}


        <Button
          variant="outlined"
          //component={Link}
          // to="/mobileapps"
          // to={`/checkouts/${userId}`}
          className={classes.removeItem}
          onClick={onItemRemovalSubmit}
        >
          {loadingRemoval ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            checkoutButtonContent()
          )}
        </Button>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "cartUpdateAndDeliveryForm",
})(CartUpdateAndDeliveryForm);
