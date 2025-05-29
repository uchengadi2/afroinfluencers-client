import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReactMarkdown from "react-markdown";
import Card from "@material-ui/core/Card";
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
import heroSection from "./../../assets/images/covers/food2.png";
import backgroundDerica from "./../../assets/images/covers/food2.png";
import backgroundPaint from "./../../assets/images/covers/delivery.png";
import backgroundBulk from "./../../assets/images/covers/payment1.png";
import backgroundRetail from "./../../assets/images/covers/delivery.png";

import backgroundProduct from "./../../assets/images/covers/aboutus-cover.jpg";
import backgroundGrowth from "./../../assets/images/covers/channels.jpg";
import heroImage from "./../../assets/images/controlsoft/creator2.jpg";

import { baseURL } from "./../../apis/util";

import theme from "./../ui/Theme";

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
        height: 500,
        //height: 350,
        width: "100%",
    
        marginLeft: "10px",
        //borderRadius: 30,
        marginTop: "3em",
        marginBottom: "1em",
        padding: 20,
        backgroundColor:"#DDEB9D"
        // "&:hover": {
        //   //border: "solid",
        //   //borderColor: theme.palette.common.grey,
        // },
      },
      uppercardMobile: {
        maxWidth: "100%",
        height: 370,
        //height: 350,
        width: "100%",
    
        marginLeft: "0px",
        //borderRadius: 30,
        marginTop: "3em",
        marginBottom: "1em",
        padding: 10,
        backgroundColor:"#DDEB9D"
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
      heroSection: {
        backgroundImage: `url(${heroSection})`,
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
      heroImage: {
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        //backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "30em",
        width: "50%",
        marginLeft: "8em",
        marginBottom: "0.5em",
        marginTop:"40px",
        marginRight: 0,
        borderRadius: 25,
        [theme.breakpoints.down("md")]: {
          // backgroundImage: `url(${mobileBackground})`,
          backgroundAttachment: "inherit",
        },
      },
       heroImageMobile: {
        backgroundImage: `url(${heroImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        //backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        height: "15em",
        width: "50%",
        marginLeft: "2em",
        marginBottom: "0.5em",
        marginTop:"40px",
        marginRight: 0,
        borderRadius: 25,
        [theme.breakpoints.down("md")]: {
          // backgroundImage: `url(${mobileBackground})`,
          backgroundAttachment: "inherit",
        },
      },
      button: {
        ...theme.typography.estimate,
        borderRadius: "250px",
        marginLeft: "50%",
        marginRight: "150px",
        height: "45px",
        width: "180px",
          marginBottom:100,
    
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
          color: "white",
        },
      },
      buttonMobile: {
        ...theme.typography.estimate,
        borderRadius: "250px",
        marginLeft: "0%",
        marginRight: "0px",
        height: "45px",
        width: "180px",
      
    
        "&:hover": {
          backgroundColor: theme.palette.secondary.light,
          color: "white",
        },
      },
}));

export default function CarHireOnlyService() {
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
  const [isLoading, setIsLoading] = useState();
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

  const whatwedoSection = "Connect with Africa’s most impactful content creators. Our platform makes it easy for brands to discover, engage, and collaborate with influencers across the continent—securely, transparently, and at scale. Whether you're launching a local product or expanding across markets, we provide the tools, talent, and support to drive real results..\n\n\n\n";
    return (
      <>
        {matchesMDUp ? (
          <>
            <Box className={classes.uppercard} disableRipple={true}>
              {/* <Typography variant="h5" style={{marginLeft:"60%", marginBottom:0, width:"100%"}}>Our Process</Typography> */}
              <Grid
                container
                direction="row"
                style={{ marginTop: 0, height: "100%" }}
                
              >
                <Grid
                  container
                  direction="row"
                  style={{ marginLeft: 20, width: "30%", marginTop: 0 }}
                  alignItems="center"
                  className={classes.heroImage}
                  justifyContent={matchesSM ? "center" : "space-between"}
                  //direction={matchesSM ? "column" : "row"}
                  item
                >
                  {/* <Typography variant="h5" style={{marginLeft:"30%", marginBottom:20, width:"60%"}}>Our Process</Typography> */}
                  
                </Grid>
                {/* <Typography style={{marginTop:0, padding: 70}}>
                          <ReactMarkdown>{whatwedoSection}</ReactMarkdown>
                    </Typography> */}
                  <Grid
                    item
                    // alignItems="center"
                    // justifyContent="center"
                    //style={{ height: "60%", marginLeft: "3.5em" }}
                    style={{ height: "60%", marginLeft: "10%", width:"50%", padding:50  }}
                  >
                    <Typography style={{marginTop:40, fontSize:19}}>
                          <ReactMarkdown>Connect with Africa’s most impactful social media influencers. Our platform makes it easy for brands all around the world to discover, engage, and collaborate with influencers across the continent—securely, transparently, and at scale. </ReactMarkdown>
                    </Typography>
                    <Typography style={{marginTop:20, fontSize:19}}>
                          <ReactMarkdown>Whether you're launching a local product or expanding across markets, we provide the tools, talent, and support to drive real results.</ReactMarkdown>
                    </Typography>
                  </Grid>
                  <Grid item  style={{width: "100%", marginTop: 0, marginLeft:"20%", marginBottom:0}}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        justifyContent="center" 
                        className={classes.button}
                        component={Link}
                         to="/influencercentral/"
                    
                    >
                        Get Influencers!
                    </Button>
                  </Grid>
                  
                
               
              </Grid>
             
             
            </Box>
          </>
        ) : (
          <Box className={classes.uppercardMobile} disableRipple>
             <Grid
                container
                direction="column"
                style={{ marginTop: 20, height: "100%" }}
                
              >
                <Grid
                  container
                  direction="row"
                  style={{ marginLeft: 3, width: "30%", marginTop: 0 }}
                  alignItems="center"
                  className={classes.heroImageMobile}
                  justifyContent={matchesSM ? "center" : "space-between"}
                  //direction={matchesSM ? "column" : "row"}
                  item
                >
                  {/* <Typography variant="h5" style={{marginLeft:"30%", marginBottom:20, width:"60%"}}>Our Process</Typography> */}
                  
                </Grid>
                {/* <Typography style={{marginTop:0, padding: 70}}>
                          <ReactMarkdown>{whatwedoSection}</ReactMarkdown>
                    </Typography> */}
                  <Grid
                    item
                    // alignItems="center"
                    // justifyContent="center"
                    //style={{ height: "60%", marginLeft: "3.5em" }}
                    style={{ height: "70%", marginLeft: "2%", width:"70%", padding:5, marginRight:"10%"  }}
                  >
                    <Typography style={{marginTop:10, fontSize:12}}>
                          <ReactMarkdown>Connect with Africa’s most impactful social media influencers. Our platform makes it easy for brands all around the world to discover, engage, and collaborate with influencers across the continent—securely, transparently, and at scale. </ReactMarkdown>
                    </Typography>
                    <Typography style={{marginTop:10, fontSize:12}}>
                          <ReactMarkdown>Whether you're launching a local product or expanding across markets, we provide the tools, talent, and support to drive real results.</ReactMarkdown>
                    </Typography>
                  </Grid>
                  <Grid item  style={{width: "30%", height: "10%",marginLeft:"10%", marginBottom:0}}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        justifyContent="center" 
                        className={classes.buttonMobile}
                        component={Link}
                        to="/influencercentral/"
                    
                    >
                        Get Influencers!
                    </Button>
                  </Grid>
                
               
              </Grid>
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
