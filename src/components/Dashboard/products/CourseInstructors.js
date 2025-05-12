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
import AddCourseIntructorForm from "./AddCourseIntructorForm";
import CourseInstructorEditForm from "./CourseInstructorEditForm";
import CourseInstructorDeleteForm from "./CourseInstructorDeleteForm";

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

function CourseInstructors(props) {
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
  const [categoriesList, setCategoriesList] = useState([]);
  const [courseInstructionsList, setCourseInstructionsList] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [updateCategoryCounter, setUpdateCategoryCounter] = useState(false);
  const [updateEdittedCategoryCounter, setUpdateEdittedCategoryCounter] =
    useState(false);
  const [updateDeletedCategoryCounter, setUpdateDeletedCategoryCounter] =
    useState(false);
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
      const response = await api.get(`/courseinstructors`);
      const workingData = response.data.data.data;

      workingData.map((dcourse) => {
        allData.push({
          id: dcourse._id,
          refNumber: dcourse.refNumber,
          instructor: dcourse.instructor,
          dcourse: dcourse.course,
          channel: dcourse.channel,
          programme: dcourse.programme,
          hourlyRate: dcourse.hourlyRate,
          homeHourlyRate: dcourse.homeHourlyRate,
          trackPreference: dcourse.trackPreference,
          deliveryPreference: dcourse.deliveryPreference,
          acceptHomeTeaching: dcourse.acceptHomeTeaching,
          createdBy: dcourse.createdBy,
          dateCreated: dcourse.dateCreated,
          status: dcourse.status,
          comment: dcourse.comment,
          currency: dcourse.currency,
        });
      });
      setCourseInstructionsList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateCategoryCounter,
    updateEdittedCategoryCounter,
    updateDeletedCategoryCounter,
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
        width: 250,

        //editable: true,
      },
      {
        field: "instructorName",
        headerName: "Instructor",
        width: 250,

        //editable: true,
      },
      {
        field: "courseName",
        headerName: "Course",
        width: 250,
        // hide: true,

        //editable: true,
      },
      {
        field: "channelName",
        headerName: "Channel",
        width: 250,
        // hide: true,

        //editable: true,
      },
      {
        field: "programmeName",
        headerName: "Programme",
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
        headerName: "Currency of Payment",
        width: 150,
        // hide: true,

        //editable: true,
      },
      {
        field: "hourlyRate",
        headerName: "Hourly Rate",
        width: 150,
        // hide: true,

        //editable: true,
      },

      {
        field: "acceptHomeTeachingValue",
        headerName: "Can Serve As A Home or Private Teacher",
        width: 150,
        // hide: true,

        //editable: true,
      },
    ];

    courseInstructionsList.map((course, index) => {
      let row = {
        numbering: ++counter,
        id: course.id,
        refNumber: course.refNumber,
        instructor: course.instructor,
        course: course.dcourse,
        channel: course.channel,
        programme: course.programme,
        hourlyRate: course.hourlyRate,
        homeHourlyRate: course.homeHourlyRate,
        trackPreference: course.trackPreference,
        deliveryPreference: course.deliveryPreference,
        acceptHomeTeaching: course.acceptHomeTeaching,
        createdBy: course.createdBy,
        dateCreated: course.dateCreated,
        status: course.status,
        comment: course.comment,
        currency: course.currency,
        acceptHomeTeachingValue: course.acceptHomeTeaching ? "Yes" : "No",
        instructorName:
          course.instructor.length === 1 ? course.instructor[0].name : " ",
        channelName: course.channel.length === 1 ? course.channel[0].name : " ",
        programmeName:
          course.programme.length === 1 ? course.programme[0].name : " ",
        courseName: course.dcourse.length === 1 ? course.dcourse[0].title : " ",
        currencyName:
          course.currency.length === 1 ? course.currency[0].name : " ",
        channelId: course.channel[0].id,
        programmeId: course.programme[0].id,
        courseId: course.dcourse[0].id,
        instructorId: course.instructor[0].id,
        currencyId: course.currency[0].id,
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
            <Grid item xs={9.3}>
              {/* <Item>xs=8</Item> */}
              <Typography variant="h4">Course Instructors</Typography>
            </Grid>
            <Grid item xs={2.7}>
              <div>
                <Stack direction="row" spacing={1.5}>
                  <Button variant="contained" onClick={handleAddOpen}>
                    Add
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={open}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setOpen(false)]}
                  >
                    <DialogContent>
                      <AddCourseIntructorForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCategoryUpdateCounter={
                          renderCategoryUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleEditOpen}>
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
                      <CourseInstructorEditForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderCategoryEdittedUpdateCounter={
                          renderCategoryEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleDeleteOpen}>
                    Delete
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={deleteOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDeleteOpen(false)]}
                  >
                    <DialogContent>
                      <CourseInstructorDeleteForm
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

export default CourseInstructors;
