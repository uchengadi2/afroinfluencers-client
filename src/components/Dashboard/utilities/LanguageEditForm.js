import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../../apis/local";
import { CREATE_LANGUAGE, CREATE_LOCATION, EDIT_LANGUAGE } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
    root: {
        //width: 600,
        marginTop: 20,
      },
      formStyles: {
        width: 600,
      },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 200,
    marginTop: 10,
    marginBottom: 10,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
}));

const renderSingularField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  helperText,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      label={label}
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
    />
  );
};



const renderMultipleField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  helperText,
  rows,
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
      // value={formInput.description}
      fullWidth
      type={type}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={rows}
      {...custom}
      onChange={input.onChange}

      // onChange={handleInput}
    />
  );
};



function LanguageEditForm(props) {
    const { params, token, userId } = props;
  const classes = useStyles();
  const [country, setCountry] = useState(params[0].countryId);
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get("/countries");
      const workingData = response.data.data.data;
      workingData.map((country) => {
        allData.push({ id: country._id, name: country.name });
      });
      setCountryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);



  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    //setStateList([]);
  };

  



  //get the country list
  const renderCountryList = () => {
    return countryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };



  const renderCountryField = ({
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
            onChange={handleCountryChange}
            label="Country"
            style={{ marginTop: 10, width: 500, height: 38 }}
          >
            {renderCountryList()}
          </Select>
          <FormHelperText>Country Where Language is Spoken</FormHelperText>
        </FormControl>
      </Box>
    );
  };


  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);
    const form = new FormData();
    form.append("language", formValues.language ? formValues.language : params[0].language);
    form.append("country", country);
    form.append("estimatedSpeakers", formValues.estimatedSpeakers ? formValues.estimatedSpeakers : params[0].estimatedSpeakers);
    //form.append("slug", formValues.slug);
    form.append("description", formValues.description ? formValues.description : params[0].description);
    form.append("createdBy", props.userId);
    if (formValues.image) {
      form.append("image", formValues.image[0]);
    }
    if (formValues) {
          const createForm = async () => {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.patch(`/languages/${params[0].id}`, form);
    
            if (response.data.status === "success") {
              dispatch({
                type: EDIT_LANGUAGE,
                payload: response.data.data.data,
              });
    
              props.handleSuccessfulEditSnackbar(
                `${response.data.data.data.language} Language is updated successfully!!!`
              );
              props.renderLanguageEdittedUpdateCounter();
              props.handleEditDialogOpenStatus();
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
  };

  return (
    <div className={classes.root}>
      <Grid
        item
        container
        style={{ marginTop: 1, marginBottom: 2 }}
        justifyContent="center"
      >
        <CancelRoundedIcon
          style={{
            marginLeft: 480,
            fontSize: 30,
            marginTop: "-10px",
            cursor: "pointer",
          }}
          onClick={() => [props.handleEditDialogOpenStatus()]}
        />
      </Grid>
      <Grid item container justifyContent="center">
        <FormLabel
          style={{ color: "grey", fontSize: "1.3em" }}
          component="legend"
        >
          Upadte Language
        </FormLabel>
      </Grid>
      <Box
        component="form"
        id="addLanguageForm"
        // onSubmit={onSubmit}
        sx={{
          width: 500,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
        style={{ marginTop: 10 }}
      >
         <Field
          label=""
          id="country"
          name="country"
          type="text"
          component={renderCountryField}
        />
        <Grid container direction="row" style={{ marginTop: 10 }}>
          <Grid item style={{ width: "100%",}}>
            <Field
              label=""
              id="language"
              name="language"
              defaultValue={params[0].language}
              type="text"
              helperText="Language Name"
              component={renderSingularField}
            />
          </Grid>
          {/* <Grid item style={{ width: "33%", marginLeft: 10 }}>
            <Field
              label=""
              id="code"
              name="code"
              type="text"
              component={renderLocationCodeField}
            />
          </Grid> */}
        </Grid>
        
        <Field
          label=""
          id="estimatedSpeakers"
          name="estimatedSpeakers"
          defaultValue={params[0].estimatedSpeakers}
          helperText="Estimated Number of Speakers"
          type="text"          
          component={renderSingularField}
        />      

       
        <Field
          label=""
          id="description"
          name="description"
          defaultValue={params[0].description}
          helperText="Describe Language"
          type="text"
          rows={8}
          component={renderMultipleField}
        />
       

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>
      </Box>
      {/* </form> */}
    </div>
  );
}

export default reduxForm({
  form: "addLanguageForm",
})(LanguageEditForm);
