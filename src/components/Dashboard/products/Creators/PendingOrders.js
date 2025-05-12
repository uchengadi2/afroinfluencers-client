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
import AddVideoAndHooksForm from "./AddVideoAndHooksForm";
import ViewOrderDetails from "./ViewOrderDetails";
import GetProjectBrief from "./GetProjectBrief";
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

function PendingOrders(props) {
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
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      if(props.creatorId){
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/orders`, {params:{status:"creative-pending",creator:props.creatorId}});
      const workingData = response.data.data.data;
      
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
        
        });
      });
      setOrdersList(allData);
      setLoading(false);
      }//end
      setLoading(false);
      
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateProjectCounter,
    updateEdittedProjectCounter,
    updateDeletedProjectCounter,
  ]);

  

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/brands`,{params:{user:userId}});
      const workingData = response.data.data.data;

      
      
      workingData.length >= 1 && setBrandId(workingData[0].id)
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [userId]);

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
        width: 200,

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
        <Grid item xs style={{ marginTop: 15 }}>
          <Grid container spacing={2}>
          <Typography variant="h4">Pending Orders</Typography>
            {/* <Grid item xs={8.2}> */}
            <Grid item xs={matchesMDUp ? 8.2 : 3.8}>
              {/* <Item>xs=8</Item> */}
              {/* <Typography variant="h4">Pending Orders</Typography> */}
            </Grid>
            {/* <Grid item xs={3.8}> */}
             <Grid item xs={matchesMDUp ? 0 : 12}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleAddOpen} disabled={rowSelected ? false : true}>
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
                  <Button variant="contained" onClick={handleViewOpen} disabled={rowSelected ? false : true}>
                    Get Project Brief
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={viewOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setViewOpen(false)]}
                  >
                    <DialogContent>
                      <GetProjectBrief
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleViewDialogOpenStatus={
                          handleViewDialogOpenStatus
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
                  </Dialog>
                  {/* <Button variant="contained" onClick={handleEditOpen} disabled={rowSelected ? true : true}>
                    Submit Creatives For Review
                  </Button> */}
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditOpen(false)]}
                  >
                    <DialogContent>
                      <AddVideoAndHooksForm
                        token={token}
                        userId={userId}
                        brandId={brandId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
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

export default PendingOrders;
