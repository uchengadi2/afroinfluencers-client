import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../../../apis/local";
import { CREATE_SAMPLE } from "../../../../actions/types";

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
    marginLeft: 100,
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
      defaultValue={input.value}
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



const renderMultilineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  id,
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
      minRows={4}
      {...custom}
      onChange={input.onChange}
    />
  );
};



function NewSampleForm(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("visible");
  const [sampleType, setSampleType] = useState("video")

  const dispatch = useDispatch();

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const handleStatusChange =(e)=>{
    setStatus(e.target.value)
  }
  const handleSampleTypeChange =(e)=>{
    setSampleType(e.target.value)
  }

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
            style={{width:300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"visible"}>Visible</MenuItem>
            <MenuItem value={"invisible"}>Not Visible</MenuItem>
            
          </Select>
          <FormHelperText>Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderSampleTypeField = ({
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
              labelId="sampleType"
              id="sampleType"
              value={sampleType}
              onChange={handleSampleTypeChange}
              //label="Display On Store?"
              style={{width:300, marginTop: 10, height: 38 }}
              //{...input}
            >
              <MenuItem value={"video"}>Video</MenuItem>
              <MenuItem value={"audio"}>Audio</MenuItem>
              
            </Select>
            <FormHelperText>Sample Type</FormHelperText>
          </FormControl>
        </Box>
      );
    };


  const onSubmit = (formValues) => {
    setLoading(true);

    if (
      !formValues["youtubeId"] ||
      formValues["youtubeId"].replace(/\s/g, "").length === 0
    ) {
      props.handleFailedSnackbar("The Youtube ID field cannot be empty");
      setLoading(false);
      return;
    }

    

    const Str = require("@supercharge/strings");

    const form = new FormData();
    form.append("youtubeId", formValues.youtubeId);
    form.append("sampleType", sampleType);
    form.append("slug", formValues.slug);
    form.append("status", status);
    form.append("isAllowedOnThePlatform", false);
    form.append("creator", props.creatorId);
    form.append("createdBy", props.userId);

    if (!formValues["refNumber"]) {
        const refNumber =
          "CREATOR" + "-" + Math.floor(Math.random() * 100000000) + "-" + "SAMPLE";
  
        form.append("refNumber", refNumber);
      } else {
        form.append("refNumber", formValues.refNumber);
      }
      

    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/samples`, form);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_SAMPLE,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `This new sample with ${response.data.data.data.youtubeId} Youtube ID  is added successfully!!!`
          );
          props.renderCategoryUpdateCounter();
          props.handleDialogOpenStatus();
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
    <form id="newSampleForm">
      <Box
        // component="form"
        // id="categoryForm"
        // onSubmit={onSubmit}
        sx={{
          width: 300,
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
            Add Sample
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="youtubeId"
          name="youtubeId"
          type="text"
          helperText="Enter Sample YouTube ID"
          component={renderSingleLineField}
        />

        <Field
          label=""
          id="sampleType"
          name="sampleType"
          type="text"
          component={renderSampleTypeField}

        />
        <Field
          label=""
          id="status"
          name="status"
          type="text"
          component={renderStatusField}
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
         <Grid
                        item
                        container
                        style={{ width: "100%", marginLeft: 2,marginTop:10, fontSize: 10 }}
                      >
                        <Button
                          variant="text"
                          onClick={() => [
                            props.handleYoutubeOpen(),
                            //history.push("/"),
                          ]}
                        >
                          Want to know how to retrieve Youtube ID? Click Here
                        </Button>
                      </Grid>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "newSampleForm",
})(NewSampleForm);
