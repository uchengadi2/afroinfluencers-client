import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import useToken from "../../custom-hooks/useToken";
import useUserId from "../../custom-hooks/useUserId";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

import CategoryIcon from "@mui/icons-material/Category";

import BarChartIcon from "@mui/icons-material/BarChart";

import InterestsIcon from "@mui/icons-material/Interests";

import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";

import ReviewsIcon from "@mui/icons-material/Reviews";
import history from "../../history";

// import Remediation from "./products/Remediation";
import Customers from "./customers/Customers";
import Reviews from "./customers/Reviews";

import Brands from "./products/Brands";
import Projects from "./products/Brand/Projects";
import AddBrandForm from "./products/AddBrandForm";
import api from "./../../apis/local";
import ProjectInProgress from "./products/Brand/ProjectInProgress";
import ProjectsInReview from "./products/Brand/ProjectsInReview";
import ProjectCompleted from "./products/Brand/ProjectCompleted";
import Orders from "./products/Brand/Orders";

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

function DashboardBrand(props) {
  const classes = useStyles();
  const [slug, setSlug] = useState();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const [yourName, setYourName] = useState('');
  const [yourCountry, setYourCountry] = useState();
  const [hasInfo,setHasInfo] = useState(false);
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [brandId, setBrandId] = useState();
  const [description, setDescription] = useState();
  const [brandContactPhoneNumber, setBrandContactPhoneNumber] = useState();
  const [brandContactEmailAddress, setBrandContactEmailAddress] = useState();
  const [platformRate, setPlatformRate] = useState();
  const [minimumPlatformCharge, setMinimumPlatformCharge] = useState();
  const [vat, setVat] = useState();
  const [policyId, setPolicyId] = useState();
  const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState();
  const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState();
  const params = useParams();
 
  const theme = useTheme();
   const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
   const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
   const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
   const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));
  const [alert, setAlert] = useState({
        open: false,
        message: "",
        backgroundColor: "",
      })

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
          const response = await api.get(`/brands`,{params:{
            user:userId
          }});
          const workingData = response.data.data.data;
              
         
         if(workingData.length > 0){
          setHasInfo(true);
          setYourName(workingData[0].name);
          setYourCountry(workingData[0].country[0].id);         
          setBrandId(workingData[0].id);
          setDescription(workingData[0].description);
          setBrandContactPhoneNumber(workingData[0].brandContactPhoneNumber)
          setBrandContactEmailAddress(workingData[0].brandContactEmailAddress)
          
          }else{
          setHasInfo(false);
         }
          
        };
    
        //call the function
    
        fetchData().catch(console.error);
      }, [token, userId, updatePage]);
  
   
      const renderUpdatePage = () => {
        setUpdatePage((prevState) => !prevState);
      };


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
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: matchesMDUp ? 80: 30  }}>
      {matchesMDUp ? <Grid container spacing={2}>
        <Grid item xs={2.5} className={classes.menu}>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList className={classes.menu}>
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Brand Information
              </Typography>
              <MenuItem
                className={slug === "my-brand-information" ? classes.selected : null}
                selected={slug === "my-brand-information" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/brands/${props.userId}/my-brand-information`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Brand</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Projects
              </Typography>
              <MenuItem
                className={slug === "new-projects" ? classes.selected : null}
                selected={slug === "new-projects" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/brands/${props.userId}/new-projects`);
                }}
              >
                <ListItemIcon>
                  <InterestsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Projects</ListItemText>
              </MenuItem>
              
             

              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Transactions
              </Typography>
             

              <MenuItem
                className={
                  slug === "dashboard-orderslist" ? classes.selected : null
                }
                selected={slug === "dashboard-orderslist" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/brands/${props.userId}/dashboard-orderslist`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Orders</ListItemText>
              </MenuItem>
              
             

              <Divider />
              
              
              <Divider />
             
            </MenuList>
          </Paper>
        </Grid>
        {slug === "my-brand-information" && (
          <Grid item xs={9.5}>
            <AddBrandForm 
            handleFailedSnackbar={handleFailedSnackbar} 
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar} 
            handleSuccessfulEditSnackbar={handleSuccessfulEditSnackbar}
            renderUpdatePage={renderUpdatePage}
            token={token}
            userId={userId}
            hasInfo={hasInfo}
            yourName={yourName} 
            yourCountry={yourCountry}           
            image={image}           
            brandId={brandId}
            description={description}
            brandContactPhoneNumber={brandContactPhoneNumber}
            brandContactEmailAddress={brandContactEmailAddress}
            platformRate={platformRate}
            minimumPlatformCharge={minimumPlatformCharge}
            vat={vat}
            policyId ={policyId}
            platformRateIsIncludedAsPartOfUserInputedAmount={platformRateIsIncludedAsPartOfUserInputedAmount}
            vatIsIncludedAsPartOfUserInputedAmount={vatIsIncludedAsPartOfUserInputedAmount}
            />
          </Grid>
        )}
        {slug === "new-projects" && (
          <Grid item xs={9.5}>
            <Projects />
          </Grid>
        )}
        {slug === "projects-in-progress" && (
          <Grid item xs={9.5}>
            <ProjectInProgress />
          </Grid>
        )}
        {slug === "projects-in-review" && (
          <Grid item xs={9.5}>
            <ProjectsInReview />
          </Grid>
        )}
         
         {slug === "dashboard-orderslist" && (
          <Grid item xs={9.5}>
            <Orders brandId={brandId} token={token}  userId={userId}/>
          </Grid>
        )}
        
        {slug === "reviews" && (
          <Grid item xs={9.5}>
            <Reviews />
          </Grid>
        )}
      
      </Grid> : 
      <Grid container spacing={2}>

      <Grid item xs={4.5} className={classes.menu}>
          <Paper sx={{ width: 140, maxWidth: "100%" }}>
            <MenuList className={classes.menu}>
              <Typography style={{ marginLeft: 10, fontWeight: "Bold",fontSize:14 }}>
                Brand Information
              </Typography>
              <MenuItem
                className={slug === "my-brand-information" ? classes.selected : null}
                selected={slug === "my-brand-information" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/brands/${props.userId}/my-brand-information`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>Brand</span></ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold",fontSize:14 }}>
                Projects
              </Typography>
              <MenuItem
                className={slug === "new-projects" ? classes.selected : null}
                selected={slug === "new-projects" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/brands/${props.userId}/new-projects`);
                }}
              >
                <ListItemIcon>
                  <InterestsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>Projects</span></ListItemText>
              </MenuItem>
              
             

              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold",fontSize:14 }}>
                Transactions
              </Typography>
             

              <MenuItem
                className={
                  slug === "dashboard-orderslist" ? classes.selected : null
                }
                selected={slug === "dashboard-orderslist" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/brands/${props.userId}/dashboard-orderslist`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText><span style={{fontSize:11, marginLeft:"-15px"}}>Orders</span></ListItemText>
              </MenuItem>
              
             

              <Divider />
              
              
              <Divider />
             
            </MenuList>
          </Paper>
        </Grid>
        {slug === "my-brand-information" && (
          <Grid item xs={7.5}>
            <AddBrandForm 
            handleFailedSnackbar={handleFailedSnackbar} 
            handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar} 
            handleSuccessfulEditSnackbar={handleSuccessfulEditSnackbar}
            renderUpdatePage={renderUpdatePage}
            token={token}
            userId={userId}
            hasInfo={hasInfo}
            yourName={yourName} 
            yourCountry={yourCountry}           
            image={image}           
            brandId={brandId}
            description={description}
            brandContactPhoneNumber={brandContactPhoneNumber}
            brandContactEmailAddress={brandContactEmailAddress}
            platformRate={platformRate}
            minimumPlatformCharge={minimumPlatformCharge}
            vat={vat}
            policyId ={policyId}
            platformRateIsIncludedAsPartOfUserInputedAmount={platformRateIsIncludedAsPartOfUserInputedAmount}
            vatIsIncludedAsPartOfUserInputedAmount={vatIsIncludedAsPartOfUserInputedAmount}
            />
          </Grid>
        )}
        {slug === "new-projects" && (
          <Grid item xs={7.5}>
            <Projects />
          </Grid>
        )}
        {slug === "projects-in-progress" && (
          <Grid item xs={7.5}>
            <ProjectInProgress />
          </Grid>
        )}
        {slug === "projects-in-review" && (
          <Grid item xs={7.5}>
            <ProjectsInReview />
          </Grid>
        )}
         
         {slug === "dashboard-orderslist" && (
          <Grid item xs={7.5}>
            <Orders brandId={brandId} token={token}  userId={userId}/>
          </Grid>
        )}
        
        {slug === "reviews" && (
          <Grid item xs={7.5}>
            <Reviews />
          </Grid>
        )}




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

export default DashboardBrand;
