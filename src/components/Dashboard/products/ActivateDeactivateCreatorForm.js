import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import api from "./../../../apis/local";
//import { DELETE_ASSESSOR } from "../../../actions/types";

function ActivateDeactivateCreatorForm(props) {
  const { params, token, userId } = props;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleMarkAsStatusChanged = () => {
    setLoading(true);

    const data = {
        status:params[0].status==="inactive" ? "active": "inactive",
        activatedOrDeactivatedBy: userId,
        dateActivatedOrDeactivated: new Date().toISOString(),
       
    };

    if (params[0].id) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.patch(`/creators/${params[0].id}`, data);

        if (response.data.status === "success") {
          props.handleSuccessfulDeletedItemSnackbar(
            `Creator, ${params[0].name} is successfully ${params[0].status==="active" ? "Deactivated": "Activated"}!!!`
          );
          props.handleDeleteDialogOpenStatus();
          props.renderCreatorDeletedUpdateCounter();
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

  const handleNotMarkAsStatusChanged = () => {
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
            onClick={handleMarkAsStatusChanged}
          >
            Yes
          </Button>,
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={handleNotMarkAsStatusChanged}
            style={{ marginLeft: 10 }}
          >
            No
          </Button>,
        ]}
      >
        <AlertTitle>{params[0].status==='active'? "Deactivate" : "Activate"}  "{params[0].name}"  as Creator?</AlertTitle>
        Are you sure you want to  {params[0].status==='active'? "deactivate" : "activate"} this creator?
      </Alert>
    </>
  );
}

export default ActivateDeactivateCreatorForm;
