import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Lottie from "react-lottie";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonArrow from "./../ui/ButtonArrow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Snackbar from "@material-ui/core/Snackbar";
import ReactPlayer from "react-player";

import CallToAction from "./../ui/CallToAction";

import revolutionBackground from "./../../assets/repeatingBackground.svg";
import infoBackground from "./../../assets/infoBackground.svg";
import ProductCard from "./../ProductCard";
import background from "./../../assets/images/covers/programmes2.png";
import { Category } from "@material-ui/icons";
import history from "../../history";
import AboutUsFormContainer from "./../aboutus/AboutUsFormContainer";
import ContactUsContainerForm from "./../contactus/ContactUsContainerForm";
import BecomePartnerFormContainer from "./../partner/BecomePartnerFormContainer";
//import CategoryProductsCard from "../CategoryProductsCard";
//import CartProductCard from "./CartProductCard";
import UpperFooter from "../ui/UpperFooter";
import { EDIT_CART } from "../../actions/types";

import { baseURL } from "./../../apis/util";
import api from "./../../apis/local";
import LearningPathProgrammeCourses from "../homePageCards/LearningPathProgrammeCourses";
import ServicePreferenceProgrammeCourses from "../homePageCards/ServicePreferenceProgrammeCourses";
import AllCourses from "../homePageCards/AllCourses";
import TopCoverProgrammes from "../homePageCards/TopCoverProgrammes";
import TopCoverPerProgrammeDetails from "../homePageCards/TopCoverPerProgrammeDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "40vh",
    marginTop: "4em",
    // height: "100%",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  footer: {
    width: "100%",
    marginTop: "10rem",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "99rem",
    height: "42rem",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  animation: {
    // maxWidth: "100em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em",
    },
  },
  estimateButton: {
    ...theme.typography.estimate,
    backgroundColor: theme.palette.common.orange,
    borderRadius: 50,
    height: 45,
    width: 155,
    marginRight: 40,
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  buttonContainer: {
    marginTop: "2.9em",
    marginLeft: "5.5em",
  },
  learnButtonHero: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 45,
    width: 145,
  },
  visitPartnerButtonsite: {
    ...theme.typography.partnerButton,
    fontSize: "0.9rem",
    height: 45,
    width: 200,
    [theme.breakpoints.down("sm")]: {
      width: 100,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },

    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
  },
  learnButton: {
    ...theme.typography.learnButton,
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    border: `2px solid ${theme.palette.common.blue}`,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  mainContainer: {
    marginTop: "5em",
    marginLeft: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "1em",
    },
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    color: "white",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  specialText: {
    fontFamily: "Pacifico",
    color: theme.palette.common.orange,
  },
  subtitle: {
    marginBottom: "1em",
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25,
    },
  },
  revolutionBackground: {
    backgroundImage: `url(${revolutionBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%",
    },
  },
  infoBackground: {
    backgroundImage: `url(${infoBackground})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%",
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
  backgroundMobile: {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    //height: "50em",
    height: "36em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 250,
    marginLeft: 1080,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  submitButtonMobile: {
    borderRadius: 10,
    height: 40,
    //width: 200,
    //marginLeft: 1100,
    marginLeft: 180,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function ProgrammeDetails(props) {
  const params = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  const [contactUsOpen, setContactUsOpen] = useState(false);
  const [becomePartnerOpen, setBecomePartnerOpen] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateCart, setUpdateCart] = useState();
  const [count, setCount] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const [channel, setChannel] = useState(params.channel);
  const [programme, setProgramme] = useState(params.programme);
  const [path, setPath] = useState("all");
  const [updateServicePath, setUpdateServicePath] = useState(false);
  const [isLoading, setIsLoading] = useState(null);

  const dispatch = useDispatch();

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });
  const defaultOptions = {
    loop: true,
    autoplay: false,
    // animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidyMid slice",
    },
  };

  const cartHolder = props.userId;

  const renderCartUpdate = (value) => {
    setUpdateCart(value);
  };

  const handleBecomeAPartnerOpenDialogBox = () => {
    setBecomePartnerOpen(false);
  };

  const updateChannelHandler = (value) => {
    setChannel(value);
  };
  const updateProgrammeHandler = (value) => {
    setProgramme(value);
  };
  const updatePathHandler = (value) => {
    //console.log("this is the active learning path:", value);
    setPath(value);
  };
  const updateServicePathInfoInfo = () => {
    setUpdateServicePath((prevState) => !prevState);
  };

  const handleSuccessfulBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: "Application successfully submitted",
      backgroundColor: "#4BB543",
    });
  };

  const handleFailedBecomeAPartnerOpenDialogBoxWithSnackbar = () => {
    setAlert({
      open: true,
      message: "Something went wrong somewhere",
      backgroundColor: "#FF3232",
    });
    setBecomePartnerOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let allData = [];

      //this is when path =all

      if (path === "all" && channel === 0 && programme === 0) {
        //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get("/courses?sort=desc");

        const workingData = response.data.data.data;

        workingData.map((course) => {
          allData.push({
            id: course._id,
            title: course.title,
            image: course.imageCover,
            features: course.features,
            shortDescription: course.shortDescription,
            longDescription: course.longDescription,
            deliveryMethod: course.deliveryMethod,
            duration: course.duration,
            commencementDate: course.commencementDate,
            price: course.price,
            priceLabel: course.priceLabel,
            venue: course.venue,
            instructor: course.instructor,
            sessionDuration: course.sessionDuration,
            sessionPeriod: course.sessionPeriod,
            studyPeriod: course.studyPeriod,
            lectureDuration: course.lectureDuration,
            projectDuration: course.projectDuration,
            category: course.category[0].id,
            image: course.imageCover,
            prerequisites: course.prerequisites,
            tools: course.tools,
            targetAudience: course.targetAudience,
            whatToLearn: course.whatToLearn,
            venueLink: course.venueLink,
            track: course.track,
            status: course.status,
            commencementWeekdaysDate: course.commencementWeekdaysDate,
            commencementWeekendsDate: course.commencementWeekendsDate,
            channel: course.channel[0].id,
            programme: course.programme[0].id,
            showGenericWeekdayStartDateText:
              course.showGenericWeekdayStartDateText,
            showGenericWeekendStartDateText:
              course.showGenericWeekendStartDateText,
            genericWeekdayStartDateText: course.genericWeekdayStartDateText,
            genericWeekendStartDateText: course.genericWeekendStartDateText,
            weekdaySessionPeriod: course.weekdaySessionPeriod,
            weekendSessionPeriod: course.weekendSessionPeriod,
            paymentOptions: course.paymentOptions,
            slug: course.slug,
            isCourseAuditable: course.isCourseAuditable,
            weekdayAuditDays: course.weekdayAuditDays,
            weekendAuditDays: course.weekendAuditDays,
            hasMentorshipCredit: course.hasMentorshipCredit,
            mentorshipCredit: course.mentorshipCredit,
            mentorshipDuration: course.mentorshipDuration,
            hasSeries: course.hasSeries,
            series: course.series,
            costPerMentorshipCredit: course.costPerMentorshipCredit,
            isInstallmentalPaymentAllowed: course.isInstallmentalPaymentAllowed,
            maximumInstallmentalPayment: course.maximumInstallmentalPayment,
            allowLifeTimeAccess: course.allowLifeTimeAccess,
            acceptablePaymentOptions: course.acceptablePaymentOptions,
          });
        });
        setCourseList(allData);
        setIsLoading(false);
      } //ends here

      if (path === "all" && channel !== 0 && programme !== 0) {
        //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get("/courses?sort=desc", {
          params: { channel: channel, programme: programme },
        });

        const workingData = response.data.data.data;

        console.log("this section was treated");

        workingData.map((course) => {
          allData.push({
            id: course._id,
            title: course.title,
            image: course.imageCover,
            features: course.features,
            shortDescription: course.shortDescription,
            longDescription: course.longDescription,
            deliveryMethod: course.deliveryMethod,
            duration: course.duration,
            commencementDate: course.commencementDate,
            price: course.price,
            priceLabel: course.priceLabel,
            venue: course.venue,
            instructor: course.instructor,
            sessionDuration: course.sessionDuration,
            sessionPeriod: course.sessionPeriod,
            studyPeriod: course.studyPeriod,
            lectureDuration: course.lectureDuration,
            projectDuration: course.projectDuration,
            category: course.category[0].id,
            image: course.imageCover,
            prerequisites: course.prerequisites,
            tools: course.tools,
            targetAudience: course.targetAudience,
            whatToLearn: course.whatToLearn,
            venueLink: course.venueLink,
            track: course.track,
            status: course.status,
            commencementWeekdaysDate: course.commencementWeekdaysDate,
            commencementWeekendsDate: course.commencementWeekendsDate,
            channel: course.channel[0].id,
            programme: course.programme[0].id,
            showGenericWeekdayStartDateText:
              course.showGenericWeekdayStartDateText,
            showGenericWeekendStartDateText:
              course.showGenericWeekendStartDateText,
            genericWeekdayStartDateText: course.genericWeekdayStartDateText,
            genericWeekendStartDateText: course.genericWeekendStartDateText,
            weekdaySessionPeriod: course.weekdaySessionPeriod,
            weekendSessionPeriod: course.weekendSessionPeriod,
            paymentOptions: course.paymentOptions,
            slug: course.slug,
            isCourseAuditable: course.isCourseAuditable,
            weekdayAuditDays: course.weekdayAuditDays,
            weekendAuditDays: course.weekendAuditDays,
            hasMentorshipCredit: course.hasMentorshipCredit,
            mentorshipCredit: course.mentorshipCredit,
            mentorshipDuration: course.mentorshipDuration,
            hasSeries: course.hasSeries,
            series: course.series,
            costPerMentorshipCredit: course.costPerMentorshipCredit,
            isInstallmentalPaymentAllowed: course.isInstallmentalPaymentAllowed,
            maximumInstallmentalPayment: course.maximumInstallmentalPayment,
            allowLifeTimeAccess: course.allowLifeTimeAccess,
            acceptablePaymentOptions: course.acceptablePaymentOptions,
          });
        });
        setCourseList(allData);
        setIsLoading(false);
      } //ends here

      if (path === "all" && channel !== 0 && programme === 0) {
        //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get("/courses?sort=desc", {
          params: { channel: channel },
        });

        const workingData = response.data.data.data;

        workingData.map((course) => {
          allData.push({
            id: course._id,
            title: course.title,
            image: course.imageCover,
            features: course.features,
            shortDescription: course.shortDescription,
            longDescription: course.longDescription,
            deliveryMethod: course.deliveryMethod,
            duration: course.duration,
            commencementDate: course.commencementDate,
            price: course.price,
            priceLabel: course.priceLabel,
            venue: course.venue,
            instructor: course.instructor,
            sessionDuration: course.sessionDuration,
            sessionPeriod: course.sessionPeriod,
            studyPeriod: course.studyPeriod,
            lectureDuration: course.lectureDuration,
            projectDuration: course.projectDuration,
            category: course.category[0].id,
            image: course.imageCover,
            prerequisites: course.prerequisites,
            tools: course.tools,
            targetAudience: course.targetAudience,
            whatToLearn: course.whatToLearn,
            venueLink: course.venueLink,
            track: course.track,
            status: course.status,
            commencementWeekdaysDate: course.commencementWeekdaysDate,
            commencementWeekendsDate: course.commencementWeekendsDate,
            channel: course.channel[0].id,
            programme: course.programme[0].id,
            showGenericWeekdayStartDateText:
              course.showGenericWeekdayStartDateText,
            showGenericWeekendStartDateText:
              course.showGenericWeekendStartDateText,
            genericWeekdayStartDateText: course.genericWeekdayStartDateText,
            genericWeekendStartDateText: course.genericWeekendStartDateText,
            weekdaySessionPeriod: course.weekdaySessionPeriod,
            weekendSessionPeriod: course.weekendSessionPeriod,
            paymentOptions: course.paymentOptions,
            slug: course.slug,
            isCourseAuditable: course.isCourseAuditable,
            weekdayAuditDays: course.weekdayAuditDays,
            weekendAuditDays: course.weekendAuditDays,
            hasMentorshipCredit: course.hasMentorshipCredit,
            mentorshipCredit: course.mentorshipCredit,
            mentorshipDuration: course.mentorshipDuration,
            hasSeries: course.hasSeries,
            series: course.series,
            costPerMentorshipCredit: course.costPerMentorshipCredit,
            isInstallmentalPaymentAllowed: course.isInstallmentalPaymentAllowed,
            maximumInstallmentalPayment: course.maximumInstallmentalPayment,
            allowLifeTimeAccess: course.allowLifeTimeAccess,
            acceptablePaymentOptions: course.acceptablePaymentOptions,
          });
        });
        setCourseList(allData);
        setIsLoading(false);
      } //ends here

      if (path === "all" && channel === 0 && programme !== 0) {
        //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get("/courses?sort=desc", {
          params: { programme: programme },
        });

        const workingData = response.data.data.data;

        workingData.map((course) => {
          allData.push({
            id: course._id,
            title: course.title,
            image: course.imageCover,
            features: course.features,
            shortDescription: course.shortDescription,
            longDescription: course.longDescription,
            deliveryMethod: course.deliveryMethod,
            duration: course.duration,
            commencementDate: course.commencementDate,
            price: course.price,
            priceLabel: course.priceLabel,
            venue: course.venue,
            instructor: course.instructor,
            sessionDuration: course.sessionDuration,
            sessionPeriod: course.sessionPeriod,
            studyPeriod: course.studyPeriod,
            lectureDuration: course.lectureDuration,
            projectDuration: course.projectDuration,
            category: course.category[0].id,
            image: course.imageCover,
            prerequisites: course.prerequisites,
            tools: course.tools,
            targetAudience: course.targetAudience,
            whatToLearn: course.whatToLearn,
            venueLink: course.venueLink,
            track: course.track,
            status: course.status,
            commencementWeekdaysDate: course.commencementWeekdaysDate,
            commencementWeekendsDate: course.commencementWeekendsDate,
            channel: course.channel[0].id,
            programme: course.programme[0].id,
            showGenericWeekdayStartDateText:
              course.showGenericWeekdayStartDateText,
            showGenericWeekendStartDateText:
              course.showGenericWeekendStartDateText,
            genericWeekdayStartDateText: course.genericWeekdayStartDateText,
            genericWeekendStartDateText: course.genericWeekendStartDateText,
            weekdaySessionPeriod: course.weekdaySessionPeriod,
            weekendSessionPeriod: course.weekendSessionPeriod,
            paymentOptions: course.paymentOptions,
            slug: course.slug,
            isCourseAuditable: course.isCourseAuditable,
            weekdayAuditDays: course.weekdayAuditDays,
            weekendAuditDays: course.weekendAuditDays,
            hasMentorshipCredit: course.hasMentorshipCredit,
            mentorshipCredit: course.mentorshipCredit,
            mentorshipDuration: course.mentorshipDuration,
            hasSeries: course.hasSeries,
            series: course.series,
            costPerMentorshipCredit: course.costPerMentorshipCredit,
            isInstallmentalPaymentAllowed: course.isInstallmentalPaymentAllowed,
            maximumInstallmentalPayment: course.maximumInstallmentalPayment,
            allowLifeTimeAccess: course.allowLifeTimeAccess,
            acceptablePaymentOptions: course.acceptablePaymentOptions,
          });
        });
        setCourseList(allData);
        setIsLoading(false);
      } //ends here
    };

    //call the function

    fetchData().catch(console.error);
  }, [path, updateServicePath]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const Str = require("@supercharge/strings");

  const allCourseList = matchesMD ? (
    <React.Fragment>
      {
        <Grid container direction="row">
          {courseList.map((course, index) => (
            <AllCourses
              title={course.title}
              key={`${course.id}${index}`}
              shortDescription={Str(course.shortDescription)
                .limit(500, "...")
                .get()}
              longDescription={course.longDescription}
              features={course.features}
              deliveryMethod={course.deliveryMethod}
              duration={course.duration}
              commencementDate={course.commencementDate}
              price={course.price}
              priceLabel={course.priceLabel}
              instructor={course.instructor}
              venue={course.venue}
              sessionDuration={course.sessionDuration}
              lectureDuration={course.lectureDuration}
              projectDuration={course.projectDuration}
              sessionPeriod={course.sessionPeriod}
              studyPeriod={course.studyPeriod}
              category={course.category}
              prerequisites={course.prerequisites}
              tools={course.tools}
              targetAudience={course.targetAudience}
              whatToLearn={course.whatToLearn}
              venueLink={course.venueLink}
              track={course.track}
              status={course.status}
              acceptablePaymentOptions={course.acceptablePaymentOptions}
              commencementWeekdaysDate={course.commencementWeekdaysDate}
              commencementWeekendsDate={course.commencementWeekendsDate}
              showGenericWeekdayStartDateText={
                course.showGenericWeekdayStartDateText
              }
              showGenericWeekendStartDateText={
                course.showGenericWeekendStartDateText
              }
              genericWeekdayStartDateText={course.genericWeekdayStartDateText}
              genericWeekendStartDateText={course.genericWeekendStartDateText}
              channel={course.channel}
              programme={course.programme}
              weekdaySessionPeriod={course.weekdaySessionPeriod}
              weekendSessionPeriod={course.weekendSessionPeriod}
              paymentOptions={course.paymentOptions}
              image={course.image}
              courseId={course.id}
              slug={course.slug}
              isCourseAuditable={course.isCourseAuditable}
              weekdayAuditDays={course.weekdayAuditDays}
              weekendAuditDays={course.weekendAuditDays}
              hasMentorshipCredit={course.hasMentorshipCredit}
              mentorshipCredit={course.mentorshipCredit}
              mentorshipDuration={course.mentorshipDuration}
              hasSeries={course.hasSeries}
              costPerMentorshipCredit={course.costPerMentorshipCredit}
              isInstallmentalPaymentAllowed={
                course.isInstallmentalPaymentAllowed
              }
              maximumInstallmentalPayment={course.maximumInstallmentalPayment}
              series={course.series}
              allowLifeTimeAccess={course.allowLifeTimeAccess}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              // updateLearningPathInfoInfo={updateLearningPathInfoInfo}
              path={path}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  ) : (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          {courseList.map((course, index) => (
            <AllCourses
              title={course.title}
              key={`${course.id}${index}`}
              shortDescription={Str(course.shortDescription)
                .limit(500, "...")
                .get()}
              longDescription={course.longDescription}
              features={course.features}
              deliveryMethod={course.deliveryMethod}
              duration={course.duration}
              commencementDate={course.commencementDate}
              price={course.price}
              priceLabel={course.priceLabel}
              instructor={course.instructor}
              venue={course.venue}
              sessionDuration={course.sessionDuration}
              lectureDuration={course.lectureDuration}
              projectDuration={course.projectDuration}
              sessionPeriod={course.sessionPeriod}
              studyPeriod={course.studyPeriod}
              category={course.category}
              prerequisites={course.prerequisites}
              tools={course.tools}
              targetAudience={course.targetAudience}
              whatToLearn={course.whatToLearn}
              venueLink={course.venueLink}
              track={course.track}
              status={course.status}
              acceptablePaymentOptions={course.acceptablePaymentOptions}
              commencementWeekdaysDate={course.commencementWeekdaysDate}
              commencementWeekendsDate={course.commencementWeekendsDate}
              showGenericWeekdayStartDateText={
                course.showGenericWeekdayStartDateText
              }
              showGenericWeekendStartDateText={
                course.showGenericWeekendStartDateText
              }
              genericWeekdayStartDateText={course.genericWeekdayStartDateText}
              genericWeekendStartDateText={course.genericWeekendStartDateText}
              channel={course.channel}
              programme={course.programme}
              weekdaySessionPeriod={course.weekdaySessionPeriod}
              weekendSessionPeriod={course.weekendSessionPeriod}
              paymentOptions={course.paymentOptions}
              image={course.image}
              courseId={course.id}
              slug={course.slug}
              isCourseAuditable={course.isCourseAuditable}
              weekdayAuditDays={course.weekdayAuditDays}
              weekendAuditDays={course.weekendAuditDays}
              hasMentorshipCredit={course.hasMentorshipCredit}
              mentorshipCredit={course.mentorshipCredit}
              mentorshipDuration={course.mentorshipDuration}
              hasSeries={course.hasSeries}
              costPerMentorshipCredit={course.costPerMentorshipCredit}
              isInstallmentalPaymentAllowed={
                course.isInstallmentalPaymentAllowed
              }
              maximumInstallmentalPayment={course.maximumInstallmentalPayment}
              series={course.series}
              allowLifeTimeAccess={course.allowLifeTimeAccess}
              token={props.token}
              userId={props.userId}
              setToken={props.setToken}
              setUserId={props.setUserId}
              //updateLearningPathInfoInfo={updateLearningPathInfoInfo}
              path={path}
            />
          ))}
        </Grid>
      }
    </React.Fragment>
  );

  const buttonContent = () => {
    return <React.Fragment>Enrol Into This Programme</React.Fragment>;
  };

  const onSubmit = () => {
    setLoading(true);

    if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);
      return;
    }

    let data = {
      status: "marked-for-checkout",
    };

    let allData = [];

    courseList.map((cart) => {
      allData.push({
        id: cart.id,
      });
    });

    let count;

    for (count = 0; count < allData.length; ++count) {
      if (data) {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          const response = await api.patch(`/carts/${allData[count].id}`, data);

          if (response.data.status === "success") {
            dispatch({
              type: EDIT_CART,
              payload: response.data.data.data,
            });

            setLoading(false);
            // setIsCheckoutVisible(true);
          } else {
            // props.handleFailedSnackbar(
            //   "Something went wrong, please try again!!!"
            // );
          }
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      } else {
        //props.handleFailedSnackbar("Something went wrong, please try again!!!");
      }
    }

    if (+count > 0) {
      // props.handleSuccessfulCreateSnackbar(
      //   `Please proceed to checkout page to effect payment!`
      // );
    } else {
      //props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }

    history.push(`/checkouts`);
  };

  return (
    <Grid container direction="row" className={classes.root}>
      <Grid
        container
        alignItems="center"
        className={classes.backgroundMobile}
        justifyContent={matchesSM ? "center" : "space-between"}
        direction={matchesSM ? "column" : "row"}
        style={{ marginTop: -100 }}
      >
        <Grid
          container
          alignItems="center"
          className={classes.backgroundMobile}
          justifyContent={matchesSM ? "center" : "space-between"}
          direction={matchesSM ? "column" : "row"}
          style={{ marginTop: -100 }}
        >
          <Grid item>
            {" "}
            {/*..... HERO BLOCK.... */}
            <Grid
              container
              //justifyContent="flex-end"
              //alignItems="center"
              direction="row"
            >
              <Box
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
                //justifyContent="center"
                //alignItems="center"
                color="#fff"
              >
                <Grid sm item className={classes.heroTextContainer}>
                  {matchesMD ? (
                    <Typography
                      variant={matchesSM ? "subtitle2" : "h2"}
                      align="left"
                      style={{ marginTop: "22rem" }}
                      //justifyContent="center"
                      //alignItems="center"
                    >
                      <span
                        style={{
                          marginLeft: matchesSM ? 20 : 5,
                        }}
                      >
                        {" "}
                        At Nextchamp, our courses are organized into
                        <br />
                      </span>{" "}
                      <span style={{ marginLeft: matchesSM ? 20 : 60 }}>
                        programmes—clear learning paths within each channel,
                      </span>
                      <br />
                      <span style={{ marginLeft: matchesSM ? 20 : 110 }}>
                        making it easy to find and master the skills you need.
                      </span>
                      <br />
                      <span style={{ marginLeft: matchesSM ? 40 : 130 }}>
                        Learn with confidence, progress with purpose.
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      variant={matchesSM ? "subtitle2" : "h2"}
                      align="left"
                      style={{ marginTop: "18rem", fontSize: "1.2rem" }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <span
                        style={{
                          marginLeft: matchesSM ? 7 : 5,
                        }}
                      >
                        {" "}
                        Nextchamp is a learning platform where <br />
                      </span>{" "}
                      <span style={{ marginLeft: matchesSM ? 20 : 60 }}>
                        seasoned experts and academicians train
                      </span>
                      <br />
                      <span style={{ marginLeft: matchesSM ? 30 : 110 }}>
                        and mentor novices,transforming them
                      </span>
                      <br />
                      <span style={{ marginLeft: matchesSM ? 50 : 140 }}>
                        into future champions in their fields
                      </span>
                    </Typography>
                  )}

                  {/* {matchesMD ? (
                    <Grid
                      container
                      justifyContent="flex-start"
                      direction={matchesSM ? "column" : "row"}
                      // className={classes.topCover}
                    >

                    </Grid>
                  ) : (

                  )} */}
                </Grid>
              </Box>
              {/* </div> */}
              {/* <Grid sm item className={classes.animation}>
            <Lottie options={defaultOptions} height={"100%"} width={"100%"} />
          </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ width: "100%", marginTop: "20px" }}>
        {/* <Button
          variant="contained"
          className={classes.submitButton}
          onClick={onSubmit}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button> */}

        <ServicePreferenceProgrammeCourses
          channel={channel}
          programme={programme}
          updatePathHandler={updatePathHandler}
          updateChannelHandler={updateChannelHandler}
          updateProgrammeHandler={updateProgrammeHandler}
          updateServicePathInfoInfo={updateServicePathInfoInfo}
        />
        {programme !== 0 && (
          <TopCoverPerProgrammeDetails
            channel={channel}
            programme={programme}
            updatePathHandler={updatePathHandler}
            updateChannelHandler={updateChannelHandler}
            updateProgrammeHandler={updateProgrammeHandler}
            updateServicePathInfoInfo={updateServicePathInfoInfo}
          />
        )}
        {isLoading && (
          <CircularProgress
            size={100}
            color="inherit"
            style={{ marginTop: 250, marginLeft: 650 }}
          />
        )}

        {!isLoading && courseList.length === 0 ? (
          <p style={{ marginTop: 20, marginLeft: 10 }}>
            There are no items in your cart
          </p>
        ) : (
          <Grid item>{allCourseList}</Grid>
        )}
        {/*....INFORMATION BLOCK....*/}
      </Grid>

      {matchesMD ? (
        !isLoading && programme !== 0 ? (
          <Button
            variant="contained"
            className={classes.submitButton}
            onClick={onSubmit}
            disabled={true}
          >
            {loading ? (
              <CircularProgress size={30} color="inherit" />
            ) : (
              buttonContent()
            )}
          </Button>
        ) : (
          ""
        )
      ) : !isLoading && programme !== 0 ? (
        <Button
          variant="contained"
          className={classes.submitButtonMobile}
          onClick={onSubmit}
          disabled={true}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>
      ) : (
        ""
      )}

      <Grid item className={classes.footer}>
        <UpperFooter />
      </Grid>
    </Grid>
  );
}

export default ProgrammeDetails;
