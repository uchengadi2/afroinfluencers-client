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




function ViewOrderDetails(props) {
const {params, token, userId} = props;
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  
  const dispatch = useDispatch();

  const buttonContent = () => {
    return <React.Fragment> Close</React.Fragment>;
  };

    

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
          component={renderSingleLineField}
        />
         <Field
          label=""
          id="project"
          name="project"
          defaultValue={params[0].projectName}
          type="text"
          helperText="Project Name"
          readOnly={true}
          component={renderSingleLineField}
        />
        <Field
          label=""
          id="brand"
          name="brand"
          defaultValue={params[0].brandName}
          type="text"
          helperText="Brand Name"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="platforms"
          name="platforms"
          defaultValue={params[0].platforms}
          type="text"
          helperText="Selected Platforms"
          readOnly={true}
          component={renderSingleLineField}
        />
         {params[0].platforms.includes('facebook') && <Field
          label=""
          id="facebookPostQuantity"
          name="facebookPostQuantity"
          defaultValue={params[0].facebookPostQuantity}
          type="text"
          helperText="Number of Facebook Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
         {params[0].platforms.includes('facebook') && <Field
          label=""
          id="facebookCostPerPost"
          name="facebookCostPerPost"
          defaultValue={params[0].facebookCostPerPost}
          type="text"
          helperText="Facebook Cost Per Post"
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('instagram') && <Field
          label=""
          id="instagramPostQuantity"
          name="instagramPostQuantity"
          defaultValue={params[0].instagramPostQuantity}
          type="text"
          helperText="Number of Instagram Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('instagram') && <Field
          label=""
          id="instagramCostPerPost"
          name="instagramCostPerPost"
          defaultValue={params[0].instagramCostPerPost}
          type="text"
          helperText="Instagram Cost Per Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('twitter') && <Field
          label=""
          id="twitterPostQuantity"
          name="twitterPostQuantity"
          defaultValue={params[0].twitterPostQuantity}
          type="text"
          helperText="Number of Twitter Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('twitter') && <Field
          label=""
          id="twitterCostPerPost"
          name="twitterCostPerPost"
          defaultValue={params[0].twitterCostPerPost}
          type="text"
          helperText="Twitter Cost Per Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('tiktok') && <Field
          label=""
          id="tiktokPostQuantity"
          name="tiktokPostQuantity"
          defaultValue={params[0].tiktokPostQuantity}
          type="text"
          helperText="Number of Tiktok Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('tiktok') && <Field
          label=""
          id="tiktokCostPerPost"
          name="tiktokCostPerPost"
          defaultValue={params[0].tiktokCostPerPost}
          type="text"
          helperText="Tiktok Cost Per Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('linkedin') && <Field
          label=""
          id="linkedInPostQuantity"
          name="linkedInPostQuantity"
          defaultValue={params[0].linkedInPostQuantity}
          type="text"
          helperText="Number of LinkedIn Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('linkedin') && <Field
          label=""
          id="linkedInCostPerPost"
          name="linkedInCostPerPost"
          defaultValue={params[0].linkedInCostPerPost}
          type="text"
          helperText="LinkedIn Cost Per Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('blog') && <Field
          label=""
          id="blogPostQuantity"
          name="blogPostQuantity"
          defaultValue={params[0].blogPostQuantity}
          type="text"
          helperText="Number of Blog Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
         {params[0].platforms.includes('blog') && <Field
          label=""
          id="blogCostPerPost"
          name="blogCostPerPost"
          defaultValue={params[0].blogCostPerPost}
          type="text"
          helperText="Blog Cost Per Post "
          readOnly={true}
          component={renderSingleLineField}
        />}
        <Field
          label=""
          id="agencyServicePlan"
          name="agencyServicePlan"
          defaultValue={params[0].agencyServicePlan.charAt(0).toUpperCase() + params[0].agencyServicePlan.slice(1)}
          type="text"
          helperText="Agency Service Plan"
          readOnly={true}
          component={renderSingleLineField}
        />
        <Field
          label=""
          id="contractProcessingFee"
          name="contractProcessingFee"
          defaultValue={params[0].contractProcessingFee}
          type="text"
          helperText="Contract Processin Fee"
          readOnly={true}
          component={renderSingleLineField}
        />
        <Field
          label=""
          id="creatorName"
          name="creatorName"
          defaultValue={params[0].creator.name}
          type="text"
          helperText="Creator Name"
          readOnly={true}
          component={renderSingleLineField}

        />
        {params[0].platforms.includes('facebook') && <Field
          label=""
          id="facebookTotalFollowers"
          name="facebookTotalFollowers"
          defaultValue={params[0].facebookTotalFollowers}
          type="text"
          helperText="Facebook Number Of Followers "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('instagram') && <Field
          label=""
          id="instagramTotalFollowers"
          name="instagramTotalFollowers"
          defaultValue={params[0].instagramTotalFollowers}
          type="text"
          helperText="Instagram Number Of Followers "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('twitter') && <Field
          label=""
          id="twitterTotalFollowers"
          name="twitterTotalFollowers"
          defaultValue={params[0].twitterTotalFollowers}
          type="text"
          helperText="Twitter Number Of Followers "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('tiktok') && <Field
          label=""
          id="tiktokTotalFollowers"
          name="tiktokTotalFollowers"
          defaultValue={params[0].tiktokTotalFollowers}
          type="text"
          helperText="Tiktok Number Of Followers "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('linkedin') && <Field
          label=""
          id="linkedInTotalFollowers"
          name="linkedInTotalFollowers"
          defaultValue={params[0].linkedInTotalFollowers}
          type="text"
          helperText="LinkedIn Number Of Followers "
          readOnly={true}
          component={renderSingleLineField}
        />}
        {params[0].platforms.includes('blog') && <Field
          label=""
          id="blogTotalVisitorsPerMonth"
          name="blogTotalVisitorsPerMonth"
          defaultValue={params[0].blogTotalVisitorsPerMonth}
          type="text"
          helperText="Blog Estimated Number Of Visitors Per Month "
          readOnly={true}
          component={renderSingleLineField}
        />}

        <Field
          label=""
          id="creatorCountry"
          name="creatorCountry"
          defaultValue={params[0].creator.country[0].name}
          type="text"
          helperText="Creator Country"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="age"
          name="age"
          defaultValue={params[0].creatorAge}
          type="text"
          helperText="Creator Age"
          readOnly={true}
          component={renderSingleLineField}

        />
        <Field
          label=""
          id="gender"
          name="gender"
          defaultValue={params[0].creatorGender.charAt(0).toUpperCase() + params[0].creatorGender.slice(1)}
          type="text"
          helperText="Creator Gender"
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
  form: "viewOrderDetails",
})(ViewOrderDetails);
