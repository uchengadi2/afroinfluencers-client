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
  const[platformsList, setPlatformsList] = useState([]);
  const [nicheList, setNicheList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [country, setCountry] = useState(props.creator.country ? props.creator.country[0].id : "");
  const [language, setLanguage] = useState([]);
  const [platform, setPlatform] = useState([])
  const [niche, setNiche] = useState([]);
  const [gender, setGender] = useState();
  const [currency, setCurrency] = useState();
  const [blogPostCostDuration, setBlogPostCostDuration] = useState("")
  const [creator, setCreator] = useState({});
  const [name, setName] = useState("");




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
      let allPlatformData = [];

      {props.languages.map((lang, index) => (
        allLangData.push(lang.id)
       

      ))}
      {props.niches.map((niche, index) => (
        allData.push(niche.id)
        

      ))}
      {props.creator.platforms.map((platform, index) => (
        allPlatformData.push(platform)
        

      ))}

      //set country
      setCountry(props.creator.country ? props.creator.country[0].id : "");
      setNiche(allData);
      setLanguage(allLangData)
      setCurrency(props.currency[0].id)
      setPlatform(allPlatformData)
      setBlogPostCostDuration(props.creator.blogPostCostDuration ? props.creator.blogPostCostDuration : "daily")
      setGender(props.creator.gender ? props.creator.gender:"male")
    
      
    };

    //call the function

    fetchData().catch(console.error);
  }, [props.languages, props.niches, props.currency,props.creator.country,props.creator.blogPostCostDuration]);

  



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
      const response = await api.get(`/platforms`);
      const workingData = response.data.data.data;
      workingData.map((platform) => {
        allData.push({ id: platform._id, name: platform.platform });
      });
      setPlatformsList(allData);
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

  const handlePlatformChange = (event)=>{
    setPlatform(event.target.value)
  }

  const handleBlogPostCostDurationChange = (event)=>{
    setBlogPostCostDuration(event.target.value)
  }

  

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

  //get the platformlist list
  const renderPlatformsList = () => {
    return platformsList.map((item) => {
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

  const renderBlogPostCostDurationField = ({
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
            labelId="blogPostCostDuration"
            id="blogPostCostDuration"
            value={blogPostCostDuration}
            onChange={handleBlogPostCostDurationChange}
            //label="Display On Store?"
            style={{width:matchesMDUp?650:220, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"daily"}>Daily</MenuItem>
            <MenuItem value={"weekly"}>Weekly</MenuItem>
            <MenuItem value={"bi-weekly"}>Bi-Weekly</MenuItem>
            <MenuItem value={"monthly"}>Monthly</MenuItem>
            <MenuItem value={"quarterly"}>Quarterly</MenuItem>
            <MenuItem value={"half-yearly"}>Haly Yearly</MenuItem>
            <MenuItem value={"yearly"}>Yearly</MenuItem>
          </Select>
          <FormHelperText>Blog Cost Per Post Duration</FormHelperText>
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
            style={{width:matchesMDUp?650:220, marginTop: 10, height: 38 }}
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
            style={{ marginTop: 0, width: matchesMDUp?650:220, height: 38, marginLeft:0,marginRight:0 }}
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
            style={{ marginTop: 10, width:matchesMDUp?650:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderLanguagesList()}
          </Select>
          <FormHelperText>What Languages Do You Prefer to Work With?</FormHelperText>
        </FormControl>
      </Box>
    );
  };




  const renderPlatformsField = ({
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
            labelId="platform"
            id="platform"            
            value={platform}                       
            multiple={true}
            onChange={handlePlatformChange}
            // label="User"
            style={{ marginTop: 10, width:matchesMDUp?650:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            <MenuItem value={"facebook"}>Facebook</MenuItem>
            <MenuItem value={"instagram"}>Instagram</MenuItem>
            <MenuItem value={"twitter"}>Twitter(X)</MenuItem>
            <MenuItem value={"tiktok"}>Tiktok</MenuItem>
            <MenuItem value={"linkedin"}>LinkedIn</MenuItem>
            <MenuItem value={"blog"}>Blog</MenuItem>
          </Select>
          <FormHelperText>What Platforms Do You Work With?</FormHelperText>
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
            style={{ marginTop: 10, width:matchesMDUp?650:220, height: 38, marginLeft:0,marginRight:0 }}
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
            style={{ marginTop: 10, width:matchesMDUp?650:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCurrenciesList()}
          </Select>
          <FormHelperText>Select The Currency To Work With(Nigerians Should Choose Naira)</FormHelperText>
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
            style={{ marginTop: 10, width:matchesMDUp?650:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCategoriesList()}
          </Select>
          <FormHelperText>Select Your Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };



console.log('creator id is:',props.creator._id)

  const onSubmit = (formValues) => {
    setLoading(true);

     //computing the facebook category of  a creator
      let facebookCategory = "";
      if(platform.includes("facebook")){
        if(formValues.facebookTotalFollowers && formValues.facebookTotalFollowers !== 0){
          if(formValues.facebookTotalFollowers < 1000){
            facebookCategory = "sub-nano-influencers";
          }else if(formValues.facebookTotalFollowers >= 1000 && formValues.facebookTotalFollowers < 10000){
            facebookCategory = "nano-influencers";
          }else if(formValues.facebookTotalFollowers >= 10000 && formValues.facebookTotalFollowers < 100000){
            facebookCategory = "micro-influencers";
          }else if(formValues.facebookTotalFollowers >= 100000 && formValues.facebookTotalFollowers < 1000000){
            facebookCategory = "macro-influencers";
          }else if(formValues.facebookTotalFollowers >= 1000000 && formValues.facebookTotalFollowers < 10000000){
            facebookCategory = "mega-influencers";
          }else if(formValues.facebookTotalFollowers >= 10000000){
            facebookCategory = "celebrity-influencers";
          }
        }else{
          facebookCategory = "sub-nano-influencers";
        }
      }else{
        facebookCategory = "sub-nano-influencers";
      }

      //computing the instagram category of  a creator
      let instagramCategory = "";
      if(platform.includes("instagram")){
        if(formValues.instagramTotalFollowers && formValues.instagramTotalFollowers !== 0){
          if(formValues.instagramTotalFollowers < 1000){
            instagramCategory = "sub-nano-influencers";
          }else if(formValues.instagramTotalFollowers >= 1000 && formValues.instagramTotalFollowers < 10000){
            instagramCategory = "nano-influencers";
          }else if(formValues.instagramTotalFollowers >= 10000 && formValues.instagramTotalFollowers < 100000){
            instagramCategory = "micro-influencers";
          }else if(formValues.instagramTotalFollowers >= 100000 && formValues.instagramTotalFollowers < 1000000){
            instagramCategory = "macro-influencers";
          }else if(formValues.instagramTotalFollowers >= 1000000 && formValues.instagramTotalFollowers < 10000000){
            instagramCategory = "mega-influencers";
          }else if(formValues.instagramTotalFollowers >= 10000000){
            instagramCategory = "celebrity-influencers";
          }
        }else{
          instagramCategory = "sub-nano-influencers";
        }
      }else{
        instagramCategory = "sub-nano-influencers";
      }

      //computing the twitter category of  a creator
      let twitterCategory = "";
      if(platform.includes("twitter")){
        if(formValues.twitterTotalFollowers && formValues.twitterTotalFollowers !== 0){
          if(formValues.twitterTotalFollowers < 1000){
            twitterCategory = "sub-nano-influencers";
          }else if(formValues.twitterTotalFollowers >= 1000 && formValues.twitterTotalFollowers < 10000){
            twitterCategory = "nano-influencers";
          }else if(formValues.twitterTotalFollowers >= 10000 && formValues.twitterTotalFollowers < 100000){
            twitterCategory = "micro-influencers";
          }else if(formValues.twitterTotalFollowers >= 100000 && formValues.twitterTotalFollowers < 1000000){
            twitterCategory = "macro-influencers";
          }else if(formValues.twitterTotalFollowers >= 1000000 && formValues.twitterTotalFollowers < 10000000){
            twitterCategory = "mega-influencers";
          }else if(formValues.twitterTotalFollowers >= 10000000){
            twitterCategory = "celebrity-influencers";
          }
        }else{
          twitterCategory = "sub-nano-influencers";
        }
      }else{
        twitterCategory = "sub-nano-influencers";
      }

      //computing the tiktok category of  a creator
      let tiktokCategory = "";
      if(platform.includes("tiktok")){
        if(formValues.tiktokTotalFollowers && formValues.tiktokTotalFollowers !== 0){
          if(formValues.tiktokTotalFollowers < 1000){
            tiktokCategory = "sub-nano-influencers";
          }else if(formValues.tiktokTotalFollowers >= 1000 && formValues.tiktokTotalFollowers < 10000){
            tiktokCategory = "nano-influencers";
          }else if(formValues.tiktokTotalFollowers >= 10000 && formValues.tiktokTotalFollowers < 100000){
            tiktokCategory = "micro-influencers";
          }else if(formValues.tiktokTotalFollowers >= 100000 && formValues.tiktokTotalFollowers < 1000000){
            tiktokCategory = "macro-influencers";
          }else if(formValues.tiktokTotalFollowers >= 1000000 && formValues.tiktokTotalFollowers < 10000000){
            tiktokCategory = "mega-influencers";
          }else if(formValues.tiktokTotalFollowers >= 10000000){
            tiktokCategory = "celebrity-influencers";
          }
        }else{
          tiktokCategory = "sub-nano-influencers";
        }
      }else{
        tiktokCategory = "sub-nano-influencers";
      }
      //computing the linkedIn category of  a creator
      let linkedInCategory = "";
      if(platform.includes("linkedin")){
        if(formValues.linkedInTotalFollowers && formValues.linkedInTotalFollowers !== 0){
          if(formValues.linkedInTotalFollowers < 1000){
            linkedInCategory = "sub-nano-influencers";
          }else if(formValues.linkedInTotalFollowers >= 1000 && formValues.linkedInTotalFollowers < 10000){
            linkedInCategory = "nano-influencers";
          }else if(formValues.linkedInTotalFollowers >= 10000 && formValues.linkedInTotalFollowers < 100000){
            linkedInCategory = "micro-influencers";
          }else if(formValues.linkedInTotalFollowers >= 100000 && formValues.linkedInTotalFollowers < 1000000){
            linkedInCategory = "macro-influencers";
          }else if(formValues.linkedInTotalFollowers >= 1000000 && formValues.linkedInTotalFollowers < 10000000){
            linkedInCategory = "mega-influencers";
          }else if(formValues.linkedInTotalFollowers >= 10000000){
            linkedInCategory = "celebrity-influencers";
          }
        }else{
          linkedInCategory = "sub-nano-influencers";
        }
      }else{
        linkedInCategory = "sub-nano-influencers";
      }
      //computing the blog category of  a creator
      let blogCategory = "";
      if(platform.includes("blog")){
        if(formValues.blogTotalVisitorsPerMonth && formValues.blogTotalVisitorsPerMonth !== 0){
          if(formValues.blogTotalVisitorsPerMonth < 1000){
            blogCategory = "sub-nano-influencers";
          }else if(formValues.blogTotalVisitorsPerMonth >= 1000 && formValues.blogTotalVisitorsPerMonth < 10000){
            blogCategory = "nano-influencers";
          }else if(formValues.blogTotalVisitorsPerMonth >= 10000 && formValues.blogTotalVisitorsPerMonth < 100000){
            blogCategory = "micro-influencers";
          }else if(formValues.blogTotalVisitorsPerMonth >= 100000 && formValues.blogTotalVisitorsPerMonth < 1000000){
            blogCategory = "macro-influencers";
          }else if(formValues.blogTotalVisitorsPerMonth >= 1000000 && formValues.blogTotalVisitorsPerMonth < 10000000){
            blogCategory = "mega-influencers";
          }else if(formValues.blogTotalVisitorsPerMonth >= 10000000){
            blogCategory = "celebrity-influencers";
          }
        }else{
          blogCategory = "sub-nano-influencers";
        }
      }else{
        blogCategory = "sub-nano-influencers";
      }

    if(props.hasInfo && !props.creator.id){

      if (
        !formValues["name"] ||
        formValues["name"].replace(/\s/g, "").length === 0
      ) {
        props.handleFailedSnackbar("The creator name field cannot be empty");
        setLoading(false);
        return;
      }
  

      
      const slug = `${formValues.name.replace(/\s/g, '-').toLowerCase()}-${Math.floor(Math.random() * 100000000)}`;
   
      const Str = require("@supercharge/strings");
  
      const form = new FormData();
      form.append("name", formValues.name);
      form.append("slug", slug);
      form.append("age", formValues.age);
      form.append("bio", formValues.bio);
      form.append("bankDetails", formValues.bankDetails);      
      form.append("gender", gender);
      form.append("status", 'inactive');    
      form.append("currency", currency);
      form.append("country", country);
      //form.append("category", category);
      //form.append("status", status);
      form.append("creatorContactPhoneNumber", formValues.creatorContactPhoneNumber);
      form.append("creatorContactEmailAddress", formValues.creatorContactEmailAddress);
      form.append("facebookProfileLink", formValues.facebookProfileLink);
      form.append("instagramProfileLink", formValues.instagramProfileLink);
      form.append("twitterProfileLink", formValues.twitterProfileLink);
      form.append("tiktokProfileLink", formValues.tiktokProfileLink);
      form.append("linkedInProfileLink", formValues.linkedInProfileLink);
      form.append("blogSiteLink", formValues.blogSiteLink);
      form.append("facebookTotalFollowers", formValues.facebookTotalFollowers);
      form.append("instagramTotalFollowers", formValues.instagramTotalFollowers);
      form.append("twitterTotalFollowers", formValues.twitterTotalFollowers);
      form.append("tiktokTotalFollowers", formValues.tiktokTotalFollowers);
      form.append("linkedInTotalFollowers", formValues.linkedInTotalFollowers);
      form.append("blogTotalVisitorsPerMonth", formValues.blogTotalVisitorsPerMonth);
      form.append("facebookEngagementRate", formValues.facebookEngagementRate);
      form.append("instagramEngagementRate", formValues.instagramEngagementRate);
      form.append("twitterEngagementRate", formValues.twitterEngagementRate);
      form.append("tiktokEngagementRate", formValues.tiktokEngagementRate);
      form.append("linkedInEngagementRate", formValues.linkedInEngagementRate);
      form.append("facebookCostPerPost", formValues.facebookCostPerPost);
      form.append("instagramCostPerPost", formValues.instagramCostPerPost);

      form.append("twitterCostPerPost", formValues.twitterCostPerPost);
      form.append("tiktokCostPerPost", formValues.tiktokCostPerPost);
      form.append("linkedInCostPerPost", formValues.linkedInCostPerPost);
      form.append("blogCostPerPost", formValues.blogCostPerPost);
      form.append("blogPostCostDuration", blogPostCostDuration);

      form.append("facebookCategory", facebookCategory);
      form.append("instagramCategory", instagramCategory);
      form.append("twitterCategory", twitterCategory);
      form.append("tiktokCategory", tiktokCategory);
      form.append("linkedInCategory", linkedInCategory);
      form.append("blogCategory", blogCategory);
      
      form.append("user", props.userId);
  
    //niches
        for (let i = 0; i < niche.length; i++) {
        form.append(`niches`, niche[i]);
      }
  
      //language
      for (let i = 0; i < language.length; i++) {
        form.append(`languages`, language[i]);
      }

         //platform
      for (let i = 0; i < platform.length; i++) {
        form.append(`platforms`, platform[i]);
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

           

      const Str = require("@supercharge/strings");
  
      const form = new FormData();
      form.append("name", formValues.name ? formValues.name : props.creator.name);
      //form.append("slug", slug);
      
      form.append("age", formValues.age ? formValues.age : props.creator.age);  
      form.append("bio", formValues.bio ? formValues.bio : props.creator.bio);
      form.append("gender", gender ? gender : props.creator.gender);
      form.append("status", status?status: props.creator.status);    
      form.append("currency", currency ? currency : props.creator.currency);
      form.append("country", country ? country : props.creator.country[0].id);
      //form.append("category", category ? category : props.category);
      form.append("bankDetails", formValues.bankDetails ? formValues.bankDetails : props.creator.bankDetails);  
      form.append("user", props.userId);
      form.append("creatorContactPhoneNumber", formValues.creatorContactPhoneNumber ? formValues.creatorContactPhoneNumber : props.creator.creatorContactPhoneNumber);
      form.append("creatorContactEmailAddress", formValues.creatorContactEmailAddress ? formValues.creatorContactEmailAddress : props.creator.creatorContactEmailAddress);

      form.append("facebookProfileLink", formValues.facebookProfileLink ? formValues.facebookProfileLink : props.creator.facebookProfileLink);
      form.append("instagramProfileLink", formValues.instagramProfileLink ? formValues.instagramProfileLink : props.creator.instagramProfileLink);
      form.append("twitterProfileLink", formValues.twitterProfileLink ? formValues.twitterProfileLink : props.creator.twitterProfileLink);
      form.append("tiktokProfileLink", formValues.tiktokProfileLink ? formValues.tiktokProfileLink : props.creator.tiktokProfileLink);
      form.append("linkedInProfileLink", formValues.linkedInProfileLink ? formValues.linkedInProfileLink : props.creator.linkedInProfileLink);
      form.append("blogSiteLink", formValues.blogSiteLink ? formValues.blogSiteLink : props.creator.blogSiteLink);
      form.append("facebookTotalFollowers", formValues.facebookTotalFollowers ? formValues.facebookTotalFollowers : props.creator.facebookTotalFollowers);
      form.append("instagramTotalFollowers", formValues.instagramTotalFollowers ? formValues.instagramTotalFollowers : props.creator.instagramTotalFollowers);
      form.append("twitterTotalFollowers", formValues.twitterTotalFollowers ? formValues.twitterTotalFollowers : props.creator.twitterTotalFollowers);
      
      form.append("tiktokTotalFollowers", formValues.tiktokTotalFollowers ? formValues.tiktokTotalFollowers : props.creator.tiktokTotalFollowers);
      form.append("linkedInTotalFollowers", formValues.linkedInTotalFollowers ? formValues.linkedInTotalFollowers : props.creator.linkedInTotalFollowers);
      form.append("blogTotalVisitorsPerMonth", formValues.blogTotalVisitorsPerMonth ? formValues.blogTotalVisitorsPerMonth : props.creator.blogTotalVisitorsPerMonth);
      form.append("facebookEngagementRate", formValues.facebookEngagementRate ? formValues.facebookEngagementRate : props.creator.facebookEngagementRate);
      form.append("instagramEngagementRate", formValues.instagramEngagementRate ? formValues.instagramEngagementRate : props.creator.instagramEngagementRate);
      form.append("twitterEngagementRate", formValues.twitterEngagementRate ? formValues.twitterEngagementRate : props.creator.twitterEngagementRate);
      form.append("tiktokEngagementRate", formValues.tiktokEngagementRate ? formValues.tiktokEngagementRate : props.creator.tiktokEngagementRate);
      form.append("linkedInEngagementRate", formValues.linkedInEngagementRate ? formValues.linkedInEngagementRate : props.creator.linkedInEngagementRate);
      form.append("facebookCostPerPost", formValues.facebookCostPerPost ? formValues.facebookCostPerPost : props.creator.facebookCostPerPost);
      form.append("instagramCostPerPost", formValues.instagramCostPerPost ? formValues.instagramCostPerPost : props.creator.instagramCostPerPost);

      form.append("twitterCostPerPost", formValues.twitterCostPerPost ? formValues.twitterCostPerPost : props.creator.twitterCostPerPost);
      form.append("tiktokCostPerPost", formValues.tiktokCostPerPost ? formValues.tiktokCostPerPost : props.creator.tiktokCostPerPost);
      form.append("linkedInCostPerPost", formValues.linkedInCostPerPost ? formValues.linkedInCostPerPost : props.creator.linkedInCostPerPost);
      form.append("blogCostPerPost", formValues.blogCostPerPost ? formValues.blogCostPerPost : props.creator.blogCostPerPost);
      form.append("blogPostCostDuration", blogPostCostDuration ? blogPostCostDuration : props.creator.blogPostCostDuration);

      if(formValues.facebookTotalFollowers){
        form.append("facebookCategory", facebookCategory);
      }else{
        form.append("facebookCategory", props.creator.facebookCategory);
      }
      if(formValues.instagramTotalFollowers){
        form.append("instagramCategory", instagramCategory);
      }else{
        form.append("instagramCategory", props.creator.instagramCategory);
      }
      if(formValues.twitterTotalFollowers){
        form.append("twitterCategory", twitterCategory);
      }else{
        form.append("twitterCategory", props.creator.twitterCategory);
      }
      if(formValues.tiktokTotalFollowers){
        form.append("tiktokCategory", tiktokCategory);
      }else{
        form.append("tiktokCategory", props.creator.tiktokCategory);
      }
      if(formValues.linkedInTotalFollowers){
        form.append("linkedInCategory", linkedInCategory);
      }else{
        form.append("linkedInCategory", props.creator.linkedInCategory);
      }
      if(formValues.blogTotalVisitorsPerMonth){
        form.append("blogCategory", blogCategory);
      }else{
        form.append("blogCategory", props.creator.blogCategory);
      }
      
  
    //niches
        for (let i = 0; i < niche.length; i++) {
        form.append(`niches`, niche[i]);
      }
  
      //language
      for (let i = 0; i < language.length; i++) {
        form.append(`languages`, language[i]);
      }

      //platform
      for (let i = 0; i < platform.length; i++) {
        form.append(`platforms`, platform[i]);
      }
         
  
     
      form.append("createdBy", props.userId);
      if (formValues.image) {
        form.append("image", formValues.image[0]);
      }

      console.log('formvalues:',formValues)
  
      if (form) {
            const editForm = async () => {
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
              const response = await api.patch(`/creators/${props.creator.id}`, form);
      
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
            {props.hasInfo && props.creator.id ? "Update Your Information" : "Complete Your Information"}
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
          id="platform"
          name="platform"
          type="text"
          component={renderPlatformsField}
        />
        

        <Field
          label=""
          id="name"
          name="name"
          type="text"
          defaultValue={props.creator.name}
          helperText="Your Name"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="creatorContactPhoneNumber"
          name="creatorContactPhoneNumber"
          type="text"
          defaultValue={props.creator.creatorContactPhoneNumber}
          helperText="Your Contact Phone Number"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="creatorContactEmailAddress"
          name="creatorContactEmailAddress"
          type="text"
          defaultValue={props.creator.creatorContactEmailAddress}
          helperText="Your Contact Email Address"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="age"
          name="age"
          type="number"
          defaultValue={props.creator.age}  
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
          id="facebookProfileLink"
          name="facebookProfileLink"
          defaultValue={props.creator.facebookProfileLink}
          type="text"
          helperText={`Enter Your Facebook Profile Link`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="instagramProfileLink"
          name="instagramProfileLink"
          defaultValue={props.creator.instagramProfileLink}
          type="text"
          helperText={`Enter Your Instagram Profile Link`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="twitterProfileLink"
          name="twitterProfileLink"
          defaultValue={props.creator.twitterProfileLink}
          type="text"
          helperText={`Enter Your X(Twitter) Profile Link`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="tiktokProfileLink"
          name="tiktokProfileLink"
          defaultValue={props.creator.tiktokProfileLink}
          type="text"
          helperText={`Enter Your Tiktok Profile Link`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="linkedInProfileLink"
          name="linkedInProfileLink"
          defaultValue={props.creator.linkedInProfileLink}
          type="text"
          helperText={`Enter Your LinkedIn Profile Link`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="blogSiteLink"
          name="blogSiteLink"
          defaultValue={props.creator.blogSiteLink}
          type="text"
          helperText={`Enter Your Blog Site Profile Link`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="facebookTotalFollowers"
          name="facebookTotalFollowers"
          defaultValue={props.creator.facebookTotalFollowers}
          type="number"
          helperText={`Enter Your Total Facebook Followers`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="instagramTotalFollowers"
          name="instagramTotalFollowers"
          defaultValue={props.creator.instagramTotalFollowers}
          type="number"
          helperText={`Enter Your Total Instagram Followers`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="twitterTotalFollowers"
          name="twitterTotalFollowers"
          defaultValue={props.creator.twitterTotalFollowers}
          type="number"
          helperText={`Enter Your Total X(Twitter) Followers`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="tiktokTotalFollowers"
          name="tiktokTotalFollowers"
          defaultValue={props.creator.tiktokTotalFollowers}
          type="number"
          helperText={`Enter Your Total TikTok Followers`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="linkedInTotalFollowers"
          name="linkedInTotalFollowers"
          defaultValue={props.creator.linkedInTotalFollowers}
          type="number"
          helperText={`Enter Your Total LinkedIn Followers`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="blogTotalVisitorsPerMonth"
          name="blogTotalVisitorsPerMonth"
          defaultValue={props.creator.blogTotalVisitorsPerMonth}
          type="number"
          helperText={`Enter The Estimated Number of Visitors To Your Blog Site per Month`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="facebookEngagementRate"
          name="facebookEngagementRate"
          defaultValue={props.creator.facebookEngagementRate}
          type="number"
          helperText={`Enter Your Facebook Engagement Rate(in Percentages, 1 to 100)`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="instagramEngagementRate"
          name="instagramEngagementRate"
          defaultValue={props.creator.instagramEngagementRate}
          type="number"
          helperText={`Enter Your Twitter Engagement Rate(in Percentages, 1 to 100)`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="twitterEngagementRate"
          name="twitterEngagementRate"
          defaultValue={props.creator.twitterEngagementRate}
          type="number"
          helperText={`Enter Your X(Twitter) Engagement Rate(in Percentages, 1 to 100)`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="tiktokEngagementRate"
          name="tiktokEngagementRate"
          defaultValue={props.creator.tiktokEngagementRate}
          type="number"
          helperText={`Enter Your TikTok Engagement Rate(in Percentages, 1 to 100)`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="linkedInEngagementRate"
          name="linkedInEngagementRate"
          defaultValue={props.creator.linkedInEngagementRate}
          type="number"
          helperText={`Enter Your LinkedIn Engagement Rate(in Percentages, 1 to 100)`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="facebookCostPerPost"
          name="facebookCostPerPost"
          defaultValue={props.creator.facebookCostPerPost}
          type="number"
          helperText={`Enter Your Facebook Cost Per Post`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="instagramCostPerPost"
          name="instagramCostPerPost"
          defaultValue={props.creator.instagramCostPerPost}
          type="number"
          helperText={`Enter Your Instagram Cost Per Post`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="twitterCostPerPost"
          name="twitterCostPerPost"
          defaultValue={props.creator.twitterCostPerPost}
          type="number"
          helperText={`Enter Your X(Twitter) Cost Per Post`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="tiktokCostPerPost"
          name="tiktokCostPerPost"
          defaultValue={props.creator.tiktokCostPerPost}
          type="number"
          helperText={`Enter Your TikTok Cost Per Post`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="linkedInCostPerPost"
          name="linkedInCostPerPost"
          defaultValue={props.creator.linkedInCostPerPost}
          type="number"
          helperText={`Enter Your LinkedIn Cost Per Post`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="blogCostPerPost"
          name="blogCostPerPost"
          defaultValue={props.creator.blogCostPerPost}
          type="number"
          helperText={`Enter Your Blog Cost Per Post`}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
         <Field
          label=""
          id="blogPostCostDuration"
          name="blogPostCostDuration"
          type="text"
          component={renderBlogPostCostDurationField}
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
          defaultValue={props.creator.bio}
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
          defaultValue={props.creator.bankDetails}
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
        {props.hasInfo && props.creator.id && <Button
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
        
                
        {props.hasInfo && !props.creator.id && <Button
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
