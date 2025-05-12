import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import background from "./../../assets/images/home/path.jpg";

import { baseURL } from "../../apis/util";
import api from "../../apis/local";

import theme from "../ui/Theme";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 350,
    width: "93%",

    marginLeft: "4em",
    //borderRadius: 30,
    marginTop: "4em",
    marginBottom: "1em",
    padding: 0,
    backgroundColor: "#ECFFE6",
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: 30,
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#ECFFE6",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  comboType: {
    marginLeft: 10,
  },
  mediaMobile: {
    height: 150,
    width: 150,
    marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
    //marginTop: "80px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 30,
    marginTop: 25,
    marginBottom: 0,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    width: 120,
    marginLeft: 140,
    marginTop: 25,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function ServicePreferences(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  
  const [courseType, setCourseType] = useState("all");

  const [learningPath, setLearningPath] = useState("retail");
  const [servicePath, setServicePath] = useState(0);
  const [countriesList, setCountriesList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [nichesList, setNichesList] = useState([]);
  const [country, setCountry] = useState(0);
  const [language, setLanguage] = useState(0);
  const [niche, setNiche] = useState(0);
  const [age, setAge] = useState('all');
  const [deliveryDays, setDeliveryDays] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [gender, setGender] = useState('all');

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${product.imageCover}`;
  }

  const Str = require("@supercharge/strings");

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];

      if (country === 0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/countries`);
        const workingData = response.data.data.data;
        workingData.map((country) => {
          allData.push({ id: country._id, name: country.name });
        });
        setCountriesList(allData);
      } else {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/countries/${country}`);
        const workingData = response.data.data.data;
        workingData.map((country) => {
          allData.push({ id: country._id, name: country.name });
        });
        setCountriesList(allData);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [country]);

  //retrieve the languages data

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];

      if (language === 0 && country !==0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/languages`,{params:{country:country}});
        const workingData = response.data.data.data;
        workingData.map((language) => {
          allData.push({ id: language._id, name: language.language });
        });
        setLanguagesList(allData);
      } else if(language !== 0 && country !==0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/languages/${language}`, {
          params: {country:country },
        });
        const workingData = response.data.data.data;
        workingData.map((lang) => {
          allData.push({ id: lang._id, name: lang.language });
        });
        setLanguagesList(allData);
      }else if(language ===0 && country ===0){
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/languages`);
        const workingData = response.data.data.data;
        workingData.map((language) => {
          allData.push({ id: language._id, name: language.language });
        });
        setLanguagesList(allData);

      }//end
    };

    //call the function

    fetchData().catch(console.error);
  }, [language,country]);

//retrieve the niches

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];

      if (niche === 0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/niches`);
        const workingData = response.data.data.data;
        workingData.map((niche) => {
          allData.push({ id: niche._id, name: niche.niche });
        });
        setNichesList(allData);
      } else {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/niches/${niche}`);
        const workingData = response.data.data.data;
        workingData.map((niche) => {
          allData.push({ id: niche._id, name: niche.niche });
        });
        setNichesList(allData);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [niche]);

  
  

  const handleCountryChange=(event)=>{
    setCountry(event.target.value);
    
  }

  const handleLanguageChange=(event)=>{
    setLanguage(event.target.value);
    
  }

  const handleNicheChange=(event)=>{
    setNiche(event.target.value);
    
  }

  const handleDeliveryDaysChange=(event)=>{
    setDeliveryDays(event.target.value);
    
  }

  const handleAgeChange=(event)=>{
    setAge(event.target.value);
    
  }

  const handleGenderChange=(event)=>{
    setGender(event.target.value);
    
  }

  const handlePriceRangeChange=(event)=>{
    setPriceRange(event.target.value);
    
  }



  //get the country list
  const renderCountriesList = () => {
    let id = 0;
    return countriesList.map((item) => {
      return [
        id === 0 && (
          <MenuItem key={id++} value={0}>
            All Country
          </MenuItem>
        ),
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>,
      ];
    });
  };

  //get the languages list
  const renderLanguagesList = () => {
    let id = 0;
    return languagesList.map((item) => {
      return [
        id === 0 && (
          <MenuItem key={id++} value={0}>
            All Languages
          </MenuItem>
        ),

        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>,
      ];
    });
  };

  //get the niche list
  const renderNichesList = () => {
    let id = 0;
    return nichesList.map((item) => {
      return [
        id === 0 && (
          <MenuItem key={id++} value={0}>
            All Niches
          </MenuItem>
        ),
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>,
      ];
    });
  };

  

  const renderCountryField = () => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
            // label="State"
            style={{
              height: 38,
              width: matchesMDUp ? 140 : 170,
              marginTop: 10,
              //marginLeft: 45,
            }}
          >
            {renderCountriesList()}
          </Select>
          <FormHelperText>Choose Country</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderNichesField = () => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="niche"
            id="niche"
            value={niche}
            onChange={handleNicheChange}
            // label="State"
            style={{
              height: 38,
              width: matchesMDUp ? 140 : 170,
              marginTop: matchesMDUp ? 10 : 0,
              //marginLeft: 45,
            }}
          >
            {renderNichesList()}
          </Select>
          <FormHelperText>Choose Niche</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  const renderLanguagesField = () => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="language"
            id="language"
            value={language}
            onChange={handleLanguageChange}
            // label="State"
            style={{
              height: 38,
              width: matchesMDUp ? 140 : 170,
              marginTop:matchesMDUp ? 10 : 0,
              //marginLeft: 45,
            }}
          >
            {renderLanguagesList()}
          </Select>
          <FormHelperText>Choose Language</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  const renderDeliveryDaysField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="deliveryDays"
            id="deliveryDays"
            value={deliveryDays}
            onChange={handleDeliveryDaysChange}
            //label="Learning Path"
            style={{
              height: 38,
              width: matchesMDUp ? 140 :350,
              marginTop: matchesMDUp ? 10 : 0,
              marginLeft: matchesMDUp ? 10 : 0,
            }}
          >
            <MenuItem value={"all"}>All Delivery Days</MenuItem>
            <MenuItem value={"1"}>1 day
            </MenuItem>
            <MenuItem value={"<=2"}>Less than or equal to 2 days</MenuItem>
            <MenuItem value={"<=3"}>Less than or equal to 3 days</MenuItem>
            <MenuItem value={"<=4"}>Less than or equal to 4 days</MenuItem>
            <MenuItem value={"<=5"}>Less than or equal to 5 days</MenuItem>
            <MenuItem value={"<=6"}>Less than or equal to 6 days</MenuItem>
            <MenuItem value={"<=7"}>Less than or equal to 7 days</MenuItem>
            <MenuItem value={"above-7"}>Above 7 days</MenuItem>
          </Select>
          <FormHelperText>Delivery Days Range</FormHelperText>
        </FormControl>
      </Box>
    );
  };

 
    const renderGenderField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="gender"
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            //label="Learning Path"
            style={{
              height: 38,
              width: matchesMDUp ? 140 : 170,
              marginTop: matchesMDUp ? 10 : 0,
              marginLeft: matchesMDUp ? 10 : 0,
            }}
          >
            <MenuItem value={"all"}>All Gender</MenuItem>
            <MenuItem value={"male"}>Male
            </MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            
          </Select>
          <FormHelperText>Select Gender</FormHelperText>
        </FormControl>
      </Box>
    );
  };
 

  const renderAgeField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="age"
            id="age"
            value={age}
            onChange={handleAgeChange}
            //label="Learning Path"
            style={{
              height: 38,
              width: matchesMDUp ? 140 : 170,
              marginTop: matchesMDUp ? 10 : 0,
              marginLeft: matchesMDUp ? 10 : 0,
            }}
          >
            <MenuItem value={"all"}>All Ages</MenuItem>
            <MenuItem value={"18-24"}>18-24 years
            </MenuItem>
            <MenuItem value={"25-34"}>25-34 years</MenuItem>
            <MenuItem value={"35-45"}>35-45 years</MenuItem>

            <MenuItem value={"above-45"}>Above 45 years</MenuItem>
          </Select>
          <FormHelperText>Select Age Range</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPriceRangeField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="priceRange"
            id="priceRange"
            value={priceRange}
            onChange={handlePriceRangeChange}
            //label="Learning Path"
            style={{
              height: 38,
              width: matchesMDUp ? 140 : 170,
              marginTop: 10,
              marginLeft: matchesMDUp ? 10 : 0,
            }}
          >
            <MenuItem value={"all"}>All Price Ranges</MenuItem>
            <MenuItem value={"less-than-100000"}>Less than  &#8358;100,000
            </MenuItem>
            <MenuItem value={"100000-200000"}>Between &#8358;100,000 to &#8358;200,000</MenuItem>
            <MenuItem value={"200000-400000"}>Between &#8358;200,000 to &#8358;400,000</MenuItem>
            <MenuItem value={"400000-600000"}>Between &#8358;400,000 to &#8358;600,000</MenuItem>
            <MenuItem value={"600000-1000000"}>Between &#8358;600,000 to &#8358;1,000,000</MenuItem>

            <MenuItem value={"above-1000000"}>Above &#8358;1,000,000</MenuItem>
          </Select>
          <FormHelperText>Select Price Range</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onApplyFilter=()=>{

    props.updateCountryPathHandler(country)
    props.updateLanguagePathHandler(language)
    props.updateNichePathHandler(niche)
    props.updateDeliveryDaysPathHandler(deliveryDays)
    props.updateAgePathInfoHandler(age)
    props.updateGenderPathHandler(gender)
    props.updatePricePathHandler(priceRange)
    props.updateServicePathInfoInfo();

  }

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root}>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "9%" }}>
              <CardContent>{renderPriceRangeField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "9%", marginLeft: 40 }}>
              <CardContent>{renderCountryField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "9%", marginLeft: 40 }}>
              <CardContent>{renderLanguagesField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "9%", marginLeft: 40 }}>
              <CardContent>{renderNichesField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "9%", marginLeft: 40 }}>
              <CardContent>{renderDeliveryDaysField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "9%", marginLeft: 40 }}>
              <CardContent>{renderAgeField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "9%", marginLeft: 40 }}>
              <CardContent>{renderGenderField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "12%", marginLeft: 40 }}>
              <Button  
                variant="contained" 
                className={classes.submitButton}
                onClick={onApplyFilter}
                >Apply
              </Button>
            </Grid>
            
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
         
          <Grid container direction="column" style={{ marginTop: 20, width: 350 }}>
            <Grid item container direction="row" style={{width:350}}>
            <Grid item style={{ width: 170 }}>
              <CardContent>{renderPriceRangeField()}</CardContent>
            </Grid>
            <Grid item style={{ width: 170, marginLeft: 10 }}>
              <CardContent>{renderCountryField()}</CardContent>
            </Grid>            
            </Grid>

            <Grid item container direction="row" style={{width:350,marginTop: "-25px"}}>
            <Grid item style={{ width: 170 }}>
              <CardContent>{renderLanguagesField()}</CardContent>
            </Grid>
            <Grid item style={{ width: 170, marginLeft: 10 }}>
              <CardContent>{renderNichesField()}</CardContent>
            </Grid>            
            </Grid>

            <Grid item container direction="row" style={{width:350,marginTop: "-25px"}}>
            <Grid item style={{ width: 170 }}>
            <CardContent>{renderGenderField()}</CardContent>
            </Grid>
            <Grid item style={{ width: 170, marginLeft: 10 }}>
              <CardContent>{renderAgeField()}</CardContent>
            </Grid>            
            </Grid>


            <Grid item container direction="row" style={{width:350,marginTop: "-25px"}}>
            <Grid item style={{ width: 350 }}>
              <CardContent>{renderDeliveryDaysField()}</CardContent>
            </Grid>
                       
            </Grid>
                
            
            <Grid item container direction="row" style={{width:350,marginTop: "-25px"}}>
            
            <Grid item style={{ width: 350, marginLeft: 10 }}>
              <Button  
                variant="contained" 
                className={classes.submitButtonMobile}
                onClick={onApplyFilter}
                >Apply
              </Button>
            </Grid>
            </Grid>
            
            
          </Grid>
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </>
  );
}
