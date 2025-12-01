import React, { useState, useEffect } from "react";
import { Field, formValues, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import { Container, TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
//import api from "./../../../apis/local";
import { CREATE_COUNTRY, CREATE_SUBSCRIPTION } from "./../../../actions/types";
import ThankYou from "../../thankyou/ThankYou";
import ThankYouWithAccountDetails from "../../thankyou/ThankYouWithAccountDetails";
import api from "./../../../apis/local";
import Paystack from "./Paystack";
import history from "../../../history";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
  },
  rootMobile:{
    marginTop:10,
    maxWidth:'100%',
    width:'95%'
  },
  formStyles: {
    width: 550,
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
  submitMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 35,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  submitDollarsButton: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 155,
    marginTop: 10,
    marginBottom: 20,
     color: "orange",
    backgroundColor: '#F9F8F6',
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
      color:"white"
    },
    
  },
  submitDollarsMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
     color: "orange",
    backgroundColor: '#F9F8F6',
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
      color:"white"
    },
    
  },
}));

const renderCountryNameField = ({
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
      helperText="Enter Country Name"
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
      }}

      // style={{ marginTop: 10 }}

      //onChange={handleInput}
    />
  );
};

const renderSingleLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  defaultValue,
  helperText,
  readOnly,
  min,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      defaultValue={defaultValue}
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
        //readOnly:{readOnly},
        min:1
        
      }}
      
    />
  );
};

const renderMultiLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  rows,
  minRows,
  id,
  min,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      //label={label}
      id={input.name}
      //value={formInput.name}
      fullWidth
      //required
      type={type}
      {...custom}
      multiline={true}
      minRows={minRows}
      onChange={input.onChange}
    />
  );
};



function InfluencerSubscriptionForm(props) {
  const classes = useStyles();
  const [isOnlinePayment, setIsOnlinePayment] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState('annually');
  const [pricePerMonthOnMonthly, setPricePerMonthOnMonthly] = useState(props.policy.monthByMonthSubscriptionRate);
  const [pricePerMonthOnAnnually, setPricePerMonthOnAnnually] = useState(props.policy.monthByAnnualSubscriptionRate)
  const [numberOfMonthForSubscription, setNumberOfMonthForSubscription] = useState(1);
  const [numberOfYearsForSubscription, setNumberOfYearsForSubscription]=useState(1);
  const [totalMonthlySubscriptionCharge, setTotalMonthlySubscriptionCharge] = useState(pricePerMonthOnMonthly * numberOfMonthForSubscription);
   const [totalAnnualSubscriptionCharge, setTotalAnnualSubscriptionCharge] = useState(pricePerMonthOnAnnually *numberOfYearsForSubscription * 12);
// const [totalMonthlySubscriptionCharge, setTotalMonthlySubscriptionCharge] = useState(0);
// const [totalAnnualSubscriptionCharge, setTotalAnnualSubscriptionCharge] = useState(0);
const [loading, setLoading] = useState(false);
const [validForMonthlyOnlinePayment, setValidForMonthlyOnlinePayment] = useState(true);
const [validForAnnualOnlinePayment, setValidForAnnualOnlinePayment] = useState(true);
const [exchangeRate, setExchangeRate] = useState(props.policy.nairaToBaseCurrencyExchangeRate)
  const [vat, setVat] = useState(props.policy.vat/100);

const [paymentMethod, setPaymentMethod] = useState('foreigner');
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));
    const [orderNumber, setOrderNumber] = useState(
      "CRT-" + Math.floor(Math.random() * 10000000000000) + "-" + "ORD"
    );
   const [refNumber, setRefNumber] = useState("SUB-" + Math.floor(Math.random() * 10000000000) + '-REF') 




   //computing the total applicable service charge
     useEffect(() => {
         
         const fetchData = async () => {
          let totalMonthlySubscription = props.policy.monthByMonthSubscriptionRate * numberOfMonthForSubscription;
          let totalAnnualSubscription = props.policy.monthByAnnualSubscriptionRate * numberOfYearsForSubscription * 12;
           setPricePerMonthOnMonthly(props.policy.monthByMonthSubscriptionRate)
           setPricePerMonthOnAnnually(props.policy.monthByAnnualSubscriptionRate)
           setTotalMonthlySubscriptionCharge(totalMonthlySubscription)
           totalAnnualSubscriptionCharge(totalAnnualSubscription)
           setExchangeRate(props.policy.nairaToBaseCurrencyExchangeRate)
         };
     
         //call the function
     
         fetchData().catch(console.error);
       }, [props.policy,numberOfMonthForSubscription,numberOfYearsForSubscription]);


   
  const handleSubscriptionPlanChange = (event) => {
    setSubscriptionPlan(event.target.value);
    if(event.target.value === 'monthly'){
      setNumberOfMonthForSubscription(1);
      setTotalMonthlySubscriptionCharge(pricePerMonthOnMonthly * 1)
    }else if(event.target.value === 'annually'){
      setNumberOfYearsForSubscription(1);
      setTotalAnnualSubscriptionCharge(pricePerMonthOnAnnually * 1 * 12)
    }
  };

  //compute the total number of monthly subsxription charges
const onNumberOfMonthForSubscriptionChange = (event)=>{ 
   setNumberOfMonthForSubscription(event.target.value);
  let val = 0;
  val = event.target.value * pricePerMonthOnMonthly;
  setTotalMonthlySubscriptionCharge(val);

  if(event.target.value >0){
    setValidForMonthlyOnlinePayment(true);
  }
} 

const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === "card") {
      setIsOnlinePayment(true);
    } else {
      setIsOnlinePayment(false);
    }
  };



  //compute the total number of subscription annually
const onNumberOfYearsForSubscriptionChange = (event)=>{ 
   setNumberOfYearsForSubscription(event.target.value);
  let val = 0;
  val = event.target.value * 12 * pricePerMonthOnAnnually;
  setTotalAnnualSubscriptionCharge(val);
  if(event.target.value >0){
    setValidForAnnualOnlinePayment(true)
  }
  

} 
  const renderSubscriptionPlanField = ({
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
            labelId="subscriptionPlan"
            id="subscriptionPlan"
            value={subscriptionPlan}
            onChange={handleSubscriptionPlanChange}
            style={{ width: matchesMDUp ? 500 : 300, height: 38 }}
          >
            <MenuItem value="">{/* <em>None</em> */}</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"annually"}>Annually</MenuItem>
            
          </Select>
          <FormHelperText>Select Subscription Plan</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  

  //computing the total service cost including VAT
 const totalSubscriptionCostAndVat = totalMonthlySubscriptionCharge + (totalMonthlySubscriptionCharge * parseFloat(vat));

 //computing the total annual service cost including VAT
 const totalAnnualSubscriptionCostAndVat = totalAnnualSubscriptionCharge + (totalAnnualSubscriptionCharge * parseFloat(vat));

 let  amountForPayment = 0;
if(subscriptionPlan ==="monthly"){
  amountForPayment = +totalSubscriptionCostAndVat.toFixed(2) * 100;
}else if(subscriptionPlan === "annually"){
  amountForPayment = +totalAnnualSubscriptionCostAndVat.toFixed(2) * 100;
}
   
const paidAmount = subscriptionPlan ==='monthly' ? totalSubscriptionCostAndVat : totalAnnualSubscriptionCostAndVat;
const periodInMonths = subscriptionPlan ==='monthly' ? numberOfMonthForSubscription : numberOfYearsForSubscription * 12;
const paidAmountInDollars = paidAmount/parseFloat(exchangeRate)



  const buttonContent = () => {
    return <React.Fragment> Make Payment in Naira</React.Fragment>;
  };

    const buttonDollarsContent = () => {
    return <React.Fragment> Make Payment in US-Dollars($)</React.Fragment>;
  };



  const onSubmitExceptions = (formValues)=>{
     setLoading(true);

   
    if(subscriptionPlan ==="annually" && !validForAnnualOnlinePayment){
      props.handleFailedSnackbar("The number of years for subscription cannot be negative or 0. Please correct and try again");
      setLoading(false);
      return
    }

    if(subscriptionPlan ==="monthly" && !validForMonthlyOnlinePayment){
      props.handleFailedSnackbar("The number of months for subscription cannot be negative or 0. Please correct and try again");
      setLoading(false);
      return
    }


  }



  const onSubmit = (formValues) => {
    setLoading(true);

  
    const data = {
        orderNumber: orderNumber,
        refNumber:refNumber,
        subscriptionPlan:subscriptionPlan,
        paidAmount:paidAmountInDollars,
        paymentStatus: 'pending-confirmation',
        currenyType:"us-dollars",
        periodInMonths:periodInMonths,
        createdBy:props.userId,
        status: "pending",
        brand:props.brandId,
               
      };

     

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/creatorSubscriptions`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_SUBSCRIPTION,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `Thank you for your valued patronage. We will confirm your payment and proceed to activate the subsxription on your account in 24 hours `
          );
         
          props.handleSubscriptionDialogOpenStatus();
          setLoading(false);
           history.push(`/thankswithaccounts/${orderNumber}/${paidAmount}`)
            return
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
      return 
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
        refNumber:refNumber,
        subscriptionPlan:subscriptionPlan,
        paidAmount:paidAmount,
        paymentStatus: 'pending-confirmation',
        currenyType:"naira",
        periodInMonths:periodInMonths,
        createdBy:props.userId,
        status: "pending",
        brand:props.brandId,
               
      };
      
      return (
        <>
        {subscriptionPlan === 'monthly' && validForMonthlyOnlinePayment && <Paystack
          email={email}
          amount={parseInt(amount)}
          text={" Make Payment in Naira"}
          orderNumber={orderNumber}
          data={data}
          policy={props.policy}
          token={props.token}
          userId={props.userId}
          brand={props.brandId}
          handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
          handleFailedSnackbar={props.handleFailedSnackbar}
        />}
        {subscriptionPlan === 'annually' && validForAnnualOnlinePayment && <Paystack
          email={email}
          amount={parseInt(amount)}
          text={" Make Payment in Naira"}
          orderNumber={orderNumber}
          data={data}
          policy={props.policy}
          token={props.token}
          userId={props.userId}
          brand={props.brandId}
          handleSuccessfulCreateSnackbar={props.handleSuccessfulCreateSnackbar}
          handleFailedSnackbar={props.handleFailedSnackbar}
        />}
        </>
      );
    };


   console.log('policy issss:',props.policy)

   return (
    <>
      {matchesMDUp ? (
        <Grid container direction="row" className={classes.root}>
            <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 500,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleSubscriptionDialogOpenStatus()]}
        />
      </Grid>
          <Grid
            item
            container
            style={{
              width: "100%",
              marginLeft: 5,
              border: "1px dashed grey",
              padding: 15,
            }}
          >
    <Grid item container justifyContent="center">
  <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Subscription Form
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="influencerSubscriptionForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          //height: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="subscriptionPlan"
              name="subscriptionPlan"
              type="text"
              component={renderSubscriptionPlanField}
            />
          </Grid>
         
        </Grid>
        {subscriptionPlan === 'monthly' && <Box>
          
          
           <Container style={{padding:15}}>
            <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}> Subscription Price Per Month: &#8358;{pricePerMonthOnMonthly.toLocaleString('en-US')}</Typography>
            <Typography style={{marginLeft:10, marginTop:1, color:'orange', fontSize:12, marginBottom:30}}>Subscription Price Per Month (US-Dollars):&#x24;{(pricePerMonthOnMonthly/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
           
            <Field
              label=""
              id="numberOfMonthForSubscription"
              name="numberOfMonthForSubscription"
              type="number"
              defaultValue={1}
              helperText="How Many Months Do You Want To Subscribe To?"
              component={renderSingleLineField}
              onChange={onNumberOfMonthForSubscriptionChange}
              style={{ marginTop: 0 }}
              
             
           />

           <Container style={{padding:15}}>
               <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}>Total Monthly Subscription Cost(7.5% VAT Inclusive): &#8358;{totalSubscriptionCostAndVat.toLocaleString('en-US')}</Typography>
              <Typography style={{marginLeft:10, marginTop:10, color:'orange', fontSize:12, marginBottom:30}}>Total Monthly Subscription Cost in US-Dollars(7.5% VAT Inclusive):  &#x24;{(totalSubscriptionCostAndVat/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
          
        </Box>}
        {subscriptionPlan === 'annually' && <Box>
          
          
           <Container style={{padding:15}}>
            <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}> Subscription Price Per Month (billed Annually): &#8358;{pricePerMonthOnAnnually.toLocaleString('en-US')}</Typography>
            <Typography style={{marginLeft:10, marginTop:1, color:'orange', fontSize:12, marginBottom:30}}>Subscription Price Per Month in US-Dollars(billed annually):&#x24;{(pricePerMonthOnAnnually/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
           
            <Field
              label=""
              id="numberOfYearsForSubscription"
              name="numberOfYearsForSubscription"
              type="number"
              defaultValue={1}
              helperText="How Many Years Do You Want To Subscribe To?"
              component={renderSingleLineField}
              onChange={onNumberOfYearsForSubscriptionChange}
              style={{ marginTop: 0 }}
              
             
           />

           <Container style={{padding:15}}>
               <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}>Total Annual Subscription Cost(7.5% VAT Inclusive): &#8358;{totalAnnualSubscriptionCostAndVat.toLocaleString('en-US')}</Typography>
              <Typography style={{marginLeft:10, marginTop:10, color:'orange', fontSize:12, marginBottom:30}}>Total Annual Subscription Cost in US-Dollars(7.5% VAT Inclusive):  &#x24;{(totalAnnualSubscriptionCostAndVat/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
          
        </Box>}
      
       
        <Button
          variant="text"
          className={classes.submitDollarsButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonDollarsContent()
          )}
        </Button>
         {!validForMonthlyOnlinePayment && subscriptionPlan ==='monthly' && <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmitExceptions)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>}
         {!validForAnnualOnlinePayment && subscriptionPlan ==='annually' && <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmitExceptions)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>}
      </Box>
      {/* </form> */}

            {isOnlinePayment &&
              renderOnlinePayment(
                props.customerEmail,
                amountForPayment,
                orderNumber,
                props.customerPhoneNumber,
                props.customerName
              )}
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" className={classes.rootMobile}>
           
         <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 300,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleSubscriptionDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Subscription Form
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="influencerSubscriptionForm"
        // onSubmit={onSubmit}
        sx={{
          width: 300,
          //height: 500,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
        
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "100%" }}>
            <Field
              label=""
              id="subscriptionPlan"
              name="subscriptionPlan"
              type="text"
              component={renderSubscriptionPlanField}
            />
          </Grid>
         
        </Grid>
        {subscriptionPlan === 'monthly' && <Box>
          
          
           <Container style={{padding:15}}>
            <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}> Subscription Price Per Month: &#8358;{pricePerMonthOnMonthly.toLocaleString('en-US')}</Typography>
            <Typography style={{marginLeft:10, marginTop:1, color:'orange', fontSize:12, marginBottom:30}}>Subscription Price Per Month (US-Dollars):&#x24;{(pricePerMonthOnMonthly/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
           
            <Field
              label=""
              id="numberOfMonthForSubscription"
              name="numberOfMonthForSubscription"
              type="number"
              defaultValue={1}
              min={1}
              helperText="How Many Months Do You Want To Subscribe To?"
              component={renderSingleLineField}
              onChange={onNumberOfMonthForSubscriptionChange}
              style={{ marginTop: 0 }}
              
             
           />

           <Container style={{padding:15}}>
               <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}>Total Monthly Subscription Cost(7.5% VAT Inclusive): &#8358;{totalSubscriptionCostAndVat.toLocaleString('en-US')}</Typography>
              <Typography style={{marginLeft:10, marginTop:10, color:'orange', fontSize:12, marginBottom:30}}>Total Monthly Subscription Cost in US-Dollars(7.5% VAT Inclusive):  &#x24;{(totalSubscriptionCostAndVat/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
          
        </Box>}
        {subscriptionPlan === 'annually' && <Box>
          
          
           <Container style={{padding:15}}>
            <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}> Subscription Price Per Month (billed Annually): &#8358;{pricePerMonthOnAnnually.toLocaleString('en-US')}</Typography>
            <Typography style={{marginLeft:10, marginTop:1, color:'orange', fontSize:12, marginBottom:30}}>Subscription Price Per Month in US-Dollars(billed annually):&#x24;{(pricePerMonthOnAnnually/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
           
            <Field
              label=""
              id="numberOfYearsForSubscription"
              name="numberOfYearsForSubscription"
              type="number"
              defaultValue={1}
              min={1}
              helperText="How Many Years Do You Want To Subscribe To?"
              component={renderSingleLineField}
              onChange={onNumberOfYearsForSubscriptionChange}
              style={{ marginTop: 0 }}
              
             
           />

           <Container style={{padding:15}}>
               <Typography style={{marginLeft:10, marginTop:1, color:'green', fontSize:15}}>Total Annual Subscription Cost(7.5% VAT Inclusive): &#8358;{totalAnnualSubscriptionCostAndVat.toLocaleString('en-US')}</Typography>
              <Typography style={{marginLeft:10, marginTop:10, color:'orange', fontSize:12, marginBottom:30}}>Total Annual Subscription Cost in US-Dollars(7.5% VAT Inclusive):  &#x24;{(totalAnnualSubscriptionCostAndVat/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
           </Container>
          
        </Box>}
         {/* {isOnlinePayment &&
              renderOnlinePayment(
                customerEmail,
                amountForPayment,
                orderNumber,
                customerPhoneNumber,
                customerName
              )} */}
    {/* {renderOnlinePayment(
                props.customerEmail,
                amountForPayment,
                orderNumber,
                props.customerPhoneNumber,
                props.customerName
              )}
         */}
       
        <Button
          variant="text"
          className={classes.submitDollarsMobileButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonDollarsContent()
          )}
        </Button>
         {!validForMonthlyOnlinePayment && subscriptionPlan ==='monthly' && <Button
          variant="contained"
          className={classes.submitMobileButton}
          onClick={props.handleSubmit(onSubmitExceptions)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>}
        {!validForAnnualOnlinePayment && subscriptionPlan ==='monthly' && <Button
          variant="contained"
          className={classes.submitMobileButton}
          onClick={props.handleSubmit(onSubmitExceptions)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>}
      </Box>
     {/* </form> */}

            {isOnlinePayment &&
              renderOnlinePayment(props.customerEmail, amountForPayment, orderNumber)}
            {isSuccessful && <ThankYou />}
          </Grid>
        
      )}
    </>
  );
}

export default reduxForm({
  form: "influencerSubscriptionForm",
})(InfluencerSubscriptionForm);



