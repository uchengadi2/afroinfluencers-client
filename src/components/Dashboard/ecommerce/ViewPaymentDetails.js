import React, { useState } from "react";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
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
import api from "./../../../apis/local";
import { CREATE_CATEGORY } from "../../../actions/types";

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




function ViewPaymentDetails(props) {
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
    <form id="viewPaymentDetails">
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
            View Payment Details
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="refNumber"
          name="refNumber"
          defaultValue={params[0].refNumber}
          type="text"
          helperText="Reference Number"
          readOnly={true}
          component={renderSingleLineField}
        />
         <Field
          label=""
          id="projectName"
          name="projectName"
          defaultValue={params[0].projectName}
          type="text"
          helperText="Project Name"
          readOnly={true}
          component={renderSingleLineField}
        />
         <Field
          label=""
          id="creativeType"
          name="creativeType"
          defaultValue={params[0].creativeType}
          type="text"
          helperText="Creative Type"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="brandName"
          name="brandName"
          defaultValue={params[0].brandName}
          type="text"
          helperText="Brand Name"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="brandCountry"
          name="brandCountry"
          defaultValue={params[0].brandCountry}
          type="text"
          helperText="Brand Country"
          readOnly={true}
          component={renderSingleLineField}
        />
        <Field
          label=""
          id="creatorName"
          name="creatorName"
          defaultValue={params[0].creatorName}
          type="text"
          helperText="Creator Name"
          readOnly={true}
          component={renderSingleLineField}
        />
        <Field
          label=""
          id="creatorCountry"
          name="creatorCountry"
          defaultValue={params[0].creatorCountry}
          type="text"
          helperText="Creator Country"
          readOnly={true}
          component={renderSingleLineField}

        />
        
        <Field
          label=""
          id="platformReceipt"
          name="platformReceipt"
          defaultValue={"₦" + params[0].platformReceipt}
          type="text"
          helperText="Platform Receipt"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="vatReceipt"
          name="vatReceipt"
          defaultValue={"₦" + params[0].vatReceipt}
          type="text"
          helperText="VAT Receipt"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="creatorReceipt"
          name="creatorReceipt"
          defaultValue={"₦" + params[0].creatorReceipt}
          type="text"
          helperText="Creator Receipt"
          readOnly={true}
          component={renderSingleLineField}

        />
       
        <Field
          label=""
          id="paymentStatus"
          name="paymentStatus"
          defaultValue={params[0].paymentStatus}
          type="text"
          helperText="Creator Payout Status"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="paymentMethod"
          name="paymentMethod"
          defaultValue={params[0].paymentMethod}
          type="text"
          helperText="Payout Method"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="paymentConfirmedBy"
          name="paymentConfirmedBy"
          defaultValue={params[0].paymentConfirmedBy ? params[0].paymentConfirmedBy[0].name :""}
          type="text"
          helperText="Payout Confirmed By"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="paymentConfirmedDate"
          name="paymentConfirmedDate"
          defaultValue={params[0].paymentConfirmedDate}
          type="text"
          helperText="Payout Confirmation Date"
          readOnly={true}
          component={renderSingleLineField}

        />
         <Field
          label=""
          id="prevailingPlatformRate"
          name="prevailingPlatformRate"
          defaultValue={params[0].prevailingPlatformRate + "%"}
          type="text"
          helperText="Applied Platform Rate in %"
          readOnly={true}
          component={renderSingleLineField}

        />
         <Field
          label=""
          id="prevailingMinimumPlatformRate"
          name="prevailingMinimumPlatformRate"
          defaultValue={"₦" + params[0].prevailingMinimumPlatformRate}
          type="text"
          helperText="Prevailing Minimum Platform Charge"
          readOnly={true}
          component={renderSingleLineField}

        />
            <Field
                label=""
                 id="prevailingVatRate"
                name="prevailingVatRate"
                defaultValue={params[0].prevailingVatRate ? params[0].prevailingVatRate + "%" : ""}
                type="text"
                helperText="Applied VAT Rate in %"
                readOnly={true}
                component={renderSingleLineField}
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
  form: "viewPaymentDetails",
})(ViewPaymentDetails);
