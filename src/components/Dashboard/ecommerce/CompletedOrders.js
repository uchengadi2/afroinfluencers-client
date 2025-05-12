import React, { useEffect, useState } from "react";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
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
import api from "./../../../apis/local";
import ViewMarkedCompletedOrders from "./ViewMarkedCompletedOrders";
import MarkOrderForPayment from "./MarkOrderForPayment";

//import AddVideoAndHooksForm from "./AddVideoAndHooksForm";
// import ViewOrderDetails from "./ViewOrderDetails";
// import GetCreatorDetails from "./GetCreatorDetails";
// import MarkOrderAsCompleted from "./MarkOrderAsCompleted";
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

function CompletedOrders(props) {
 const classes = useStyles();
  const theme = useTheme();
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
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
      //if(props.brandId){
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await api.get(`/orders`, {
        params:{
          status:'creative-completed'
        }});
      const workingData = response.data.data.data;
      
           
      if(workingData.length>=1){
        workingData.map((order) => {
          allData.push({
            id: order._id,
            orderNumber: order.orderNumber,
            transactionId:order.transactionId,
            creator: order.creator,
            productCategory: order.productCategory,
            orderedCreativeQuantity:order.orderedCreativeQuantity,
            orderedHookQuantity:order.orderedHookQuantity,
            orderedCreativePricePerUnit:order.orderedCreativePricePerUnit,
            orderedHookPricePerUnit:order.orderedHookPricePerUnit,
            productCurrency:order.productCurrency,
            creativeType:order.creativeType,
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
            language:order.language,
            creativeLanguage:order.creativeLanguage,
            creativeDeliveryDays:order.creativeDeliveryDays,
            image:order.image,
            creatorCategoryCode:order.creatorCategoryCode,
            brandCountry:order.brandCountry,
            brandName:order.brandName,
            project:order.project,
            projectName:order.projectName,
            markForCompletionBy:order.markForCompletionBy,
            markForCompletionDate:order.markForCompletionDate,
            markedByIdentity:order.markedByIdentity,
          
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
      
      //}//end
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateProjectCounter,
    updateEdittedProjectCounter,
    updateDeletedProjectCounter,
    
  ]);

  

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchData = async () => {
  //     let allData = [];
  //     api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
  //     const response = await api.get(`/brands`,{params:{user:userId}});
  //     const workingData = response.data.data.data;

      
      
  //     workingData.length>=1 && setBrandId(workingData[0].id)
  //     setLoading(false);
  //   };

  //   //call the function

  //   fetchData().catch(console.error);
  // }, []);

  

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
        width: 100,
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
        field: "brandCountryDisplay",
        headerName: "Brand Country of Origin",
        width: 200,
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
        field: "creativeType",
        headerName: "Creative Type",
        width: 150,
        // hide: true,

        //editable: true,
      },
      {
        field: "orderedCreativeQuantity",
        headerName: "Creative Quantity",
        width: 150,
        // hide: true,

        //editable: true,
      },
      {
        field: "orderedHookQuantity",
        headerName: "Hook Quantity",
        width: 150,
        // hide: true,

        //editable: true,
      },
      {
        field: "creativeLanguage",
        headerName: "Required Creative Language",
        width: 200,
        // hide: true,

        //editable: true,
      },
      
    ];

    ordersList.map((order, index) => {
     
      let row = {
        numbering: ++counter,
        id: order.id,
        //  name: project.name.replace(
        //   /(^\w|\s\w)(\S*)/g,
        //   (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        // ),
        // description: project.description.replace(
        //   /(^\w|\s\w)(\S*)/g,
        //   (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        // ),
        
        
          orderNumber: order.orderNumber,
          transactionId:order.transactionId,
          creator: order.creator,
          productCategory: order.productCategory,
          orderedCreativeQuantity:order.orderedCreativeQuantity,
          orderedHookQuantity:order.orderedHookQuantity,
          orderedCreativePricePerUnittor:order.orderedCreativePricePerUnit,
          orderedHookPricePerUnit:order.orderedHookPricePerUnit,
          productCurrency:order.productCurrency,
          creativeType:order.creativeType,
          recipientName:order.recipientName,
          recipientPhoneNumber:order.recipientPhoneNumber,
          recipientEmailAddress:order.recipientEmailAddress,
          dateOrdered:new Date(order.dateOrdered).toLocaleString("en-GB"),
          orderedBy:order.orderedBy,
          paymentStatus:order.paymentStatus,
          paymentMethod:order.paymentMethod,
          status:order.status,
          slug:order.slug,
          brand:order.brand,
          language:order.language,
          creativeLanguage:order.creativeLanguage,
          creativeDeliveryDays:order.creativeDeliveryDays,
          image:order.image,
          creatorCategoryCode:order.creatorCategoryCode,
          brandCountry:order.brandCountry,
          brandName:order.brandName,
          brandCountryDisplay:order.brandCountry ? order.brandCountry.name:"",
          project:order.project,
          projectName:order.projectName,
          markForCompletionBy:order.markForCompletionBy,
          markForCompletionDate: order.markForCompletionDate ? new Date(order.markForCompletionDate).toLocaleString("en-GB"):"",
          markedByIdentity:order.markedByIdentity,
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
          <Grid container spacing={2}>
            <Grid item xs={7.2}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Completed Orders</Typography>
            </Grid>
            <Grid item xs={4.8}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleAddOpen} disabled={rowSelected ? false : true}>
                    View Marked Order Details
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <ViewMarkedCompletedOrders
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
                  {/* <Button variant="contained" onClick={handleViewOpen} disabled={rowSelected ? false : true}>
                    Get Creator Contact Details
                  </Button> */}
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={viewOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setViewOpen(false)]}
                  >
                    <DialogContent>
                      {/* <GetCreatorDetails
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
                      /> */}
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={setDeleteOpen} disabled={rowSelected ? false : true}>
                    Mark For Payment
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <MarkOrderForPayment
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

export default CompletedOrders;
