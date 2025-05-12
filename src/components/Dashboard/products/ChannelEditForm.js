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
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../../apis/local";
import { EDIT_CHANNEL } from "../../../actions/types";

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
      marginBottom: 20,
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
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Channel Name"
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

const renderSlugField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Channel Slug"
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

const renderOwnerField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText="Channel Owner"
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

const renderDescriptionField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  id,
  ...custom
}) => {
  return (
    <TextField
      error={touched && invalid}
      //placeholder="category description"
      variant="outlined"
      helperText="Description"
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

const renderImageField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
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
      helperText="Upload Channel Image"
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

function ChannelEditForm(props) {
  const classes = useStyles();
  const { params, token, userId } = props;

  const [loading, setLoading] = useState(false);
  const [channelType, setChannelType] = useState(params[0].type);
  const [channelClass, setChannelClass] = useState(params[0].class);
  const [channelStatus, setChannelStatus] = useState(params[0].status);

  const dispatch = useDispatch();

  const handleChannelTypeChange = (event) => {
    setChannelType(event.target.value);
  };

  const handleChannelClassChange = (event) => {
    setChannelClass(event.target.value);
  };

  const handleChannelStatusChange = (event) => {
    setChannelStatus(event.target.value);
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
            labelId="type"
            id="type"
            value={channelType}
            onChange={handleChannelTypeChange}
            //label="Is Featured"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"professionals"}>Professionals</MenuItem>
            <MenuItem value={"academics"}>Academics</MenuItem>
            <MenuItem value={"life"}>Life</MenuItem>
          </Select>
          <FormHelperText>Select Channel Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderClassField = ({
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
            labelId="class"
            id="class"
            value={channelClass}
            onChange={handleChannelClassChange}
            //label="Is Featured"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"public"}>Public</MenuItem>
            <MenuItem value={"private"}>Private</MenuItem>
          </Select>
          <FormHelperText>Select Channel Class</FormHelperText>
        </FormControl>
      </Box>
    );
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
            value={channelStatus}
            onChange={handleChannelStatusChange}
            //label="Is Featured"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"inactive"}>Inactive</MenuItem>
          </Select>
          <FormHelperText>Select Channel Status</FormHelperText>
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
    form.append("name", formValues.name ? formValues.name : params[0].name);
    form.append("status", channelStatus ? channelStatus : params[0].status);
    form.append("class", channelClass ? channelClass : params[0].class);
    form.append("type", channelType ? channelType : params[0].type);
    form.append("slug", formValues.slug ? formValues.slug : params[0].slug);
    form.append("owner", formValues.owner ? formValues.owner : params[0].owner);
    form.append(
      "description",
      formValues.description ? formValues.description : params[0].description
    );
    form.append("createdBy", userId);
    if (formValues.image) {
      form.append("image", formValues.image[0]);
    }

    if (formValues) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/channels/${params[0].id}`, form);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_CHANNEL,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${response.data.data.data.name} Channel is updated successfully!!!`
          );
          props.handleEditDialogOpenStatus();
          props.renderCategoryEdittedUpdateCounter();

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
    <form id="channelForm">
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
            Update Channel
          </FormLabel>
        </Grid>
        <Field
          label=""
          id="name"
          name="name"
          defaultValue={params[0].name}
          type="text"
          component={renderNameField}
        />
        <Field
          label=""
          id="type"
          name="type"
          type="text"
          component={renderTypeField}
        />
        <Field
          label=""
          id="class"
          name="class"
          type="text"
          component={renderClassField}
        />
        <Field
          label=""
          id="status"
          name="status"
          type="text"
          component={renderStatusField}
        />

        <Field
          label=""
          id="description"
          name="description"
          defaultValue={params[0].description}
          type="text"
          component={renderDescriptionField}
        />
        <Field
          label=""
          id="owner"
          name="owner"
          defaultValue={params[0].owner}
          type="text"
          component={renderOwnerField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="slug"
          name="slug"
          defaultValue={params[0].slug}
          type="text"
          component={renderSlugField}
          style={{ marginTop: 10 }}
        />

        {/* <Field
          id="image"
          name="image"
          type="file"
          accept="image/*"
          component={renderImageField}
          floatingLabelText={"Upload Image"}
          fullWidth={true}
        /> */}
        <Field
          id="image"
          name="image"
          type="file"
          accept="image/*"
          component={renderImageField}
          floatingLabelText={"Upload Image"}
          fullWidth={true}
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
  form: "channelForm",
})(ChannelEditForm);
