import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import api from "./../../../apis/local";
//import { DELETE_ASSESSOR } from "../../../actions/types";

function UnapproveCreatorSampleForm(props) {
  const { params, token, userId } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleIsAllowedOnThePlatformChanged = () => {
    setLoading(true);

    const data = {
        isAllowedOnThePlatform:false,
        approvedOrRejectedBy: userId,
        dateApprovedOrRejected: new Date().toISOString(),
       
    };

    if (params[0].id) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/samples/${params[0].id}`, data);

        if (response.data.status === "success") {
          props.handleSuccessfulDeletedItemSnackbar(
            `This Creator Sample's approval is revoked successfully}!!!`
          );
          props.handleDeleteDialogOpenStatus();
          props.renderCategoryDeletedUpdateCounter();
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      editForm().catch((err) => {
        props.handleFailedSnackbar("Something went wrong, please try again!!!");
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  const handleIsNotAllowedOnThePlatformChanged = () => {
    props.handleDeleteDialogOpenStatus();
  };

  return (
    <>
      {/* <Alert onClose={() => {}}>This is a success alert — check it out!</Alert> */}

      <Alert
        severity="warning"
        action={[
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleIsAllowedOnThePlatformChanged}
          >
            Yes
          </Button>,
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleIsNotAllowedOnThePlatformChanged}
            style={{ marginLeft: 10 }}
          >
            No
          </Button>,
        ]}
      >
        <AlertTitle>Creator Sample Unapproval</AlertTitle>
        Are you sure you want to unapprove this sample?
      </Alert>
    </>
  );
}

export default UnapproveCreatorSampleForm;
