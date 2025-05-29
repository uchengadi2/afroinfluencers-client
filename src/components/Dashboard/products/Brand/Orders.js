import React, { useEffect, useState } from "react";
import useToken from "../../../../custom-hooks/useToken";
import useUserId from "../../../../custom-hooks/useUserId";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Stack from "@mui/material/Stack";
import Snackbar from "@material-ui/core/Snackbar";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../../apis/local";
import AddCategoryForm from "./../AddCategoryForm";
import CategoryEditForm from "./../CategoryEditForm";
import CategoryDelete from "./../CategoryDelete";
import AddNewProjectForm from "./../Brand/AddNewProjectForm";
import EditProjectForm from "./../Brand/EditProjectForm";
//import AddVideoAndHooksForm from "./AddVideoAndHooksForm";
import ViewOrderDetails from "./ViewOrderDetails";
import GetCreatorDetails from "./GetCreatorDetails";
import MarkOrderAsCompleted from "./MarkOrderAsCompleted";
//import GetProjectBrief from "./GetProjectBrief";
//import ProjectDeleteForm from "./ProjectDeleteForm";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Orders(props) {
 const classes = useStyles();
  const theme = useTheme();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [projectsList, setProjectList] = useState([]);
  const [ordersList, setOrdersList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
   const [rowSelected, setRowSelected] = useState(false);
  const [updateProjectCounter, setUpdateProjectCounter] = useState(false);
  const [updateEdittedProjectCounter, setUpdateEdittedProjectCounter] =
    useState(false);
  const [updateDeletedProjectCounter, setUpdateDeletedProjectCounter] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [brandId, setBrandId] = useState();
  const [creatorName, setCreatorName] = useState();
  const [creatorId,setCreatorId] = useState();
  const [creatorCountry, setCreatorCountry] =useState();
  const [creatorPhoneNumber, setCreatorPhoneNumber] = useState();
  const [creatorEmail, setCreatorEmail] = useState();
  const [creatorGender, setCreatorGender] = useState();
  const [projectName, setProjectName] = useState();
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      if(props.brandId){
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orders`, {params:{brand:props.brandId, status:'creative-pending'}});
      const workingData = response.data.data.data;
      
           
      if(workingData.length>=1){
        workingData.map((order) => {
          allData.push({
            id: order._id,
            orderNumber: order.orderNumber,
            transactionId:order.transactionId,
            creator: order.creator,           
            currency:order.currency,
            recipientName:order.recipientName,
            recipientPhoneNumber:order.recipientPhoneNumber,
            recipientEmailAddress:order.recipientEmailAddress,
            dateOrdered:order.dateOrdered,
            orderedBy:order.orderedBy,
            paymentStatus:order.paymentStatus,
            paymentMethod:order.paymentMethod,
            status:order.status,
            slug:order.slug,
            brand:order.brand,            
            image:order.image,
            project:order.project,
            platforms:order.platforms,
            currency: order.currency,
            contractProcessingFee:order.contractProcessingFee,
            agencyServicePlan:order.agencyServicePlan,
            facebookPostQuantity:order.facebookPostQuantity,
            instagramPostQuantity:order.instagramPostQuantity,
            twitterPostQuantity:order.twitterPostQuantity,
            tiktokPostQuantity:order.tiktokPostQuantity,
            linkedInPostQuantity:order.linkedInPostQuantity,
            blogPostQuantity:order.blogPostQuantity,
            facebookProfileLink:order.facebookProfileLink,
            instagramProfileLink:order.instagramProfileLink,
            twitterProfileLink:order.twitterProfileLink,
            tiktokProfileLink:order.tiktokProfileLink,
            linkedInProfileLink:order.linkedInProfileLink,
            blogSiteLink:order.blogSiteLink,
            facebookTotalFollowers:order.facebookTotalFollowers,
            instagramTotalFollowers:order.instagramTotalFollowers,
            twitterTotalFollowers:order.twitterTotalFollowers,
            tiktokTotalFollowers:order.tiktokTotalFollowers,
            linkedInTotalFollowers:order.linkedInTotalFollowers,
            blogTotalVisitorsPerMonth:order.blogTotalVisitorsPerMonth,
            facebookEngagementRate:order.facebookEngagementRate,
            instagramEngagementRate:order.instagramEngagementRate,
            twitterEngagementRate:order.twitterEngagementRate,
            tiktokEngagementRate:order.tiktokEngagementRate,
            linkedInEngagementRate:order.linkedInEngagementRate,
            facebookCostPerPost:order.facebookCostPerPost,
            instagramCostPerPost:order.instagramCostPerPost,
            twitterCostPerPost:order.twitterCostPerPost,
            tiktokCostPerPost:order.tiktokCostPerPost,
            linkedInCostPerPost:order.linkedInCostPerPost,
            blogCostPerPost:order.blogCostPerPost,
            blogPostCostDuration:order.blogPostCostDuration,
            facebookCategory:order.facebookCategory,
            instagramCategory:order.instagramCategory,
            twitterCategory:order.twitterCategory,
            tiktokCategory:order.tiktokCategory,
            linkedInCategory:order.linkedInCategory,
            blogCategory:order.blogCategory

          
          });
          
        });
        setOrdersList(allData);
          setCreatorName(allData[0].creator.name);
          setCreatorId(allData[0].id);
          setCreatorPhoneNumber(allData[0].creator.creatorContactPhoneNumber);
          setCreatorEmail(allData[0].creator.creatorContactEmailAddress);
          setCreatorGender(allData[0].creator.gender)
          setCreatorCountry(allData[0].creator.country[0].name);
          setProjectName(allData[0].projectName)
          setLoading(false);
  
       }else{
        setOrdersList(allData);
        setCreatorName("");
        setCreatorId("");
        setCreatorPhoneNumber("");
        setCreatorEmail("");
        setCreatorGender("")
        setCreatorCountry("");
        setProjectName("")
        setLoading(false);
       }  
       }//end
        
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateProjectCounter,
    updateEdittedProjectCounter,
    updateDeletedProjectCounter,
    props.brandId
  ]);

  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/brands`,{params:{user:userId}});
      const workingData = response.data.data.data;

      
      
      workingData.length>=1 && setBrandId(workingData[0].id)
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderProjectUpdateCounter = () => {
    setUpdateProjectCounter((prevState) => !prevState);
  };

  const renderProjectEdittedUpdateCounter = () => {
    setUpdateEdittedProjectCounter((prevState) => !prevState);
  };

  const renderProjectDeletedUpdateCounter = () => {
    setUpdateDeletedProjectCounter((prevState) => !prevState);
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

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddOpen = () => {
    setOpen(true);
  };

  const handleDialogOpenStatus = () => {
    setOpen(false);
  };

  const handleEditDialogOpenStatus = () => {
    setEditOpen(false);
  };

  const handleDeleteDialogOpenStatus = () => {
    setDeleteOpen(false);
  };

  const handleViewDialogOpenStatus = () => {
    setViewOpen(false);
  };


  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };
  const handleViewOpen = () => {
    setViewOpen(true);
  };

  const onRowsSelectionHandler = (ids, rows) => {
    const selectedIDs = new Set(ids);
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    setSelectedRows(selectedRowsData);
    setRowNumber(selectedIDs.size);
    selectedIDs.forEach(function (value) {
      setSelectedRowId(value);
    });
    if (selectedIDs.size === 1) {
      setRowSelected(true);
    } else {
      setRowSelected(false);
    }
  };

  const renderDataGrid = () => {
    let rows = [];
    let counter = 0;
    const columns = [
      // { field: "id", headerName: "ID", width: 100 },
      {
        field: "numbering",
        headerName: "S/n",
        width: 80,
      },
      {
        field: "dateOrdered",
        headerName: "Date Ordered",
        width: 150,

        //editable: true,
      },
      {
        field: "orderNumber",
        headerName: "Order Number",
        width: 150,

        //editable: true,
      },
      
      {
        field: "projectName",
        headerName: "Project Name",
        width: 300,

        //editable: true,
      },
      
      {
        field: "brandName",
        headerName: "Brand",
        width: 200,
        // hide: true,

        //editable: true,
      },
      {
        field: "brandCountry",
        headerName: "Brand Country",
        width: 200,
        // hide: true,

        //editable: true,
      },   
      {
        field: "creatorName",
        headerName: "Influencer",
        width: 200,
        // hide: true,

        //editable: true,
      }, 
      {
        field: "creatorCountry",
        headerName: "Influencer Country",
        width: 200,
        // hide: true,

        //editable: true,
      }, 
      {
        field: "platforms",
        headerName: "Selected Platforms",
        width: 250,
        // hide: true,

        //editable: true,
      },
      
      
      {
        field: "status",
        headerName: "Status",
        width: 150,
        // hide: true,

        //editable: true,
      },
      {
        field: "currencyName",
        headerName: "Currency",
        width: 150,
        // hide: true,

        //editable: true,
      },
      
     
      {
        field: "contractProcessingFee",
        headerName: "Contract Processing Fee",
        width: 200,
        // hide: true,

        //editable: true,
      },
       {
        field: "agencyServicePlan",
        headerName: "Agency Service Plan",
        width: 150,
        // hide: true,

        //editable: true,
      },
      
    ];

    ordersList.map((order, index) => {
     
      let row = {
        numbering: ++counter,
        id: order.id,
            orderNumber: order.orderNumber,
            transactionId:order.transactionId,
            creator: order.creator,  
            creatorName: order.creator.name,
            creatorAge:order.creator.age,
            creatorGender:order.creator.gender,
            creatorCountry:order.creator && order.creator.country && order.creator.country[0].name,         
            recipientName:order.recipientName,
            recipientPhoneNumber:order.recipientPhoneNumber,
            recipientEmailAddress:order.recipientEmailAddress,
            dateOrdered:new Date(order.dateOrdered).toLocaleDateString("en-UK"),
            orderedBy:order.orderedBy,
            paymentStatus:order.paymentStatus,
            paymentMethod:order.paymentMethod,
            status:order.status,
            slug:order.slug,
            brand:order.brand, 
            brandName:order.brand && order.brand[0].name, 
            brandCountry:order.brand && order.brand[0].country && order.brand[0].country[0].name,          
            image:order.image,
            project:order.project,
            projectName:order.project && order.project[0].name,
            platforms:order.platforms,
            currency: order.currency,
            currencyName:order.currency && order.currency.name,
            contractProcessingFee:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.contractProcessingFee.toLocaleString() : "\u0024" + order.contractProcessingFee.toLocaleString(),
            agencyServicePlan:order.agencyServicePlan,
            facebookPostQuantity:order.facebookPostQuantity,
            instagramPostQuantity:order.instagramPostQuantity,
            twitterPostQuantity:order.twitterPostQuantity,
            tiktokPostQuantity:order.tiktokPostQuantity,
            linkedInPostQuantity:order.linkedInPostQuantity,
            blogPostQuantity:order.blogPostQuantity,
            facebookProfileLink:order.facebookProfileLink,
            instagramProfileLink:order.instagramProfileLink,
            twitterProfileLink:order.twitterProfileLink,
            tiktokProfileLink:order.tiktokProfileLink,
            linkedInProfileLink:order.linkedInProfileLink,
            blogSiteLink:order.blogSiteLink,
            facebookTotalFollowers:order.facebookTotalFollowers.toLocaleString(),
            instagramTotalFollowers:order.instagramTotalFollowers.toLocaleString(),
            twitterTotalFollowers:order.twitterTotalFollowers.toLocaleString(),
            tiktokTotalFollowers:order.tiktokTotalFollowers.toLocaleString(),
            linkedInTotalFollowers:order.linkedInTotalFollowers.toLocaleString(),
            blogTotalVisitorsPerMonth:order.blogTotalVisitorsPerMonth.toLocaleString(),
            facebookEngagementRate:order.facebookEngagementRate,
            instagramEngagementRate:order.instagramEngagementRate,
            twitterEngagementRate:order.twitterEngagementRate,
            tiktokEngagementRate:order.tiktokEngagementRate,
            linkedInEngagementRate:order.linkedInEngagementRate,
            facebookCostPerPost:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.facebookCostPerPost.toLocaleString() : "\u0024" + order.facebookCostPerPost.toLocaleString(),
            instagramCostPerPost:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.instagramCostPerPost.toLocaleString() : "\u0024" + order.instagramCostPerPost.toLocaleString(),
            twitterCostPerPost:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.twitterCostPerPost.toLocaleString() : "\u0024" + order.twitterCostPerPost.toLocaleString(),
            tiktokCostPerPost:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.tiktokCostPerPost.toLocaleString() : "\u0024" + order.tiktokCostPerPost.toLocaleString(),
            linkedInCostPerPost:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.linkedInCostPerPost.toLocaleString() : "\u0024" + order.linkedInCostPerPost.toLocaleString(),
            blogCostPerPost:order.currency && order.currency.name.toLowerCase()==='naira' ?  "\u20A6" + order.blogCostPerPost.toLocaleString() : "\u0024" + order.blogCostPerPost.toLocaleString(),
            blogPostCostDuration:order.blogPostCostDuration,
            facebookCategory:order.facebookCategory,
            instagramCategory:order.instagramCategory,
            twitterCategory:order.twitterCategory,
            tiktokCategory:order.tiktokCategory,
            linkedInCategory:order.linkedInCategory,
            blogCategory:order.blogCategory
      };
      rows.push(row);
    });

    return (
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids, rows)}
        sx={{
          boxShadow: 3,
          border: 3,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    );
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} direction="column">
        <Grid item xs>
        <Typography variant="h4">Orders</Typography>
          <Grid container spacing={2}>
            <Grid item xs={matchesMDUp ? 5.2 : 6.8}>
              {/* <Item>xs=8</Item> */}
              
            </Grid>
            <Grid item xs={matchesMDUp ? 0 :12}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleAddOpen} disabled={rowSelected ? false : true} style={{fontSize:matchesMDUp? 13 : 8.5}}>
                    View Order Details
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <ViewOrderDetails
                        token={token}
                        userId={userId}
                        brandId={brandId}
                        params={selectedRows}
                        //creatorName={creatorName}
                       // creatorCountry={creatorCountry}
                        //creatorId={creatorId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProjectUpdateCounter={
                          renderProjectUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleViewOpen} disabled={rowSelected ? false : true} style={{fontSize:matchesMDUp ? 13 : 8.5}}>
                    Get Creator Contact Details
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={viewOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setViewOpen(false)]}
                  >
                    <DialogContent>
                      <GetCreatorDetails
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        creatorName={creatorName}
                        creatorCountry={creatorCountry}
                        creatorId={creatorId}
                        creatorPhoneNumber={creatorPhoneNumber}
                        creatorEmail={creatorEmail}
                        creatorGender={creatorGender}
                        handleViewDialogOpenStatus={handleViewDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProjectEdittedUpdateCounter={
                          renderProjectEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={setDeleteOpen} disabled={rowSelected ? false : true} style={{fontSize:matchesMDUp ? 13: 8.5}}>
                    Mark As Completed
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <MarkOrderAsCompleted
                        token={token}
                        userId={userId}
                        brandId={brandId}
                        params={selectedRows}
                        //projectName={projectName}
                        handleDeleteDialogOpenStatus={handleDeleteDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleSuccessfulDeletedItemSnackbar={
                            handleSuccessfulDeletedItemSnackbar
                          }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProjectEdittedUpdateCounter={
                          renderProjectEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  {/* <Button variant="contained" onClick={handleDeleteOpen}>
                    Delete
                  </Button> */}
                  {/* <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <ProjectDeleteForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDeleteDialogOpenStatus={
                          handleDeleteDialogOpenStatus
                        }
                        handleSuccessfulDeletedItemSnackbar={
                          handleSuccessfulDeletedItemSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProjectDeletedUpdateCounter={
                          renderProjectDeletedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog> */}
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ height: 700, width: "100%" }}>
            {loading && <CircularProgress style={{ marginLeft: "50%" }} />}
            {!loading && renderDataGrid()}
          </Box>
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
      </Grid>
    </Box>
  );
}

export default Orders;
