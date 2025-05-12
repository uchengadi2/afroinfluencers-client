import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Snackbar from "@material-ui/core/Snackbar";
import background from "./../../assets/images/home/path.jpg";

import { baseURL } from "../../apis/util";
import api from "../../apis/local";

import theme from "../ui/Theme";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 350,
    width: "80%",

    marginLeft: "13em",
    //borderRadius: 30,
    marginTop: "4em",
    marginBottom: "1em",
    padding: 0,
    backgroundColor: "#ECFFE6",
  },
  rootMobile: {
    maxWidth: "100%",
    //height: 440,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: 30,
    marginBottom: "3em",
    padding: 0,
    backgroundColor: "#ECFFE6",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  comboType: {
    marginLeft: 10,
  },
  mediaMobile: {
    height: 150,
    width: 150,
    marginLeft: "80px",
  },
  media: {
    height: "100%",
    width: "100%",
    //marginLeft: "80px",
    //marginTop: "80px",
  },

  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    marginTop: "55px",
    marginLeft: "160px",
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  dialog: {
    //maxWidth: 325,
    maxWidth: 500,
    //height: 450,
    marginLeft: "10px",
    borderRadius: 30,
    //marginTop: "10em",
    padding: 0,
    marginTop: -20,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "250px",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  background: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "60em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function ServicePreferenceProgrammeCourses(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [courseList, setCourseList] = useState([]);
  const [courseType, setCourseType] = useState("all");

  const [learningPath, setLearningPath] = useState("retail");
  const [servicePath, setServicePath] = useState(0);
  const [programmeList, setProgrammeList] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [channel, setChannel] = useState(props.channel);
  const [programme, setProgramme] = useState(props.programme);
  const [programmeCount, setProgrammeCount] = useState();

  // const { token, setToken } = useToken();
  // const { userId, setUserId } = useUserId();
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  let imageUrl = "";
  if (product) {
    imageUrl = `${baseURL}/images/products/${product.imageCover}`;
  }

  const Str = require("@supercharge/strings");

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/channels`);
      const workingData = response.data.data.data;

      workingData.map((channel) => {
        allData.push({ id: channel._id, name: channel.name });
      });
      setChannelList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];

      if (channel === 0) {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/programmes`);
        const workingData = response.data.data.data;
        workingData.map((programme) => {
          allData.push({ id: programme._id, name: programme.name });
        });
        setProgrammeList(allData);
      } else {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/programmes`, {
          params: { channel: channel },
        });
        const workingData = response.data.data.data;
        workingData.map((programme) => {
          allData.push({ id: programme._id, name: programme.name });
        });
        setProgrammeList(allData);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, [channel]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let allData = [];
  //     api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
  //     const response = await api.get(`/courses`, {
  //       params: { channel: channel, programme: programme },
  //     });
  //     const workingData = response.data.data.data;
  //     workingData.map((course) => {
  //       allData.push({ id: course._id, name: course.title });
  //     });
  //     setCourseList(allData);
  //   };

  //   //call the function

  //   fetchData().catch(console.error);
  // }, [channel, programme]);

  // const handleMarketChange = (event) => {
  //   setMarket(event.target.value);
  // };

  const handleProgrammeChange = (event) => {
    setProgramme(event.target.value);
    props.updateChannelHandler(channel);
    props.updateProgrammeHandler(event.target.value);
    props.updatePathHandler(courseType);
    props.updateServicePathInfoInfo();
  };

  const handleChannelChange = (event) => {
    setChannel(event.target.value);
    props.updateChannelHandler(event.target.value);
    props.updateProgrammeHandler(programme);
    props.updatePathHandler(courseType);
    props.updateServicePathInfoInfo();
  };

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);

    //props.updatePathHandler(event.target.value);
    props.updatePathHandler(event.target.value);
    props.updateChannelHandler(channel);
    props.updateProgrammeHandler(programme);
    //props.updateLearningPathInfoInfo();
    props.updateServicePathInfoInfo();
  };

  //get the market list
  const renderCourseList = () => {
    let id = 0;
    return courseList.map((item) => {
      return [
        id === 0 && (
          <MenuItem key={id++} value={0}>
            All Courses
          </MenuItem>
        ),
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>,
      ];
    });
  };

  //get the state list
  const renderProgrammeList = () => {
    let id = 0;
    return programmeList.map((item) => {
      return [
        id === 0 && (
          <MenuItem key={id++} value={0}>
            All Programmes
          </MenuItem>
        ),

        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>,
      ];
    });
  };

  //get the channe; list
  const renderChannelList = () => {
    let id = 0;
    return channelList.map((item) => {
      return [
        id === 0 && (
          <MenuItem key={id++} value={0}>
            All Channels
          </MenuItem>
        ),
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>,
      ];
    });
  };

  // const renderCourseTypeField = () => {
  //   return (
  //     <Box>
  //       <FormControl variant="outlined">
  //         {/* <InputLabel id="vendor_city">City</InputLabel> */}
  //         <Select
  //           labelId="course"
  //           id="course"
  //           value={course}
  //           onChange={handleCourseChange}
  //           //label="Market"
  //           style={{
  //             height: 38,
  //             width: matchesMDUp ? 300 : 135,
  //             marginTop: 10,
  //             //marginLeft: 80,
  //           }}
  //         >
  //           {renderCourseList()}
  //         </Select>
  //         <FormHelperText>Choose A Course Type</FormHelperText>
  //       </FormControl>
  //     </Box>
  //   );
  // };

  const renderProgrammeField = () => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="programme"
            id="programme"
            value={programme}
            onChange={handleProgrammeChange}
            // label="State"
            style={{
              height: 38,
              width: matchesMDUp ? 550 : 115,
              marginTop: 10,
              //marginLeft: 45,
            }}
          >
            {renderProgrammeList()}
          </Select>
          <FormHelperText>Choose A Programme</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderChannelField = () => {
    return (
      <Box>
        <FormControl variant="outlined">
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="channel"
            id="channel"
            value={channel}
            onChange={handleChannelChange}
            //label="Country"
            style={{
              height: 38,
              width: matchesMDUp ? 435 : 95,
              marginTop: 10,
              marginLeft: 0,
            }}
          >
            {renderChannelList()}
          </Select>
          <FormHelperText>Select Channel</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  const renderCourseTypeField = () => {
    return (
      <Box>
        <FormControl variant="outlined" className={classes.accountType}>
          {/* <InputLabel id="vendor_city">City</InputLabel> */}
          <Select
            labelId="courseType"
            id="courseType"
            value={courseType}
            onChange={handleCourseTypeChange}
            //label="Learning Path"
            style={{
              height: 38,
              width: matchesMDUp ? 300 : 135,
              marginTop: 10,
              marginLeft: 10,
            }}
          >
            <MenuItem value={"all"}>All Courses</MenuItem>
            {/* <MenuItem value={"crash-course"}>Nuggets(On-Demand Knowledge Refreshers)</MenuItem> */}
            <MenuItem value={"regular-course"}>Regular Courses</MenuItem>
            <MenuItem value={"certification"}>Certification Courses</MenuItem>

            <MenuItem value={"vocational"}>Vocational Courses</MenuItem>
          </Select>
          <FormHelperText>Select Course Type</FormHelperText>
        </FormControl>
      </Box>
    );
  };

  return (
    <>
      {matchesMDUp ? (
        <Card className={classes.root}>
          <Grid container direction="row" style={{ marginTop: 20 }}>
            <Grid item style={{ width: "37.5%" }}>
              <CardContent>{renderChannelField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "37.5%", marginLeft: 40 }}>
              <CardContent>{renderProgrammeField()}</CardContent>
            </Grid>
            {/* <Grid item style={{ width: "25%", marginLeft: 40 }}>
              <CardContent>{renderCourseTypeField()}</CardContent>
            </Grid> */}
          </Grid>
          {/* </CardActionArea> */}
        </Card>
      ) : (
        <Card className={classes.rootMobile} disableRipple>
          <Grid
            container
            direction="row"
            justifyContent="left"
            className={classes.rootMobile}
          >
            <Grid item style={{ width: "38%" }}>
              <CardContent>{renderChannelField()}</CardContent>
            </Grid>
            <Grid item style={{ width: "42%", marginLeft: 30 }}>
              <CardContent>{renderProgrammeField()}</CardContent>
            </Grid>
            {/* <Grid item style={{ width: "40%", marginLeft: 40 }}>
              <CardContent>{renderCourseTypeField()}</CardContent>
            </Grid> */}
          </Grid>
        </Card>
      )}
      <Dialog
        //style={{ zIndex: 1302 }}
        fullScreen={matchesXS}
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          style: {
            paddingTop: matchesXS ? "1em" : "3em",
            marginTop: 110,
            height: 540,
            paddingBottom: "3em",
            paddingLeft: matchesXS
              ? 0
              : matchesSM
              ? "3em"
              : matchesMD
              ? "10em"
              : "2em",
            paddingRight: matchesXS
              ? 0
              : matchesSM
              ? "5em"
              : matchesMD
              ? "10em"
              : "2em",
          },
        }}
      >
        <DialogContent>
          <Card className={classes.dialog}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                alt={product.name}
                image={imageUrl}
                crossOrigin="anonymous"
              />
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: { backgroundColor: alert.backgroundColor },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={4000}
      />
    </>
  );
}
