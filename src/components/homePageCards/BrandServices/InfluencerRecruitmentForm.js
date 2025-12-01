import React, { useState, useEffect} from "react";
import { Field, formValues, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import api from "./../../../apis/local";
import Paystack from "./RecruitmentPayment/Paystack";
import ThankYou from "../../thankyou/ThankYou";
import history from "../../../history";
import { CREATE_COUNTRY, CREATE_RECRUITMENT } from "./../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    //width:400,
  },
  formStyles: {
    width: 400,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 360,
    marginLeft: 80,
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
    width: 300,
    marginLeft: 0,
    marginTop: 20,
    fontSize:10,
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
    width: 400,
    marginLeft: 60,
    marginTop: 20,
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
    width: 300,
    marginLeft: 0,
    marginTop: 20,
    marginBottom: 20,
    fontSize:10,
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

const renderCountryFlagField = ({
  floatingLabelText,
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  // if (input.value && input.value[0] && input.value[0].name) {
  //   floatingLabelText = input.value[0].name;
  // }
  delete input.value;
  return (
    <TextField
      id={input.name}
      variant="outlined"
      type={type}
      fullWidth
      style={{ marginTop: 20 }}
      helperText="Upload Country Flag"
      {...custom}
      onChange={input.onChange}

      // inputProps={{ type: "file" }}
    />
  );
};

function InfluencerRecruitmentForm(props) {
  const classes = useStyles();

  const [continent, setContinent] = useState();
  const [facebookInfluencerCategory, setFacebookInfluencerCategory] = useState("not-applicable");
  const [numberOfFacebookCreatorsRequested, setNumberOfFacebookCreatorsRequested] =useState(0);
  const [facebookServiceCharge, setFacebookServiceCharge] = useState(0);
  const [totalFacebookServiceCharge, setTotalFacebookServiceCharge] = useState(0);

  const [instagramInfluencerCategory, setInstagramInfluencerCategory] = useState("not-applicable");
  const [numberOfInstagramCreatorsRequested, setNumberOfInstagramCreatorsRequested] = useState(0);
  const [instagramServiceCharge, setInstagramServiceCharge] = useState(0);
  const [totalInsagramServiceCharge, setTotalInsagramServiceCharge] = useState(0);

  const [tiktokInfluencerCategory, setTiktokInfluencerCategory] = useState("not-applicable");
  const [numberOfTiktokCreatorsRequested, setNumberOfTiktokCreatorsRequested] = useState(0);
  const [tiktokServiceCharge, setTiktokServiceCharge] = useState(0);
  const [totalTiktokServiceCharge, setTotalTiktokServiceCharge] = useState(0);
  
  
  const [twitterInfluencerCategory, setTwitterInfluencerCategory] = useState("not-applicable");
  const [numberOfTwitterCreatorsRequested, setNumberOfTwitterCreatorsRequested] = useState(0);
  const [twitterServiceCharge, setTwitterServiceCharge] = useState(0);
  const [totalTwitterServiceCharge, setTotalTwitterServiceCharge] = useState(0);

  const [linkedInInfluencerCategory, setLinkedInInfluencerCategory] = useState("not-applicable");
  const [numberOfLinkedInCreatorsRequested, setNumberOfLinkedInCreatorsRequested] = useState(0);
  const [linkedInServiceCharge, setLinkedInServiceCharge] = useState(0);
  const [totalLinkedInServiceCharge, setTotalLinkedInServiceCharge] = useState(0);

  const [youtubeInfluencerCategory, setYoutubeInfluencerCategory] = useState("not-applicable");
  const [numberOfYoutubeCreatorsRequested, setNumberOfYoutubeCreatorsRequested] = useState(0);
  const [youtubeServiceCharge, setYoutubeServiceCharge] = useState(0);
  const [totalYoutubeServiceCharge, setTotalYoutubeServiceCharge] = useState(0);


  const [blogInfluencerCategory, setBlogInfluencerCategory] = useState("not-applicable");
  const [numberOfBlogCreatorsRequested, setNumberOfBlogCreatorsRequested] = useState(0);
  const [blogServiceCharge, setBlogServiceCharge] = useState(0);
  const [totalBlogServiceCharge, setTotalBlogServiceCharge] = useState(0);


  const [totalServiceCharge, setTotalServiceCharge] = useState(0);
  const [totalServiceChargeInDollars, setTotalServiceChargeInDollars] = useState(0);
  const [loading, setLoading] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [projectType, setProjectType] = useState();
  const [project, setProject] = useState();
  const [brandId, setBrandId] = useState();
  const [brandName, setBrandName] = useState();
  const [brandCountry, setBrandCountry] = useState()
  const [additionalInstruction, setAdditionalInstruction] = useState();
  const [exchangeRate, setExchangeRate] = useState(props.policy.nairaToBaseCurrencyExchangeRate)
  const [vat, setVat] = useState(props.policy.vat/100);

   const [orderNumber, setOrderNumber] = useState(
        "CRT-" + Math.floor(Math.random() * 10000000000000) + "-" + "RCR"
      );
     const [refNumber, setRefNumber] = useState("RCR-" + Math.floor(Math.random() * 10000000000) + '-REF') 
  
  

  const [isOnlinePayment, setIsOnlinePayment] = useState(true);
  const [isSuccessful, setIsSuccessful] = useState(false);

     const theme = useTheme();
      const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
      const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
      const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
      const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();
  

  //computing the total applicable service charge
  useEffect(() => {
      
      const fetchData = async () => {
        let sum = 0;
        let sumInDollars = 0;
        sum = totalFacebookServiceCharge + totalInsagramServiceCharge + totalTiktokServiceCharge + totalTwitterServiceCharge + totalLinkedInServiceCharge + totalBlogServiceCharge + totalYoutubeServiceCharge;
        sumInDollars = sum/parseFloat(exchangeRate)
        setTotalServiceCharge(sum);
        setTotalServiceChargeInDollars(sumInDollars)
        //compute the vat
        const vat = +props.policy.vat/100;
        setVat(vat);
        //exchange rate 
        setExchangeRate(props.policy.nairaToBaseCurrencyExchangeRate);
      };
  
      //call the function
  
      fetchData().catch(console.error);
    }, [totalFacebookServiceCharge, totalInsagramServiceCharge, totalTiktokServiceCharge,totalTwitterServiceCharge,totalLinkedInServiceCharge,totalBlogServiceCharge,totalYoutubeServiceCharge,exchangeRate]);



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

    //get all brand new projects
    useEffect(() => {
        const fetchData = async () => {
          let allData = [];
          if(brandId){
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          const response = await api.get(`/projects`,
              {
                  params:{
                      brand:brandId, 
                      status:"new"
                  }
              });
          const workingData = response.data.data.data;
          workingData.map((project) => {
            allData.push({ 
              id: project._id,
              name: project.name, 
              
          });
          });
          setProjectsList(allData);

          }else{
            setProjectsList(allData);
          }
          
          
        };
    
        //call the function
    
        fetchData().catch(console.error);
      }, [brandId]);
  
      
    
      useEffect(() => {
          const fetchData = async () => {
            let allData = [];
            api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
            const response = await api.get(`/projects/${project}`);
            const workingData = response.data.data.data;
            
          if(workingData){
              setProjectType(workingData.type);
              // setProjectLanguage(workingData.language[0].language);
              // setProjectLanguageId(workingData.language[0].id)
          }
            
          };
      
          //call the function
      
          fetchData().catch(console.error);
        }, [project]);



//compute the total number of facebook charges
const onFacebookInfluencerNumberChange = (event)=>{ 
   setNumberOfFacebookCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * facebookServiceCharge;
  setTotalFacebookServiceCharge(val);
} 




//on additional instruction changes
const onAdditionalInstructionChange = (event)=>{ 
   setAdditionalInstruction(event.target.value);
  
} 

//compute the total number of instagram charges
const onInstagramInfluencerNumberChange = (event)=>{ 
   setNumberOfInstagramCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * instagramServiceCharge;
  setTotalInsagramServiceCharge(val);
  

} 


//compute the total number of tiktok service charges
const onTiktokInfluencerNumberChange = (event)=>{ 
   setNumberOfTiktokCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * tiktokServiceCharge;
  setTotalTiktokServiceCharge(val);
  

} 


//compute the total number of twitter service charges
const onTwitterInfluencerNumberChange = (event)=>{ 
   setNumberOfTwitterCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * twitterServiceCharge;
  setTotalTwitterServiceCharge(val);

} 


//compute the total number of linkedin service charges
const onLinkedInInfluencerNumberChange = (event)=>{ 
   setNumberOfLinkedInCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * linkedInServiceCharge;
  setTotalLinkedInServiceCharge(val);

} 


//compute the total number of youtube service charges
const onYoutubeInfluencerNumberChange = (event)=>{ 
   setNumberOfYoutubeCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * youtubeServiceCharge;
  setTotalYoutubeServiceCharge(val);

} 


//compute the total number of blog service charges
const onBlogInfluencerNumberChange = (event)=>{ 
   setNumberOfBlogCreatorsRequested(event.target.value);
  let val = 0;
  val = event.target.value * blogServiceCharge;
  setTotalBlogServiceCharge(val);

} 



 
    const handleContinentChange = (event) => {
    setContinent(event.target.value);
  };

  //for facebook
  const handleFacebookInfluencerCategoryChange = (event) => {
    setFacebookInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setFacebookServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfFacebookCreatorsRequested;
      setTotalFacebookServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setFacebookServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfFacebookCreatorsRequested;
      setTotalFacebookServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setFacebookServiceCharge(props.policy.microInfluencerRecruitmentFee)
      val = +props.policy.microInfluencerRecruitmentFee * numberOfFacebookCreatorsRequested;
      setTotalFacebookServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setFacebookServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfFacebookCreatorsRequested;
      setTotalFacebookServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setFacebookServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfFacebookCreatorsRequested;
      setTotalFacebookServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setFacebookServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfFacebookCreatorsRequested;
      setTotalFacebookServiceCharge(val);
    }

  
  };


//for instagram
  const handleInstagramInfluencerCategoryChange = (event) => {
    setInstagramInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setInstagramServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfInstagramCreatorsRequested;
      setTotalInsagramServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setInstagramServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfInstagramCreatorsRequested;
      setTotalInsagramServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setInstagramServiceCharge(props.policy.microInfluencerRecruitmentFee)
      val = +props.policy.microInfluencerRecruitmentFee * numberOfInstagramCreatorsRequested;
      setTotalInsagramServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setInstagramServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfInstagramCreatorsRequested;
      setTotalInsagramServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setInstagramServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfInstagramCreatorsRequested;
      setTotalInsagramServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setInstagramServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfInstagramCreatorsRequested;
      setTotalInsagramServiceCharge(val);
    }

  
  };


//for Tiktok
  const handleTiktokInfluencerCategoryChange = (event) => {
    setTiktokInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setTiktokServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfTiktokCreatorsRequested;
      setTotalTiktokServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setTiktokServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfTiktokCreatorsRequested;
      setTotalTiktokServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setTiktokServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfTiktokCreatorsRequested;
      setTotalTiktokServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setTiktokServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfTiktokCreatorsRequested;
      setTotalTiktokServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setTiktokServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfTiktokCreatorsRequested;
      setTotalTiktokServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setTiktokServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfTiktokCreatorsRequested;
      setTotalTiktokServiceCharge(val);
    }

  
  };


  //for Twitter
  const handleTwitterInfluencerCategoryChange = (event) => {
    setTwitterInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setTwitterServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfTwitterCreatorsRequested;
      setTotalTwitterServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setTwitterServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfTwitterCreatorsRequested;
      setTotalTwitterServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setTwitterServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfTwitterCreatorsRequested;
      setTotalTwitterServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setTwitterServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfTwitterCreatorsRequested;
      setTotalTwitterServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setTwitterServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfTwitterCreatorsRequested;
      setTotalTwitterServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setTwitterServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfTwitterCreatorsRequested;
      setTotalTwitterServiceCharge(val);
    }

  
  };



  //for LinkedIn
  const handleLinkedInInfluencerCategoryChange = (event) => {
    setLinkedInInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setLinkedInServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfLinkedInCreatorsRequested;
      setTotalLinkedInServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setLinkedInServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfLinkedInCreatorsRequested;
      setTotalLinkedInServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setLinkedInServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfLinkedInCreatorsRequested;
      setTotalLinkedInServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setLinkedInServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfLinkedInCreatorsRequested;
      setTotalLinkedInServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setLinkedInServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfLinkedInCreatorsRequested;
      setTotalLinkedInServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setLinkedInServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfLinkedInCreatorsRequested;
      setTotalLinkedInServiceCharge(val);
    }

  
  };


  //for youtube
  const handleYoutubeInfluencerCategoryChange = (event) => {
    setYoutubeInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setYoutubeServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfYoutubeCreatorsRequested;
      setTotalYoutubeServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setYoutubeServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfYoutubeCreatorsRequested;
      setTotalYoutubeServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setYoutubeServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfYoutubeCreatorsRequested;
      setTotalYoutubeServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setYoutubeServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfYoutubeCreatorsRequested;
      setTotalYoutubeServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setYoutubeServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfYoutubeCreatorsRequested;
      setTotalYoutubeServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setYoutubeServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfYoutubeCreatorsRequested;
      setTotalYoutubeServiceCharge(val);
    }

  
  };


  //for blog
  const handleBlogInfluencerCategoryChange = (event) => {
    setBlogInfluencerCategory(event.target.value);
    let val = 0;
    if(event.target.value === "pre-nano"){
      setBlogServiceCharge(props.policy.subNanoInfluencerRecruitmentFee);
      val = +props.policy.subNanoInfluencerRecruitmentFee * numberOfBlogCreatorsRequested;
      setTotalBlogServiceCharge(val);
    }else if(event.target.value ==='nano'){
      setBlogServiceCharge(props.policy.nanoInfluencerRecruitmentFee)
      val = +props.policy.nanoInfluencerRecruitmentFee * numberOfBlogCreatorsRequested;
      setTotalBlogServiceCharge(val);
    }else if(event.target.value === 'micro'){
      setBlogServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfBlogCreatorsRequested;
      setTotalBlogServiceCharge(val);
    }else if(event.target.value === 'macro'){
      setBlogServiceCharge(props.policy.macroInfluencerRecruitmentFee)
      val = +props.policy.macroInfluencerRecruitmentFee * numberOfBlogCreatorsRequested;
      setTotalBlogServiceCharge(val);
    }else if(event.target.value === 'mega'){
      setBlogServiceCharge(props.policy.megaInfluencerRecruitmentFee)
      val = +props.policy.megaInfluencerRecruitmentFee * numberOfBlogCreatorsRequested;
      setTotalBlogServiceCharge(val);
    }else if(event.target.value === 'celebrity'){
      setBlogServiceCharge(props.policy.celebrityInfluencerRecruitmentFee)
      val = +props.policy.celebrityInfluencerRecruitmentFee * numberOfBlogCreatorsRequested;
      setTotalBlogServiceCharge(val);
    }

  
  };

   const handleProjectChange = (event) => {
        setProject(event.target.value);
        // setQuantity(0);
        // setTotal(0);
        // setNewHookQuantity(0);
        // setHookTotal(0);
        // setHookQuantity(0);
        // setComputedTotal(0);
        // setComputedHookTotal(0);
        // setGrandTotal(0);

        
      };
    

  
      //get the brand'sprojects list
           const renderProjectsList = () => {
             return projectsList.map((item) => {
               return (
                 <MenuItem key={item.id} value={item.id}>
                   {item.name}
                 </MenuItem>
               );
             });
           };
     
           
     
       const renderProjectField = ({
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
                   labelId="project"
                   id="project"
                   value={project}
                   onChange={handleProjectChange}
                   // label="User"
                   style={{ marginTop: 10, width: matchesMDUp ? 550 : 310, height: 38, marginLeft:0,marginRight:0 }}
                   //{...input}
                 >
                   {renderProjectsList()}
                 </Select>
                 <FormHelperText>Select Your Campaign Project(Or Create a new one in your Dashboard)</FormHelperText>
               </FormControl>
             </Box>
           );
         };

         

  

 
  
//for facebook
  const renderFacebookInfluencerCategoryField = ({
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
            labelId="facebookInfluencerCategory"
            id="facebookInfluencerCategory"
            value={facebookInfluencerCategory}
            onChange={handleFacebookInfluencerCategoryChange}
            label="Facebook Infuencer Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  //for instagram
  const renderInstagramInfluencerCategoryField = ({
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
            labelId="instagramInfluencerCategory"
            id="instagramInfluencerCategory"
            value={instagramInfluencerCategory}
            onChange={handleInstagramInfluencerCategoryChange}
            label="Instagram Infuencer Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  //for tiktok
  const renderTiktokInfluencerCategoryField = ({
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
            labelId="tiktokInfluencerCategory"
            id="tiktokInfluencerCategory"
            value={tiktokInfluencerCategory}
            onChange={handleTiktokInfluencerCategoryChange}
            label="Tiktok Infuencer Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };



  //for twitter
  const renderTwitterInfluencerCategoryField = ({
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
            labelId="twitterInfluencerCategory"
            id="twitterInfluencerCategory"
            value={twitterInfluencerCategory}
            onChange={handleTwitterInfluencerCategoryChange}
            label="Twitter Infuencer Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };



  //for linkedIn
  const renderLinkedInInfluencerCategoryField = ({
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
            labelId="linkedInInfluencerCategory"
            id="linkedInInfluencerCategory"
            value={linkedInInfluencerCategory}
            onChange={handleLinkedInInfluencerCategoryChange}
            label="LinkedIn Infuencer Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  //for youtube
  const renderYoutubeInfluencerCategoryField = ({
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
            labelId="youtubeInfluencerCategory"
            id="youtubeInfluencerCategory"
            value={youtubeInfluencerCategory}
            onChange={handleYoutubeInfluencerCategoryChange}
            label="Youtube Infuencer Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };



  //for blog
  const renderBlogInfluencerCategoryField = ({
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
            labelId="blogInfluencerCategory"
            id="blogInfluencerCategory"
            value={blogInfluencerCategory}
            onChange={handleBlogInfluencerCategoryChange}
            label="Infuencial Blog Category"
            style={{ height: 38, width:200 }}
          >
            <MenuItem value="not-applicable">{<em>Not Applicable</em> }</MenuItem>
            <MenuItem value={"pre-nano"}>Pre-Nano(less than 1,000 followers)</MenuItem>
            <MenuItem value={"nano"}>Nano(from 1,000 to 50,000 followers)</MenuItem>
            <MenuItem value={"micro"}>Micro(from 50,001 to 350,000 followers)</MenuItem>
            <MenuItem value={"macro"}>Macro(from 350,001 to 1,000,000 followers)</MenuItem>
            <MenuItem value={"mega"}>Mega(from 1,000,001 to 5,000,000 followers)</MenuItem>
            <MenuItem value={"celebrity"}>Celebrity(above 5,000,000 followers)</MenuItem>
            
          </Select>
          <FormHelperText>Select Influencer Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };
//computing the total service cost including VAT
 const totalServiceChargeAndVat = totalServiceCharge + (totalServiceCharge * parseFloat(vat));
 const totalServiceChargeInDollarsAndVat = totalServiceChargeInDollars + (totalServiceChargeInDollars * parseFloat(vat));

  const buttonContent = () => {
    return <React.Fragment>Confirm Request & Make Payment in Naira</React.Fragment>;
  };

    const buttonDollarsContent = () => {
    return <React.Fragment>Confirm Request & Make Payment in US-Dollars($)</React.Fragment>;
  };

  const   amountForPayment = +totalServiceChargeAndVat.toFixed(2) * 100;

  const amountPaidInDollars = totalServiceChargeAndVat/parseFloat(exchangeRate);





  const onSubmitWithoutProject = (formValues)=>{
     setLoading(true);

   
    if(!project){
      props.handleFailedSnackbar("Please select the project you are recruiting Influencers for and try again");
      setLoading(false);
      return
    }

     if(!totalServiceChargeAndVat){
      props.handleFailedSnackbar("Please select at least the number of influencers required for a platform and the corresponding influencers' category and try again");
      setLoading(false);
      return
    }


  }

  const onSubmit = (formValues) => {
    setLoading(true);
    
    if(!project){
      props.handleFailedSnackbar("Please select the project you are recruiting Influencers for and try again");
      setLoading(false);
      return
    }

     if(!totalServiceChargeAndVat){
      props.handleFailedSnackbar("Please select at least the number of influencers required for a platform and the corresponding influencers' category and try again");
      setLoading(false);
      return
    }


const data = {
        orderNumber: orderNumber,
        refNumber:refNumber,
        project:project,
        numberOfFacebookCreatorsRequested:numberOfFacebookCreatorsRequested,
        paymentStatus: 'pending-confirmation',
        amountPaid:totalServiceChargeInDollarsAndVat,
        facebookInfluencerCategory:facebookInfluencerCategory,
        numberOfInstagramCreatorsRequested:numberOfInstagramCreatorsRequested,
        instagramInfluencerCategory:instagramInfluencerCategory,
        numberOfTiktokCreatorsRequested:numberOfTiktokCreatorsRequested,
        tiktokInfluencerCategory:tiktokInfluencerCategory,
        numberOfTwitterCreatorsRequested:numberOfTwitterCreatorsRequested,
        twitterInfluencerCategory:twitterInfluencerCategory,
        numberOfLinkedInCreatorsRequested:numberOfLinkedInCreatorsRequested,
        linkedInInfluencerCategory:linkedInInfluencerCategory,
        numberOfYoutubeCreatorsRequested:numberOfYoutubeCreatorsRequested,
        youtubeInfluencerCategory:youtubeInfluencerCategory,
        numberOfBlogCreatorsRequested:numberOfBlogCreatorsRequested,
        blogInfluencerCategory:blogInfluencerCategory,
        restrictInfluencerToOnlyOnePlatform:false,
        additionalInstruction:additionalInstruction,
        currencyOfPayment:"us-dollars",
        paymentStatus:"pending",
        createdBy:props.userId,
        status: "pending",
        brand:props.brandId,
               
      };
     
   
    
    

    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/creatorRecruitments`, data);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_RECRUITMENT,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `Your Request for Influencers recruitment is received. We will commence work immediately after payment confirmation!!!`
          );
          //props.renderCountryUpdateCounter();
          props.handleOpenRecriutmentFormDialogOpenStatus();
          setLoading(false);
           history.push(`/thankswithaccounts/${orderNumber}/${totalServiceChargeAndVat}`)
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
        project:project,
        numberOfFacebookCreatorsRequested:numberOfFacebookCreatorsRequested,
        paymentStatus: 'pending-confirmation',
        amountPaid:totalServiceChargeAndVat,
        facebookInfluencerCategory:facebookInfluencerCategory,
        numberOfInstagramCreatorsRequested:numberOfInstagramCreatorsRequested,
        instagramInfluencerCategory:instagramInfluencerCategory,
        numberOfTiktokCreatorsRequested:numberOfTiktokCreatorsRequested,
        tiktokInfluencerCategory:tiktokInfluencerCategory,
        numberOfTwitterCreatorsRequested:numberOfTwitterCreatorsRequested,
        twitterInfluencerCategory:twitterInfluencerCategory,
        numberOfLinkedInCreatorsRequested:numberOfLinkedInCreatorsRequested,
        linkedInInfluencerCategory:linkedInInfluencerCategory,
        numberOfYoutubeCreatorsRequested:numberOfYoutubeCreatorsRequested,
        youtubeInfluencerCategory:youtubeInfluencerCategory,
        numberOfBlogCreatorsRequested:numberOfBlogCreatorsRequested,
        blogInfluencerCategory:blogInfluencerCategory,
        restrictInfluencerToOnlyOnePlatform:false,
        additionalInstruction:additionalInstruction,
        currencyOfPayment:"naira",
        paymentStatus:"pending",
        createdBy:props.userId,
        status: "pending",
        brand:props.brandId,
               
      };
      
      return (
        <>
        {project && <Paystack
          email={email}
          amount={parseInt(amount)}
          text={" Confirm Request & Make Payment in Naira"}
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

 
  return (
    <>
    {matchesMDUp ? <Box>
      <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 540,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleOpenRecriutmentFormDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center" style={{marginBottom:15}}>
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Influencers Recruitment Request Form
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="influencerRecruitmentForm"
        // onSubmit={onSubmit}
        sx={{
          width: 550,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
         <Field
            label=""
            id="project"
            name="project"
            type="text"
            component={renderProjectField}
            style={{marginTop:10, marginBottom:20}}
        />
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfFacebookCreatorsRequested"
                name="numberOfFacebookCreatorsRequested"
                type="number"
                helperText="Number of Facebook Influencers Required"
                onChange={onFacebookInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="facebookInfluencerCategory"
              name="facebookInfluencerCategory"
              type="text"
              component={renderFacebookInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalFacebookServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalFacebookServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
       
              
         {/**This is for instagram */}
          <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfInstagramCreatorsRequested"
                name="numberOfInstagramCreatorsRequested"
                type="number"
                helperText="Number of Instagram Influencers Required"
                onChange={onInstagramInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="instagramInfluencerCategory"
              name="instagramInfluencerCategory"
              type="text"
              component={renderInstagramInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalInsagramServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalInsagramServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
       

       {/** This is for tiktok */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOftiktokCreatorsRequested"
                name="numberOftiktokCreatorsRequested"
                type="number"
                helperText="Number of Tiktok Influencers Required"
                onChange={onTiktokInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="tiktokInfluencerCategory"
              name="tiktokInfluencerCategory"
              type="text"
              component={renderTiktokInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalTiktokServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalTiktokServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
       
      {/** This is for twitter */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfTwitterCreatorsRequested"
                name="numberOfTwitterCreatorsRequested"
                type="number"
                helperText="Number of Twitter Influencers Required"
                onChange={onTwitterInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="twitterInfluencerCategory"
              name="twitterInfluencerCategory"
              type="text"
              component={renderTwitterInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalTwitterServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalTwitterServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
     

      {/** This is for linkedin */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfLinkedInCreatorsRequested"
                name="numberOfLinkedInCreatorsRequested"
                type="number"
                helperText="Number of LinkedIn Influencers Required"
                onChange={onLinkedInInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="linkedInInfluencerCategory"
              name="linkedInInfluencerCategory"
              type="text"
              component={renderLinkedInInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalLinkedInServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalLinkedInServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
     
       {/** This is for youtube */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfYoutubeCreatorsRequested"
                name="numberOfYoutubeCreatorsRequested"
                type="number"
                helperText="Number of Youtube Influencers Required"
                onChange={onYoutubeInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="youtubeInfluencerCategory"
              name="youtubeInfluencerCategory"
              type="text"
              component={renderYoutubeInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalYoutubeServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalYoutubeServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
      
      
       {/** This is for blog */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfBlogCreatorsRequested"
                name="numberOfBlogCreatorsRequested"
                type="number"
                helperText="Number of influencial Bloggers Required"
                onChange={onBlogInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="blogInfluencerCategory"
              name="blogInfluencerCategory"
              type="text"
              component={renderBlogInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalBlogServiceCharge.toLocaleString('en-US')}</Typography>
        </Grid>
        </Grid>
        <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalBlogServiceCharge/parseFloat(exchangeRate)).toLocaleString('en-US')}</Typography>
      

      
       <Field
                label=""
                id="additionalInstruction"
                name="additionalInstruction"
                type="text"
                helperText="Additional Instruction (Optonal)"
                onChange={onAdditionalInstructionChange}
                rows={5}
                minRows={5}
                component={renderMultiLineField}
                style={{ marginTop: 10 }}
        />
      
      <Typography style={{marginLeft:50, marginTop:30, color:'green', fontSize:17}}> The Total Service Charge(7.5% VAT Inclusive): &#8358;{totalServiceChargeAndVat.toLocaleString('en-US')}</Typography>
        <Typography style={{marginLeft:50, marginTop:10, color:'orange', fontSize:12, marginBottom:30}}>The Total Service Charge(7.5% VAT Inclusive): &#x24;{(totalServiceChargeInDollarsAndVat).toLocaleString('en-US')}</Typography> 
        <Button
          variant="contained"
          className={classes.submitDollarsButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonDollarsContent()
          )}
        </Button>
        {!project && <Button
          variant="text"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmitWithoutProject)}
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
       
    </Box>: 
    
    <>
    <Box>
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
          onClick={() => [props.handleOpenRecriutmentFormDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center" style={{marginBottom:15}}>
        <FormLabel
          style={{ color: "blue", fontSize: "1.5em" }}
          component="legend"
        >
          Influencers Recruitment Request Form
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="influencerRecruitmentForm"
        // onSubmit={onSubmit}
        sx={{
          width: 300,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
         <Field
            label=""
            id="project"
            name="project"
            type="text"
            component={renderProjectField}
            style={{marginTop:10, marginBottom:20}}
        />
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfFacebookCreatorsRequested"
                name="numberOfFacebookCreatorsRequested"
                type="number"
                helperText="Number of Facebook Influencers Required"
                onChange={onFacebookInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="facebookInfluencerCategory"
              name="facebookInfluencerCategory"
              type="text"
              component={renderFacebookInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalFacebookServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalFacebookServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
       
              
         {/**This is for instagram */}
          <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfInstagramCreatorsRequested"
                name="numberOfInstagramCreatorsRequested"
                type="number"
                helperText="Number of Instagram Influencers Required"
                onChange={onInstagramInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="instagramInfluencerCategory"
              name="instagramInfluencerCategory"
              type="text"
              component={renderInstagramInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalInsagramServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalInsagramServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
       

       {/** This is for tiktok */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOftiktokCreatorsRequested"
                name="numberOftiktokCreatorsRequested"
                type="number"
                helperText="Number of Tiktok Influencers Required"
                onChange={onTiktokInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="tiktokInfluencerCategory"
              name="tiktokInfluencerCategory"
              type="text"
              component={renderTiktokInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalTiktokServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalTiktokServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
       
      {/** This is for twitter */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfTwitterCreatorsRequested"
                name="numberOfTwitterCreatorsRequested"
                type="number"
                helperText="Number of Twitter Influencers Required"
                onChange={onTwitterInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="twitterInfluencerCategory"
              name="twitterInfluencerCategory"
              type="text"
              component={renderTwitterInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalTwitterServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalTwitterServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
     

      {/** This is for linkedin */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfLinkedInCreatorsRequested"
                name="numberOfLinkedInCreatorsRequested"
                type="number"
                helperText="Number of LinkedIn Influencers Required"
                onChange={onLinkedInInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="linkedInInfluencerCategory"
              name="linkedInInfluencerCategory"
              type="text"
              component={renderLinkedInInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalLinkedInServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalLinkedInServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
     
       {/** This is for youtube */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfYoutubeCreatorsRequested"
                name="numberOfYoutubeCreatorsRequested"
                type="number"
                helperText="Number of Youtube Influencers Required"
                onChange={onYoutubeInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="youtubeInfluencerCategory"
              name="youtubeInfluencerCategory"
              type="text"
              component={renderYoutubeInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalYoutubeServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalYoutubeServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
      
      
       {/** This is for blog */}
        <Grid container direction="row" style={{ marginTop: 10, marginBottom:10 }}>
          <Grid item style={{ width: "35%" }}>
             <Field
                label=""
                id="numberOfBlogCreatorsRequested"
                name="numberOfBlogCreatorsRequested"
                type="number"
                helperText="Number of influencial Bloggers Required"
                onChange={onBlogInfluencerNumberChange}
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        />
          </Grid>
          <Grid item style={{ width: "32%", marginLeft: 5 }}>
            <Field
              label=""
              id="blogInfluencerCategory"
              name="blogInfluencerCategory"
              type="text"
              component={renderBlogInfluencerCategoryField}
            />
          </Grid>
          <Grid item style={{ width: "25%", marginLeft:32 }}>
             {/* <Field
                label=""
                id="facebookServiceCharge"
                name="facebookServiceCharge"
                defaultValue={facebookServiceCharge}
                type="text"
                helperText="Recruitment Service Cost"
                component={renderSingleLineField}
                style={{ marginTop: 0 }}
        /> */}
        {/* <Typography style={{marginLeft:40, marginTop:1, color:'green', fontSize:15}}>&#8358;{totalBlogServiceCharge.toLocaleString('en-US')}</Typography> */}
        </Grid>
        </Grid>
        {/* <Typography style={{marginLeft:480, marginTop:-40, color:'orange', fontSize:12, marginBottom:30}}>&#x24;{(totalBlogServiceCharge/1450).toLocaleString('en-US')}</Typography> */}
      

      
       <Field
                label=""
                id="additionalInstruction"
                name="additionalInstruction"
                type="text"
                helperText="Additional Instruction (Optonal)"
                onChange={onAdditionalInstructionChange}
                rows={5}
                minRows={5}
                component={renderMultiLineField}
                style={{ marginTop: 10 }}
        />
      
      <Typography style={{marginLeft:20, marginTop:30, color:'green', fontSize:17}}> The Total Service Charge(7.5% VAT Inclusive): &#8358;{totalServiceChargeAndVat.toLocaleString('en-US')}</Typography>
        <Typography style={{marginLeft:20, marginTop:10, color:'orange', fontSize:12, marginBottom:30}}>The Total Service Charge(7.5% VAT Inclusive): &#x24;{(totalServiceChargeInDollarsAndVat).toLocaleString('en-US')}</Typography> 
        <Button
          variant="contained"
          className={classes.submitDollarsMobileButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonDollarsContent()
          )}
        </Button>
        {!project && <Button
          variant="text"
          className={classes.submitMobileButton}
          onClick={props.handleSubmit(onSubmitWithoutProject)}
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
    </Box>: 
    
    </>}
    </>
  );
}

export default reduxForm({
  form: "influencerRecruitmentForm",
})(InfluencerRecruitmentForm);
