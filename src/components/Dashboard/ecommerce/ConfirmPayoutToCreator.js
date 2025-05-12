import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { Alert, AlertTitle } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import api from "./../../../apis/local";
//import { DELETE_ASSESSOR } from "../../../actions/types";

function ConfirmPayoutToCreator(props) {
  const { params, token, userId } = props;
  const [loading, setLoading] = useState(false);
  const [platformRate, setPlatformRate] = useState();
   const [minimumPlatformCharge, setMinimumPlatformCharge] = useState();
  const [vat, setVat] = useState();
  const [policyId, setPolicyId] = useState();
  const [platformRateIsIncludedAsPartOfUserInputedAmount, setPlatformRateIsIncludedAsPartOfUserInputedAmount] = useState();
  const [vatIsIncludedAsPartOfUserInputedAmount, setVatIsIncludedAsPartOfUserInputedAmount] = useState();
     

  const dispatch = useDispatch();


  useEffect(() => {
              const fetchData = async () => {
                let allData = {};
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const response = await api.get(`/policies`);
                const workingData = response.data.data.data;
                    
               
               if(workingData.length > 0){
                
         
                setPlatformRate(workingData[0].platformRate);
                setMinimumPlatformCharge(workingData[0].minimumPlatformCharge);
                setVat(workingData[0].vat);
                setPlatformRateIsIncludedAsPartOfUserInputedAmount(workingData[0].platformRateIsIncludedAsPartOfUserInputedAmount);
                setVatIsIncludedAsPartOfUserInputedAmount(workingData[0].vatIsIncludedAsPartOfUserInputedAmount);
                setPolicyId(workingData[0]._id);
                setLoading(false);
                
                }else{
                  setLoading(false);
               }
                
              };
          
              //call the function
          
              fetchData().catch(console.error);
            }, []);


            let totalAmountReceived = 0;
            let amountToCreator = 0;
            let amountToPlatform = 0;  
            let vatAmount = 0;
            
                totalAmountReceived = (params[0].orderedCreativePricePerUnit * params[0].orderedCreativeQuantity) + params[0].orderedHookPricePerUnit * params[0].orderedHookQuantity;
                amountToCreator = (1-platformRate/100) * totalAmountReceived;
                amountToPlatform = (platformRate/100) * totalAmountReceived;
                vatAmount = (vat/100) * totalAmountReceived;       


               
  const handleMarkAsPaid = () => {
    setLoading(true);

    const data = {
        order:params[0].id,
        brand: params[0].brand[0].id,
        creator: params[0].creator.id,
        platformReceipt:amountToPlatform,
        creatorReceipt:amountToCreator,
        vatReceipt:vatAmount,
        paymentCurrency: params[0].productCurrency.id,
        paymentConfirmedBy: userId,
        paymentConfirmedDate: new Date().toISOString(),
        paymentStatus: "paid",
        paymentMethod: "bank-transfer",
        prevailingPlatformRate: platformRate,
        prevailingVatRate: vat,
        prevailingMinimumPlatformRate: minimumPlatformCharge,
        prevailingPlatformRateIsIncludedAsPartOfUserInputedAmount: platformRateIsIncludedAsPartOfUserInputedAmount,
        prevailingVatIsIncludedAsPartOfUserInputedAmount: vatIsIncludedAsPartOfUserInputedAmount,
        refNumber:  "PAID" + "-" + Math.floor(Math.random() * 100000000) + "-" + "TOPCREATOR"
        
    };

    const data2={
        paymentStatus:"paid",
        status:"project-completed",
    }

    

    if (data) {
      const editForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await api.post(`/payments/`, data);

        if (response.data.status === "success") {
          props.handleSuccessfulDeletedItemSnackbar(
            `Payout of =N=${amountToCreator.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")} is successfully made to ${params[0].creator.name}, a creator!!!`
          );

          //edit the order status to project-completed
          const response2 = await api.patch(`/orders/${params[0].id}`, data2);
         
          props.handleDeleteDialogOpenStatus();


          props.renderProjectDeletedUpdateCounter();
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
            onClick={handleMarkAsPaid}
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
        <AlertTitle>Confirm Payment of  "&#8358;{amountToCreator.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}" to  {params[0].creator.name}, a creator "</AlertTitle>
        Are you sure you want to confirm that this payment had been made to this creator?
      </Alert>
    </>
  );
}

export default ConfirmPayoutToCreator;
