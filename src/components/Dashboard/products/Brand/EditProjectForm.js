import React, { useState, useEffect } from "react";
import useToken from "../../../../custom-hooks/useToken";
import useUserId from "../../../../custom-hooks/useUserId";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
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
import api from "./../../../../apis/local";
import { CREATE_PROJECT, EDIT_PRODUCT, EDIT_PROJECT } from "../../../../actions/types";

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
  helperText,
  id,
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

const renderMultiLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  rows,
  helperText,
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
      minRows={rows}
      {...custom}
      onChange={input.onChange}
    />
  );
};

function EditProjectForm(props) {
    const { params, token, userId } = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
    const [languageList, setLanguageList] = useState([]);
  
    const [language, setLanguage] = useState(params[0].languageId);
    const [projectType, setProjectType] = useState(params[0].type)

  const dispatch = useDispatch();


  
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


  const handleLanguageChange = (event) => {
      setLanguage(event.target.value);
    };

    const handleTypeChange = (event) => {
        setProjectType(event.target.value);
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
         // multiple={true}
          onChange={handleLanguageChange}
          // label="User"
          style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
          //{...input}
        >
          {renderLanguagesList()}
        </Select>
        <FormHelperText>Select The Language That Will Be Used For This Project</FormHelperText>
      </FormControl>
    </Box>
  );
};

const renderTypeField = ({
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
            labelId="projectType"
            id="projectType"
            value={projectType}
            onChange={handleTypeChange}
            //label="Is Featured"
            style={{ width: 300, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"video"}>Video</MenuItem>
            <MenuItem value={"audio"}>Audio</MenuItem>
          </Select>
          <FormHelperText>Select Project Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  

  const onSubmit = (formValues) => {
    setLoading(true);

    const Str = require("@supercharge/strings");

    const form = new FormData();
    form.append("name", formValues.name? formValues.name : params[0].name);
    form.append("slug", formValues.slug ? formValues.slug : params[0].slug);
    form.append("description", formValues.description ? formValues.description : params[0].description);
    form.append("brief", formValues.brief ? formValues.brief : params[0].brief);
    form.append("brand", props.brandId);
    form.append("language", language ? language : params[0].languageId);
    form.append("type", projectType ? projectType : params[0].type);
    form.append("modifiedBy", props.userId);
    if (formValues.image) {
      form.append("image", formValues.image[0]);
    }

    if (formValues) {
          const editForm = async () => {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.patch(`/projects/${params[0].id}`, form);
    
            if (response.data.status === "success") {
              dispatch({
                type: EDIT_PROJECT,
                payload: response.data.data.data,
              });
    
              props.handleSuccessfulEditSnackbar(
                `${response.data.data.data.name} Project is updated successfully!!!`
              );
              props.handleEditDialogOpenStatus();
              props.renderProjectEdittedUpdateCounter();
    
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

  return (
    <form id="addNewProjectForm">
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
            onClick={() => [props.handleEditDialogOpenStatus()]}
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
            Update Project
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="name"
          name="name"
          type="text"
          defaultValue={params[0].name}
          helperText="Project Name"
          component={renderSingleLineField}
        />

         <Field
                  label=""
                  id="language"
                  name="language"
                  type="text"
                  //helperText="Project Name"
                  component={renderLanguagesField}
                />

           <Field
                    label=""
                    id="projectType"
                    name="projectType"
                    type="text"
                    //helperText="Project Name"
                    component={renderTypeField}
                  />      
         <Field
          label=""
          id="brief"
          name="brief"
          rows={10}
          type="text"
          defaultValue={params[0].brief}
          helperText="Project Brief"
          component={renderMultiLineField}
        />

        <Field
          label=""
          id="description"
          name="description"
          rows={10}
          type="text"
          defaultValue={params[0].description}
          helperText="Describe Project"
          component={renderMultiLineField}
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
    </form>
  );
}

export default reduxForm({
  form: "addNewProjectForm",
})(EditProjectForm);
