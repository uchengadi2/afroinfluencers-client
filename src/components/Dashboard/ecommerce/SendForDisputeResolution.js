import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import api from "./../../../apis/local";
//import { DELETE_ASSESSOR } from "../../../actions/types";

function SendForDisputeResolution(props) {
  const { params, token, userId } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleMarkAsCompleted = () => {
    setLoading(true);

    const data = {
        paymentStatus:"in-dispute",
        sendForDisputeResolutionBy: userId,
        sentForDisputeResolutionDateDate: new Date().toISOString(),
        
    };

    if (params[0].id) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/payments/${params[0].id}`, data);

        if (response.data.status === "success") {
          props.handleSuccessfulDeletedItemSnackbar(
            `Payment is successfully sent for dispute resolution!!!`
          );
          props.handleDeleteDialogOpenStatus();
          props.renderProjectEdittedUpdateCounter();
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

  const handleNoMarkAsCompleted = () => {
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
            onClick={handleMarkAsCompleted}
          >
            Yes
          </Button>,
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleNoMarkAsCompleted}
            style={{ marginLeft: 10 }}
          >
            No
          </Button>,
        ]}
      >
        <AlertTitle>Send Creator, {params[0].creatorName}'s Payment for Dispute Resolution" ?</AlertTitle>
        Are you sure you want to send this payment for dispute resolution?
      </Alert>
    </>
  );
}

export default SendForDisputeResolution;
