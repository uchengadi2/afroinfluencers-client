import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useToken from "../../../custom-hooks/useToken";
import useUserId from "../../../custom-hooks/useUserId";
import Stack from "@mui/material/Stack";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { styled } from "@mui/material/styles";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import api from "./../../../apis/local";
import ProductForm from "./ProductForm";
import ProductDeleteForm from "./ProductDeleteForm";
import ProductEditForm from "./ProductEditForm";
import ProductDuplicateForm from "./ProductDuplicateForm";

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

function Products(props) {
  const { token, setToken } = useToken();
  const { userId, setUserId } = useUserId();
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [duplicateOpen, setDuplicateOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState();
  const [rowNumber, setRowNumber] = useState(0);
  const [updateProductCounter, setUpdateProductCounter] = useState(false);
  const [updateEdittedProductCounter, setUpdateEdittedProductCounter] =
    useState(false);
  const [updateDuplicatedProductCounter, setUpdateDuplicatedProductCounter] =
    useState(false);
  const [updateDeletedProductCounter, setUpdateDeletedProductCounter] =
    useState(false);
  const [productsList, setProductsList] = useState([]);

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
      const response = await api.get(`/courses`);
      const workingData = response.data.data.data;
      workingData.map((product) => {
        allData.push({
          id: product._id,
          title: product.title,
          category: product.category,
          channel: product.channel,
          programme: product.programme,
          // configuration: product.configuration,
          shortDescription: product.shortDescription,
          longDescription: product.longDescription,
          refNumber: product.refNumber,
          imageCover: product.imageCover,
          images: product.images,
          price: product.price,
          currency: product.currency,
          keyword1: product.keyword1,
          keyword2: product.keyword2,
          keyword3: product.keyword3,

          deliveryMethod: product.deliveryMethod,
          duration: product.duration,
          priceLabel: product.priceLabel,
          isCourseAuditable: product.isCourseAuditable,
          weekdayAuditDays: product.weekdayAuditDays,
          weekendAuditDays: product.weekendAuditDays,
          slug: product.slug,
          venue: product.venue,
          isVatable: product.isVatable,
          weekdaySessionPeriod: product.weekdaySessionPeriod,
          weekendSessionPeriod: product.weekendSessionPeriod,
          track: product.track,
          type: product.type,
          lectureDuration: product.lectureDuration,
          projectDuration: product.projectDuration,
          features: product.features,

          prerequisites: product.prerequisites,
          tools: product.tools,
          targetAudience: product.targetAudience,
          whatToLearn: product.whatToLearn,
          venueLink: product.venueLink,
          capstoneProject: product.capstoneProject,
          contents: product.contents,
          successTips: product.successTips,
          status: product.status,
          class: product.class,
          commencementWeekdaysDate: product.commencementWeekdaysDate,
          commencementWeekendsDate: product.commencementWeekendsDate,
          showGenericWeekdayStartDateText:
            product.showGenericWeekdayStartDateText,
          showGenericWeekendStartDateText:
            product.showGenericWeekendStartDateText,
          genericWeekdayStartDateText: product.genericWeekdayStartDateText,
          genericWeekendStartDateText: product.genericWeekendStartDateText,

          majorSkills: product.majorSkills,
          minorSkills: product.minorSkills,

          passGrade: product.passGrade,
          paymentOptions: product.paymentOptions,

          isInstallmentalPaymentAllowed: product.isInstallmentalPaymentAllowed,
          maximumInstallmentalPayment: product.maximumInstallmentalPayment,

          videoId: product.videoId,
          previewVideoId: product.previewVideoId,
          videoType: product.videoType,
          allowLifeTimeAccess: product.allowLifeTimeAccess,

          hasSeries: product.hasSeries,
          series: product.series,

          hasMentorshipCredit: product.hasMentorshipCredit,
          mentorshipCredit: product.mentorshipCredit,
          mentorshipDuration: product.mentorshipDuration,
          costPerMentorshipCredit: product.costPerMentorshipCredit,

          channelId: product.channel[0] ? product.channel[0].id : " ",
          programmeId: product.programme[0] ? product.programme[0].id : " ",
          categoryId: product.category[0] ? product.category[0].id : " ",
          acceptablePaymentOptions: product.acceptablePaymentOptions,

          allowInstructors: product.allowInstructors,
          allowHomeInstructors: product.allowHomeInstructors,
          allowAssessments: product.allowAssessments,
          allowMentorship: product.allowMentorship,
        });
      });
      setProductsList(allData);
      setLoading(false);
    };

    //call the function

    fetchData().catch(console.error);
  }, [
    updateProductCounter,
    updateEdittedProductCounter,
    updateDeletedProductCounter,
    updateDuplicatedProductCounter,
  ]);

  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const renderProductUpdateCounter = () => {
    setUpdateProductCounter((prevState) => !prevState);
  };

  const renderProductEdittedUpdateCounter = () => {
    setUpdateEdittedProductCounter((prevState) => !prevState);
  };

  const renderProductDuplicatedUpdateCounter = () => {
    setUpdateDuplicatedProductCounter((prevState) => !prevState);
  };

  const renderProductDeletedUpdateCounter = () => {
    setUpdateDeletedProductCounter((prevState) => !prevState);
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

  const handleSuccessfulDuplicateSnackbar = (message) => {
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
  const handleDuplicateDialogOpenStatus = () => {
    setDuplicateOpen(false);
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

  // const handleOnboardOpen = () => {
  //   setOnboardOpen(true);
  // };
  const handleDuplicateOpen = () => {
    setDuplicateOpen(true);
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
        width: 80,
      },
      {
        field: "title",
        headerName: "Course Title",
        width: 250,

        //editable: true,
      },
      {
        field: "refNumber",
        headerName: "Reference Number",
        width: 250,

        //editable: true,
      },
      // {
      //   field: "category",
      //   headerName: "Category",
      //   width: 180,

      //   //editable: true,
      // },
      // {
      //   field: "channel",
      //   headerName: "Channel",
      //   width: 180,

      //   //editable: true,
      // },
      // {
      //   field: "programme",
      //   headerName: "Programme",
      //   width: 180,

      //   //editable: true,
      // },
      {
        field: "status",
        headerName: "Course Status",
        width: 180,

        //editable: true,
      },
      {
        field: "price",
        headerName: "Price",
        width: 180,

        //editable: true,
      },
      {
        field: "type",
        headerName: "Type",
        width: 180,

        //editable: true,
      },
      {
        field: "duration",
        headerName: "Duration",
        width: 180,

        //editable: true,
      },
      {
        field: "track",
        headerName: "Track",
        width: 180,

        //editable: true,
      },
      {
        field: "deliveryMethod",
        headerName: "Delivery Method",
        width: 180,

        //editable: true,
      },

      {
        field: "allowInstructors",
        headerName: "Teaching is allowed",
        width: 180,

        //editable: true,
      },
      {
        field: "allowHomeInstructors",
        headerName: "Home Teaching is allowed",
        width: 180,

        //editable: true,
      },
      {
        field: "allowAssessments",
        headerName: "Assessment & Mock is allowed",
        width: 180,

        //editable: true,
      },
      {
        field: "allowMentorship",
        headerName: "Mentorship is allowed",
        width: 180,

        //editable: true,
      },
    ];

    productsList.map((product, index) => {
      console.log("course:", product);
      let row = {
        numbering: ++counter,
        id: product.id,
        title: product.title
          ? product.title.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
        // category: product.category[0].name
        //   ? product.category[0].name.replace(
        //       /(^\w|\s\w)(\S*)/g,
        //       (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        //     )
        //   : "",
        // channel: product.channel[0].name
        //   ? product.channel.replace(
        //       /(^\w|\s\w)(\S*)/g,
        //       (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        //     )
        //   : "",
        // programme: product.programme[0].name
        //   ? product.programme.replace(
        //       /(^\w|\s\w)(\S*)/g,
        //       (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
        //     )
        //   : "",

        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        refNumber: product.refNumber,
        imageCover: product.imageCover,
        images: product.images,
        price: product.price,
        currency: product.currency,
        // minimumQuantity: product.minimumQuantity,
        keyword1: product.keyword1,
        keyword2: product.keyword2,
        keyword3: product.keyword3,
        deliveryMethod: product.deliveryMethod,
        duration: product.duration,
        priceLabel: product.priceLabel,
        isFeaturedProduct: product.isFeaturedProduct,
        displayOnStore: product.displayOnStore,
        isCourseAuditable: product.isCourseAuditable,
        weekdayAuditDays: product.weekdayAuditDays,
        weekendAuditDays: product.weekendAuditDays,
        slug: product.slug,
        venue: product.venue,
        isVatable: product.isVatable,
        weekdaySessionPeriod: product.weekdaySessionPeriod,
        sku: product.sku,
        weekendSessionPeriod: product.weekendSessionPeriod,
        track: product.track,
        //unit: product.unit,
        type: product.type,
        lectureDuration: product.lectureDuration,
        projectDuration: product.projectDuration,
        instructor: product.instructor,
        features: product.features,
        prerequisites: product.prerequisites,
        tools: product.tools,
        targetAudience: product.targetAudience,
        whatToLearn: product.whatToLearn,
        venueLink: product.venueLink,
        capstoneProject: product.capstoneProject,
        contents: product.contents,
        passGrade: product.passGrade,
        successTips: product.successTips,
        status: product.status,
        class: product.class,
        commencementWeekdaysDate: product.commencementWeekdaysDate,
        commencementWeekendsDate: product.commencementWeekendsDate,
        showGenericWeekdayStartDateText:
          product.showGenericWeekdayStartDateText,
        showGenericWeekendStartDateText:
          product.showGenericWeekendStartDateText,
        genericWeekdayStartDateText: product.genericWeekdayStartDateText,
        genericWeekendStartDateText: product.genericWeekendStartDateText,
        paymentOptions: product.paymentOptions,
        hasMentorshipCredit: product.hasMentorshipCredit,
        mentorshipCredit: product.mentorshipCredit,
        mentorshipDuration: product.mentorshipDuration,
        costPerMentorshipCredit: product.costPerMentorshipCredit,
        series: product.series,
        hasSeries: product.hasSeries,
        isInstallmentalPaymentAllowed: product.isInstallmentalPaymentAllowed,
        maximumInstallmentalPayment: product.maximumInstallmentalPayment,
        majorSkills: product.majorSkills,
        minorSkills: product.minorSkills,
        videoId: product.videoId,
        videoType: product.videoType,
        previewVideoId: product.previewVideoId,
        channelId: product.channel[0] ? product.channel[0].id : " ",
        programmeId: product.programme[0] ? product.programme[0].id : " ",
        categoryId: product.category[0] ? product.category[0].id : " ",
        //currency: product.currency ? product.currency[0].id : " ",
        currency: product.currency,
        allowLifeTimeAccess: product.allowLifeTimeAccess,
        acceptablePaymentOptions: product.acceptablePaymentOptions,
        allowInstructors: product.allowInstructors,
        allowHomeInstructors: product.allowHomeInstructors,
        allowAssessments: product.allowAssessments,
        allowMentorship: product.allowMentorship,
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
              <Typography variant="h4">Courses</Typography>
            </Grid>
            <Grid item xs={4}>
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
                      <ProductForm
                        token={token}
                        userId={userId}
                        handleDialogOpenStatus={handleDialogOpenStatus}
                        handleSuccessfulCreateSnackbar={
                          handleSuccessfulCreateSnackbar
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductUpdateCounter={renderProductUpdateCounter}
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
                      <ProductEditForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleEditDialogOpenStatus={handleEditDialogOpenStatus}
                        handleFailedSnackbar={handleFailedSnackbar}
                        handleSuccessfulEditSnackbar={
                          handleSuccessfulEditSnackbar
                        }
                        renderProductEdittedUpdateCounter={
                          renderProductEdittedUpdateCounter
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <Button variant="contained" onClick={handleDuplicateOpen}>
                    Duplicate
                  </Button>
                  <Dialog
                    //style={{ zIndex: 1302 }}
                    fullScreen={matchesXS}
                    open={duplicateOpen}
                    // onClose={() => [setOpen(false), history.push("/utilities/countries")]}
                    onClose={() => [setDuplicateOpen(false)]}
                  >
                    <DialogContent>
                      <ProductDuplicateForm
                        token={token}
                        userId={userId}
                        params={selectedRows}
                        handleDuplicateDialogOpenStatus={
                          handleDuplicateDialogOpenStatus
                        }
                        handleFailedSnackbar={handleFailedSnackbar}
                        renderProductDuplicatedUpdateCounter={
                          renderProductDuplicatedUpdateCounter
                        }
                        handleSuccessfulDuplicateSnackbar={
                          handleSuccessfulDuplicateSnackbar
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
                      <ProductDeleteForm
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
                        renderProductDeletedUpdateCounter={
                          renderProductDeletedUpdateCounter
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

export default Products;
