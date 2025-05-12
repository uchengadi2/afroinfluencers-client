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
import {
  CREATE_COURSE_ASSESSOR,
  CREATE_COURSE_LESSON,
  CREATE_COURSE_MENTOR,
} from "../../../actions/types";

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
  readOnly,
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
        readOnly: readOnly,
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

function AddCourseLessonForm(props) {
  const classes = useStyles();

  const [status, setStatus] = useState("inactive");
  const [channelsList, setChannelsList] = useState([]);
  const [programmesList, setProgrammesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);

  const [course, setCourse] = useState();
  const [channel, setChannel] = useState();
  const [programme, setProgramme] = useState();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/channels`);
      const workingData = response.data.data.data;
      workingData.map((channel) => {
        allData.push({ id: channel._id, name: channel.name });
      });
      setChannelsList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/programmes`, {
        params: { channel: channel },
      });
      const workingData = response.data.data.data;
      workingData.map((programme) => {
        allData.push({ id: programme._id, name: programme.name });
      });
      setProgrammesList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [channel]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/courses`, {
        params: { programme: programme },
      });
      const workingData = response.data.data.data;
      workingData.map((course) => {
        allData.push({ id: course._id, name: course.title });
      });
      setCoursesList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [programme]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleChannelChange = (event) => {
    setChannel(event.target.value);
  };

  const handleProgrammeChange = (event) => {
    setProgramme(event.target.value);
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  //get the courses list
  const renderCoursesList = () => {
    return coursesList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the channels list
  const renderChannelsList = () => {
    return channelsList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the programme list
  const renderProgrammesList = () => {
    return programmesList.map((item) => {
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
          </Select>
          <FormHelperText>Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderChannelsField = ({
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
            labelId="channel"
            id="channel"
            value={channel}
            onChange={handleChannelChange}
            // label="User"
            style={{ marginTop: 0, width: 300, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderChannelsList()}
          </Select>
          <FormHelperText>Select Channel</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProgrammesField = ({
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
            labelId="programme"
            id="programme"
            value={programme}
            onChange={handleProgrammeChange}
            // label="User"
            style={{ marginTop: 10, width: 300, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderProgrammesList()}
          </Select>
          <FormHelperText>Select Programme</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCoursesField = ({
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
            labelId="course"
            id="course"
            value={course}
            onChange={handleCourseChange}
            // label="User"
            style={{ marginTop: 10, width: 300, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderCoursesList()}
          </Select>
          <FormHelperText>Select Course</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!channel || channel.replace(/\s/g, "").length === 0) {
      props.handleFailedSnackbar("Select the Course Channel");
      setLoading(false);
      return;
    }
    if (!programme || programme.replace(/\s/g, "").length === 0) {
      props.handleFailedSnackbar("Select the Course Programme");
      setLoading(false);
      return;
    }
    if (!course || course.replace(/\s/g, "").length === 0) {
      props.handleFailedSnackbar("Select the Course ");
      setLoading(false);
      return;
    }
    // if (!mentor || mentor.replace(/\s/g, "").length === 0) {
    //   props.handleFailedSnackbar("Select the Mentor ");
    //   setLoading(false);
    //   return;
    // }

    const Str = require("@supercharge/strings");

    const form = new FormData();

    form.append("channel", channel);
    form.append("programme", programme);
    form.append("course", course);
    form.append("status", status);
    form.append("title", formValues.title);
    form.append("videoId", formValues.videoId);
    form.append("description", formValues.description);
    form.append("sequenceNumber", formValues.sequenceNumber);

    if (!formValues["refNumber"]) {
      const refNumber =
        "NEXT" + "-" + Math.floor(Math.random() * 100000000) + "-" + "LESSON";

      form.append("refNumber", refNumber);
    } else {
      form.append("refNumber", formValues.refNumber);
    }

    form.append("createdBy", props.userId);
    if (formValues.image) {
      form.append("image", formValues.image[0]);
    }

    if (formValues) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/courselessons`, form);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_COURSE_LESSON,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.title} Lesson is added successfully!!!`
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
            Add Lesson to Course
          </FormLabel>
        </Grid>

        {/* <Field
          label=""
          id="refNumber"
          name="refNumber"
          type="text"
          readOnly={true}
          helperText="Reference Number(Leave Blank)"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        /> */}

        <Field
          label=""
          id="channel"
          name="channel"
          type="text"
          component={renderChannelsField}
          style={{ marginTop: 20 }}
        />
        <Field
          label=""
          id="programme"
          name="programme"
          type="text"
          component={renderProgrammesField}
        />
        <Field
          label=""
          id="course"
          name="course"
          type="text"
          component={renderCoursesField}
        />

        <Field
          label=""
          id="title"
          name="title"
          type="test"
          helperText="Enter Lesson Title"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />

        <Field
          label=""
          id="description"
          name="description"
          type="text"
          helperText="Describe the Lesson"
          rows={7}
          component={renderMultiLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="videoId"
          name="videoId"
          type="text"
          helperText="YouTube Video Id"
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
          label=""
          id="sequenceNumber"
          name="sequenceNumber"
          type="number"
          helperText="Enter Lesson Sequence Number"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
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
})(AddCourseLessonForm);
