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

//import AddVideoAndHooksForm from "./AddVideoAndHooksForm";
import ViewOrderDetails from "./ViewOrderDetails";
import GetCreatorDetails from "./GetCreatorDetails";
import MarkOrderAsCompleted from "./MarkOrderAsCompleted";
import ViewPaymentDetails from "./ViewPaymentDetails";
import MarkPaymentDisputeAsResolved from "./MarkPaymentDisputeAsResolved";
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

function PaymentInDispute(props) {
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
  const [paymentsList, setPaymentsList] = useState([]);
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
        const response = await api.get(`/payments`, {
                  params: { paymentStatus: "in-dispute" },
          });
                const workingData = response.data.data.data;
                workingData.map((payment) => {
                  allData.push({
                    id: payment._id,
                    refNumber: payment.refNumber,
                    order: payment.order,
                    brand: payment.brand,
                    creator: payment.creator,
                    platformReceipt: payment.platformReceipt,
                    vatReceipt: payment.vatReceipt,
                    creatorReceipt: payment.creatorReceipt,
                    paymentCurrency: payment.paymentCurrency,
                    paymentConfirmedBy: payment.paymentConfirmedBy,
                    paymentConfirmedDate: payment.paymentConfirmedDate,
                    paymentStatus: payment.paymentStatus,
                    paymentMethod: payment.paymentMethod,
                    prevailingPlatformRate: payment.prevailingPlatformRate,
                    prevailingVatRate: payment.prevailingVatRate,
                    prevailingMinimumPlatformRate: payment.prevailingMinimumPlatformRate,
                    prevailingPlatformRateIsIncludedAsPartOfUserInputedAmount: payment.prevailingPlatformRateIsIncludedAsPartOfUserInputedAmount,
                    prevailingVatRateIsIncludedAsPartOfUserInputedAmount: payment.prevailingVatRateIsIncludedAsPartOfUserInputedAmount,
                   
                  });
                });
                setPaymentsList(allData);
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
        field: "projectName",
        headerName:"Project Name",
        width: 250,

        //editable: true,
      },
      {
        field: "paymentStatus",
        headerName: "Payment Status",
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
        field: "orderStatus",
        headerName: "Order Status",
        width: 150,

        //editable: true,
      },
      {
        field: "paymentConfirmedDate",
        headerName: "Payment Confirmation Date",
        width: 250,

        //editable: true,
      },
      
      {
        field: "paymentMethod",
        headerName: `Payment Method`,
        width: 180,

        //editable: true,
      },
      
      {
        field: "platformReceipt",
        headerName: `Platform Receipt ${"(" + "₦" + ")"}`,
        width: 200,

        //editable: true,
      },
      {
        field: "creatorReceipt",
        headerName: `Creator Receipt ${"(" + "₦" + ")"}`,
        width: 200,

        //editable: true,
      },
      {
        field: "vatReceipt",
        headerName: `VAT Receipt ${"(" + "₦" + ")"}`,
        width: 200,

        //editable: true,
      },
      {
        field: "creatorName",
        headerName: "Creator Name",
         width: 180,

        //editable: true,
      },
      {
        field: "creatorCountry",
        headerName: "Creator Country",
         width: 180,

        //editable: true,
      },
      {
        field: "brandName",
        headerName: "Brand Name",
         width: 180,

        //editable: true,
      },
      {
        field: "brandCountry",
        headerName: "Brand Country",
         width: 180,

        //editable: true,
      },
      
    ];

    paymentsList.map((payment, index) => {
     
      let row = {
          numbering: ++counter,
          id: payment.id,
          refNumber: payment.refNumber,
          order: payment.order,
          orderNumber: payment.order ? payment.order.orderNumber : "",
          creativeType: payment.order ? payment.order.creativeType : "",
          orderStatus: payment.order ? payment.order.status : "",
          projectName: payment.order ? payment.order.project[0].name : "",
          brand: payment.brand,
          brandName: payment.brand ? payment.brand[0].name : "",
          brandCountry: payment.brand ? payment.brand[0].country[0].name : "",
          creatorName: payment.creator ? payment.creator[0].name : "",
          creatorCountry: payment.creator ? payment.creator[0].country[0].name : "",
          creator: payment.creator,
          platformReceipt: payment.platformReceipt ? payment.platformReceipt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"): "",
          vatReceipt: payment.vatReceipt ? payment.vatReceipt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "",
          creatorReceipt: payment.creatorReceipt ? payment.creatorReceipt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "",
          paymentCurrency: payment.paymentCurrency,
          paymentConfirmedBy: payment.paymentConfirmedBy,
          paymentConfirmedDate: payment.paymentConfirmedDate ? new Date(payment.paymentConfirmedDate).toLocaleString("en-GB") : "",
          paymentStatus: payment.paymentStatus,
          paymentMethod: payment.paymentMethod,
          prevailingPlatformRate: payment.prevailingPlatformRate,
          prevailingVatRate: payment.prevailingVatRate,
          prevailingMinimumPlatformRate: payment.prevailingMinimumPlatformRate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"),          prevailingPlatformRateIsIncludedAsPartOfUserInputedAmount: payment.prevailingPlatformRateIsIncludedAsPartOfUserInputedAmount,
          prevailingVatRateIsIncludedAsPartOfUserInputedAmount: payment.prevailingVatRateIsIncludedAsPartOfUserInputedAmount,
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
            <Grid item xs={8}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Disputed Payments</Typography>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleAddOpen} disabled={rowSelected ? false : true}>
                    View Payment Details
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <ViewPaymentDetails
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
                      <GetCreatorDetails
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        // creatorName={creatorName}
                        // creatorCountry={creatorCountry}
                        // creatorId={creatorId}
                        // creatorPhoneNumber={creatorPhoneNumber}
                        // creatorEmail={creatorEmail}
                        // creatorGender={creatorGender}
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
                  <Button variant="contained" onClick={setDeleteOpen} disabled={rowSelected ? false : true}>
                    Mark As Resolved
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <MarkPaymentDisputeAsResolved
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

export default PaymentInDispute;

