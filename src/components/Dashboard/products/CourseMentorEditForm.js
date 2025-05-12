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
  EDIT_COURSE_ASSESSOR,
  EDIT_COURSE_MENTOR,
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

function CourseMentorEditForm(props) {
  const classes = useStyles();
  const { params, token, userId } = props;
  const [status, setStatus] = useState(params[0].status);
  const [channelsList, setChannelsList] = useState([]);
  const [programmesList, setProgrammesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [currency, setCurrency] = useState(params[0].currencyId);
  const [course, setCourse] = useState(params[0].courseId);
  const [channel, setChannel] = useState(params[0].channelId);
  const [mentor, setMentor] = useState(params[0].mentorId);
  const [programme, setProgramme] = useState(params[0].programmeId);
  const [acceptHomeTeaching, setAcceptHomeTeaching] = useState(
    params[0].acceptHomeTeaching
  );
  const [trackPreference, setTrackPreference] = useState(
    params[0].trackPreference
  );
  const [deliveryPreference, setDeliveryPreference] = useState(
    params[0].deliveryPreference
  );
  const [loading, setLoading] = useState(false);
  const [mentorName, setMentorName] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/currencies`);
      const workingData = response.data.data.data;
      workingData.map((currency) => {
        allData.push({ id: currency._id, name: currency.name });
      });
      setCurrenciesList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [programme]);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/mentors`);
      const workingData = response.data.data.data;
      workingData.map((mentor) => {
        allData.push({ id: mentor._id, name: mentor.name });
      });
      setMentorsList(allData);
      setMentorName(allData[0].name);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAcceptHomeTeachingChange = (event) => {
    setAcceptHomeTeaching(event.target.value);
  };

  const handleTrackPreferenceChange = (event) => {
    setTrackPreference(event.target.value);
  };

  const handleDeliveryPreferenceChange = (event) => {
    setDeliveryPreference(event.target.value);
  };

  const handleMentorChange = (event) => {
    setMentor(event.target.value);
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

  //get the currency list
  const renderCurrenciesList = () => {
    return currenciesList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the mentor list
  const renderMentorsList = () => {
    return mentorsList.map((item) => {
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

  const renderTrackPreferenceField = ({
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
            labelId="trackPreference"
            id="trackPreference"
            value={trackPreference}
            onChange={handleTrackPreferenceChange}
            //label="Display On Store?"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"weekdays"}>Weekdays</MenuItem>
            <MenuItem value={"weekends"}>Weekends</MenuItem>
            <MenuItem value={"both"}>Both</MenuItem>
          </Select>
          <FormHelperText>Select Preferred Track</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDeliveryPreferenceField = ({
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
            labelId="deliveryPreference"
            id="deliveryPreference"
            value={deliveryPreference}
            onChange={handleDeliveryPreferenceChange}
            //label="Display On Store?"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"live-in-person"}>Live And On Premise</MenuItem>
            <MenuItem value={"live-online"}>Live But Online</MenuItem>
            <MenuItem value={"recorded-for-self-pace"}>
              Online for Self Pace
            </MenuItem>
            <MenuItem value={"blended"}>Blended</MenuItem>
          </Select>
          <FormHelperText>
            Select Assessor Delivery Platform Preference
          </FormHelperText>
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

  const renderCurrenciesField = ({
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
            labelId="currency"
            id="currency"
            value={currency}
            onChange={handleCurrencyChange}
            // label="User"
            style={{ marginTop: 10, width: 300, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderCurrenciesList()}
          </Select>
          <FormHelperText>Select Preferred Currency for Payment</FormHelperText>
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

  const renderMentorField = ({
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
            labelId="mentor"
            id="mentor"
            value={mentor}
            onChange={handleMentorChange}
            // label="User"
            style={{ marginTop: 10, width: 300, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderMentorsList()}
          </Select>
          <FormHelperText>Select Mentor</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  //   const renderAcceptHomeTeachingField = ({
  //     input,
  //     label,
  //     meta: { touched, error, invalid },
  //     type,
  //     id,
  //     ...custom
  //   }) => {
  //     return (
  //       <Box>
  //         <FormControl variant="outlined">
  //           {/* <InputLabel id="vendor_city">City</InputLabel> */}
  //           <Select
  //             labelId="acceptHomeTeaching"
  //             id="acceptHomeTeaching"
  //             value={acceptHomeTeaching}
  //             onChange={handleAcceptHomeTeachingChange}
  //             //label="Display On Store?"
  //             style={{ width: 300, marginTop: 10, height: 38 }}
  //             //{...input}
  //           >
  //             <MenuItem value={"false"}>No</MenuItem>
  //             <MenuItem value={"true"}>Yes</MenuItem>
  //           </Select>
  //           <FormHelperText>
  //             Will You Be Available For Home or Private Teaching On This Course?
  //           </FormHelperText>
  //         </FormControl>
  //       </Box>
  //     );
  //   };

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
    if (!mentor || mentor.replace(/\s/g, "").length === 0) {
      props.handleFailedSnackbar("Select the Mentor ");
      setLoading(false);
      return;
    }

    const Str = require("@supercharge/strings");

    const form = new FormData();
    form.append("mentor", mentor ? mentor : params[0].mentor);
    form.append("channel", channel ? channel : params[0].channel);
    form.append("programme", programme ? programme : params[0].programme);
    form.append("course", course ? course : params[0].course);
    form.append("currency", currency ? currency : params[0].currency);
    form.append(
      "deliveryPreference",
      deliveryPreference ? deliveryPreference : params[0].deliveryPreference
    );
    form.append(
      "hourlyRate",
      formValues.hourlyRate ? formValues.hourlyRate : params[0].hourlyRate
    );

    form.append("status", status ? status : params[0].status);

    form.append(
      "minimumAllowableHours",
      formValues.minimumAllowableHours
        ? formValues.minimumAllowableHours
        : params[0].minimumAllowableHours
    );
    form.append(
      "comment",
      formValues.comment ? formValues.comment : params[0].comment
    );

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
        const response = await api.patch(
          `/coursementors/${params[0].id}`,
          form
        );

        if (response.data.status === "success") {
          dispatch({
            type: EDIT_COURSE_MENTOR,
            payload: response.data.data.data,
          });

          props.handleSuccessfulEditSnackbar(
            `${mentorName} Information on this course is updated successfully!!!`
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
            Edit Course Mentor
          </FormLabel>
        </Grid>

        <Field
          label=""
          id="refNumber"
          name="refNumber"
          type="text"
          defaultValue={params[0].refNumber}
          readOnly={true}
          helperText="Reference Number(Leave Blank)"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="mentor"
          name="mentor"
          type="text"
          component={renderMentorField}
          style={{ marginTop: 20 }}
        />

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
          id="currency"
          name="currency"
          type="text"
          component={renderCurrenciesField}
        />

        <Field
          label=""
          id="hourlyRate"
          name="hourlyRate"
          type="number"
          defaultValue={params[0].hourlyRate}
          helperText="What is Your Rate Per Hour"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />
        <Field
          label=""
          id="minimumAllowableHours"
          name="minimumAllowableHours"
          type="number"
          defaultValue={params[0].minimumAllowableHours}
          helperText="What is Your Minimum Allowable Hours For This Service Per Week"
          component={renderSingleLineField}
          style={{ marginTop: 10 }}
        />

        <Field
          label=""
          id="deliveryPreference"
          name="deliveryPreference"
          type="text"
          component={renderDeliveryPreferenceField}
        />

        <Field
          label=""
          id="comment"
          name="comment"
          type="text"
          defaultValue={params[0].comment}
          helperText="What Do You Want The Students To Know About You On This Course"
          rows={7}
          component={renderMultiLineField}
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
})(CourseMentorEditForm);
