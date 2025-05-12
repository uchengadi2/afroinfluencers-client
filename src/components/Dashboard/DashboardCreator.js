import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import useToken from "../../custom-hooks/useToken";
import useUserId from "../../custom-hooks/useUserId";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import CategoryIcon from "@mui/icons-material/Category";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InterestsIcon from "@mui/icons-material/Interests";
import PaymentsIcon from "@mui/icons-material/Payments";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ReviewsIcon from "@mui/icons-material/Reviews";

import history from "../../history";

import Orders from "./ecommerce/Orders";
import OrderList from "./ecommerce/OrderList";
import Payments from "./ecommerce/Payment";

import CourseAssessors from "./products/CourseAssessors";

import Creators from "./products/Creators";
import Brands from "./products/Brands";
import AddCreatorForm from "./products/AddCreatorForm";
import api from "./../../apis/local";

import PendingOrders from "./products/Creators/PendingOrders";
import OrdersInReview from "./products/Creators/OrdersInReview";
import OrderCompleted from "./products/Creators/OrderCompleted";
import Samples from "./products/Creators/Samples";
import { Container } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  menu: {
    backgroundColor: "#AEC3AE",
  },
  selected: {
    backgroundColor: "turquoise !important",
    color: "white !important",
    fontWeight: "bold !important",
  },
}));

function DashboardCreator(props) {
  const classes = useStyles();
  const [slug, setSlug] = useState();
    const { token, setToken } = useToken();
    const { userId, setUserId } = useUserId();
    const [creator,setCreator] = useState();
    const [hasInfo,setHasInfo] = useState(false);
    const [yourName, setYourName] = useState('');
    const [yourAge, setYourAge] = useState('');
    const [yourCountry, setYourCountry] = useState();
    const [yourGender, SetYourGender] = useState();
    const [videoPrice, setVideoPrice] = useState();
    const [videoHookPrice, setVideoHookPrice] = useState();
    const [videoDeliveryDays, setVideoDeliveryDays] = useState();
    const [soundPrice, setSoundPrice] = useState();
    const [soundHookPrice, setSoundHookPrice] = useState();
    const [soundDeliveryDays, setSoundDeliveryDays] = useState();
    const [niches, setNiches] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [category, setCategory] = useState();
    const [image, setImage] = useState([]);
    const [currency, setCurrency] = useState();
    const [updatePage, setUpdatePage] = useState(false);
    const [creatorId, setCreatorId] = useState();
    const [bio, setBio] = useState();
    const [bankDetails, setBankDetails] = useState();
    const [creatorContactPhoneNumber, setCreatorContactPhoneNumber] = useState();
    const [creatorContactEmailAddress, setCreatorContactEmailAddress] = useState();
    const [platformRate, setPlatformRate] = useState();
     const [minimumPlatformCharge, setMinimumPlatformCharge] = useState();
     const [vat, setVat] = useState();
     const [policyId, setPolicyId] = useState();
     const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState();
     const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState();
    
   const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));


     const [loading, setLoading] = useState(false);
  const params = useParams();

    const [alert, setAlert] = useState({
      open: false,
      message: "",
      backgroundColor: "",
    });

    const currentUser = params.userId;

    //const user=userId

        

  useEffect(() => {
    setLoading(true);
    setSlug(params.slug);
    setLoading(false);
  }, [params]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);


  useEffect(() => {
      const fetchData = async () => {
        let allData = {};
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.get(`/creators`,{params:{
          user:currentUser
        }});
        const workingData = response.data.data.data;
                   
  
       
       if(workingData.length > 0){
        setHasInfo(true);
        setYourName(workingData[0].name);
        setYourAge(workingData[0].age)
        SetYourGender(workingData[0].gender);
        setYourCountry(workingData[0].country[0].id);
        setVideoPrice(workingData[0].videoPrice);
        setVideoHookPrice(workingData[0].videoHookPrice);
        setVideoDeliveryDays(workingData[0].videoDeliveryDays);
        setNiches(workingData[0].niches);
        setLanguages(workingData[0].languages);
        setImage(workingData[0].image);
        setCurrency(workingData[0].currency);
        setCategory(workingData[0].category[0].id)
        setCreatorId(workingData[0].id);
        setBio(workingData[0].bio);
        setSoundPrice(workingData[0].soundPrice)
        setSoundHookPrice(workingData[0].soundHookPrice)
        setSoundDeliveryDays(workingData[0].soundDeliveryDays)
        setCreatorContactPhoneNumber(workingData[0].creatorContactPhoneNumber);
        setCreatorContactEmailAddress(workingData[0].creatorContactEmailAddress);
        setBankDetails(workingData[0].bankDetails)
        
        }else{
        setHasInfo(false);
       }
        
      };
  
      //call the function
  
      fetchData().catch(console.error);
    }, [token, userId, updatePage]);


     useEffect(() => {
              const fetchData = async () => {
                let allData = {};
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const response = await api.get(`/policies`);
                const workingData = response.data.data.data;
                    
               
               if(workingData.length > 0){
                
                setHasInfo(true);
                setPlatformRate(workingData[0].platformRate);
                setMinimumPlatformCharge(workingData[0].minimumPlatformCharge);
                setVat(workingData[0].vat);
                setPlatformRateIsIncludedAsPartOfUserInputedAmount(workingData[0].platformRateIsIncludedAsPartOfUserInputedAmount);
                setVatIsIncludedAsPartOfUserInputedAmount(workingData[0].vatIsIncludedAsPartOfUserInputedAmount);
                setPolicyId(workingData[0]._id);
    
                
                }else{
                setHasInfo(false);
               }
                
              };
          
              //call the function
          
              fetchData().catch(console.error);
            }, [updatePage,slug]);

 
    const renderUpdatePage = () => {
      setUpdatePage((prevState) => !prevState);
    };

  const handleSuccessfulCreateSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };
  const handleSuccessfulEditSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleSuccessfulDeletedItemSnackbar = (message) => {
    //setBecomePartnerOpen(false);
    setAlert({
      open: true,
      message: message,
      //backgroundColor: "#4BB543",
      backgroundColor: "#FF731D",
    });
  };

  const handleFailedSnackbar = (message) => {
    setAlert({
      open: true,
      message: message,
      backgroundColor: "#FF3232",
    });
    //setBecomePartnerOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop:matchesMDUp ? 80: 30 }}>
      {matchesMDUp ? <Grid container spacing={2}>
        <Grid item xs={2.5} className={classes.menu}>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList className={classes.menu}>
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Creator Information & Work Samples
              </Typography>
              <MenuItem
                className={slug === "creator-information" ? classes.selected : null}
                selected={slug === "creator-information" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/creator-information`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Creator Details</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "creator-work-samples" ? classes.selected : null}
                selected={slug === "creator-work-samples" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/creator-work-samples`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>My Work Samples</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
               Orders
              </Typography>
              <MenuItem
                className={slug === "pending-orders" ? classes.selected : null}
                selected={slug === "pending-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/pending-orders`);
                }}
              >
                <ListItemIcon>
                  <InterestsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Pending Orders</ListItemText>
              </MenuItem>
              
              <MenuItem
                className={slug === "completed-orders" ? classes.selected : null}
                selected={slug === "completed-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/completed-orders`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Completed Orders</ListItemText>
              </MenuItem>
              

              <Divider />
             
              <Divider />
              
            </MenuList>
          </Paper>
        </Grid>
        {slug === "creator-information" && (
          <Grid item xs={9.5}>
            <AddCreatorForm 
             handleFailedSnackbar={handleFailedSnackbar} 
             handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar} 
             handleSuccessfulEditSnackbar={handleSuccessfulEditSnackbar}
             renderUpdatePage={renderUpdatePage}
             token={token}
             userId={userId}
             hasInfo={hasInfo}
             yourName={yourName}
             yourAge={yourAge}
             yourGender={yourGender}
             yourCountry={yourCountry}
             category={category}
             videoPrice={videoPrice}
             videoHookPrice={videoHookPrice}
             videoDeliveryDays={videoDeliveryDays}
             niches={niches}
             languages={languages}
             image={image}
             soundPrice={soundPrice}
             soundHookPrice={soundHookPrice}
             soundDeliveryDays={soundDeliveryDays}
            currency={currency}
            creatorId={creatorId}
            bio={bio}
            creatorContactEmailAddress={creatorContactEmailAddress}
            creatorContactPhoneNumber={creatorContactPhoneNumber}
            bankDetails={bankDetails}
            platformRate={platformRate}
            minimumPlatformCharge={minimumPlatformCharge}
            vat={vat}
            policyId ={policyId}
            platformRateIsIncludedAsPartOfUserInputedAmount={platformRateIsIncludedAsPartOfUserInputedAmount}
            vatIsIncludedAsPartOfUserInputedAmount={vatIsIncludedAsPartOfUserInputedAmount}
             />
          </Grid>
        )}
        {slug === "creator-work-samples" && (
          <Grid item xs={9.5}>
            <Samples   token={token} userId={userId} creatorId={creatorId}/>
          </Grid>
        )}
        {slug === "pending-orders" && (
          <Grid item xs={9.5}>
            <PendingOrders  creatorId={creatorId} token={token}  userId={userId}/>
          </Grid>
        )}
         {slug === "orders-in-review" && (
          <Grid item xs={9.5}>
            <OrdersInReview creatorId={creatorId} token={token}  userId={userId}/>
          </Grid>
        )}
      
        {slug === "completed-orders" && (
          <Grid item xs={9.5}>
            <OrderCompleted creatorId={creatorId} token={token}  userId={userId}/>
          </Grid>
        )}
        {slug === "outstanding-payments" && (
          <Grid item xs={9.5}>
            <OrderList />
          </Grid>
        )}
        {slug === "completed-payments" && (
          <Grid item xs={9.5}>
            <Creators />
          </Grid>
        )}
        {slug === "disputed-payments" && (
          <Grid item xs={9.5}>
            <CourseAssessors />
          </Grid>
        )}
        {slug === "creator-reviews" && (
          <Grid item xs={9.5}>
            <Creators />
          </Grid>
        )}
       
      </Grid> : 
    
        <Grid container spacing={2}>
             <Grid item xs={4.5} className={classes.menu}>
          <Paper sx={{ width: 140, maxWidth: "100%" }}>
            <MenuList className={classes.menu}>
              <Typography style={{ marginLeft: 10, fontWeight: "Bold", fontSize:14 }}>
                Creator Information & Work Samples
              </Typography>
              <MenuItem
                className={slug === "creator-information" ? classes.selected : null}
                selected={slug === "creator-information" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/creator-information`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>Creator Details</span></ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "creator-work-samples" ? classes.selected : null}
                selected={slug === "creator-work-samples" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/creator-work-samples`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>My Samples</span></ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold", fontSize:14 }}>
               Orders
              </Typography>
              <MenuItem
                className={slug === "pending-orders" ? classes.selected : null}
                selected={slug === "pending-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/pending-orders`);
                }}
              >
                <ListItemIcon>
                  <InterestsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>Pending Orders</span></ListItemText>
              </MenuItem>
              
              <MenuItem
                className={slug === "completed-orders" ? classes.selected : null}
                selected={slug === "completed-orders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/creators/${props.userId}/completed-orders`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>Completed Orders</span></ListItemText>
              </MenuItem>
              

              <Divider />
             
              <Divider />
              
            </MenuList>
          </Paper>
        </Grid>
        {/* <Container style={{width:200}}> */}
        {slug === "creator-information" && (
          <Grid item xs={7.5}>
            <AddCreatorForm 
             handleFailedSnackbar={handleFailedSnackbar} 
             handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar} 
             handleSuccessfulEditSnackbar={handleSuccessfulEditSnackbar}
             renderUpdatePage={renderUpdatePage}
             token={token}
             userId={userId}
             hasInfo={hasInfo}
             yourName={yourName}
             yourAge={yourAge}
             yourGender={yourGender}
             yourCountry={yourCountry}
             category={category}
             videoPrice={videoPrice}
             videoHookPrice={videoHookPrice}
             videoDeliveryDays={videoDeliveryDays}
             niches={niches}
             languages={languages}
             image={image}
             soundPrice={soundPrice}
             soundHookPrice={soundHookPrice}
             soundDeliveryDays={soundDeliveryDays}
            currency={currency}
            creatorId={creatorId}
            bio={bio}
            creatorContactEmailAddress={creatorContactEmailAddress}
            creatorContactPhoneNumber={creatorContactPhoneNumber}
            bankDetails={bankDetails}
            platformRate={platformRate}
            minimumPlatformCharge={minimumPlatformCharge}
            vat={vat}
            policyId ={policyId}
            platformRateIsIncludedAsPartOfUserInputedAmount={platformRateIsIncludedAsPartOfUserInputedAmount}
            vatIsIncludedAsPartOfUserInputedAmount={vatIsIncludedAsPartOfUserInputedAmount}
             />
          </Grid>
        )}
        {slug === "creator-work-samples" && (
          <Grid item xs={7.5}>
            <Samples   token={token} userId={userId} creatorId={creatorId}/>
          </Grid>
        )}
        {slug === "pending-orders" && (
          <Grid item xs={7.5}>
            <PendingOrders  creatorId={creatorId} token={token}  userId={userId}/>
          </Grid>
        )}
         {slug === "orders-in-review" && (
          <Grid item xs={7.5}>
            <OrdersInReview creatorId={creatorId} token={token}  userId={userId}/>
          </Grid>
        )}
      
        {slug === "completed-orders" && (
          <Grid item xs={7.5}>
            <OrderCompleted creatorId={creatorId} token={token}  userId={userId}/>
          </Grid>
        )}
        {slug === "outstanding-payments" && (
          <Grid item xs={7.5}>
            <OrderList />
          </Grid>
        )}
        {slug === "completed-payments" && (
          <Grid item xs={7.5}>
            <Creators />
          </Grid>
        )}
        {slug === "disputed-payments" && (
          <Grid item xs={7.5}>
            <CourseAssessors />
          </Grid>
        )}
        {slug === "creator-reviews" && (
          <Grid item xs={7.5}>
            <Creators />
          </Grid>
        )}
        {/* </Container> */}

        </Grid>
      
      
      }
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
    </Box>
  );
}

export default DashboardCreator;
