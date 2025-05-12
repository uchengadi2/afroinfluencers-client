import React, { useState } from "react";
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
import { CREATE_CATEGORY } from "../../../../actions/types";

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

const renderNameField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  readOnly,
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
        readOnly: readOnly,
      }}
    />
  );
};




function GetCreatorDetails(props) {
const {params, token, userId} = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const buttonContent = () => {
    return <React.Fragment> Close</React.Fragment>;
  };

   

  return (
    <form id="getCreatorDetails">
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
            onClick={() => [props.handleViewDialogOpenStatus()]}
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
            Creator Details
          </FormLabel>
        </Grid>
       
        <Field
          label=""
          id="creatorName"
          name="creatorName"
          defaultValue={params[0].creator.name}
          type="text"
          helperText="Creator Name"
          readOnly={true}
          component={renderNameField}

        />
         <Field
          label=""
          id="creatorGender"
          name="creatorGender"
          defaultValue={params[0].creator.gender}
          type="text"
          helperText="Creator Gender"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="creatorPhoneNumber"
          name="creatorPhoneNumber"
          defaultValue={params[0].creator.creatorContactPhoneNumber}
          type="text"
          helperText="Creator Phone Number"
          readOnly={true}
          component={renderNameField}

        />
         <Field
          label=""
          id="creatorEmail"
          name="creatorEmail"
          defaultValue={params[0].creator.creatorContactEmailAddress}
          type="text"
          helperText="Creator Email Address"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="creatorCountry"
          name="creatorCountry"
          defaultValue={params[0].creator.country[0].name}
          type="text"
          helperText="Creator Country"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="projectName"
          name="projectName"
          defaultValue={params[0].projectName}
          type="text"
          helperText="Project Name"
          readOnly={true}
          component={renderNameField}

        />

        
        
        <Button
          variant="contained"
          className={classes.submitButton}
          //onClick={props.handleSubmit(onSubmit)}
          onClick={() => [props.handleViewDialogOpenStatus()]}
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
  form: "getCreatorDetails",
})(GetCreatorDetails);
