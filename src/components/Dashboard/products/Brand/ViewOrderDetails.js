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




function ViewOrderDetails(props) {
const {params, token, userId} = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  console.log('params:',params)

  const dispatch = useDispatch();

  const buttonContent = () => {
    return <React.Fragment> Close</React.Fragment>;
  };

  console.log('params:', params);

  

  return (
    <form id="viewOrderDetails">
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
            View Order Details
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="orderNumber"
          name="orderNumber"
          defaultValue={params[0].orderNumber}
          type="text"
          helperText="Order Number"
          readOnly={true}
          component={renderNameField}
        />
         <Field
          label=""
          id="creativeType"
          name="creativeType"
          defaultValue={params[0].creativeType}
          type="text"
          helperText="Creative Type"
          readOnly={true}
          component={renderNameField}
        />
        <Field
          label=""
          id="creativeLanguage"
          name="creativeLanguage"
          defaultValue={params[0].creativeLanguage}
          type="text"
          helperText="Required Creative Language"
          readOnly={true}
          component={renderNameField}

        />
        <Field
          label=""
          id="orderedCreativeQuantity"
          name="orderedCreativeQuantity"
          defaultValue={params[0].orderedCreativeQuantity}
          type="text"
          helperText="Ordered Creative Quantity"
          readOnly={true}
          component={renderNameField}
        />
        <Field
          label=""
          id="orderedHookQuantity"
          name="orderedHookQuantity"
          defaultValue={params[0].orderedHookQuantity}
          type="text"
          helperText="Ordered Hook Quantity"
          readOnly={true}
          component={renderNameField}
        />
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
          onClick={() => [props.handleDialogOpenStatus()]}
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
  form: "viewOrderDetails",
})(ViewOrderDetails);
