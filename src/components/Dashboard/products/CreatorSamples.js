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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
// import NewSampleForm from "./../../../NewSampleForm";
// import SampleDeleteForm from "./../SampleDeleteForm";
// import SampleEditForm from "./../SampleEditForm";
import YoutubeDemoImage from "./../../../assets/images/youtube/youtubeid.jpg";
import ViewCreatorSample from "./ViewCreatorSample";
import ApproveCreatorSampleForm from "./ApproveCreatorSampleForm";

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
//   background: {
//     backgroundImage: `url(${background})`,
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//     //backgroundAttachment: "fixed",
//     backgroundRepeat: "no-repeat",
//     height: "50em",
//     width: "800px",
//     [theme.breakpoints.down("md")]: {
//       // backgroundImage: `url(${mobileBackground})`,
//       backgroundAttachment: "inherit",
//     },
//   },
}));

function CreatorSamples(props) {
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
  const [youtubeOpen, setYoutubeOpen] = useState(false);
  const [samplesList, setSamplesList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [rowSelected, setRowSelected] = useState(false);
  const [updateCategoryCounter, setUpdateCategoryCounter] = useState(false);
  const [updateEdittedCategoryCounter, setUpdateEdittedCategoryCounter] =
    useState(false);
  const [updateDeletedCategoryCounter, setUpdateDeletedCategoryCounter] =
    useState(false);
  const [creatorId, setCreatorId] = useState();  
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
      //if(props.creatorId){
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/samples`,{params:{isAllowedOnThePlatform:false}});
      const workingData = response.data.data.data;

           
      workingData.map((sample) => {
        allData.push({
          id: sample._id,
          refNumber: sample.refNumber,
          creator: sample.creator,
          slug: sample.slug,
          youtubeId:sample.youtubeId,
          sampleType: sample.sampleType,
          status:sample.status,
          isAllowedOnThePlatform:sample.isAllowedOnThePlatform
        });
      });
      setSamplesList(allData);
      setLoading(false);
      //}//end
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateCategoryCounter,
    updateEdittedCategoryCounter,
    updateDeletedCategoryCounter,
    props.creatorId
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderCategoryUpdateCounter = () => {
    setUpdateCategoryCounter((prevState) => !prevState);
  };

  const renderCategoryEdittedUpdateCounter = () => {
    setUpdateEdittedCategoryCounter((prevState) => !prevState);
  };

  const renderCategoryDeletedUpdateCounter = () => {
    setUpdateDeletedCategoryCounter((prevState) => !prevState);
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

 
  const handleYoutubeOpen = () => {
    setYoutubeOpen(true);
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

  const handleYoutubeDialogOpenStatus = () => {
    setYoutubeOpen(false);
    
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
        field: "refNumber",
        headerName: "Reference Number",
        width: 150,

        //editable: true,
      },
      {
        field: "youtubeId",
        headerName: "YouTube Id",
        width: 150,

        //editable: true,
      },
      {
        field: "sampleType",
        headerName: "Sample Type",
        width: 150,

        //editable: true,
      },
      {
        field: "isAllowedOnThePlatform",
        headerName: "Is Sample Approved",
        width: 200,

        //editable: true,
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,

        //editable: true,
      },
     
    ];

    samplesList.map((sample, index) => {
      // console.log("category is:", category);
      let row = {
        numbering: ++counter,
          id: sample.id,
          refNumber: sample.refNumber,
          creator: sample.creator,
          slug: sample.slug,
          youtubeId:sample.youtubeId,
          sampleType: sample.sampleType,
          status:sample.status,
          isAllowedOnThePlatform:sample.isAllowedOnThePlatform ? "Yes" : "No"
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
            <Grid item xs={8.5}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Creators' Unapproved Samples</Typography>
            </Grid>
            <Grid item xs={3.5}>
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
                    {/* <DialogContent>
                      <NewSampleForm
                        token={token}
                        userId={userId}
                        creatorId={props.creatorId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleYoutubeOpen={handleYoutubeOpen}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCategoryUpdateCounter={
                          renderCategoryUpdateCounter
                        }
                      />
                    </DialogContent> */}
                  </Dialog>
                  <Button variant="contained" 
                    onClick={handleEditOpen}  
                    disabled={rowSelected ? false : true}
                  >
                    View Sample
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={editOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setEditOpen(false)]}
                  >
                    <DialogContent>
                      <ViewCreatorSample
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        creatorId={props.creatorId}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleYoutubeOpen={handleYoutubeOpen}
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCategoryEdittedUpdateCounter={
                          renderCategoryEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained"
                    onClick={handleDeleteOpen} 
                    disabled={rowSelected ? false : true}
                  >
                    Approve Sample
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <ApproveCreatorSampleForm
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
                        renderCategoryDeletedUpdateCounter={
                          renderCategoryDeletedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={youtubeOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setYoutubeOpen(false)]}
                  >
                    <DialogContent>
                        <Card style={{width:1200, height:700}}>
                            <CardMedia
                                  
                                  style={{width:800, height:500}}
                                  component="img"
                                  alt={"Youtube Id Demonstration"}
                                  image={YoutubeDemoImage}
                                 //   title={props.name}
                                crossOrigin="anonymous"
                              />
                            </Card>
                            
                      
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

export default CreatorSamples;
