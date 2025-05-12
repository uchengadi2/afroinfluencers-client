import React, { useState, useEffect } from "react";
import useToken from "../../../../custom-hooks/useToken";
import useUserId from "../../../../custom-hooks/useUserId";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
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
import { CREATE_PROJECT, EDIT_ORDER } from "../../../../actions/types";

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
  placeholder,
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
      placeholder={placeholder}
      style={{ marginTop: 20 }}
      multiline={true}
      minRows={rows}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const renderCreativesField = ({
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
      helperText={helperText}
      variant="outlined"
      id={input.name}
      fullWidth
      type={type}
      defaultValue={input.value}
      {...custom}
      onChange={input.onChange}
    />
  );
};
const renderHooksField = ({
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
      helperText={helperText}
      variant="outlined"
      id={input.name}
      fullWidth
      type={type}
      defaultValue={input.value}
      {...custom}
      onChange={input.onChange}
    />
  );
};

const MAX_COUNT = 200;

function AddVideoAndHooksForm(props) {
  const {params, token, userId} = props;
  const classes = useStyles();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedHookFiles, setUploadedHookFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [fileHookLimit, setFileHookLimit] = useState(false);
  const [creativeMaxCount, setCreativeMaxCount] = useState(params[0].orderedCreativeQuantity);
  const [creativeHookMaxCount, setCreativeHookMaxCount] = useState(params[0].orderedHookQuantity);
  const [creativesYoutubeIds,setCreativesYoutubeIds] = useState([])

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  console.log('params:', params);

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === creativeMaxCount) setFileLimit(true);
        if (uploaded.length > creativeMaxCount) {
          alert(`You can only add a maximum of ${creativeMaxCount} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleUploadHookFiles = (files) => {
    const uploaded = [...uploadedHookFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === creativeHookMaxCount) setFileHookLimit(true);
        if (uploaded.length > creativeHookMaxCount) {
          alert(`You can only add a maximum of ${creativeHookMaxCount} files`);
          setFileHookLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedHookFiles(uploaded);
  };

  const handleCreativeFilesEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const handleCreativeHookFilesEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadHookFiles(chosenFiles);
  };

  

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  
 

  const onSubmit = (formValues) => {
    setLoading(true);   
    

    const Str = require("@supercharge/strings");

    const form = new FormData();     


  //   for (let i = 0; i < uploadedFiles.length; i++) {
  //     //get the file extension
  //     const fileExtension = uploadedFiles[i].name.split('.').pop();
      
  //     if(params[0].creativeType === 'video'){       
  //       if(fileExtension !== 'mp4'){
  //         props.handleFailedSnackbar("The creative file type must be mp4");
  //         setLoading(false);
  //         return;
  //       }
  //       form.append(`creatives`, uploadedFiles[i]);
  //     }else if(params[0].creativeType === 'audio'){
  //       if(fileExtension !== 'mp3'){
  //         props.handleFailedSnackbar("The creative file type must be mp3");
  //         setLoading(false);
  //         return;
  //       }
  //       form.append(`creatives`, uploadedFiles[i]);
  //     }
      
  //   }
  //   for (let i = 0; i < uploadedHookFiles.length; i++) {
  //     //get the file extension
  //     const fileExtension = uploadedHookFiles[i].name.split('.').pop();
  //     if(params[0].creativeType === 'video'){
  //       if(fileExtension !== 'mp4'){ 
  //         props.handleFailedSnackbar("The creative hook file type must be mp4");
  //         setLoading(false);
  //         return;
  //        }

  //     form.append(`hooks`, uploadedHookFiles[i]);
  //   }else if(params[0].creativeType === 'audio'){
  //     if(fileExtension !== 'mp3'){
  //       props.handleFailedSnackbar("The creative hook file type must be mp3");
  //       setLoading(false);
  //       return;
  //     }
  //     form.append(`hooks`, uploadedHookFiles[i]);
  //   }
  // }

  
    //add youtube creative id
    for (let i = 0; i < creativeMaxCount; i++) {
      form.append(`creativesYoutubeIds`, formValues.creativesYoutubeIds.split(',')[i]);
      
    }

    //form.append(`creativesYoutubeIds`, formValues.creativesYoutubeIds);
    //form.append(`creativeHooksYoutubeIds`, formValues.creativeHooksYoutubeIds);

    //add hooks youtube creative id
    for (let i = 0; i < creativeHookMaxCount; i++) {
      form.append(`creativeHooksYoutubeIds`, formValues.creativeHooksYoutubeIds.split(',')[i]);
    }

    

    

    if (form) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.patch(`/orders/${params[0].id}`, form);

        console.log('responses:',response)

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_ORDER,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            ` Creatives for order number ${response.data.data.data.orderNumber}  are submitted successfully!!!`
          );
          props.renderProjectEdittedUpdateCounter();
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
    <form id="addVideoAndHooksForm">
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
            Submit Creatives For Review
          </FormLabel>
        </Grid>
         {/* <Grid item>
            <Field
              label=""
              id="creatives"
              name="creatives"
              type="file"
              multiple
              accept="file_extension|audio/*|video/*"
              onChange={handleCreativeFilesEvent}
              helperText="Upload Creatives (Video or Audio files)"
              component={renderCreativesField}
              style={{ marginTop: 20, width: 300 }}
              disabled={fileLimit}
            />
            {uploadedFiles.map((file) => [<br />, file.name])}
          </Grid> */}
        <Field
          label=""
          id="creativesYoutubeIds"
          name="creativesYoutubeIds"
          placeholder="abbvde,rtyuio,iysxgsi"
          type="text"
          rows={5}
          helperText="Enter the YouTube creative IDs. Separate with commas incase of multiple creatives "
          component={renderMultiLineField}
        />
         {/* <Grid item>
            <Field
              helperText="Upload Creative Hooks (Video or Audio files)"
              id="hooks"
              name="hooks"
              type="file"
              multiple
              accept="file_extension|audio/*|video/*"
              onChange={handleCreativeHookFilesEvent}
              component={renderHooksField}
              style={{ marginTop: 20, width: 300 }}
              disabled={fileHookLimit}
            />
            {uploadedHookFiles.map((file) => [<br />, file.name])}
          </Grid> */}
         <Field
          label=""
          id="creativeHooksYoutubeIds"
          name="creativeHooksYoutubeIds"
          rows={5}
          type="text"
          placeholder="abbvde,rtyuio,iysxgsi"
          helperText="Enter the YouTube creative IDs for the Extra Hooks. Separate with Comma in case of multiple hooks."
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
  form: "addVideoAndHooksForm",
})(AddVideoAndHooksForm);
