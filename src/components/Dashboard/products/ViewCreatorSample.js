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
  
  videoMedia:{
    height:"100%"
  }
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

function ViewCreatorSample(props) {
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
  
  
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  

  const buttonUpdateContent = () => {
    return <React.Fragment> Close</React.Fragment>;
  };

    

  
  return (
    <form id="viewCreatorSample">
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
          <CancelRoundedIcon
            style={{
              marginLeft: 350,
              fontSize: 30,
              marginTop: "-10px",
              cursor: "pointer",
            }}
            onClick={() => [props.handleEditDialogOpenStatus()]}
          />
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
            Creator Sample
          </FormLabel>
          
        </Grid>       

       
         <Card style={{marginTop:10, marginBottom:20,height:200}}>
            <CardMedia
                className={classes.videoMedia}
                component="iframe"
                alt={'creator sample'}
                height="140"
                src={`https://www.youtube.com/embed/${params[0].youtubeId}`}
                allow="autoPlay"
                allowfullscreen="allowfullscreen"
                controls
             />
            </Card>
            <Field
                label=""
                id="refNumber"
                name="refNumber"
                type="text"
                defaultValue={params[0].refNumber}
                helperText="Reference Number"
                component={renderSingleLineField}
                style={{ marginTop: 10 }}
            />  
             <Field
                label=""
                id="sampleType"
                name="sampleType"
                type="text"
                defaultValue={params[0].sampleType}
                helperText="sample Type"
                component={renderSingleLineField}
                style={{ marginTop: 10 }}
            />
            <Field
                label=""
                id="status"
                name="status"
                type="text"
                defaultValue={params[0].status}
                helperText="Sample Status"
                component={renderSingleLineField}
                style={{ marginTop: 10 }}
            />
            <Field
                label=""
                id="isAllowedOnThePlatform"
                name="isAllowedOnThePlatform"
                type="text"
                defaultValue={params[0].isAllowedOnThePlatform}
                helperText="Is This Sample Approved?"
                component={renderSingleLineField}
                style={{ marginTop: 10 }}
            />

       
        <Button
          variant="contained"
          className={classes.submitUpdateButton}
          onClick={props.handleEditDialogOpenStatus}
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
  form: "viewCreatorSample",
})(ViewCreatorSample);
