import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import { Field, reduxForm } from "redux-form";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useDispatch } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../../apis/local";
import { CREATE_BRAND, CREATE_CREATOR, CREATE_MENTOR, CREATE_POLICY, EDIT_BRAND, EDIT_CREATOR, EDIT_POLICY } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 600,
    //width:"auto",
    
  },
  formStyles: {
    width: 600,
   // width:"auto"
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 300,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  submitUpdateButton: {
    borderRadius: 10,
    height: 40,
    width: 130,
    marginLeft: 250,
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

const renderSingleLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  placeholder,
  defaultValue,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      placeholder={placeholder}
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
  helperText,
  placeholder,
  rows,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText={helperText}
      placeholder={placeholder}
      label={label}
      id={input.name}
      name={input.name}
      defaultValue={input.value}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={rows}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  defaultValue,
  id,
  ...custom
}) => {
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Your Brand Photo"
      defaultValue={defaultValue}
      {...custom}
      onChange={input.onChange}
      // inputProps={{
      //   style: {
      //     height: 5,
      //   },
      // }}
    />
  );
};

function Policy(props) {
  const classes = useStyles();
  const params = useParams();
  const [status, setStatus] = useState("inactive");
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState();
  const[countryList, setCountryList] = useState([]);
  const[languageList, setLanguageList] = useState([]);
  const [nicheList, setNicheList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [country, setCountry] = useState(props.yourCountry);
  const [language, setLanguage] = useState(props.languages);
  const [niche, setNiche] = useState(props.niches);
  const [gender, setGender] = useState();
  const [currency, setCurrency] = useState(props.currency);
   const [loading, setLoading] = useState(false);
   const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState(props.hasInfo ? props.platformRateIsIncludedAsPartOfUserInputedAmount : true);
   const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState(props.hasInfo ? props.vatIsIncludedAsPartOfUserInputedAmount : true);

  const dispatch = useDispatch();

  const currentUser = params.userId;







  const handlePlatformRateIsIncludedAsPartOfUserInputedAmountChange = (event) => {
    setPlatformRateIsIncludedAsPartOfUserInputedAmount(event.target.value);
  };

  const handleVatIsIncludedAsPartOfUserInputedAmountChange = (event) => {
    setVatIsIncludedAsPartOfUserInputedAmount(event.target.value);
  };

  
 

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const buttonUpdateContent = () => {
    return <React.Fragment> Update Info</React.Fragment>;
  };

  const renderPlatformShouldBeIncludedAsUserInputtedAmountField = ({
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
            labelId="platformRateIsIncludedAsPartOfUserInputedAmount"
            id="platformRateIsIncludedAsPartOfUserInputedAmount"
            value={platformRateIsIncludedAsPartOfUserInputedAmount}
            onChange={handlePlatformRateIsIncludedAsPartOfUserInputedAmountChange}
            //label="Display On Store?"
            style={{width:660, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"true"}>True</MenuItem>
            <MenuItem value={"false"}>False</MenuItem>
            
          </Select>
          <FormHelperText>Is Platform Rate Included As Part Of User Inputed Amount </FormHelperText>
        </FormControl>
      </Box>
    );
  };



  const renderVatShouldBeIncludedAsUserInputtedAmountField = ({
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
            labelId="vatIsIncludedAsPartOfUserInputedAmount"
            id="vatIsIncludedAsPartOfUserInputedAmount"
            value={vatIsIncludedAsPartOfUserInputedAmount}
            onChange={handleVatIsIncludedAsPartOfUserInputedAmountChange}
            //label="Display On Store?"
            style={{width:660, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"true"}>True</MenuItem>
            <MenuItem value={"false"}>False</MenuItem>
            
          </Select>
          <FormHelperText>Is VAT Rate Included As Part Of User Inputed Amount </FormHelperText>
        </FormControl>
      </Box>
    );
  };



 console.log("this props is at policy:", props);

  const onSubmit = (formValues) => {
    setLoading(true);

    if(!props.hasInfo){

      if (
        !formValues["platformRate"] ||
        formValues["platformRate"].replace(/\s/g, "").length === 0
      ) {
        props.handleFailedSnackbar("The platform rate field cannot be empty");
        setLoading(false);
        return;
      }

      if (
        !formValues["minimumPlatformCharge"] ||
        formValues["minimumPlatformCharge"].replace(/\s/g, "").length === 0
      ) {
        props.handleFailedSnackbar("The platform minimum charge field cannot be empty");
        setLoading(false);
        return;
      }
  

      if (
        !formValues["vat"] ||
        formValues["vat"].replace(/\s/g, "").length === 0
      ) {
        props.handleFailedSnackbar("The vat rate field cannot be empty");
        setLoading(false);
        return;
      }
     
     
  
      const Str = require("@supercharge/strings");
  
   

      const data = {
        platformRate: formValues.platformRate,
        minimumPlatformCharge: formValues.minimumPlatformCharge,
        vat: formValues.vat,
        platformRateIsIncludedAsPartOfUserInputedAmount: platformRateIsIncludedAsPartOfUserInputedAmount,
        vatIsIncludedAsPartOfUserInputedAmount: vatIsIncludedAsPartOfUserInputedAmount,
        user: props.userId,
        contractProcessingFeeForLocals: formValues.contractProcessingFeeForLocals,
        contractProcessingFeeForNonLocals: formValues.contractProcessingFeeForNonLocals,
        platinumServicePlanRate: formValues.platinumServicePlanRate,
        goldServicePlanRate: formValues.goldServicePlanRate,
        bronzeServicePlanRate: formValues.bronzeServicePlanRate,
        celebrityInfluencerRecruitmentFee: formValues.celebrityInfluencerRecruitmentFee,
        megaInfluencerRecruitmentFee: formValues.megaInfluencerRecruitmentFee,
        macroInfluencerRecruitmentFee: formValues.macroInfluencerRecruitmentFee,
        microInfluencerRecruitmentFee: formValues.microInfluencerRecruitmentFee,
        nanoInfluencerRecruitmentFee: formValues.nanoInfluencerRecruitmentFee,
        subNanoInfluencerRecruitmentFee: formValues.subNanoInfluencerRecruitmentFee,
      }
      
  
 
  
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          const response = await api.post(`/policies`, data);
  
          if (response.data.status === "success") {
            dispatch({
              type: CREATE_POLICY,
              payload: response.data.data.data,
            });
  
            props.handleSuccessfulCreateSnackbar(
              `Platform Policy is successfully set!!!`
            );
           props.renderUpdatePage();
            //props.handleDialogOpenStatus();
            setLoading(false);
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
    }else{
      setLoading(true);   
      


      const data = {
        platformRate: formValues.platformRate ? formValues.platformRate : props.platformRate,
        minimumPlatformCharge: formValues.minimumPlatformCharge ? formValues.minimumPlatformCharge : props.minimumPlatformCharge,
        vat: formValues.vat? formValues.vat : props.vat,
        platformRateIsIncludedAsPartOfUserInputedAmount: platformRateIsIncludedAsPartOfUserInputedAmount ? platformRateIsIncludedAsPartOfUserInputedAmount : props.platformRateIsIncludedAsPartOfUserInputedAmount,
        vatIsIncludedAsPartOfUserInputedAmount: vatIsIncludedAsPartOfUserInputedAmount ? vatIsIncludedAsPartOfUserInputedAmount : props.vatIsIncludedAsPartOfUserInputedAmount,
        user: props.userId,
        contractProcessingFeeForLocals: formValues.contractProcessingFeeForLocals ? formValues.contractProcessingFeeForLocals : props.policy.contractProcessingFeeForLocals, 
        contractProcessingFeeForNonLocals: formValues.contractProcessingFeeForNonLocals ? formValues.contractProcessingFeeForNonLocals : props.policy.contractProcessingFeeForNonLocals,
        platinumServicePlanRate: formValues.platinumServicePlanRate ? formValues.platinumServicePlanRate : props.policy.platinumServicePlanRate,
        goldServicePlanRate: formValues.goldServicePlanRate ? formValues.goldServicePlanRate : props.policy.goldServicePlanRate,
        bronzeServicePlanRate: formValues.bronzeServicePlanRate ? formValues.bronzeServicePlanRate : props.policy.bronzeServicePlanRate,
        celebrityInfluencerRecruitmentFee: formValues.celebrityInfluencerRecruitmentFee ? formValues.celebrityInfluencerRecruitmentFee : props.policy.celebrityInfluencerRecruitmentFee,
        megaInfluencerRecruitmentFee: formValues.megaInfluencerRecruitmentFee ? formValues.megaInfluencerRecruitmentFee : props.policy.megaInfluencerRecruitmentFee,
        macroInfluencerRecruitmentFee: formValues.macroInfluencerRecruitmentFee ? formValues.macroInfluencerRecruitmentFee : props.policy.macroInfluencerRecruitmentFee,
        microInfluencerRecruitmentFee: formValues.microInfluencerRecruitmentFee ? formValues.microInfluencerRecruitmentFee : props.policy.microInfluencerRecruitmentFee,
        nanoInfluencerRecruitmentFee: formValues.nanoInfluencerRecruitmentFee ? formValues.nanoInfluencerRecruitmentFee : props.policy.nanoInfluencerRecruitmentFee,
        subNanoInfluencerRecruitmentFee: formValues.subNanoInfluencerRecruitmentFee ? formValues.subNanoInfluencerRecruitmentFee : props.policy.subNanoInfluencerRecruitmentFee,
      }
      

  
      if (data) {
            const editForm = async () => {
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
              const response = await api.patch(`/policies/${props.id}`, data);
      
              if (response.data.status === "success") {
                dispatch({
                  type: EDIT_POLICY,
                  payload: response.data.data.data,
                });
      
                props.handleSuccessfulEditSnackbar(
                  `Platform Policy is updated successfully!!!`
                );
                //props.handleEditDialogOpenStatus();
                props.renderUpdatePage();
      
                setLoading(false);
              } else {
                props.handleFailedSnackbar(
                  "Something went wrong, please try again!!!"
                );
              }
            };
            editForm().catch((err) => {
              props.handleFailedSnackbar("Something went wrong, please try again!!!");
              console.log("err:", err.message);
            });
          } else {
            props.handleFailedSnackbar("Something went wrong, please try again!!!");
          }
    }
    
  };


  
  return (
    <form id="policy">
      <Box
        // component="form"
        // id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
         // width: 300,
          //height: 430,
          marginLeft:200,
          marginRight:200,
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
          {/* <CancelRoundedIcon
            style={{
              marginLeft: 300,
              fontSize: 30,
              marginTop: "-10px",
              cursor: "pointer",
            }}
            onClick={() => [props.handleDialogOpenStatus()]}
          /> */}
        </Grid>
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 50 }}
          justifyContent="center"
        >
          <FormLabel
            style={{ color: "grey", fontSize: "1.2em" }}
            component="legend"
          >
            {props.hasInfo ? "Update Platform Policy" : "Complete Platform Policy"}
          </FormLabel>
          
        </Grid>

        <Field
          label=""
          id="platformRate"
          name="platformRate"
          placeholder="21.12"
          defaultValue={props.platformRate}
          type="number"
          helperText="Platform Rate"
          component={renderSingleLineField}
          style={{ marginTop: 0,width: '95%' }}
        /><span style={{width: '5%', fontSize:20, marginTop:35}}>%</span>
         

        <Field
          label=""
          id="minimumPlatformCharge"
          name="minimumPlatformCharge"
          placeholder="5500"
          type="number"
          defaultValue={props.minimumPlatformCharge}
          helperText="Minimum Platform Charge"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="contractProcessingFeeForLocals"
          name="contractProcessingFeeForLocals"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.contractProcessingFeeForLocals}
          helperText="Contract Processing Fee For Locals"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="contractProcessingFeeForNonLocals"
          name="contractProcessingFeeForNonLocals"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.contractProcessingFeeForNonLocals}
          helperText="Contract Processing Fee For Non Locals(in US Dollars)"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />

         <Field
          label=""
          id="platinumServicePlanRate"
          name="platinumServicePlanRate"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.platinumServicePlanRate}
          helperText="Platinum Service Plan Rate"
         component={renderSingleLineField}
          style={{ marginTop: 0,width: '95%' }}
        /><span style={{width: '5%', fontSize:20, marginTop:35}}>%</span>
        <Field
          label=""
          id="goldServicePlanRate"
          name="goldServicePlanRate"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.goldServicePlanRate}
          helperText="Gold Service Plan Rate"
         component={renderSingleLineField}
           style={{ marginTop: 0,width: '95%' }}
        /><span style={{width: '5%', fontSize:20, marginTop:35}}>%</span>
        <Field
          label=""
          id="bronzeServicePlanRate"
          name="bronzeServicePlanRate"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.bronzeServicePlanRate}
          helperText="Bronze Service Plan Rate"
         component={renderSingleLineField}
           style={{ marginTop: 0,width: '95%' }}
        /><span style={{width: '5%', fontSize:20, marginTop:35}}>%</span>
        <Field
          label=""
          id="celebrityInfluencerRecruitmentFee"
          name="celebrityInfluencerRecruitmentFee"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.celebrityInfluencerRecruitmentFee}
          helperText="Celebrity Influencer Recruitment Fee"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="megaInfluencerRecruitmentFee"
          name="megaInfluencerRecruitmentFee"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.megaInfluencerRecruitmentFee}
          helperText="Mega Influencer Recruitment Fee"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="macroInfluencerRecruitmentFee"
          name="macroInfluencerRecruitmentFee"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.macroInfluencerRecruitmentFee}
          helperText="Macro Influencer Recruitment Fee"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="microInfluencerRecruitmentFee"
          name="microInfluencerRecruitmentFee"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.microInfluencerRecruitmentFee}
          helperText="Micro Influencer Recruitment Fee"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="nanoInfluencerRecruitmentFee"
          name="nanoInfluencerRecruitmentFee"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.nanoInfluencerRecruitmentFee}
          helperText="Nano Influencer Recruitment Fee"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="subNanoInfluencerRecruitmentFee"
          name="subNanoInfluencerRecruitmentFee"
          //placeholder="5500"
          type="number"
          defaultValue={props.policy && props.policy.subNanoInfluencerRecruitmentFee}
          helperText="Sub-Nano Influencer Recruitment Fee"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
                  label=""
                  id="vat"
                  name="vat"
                  type="number"
                  placeholder="7.5"
                  defaultValue={props.vat}
                  helperText="Value Addes Tax(VAT)"
                  component={renderSingleLineField}
                  style={{ marginTop: 10,width: '95%' }}
                /><span style={{width: '5%', fontSize:20, marginTop:35}}>%</span>
                <Field
                  label=""
                  id="platformRateIsIncludedAsPartOfUserInputedAmount"
                  name="platformRateIsIncludedAsPartOfUserInputedAmount"
                  type="text"
                  defaultValue={props.platformRateIsIncludedAsPartOfUserInputedAmount}
                  helperText="Is Platform Rate Included As Part Of User Inputed Amount"
                 component={renderPlatformShouldBeIncludedAsUserInputtedAmountField}
                  style={{ marginTop: 10 }}
                />
                <Field
                  label=""
                  id="vatIsIncludedAsPartOfUserInputedAmount"
                  name="vatIsIncludedAsPartOfUserInputedAmount"
                  type="text"
                  defaultValue={props.vatIsIncludedAsPartOfUserInputedAmount}
                  helperText="Is VAT Included As Part Of User Inputed Amount"
                 component={renderVatShouldBeIncludedAsUserInputtedAmountField}
                  style={{ marginTop: 10 }}
                />

       
        {props.hasInfo && <Button
          variant="contained"
          className={classes.submitUpdateButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonUpdateContent()
          )}
        </Button>}
        {!props.hasInfo && <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>}
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "policy",
})(Policy);
