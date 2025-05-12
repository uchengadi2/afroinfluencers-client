import React, { useState, useEffect } from "react";
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
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "./../../../apis/local";
import { EDIT_INSTUCTOR } from "../../../actions/types";

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
  placeholder,
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
      helperText="Upload Instructor Photo"
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

function InstructorEditForm(props) {
  const classes = useStyles();
  const { params, token, userId } = props;
  const [status, setStatus] = useState(params[0].status);
  const [usersList, setUsersList] = useState([]);
  const [user, setUser] = useState(params[0].userId);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/users`);
      const workingData = response.data.data.data;
      workingData.map((user) => {
        allData.push({ id: user._id, name: user.name });
      });
      setUsersList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  //get the users list
  const renderUsersList = () => {
    return usersList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
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
            value={status}
            onChange={handleStatusChange}
            //label="Display On Store?"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"inactive"}>Inactive</MenuItem>
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"suspended"}>Suspended</MenuItem>
            <MenuItem value={"dismissed"}>Dismissed</MenuItem>
          </Select>
          <FormHelperText>Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderUsersField = ({
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
            labelId="user"
            id="user"
            value={user}
            onChange={handleUserChange}
            // label="User"
            style={{ marginTop: 0, width: 300, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderUsersList()}
          </Select>
          <FormHelperText>
            Connect Instructor to a Registered User
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!user || user.replace(/\s/g, "").length === 0) {
      props.handleFailedSnackbar(
        "The instructor should be linked to a registered user"
      );
      setLoading(false);
      return;
    }

    // if (
    //   !formValues["name"] ||
    //   formValues["name"].replace(/\s/g, "").length === 0
    // ) {
    //   props.handleFailedSnackbar("The instructor name field cannot be empty");
    //   setLoading(false);
    //   return;
    // }

    // if (
    //   !formValues["bio"] ||
    //   formValues["bio"].replace(/\s/g, "").length === 0
    // ) {
    //   props.handleFailedSnackbar("The instructor's bio field cannot be empty");
    //   setLoading(false);
    //   return;
    // }

    const Str = require("@supercharge/strings");

    const form = new FormData();
    form.append("name", formValues.name ? formValues.name : params[0].name);
    form.append("slug", formValues.slug ? formValues.slug : params[0].slug);
    form.append(
      "description",
      formValues.description ? formValues.description : params[0].description
    );
    form.append(
      "qualifications",
      formValues.qualifications
        ? formValues.qualifications
        : params[0].qualifications
    );
    form.append(
      "skills",
      formValues.skills ? formValues.skills : params[0].skills
    );
    form.append(
      "experiences",
      formValues.experiences ? formValues.experiences : params[0].experiences
    );
    form.append("bio", formValues.bio ? formValues.bio : params[0].bio);
    form.append(
      "accountDetails",
      formValues.accountDetails
        ? formValues.accountDetails
        : params[0].accountDetails
    );
    form.append(
      "linkedInProfile",
      formValues.linkedInProfile
        ? formValues.linkedInProfile
        : params[0].linkedInProfile
    );
    form.append(
      "gitHubProfile",
      formValues.gitHubProfile
        ? formValues.gitHubProfile
        : params[0].gitHubProfile
    );
    form.append("status", status ? status : params[0].status);
    form.append("user", user ? user : params[0].userId);
    form.append("title", formValues.title ? formValues.title : params[0].title);

    if (!formValues["refNumber"]) {
      //   const refNumber =
      //     "NEXT" + "-" + Math.floor(Math.random() * 100000000) + "-" + "TEACH";
      const refNumber = params[0].refNumber;
      form.append("refNumber", refNumber);
    } else {
      form.append("refNumber", formValues.refNumber);
    }

    form.append("createdBy", props.userId);
    if (formValues.image) {
      form.append("image", formValues.image[0]);
    }

    if (formValues) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/instructors/${params[0].id}`, form);

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_INSTUCTOR,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `Instructor, ${response.data.data.data.name} Information is updated successfully!!!`
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
    <form id="addInstructorForm">
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
            Edit Instructor
          </FormLabel>
        </Grid>

        <Field
          label=""
          id="user"
          name="user"
          type="text"
          component={renderUsersField}
        />

        <Field
          label=""
          id="title"
          name="title"
          type="text"
          helperText="Instructor Title"
          placeholder="Mr/Mrs/Prof/Dr/Chief etc"
          defaultValue={params[0].title}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="name"
          name="name"
          type="text"
          helperText="Instructor Name"
          defaultValue={params[0].name}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="refNumber"
          name="refNumber"
          type="text"
          helperText="Reference Number"
          defaultValue={params[0].refNumber}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="bio"
          name="bio"
          type="text"
          helperText="Bio"
          rows={5}
          defaultValue={params[0].bio}
          component={renderMultiLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="experiences"
          name="experiences"
          type="text"
          helperText="Experiences"
          defaultValue={params[0].experiences}
          rows={5}
          component={renderMultiLineField}
        />
        <Field
          label=""
          id="skills"
          name="skills"
          type="text"
          helperText="Skills"
          defaultValue={params[0].skills}
          rows={5}
          component={renderMultiLineField}
        />
        <Field
          label=""
          id="qualifications"
          name="qualifications"
          type="text"
          helperText="Qualifications"
          defaultValue={params[0].qualifications}
          rows={5}
          component={renderMultiLineField}
        />

        <Field
          label=""
          id="description"
          name="description"
          type="text"
          helperText="Description"
          defaultValue={params[0].description}
          rows={5}
          component={renderMultiLineField}
        />
        <Field
          label=""
          id="accountDetails"
          name="accountDetails"
          type="text"
          helperText="Bank Account Details"
          defaultValue={params[0].accountDetails}
          rows={5}
          component={renderMultiLineField}
        />
        <Field
          label=""
          id="linkedInProfile"
          name="linkedInProfile"
          type="text"
          helperText="LinkedIn Profile"
          defaultValue={params[0].linkedInProfile}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="gitHubProfile"
          name="gitHubProfile"
          type="text"
          helperText="GitHub Profile(for Developers)"
          defaultValue={params[0].gitHubProfile}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="slug"
          name="slug"
          type="text"
          helperText="Slug"
          defaultValue={params[0].slug}
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="status"
          name="status"
          type="text"
          helperText="status"
          component={renderStatusField}
          style={{ marginTop: 10 }}
        />

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
  form: "addInstructorForm",
})(InstructorEditForm);
