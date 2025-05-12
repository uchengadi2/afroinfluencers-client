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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../../apis/local";
import { CREATE_CREATOR, EDIT_CREATOR } from "../../../actions/types";

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
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 50,
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
  submitUpdateButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 130,
    marginLeft: 50,
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
      helperText="Upload Your Photo"
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

function AddCreatorForm(props) {
  const classes = useStyles();
  const params = useParams();
  const [status, setStatus] = useState("inactive");
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState();
  const[countryList, setCountryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(props.category);
  const[languageList, setLanguageList] = useState([]);
  const [nicheList, setNicheList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [country, setCountry] = useState(props.yourCountry);
  const [language, setLanguage] = useState([]);
  const [niche, setNiche] = useState([]);
  const [gender, setGender] = useState();
  const [currency, setCurrency] = useState();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();

  const currentUser = params.userId;


  
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      let allLangData = [];

      {props.languages.map((lang, index) => (
        allLangData.push(lang.id)
       

      ))}
      {props.niches.map((niche, index) => (
        allData.push(niche.id)
        

      ))}
      setNiche(allData);
      setLanguage(allLangData)
      setCurrency(props.currency[0].id)
     
      
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.languages, props.niches, props.currency]);

  



  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/niches`);
      const workingData = response.data.data.data;
      workingData.map((niche) => {
        allData.push({ id: niche._id, name: niche.niche });
      });
      setNicheList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/languages`);
      const workingData = response.data.data.data;
      workingData.map((language) => {
        allData.push({ id: language._id, name: language.language });
      });
      setLanguageList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/countries`);
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies`);
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);


  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleNicheChange = (event) => {
    setNiche(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  

  //get the countries list
  const renderCountriesList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };


  //get the niches list
  const renderNichesList = () => {
    return nicheList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the niches list
  const renderLanguagesList = () => {
    return languageList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };


  //get the currencies list
  const renderCurrenciesList = () => {
    return currencyList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the categories list
  const renderCategoriesList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const buttonUpdateContent = () => {
    return <React.Fragment> Update Info</React.Fragment>;
  };

  const renderStatusField = ({
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
            labelId="status"
            id="status"
            value={status}
            onChange={handleStatusChange}
            //label="Display On Store?"
            style={{width:matchesMDUp?660:220, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"inactive"}>Inactive</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"suspended"}>Suspended</MenuItem>
            <MenuItem value={"dismissed"}>Dismissed</MenuItem>
          </Select>
          <FormHelperText>Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  const renderGenderField = ({
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
            labelId="gender"
            id="gender"
            value={props.hasInfo ? props.yourGender : gender}
            onChange={handleGenderChange}
            //label="Display On Store?"
            style={{width:matchesMDUp?660:220, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            
          </Select>
          <FormHelperText>Gender</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCountriesField = ({
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
            labelId="country"
            id="country"
            value={country}
            //defaultValue={props.yourCountry}
            onChange={handleCountryChange}
            // label="User"
            style={{ marginTop: 0, width: matchesMDUp?660:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCountriesList()}
          </Select>
          <FormHelperText>Creator's Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };



  const renderLanguagesField = ({
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
            labelId="language"
            id="language"            
            value={language}                       
            multiple={true}
            onChange={handleLanguageChange}
            // label="User"
            style={{ marginTop: 10, width:matchesMDUp?660:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderLanguagesList()}
          </Select>
          <FormHelperText>What Languages Do You Prefer to Work With?</FormHelperText>
        </FormControl>
      </Box>
    );
  };



  const renderNichesField = ({
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
            labelId="niche"
            id="niche"
            value={niche}                
            multiple={true}
            onChange={handleNicheChange}
            // label="User"
            style={{ marginTop: 10, width:matchesMDUp?660:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderNichesList()}
          </Select>
          <FormHelperText>Select Your Preferred Niches?</FormHelperText>
        </FormControl>
      </Box>
    );
  };



  const renderCurrencyField = ({
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
            labelId="currency"
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            // label="User"
            style={{ marginTop: 10, width:matchesMDUp?660:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCurrenciesList()}
          </Select>
          <FormHelperText>Select The Currency Of Your Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  const renderCategoryField = ({
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
            labelId="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            // label="User"
            style={{ marginTop: 10, width:matchesMDUp?660:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCategoriesList()}
          </Select>
          <FormHelperText>Select Your Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  


  const onSubmit = (formValues) => {
    setLoading(true);

    if(!props.hasInfo){

      if (
        !formValues["name"] ||
        formValues["name"].replace(/\s/g, "").length === 0
      ) {
        props.handleFailedSnackbar("The creator name field cannot be empty");
        setLoading(false);
        return;
      }
  

      
      const slug = `${formValues.name.replace(/\s/g, '-').toLowerCase()}-${Math.floor(Math.random() * 100000000)}`;
     
       //Computing Video Price

       let actualVideoPrice = 0;
       if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
         actualVideoPrice = formValues.videoPrice
       }else{
         if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
           actualVideoPrice = parseFloat(formValues.videoPrice) + parseFloat(formValues.videoPrice)*parseFloat(props.vat)/100;
         }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
           actualVideoPrice = parseFloat(formValues.videoPrice) + parseFloat(formValues.videoPrice)*parseFloat(props.platformRate)/100;
         }else{
           //both platform rate and vat not included
           actualVideoPrice = parseFloat(formValues.videoPrice) + (parseFloat(formValues.videoPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.videoPrice)*parseFloat(props.vat)/100);
         }
         
       }
 
       //computing video hook prices
 
       let actualVideoHookPrice = 0;
       if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
         actualVideoHookPrice = formValues.videoHookPrice
       }else{
         if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
           actualVideoHookPrice = parseFloat(formValues.videoHookPrice) + parseFloat(formValues.videoHookPrice)*parseFloat(props.vat)/100;
         }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
           actualVideoHookPrice = parseFloat(formValues.videoHookPrice) + parseFloat(formValues.videoHookPrice)*parseFloat(props.platformRate)/100;
         }else{
           //both platform rate and vat not included
           actualVideoHookPrice = parseFloat(formValues.videoHookPrice) + (parseFloat(formValues.videoHookPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.videoHookPrice)*parseFloat(props.vat)/100);
         }
         
       }
 
       //computing the sound prices
 
       let actualSoundPrice = 0;
       if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
         actualSoundPrice = formValues.soundPrice
       }else{
         if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
           actualSoundPrice = parseFloat(formValues.soundPrice) + parseFloat(formValues.soundPrice)*parseFloat(props.vat)/100;
         }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
           actualSoundPrice = parseFloat(formValues.soundPrice) + parseFloat(formValues.soundPrice)*parseFloat(props.platformRate)/100;
         }else{
           //both platform rate and vat not included
           actualSoundPrice = parseFloat(formValues.soundPrice) + (parseFloat(formValues.soundPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.soundPrice)*parseFloat(props.vat)/100);
         }
         
       }
 
       //computing the sound Hook Price
       let actualSoundHookPrice = 0;
       if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
         actualSoundHookPrice = formValues.soundHookPrice
       }else{
         if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
           actualSoundHookPrice = parseFloat(formValues.soundHookPrice) + parseFloat(formValues.soundHookPrice)*parseFloat(props.vat)/100;
         }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
           actualSoundHookPrice = parseFloat(formValues.soundHookPrice) + parseFloat(formValues.soundHookPrice)*parseFloat(props.platformRate)/100;
         }else{
           //both platform rate and vat not included
           actualSoundHookPrice = parseFloat(formValues.soundHookPrice) + (parseFloat(formValues.soundHookPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.soundHookPrice)*parseFloat(props.vat)/100);
         }
         
       }
     
     
  
      const Str = require("@supercharge/strings");
  
      const form = new FormData();
      form.append("name", formValues.name);
      form.append("slug", slug);
      form.append("videoPrice", actualVideoPrice);
      form.append("videoHookPrice", actualVideoHookPrice);
      form.append("videoDeliveryDays", formValues.videoDeliveryDays);
      form.append("soundPrice", actualSoundPrice);
      form.append("soundHookPrice", actualSoundHookPrice);
      form.append("soundDeliveryDays", formValues.soundDeliveryDays);
      form.append("age", formValues.age);
      form.append("bio", formValues.bio);
      form.append("bankDetails", formValues.bankDetails);      
      form.append("gender", gender);
      form.append("status", 'inactive');    
      form.append("currency", currency);
      form.append("country", country);
      form.append("category", category);
      //form.append("status", status);
      form.append("creatorContactPhoneNumber", formValues.creatorContactPhoneNumber);
      form.append("creatorContactEmailAddress", formValues.creatorContactEmailAddress);
      
      form.append("user", props.userId);
  
    //niches
        for (let i = 0; i < niche.length; i++) {
        form.append(`niches`, niche[i]);
      }
  
      //language
      for (let i = 0; i < language.length; i++) {
        form.append(`languages`, language[i]);
      }
         
  
      // if (!formValues["refNumber"]) {
      //   const refNumber =
      //     "NEXT" + "-" + Math.floor(Math.random() * 100000000) + "-" + "TEACH";
  
      //   form.append("refNumber", refNumber);
      // } else {
      //   form.append("refNumber", formValues.refNumber);
      // }
  
      form.append("createdBy", props.userId);
      if (formValues.image) {
        form.append("image", formValues.image[0]);
      }
  
      if (formValues) {
        const createForm = async () => {
          api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          const response = await api.post(`/creators`, form);
  
          if (response.data.status === "success") {
            dispatch({
              type: CREATE_CREATOR,
              payload: response.data.data.data,
            });
  
            props.handleSuccessfulCreateSnackbar(
              `${response.data.data.data.name} creator is successfully completed!!!`
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

      //Computing Video Price

      let actualVideoPrice = 0;
      if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
        actualVideoPrice = formValues.videoPrice
      }else{
        if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
          actualVideoPrice = parseFloat(formValues.videoPrice) + parseFloat(formValues.videoPrice)*parseFloat(props.vat)/100;
        }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
          actualVideoPrice = parseFloat(formValues.videoPrice) + parseFloat(formValues.videoPrice)*parseFloat(props.platformRate)/100;
        }else{
          //both platform rate and vat not included
          actualVideoPrice = parseFloat(formValues.videoPrice) + (parseFloat(formValues.videoPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.videoPrice)*parseFloat(props.vat)/100);
        }
        
      }

      //computing video hook prices

      let actualVideoHookPrice = 0;
      if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
        actualVideoHookPrice = formValues.videoHookPrice
      }else{
        if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
          actualVideoHookPrice = parseFloat(formValues.videoHookPrice) + parseFloat(formValues.videoHookPrice)*parseFloat(props.vat)/100;
        }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
          actualVideoHookPrice = parseFloat(formValues.videoHookPrice) + parseFloat(formValues.videoHookPrice)*parseFloat(props.platformRate)/100;
        }else{
          //both platform rate and vat not included
          actualVideoHookPrice = parseFloat(formValues.videoHookPrice) + (parseFloat(formValues.videoHookPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.videoHookPrice)*parseFloat(props.vat)/100);
        }
        
      }

      //computing the sound prices

      let actualSoundPrice = 0;
      if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
        actualSoundPrice = formValues.soundPrice
      }else{
        if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
          actualSoundPrice = parseFloat(formValues.soundPrice) + parseFloat(formValues.soundPrice)*parseFloat(props.vat)/100;
        }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
          actualSoundPrice = parseFloat(formValues.soundPrice) + parseFloat(formValues.soundPrice)*parseFloat(props.platformRate)/100;
        }else{
          //both platform rate and vat not included
          actualSoundPrice = parseFloat(formValues.soundPrice) + (parseFloat(formValues.soundPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.soundPrice)*parseFloat(props.vat)/100);
        }
        
      }

      //computing the sound Hook Price
      let actualSoundHookPrice = 0;
      if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
        actualSoundHookPrice = formValues.soundHookPrice
      }else{
        if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
          actualSoundHookPrice = parseFloat(formValues.soundHookPrice) + parseFloat(formValues.soundHookPrice)*parseFloat(props.vat)/100;
        }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
          actualSoundHookPrice = parseFloat(formValues.soundHookPrice) + parseFloat(formValues.soundHookPrice)*parseFloat(props.platformRate)/100;
        }else{
          //both platform rate and vat not included
          actualSoundHookPrice = parseFloat(formValues.soundHookPrice) + (parseFloat(formValues.soundHookPrice)*parseFloat(props.platformRate)/100) + (parseFloat(formValues.soundHookPrice)*parseFloat(props.vat)/100);
        }
        
      }

      

      const Str = require("@supercharge/strings");
  
      const form = new FormData();
      form.append("name", formValues.name ? formValues.name : props.yourName);
      //form.append("slug", slug);
      form.append("videoPrice", formValues.videoPrice ? actualVideoPrice : props.videoPrice);
      form.append("videoHookPrice", formValues.videoHookPrice ? actualVideoHookPrice : props.videoHookPrice);
      form.append("videoDeliveryDays", formValues.videoDeliveryDays ? formValues.videoDeliveryDays : props.videoDeliveryDays);
      form.append("soundPrice", formValues.soundPrice ? actualSoundPrice : props.soundPrice);
      form.append("soundHookPrice", formValues.soundHookPrice ? actualSoundHookPrice : props.soundHookPrice);
      form.append("soundDeliveryDays", formValues.soundDeliveryDays ? formValues.soundDeliveryDays : props.soundDeliveryDays);
      form.append("age", formValues.age ? formValues.age : props.yourAge);
      form.append("bio", formValues.bio ? formValues.bio : props.bio);
      form.append("gender", gender ? gender : props.yourGender);
      form.append("status", status?status: props.status);    
      form.append("currency", currency ? currency : props.currency);
      form.append("country", country ? country : props.yourCountry);
      form.append("category", category ? category : props.category);
      form.append("bankDetails", formValues.bankDetails ? formValues.bankDetails : props.bankDetails);  
      form.append("user", props.userId);
      form.append("creatorContactPhoneNumber", formValues.creatorContactPhoneNumber ? formValues.creatorContactPhoneNumber : props.creatorContactPhoneNumber);
      form.append("creatorContactEmailAddress", formValues.creatorContactEmailAddress ? formValues.creatorContactEmailAddress : props.creatorContactEmailAddress);
  
    //niches
        for (let i = 0; i < niche.length; i++) {
        form.append(`niches`, niche[i]);
      }
  
      //language
      for (let i = 0; i < language.length; i++) {
        form.append(`languages`, language[i]);
      }
         
  
     
      form.append("createdBy", props.userId);
      if (formValues.image) {
        form.append("image", formValues.image[0]);
      }
  
      if (form) {
            const editForm = async () => {
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
              const response = await api.patch(`/creators/${props.creatorId}`, form);
      
              if (response.data.status === "success") {
                dispatch({
                  type: EDIT_CREATOR,
                  payload: response.data.data.data,
                });
      
                props.handleSuccessfulEditSnackbar(
                  `${response.data.data.data.name} Creator Informtion  is updated successfully!!!`
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

  //video price text extension
  let videoPriceTextExtension = "";
  if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
    videoPriceTextExtension  = `Note to apply the ${props.vat}% VAT and the ${props.platformRate}% Platform Promotion & Commision charge to your inputted amount`;
  }else{
    if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
      videoPriceTextExtension=`Note that You Should Manually apply the ${props.vat}% VAT to your inputted Amount. However, the Platform commission will be applied automatically`;
    }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
      videoPriceTextExtension=`Note that You Should Manually apply the ${props.platformRate}% Platform Commission to your inputted Amount. However, the VAT amount will be applied automatically `;
    }else{
      videoPriceTextExtension = "Note that both VAT and the Platform Promotion & Commission Charge will be automatically applied"
    }
  }


  //video hook price text extension
  let videoHookPriceTextExtension = "";
  if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
    videoHookPriceTextExtension  = `Note to apply the ${props.vat}% VAT and the ${props.platformRate}% Platform Promotion & Commision charge to your inputted amount`;
  }else{
    if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
      videoHookPriceTextExtension=`Note that You Should Manually apply the ${props.vat}% VAT to your inputted Amount. However, the Platform commission will be applied automatically`;
    }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
      videoHookPriceTextExtension=`Note that You Should Manually apply the ${props.platformRate}% Platform Commission to your inputted Amount. However, the VAT amount will be applied automatically `;
    }else{
      videoHookPriceTextExtension = "Note that both VAT and the Platform Promotion & Commission Charge will be automatically applied"
    }
  }


   
  //sound price text extension
  let soundPriceTextExtension = "";
  if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
    soundPriceTextExtension  = `Note to apply the ${props.vat}% VAT and the ${props.platformRate}% Platform Promotion & Commision charge to your inputted amount`;
  }else{
    if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
      soundPriceTextExtension=`Note that You Should Manually apply the ${props.vat}% VAT to your inputted Amount. However, the Platform commission will be applied automatically`;
    }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
      soundPriceTextExtension=`Note that You Should Manually apply the ${props.platformRate}% Platform Commission to your inputted Amount. However, the VAT amount will be applied automatically `;
    }else{
      soundPriceTextExtension = "Note that both VAT and the Platform Promotion & Commission Charge will be automatically applied"
    }
  }


  //sound hook price text extension
  let soundHookPriceTextExtension = "";
  if(props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
   soundHookPriceTextExtension  = `Note to apply the ${props.vat}% VAT and the ${props.platformRate}% Platform Promotion & Commision charge to your inputted amount`;
  }else{
    if(props.platformRateIsIncludedAsPartOfUserInputedAmount && !props.vatIsIncludedAsPartOfUserInputedAmount){
     soundHookPriceTextExtension=`Note that You Should Manually apply the ${props.vat}% VAT to your inputted Amount. However, the Platform commission will be applied automatically`;
    }else if(!props.platformRateIsIncludedAsPartOfUserInputedAmount && props.vatIsIncludedAsPartOfUserInputedAmount){
     soundHookPriceTextExtension=`Note that You Should Manually apply the ${props.platformRate}% Platform Commission to your inputted Amount. However, the VAT amount will be applied automatically `;
    }else{
     soundHookPriceTextExtension = "Note that both VAT and the Platform Promotion & Commission Charge will be automatically applied"
    }
  }

console.log('props.hasInfo:', props.hasInfo)

  
  return (
    <form id="addCreatorForm">
      <Box
        // component="form"
        // id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
         // width: 300,
          //height: 430,
          marginLeft:matchesMDUp?200:0,
          marginRight:matchesMDUp?200:0,
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
            style={{ color: "grey", fontSize: "1.8em",  }}
            component="legend"
          >
            {props.hasInfo ? "Update Your Information" : "Complete Your Information"}
          </FormLabel>
          
        </Grid>

        <Field
          label=""
          id="country"
          name="country"
          type="text"
          component={renderCountriesField}
        />
         <Field
          label=""
          id="niche"
          name="niche"
          type="text"
          component={renderNichesField}
        />
           <Field
          label=""
          id="category"
          name="category"
          type="text"
          component={renderCategoryField}
        />
        

        <Field
          label=""
          id="name"
          name="name"
          type="text"
          defaultValue={props.yourName}
          helperText="Your Name"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="creatorContactPhoneNumber"
          name="creatorContactPhoneNumber"
          type="text"
          defaultValue={props.creatorContactPhoneNumber}
          helperText="Your Contact Phone Number"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="creatorContactEmailAddress"
          name="creatorContactEmailAddress"
          type="text"
          defaultValue={props.creatorContactEmailAddress}
          helperText="Your Contact Email Address"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="age"
          name="age"
          type="number"
          defaultValue={props.yourAge}
          helperText="Your Age"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="gender"
          name="gender"
          //defaultValue={props.yourGender}
          type="text"
          component={renderGenderField}
        />

    <Field
          label=""
          id="currency"
          name="currency"
          type="text"
          component={renderCurrencyField}
        />

        <Field
          label=""
          id="videoPrice"
          name="videoPrice"
          defaultValue={props.videoPrice}
          type="number"
          helperText={`How Much Will You Charge For Making a 10 to 40 Seconds Promo Video For A Brand? ${videoPriceTextExtension}`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="videoHookPrice"
          name="videoHookPrice"
          defaultValue={props.videoHookPrice}
          type="number"
          helperText={`How Much Will You Charge for An Extra Hook For A Promo Video?${videoHookPriceTextExtension}`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="videoDeliveryDays"
          name="videoDeliveryDays"
          type="number"
          defaultValue={props.videoDeliveryDays}
          helperText="How Many Days Will It Take You To Deliver A 10 to 40 Seconds Promo Video Project "
          //rows={5}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        
        <Field
          label=""
          id="soundPrice"
          name="soundPrice"
          defaultValue={props.soundPrice}
          type="number"
          helperText={`How Much Will You Charge For Making a 10 to 40 Seconds Promo Jingle(audio) For A Brand? ${soundPriceTextExtension}`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="soundHookPrice"
          name="soundHookPrice"
          defaultValue={props.soundHookPrice}
          type="number"
          helperText={`How Much Will You Charge for An Extra Hook For A Promo Jingle(audio)?${soundHookPriceTextExtension}`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="soundDeliveryDays"
          name="soundDeliveryDays"
          type="number"
          defaultValue={props.soundDeliveryDays}
          helperText="How Many Days Will It Take You To Deliver A 10 to 40 Seconds Promo Jingle(audio) Project "
          //rows={5}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="language"
          name="language"
          type="text"
          
          component={renderLanguagesField}
          style={{ marginTop: 10 }}
        />

        <Field
                  label=""
                  id="bio"
                  name="bio"
                  type="text"
                  defaultValue={props.bio}
                  helperText="Your Bio"
                  rows={10}
                 component={renderMultiLineField}
                  style={{ marginTop: 10 }}
                />

                <Field
                  label=""
                  id="bankDetails"
                  name="bankDetails"
                  type="text"
                  defaultValue={props.bankDetails}
                  helperText="Your Bank Details. Please Include the SWIFT/IBAN Number if you are using a Bank outside Nigeria"
                  rows={10}
                 component={renderMultiLineField}
                  style={{ marginTop: 10 }}
                />



        <Field
          id="image"
          name="image"
          type="file"
          accept="image/*"
          //defaultValue={props.image}
          component={renderImageField}
          floatingLabelText={"Upload Your Photo"}
          fullWidth={true}
        />
        {props.hasInfo && <Button
          variant="contained"
          className={matchesMDUp ? classes.submitUpdateButton : classes.submitUpdateButtonMobile}
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
          className={matchesMDUp ? classes.submitButton : classes.submitButtonMobile}
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
  form: "addCreatorForm",
})(AddCreatorForm);
