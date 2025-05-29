import React, { useState } from "react";
import { PaystackButton } from "react-paystack";
import { useDispatch } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import api from "./apis/local";
import {
  CREATE_ORDER,
  DELETE_CART,
  CREATE_TRANSACTION,
  FETCH_TRANSACTION,
} from "./actions/types";
import history from "./history";
import ThankYou from "./components/thankyou/ThankYou";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
    marginLeft: 15,
  },
  formStyles: {
    width: 600,
  },

  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 240,
    marginLeft: 70,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  offDeliveryLocationButton: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 60,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
  checkout: {
    borderRadius: 10,
    height: 40,
    width: 220,
    marginLeft: 80,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },
}));

function Paystack(props) {
  const dispatch = useDispatch();

  //console.log("this props is at paystack:", props);

  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const config = {
    reference: props.orderNumber,
    className: classes.checkout,
    email: props.email,
    amount: props.amount,
    publicKey: "pk_test_9181f2dcbb5a6bf2cf56c8f2632eaa5e2fd182cb", //wholeroof test
    //publicKey: "pk_live_5700e72ac96f8aafda7af34e76b1dcfd1b6ec8b2", //wholeroof live
  };

  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.

    if (reference.status == "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  };

  //console.log("the product list is at paystack:", props.productList);

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed paystack");
  };

  const componentProps = {
    ...config,
    text: props.text,
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  const commitDataToDatabase = () => {
    const transData = {
      orderNumber: props.data.orderNumber,
      recipientName: props.data.recipientName,
      recipientPhoneNumber: props.data.recipientPhoneNumber,
      recipientEmailAddress: props.data.recipientEmailAddress,
      totalLocalContractProcessingFee: props.data.totalLocalContractProcessingFee,
      totalInternationalContractProcessingFee: props.data.totalInternationalContractProcessingFee,
      paymentMethod: props.data.paymentMethod,
      paymentStatus: props.data.paymentStatus,
      orderedBy: props.data.orderedBy,
      status: props.data.status,
      brand:props.data.brand,
      project:props.data.project,
      totalNumberOfInfluencers:props.data.totalNumberOfInfluencers,
      
    };

    if (transData) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/transactions`, transData);

        const transId = response.data.data.data.id;

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_TRANSACTION,
            payload: response.data.data.data,
          });

           props.productList.map((cart, index) => {
            let cumulativeAgencyServiceFee = 0;
            let totalProjectCost = 0;
            if(cart.platforms.includes("facebook")){
              totalProjectCost = totalProjectCost + cart.facebookPostQuantity * cart.creator.facebookCostPerPost
            }else if(cart.platforms.includes('instagram')){
              totalProjectCost += cart.instagramPostQuantity * cart.creator.instagranCostPerPost
            }else if(cart.platforms.includes('twitter')){
              totalProjectCost += cart.twitterPostQuantity * cart.creator.twiiterCostPerPost
            }else if(cart.platforms.includes('tiktok')){
              totalProjectCost += cart.tiktokPostQuantity * cart.creator.tiktokCostPerPost
            }else if(cart.platforms.includes('linkedin')){
              totalProjectCost += cart.linkedInPostQuantity * cart.creator.linkedInCostPerPost
            }else if(cart.platforms.includes('blog')){
              totalProjectCost += cart.blogCostPerPost * cart.creator.blogCostPerPost
            }
            //computing cumulative agency service plan
            if (cart.agencyServicePlan === "platinum") {
              cumulativeAgencyServiceFee = props.policy.platinumAgencyServiceFee/100 * totalProjectCost;
            } else if (cart.agencyServicePlan === "gold") {
              cumulativeAgencyServiceFee = props.policy.goldAgencyServiceFee/100 * totalProjectCost;
            }else if (cart.agencyServicePlan === "bronze") {
              if(cart.platforms && cart.platforms.includes('facebook')){
                if(cart.creator.facebookCategory === "celebrity-influencer"){
                  cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                }else if(cart.creator.facebookCategory === "mega-influencer"){
                  cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                }else if(cart.creator.facebookCategory === "macro-influencer"){
                  cumulativeAgencyServiceFee =props.policy.macroInfluencerRecruitmentFee
                }else if(cart.creator.facebookCategory === "micro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                }else if(cart.creator.facebookCategory === "nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                }else if(cart.creator.facebookCategory === "sub-nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                }
              }
              if(cart.platforms && cart.platforms.includes('instagram')){
                if(cart.creator.instagramCategory === "celebrity-influencer"){
                  cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                }else if(cart.creator.instagramCategory === "mega-influencer"){
                  cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                }else if(cart.creator.instagramCategory === "macro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                }else if(cart.creator.instagramCategory === "micro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                }else if(cart.creator.instagramCategory === "nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                }else if(cart.creator.instagramCategory === "sub-nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                }
              }
              if(cart.platforms && cart.platforms.includes('twitter')){
                if(cart.creator.twitterCategory === "celebrity-influencer"){
                  cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                }else if(cart.creator.twitterCategory === "mega-influencer"){
                  cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                }else if(cart.creator.twitterCategory === "macro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                }else if(cart.creator.twitterCategory === "micro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                }else if(cart.creator.twitterCategory === "nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                }else if(cart.creator.twitterCategory === "sub-nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                }
              }
              if(cart.platforms && cart.platforms.includes('tiktok')){
                if(cart.creator.tiktokCategory === "celebrity-influencer"){
                  cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                }else if(cart.creator.tiktokCategory === "mega-influencer"){
                  cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                }else if(cart.creator.tiktokCategory === "macro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                }else if(cart.creator.tiktokCategory === "micro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                }else if(cart.creator.tiktokCategory === "nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                }else if(cart.creator.tiktokCategory === "sub-nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                }
              }
              if(cart.platforms && cart.platforms.includes('linkedin')){
                if(cart.creator.linkedInCategory === "celebrity-influencer"){
                  cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                }else if(cart.creator.linkedInCategory === "mega-influencer"){
                  cumulativeAgencyServiceFee =props.policy.megaInfluencerRecruitmentFee
                }else if(cart.creator.linkedInCategory === "macro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                }else if(cart.creator.linkedInCategory === "micro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                }else if(cart.creator.linkedInCategory === "nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                }else if(cart.creator.linkedInCategory === "sub-nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                }
              }
              if(cart.platforms && cart.platforms.includes('blog')){
                if(cart.creator.blogCategory === "celebrity-influencer"){
                  cumulativeAgencyServiceFee = props.policy.celebrityInfluencerRecruitmentFee
                }else if(cart.creator.blogCategory === "mega-influencer"){
                  cumulativeAgencyServiceFee = props.policy.megaInfluencerRecruitmentFee
                }else if(cart.creator.blogCategory === "macro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.macroInfluencerRecruitmentFee
                }else if(cart.creator.blogCategory === "micro-influencer"){
                  cumulativeAgencyServiceFee = props.policy.microInfluencerRecruitmentFee
                }else if(cart.creator.blogCategory === "nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.nanoInfluencerRecruitmentFee
                }else if(cart.creator.blogCategory === "sub-nano-influencer"){
                  cumulativeAgencyServiceFee = props.policy.subNanoInfluencerRecruitmentFee
                }
              }
            }

            const data = {
              orderNumber: props.data.orderNumber,
              transactionId: transId,
              creator: cart.creator.id,
              brand: cart.brand.id,
              project: cart.project.id,
              recipientName: props.data.recipientName,
              recipientPhoneNumber: props.data.recipientPhoneNumber,
              recipientEmailAddress: props.data.recipientEmailAddress,
              platforms: cart.platforms,
              currency: cart.currency.id,
              contractProcessingFee: cart.currency && cart.currency.name.toLowerCase() === "naira" ? props.policy.contractProcessingFeeForLocals : props.policy.contractProcessingFeeForNonLocals,

              agencyServicePlan: cart.agencyServicePlan,

              cartId: cart.id,
              dateAddedToCart: cart.dateAddedToCart,              
              paymentMethod: props.data.paymentMethod,
              paymentStatus: props.data.paymentStatus,
              orderedBy: props.data.orderedBy,
              //status: props.data.status,

              //cumulativeAgencyServiceFee: cumulativeAgencyServiceFee,
              facebookPostQuantity: cart.platforms && cart.platforms.includes('facebook') ?cart.facebookPostQuantity :0,
              instagramPostQuantity: cart.platforms && cart.platforms.includes('instagram') ? cart.instagramPostQuantity:0,
              twitterPostQuantity: cart.platforms && cart.platforms.includes('twitter') ? cart.twitterPostQuantity:0,
              tiktokPostQuantity: cart.platforms && cart.platforms.includes('tiktok') ? cart.tiktokPostQuantity :0,
              linkedInPostQuantity: cart.platforms && cart.platforms.includes('linkedin') ? cart.linkedInPostQuantity :0,
              blogPostQuantity: cart.platforms && cart.platforms.includes('blog') ? cart.blogPostQuantity :0,
              facebookProfileLink: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookProfileLink : "",
              instagramProfileLink: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramProfileLink : "",
              twitterProfileLink: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterProfileLink : "",
              tiktokProfileLink: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokProfileLink: "",
              linkedInProfileLink: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInProfileLink : "",
              blogSiteLink: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogSiteLink: "",

              facebookTotalFollowers: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookTotalFollowers :0,
              instagramTotalFollowers: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramTotalFollowers:0,
              twitterTotalFollowers: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterTotalFollowers:0,
              tiktokTotalFollowers: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokTotalFollowers:0,
              linkedInTotalFollowers: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInTotalFollowers:0,
              blogTotalVisitorsPerMonth: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogTotalVisitorsPerMonth:0,

              facebookEngagementRate: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookEngagementRate:0,
              instagramEngagementRate: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramEngagementRate:0,
              twitterEngagementRate: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterEngagementRate :0,
              tiktokEngagementRate: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokEngagementRate:0,
              linkedInEngagementRate: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInEngagementRate:0,

              facebookCostPerPost: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookCostPerPost :0,
              instagramCostPerPost: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramCostPerPost:0,
              twitterCostPerPost: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterCostPerPost :0,
              tiktokCostPerPost: cart.platforms && cart.platforms.includes('tiktok') ? cart.creator.tiktokCostPerPost:0,
              linkedInCostPerPost: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInCostPerPost:0,
              blogCostPerPost: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogCostPerPost:0,
              blogPostCostDuration: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogPostCostDuration:"weekly",

              facebookCategory: cart.platforms && cart.platforms.includes('facebook') ? cart.creator.facebookCategory: "",
              instagramCategory: cart.platforms && cart.platforms.includes('instagram') ? cart.creator.instagramCategory: "",
              twitterCategory: cart.platforms && cart.platforms.includes('twitter') ? cart.creator.twitterCategory: "",
              tiktokCategory: cart.platforms && cart.platforms.includes('tiktok') ?cart.creator.tiktokCategory: "",
              linkedInCategory: cart.platforms && cart.platforms.includes('linkedin') ? cart.creator.linkedInCategory: "",
              blogCategory: cart.platforms && cart.platforms.includes('blog') ? cart.creator.blogCategory: "",
              
              slug: cart.slug,
              
            };
            if (data) {
              const createForm = async () => {
                api.defaults.headers.common[
                  "Authorization"
                ] = `Bearer ${props.token}`;
                const response = await api.post(`/orders`, data);
                if (response.data.status === "success") {
                  dispatch({
                    type: CREATE_ORDER,
                    payload: response.data.data.data,
                  });
                  //setLoading(false);
                } else {
                  props.handleFailedSnackbar(
                    "Something went wrong, please try again!!!"
                  );
                }
              };
              createForm().catch((err) => {
                //props.handleFailedSnackbar();
                console.log("err:", err.message);
              });
            } else {
              //props.handleFailedSnackbar("Something went wrong, please try again!!!");
            }
          });
        } else {
          // props.handleFailedSnackbar(
          //   "Something went wrong, please try again!!!"
          // );
        }
      };
      createForm().catch((err) => {
        //props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } //end of the transdate if statement

    const cartData = {
      status: "checkedout",
    };
    //remove order from cart
    props.productList.map((cart, index) => {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        await api.delete(`/carts/${cart.id}`);
        dispatch({
          type: DELETE_CART,
          //payload: response2.data.data.data,
        });
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    });
    props.handleSuccessfulCreateSnackbar(
      `Thank you for your valued patronage. We are now moving forward with the contract process and will follow up shortly with the next steps `
    );
    history.push("/thankyou");
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
      {isSuccess}
      {isSuccess && commitDataToDatabase()}
    </div>
  );
}

export default Paystack;
