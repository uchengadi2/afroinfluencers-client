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
import { CREATE_BRAND, CREATE_CREATOR, CREATE_MENTOR, EDIT_BRAND, EDIT_CREATOR } from "../../../actions/types";

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

function AddBrandForm(props) {
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
            style={{width:matchesMDUp? 660:220, marginTop: 10, height: 38 }}
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
            style={{ marginTop: 0, width: matchesMDUp? 660:220, height: 38, marginLeft:0,marginRight:0 }}
            //{...input}
          >
            {renderCountriesList()}
          </Select>
          <FormHelperText>Brand's Country</FormHelperText>
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
        props.handleFailedSnackbar("The brand name field cannot be empty");
        setLoading(false);
        return;
      }
  
     
  
      const Str = require("@supercharge/strings");
  
      const form = new FormData();
      form.append("name", formValues.name);
      form.append("description", formValues.description);
      form.append("slug", formValues.slug);     
      form.append("status", 'inactive');    
      form.append("currency", currency);
      form.append("country", country);
      form.append("user", props.userId);
      form.append("brandContactPhoneNumber", formValues.brandContactPhoneNumber);
      form.append("brandContactEmailAddress", formValues.brandContactEmailAddress);
  
      
      form.append("createdBy", props.userId);
      if (formValues.image) {
        form.append("image", formValues.image[0]);
      }
  
      if (formValues) {
        const createForm = async () => {
          api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          const response = await api.post(`/brands`, form);
  
          if (response.data.status === "success") {
            dispatch({
              type: CREATE_BRAND,
              payload: response.data.data.data,
            });
  
            props.handleSuccessfulCreateSnackbar(
              `${response.data.data.data.name} brand information is successfully completed!!!`
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
      form.append("name", formValues.name ? formValues.name : props.yourName);
      form.append("description", formValues.description ? formValues.description : props.description);
      form.append("slug", formValues.slug ? formValues.slug : props.yourSlug);
      form.append("status", status?status: props.status);    
      form.append("country", country ? country : props.yourCountry);
      form.append("user", props.userId);
      form.append("brandContactPhoneNumber", formValues.brandContactPhoneNumber ? formValues.brandContactPhoneNumber : props.brandContactPhoneNumber);
      form.append("brandContactEmailAddress", formValues.brandContactEmailAddress ? formValues.brandContactEmailAddress : props.brandContactEmailAddress);
  
         
      form.append("createdBy", props.userId);
      if (formValues.image) {
        form.append("image", formValues.image[0]);
      }
  
      if (form) {
            const editForm = async () => {
              api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
              const response = await api.patch(`/brands/${props.brandId}`, form);
      
              if (response.data.status === "success") {
                dispatch({
                  type: EDIT_BRAND,
                  payload: response.data.data.data,
                });
      
                props.handleSuccessfulEditSnackbar(
                  `${response.data.data.data.name} Brand Informtion  is updated successfully!!!`
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
    <form id="addBrandForm">
      <Box
        // component="form"
        // id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
         // width: 300,
          //height: 430,
          marginLeft:matchesMDUp?200:0,
          marginRight:matchesMDUp ? 200:0,
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
            style={{ color: "grey", fontSize: "1.8em" }}
            component="legend"
          >
            {props.hasInfo ? "Update Your Brand Information" : "Complete Your Brand Information"}
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
          id="name"
          name="name"
          type="text"
          defaultValue={props.yourName}
          helperText="Your Brand Name"
         component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
                  label=""
                  id="brandContactPhoneNumber"
                  name="brandContactPhoneNumber"
                  type="text"
                  defaultValue={props.brandContactPhoneNumber}
                  helperText="Your Brand Contact Phone Number"
                 component={renderSingleLineField}
                  style={{ marginTop: 10 }}
                />
                <Field
                  label=""
                  id="brandContactEmailAddress"
                  name="brandContactEmailAddress"
                  type="text"
                  defaultValue={props.brandContactEmailAddress}
                  helperText="Your Brand Contact Email Address"
                 component={renderSingleLineField}
                  style={{ marginTop: 10 }}
                />

        <Field
          label=""
          id="description"
          name="description"
          type="text"
          defaultValue={props.description}
          helperText="Describe Brand"
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
          floatingLabelText={"Upload Your Brand Photo"}
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
  form: "addBrandForm",
})(AddBrandForm);
