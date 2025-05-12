import React, { useState,useEffect } from "react";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container, TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../../apis/local";
import { CREATE_CATEGORY } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 130,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  cancelButton: {
    submitButton: {
      borderRadius: 10,
      height: 40,
      width: 100,
      marginLeft: 5,
      marginTop: 40,
      color: "black",
      backgroundColor: theme.palette.common.grey,
      "&:hover": {
        backgroundColor: theme.palette.common.grey,
      },
    },
  },
}));

const renderNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  readOnly,
  helperText,
  id,
  defaultValue,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={defaultValue}
      fullWidth
      //required
      type={type}
      {...custom}
      onChange={input.onChange}
      inputProps={{
        style: {
          height: 1,
        },
        readOnly: readOnly,
      }}
    />
  );
};


const renderMultiLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  rows,
  helperText,
  readOnly,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText={helperText}
      label={label}
      id={input.name}
      name={input.name}
      defaultValue={input.value}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={rows}
      inputProps={{
        
        readOnly: readOnly,
      }}
      {...custom}
      onChange={input.onChange}
    />
  );
};




function GetPayOutDetails(props) {
const {params, token, userId} = props;
  const classes = useStyles();
  const [platformRate, setPlatformRate] = useState();
    const [updatePage, setUpdatePage] = useState(false);
    const [minimumPlatformCharge, setMinimumPlatformCharge] = useState();
    const [vat, setVat] = useState();
    const [policyId, setPolicyId] = useState();
    const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState();
    const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState();
   
  const [loading, setLoading] = useState(false);


  useEffect(() => {
            const fetchData = async () => {
              let allData = {};
              api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              const response = await api.get(`/policies`);
              const workingData = response.data.data.data;
                  
             
             if(workingData.length > 0){
              
       
              setPlatformRate(workingData[0].platformRate);
              setMinimumPlatformCharge(workingData[0].minimumPlatformCharge);
              setVat(workingData[0].vat);
              setPlatformRateIsIncludedAsPartOfUserInputedAmount(workingData[0].platformRateIsIncludedAsPartOfUserInputedAmount);
              setVatIsIncludedAsPartOfUserInputedAmount(workingData[0].vatIsIncludedAsPartOfUserInputedAmount);
              setPolicyId(workingData[0]._id);
              setLoading(false);
              
              }else{
                setLoading(false);
             }
              
            };
        
            //call the function
        
            fetchData().catch(console.error);
          }, []);

 
  //const dispatch = useDispatch();

  
  


  const buttonContent = () => {
    return <React.Fragment> Close</React.Fragment>;
  };

  
  
let totalAmountReceived = 0;
let amountToCreator = 0;
let amountToPlatform = 0;  
let vatAmount = 0;

    totalAmountReceived = (params[0].orderedCreativePricePerUnit * params[0].orderedCreativeQuantity) + params[0].orderedHookPricePerUnit * params[0].orderedHookQuantity;
    amountToCreator = (1-platformRate/100) * totalAmountReceived;
    amountToPlatform = (platformRate/100) * totalAmountReceived;
    vatAmount = (vat/100) * totalAmountReceived;
    

  return (
    <form id="getPayOutDetails">
      <Box
        // component="form"
        // id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
          width: 350,
          //height: 430,
        }}
        noValidate
        autoComplete="off"
      >
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
            onClick={() => [props.handleDialogOpenStatus()]}
          />
        </Grid>
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        >
          <FormLabel
            style={{ color: "grey", fontSize: "1.2em" }}
            component="legend"
          >
            View Payout Details
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="projectName"
          name="projectName"
          defaultValue={params[0].projectName}
          type="text"
          helperText="Project Name"
          readOnly={true}
          style={{marginTop: 10}}
          component={renderNameField}

        />
        <Field
          label=""
          id="paymentMethod"
          name="paymentMethod"
          defaultValue={params[0].paymentMethod}
          type="text"
          helperText="Payment Method"
          readOnly={true}
          component={renderNameField}
        />
         <Field
          label=""
          id="paymentStatus"
          name="paymentStatus"
          defaultValue={params[0].paymentStatus}
          type="text"
          helperText="Payment Status"
          readOnly={true}
          component={renderNameField}
        />
        <Field
          label=""
          id="creativeType"
          name="creativeType"
          defaultValue={params[0].creativeType}
          type="text"
          helperText="Required Creative Language"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="brandName"
          name="brandName"
          defaultValue={params[0].brandName}
          type="text"
          helperText="Brand Name"
          readOnly={true}
          component={renderNameField}
        />
         <Field
          label=""
          id="brandCountry"
          name="brandCountry"
          defaultValue={params[0].brand ? params[0].brand[0].country[0].name : ""}
          type="text"
          helperText="Brand Country"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="creatorName"
          name="creatorName"
          defaultValue={params[0].creator.name}
          type="text"
          helperText="Creator Name"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="creatorCountry"
          name="creatorCountry"
          defaultValue={params[0].creator.country[0].name}
          type="text"
          helperText="Creator Country"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="orderedCreativeQuantity"
          name="orderedCreativeQuantity"
          defaultValue={params[0].orderedCreativeQuantity}
          type="text"
          helperText="Ordered Creative Quantity"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="orderedHookQuantity"
          name="orderedHookQuantity"
          defaultValue={params[0].orderedHookQuantity}
          type="text"
          helperText="Ordered Hook Quantity"
          readOnly={true}
          component={renderNameField}
        />
        <Field
          label=""
          id="productCurrency"
          name="productCurrency"
          defaultValue={params[0].productCurrency ? params[0].productCurrency.name:""}
          type="text"
          helperText="Currency"
          readOnly={true}
          component={renderNameField}
        />
        
        
         <Field
          label=""
          id="orderedCreativePricePerUnit"
          name="orderedCreativePricePerUnit"
          defaultValue={params[0].orderedCreativePricePerUnit}
          type="text"
          helperText="Ordered Creative Price Per Unit"
          readOnly={true}
          component={renderNameField}

        />
        {params[0].orderedHookQuantity >=1 && <Field
          label=""
          id="orderedHookPricePerUnit"
          name="orderedHookPricePerUnit"
          defaultValue={params[0].orderedHookPricePerUnit}
          type="text"
          helperText="Ordered Hook Price Per Unit"
          readOnly={true}
          component={renderNameField}

        />}
         {/* <Field
          label=""
          id="totalAmountReceived"
          name="totalAmountReceived"
          defaultValue={totalAmountReceived}
          type="text"
          helperText="Total Amount Received"
          readOnly={true}
          component={renderNameField}

        /> */}
        <Container style={{marginTop: 20,  width:350, backgroundColor:"#f5f5f5", padding:20, borderRadius:10}}>
          <Typography style={{fontSize:15, fontWeight:"bold", margignLeft:70}}>Payout Summary</Typography>
          <Grid item container justifyContent="left"> 
                <Typography style={{fontSize:13, marginTop:20}}>Total Amount Recieved: &#8358;<strong>{totalAmountReceived.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</strong></Typography>
                <Typography style={{fontSize:13, marginTop:7}}>Amount to be Paid to Creator: <strong style={{color:"red"}}>&#8358;{amountToCreator.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</strong></Typography>
                <Typography style={{fontSize:13,marginTop:7}}>Amount For Platform Retainment: &#8358;<strong>{amountToPlatform.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</strong></Typography>
                <Typography style={{fontSize:13,marginTop:7,marginBottom:30}}>Amount to be Paid as VAT: &#8358;<strong>{vatAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</strong></Typography>
            </Grid>
            </Container>
            
       

        <Field
          label=""
          id="creatorBankDetails"
          name="creatorBankDetails"
          defaultValue={params[0].creator.bankDetails}
          type="text"
          rows={10}
          multiline={true}
          helperText="Creator Bank Account Details to Pay To"
          readOnly={true}
          component={renderMultiLineField}

        />
        
        <Button
          variant="contained"
          className={classes.submitButton}
          //onClick={props.handleSubmit(onSubmit)}
          onClick={() => [props.handleDialogOpenStatus()]}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "getPayOutDetails",
})(GetPayOutDetails);
