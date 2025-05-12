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
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../../apis/local";
import { baseURL } from "./../../../apis/util";
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
    marginLeft: 120,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  media:{
    marginTop:0,
    marginBottom:0
  },
  submitUpdateButton: {
    borderRadius: 10,
    height: 40,
    width: 130,
    marginLeft: 110,
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
      helperText="Upload Creator Photo"
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

function EditCreatorByAdminForm(props) {
  const {params} = props;  
  const classes = useStyles();
  const paramsSelected = useParams();
  const [status, setStatus] = useState(params[0].status);
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState();
  const[countryList, setCountryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState(params[0].category ? params[0].category[0].id:"");
  const[languageList, setLanguageList] = useState([]);
  const [nicheList, setNicheList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [country, setCountry] = useState(params[0].country ? params[0].country[0].id: "");
  const [language, setLanguage] = useState([]);
  const [niche, setNiche] = useState([]);
  const [gender, setGender] = useState(params[0].gender);
  const [currency, setCurrency] = useState(params[0].currency ? params[0].currency[0].id :"");
   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const currentUser = params.userId;


  const imageUrl = `${baseURL}/images/creators/${params[0].image}`;
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      let allLangData = [];

      {params[0].languages.map((lang, index) => (
        allLangData.push(lang.id)
       

      ))}
      {params[0].niches.map((niche, index) => (
        allData.push(niche.id)
        

      ))}
      setNiche(allData);
      setLanguage(allLangData)
      setCurrency(params[0].currency[0].id)
     
      
    };

    //call the function

    fetchData().catch(console.error);
  }, [params[0].languages, params[0].niches, params[0].currency]);

  



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
            style={{width:350, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"inactive"}>Inactive</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"suspended"}>Suspended</MenuItem>
            <MenuItem value={"dismissed"}>Dismissed</MenuItem>
          </Select>
          <FormHelperText>Creator Status</FormHelperText>
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
            value={gender}
            onChange={handleGenderChange}
            //label="Display On Store?"
            style={{width:350, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            
          </Select>
          <FormHelperText>Creator Gender</FormHelperText>
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
            style={{ marginTop: 0, width: 350, height: 38, marginLeft:0,marginRight:0 }}
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
            style={{ marginTop: 10, width: 350, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderLanguagesList()}
          </Select>
          <FormHelperText>What Languages Do The Creator Prefer to Work With?</FormHelperText>
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
            style={{ marginTop: 10, width: 350, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderNichesList()}
          </Select>
          <FormHelperText>Select Creator Preferred Niches?</FormHelperText>
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
            style={{ marginTop: 10, width: 350, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCurrenciesList()}
          </Select>
          <FormHelperText>Select The Currency Of Creator Country</FormHelperText>
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
            style={{ marginTop: 10, width: 350, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCategoriesList()}
          </Select>
          <FormHelperText>Select Creator Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  


  const onSubmit = (formValues) => {
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
      form.append("name", formValues.name ? formValues.name : params[0].name);
      //form.append("slug", slug);
      form.append("videoPrice", formValues.videoPrice ? actualVideoPrice : params[0].videoPrice);
      form.append("videoHookPrice", formValues.videoHookPrice ? actualVideoHookPrice : params[0].videoHookPrice);
      form.append("videoDeliveryDays", formValues.videoDeliveryDays ? formValues.videoDeliveryDays : params[0].videoDeliveryDays);
      form.append("soundPrice", formValues.soundPrice ? actualSoundPrice : params[0].soundPrice);
      form.append("soundHookPrice", formValues.soundHookPrice ? actualSoundHookPrice : params[0].soundHookPrice);
      form.append("soundDeliveryDays", formValues.soundDeliveryDays ? formValues.soundDeliveryDays : params[0].soundDeliveryDays);
      form.append("age", formValues.age ? formValues.age : params[0].age);
      form.append("bio", formValues.bio ? formValues.bio : params[0].bio);
      form.append("gender", gender ? gender : params[0].gender);
      form.append("status", status?status: params[0].status);    
      form.append("currency", currency ? currency : params[0].currency[0].id);
      form.append("country", country ? country : params[0].country[0].id);
      form.append("category", category ? category : params[0].category[0].id);
      form.append("bankDetails", formValues.bankDetails ? formValues.bankDetails : params[0].bankDetails);  
      //form.append("user", props.userId);
      form.append("creatorContactPhoneNumber", formValues.creatorContactPhoneNumber ? formValues.creatorContactPhoneNumber : params[0].creatorContactPhoneNumber);
      form.append("creatorContactEmailAddress", formValues.creatorContactEmailAddress ? formValues.creatorContactEmailAddress : params[0].creatorContactEmailAddress);
  
    //niches
        for (let i = 0; i < niche.length; i++) {
        form.append(`niches`, niche[i]);
      }
  
      //language
      for (let i = 0; i < language.length; i++) {
        form.append(`languages`, language[i]);
      }
         
  
     
      form.append("modifiedBy", props.userId);
      form.append("dateModified", new Date().toISOString());
      
      if (formValues.image) {
        form.append("image", formValues.image[0]);
      }
  
      if (form) {
            const editForm = async () => {
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
              const response = await api.patch(`/creators/${params[0].id}`, form);
      
              if (response.data.status === "success") {
                dispatch({
                  type: EDIT_CREATOR,
                  payload: response.data.data.data,
                });
      
                props.handleSuccessfulEditSnackbar(
                  `${response.data.data.data.name} Creator Informtion  is updated successfully!!!`
                );
                props.handleEditDialogOpenStatus();
                props.renderCreatorEdittedUpdateCounter();
      
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



  
  return (
    <form id="editCreatorByAdminForm">
      <Box
        // component="form"
        // id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
          width: 350,
          //height: 430,
          marginLeft:10,
          marginRight:10,
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
            Update Creator Information
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
          defaultValue={params[0].name}
          helperText="Your Name"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="creatorContactPhoneNumber"
          name="creatorContactPhoneNumber"
          type="text"
          defaultValue={params[0].creatorContactPhoneNumber}
          helperText="Creator Contact Phone Number"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="creatorContactEmailAddress"
          name="creatorContactEmailAddress"
          type="text"
          defaultValue={params[0].creatorContactEmailAddress}
          helperText="Creator Contact Email Address"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="age"
          name="age"
          type="number"
          defaultValue={params[0].age}
          helperText="Creator Age"
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
          defaultValue={params[0].videoPrice}
          type="number"
          helperText={`How Much Will You Charge For Making a 10 to 40 Seconds Promo Video For A Brand? ${videoPriceTextExtension}`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="videoHookPrice"
          name="videoHookPrice"
          defaultValue={params[0].videoHookPrice}
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
          defaultValue={params[0].videoDeliveryDays}
          helperText="How Many Days Will It Take You To Deliver A 10 to 40 Seconds Promo Video Project "
          //rows={5}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        
        <Field
          label=""
          id="soundPrice"
          name="soundPrice"
          defaultValue={params[0].soundPrice}
          type="number"
          helperText={`How Much Will You Charge For Making a 10 to 40 Seconds Promo Jingle(audio) For A Brand? ${soundPriceTextExtension}`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="soundHookPrice"
          name="soundHookPrice"
          defaultValue={params[0].soundHookPrice}
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
          defaultValue={params[0].soundDeliveryDays}
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
                  defaultValue={params[0].bio}
                  helperText="Creator Bio"
                  rows={10}
                 component={renderMultiLineField}
                  style={{ marginTop: 10 }}
                />

                <Field
                  label=""
                  id="bankDetails"
                  name="bankDetails"
                  type="text"
                  defaultValue={params[0].bankDetails}
                  helperText="Creator Bank Details. Please Include the SWIFT/IBAN Number if you are using a Bank outside Nigeria"
                  rows={10}
                 component={renderMultiLineField}
                  style={{ marginTop: 10 }}
                />

        <Field
          label=""
          id="status"
          name="status"
          type="text"
          helperText="Creator Status"
          component={renderStatusField}
          style={{ marginTop: 10 }}
        />
         <Card style={{marginTop:20, marginBottom:20}}>
            <CardMedia
                className={classes.media}
                component="img"
                alt={params[0].name}
                image={imageUrl}
            //   title={props.name}
                crossOrigin="anonymous"
             />
            </Card>

        <Field
          id="image"
          name="image"
          type="file"
          accept="image/*"
          //defaultValue={props.image}
          component={renderImageField}
          floatingLabelText={"Upload Creator Photo"}
          fullWidth={true}
        />
        <Button
          variant="contained"
          className={classes.submitUpdateButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonUpdateContent()
          )}
        </Button>
        {/* {!props.hasInfo && <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>} */}
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "editCreatorByAdminForm",
})(EditCreatorByAdminForm);
