import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
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
import backgroundDerica from "./../../assets/images/covers/food2.png";
import backgroundPaint from "./../../assets/images/covers/delivery.png";
import backgroundBulk from "./../../assets/images/controlsoft/creator2.jpg";
import backgroundRetail from "./../../assets/images/covers/delivery.png";

import backgroundProduct from "./../../assets/images/controlsoft/creator1.jpg";
import backgroundGrowth from "./../../assets/images/controlsoft/image24.webp";
import backgroundMetrics from "./../../assets/images/controlsoft/image20.webp";

import softwareEngineering from "./../../assets/images/influencers/cover1.webp";
import qualityAssurance from "./../../assets/images/influencers/cover2.webp";


import { baseURL } from "../../apis/util";

import theme from "../ui/Theme";
import { PropaneSharp } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    //height: "100%",
    //height: 350,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    //marginTop: "2em",
    //marginBottom: "1em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },

  uppercard: {
    maxWidth: "100%",
    height: 1150,
    //height: 350,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "10em",
    marginBottom: "10em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  uppercardMobile: {
    maxWidth: "100%",
    height: 3650,
    //height: 350,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    marginTop: "10em",
    marginBottom: "0em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  uppercardsec: {
    maxWidth: "100%",
    height: 950,
    //height: 350,
    width: "100%",

    marginLeft: "10px",
    //borderRadius: 30,
    //marginTop: "2em",
    marginBottom: "10em",
    padding: 0,
    // "&:hover": {
    //   //border: "solid",
    //   //borderColor: theme.palette.common.grey,
    // },
  },
  rootMobile: {
    maxWidth: "100%",
    height: 1250,
    //height: "100%",
    width: "100%",

    marginLeft: "0px",
    //borderRadius: 30,
    marginTop: "2.5em",
    marginBottom: "0.5em",
    padding: 0,
    backgroundColor: "#FFFFFF",

    "&:hover": {
      //border: "solid",
      //borderColor: theme.palette.common.grey,
    },
  },
  mediaMobile: {
    height: "100%",
    width: "100%",
    // marginLeft: "80px",
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
  actionButton: {
    borderRadius: 10,
    height: 40,
    width: 105,
    marginLeft: 7,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    fontSize: 10,
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  actionPlusButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 50,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },

  actionPlusMobileButton: {
    borderRadius: 10,
    height: 40,
    width: 130,
    marginLeft: 1,
    marginTop: 1,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  actionWholesaleButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 100,
    color: "white",
    backgroundColor: theme.palette.common.orange,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  backgroundDerica: {
    backgroundImage: `url(${backgroundDerica})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  softwareEngineering: {
    backgroundImage: `url(${softwareEngineering})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

  backgroundPaint: {
    backgroundImage: `url(${backgroundPaint})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "35em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

  qualityAssurance: {
    backgroundImage: `url(${qualityAssurance})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "35em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

  backgroundBulk: {
    backgroundImage: `url(${backgroundBulk})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  backgroundRetail: {
    backgroundImage: `url(${backgroundRetail})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

  backgroundProduct: {
    backgroundImage: `url(${backgroundProduct})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },

  backgroundGrowth: {
    backgroundImage: `url(${backgroundGrowth})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
  backgroundMetrics: {
    backgroundImage: `url(${backgroundMetrics})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    //backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    height: "25em",
    width: "83%",
    marginLeft: "8em",
    marginBottom: "2em",
    marginRight: 0,
    borderRadius: 25,
    [theme.breakpoints.down("md")]: {
      // backgroundImage: `url(${mobileBackground})`,
      backgroundAttachment: "inherit",
    },
  },
}));

export default function OurServicePlans(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openForgotPasswordForm, setOpenForgotPasswordForm] = useState(false);

  const [currencyName, setCurrencyName] = useState("naira");
  const [countryName, setCountryName] = useState();
  const [stateName, setStateName] = useState();
  const [product, setProduct] = useState({});
  const [vendorName, setVendorName] = useState();
  const [minLearnerSlot, setMinLearnerSlot] = useState(1);
  

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
    imageUrl = `${baseURL}/images/courses/${product.imageCover}`;
  }

 

  const Str = require("@supercharge/strings");

  const bronzeServices = "* **Influencer Discovery & Vetting**: We shortlist creators aligned with your campaign goals and verify engagement metrics.\n\n* **Contract Drafting & Compliance Check**: Basic legal framework tailored to local guidelines.\n\n* **Two Content Review Cycles**: Ensure messaging, visuals, and brand tone are met.\n\n* **Summary Performance Report**: Campaign outcome overview and basic performance metrics.";
  const goldServices = "* Everything in Bronze, plus.\n\n* **Advanced Audience Insights**:  Access demographic and psychographic breakdowns.\n\n* **Competitive Benchmarking**: Compare your campaign against industry trends.\n\n* **Shared Campaign Manager**: A dedicated expert to guide execution.\n\n* **Mid-Campaign Optimization Call**: Adjust strategy based on real-time performance.\n\n* **Up to 3 Content Revisions**: More flexibility to refine messaging.\n\n* **Post-Campaign Debrief Session**:Review ROI and future opportunities.";
  const customServices = "* **Content Calendar Development**: We build and manage a detailed timeline that aligns with your brand launches and audience behaviors.\n\n* **Bespoke Creative Briefing**: Custom strategy sessions and branded documentation for influencers.\n\n* **Paid Media Strategy**: Coordination of organic and paid influencer content for maximum reach and conversion.\n\n* **Dedicated Creative Team**: Access to a visual designer, copywriter, or strategist for content ideation and quality assurance.\n\n* **Minimum Number Of Influencers Required**: Three(3)\n\n* and many more services tailored to your specific needs.";
  const platinumServices = "* Everything in Gold, plus. \n\n* **Dedicated Senior Campaign Manager**: A strategic partner throughout the campaign.\n\n* **Multi-Country Localization Support**: Tailor content and strategy for different regions.\n\n* **Real-Time Analytics Dashboard**:  24/7 access to live metrics and KPIs.\n\n* **Creative Direction & Paid Amplification Coordination**: Align organic and paid performance.\n\n* **Legal & Regulatory Oversight**: Full compliance with platform rules and advertising standards in all active territories.";  
  const airlineCrewServices = "* **Crew Meet & Greet**: Protocol officers welcome arriving or departing crew members, ensuring a smooth and timely transition.\n\n* **Accommodation & Transfers**: Booking and coordinating layover hotels, airport shuttles, and crew transportation.\n\n* **Visa & Immigration Facilitation**: Assistance with crew visa-on-arrival, temporary passes, or transit clearances.\n\n* **Lost Baggage Support**: Handling reports and coordination with airlines for missing or delayed crew baggage.\n\n* **Flight Operations Coordination**: Liaising with ground handling agents, flight dispatchers, and airport authorities to ensure timely departures.\n\n* **Crew Lounge Access**: Arranging rest areas or lounges while waiting for connecting flights or ground transportation.";
  const privateServices = "* **FBO Terminal Coordination**: Pre-arrangement of private Fixed Base Operator (FBO) terminal services for privacy and security.\n\n* **Airside Vehicle Access**: Direct vehicle-to-aircraft transfers for arrivals and departures, bypassing the public terminal.\n\n* **Dedicated Protocol Officer**: Personal escort for every step of the arrival or departure process, from immigration to luggage collection.\n\n* **Customs & Security Clearance**: Seamless processing of documentation, luggage, and permits through VIP or private channels.\n\n* **Ground Concierge Services**: Booking luxury vehicles, private chefs, hotel suites, or personal security teams on request.\n\n* **Flight Coordination**: Assistance with flight changes, upgrades, or charter arrangements.";
  const specialEventServices = "* **Exclusive Arrivals & Departures**: Private entry and exit points arranged with airport security for ultimate privacy.\n\n* **Temporary Protocol Stations**: Deployment of mobile protocol stations, dedicated protocol staff, and security support.\n\n* **Crowd Control & Privacy Management**: Coordinating with airport authorities and security to manage fans, media, and public attention.\n\n* **Group Logistics Management**: Coordinating large or simultaneous arrivals, including charter or private jet logistics, hotel transfers, and luggage management.\n\n* **On-site Event Coordination**: Real-time management of arrivals, transport, schedules, and briefings.\n\n* **Media Management**: Coordination with media teams for press conferences, interviews, or public appearances.";
  const trainingServices = "* **Multilingual Protocol Staff**: Officers fluent in major international languages for guest assistance.\n\n* **Specialized Training**: Cultural sensitivity, etiquette, VIP handling, and emergency management training.\n\n* **Crisis Handling Training**: Preparing staff to handle medical emergencies, last-minute flight changes, and sensitive situations.\n\n* **On-call Staffing**: Rapid deployment of protocol officers for temporary or urgent events, group arrivals, or unplanned scenarios.\n\n* **Uniformed Professionalism**: Clean, presentable, and well-trained officers representing your brand impeccably.\n\n* **Customizable Training Modules**: Tailored training solutions based on specific client needs or industry requirements.";  
  const documentationServices = "* **Visa-on-Arrival & E-visa Processing**: Handling paperwork, payments, and approvals for immediate or digital visas.\n\n* **Transit Visa Facilitation**: Arranging transit permits for travelers with layovers or multi-airport transfers.\n\n* **Customs Declarations**: Support with declarations for luxury goods, special equipment, or sensitive cargo.\n\n* **Immigration Forms**: Assistance with completing and submitting arrival, departure, and health forms.\n\n* **Real-time Clearance Updates**: Constant communication with travelers, families, or corporate travel managers on progress.\n\n* **Special Permits & Clearances**: Arranging special permissions for high-profile guests, media teams, or sensitive cargo.";
  return (
    <>
      {matchesMDUp ? (
        <>
          <Box className={classes.uppercard} disableRipple={true}>
            {/** place the grid here */}
            <Typography variant="h3" style={{marginLeft:'40%',marginBottom:30}}>Service Plans</Typography>
            <Grid
              container
              direction="row"
              style={{ marginTop: 20, height: "100%" }}
            >
              <Grid
                container
                direction="column"
                style={{ marginLeft: 20, width: "22%", marginTop: 0 }}
              >
                <Typography variant="h5" style={{marginLeft:100, marginBottom:20}}> Bronze</Typography>
                <Grid
                  container
                  //direction="row"
                  alignItems="center"
                  className={classes.softwareEngineering}
                  justifyContent={matchesSM ? "center" : "space-between"}
                  direction={matchesSM ? "column" : "row"}
                  item
                  //style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
                  style={{ height: "20%", marginTop: 0, marginLeft: 50 }}
                ></Grid>
                
                <Grid
                  item
                  alignItems="center"
                  //style={{ height: "60%", marginLeft: "3.5em" }}
                  style={{ height: "65%", marginLeft: "3.5em" }}
                >
                  <Typography><ReactMarkdown>**Ideal for small, localized influencer efforts. Includes essential services like influencer vetting, contract setup, and basic content review. Great for first-time campaigns or one-off collaborations.**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{bronzeServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"250,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"250/influencer/month"}</Typography>
                  <Typography><strong>Campaign Surcharge Fee:</strong>&nbsp; 15% of Influencer Fee</Typography>
                  <Typography style={{fontSize:11}}><em>Campaign Surcharge fee Covers campaign execution, administration, monitoring, revisions, reporting, and QC efforts</em></Typography>
                </Grid>
               
              </Grid>
              <Grid
                container
                direction="column"
                style={{ marginLeft: 20, width: "22%", marginTop: 0 }}
              >
                <Typography variant="h5" style={{marginLeft:60, marginBottom:20}}>Gold</Typography>
                <Grid
                  container
                  //direction="row"
                  alignItems="center"
                  className={classes.qualityAssurance}
                  justifyContent={matchesSM ? "center" : "space-between"}
                  direction={matchesSM ? "column" : "row"}
                  item
                  // style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
                  style={{ height: "20%", marginTop: 0, marginLeft: 50 }}
                ></Grid>
                <Grid
                  item
                  alignItems="center"
                  // style={{ height: "60%", marginLeft: "3.5em" }}
                  style={{ height: "65%", marginLeft: "3.5em" }}
                >
                  <Typography><ReactMarkdown>**Perfect for medium-scale campaigns involving more content or longer timelines. In addition to Bronze features, it includes advanced audience insights, strategic oversight, and performance benchmarking.**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{goldServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"650,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"500/influencer/month"}</Typography>
                  <Typography><strong>Campaign Surcharge Fee:</strong>&nbsp; 15% of Influencer Fee</Typography>
                  <Typography style={{fontSize:11}}><em>Campaign Surcharge fee Covers campaign execution, administration, monitoring, revisions, reporting, and QC efforts</em></Typography>
                </Grid>
               
              </Grid>
              <Grid
                container
                direction="column"
                style={{ marginLeft: 20, width: "22%", marginTop: 0 }}
              >
                <Typography variant="h5" style={{marginLeft:60, marginBottom:20}}>Platinum</Typography>
                <Grid
                  container
                  //direction="row"
                  alignItems="center"
                  className={classes.backgroundProduct}
                  justifyContent={matchesSM ? "center" : "space-between"}
                  direction={matchesSM ? "column" : "row"}
                  item
                  // style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
                  style={{ height: "20%", marginTop: 0, marginLeft: 50 }}
                ></Grid>
                <Grid
                  item
                  alignItems="center"
                  // style={{ height: "60%", marginLeft: "3.5em" }}
                  style={{ height: "65%", marginLeft: "3.5em" }}
                >
                  <Typography><ReactMarkdown>**Designed for high-stakes campaigns with macro, mega or celebrity influencers. Offers premium oversight including a senior campaign manager, real-time analytics, cross-market localization, and legal assurance.**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{platinumServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"1,350,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"1,000/influencer/month"}</Typography>
                  <Typography><strong>Campaign Surcharge Fee:</strong>&nbsp; 15% of Influencer Fee</Typography>
                  <Typography style={{fontSize:11}}><em>Campaign Surcharge fee Covers campaign execution, administration, monitoring, revisions, reporting, and QC efforts</em></Typography>
                </Grid>
               
              </Grid>

              <Grid
                container
                direction="column"
                style={{ marginLeft: 20, width: "22%", marginTop: 0 }}
              >
              <Typography variant="h5" style={{marginLeft:80, marginBottom:0}}>Custom</Typography>
                <Grid
                  container
                  //direction="row"
                  alignItems="center"
                  className={classes.backgroundBulk}
                  justifyContent={matchesSM ? "center" : "space-between"}
                  direction={matchesSM ? "column" : "row"}
                  item
                  //style={{ height: "35%", marginTop: 0, marginLeft: 50 }}
                  style={{ height: "20%", marginTop: 20, marginLeft: 50 }}
                ></Grid>
                <Grid
                  item
                  alignItems="center"
                  //style={{ height: "60%", marginLeft: "3.5em" }}
                  style={{ height: "65%", marginLeft: "3.5em" }}
                >
                  <Typography><ReactMarkdown>**Our Custom Plan is fully tailored to your needs and may include a combination of the following high-touch services:**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{customServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"3,500,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"2,500/influencer/month"}</Typography>
                  <Typography><strong>Campaign Surcharge Fee:</strong>&nbsp; 15% of Influencer Fee</Typography>
                  <Typography style={{fontSize:11}}><em>Campaign Surcharge fee Covers campaign execution, administration, monitoring, revisions, reporting, and QC efforts</em></Typography>
                </Grid>
                
              </Grid>
              
              
            </Grid>
            <Box style={{marginBottom:40, marginTop:10,backgroundColor:"#FFFFFF"}}>
           <Typography><strong>Note</strong></Typography>
              <Typography style={{marginBottom:10,color:"black", fontSize:13}}>A per influencer <strong>Contract Initiation Fee</strong> of <strong>&#8358;{"250,000"}</strong> for Nigerian Influencers and <strong>&#36;{"250"}</strong> for Other Country Influencers is required to begin any collaboration irrespective of the service plan selected. This ensures serious engagement, covers matchmaking, vetting, and onboarding processes, and protects the value of time and resources for all parties involved.         
                
             </Typography>
             <Typography style={{marginBottom:40, color:"black", fontSize:13}}><strong><em>This Fee is non-refundable but is automatically deducted  from the final approved influencer fee upon successful contract execution</em></strong></Typography>
            </Box>
             
           
          </Box>
        </>
      ) : (
        <Box className={classes.uppercardMobile} disableRipple>
          <Typography variant="h3" style={{marginLeft:'15%',marginBottom:30, fontSize:25}}>Our Service Plans</Typography>
          <Grid
            container
            direction="row"
            style={{ marginTop: 15, height: "63%" }}
          >
            <Grid
              container
              direction="column"
              style={{ marginLeft: 10, width: "100%", marginTop: 0 }}
            >
              <Typography variant="h5" style={{marginLeft:10, marginBottom:10, fontSize:15}}> Bronze</Typography>
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.softwareEngineering}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "25%", marginTop: 0, marginLeft: 10 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "65%", marginLeft: 10 }}
              >
                <Typography style={{ fontSize: 11 }}>
                <ReactMarkdown>**Ideal for small, localized influencer efforts. Includes essential services like influencer vetting, contract setup, and basic content review. Great for first-time campaigns or one-off collaborations.**</ReactMarkdown>
                </Typography>
                <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{bronzeServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"250,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"250/influencer/month"}</Typography>
              </Grid>
              
            </Grid>
            <Grid
              container
              direction="column"
              style={{ marginLeft: 0, width: "100%", marginTop: 0 }}
            >
                <Typography variant="h5" style={{marginLeft:10, marginBottom:10}}>Gold</Typography>
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.qualityAssurance}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "25%", marginTop: 10, marginLeft: 20 }}
              ></Grid>
              

              <Grid
                item
                alignItems="center"
                style={{ height: "65%", marginLeft: 25 }}
              >
                <Typography><ReactMarkdown>**Perfect for medium-scale campaigns involving more content or longer timelines. In addition to Bronze features, it includes advanced audience insights, strategic oversight, and performance benchmarking.**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{goldServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"600,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"500/influencer/month"}</Typography>
              </Grid>
              
            </Grid>

            <Grid
              container
              direction="column"
              style={{ marginLeft: 0, width: "100%", marginTop: 0 }}
            >
              <Typography variant="h5" style={{marginLeft:10, marginBottom:0}}>Platinum</Typography>
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundBulk}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "25%", marginTop: 10, marginLeft: 20 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "65%", marginLeft: 25 }}
              >
                <Typography><ReactMarkdown>**Designed for high-stakes campaigns with macro, mega or celebrity influencers. Offers premium oversight including a senior campaign manager, real-time analytics, cross-market localization, and legal assurance.**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{platinumServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"1,350,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"1,000/influencer/month"}</Typography>
              </Grid>

             
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            style={{ marginTop: 5, height: "37%" }}
          >
           
            <Grid
              container
              direction="column"
              style={{ marginLeft: 10, width: "100%", marginTop: 0 }}
            >
               <Typography variant="h5" style={{marginLeft:10, marginBottom:0}}>Custom</Typography>
              <Grid
                container
                //direction="row"
                alignItems="center"
                className={classes.backgroundProduct}
                justifyContent={matchesSM ? "center" : "space-between"}
                direction={matchesSM ? "column" : "row"}
                item
                style={{ height: "25%", marginTop: 10, marginLeft: 10 }}
              ></Grid>
              <Grid
                item
                alignItems="center"
                style={{ height: "65%", marginLeft: 10, marginBottom:2 }}
              >
                <Typography><ReactMarkdown>**Our Custom Plan is fully tailored to your needs and may include a combination of the following high-touch services:**</ReactMarkdown></Typography>
                  <Typography>   
                  <br /><strong>Services Include:</strong><br />               
                  <ReactMarkdown>{customServices}</ReactMarkdown>
                  </Typography>
                  <Typography><strong>Agency Fee (<em style={{fontSize:11}}>Nigerian Influencers</em>):</strong>&nbsp; &#8358;{"3,500,000/influencer/month"}</Typography>
                  <Typography><strong>Agency Fee(<em style={{fontSize:11}}>Other Country Influencers</em>):</strong>&nbsp; &#36;{"2,500/influencer/month"}</Typography>
              </Grid>
              
            </Grid>
            <Box style={{marginBottom:5, marginTop:20,backgroundColor:"#FFFFFF"}}>
           <Typography><strong>Note</strong></Typography>
              <Typography style={{marginBottom:10,color:"black", fontSize:13}}>A per influencer <strong>Contract Initiation Fee</strong> of <strong>&#8358;{"250,000"}</strong> for Nigerian Influencers and <strong>&#36;{"250"}</strong> for Other Country Influencers is required to begin any collaboration irrespective of the service plan selected. This ensures serious engagement, covers matchmaking, vetting, and onboarding processes, and protects the value of time and resources for all parties involved.         
                
             </Typography>
             <Typography style={{marginBottom:10, color:"black", fontSize:13}}><strong><em>This Fee is non-refundable but is automatically deducted  from the final approved influencer fee upon successful contract execution</em></strong></Typography>
            </Box>

            
          </Grid>
          {/**This is the last lap */}
          
         
        </Box>
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
