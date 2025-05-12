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
import AddCategoryForm from "./AddCategoryForm";
import CategoryEditForm from "./CategoryEditForm";
import CategoryDelete from "./CategoryDelete";
import EditCreatorByAdminForm from "./EditCreatorByAdminForm";
import ActivateDeactivateCreatorForm from "./ActivateDeactivateCreatorForm";

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

function Creators(props) {
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
  const [creatorsList, setCreatorsList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
    const [rowSelected, setRowSelected] = useState(false);
  const [rowNumber, setRowNumber] = useState(0);
  const [updateCreatorCounter, setUpdateCreatorCounter] = useState(false);
  const [updateEdittedCreatorCounter, setUpdateEdittedCreatorCounter] =
    useState(false);
  const [updateDeletedCreatorCounter, setUpdateDeletedCreatorCounter] =
    useState(false);
    const [hasInfo,setHasInfo] = useState(false);
    const [platformRate, setPlatformRate] = useState();
    const [minimumPlatformCharge, setMinimumPlatformCharge] = useState();
    const [vat, setVat] = useState();
    const [policyId, setPolicyId] = useState();
    const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState();
    const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    backgroundColor: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/creators`);
      const workingData = response.data.data.data;
      
      workingData.map((creator) => {
        allData.push({
          id: creator._id,
          name: creator.name,
          videoPrice: creator.videoPrice,
          videoHookPrice: creator.videoHookPrice,
          videoDeliveryDays: creator.videoDeliveryDays,
          soundPrice: creator.soundPrice,
          soundHookPrice: creator.soundHookPrice,
          soundDeliveryDays: creator.soundDeliveryDays,
          age: creator.age,
          gender:creator.gender,
          rate: creator.rate,
          country: creator.country,
          niches: creator.niches,
          nicheId: creator.niches[0].id,
          languages: creator.languages,
          slug: creator.slug,
          image: creator.image,
          images: creator.images,
          status:creator.status,
          creatorContactPhoneNumber:creator.creatorContactPhoneNumber,
          creatorContactEmailAddress:creator.creatorContactEmailAddress,
          bankDetails:creator.bankDetails,
          bio:creator.bio,
          user:creator.user,
          currency:creator.currency,
          category:creator.category
        });
      });
      setCreatorsList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateCreatorCounter,
    updateEdittedCreatorCounter,
    updateDeletedCreatorCounter,
  ]);

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
              }, [updateEdittedCreatorCounter,updateDeletedCreatorCounter]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderCreatorUpdateCounter = () => {
    setUpdateCreatorCounter((prevState) => !prevState);
  };

  const renderCreatorEdittedUpdateCounter = () => {
    setUpdateEdittedCreatorCounter((prevState) => !prevState);
  };

  const renderCreatorDeletedUpdateCounter = () => {
    setUpdateDeletedCreatorCounter((prevState) => !prevState);
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

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
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
        field: "name",
        headerName: "Creator",
        width: 250,

        //editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 250,

        //editable: true,
      },
      {
        field: "countryName",
        headerName: "Country",
        width: 250,
        // hide: true,

        //editable: true,
      },
      {
        field: "videoPrice",
        headerName: "Cost of Making a 10 to 40s Promo Video",
        width: 350,
        // hide: true,

        //editable: true,
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 250,
        // hide: true,

        //editable: true,
      },
      {
        field: "age",
        headerName: "Age",
        width: 250,
        // hide: true,

        //editable: true,
      },
      {
        field: "rate",
        headerName: "Rate",
        width: 250,
        // hide: true,

        //editable: true,
      },
    ];

    creatorsList.map((creator, index) => {
      // console.log("category is:", category);
      let row = {
        numbering: ++counter,
        id: creator.id,
        slug: creator.slug,
        name: creator.name.replace(
          /(^\w|\s\w)(\S*)/g,
          (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        ),
        // description: creator.description.replace(
        //   /(^\w|\s\w)(\S*)/g,
        //   (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        // ),
        
          
          videoPrice: creator.videoPrice,
          videoHookPrice: creator.videoHookPrice,
          videoDeliveryDays: creator.videoDeliveryDays,
          soundPrice: creator.soundPrice,
          soundHookPrice: creator.soundHookPrice,
          soundDeliveryDays: creator.soundDeliveryDays,
          age: creator.age,
          gender:creator.gender,
          rate: creator.rate,
          country: creator.country,
          countryName: creator.country ? creator.country[0].name : "",
          countryId: creator.country ? creator.country[0].id: "",
          niches: creator.niches,
         // nicheId: creator.niches[0].id,
          languages: creator.languages,
          //languageId: creator.languages[0].id,
          image: creator.image,
          images: creator.images,
          status:creator.status,
          creatorContactPhoneNumber:creator.creatorContactPhoneNumber,
          creatorContactEmailAddress:creator.creatorContactEmailAddress,
          bankDetails:creator.bankDetails,
          bio:creator.bio,
          user:creator.user,
          currency:creator.currency,
          category:creator.category
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
  console.log('selectedRows:',selectedRows)
  console.log('status from selected rows:',selectedRows.length===1 ? selectedRows[0].status:"")

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} direction="column">
        <Grid item xs>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Creators</Typography>
            </Grid>
            <Grid item xs={3}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  {/* <Button variant="contained" onClick={handleAddOpen}>
                    Add
                  </Button> */}
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <AddCategoryForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCreatorUpdateCounter={
                          renderCreatorUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                   <Button variant="contained" onClick={handleEditOpen} disabled={rowSelected ? false : true}>
                   Edit
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditOpen(false)]}
                  >
                    <DialogContent>
                      <EditCreatorByAdminForm
                        token={token}
                        userId={userId}
                        hasInfo={hasInfo}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCreatorEdittedUpdateCounter={
                          renderCreatorEdittedUpdateCounter
                        }
                        platformRate={platformRate}
                        minimumPlatformCharge={minimumPlatformCharge}
                        vat={vat}
                        policyId ={policyId}
                        platformRateIsIncludedAsPartOfUserInputedAmount={platformRateIsIncludedAsPartOfUserInputedAmount}
                        vatIsIncludedAsPartOfUserInputedAmount={vatIsIncludedAsPartOfUserInputedAmount}
                      />
                    </DialogContent>
                  </Dialog>
                  {selectedRows.length===1 && (selectedRows[0].status==="inactive" || selectedRows[0].status==="active") && <Button variant="contained" 
                        onClick={handleDeleteOpen} 
                        disabled={rowSelected ? false : true}>
                        {selectedRows[0].status === "active" ? "DeActivate Creator" : selectedRows[0].status==="inactive" ? "Activate Creator" : "" }
                  </Button>}
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <ActivateDeactivateCreatorForm
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
                        renderCreatorDeletedUpdateCounter={
                          renderCreatorDeletedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
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

export default Creators;
