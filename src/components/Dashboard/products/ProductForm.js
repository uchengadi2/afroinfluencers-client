import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Typography } from "@mui/material";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import api from "./../../../apis/local";
import { CREATE_PRODUCT } from "../../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  formStyles: {
    width: 500,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 100,
    marginLeft: 200,
    marginTop: 20,
    marginBottom: 20,
    color: "white",
    backgroundColor: theme.palette.common.blue,
    "&:hover": {
      backgroundColor: theme.palette.common.blue,
    },
  },
  firstSection: {
    width: 300,
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
      //value={formInput.name}
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

      //onChange={handleInput}
    />
  );
};

const renderMultilineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  id,
  rows,
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
      // value={formInput.description}
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

const renderProductKeyword1Field = ({
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
      helperText="Keyword"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
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

const renderProductKeyword2Field = ({
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
      helperText="Keyword"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
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

const renderProductKeyword3Field = ({
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
      helperText="Keyword"
      variant="outlined"
      label={label}
      id={input.name}
      //value={formInput.name}
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

const renderProductThumbnailField = ({
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
      name={input.name}
      fullWidth
      style={{ marginTop: 20 }}
      helperText={label}
      onChange={input.onChange}
    />
  );
};

const renderImagesField = ({
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
      helperText={label}
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

const MAX_COUNT = 12;

function ProductForm(props) {
  const classes = useStyles();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [image, setImage] = useState();
  const [cityList, setCityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [currency, setCurrency] = useState();
  const [location, setLocation] = useState();
  const [country, setCountry] = useState();
  const [isFeaturedProduct, setIsFeaturedProduct] = useState(false);
  const [isVatable, setIsVatable] = useState();
  const [pricingMechanism, setPricingMechanism] = useState();
  const [allowSubscription, setAllowSubscription] = useState(false);
  const [hasVariant, setHasVariant] = useState(false);
  const [salesPreference, setSalesPreference] = useState("retail");
  const [displayOnStore, setDisplayOnStore] = useState("yes");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [stockStatus, setStockStatus] = useState("in-stock");
  const [unit, setUnit] = useState("kg");
  const [allowPriceFreezing, setAllowPriceFreezing] = useState(false);
  const [allowFreezedPriceLowBound, setAllowFreezedPriceLowBound] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [willTreat, setWillTreat] = useState(false);

  const [channelsList, setChannelsList] = useState([]);
  const [programmesList, setProgrammesList] = useState([]);
  const [channel, setChannel] = useState();
  const [programme, setProgramme] = useState();
  const [courseType, setCourseType] = useState("professionals");
  const [courseClass, setCourseClass] = useState("public");
  const [courseStatus, setCourseStatus] = useState("active");
  const [isInstallmentalPaymentAllowed, setIsInstallmentalPaymentAllowed] =
    useState("no");
  const [track, setTrack] = useState("weekdays");
  const [deliveryMethod, setDeliveryMethod] = useState("self-pace");
  const [isCourseAuditable, setIsCourseAuditable] = useState("false");
  const [showGenericWeekdayStartDateText, setShowGenericWeekdayStartDateText] =
    useState("false");
  const [showGenericWeekendStartDateText, setShowGenericWeekendStartDateText] =
    useState("false");
  const [hasSeries, setHasSeries] = useState("false");
  const [hasMentorshipCredit, setHasMentorshipCredit] = useState("false");
  const [videoType, setVideoType] = useState("bundled");
  const [allowLifeTimeAccess, setAllowLifeTimeAccess] = useState("false");
  const [acceptablePaymentOptions, setAcceptablePaymentOptions] =
    useState("all-types");

  const [allowInstructors, setAllowInstructors] = useState("true");
  const [allowHomeInstructors, setAllowHomeInstructors] = useState("false");
  const [allowAssessments, setAllowAssessments] = useState("false");
  const [allowMentorship, setAllowMentorship] = useState("false");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/categories`);
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({ id: category._id, name: category.name });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

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
      const response = await api.get(`/currencies`);
      const workingData = response.data.data.data;
      workingData.map((vendor) => {
        allData.push({ id: vendor._id, name: vendor.name });
      });
      setCurrencyList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //get the channel list
  const renderChannelsList = () => {
    return channelsList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the city list
  const renderProgrammesList = () => {
    return programmesList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the vendor list
  const renderCategoryList = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  //get the currency list
  const renderCurencyList = () => {
    return currencyList.map((item) => {
      return (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      );
    });
  };

  const onImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleIsInstallmentalPaymentAllowedChange = (event) => {
    setIsInstallmentalPaymentAllowed(event.target.value);
  };

  const handleChannelChange = (event) => {
    setChannel(event.target.value);
  };

  const handleProgrammeChange = (event) => {
    setProgramme(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleIsVatableChange = (event) => {
    setIsVatable(event.target.value);
  };

  const handleDisplayOnStoreChange = (event) => {
    setDisplayOnStore(event.target.value);
  };

  const handleAllowLifeTimeAccessChange = (event) => {
    setAllowLifeTimeAccess(event.target.value);
  };

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);
  };

  const handleCourseClassChange = (event) => {
    setCourseClass(event.target.value);
  };

  const handleCourseStatusChange = (event) => {
    setCourseStatus(event.target.value);
  };

  const handleProgrammeTrackChange = (event) => {
    setTrack(event.target.value);
  };

  const handleDeliveryMethodChange = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const handleHasSeriesChange = (event) => {
    setHasSeries(event.target.value);
  };

  const handleVideoTypeChange = (event) => {
    setVideoType(event.target.value);
  };

  const handleHasMentorshipCreditChange = (event) => {
    setHasMentorshipCredit(event.target.value);
  };

  const handleAcceptablePaymentOptionsChange = (event) => {
    setAcceptablePaymentOptions(event.target.value);
  };

  const handleIsCourseAuditableChange = (event) => {
    setIsCourseAuditable(event.target.value);
  };

  const handleShowGenericWeekendStartDateTextChange = (event) => {
    setShowGenericWeekendStartDateText(event.target.value);
  };

  const handleShowGenericWeekdayStartDateTextChange = (event) => {
    setShowGenericWeekdayStartDateText(event.target.value);
  };

  const handleAllowInstructorsChange = (event) => {
    setAllowInstructors(event.target.value);
  };

  const handleAllowHomeInstructorsChange = (event) => {
    setAllowHomeInstructors(event.target.value);
  };

  const handleAllowAssessmentsChange = (event) => {
    setAllowAssessments(event.target.value);
  };

  const handleAllowMentorshipChange = (event) => {
    setAllowMentorship(event.target.value);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const renderAllowInstructorsField = ({
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
            labelId="allowInstructors"
            id="allowInstructors"
            value={allowInstructors}
            onChange={handleAllowInstructorsChange}
            //label="allowInstructors"
            style={{ width: 237, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Available for Teaching Service?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowHomeInstructorsField = ({
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
            labelId="allowHomeInstructors"
            id="allowHomeInstructors"
            value={allowHomeInstructors}
            onChange={handleAllowHomeInstructorsChange}
            //label="allowInstructors"
            style={{ width: 237, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Available for Home & Private Service?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowAssessmentsField = ({
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
            labelId="allowAssessments"
            id="allowAssessments"
            value={allowAssessments}
            onChange={handleAllowAssessmentsChange}
            //label="allowInstructors"
            style={{ width: 237, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>
            Available for Assessments & Mocks Service?
          </FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowMentorshipField = ({
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
            labelId="allowMentorship"
            id="allowMentorship"
            value={allowMentorship}
            onChange={handleAllowMentorshipChange}
            //label="allowInstructors"
            style={{ width: 237, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Available for Mentorship Service?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderIsVatableField = ({
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
            labelId="isVatable"
            id="isVatable"
            value={isVatable}
            onChange={handleIsVatableChange}
            label="Is VAT-able"
            style={{ width: 237, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Is VAT-able?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderVideoTypeField = ({
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
            labelId="videoType"
            id="videoType"
            value={videoType}
            onChange={handleVideoTypeChange}
            //label="Video Type"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"bundled"}>Bundled</MenuItem>
            <MenuItem value={"splitted-by-lessons"}>
              Splitted By Lessons
            </MenuItem>
            <MenuItem value={"splitted-by-topics"}>Splitted By Topics</MenuItem>
          </Select>
          <FormHelperText>Select Course Video Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAllowLifeTimeAccessField = ({
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
            labelId="allowLifeTimeAccess"
            id="allowLifeTimeAccess"
            value={allowLifeTimeAccess}
            onChange={handleAllowLifeTimeAccessChange}
            //label="Video Type"
            style={{ width: 190, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"false"}>No</MenuItem>
            <MenuItem value={"true"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Allow Life Time Access?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderIsInstallmentalPaymentAllowedChangeField = ({
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
            labelId="isInstallmentalPaymentAllowed"
            id="isInstallmentalPaymentAllowed"
            value={isInstallmentalPaymentAllowed}
            onChange={handleIsInstallmentalPaymentAllowedChange}
            //label="Is VAT-able"
            style={{ width: 190, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"no"}>No</MenuItem>
            <MenuItem value={"yes"}>Yes</MenuItem>
          </Select>
          <FormHelperText>Is Installmental Payment Allowed?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderTrackField = ({
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
            labelId="track"
            id="track"
            value={track}
            onChange={handleProgrammeTrackChange}
            //label="Is Featured"
            style={{ width: 190, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"weekdays"}>WeekDays</MenuItem>
            <MenuItem value={"weekends"}>WeekEnds</MenuItem>
            <MenuItem value={"weekdays/weekends"}>
              Both Weekdays and Weekends
            </MenuItem>
          </Select>
          <FormHelperText>Select Programme Track</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDeliveryMethodField = ({
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
            labelId="deliveryMethod"
            id="deliveryMethod"
            value={deliveryMethod}
            onChange={handleDeliveryMethodChange}
            //label="Is Featured"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"live-in-person"}>Live In-Person</MenuItem>
            <MenuItem value={"live-online"}>Live Online</MenuItem>
            <MenuItem value={"self-pace"}>Self-paced</MenuItem>
            <MenuItem value={"blended"}>Blended</MenuItem>
          </Select>
          <FormHelperText>Select Delivery Method</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderDisplayOnStoreField = ({
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
            labelId="displayOnStore"
            id="displayOnStore"
            value={displayOnStore}
            onChange={handleDisplayOnStoreChange}
            label="Display On Store?"
            style={{ width: 237, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"yes"}>Yes</MenuItem>
            <MenuItem value={"no"}>No</MenuItem>
          </Select>
          <FormHelperText>Display On Store</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderIsCourseAuditableField = ({
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
            labelId="isCourseAuditable"
            id="isCourseAuditable"
            value={isCourseAuditable}
            onChange={handleIsCourseAuditableChange}
            //label="Display On Store?"
            style={{ width: 300, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
          <FormHelperText>Is Course Auditable?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderShowGenericWeekdayStartDateTextField = ({
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
            labelId="showGenericWeekdayStartDateText"
            id="showGenericWeekdayStartDateText"
            value={showGenericWeekdayStartDateText}
            onChange={handleShowGenericWeekdayStartDateTextChange}
            //label="Display On Store?"
            style={{ width: 250, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
          <FormHelperText>Show Generic Weekday Start Date Text?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderShowGenericWeekendStartDateTextField = ({
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
            labelId="showGenericWeekendStartDateText"
            id="showGenericWeekendStartDateText"
            value={showGenericWeekendStartDateText}
            onChange={handleShowGenericWeekendStartDateTextChange}
            //label="Display On Store?"
            style={{ width: 235, marginTop: 0, height: 38, marginLeft: 5 }}
            //{...input}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
          <FormHelperText>Show Generic Weekend Start Date Text?</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderPriceCurrencyField = ({
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
            label="Currency"
            style={{ width: 190, marginTop: 0, height: 38 }}
            //{...input}
          >
            {renderCurencyList()}
          </Select>
          <FormHelperText>Price Currency</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCategoryField = ({
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
            labelId="category"
            id="category"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            style={{ marginTop: 0, width: 310, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderCategoryList()}
          </Select>
          <FormHelperText>Course Category</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderChannelField = ({
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
            //label="Channel"
            style={{ marginTop: 0, width: 280, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderChannelsList()}
          </Select>
          <FormHelperText>Course Channel</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderProgrammeField = ({
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
            //label="Channel"
            style={{ marginTop: 0, width: 210, height: 38, marginLeft: 0 }}
            //{...input}
          >
            {renderProgrammesList()}
          </Select>
          <FormHelperText>Course Programme</FormHelperText>
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
            value={courseClass}
            onChange={handleCourseClassChange}
            //label="Is Featured"
            style={{ width: 190, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"public"}>Public</MenuItem>
            <MenuItem value={"private"}>Private</MenuItem>
          </Select>
          <FormHelperText>Select Course Class</FormHelperText>
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
            value={courseStatus}
            onChange={handleCourseStatusChange}
            //label="Is Featured"
            style={{ width: 190, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"active"}>Active</MenuItem>
            <MenuItem value={"inactive"}>Inactive</MenuItem>
          </Select>
          <FormHelperText>Select Course Status</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderHasSeriesField = ({
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
            labelId="hasSeries"
            id="hasSeries"
            value={hasSeries}
            onChange={handleHasSeriesChange}
            //label="Is Featured"
            style={{ width: 190, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
          <FormHelperText>Is Course In Series</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderHasMentorshipCreditField = ({
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
            labelId="hasMentorshipCredit"
            id="hasMentorshipCredit"
            value={hasMentorshipCredit}
            onChange={handleHasMentorshipCreditChange}
            //label="Is Featured"
            style={{ width: 190, marginTop: 0, height: 38 }}
            //{...input}
          >
            <MenuItem value={"true"}>Yes</MenuItem>
            <MenuItem value={"false"}>No</MenuItem>
          </Select>
          <FormHelperText>Include Mentorship Credit?</FormHelperText>
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
            labelId="type"
            id="type"
            value={courseType}
            onChange={handleCourseTypeChange}
            //label="Is Featured"
            style={{ width: 300, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"crash-course"}>Crash Courses</MenuItem>
            <MenuItem value={"regular-course"}>Conventional Courses</MenuItem>
            <MenuItem value={"certification"}>Certification Courses</MenuItem>
            <MenuItem value={"vocational"}>Vocational</MenuItem>
          </Select>
          <FormHelperText>Select Course Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderAcceptablePaymentTypesField = ({
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
            labelId="acceptablePaymentOptions"
            id="acceptablePaymentOptions"
            value={acceptablePaymentOptions}
            onChange={handleAcceptablePaymentOptionsChange}
            //label="Is Featured"
            style={{ width: 500, marginTop: 10, height: 38 }}
            //{...input}
          >
            <MenuItem value={"all-types"}>All Types</MenuItem>
            <MenuItem value={"only-online"}>Strictly Online Payment</MenuItem>
            <MenuItem value={"only-bank-transfer"}>
              Strictly Bank Transfers
            </MenuItem>
          </Select>
          <FormHelperText>Select Acceptable Payment Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const buttonContent = () => {
    return <React.Fragment> Submit</React.Fragment>;
  };

  const onSubmit = (formValues) => {
    setLoading(true);

    if (!channel) {
      props.handleFailedSnackbar(
        "Please select the course channel and try again"
      );
      setLoading(false);
      return;
    }

    if (!programme) {
      props.handleFailedSnackbar(
        "Please select the course programme and try again"
      );
      setLoading(false);
      return;
    }

    if (!category) {
      props.handleFailedSnackbar(
        "Please select the course category and try again"
      );
      setLoading(false);
      return;
    }

    if (!formValues["title"]) {
      props.handleFailedSnackbar("Please enter the title of the course");
      setLoading(false);
      return;
    }

    if (!formValues["price"]) {
      props.handleFailedSnackbar("Please enter the course price and try again");
      setLoading(false);
      return;
    }

    if (!currency) {
      props.handleFailedSnackbar(
        "Please select the price currency of the course and try again"
      );
      setLoading(false);
      return;
    }

    const form = new FormData();
    form.append("title", formValues.title);
    form.append("channel", channel);
    form.append("programme", programme);
    form.append("category", category);
    form.append("paymentOptions", formValues.paymentOptions);
    form.append(
      "shortDescription",
      formValues.shortDescription ? formValues.shortDescription : ""
    );
    form.append(
      "longDescription",
      formValues.longDescription ? formValues.longDescription : ""
    );

    //form.append("refNumber", formValues.refNumber);
    form.append("price", formValues.price);
    form.append("currency", currency);
    form.append("deliveryMethod", deliveryMethod);
    form.append("duration", formValues.duration);
    form.append("isCourseAuditable", isCourseAuditable);
    form.append("weekdayAuditDays", formValues.weekdayAuditDays);
    form.append("weekendAuditDays", formValues.weekendAuditDays);
    form.append("venue", formValues.venue);
    form.append("weekdaySessionPeriod", formValues.weekdaySessionPeriod);
    form.append("weekendSessionPeriod", formValues.weekendSessionPeriod);
    form.append("lectureDuration", formValues.lectureDuration);
    form.append("projectDuration", formValues.projectDuration);
    form.append("features", formValues.features);
    form.append("prerequisites", formValues.prerequisites);
    form.append("tools", formValues.tools);
    form.append("targetAudience", formValues.targetAudience);
    form.append("whatToLearn", formValues.whatToLearn);
    form.append("venueLink", formValues.venueLink);
    form.append("capstoneProject", formValues.capstoneProject);
    form.append("contents", formValues.contents);
    form.append("successTips", formValues.successTips);
    form.append("priceLabel", formValues.priceLabel);
    form.append(
      "commencementWeekdaysDate",
      formValues.commencementWeekdaysDate
    );
    form.append(
      "commencementWeekendsDate",
      formValues.commencementWeekendsDate
    );
    form.append("track", track);
    form.append("type", courseType);
    form.append("status", courseStatus);

    form.append("createdBy", props.userId);

    form.append(
      "showGenericWeekdayStartDateText",
      showGenericWeekdayStartDateText
    );
    form.append("keyword1", formValues.keyword1 ? formValues.keyword1 : "");
    form.append("keyword2", formValues.keyword2 ? formValues.keyword2 : "");
    form.append("keyword3", formValues.keyword3 ? formValues.keyword3 : "");
    form.append(
      "showGenericWeekendStartDateText",
      showGenericWeekendStartDateText
    );

    form.append(
      "genericWeekdayStartDateText",
      formValues.genericWeekdayStartDateText
    );
    form.append("slug", formValues.slug);
    form.append(
      "genericWeekendStartDateText",
      formValues.genericWeekendStartDateText
    );
    form.append("majorSkills", formValues.majorSkills);
    form.append("minorSkills", formValues.minorSkills);
    form.append("passGrade", formValues.passGrade);
    form.append("acceptablePaymentOptions", acceptablePaymentOptions);
    // form.append("deliverability", formValues.deliverability);
    form.append("isInstallmentalPaymentAllowed", isInstallmentalPaymentAllowed);

    form.append(
      "maximumInstallmentalPayment",
      formValues.maximumInstallmentalPayment
    );
    form.append("videoId", formValues.videoId);
    form.append("videoType", videoType);
    form.append("allowLifeTimeAccess", allowLifeTimeAccess);
    form.append("previewVideoId", formValues.previewVideoId);
    form.append("hasSeries", hasSeries);
    form.append("series", formValues.series);
    form.append("hasMentorshipCredit", hasMentorshipCredit);
    form.append(
      "mentorshipCredit",
      formValues.mentorshipCredit ? formValues.mentorshipCredit : 0
    );
    form.append("mentorshipDuration", formValues.mentorshipDuration);
    form.append(
      "costPerMentorshipCredit",
      formValues.costPerMentorshipCredit
        ? formValues.costPerMentorshipCredit
        : 0
    );

    form.append("allowInstructors", allowInstructors);
    form.append("allowHomeInstructors", allowHomeInstructors);
    form.append("allowAssessments", allowAssessments);
    form.append("allowMentorship", allowMentorship);

    if (!formValues["refNumber"]) {
      const refNumber =
        "NEXT" + "-" + Math.floor(Math.random() * 100000000) + "-" + "PR";

      form.append("refNumber", refNumber);
    } else {
      form.append("refNumber", formValues.refNumber);
    }

    if (formValues.imageCover) {
      form.append("imageCover", formValues.imageCover[0]);
    }

    // for (let i = 0; i < uploadedFiles.length; i++) {
    //   form.append(`images`, uploadedFiles[i]);
    // }

    if (form) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/courses`, form);

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_PRODUCT,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `${response.data.data.data.title} Course is added successfully!!!`
          );
          props.renderProductUpdateCounter();
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
    <div>
      <form id="productForm" className={classes.formStyles}>
        <Grid
          item
          container
          style={{ marginTop: 1, marginBottom: 2 }}
          justifyContent="center"
        >
          <CancelRoundedIcon
            style={{
              marginLeft: 520,
              fontSize: 30,
              marginTop: "-20px",
              cursor: "pointer",
            }}
            onClick={() => [props.handleDialogOpenStatus()]}
          />
        </Grid>
        <Grid item container style={{ marginTop: 20 }} justifyContent="center">
          <FormLabel
            style={{ color: "grey", fontSize: "1.3em" }}
            component="legend"
          >
            <Typography variant="h5">Add Course</Typography>
          </FormLabel>
        </Grid>
        <Box
          sx={{
            width: 500,
            height: 420,
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 280 }}>
              <Field
                label=""
                id="channel"
                name="channel"
                type="text"
                component={renderChannelField}
              />
            </Grid>
            <Grid item style={{ width: 210, marginLeft: 10 }}>
              <Field
                label=""
                id="programme"
                name="programme"
                type="text"
                component={renderProgrammeField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ marginLeft: 0, width: 310 }}>
              <Field
                label=""
                id="category"
                name="category"
                type="text"
                component={renderCategoryField}
              />
            </Grid>
            <Grid item style={{ width: 175, marginLeft: 15 }}>
              <Field
                label=""
                id="refNumber"
                name="refNumber"
                helperText="Reference Number"
                type="text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="title"
            name="title"
            helperText="Course Title"
            type="text"
            component={renderSingleLineField}
            autoComplete="off"
            style={{ marginTop: 20 }}
          />

          <Field
            label=""
            id="shortDescription"
            name="shortDescription"
            helperText="Short Description"
            rows={4}
            type="text"
            component={renderMultilineField}
          />
          <Field
            label=""
            id="longDescription"
            name="longDescription"
            rows={8}
            type="text"
            helperText="Detail Description"
            component={renderMultilineField}
          />

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Course Keywords for Discoverability
            </FormLabel>
          </Grid>
          <Grid container direction="column" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "100%" }}>
              <Field
                label=""
                id="keyword1"
                name="keyword1"
                type="text"
                component={renderProductKeyword1Field}
              />
            </Grid>
            <Grid item style={{ width: "100%", marginTop: 15 }}>
              <Field
                label=""
                id="keyword2"
                name="keyword2"
                type="text"
                component={renderProductKeyword2Field}
              />
            </Grid>
            <Grid item style={{ width: "100%", marginTop: 15 }}>
              <Field
                label=""
                id="keyword3"
                name="keyword3"
                type="text"
                component={renderProductKeyword3Field}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Course Features
            </FormLabel>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="price"
                name="price"
                type="number"
                helperText="Course Price"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="currency"
                name="currency"
                type="text"
                component={renderPriceCurrencyField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="priceLabel"
            name="priceLabel"
            type="text"
            helperText="Course Price Label"
            component={renderSingleLineField}
            style={{ width: 500, marginTop: 10 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "40%" }}>
              <Field
                label=""
                id="isInstallmentalPaymentAllowed"
                name="isInstallmentalPaymentAllowed"
                type="text"
                helperText="is Installmental Payment Allowed?"
                component={renderIsInstallmentalPaymentAllowedChangeField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: "57%" }}>
              <Field
                label=""
                id="maximumInstallmentalPayment"
                name="maximumInstallmentalPayment"
                type="text"
                helperText="Maximum Number of Installmental Payment Allowed"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="duration"
            name="duration"
            helperText="Course Duration"
            type="text"
            component={renderSingleLineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="type"
                name="type"
                type="text"
                helperText="Course Type"
                component={renderTypeField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="track"
                name="track"
                type="text"
                component={renderTrackField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="deliveryMethod"
                name="deliveryMethod"
                type="text"
                helperText="Delivery Method"
                component={renderDeliveryMethodField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="class"
                name="class"
                type="text"
                component={renderClassField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="isCourseAuditable"
                name="isCourseAuditable"
                type="text"
                helperText="Is Course Auditable?"
                component={renderIsCourseAuditableField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="status"
                name="status"
                type="text"
                component={renderStatusField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="weekdayAuditDays"
                name="weekdayAuditDays"
                type="text"
                helperText="Weekday Audit Days"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="weekendAuditDays"
                name="weekendAuditDays"
                type="text"
                helperText="Weekend Audit Days"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="acceptablePaymentOptions"
            name="acceptablePaymentOptions"
            type="text"
            component={renderAcceptablePaymentTypesField}
          />

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="weekdaySessionPeriod"
                name="weekdaySessionPeriod"
                type="text"
                helperText="Weekday Session Period"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="weekendSessionPeriod"
                name="weekendSessionPeriod"
                type="text"
                helperText="WeekendS ession Period"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "100%" }}>
              <Field
                label=""
                id="lectureDuration"
                name="lectureDuration"
                type="text"
                helperText="Lecture Duration"
                component={renderSingleLineField}
              />
            </Grid>
            {/* <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="projectDuration"
                name="projectDuration"
                type="text"
                helperText="Project Duration"
                component={renderSingleLineField}
              />
            </Grid> */}
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="commencementWeekdaysDate"
                name="commencementWeekdaysDate"
                type="text"
                helperText="Commencement Weekdays Date"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="commencementWeekendsDate"
                name="commencementWeekendsDate"
                type="text"
                helperText="Commencement Weekends Date"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="showGenericWeekdayStartDateText"
                name="showGenericWeekdayStartDateText"
                type="text"
                helperText="Show Generic Weekday Start Date Text"
                component={renderShowGenericWeekdayStartDateTextField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="showGenericWeekendStartDateText"
                name="showGenericWeekendStartDateText"
                type="text"
                helperText="Show Generic WeekendS tart Date Text"
                component={renderShowGenericWeekendStartDateTextField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "55%" }}>
              <Field
                label=""
                id="genericWeekdayStartDateText"
                name="genericWeekdayStartDateText"
                type="text"
                helperText="Generic Weekday Start Date Text"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: "43%" }}>
              <Field
                label=""
                id="genericWeekendStartDateText"
                name="genericWeekendStartDateText"
                type="text"
                helperText="Generic Weekend Start Date Text"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="venue"
                name="venue"
                type="text"
                helperText="Course Venue"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="venueLink"
                name="venueLink"
                type="text"
                helperText="Venue Link"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Field
            label=""
            id="features"
            name="features"
            type="text"
            rows={6}
            helperText="Course Features"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Field
            label=""
            id="prerequisites"
            name="prerequisites"
            type="text"
            rows={6}
            helperText="Course Prerequisites"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="tools"
            name="tools"
            type="text"
            rows={6}
            helperText="Course  Required Tools"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Field
            label=""
            id="targetAudience"
            name="targetAudience"
            type="text"
            rows={6}
            helperText="Course Target Audience"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Field
            label=""
            id="whatToLearn"
            name="whatToLearn"
            type="text"
            rows={6}
            helperText="What To Learn in this Course"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="contents"
            name="contents"
            type="text"
            rows={6}
            helperText="Course Contents"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Field
            label=""
            id="successTips"
            name="successTips"
            type="text"
            rows={6}
            helperText="Success Tips"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />

          <Field
            label=""
            id="majorSkills"
            name="majorSkills"
            type="text"
            rows={6}
            helperText="Major Skills"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Field
            label=""
            id="minorSkills"
            name="minorSkills"
            type="text"
            rows={6}
            helperText="Minor Skills"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="passGrade"
                name="passGrade"
                type="text"
                helperText=" Pass Grade"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="paymentOptions"
                name="paymentOptions"
                type="text"
                helperText="Payment Options"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="videoId"
                name="videoId"
                type="text"
                helperText="Course YouTube Video Id"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="previewVideoId"
                name="previewVideoId"
                type="text"
                helperText="Preview YouTube Video Id"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="videoType"
                name="videoType"
                type="text"
                // helperText="Course YouTube Video Id"
                component={renderVideoTypeField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="allowLifeTimeAccess"
                name="allowLifeTimeAccess"
                type="text"
                component={renderAllowLifeTimeAccessField}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "40%" }}>
              <Field
                label=""
                id="hasSeries"
                name="hasSeries"
                type="text"
                helperText="Is this Course In Series"
                component={renderHasSeriesField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: "57%" }}>
              <Field
                label=""
                id="series"
                name="series"
                type="text"
                helperText="Course Series"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Field
            label=""
            id="slug"
            name="slug"
            type="text"
            helperText="Course Slug"
            component={renderSingleLineField}
            style={{ marginTop: 10 }}
          />

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Course Projects
            </FormLabel>
          </Grid>

          <Field
            label=""
            id="capstoneProject"
            name="capstoneProject"
            type="text"
            rows={10}
            helperText="Capstone Project"
            component={renderMultilineField}
            autoComplete="off"
            style={{ marginTop: 10 }}
          />
          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Mentorship
            </FormLabel>
          </Grid>

          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "40%" }}>
              <Field
                label=""
                id="hasMentorshipCredit"
                name="hasMentorshipCredit"
                type="text"
                helperText="Is Mentorship Credit Available"
                component={renderHasMentorshipCreditField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10, width: "57%" }}>
              <Field
                label=""
                id="mentorshipCredit"
                name="mentorshipCredit"
                defaultValue={0}
                type="number"
                helperText="Mentorship Credit"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "60%" }}>
              <Field
                label=""
                id="mentorshipDuration"
                name="mentorshipDuration"
                type="text"
                helperText="Mentorship Duration"
                component={renderSingleLineField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="costPerMentorshipCredit"
                name="costPerMentorshipCredit"
                defaultValue={0}
                type="number"
                helperText="Cost Per Mentorship Credit"
                component={renderSingleLineField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Availability Platforms
            </FormLabel>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="allowInstructors"
                name="allowInstructors"
                type="text"
                helperText="Available for Teaching Service"
                component={renderAllowInstructorsField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="allowHomeInstructors"
                name="allowHomeInstructors"
                type="test"
                helperText="Available for Home & Private Teaching"
                component={renderAllowHomeInstructorsField}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "50%" }}>
              <Field
                label=""
                id="allowAssessments"
                name="allowAssessments"
                type="text"
                helperText="Available for Assessments & Mocks"
                component={renderAllowAssessmentsField}
              />
            </Grid>
            <Grid item style={{ marginLeft: 10 }}>
              <Field
                label=""
                id="allowMentorship"
                name="allowMentorship"
                type="text"
                helperText="Available for Mentorship"
                component={renderAllowMentorshipField}
              />
            </Grid>
          </Grid>

          <Grid item container style={{ marginTop: 20 }}>
            <FormLabel style={{ color: "blue" }} component="legend">
              Product images
            </FormLabel>
          </Grid>
          <Field
            label="Upload Course Thumbnail (jpg, jpeg or png formats)"
            name="imageCover"
            type="file"
            accept="image/*"
            component={renderProductThumbnailField}
          />
          {/* <Grid item>
            <Field
              label="Upload Product Images (jpg, jpeg or png formats)"
              id="images"
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileEvent}
              component={renderImagesField}
              style={{ marginTop: 20, width: 500 }}
              disabled={fileLimit}
            />
            {uploadedFiles.map((file) => [<br />, file.name])}
          </Grid> */}

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
    </div>
  );
}

export default reduxForm({
  form: "productForm",
})(ProductForm);
