import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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

import AnalyticsIcon from "@mui/icons-material/Analytics";
import SettingsIcon from "@mui/icons-material/Settings";
import PolicyIcon from "@mui/icons-material/Policy";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import HailIcon from "@mui/icons-material/Hail";
import CollectionsIcon from "@mui/icons-material/Collections";
import BarChartIcon from "@mui/icons-material/BarChart";
import DiscountIcon from "@mui/icons-material/Discount";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import InterestsIcon from "@mui/icons-material/Interests";
import ReorderIcon from "@mui/icons-material/Reorder";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LuggageIcon from "@mui/icons-material/Luggage";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReportIcon from "@mui/icons-material/Report";
import Groups2Icon from "@mui/icons-material/Groups2";
import ReviewsIcon from "@mui/icons-material/Reviews";
import FlagIcon from "@mui/icons-material/Flag";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PlaceIcon from "@mui/icons-material/Place";
import RedeemIcon from "@mui/icons-material/Redeem";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SellIcon from "@mui/icons-material/Sell";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CommuteIcon from "@mui/icons-material/Commute";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddTaskIcon from "@mui/icons-material/AddTask";
import MainDashboard from "./MainDashboard";
import history from "../../history";
import Products from "./products/Products";
import Categories from "./products/Categories";
import Collections from "./products/Collections";
import Channels from "./products/Channels";
import Programmes from "./products/Programmes";
import Discount from "./products/Discount";
// import Inventories from "./products/Inventories";
import PurchaseOrders from "./products/PurchaseOrders";
import Transfers from "./products/Transfers";
import Orders from "./ecommerce/Orders";
import OrderList from "./ecommerce/OrderList";
import Payments from "./ecommerce/Payment";
// import Delivery from "./ecommerce/Delivery";
// import Packaging from "./ecommerce/Packaging";
import Returns from "./ecommerce/Returns";
import Subscription from "./ecommerce/Subscription";
import Bidding from "./ecommerce/Bidding";
import Quotations from "./ecommerce/Quotations";
import DirectOrders from "./direct/Orders";
import DirectPayments from "./direct/Payment";
import DirectReturns from "./direct/Returns";
import DirectInvoicing from "./direct/Invoicing";
import Analytics from "./analytics/Analytics";
import Reports from "./reports/Reports";
// import Remediation from "./products/Remediation";
import Customers from "./customers/Customers";
import Reviews from "./customers/Reviews";
import Countries from "./utilities/Countries";
import States from "./utilities/States";
import Cities from "./utilities/Cities";
import Currencies from "./utilities/Currencies";
import Locations from "./utilities/Locations";
import Suppliers from "./utilities/Suppliers";
// import Carriers from "./utilities/Carriers";
import Policy from "./settings/Policy";
import CurrencyExchange from "./settings/CurrencyExchange";
import Notifications from "./settings/Notifications";

import CourseInstructors from "./products/CourseInstructors";
import CourseAssessors from "./products/CourseAssessors";
import CourseMentors from "./products/CourseMentors";
import CourseLessons from "./products/CourseLessons";
import CourseTopics from "./products/CourseTopics";
import Niches from "./utilities/Niches";
import { Language } from "@material-ui/icons";
import Languages from "./utilities/Languages";
import Creators from "./products/Creators";
import Brands from "./products/Brands";
import CompletedOrders from "./ecommerce/CompletedOrders";
import PendingPaymentOrders from "./ecommerce/PendingPaymentOrders";
import api from "./../../apis/local";
import PaymentInDispute from "./ecommerce/PaymentInDispute";
import Samples from "./products/Creators/Samples";
import CreatorSamples from "./products/CreatorSamples";
import CreatorApprovedSamples from "./products/CreatorApprovedSamples";


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

function Dashboard(props) {
  const classes = useStyles();
  const { token, setToken } = useToken();
   const { userId, setUserId } = useUserId();
  const [slug, setSlug] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [hasInfo,setHasInfo] = useState(false);
  const [policy, setPolicy] = useState([]);
  const [platformRate, setPlatformRate] = useState();
  const [updatePage, setUpdatePage] = useState(false);
  const [minimumPlatformCharge, setMinimumPlatformCharge] = useState();
  const [vat, setVat] = useState();
  const [policyId, setPolicyId] = useState();
  const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState();
  const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState();
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
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: 80 }}>
      <Grid container spacing={2}>
        <Grid item xs={2.5} className={classes.menu}>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList className={classes.menu}>
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Dashboard & Performance
              </Typography>
              <MenuItem
                className={slug === "maindashboard" ? classes.selected : null}
                selected={slug === "maindashboard" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/maindashboard`);
                }}
              >
                <ListItemIcon>
                  <BarChartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Creators & Brands
              </Typography>
              <MenuItem
                className={slug === "categories" ? classes.selected : null}
                selected={slug === "categories" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/categories`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Categories</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "creators" ? classes.selected : null}
                selected={slug === "creators" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/creators`);
                }}
              >
                <ListItemIcon>
                  <InterestsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Creators</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "creator-unapproved-samples" ? classes.selected : null}
                selected={slug === "creator-unapproved-samples" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/creator-unapproved-samples`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Creator Unapproved Samples</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "creator-approved-samples" ? classes.selected : null}
                selected={slug === "creator-approved-samples" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/creator-approved-samples`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Creator Approved Samples</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "brands" ? classes.selected : null}
                selected={slug === "brands" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/brands`);
                }}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Brands</ListItemText>
              </MenuItem>
            
             

              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Transactions
              </Typography>
              <MenuItem
                className={
                  slug === "dashboard-transactions" ? classes.selected : null
                }
                selected={slug === "dashboard-transactions" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/dashboard-transactions`);
                }}
              >
                <ListItemIcon>
                  <ShoppingBasketIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Transactions</ListItemText>
              </MenuItem>

              <MenuItem
                className={
                  slug === "dashboard-orderslist" ? classes.selected : null
                }
                selected={slug === "dashboard-orderslist" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/dashboard-orderslist`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Pending Orders</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "dashboard-orderscompleted" ? classes.selected : null
                }
                selected={slug === "dashboard-orderscompleted" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/dashboard-orderscompleted`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Completed Orders</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "dashboard-pendingpaymentorders" ? classes.selected : null
                }
                selected={slug === "dashboard-pendingpaymentorders" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/dashboard-pendingpaymentorders`);
                }}
              >
                <ListItemIcon>
                  <AssignmentReturnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Pending Payment Orders</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Payments
              </Typography>
              <MenuItem
                className={
                  slug === "dashboard-payment" ? classes.selected : null
                }
                selected={slug === "dashboard-payment" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/dashboard-payment`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Payments</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "dashboard-disputed-payment" ? classes.selected : null
                }
                selected={slug === "dashboard-disputed-payment" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/dashboard-disputed-payment`);
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Payments in Dispute</ListItemText>
              </MenuItem>
             
             

              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Analytics & Reports
              </Typography>
              <MenuItem
                className={slug === "analytics" ? classes.selected : null}
                selected={slug === "analytics" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/analytics`);
                }}
              >
                <ListItemIcon>
                  <AnalyticsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Analytics</ListItemText>
              </MenuItem>
              <MenuItem
                className={slug === "reports" ? classes.selected : null}
                selected={slug === "reports" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/reports`);
                }}
              >
                <ListItemIcon>
                  <ReportIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Reports</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Reviews
              </Typography>
             
              <MenuItem
                className={slug === "reviews" ? classes.selected : null}
                selected={slug === "reviews" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/reviews`);
                }}
              >
                <ListItemIcon>
                  <ReviewsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Reviews</ListItemText>
              </MenuItem>
              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Utilities
              </Typography>
              <MenuItem
                className={
                  slug === "utilities-countries" ? classes.selected : null
                }
                selected={slug === "utilities-countries" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-countries`);
                }}
              >
                <ListItemIcon>
                  <FlagIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Countries</ListItemText>
              </MenuItem>
              
              <MenuItem
                className={
                  slug === "utilities-languages" ? classes.selected : null
                }
                selected={slug === "utilities-languages" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-languages`);
                }}
              >
                <ListItemIcon>
                  <StorefrontIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Languages</ListItemText>
              </MenuItem>
              <MenuItem
                className={
                  slug === "utilities-niches" ? classes.selected : null
                }
                selected={slug === "utilities-niches" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-niches`);
                }}
              >
                <ListItemIcon>
                  <StorefrontIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Niches</ListItemText>
              </MenuItem>
             
              <MenuItem
                className={
                  slug === "utilities-currencies" ? classes.selected : null
                }
                selected={slug === "utilities-currencies" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/utilities-currencies`);
                }}
              >
                <ListItemIcon>
                  <AttachMoneyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Currencies</ListItemText>
              </MenuItem>
             

              <Divider />
              <Typography style={{ marginLeft: 10, fontWeight: "Bold" }}>
                Settings
              </Typography>

              <MenuItem
                className={slug === "settings-policy" ? classes.selected : null}
                selected={slug === "settings-policy" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/settings-policy`);
                }}
              >
                <ListItemIcon>
                  <PolicyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Policy</ListItemText>
              </MenuItem>
             
              <MenuItem
                className={
                  slug === "settings-notifications" ? classes.selected : null
                }
                selected={slug === "settings-notifications" ? true : false}
                onClick={(event) => {
                  event.preventDefault();
                  history.push(`/dashboard/settings-notifications`);
                }}
              >
                <ListItemIcon>
                  <NotificationsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Notifications</ListItemText>
              </MenuItem>
              
            </MenuList>
          </Paper>
        </Grid>
        {slug === "maindashboard" && (
          <Grid item xs={9.5}>
            <MainDashboard />
          </Grid>
        )}
        {slug === "creators" && (
          <Grid item xs={9.5}>
            <Creators />
          </Grid>
        )}
        {slug === "brands" && (
          <Grid item xs={9.5}>
            <Brands />
          </Grid>
        )}
        {slug === "categories" && (
          <Grid item xs={9.5}>
            <Categories />
          </Grid>
        )}
      
        {slug === "dashboard-transactions" && (
          <Grid item xs={9.5}>
            <Orders />
          </Grid>
        )}
        {slug === "dashboard-orderslist" && (
          <Grid item xs={9.5}>
            <OrderList />
          </Grid>
        )}
        {slug === "dashboard-orderscompleted" && (
          <Grid item xs={9.5}>
            <CompletedOrders />
          </Grid>
        )}
        {slug === "dashboard-pendingpaymentorders" && (
          <Grid item xs={9.5}>
            <PendingPaymentOrders />
          </Grid>
        )}




        {slug === "dashboard-payment" && (
          <Grid item xs={9.5}>
            <Payments />
          </Grid>
        )}
         {slug === "dashboard-disputed-payment" && (
          <Grid item xs={9.5}>
            <PaymentInDispute />
          </Grid>
        )}


        {slug === "creator-unapproved-samples" && (
          <Grid item xs={9.5}>
            <CreatorSamples />
          </Grid>
        )}
        {slug === "creator-approved-samples" && (
          <Grid item xs={9.5}>
            <CreatorApprovedSamples />
          </Grid>
        )}
        {slug === "coursementors" && (
          <Grid item xs={9.5}>
            <CourseMentors />
          </Grid>
        )}
        {slug === "courseinstructors" && (
          <Grid item xs={9.5}>
            <CourseInstructors />
          </Grid>
        )}
        {slug === "courselessons" && (
          <Grid item xs={9.5}>
            <CourseLessons />
          </Grid>
        )}
        {slug === "coursetopics" && (
          <Grid item xs={9.5}>
            <CourseTopics />
          </Grid>
        )}
        {slug === "dashboard-quotations" && (
          <Grid item xs={9.5}>
            <Quotations />
          </Grid>
        )}
        {slug === "direct-orders" && (
          <Grid item xs={9.5}>
            <DirectOrders />
          </Grid>
        )}
        {slug === "direct-payments" && (
          <Grid item xs={9.5}>
            <DirectPayments />
          </Grid>
        )}
        {slug === "direct-returns" && (
          <Grid item xs={9.5}>
            <DirectReturns />
          </Grid>
        )}
        {slug === "direct-invoicing" && (
          <Grid item xs={9.5}>
            <DirectInvoicing />
          </Grid>
        )}
        {slug === "analytics" && (
          <Grid item xs={9.5}>
            <Analytics />
          </Grid>
        )}
        {slug === "reports" && (
          <Grid item xs={9.5}>
            <Reports />
          </Grid>
        )}
        {slug === "customers" && (
          <Grid item xs={9.5}>
            <Customers />
          </Grid>
        )}
        {slug === "reviews" && (
          <Grid item xs={9.5}>
            <Reviews />
          </Grid>
        )}
        {slug === "utilities-countries" && (
          <Grid item xs={9.5}>
            <Countries />
          </Grid>
        )}
        {slug === "utilities-states" && (
          <Grid item xs={9.5}>
            <States />
          </Grid>
        )}
        {slug === "utilities-cities" && (
          <Grid item xs={9.5}>
            <Cities />
          </Grid>
        )}
        {slug === "utilities-languages" && (
          <Grid item xs={9.5}>
            <Languages />
          </Grid>
        )}
         {slug === "utilities-niches" && (
          <Grid item xs={9.5}>
            <Niches />
          </Grid>
        )}
         {slug === "utilities-projects" && (
          <Grid item xs={9.5}>
            <Categories />
          </Grid>
        )}
        {slug === "utilities-currencies" && (
          <Grid item xs={9.5}>
            <Currencies />
          </Grid>
        )}
       
        {slug === "settings-policy" && (
          <Grid item xs={9.5}>
            <Policy 
            id={policyId}          
            userId={userId}
            token={token}
            platformRate={platformRate}
            minimumPlatformCharge={minimumPlatformCharge}
            vat={vat}
            platformRateIsIncludedAsPartOfUserInputedAmount={platformRateIsIncludedAsPartOfUserInputedAmount}
            vatIsIncludedAsPartOfUserInputedAmount={vatIsIncludedAsPartOfUserInputedAmount}
            renderUpdatePage={renderUpdatePage}
            hasInfo={hasInfo}
             handleSuccessfulCreateSnackbar={handleSuccessfulCreateSnackbar}
              handleSuccessfulEditSnackbar={handleSuccessfulEditSnackbar}
              handleFailedSnackbar={handleFailedSnackbar}
            />
          </Grid>
        )}
        {/* {slug === "settings-shipping-rates" && (
          <Grid item xs={9.5}>
            <ShippingRates />
          </Grid>
        )} */}
        {slug === "settings-notifications" && (
          <Grid item xs={9.5}>
            <Notifications />
          </Grid>
        )}
        
      </Grid>
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

export default Dashboard;
