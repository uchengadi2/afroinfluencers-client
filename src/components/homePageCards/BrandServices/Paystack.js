import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import api from "./../../../apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
  CREATE_SUBSCRIPTION
} from "./../../../actions/types";
import history from "./../../../history";
import ThankYou from "./../../../components/thankyou/ThankYou";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButtonOld: {
    borderRadius: 10,
    height: 40,
    width: 240,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
   submitButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 170,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
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
    width: 220,
    marginLeft: 170,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  checkoutMobile: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 35,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

function Paystack(props) {
  const dispatch = useDispatch();

  //console.log("this props is at paystack:", props);

  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const config = {
    reference: props.orderNumber,
    //reference:"er0001000177",
    className: matchesMDUp ? classes.checkout :classes.checkoutMobile ,
    email: props.email,
    // email: "uchengad@gmail.com",
    amount: props.amount,
    //amount:2220000,
    publicKey: "pk_test_9181f2dcbb5a6bf2cf56c8f2632eaa5e2fd182cb", //wholeroof test
    //publicKey: "pk_live_5700e72ac96f8aafda7af34e76b1dcfd1b6ec8b2", //wholeroof live
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status == "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  //console.log("the product list is at paystack:", props.productList);

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed paystack");
  };

  console.log('prop isssssssss:',props)

  const componentProps = {
    ...config,
    text: props.text,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const commitDataToDatabase = () => {
    const data = {
     orderNumber: props.data.orderNumber,
        refNumber:props.data.refNumber,
        subscriptionPlan:props.data.subscriptionPlan,
        paidAmount:props.data.paidAmount,
        paymentStatus: props.data.paymentStatus,
        currenyType:props.data.currenyType,
        periodInMonths:props.data.periodInMonths,
        createdBy:props.data.createdBy,
        status: props.data.status,
        brand:props.data.brand,
      
    };

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/creatorSubscriptions`, data);

        //const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_SUBSCRIPTION,
            payload: response.data.data.data,
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

    
    
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your valued patronage. We will confirm your payment and proceed to activate the subscription on your account `
    );
    history.push("/thankyou");
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess}
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
