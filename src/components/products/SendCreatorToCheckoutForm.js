import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import { TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import api from "../../apis/local";
import { CREATE_CART, EDIT_CART, DELETE_CART } from "../../actions/types";
import history from "../../history";
import { FaBullseye } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: 600,
  },
  formStyles: {
    width: 600,
  },
  submitButton: {
    borderRadius: 10,
    height: 40,
    width: 200,
    marginLeft: 80,
    marginTop: 30,
    marginBottom:30,
    color: "white",
    backgroundColor: theme.palette.common.green,
    "&:hover": {
      backgroundColor: theme.palette.common.green,
    },
  },

  submitToCartButton: {
    borderRadius: 10,
    height: 40,
    width: 150,
    marginLeft: 110,
    marginTop: 30,
    color: "white",
    backgroundColor: theme.palette.common.grey,
    "&:hover": {
      backgroundColor: theme.palette.common.grey,
    },
  },
}));

const renderRequestedQuantityField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  min,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={`${helperText} `} 
      variant="outlined"
      label={label}
      id={input.name}
      //value={input.value}
      fullWidth
      //required
      type={type}
      //defaultValue={quantity}
      {...custom}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: min,
          style: {
            height: 1,
          },
        },
        //readOnly: true,
      }}
    />
  );
};


const renderRequestedHookQuantityField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    helperText,
    min,
    id,
    ...custom
  }) => {
    return (
      <TextField
        //error={touched && invalid}
        helperText={`${helperText} We recommend adding at least 2 more hooks, for optimal performance.`} 
        variant="outlined"
        label={label}
        id={input.name}
        //value={input.value}
        fullWidth
        //required
        type={type}
        //defaultValue={quantity}
        {...custom}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: min,
            style: {
              height: 1,
            },
          },
          //readOnly: true,
        }}
      />
    );
  };

const renderSingleLineField = ({
  input,
  label,
  meta: { touched, error, invalid },
  type,
  helperText,
  defaultValue,
  readOnly,
  min,
  id,
  ...custom
}) => {
  return (
    <TextField
      //error={touched && invalid}
      helperText={helperText}
      variant="outlined"
      label={label}
      id={input.name}
      defaultValue={defaultValue}
      //value={input.value}
      fullWidth
      //required
      type={type}
      {...custom}
      //disabled
      // defaultValue={`${minimumQuantity}`}
      onChange={input.onChange}
      InputProps={{
        inputProps: {
          min: min,
          style: {
            height: 1,
          },
        },
        readOnly:readOnly
      }}
    />
  );
};

function SendCreatorToCheckoutForm(props) {
  const { 
    brandId, 
    brandName,
    brandCountry,
    creatorId,
    videoPrice, 
    soundPrice, 
    videoHookPrice, 
    soundHookPrice, 
    categoryCode,
    categoryName, 
    videoDeliveryDays,
    soundDeliveryDays,
    token, 
    userId } = props;
  const [quantity, setQuantity] = useState(0);
  const [hookQuantity, setHookQuantity] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);
  const [newHookQuantity, setNewHookQuantity] = useState(0);
  const [price, setPrice] = useState();
  const [audioPrice, setAudioPrice] = useState();
  const [hookPrice, setHookPrice] = useState();
  const [audioHookPrice,setAudioHookPrice] = useState();
  const [productQuantityInCart, setProductQuantityInCart] = useState();
  const [productLocation, setProductLocation] = useState();
  const [productLocationCountry, setProductLocationCountry] = useState();
  const [cartHolder, setCartHolder] = useState();
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [cartId, setCartId] = useState();
  const [total, setTotal] = useState();
  const [computedTotal, setComputedTotal] = useState(0);
  const [hookTotal, setHookTotal] = useState();
  const [computedHookTotal, setComputedHookTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0)
  const [projectsList, setProjectsList] = useState([]);
  const [project, setProject] = useState();
  const [projectType, setProjectType] = useState();
  const [projectLanguage, setProjectLanguage] = useState();
  const [projectLanguageId, setProjectLanguageId] = useState()
  const [cartForCheckoutList, setCartForCheckoutList] = useState([]);
  const [sameProductAlreadyInCart, setSameProductAlreadyInCart] =
    useState(false);
  const [isCreatorSkillSuitableForProject, setIsCreatorSkillSuitableForProject] = useState(false);
  const [preferredCreatorLanguages, setPreferredCreatorLanguages] = useState([]);
  const [willUseFacebook, setWillUseFacebook] = useState(false);
  const [willUseInstagram, setWillUseInstagram] = useState(false);
  const [willUseTiktok, setWillUseTiktok] = useState(false);
  const [willUseTwitter, setWillUseTwitter] = useState(false);
  const [willUseLinkedIn, setWillUseLinkedIn] = useState(false);
  const [willUseBlog, setWillUseBlog] = useState(false);
  const [agencyServicePlan, setAgencyServicePlan] = useState("bronze");

    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    const matchesMDUp = useMediaQuery(theme.breakpoints.up("md"));

  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(quantity);
    setHookQuantity(hookQuantity)
    setPrice(videoPrice);
    setHookPrice(videoHookPrice);
    setAudioPrice(soundPrice);
    setAudioHookPrice(soundHookPrice)
    // setHookPrice(projectType === 'video' ? videoHookPrice:soundHookPrice)
  }, [props, quantity,hookQuantity]);

  useEffect(() => {
    if (!quantity || !hookQuantity) {
      return;
    }
    if (!price || !audioPrice || !hookPrice || !soundHookPrice) {
      return;
    }
    
if(projectType === "video"){
    setTotal(0)
    const sum = ((+quantity * +price) )
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      setTotal(sum);
      const grand = +quantity * +price
      setComputedTotal(grand)
}else if(projectType === "audio"){
    setTotal(0)
    const sum = ((+quantity * +audioPrice))
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

    setTotal(sum);
    const grand = +quantity * +audioPrice;
    setComputedTotal(grand)
}


//for hooks
if(projectType === "video"){
    setHookTotal(0)
    const sum = ((+hookQuantity * +hookPrice) )
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      setHookTotal(sum);
      const grand = +hookQuantity * +hookPrice;
      setComputedHookTotal(grand);
     
        
}else if(projectType === "audio"){
    setHookTotal(0)
    const sum = ((+hookQuantity * +soundHookPrice))
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      setHookTotal(sum);
      const grand = +hookQuantity * +soundHookPrice;
      setComputedHookTotal(grand);
     
}
   
  }, [quantity, price,audioPrice,hookQuantity,hookPrice,soundHookPrice,projectType,categoryCode]);



  //get the grand tota;l
  useEffect(() => {
    const fetchData = async () => {
      let allLangData=[];
      if(projectType ==='video'){
        if(categoryCode === 'video-only-creators' || categoryCode ==='video-and-audio-creators'){
          setIsCreatorSkillSuitableForProject(true)
        }else{
          setIsCreatorSkillSuitableForProject(false)
        }
      }
      if(projectType ==='audio'){
        if(categoryCode === 'audio-only-creators' || categoryCode ==='video-and-audio-creators'){
          setIsCreatorSkillSuitableForProject(true)
        }else{
          setIsCreatorSkillSuitableForProject(false)
        }
      }
     
      {props.creator.languages.map((lang, index) => (
        allLangData.push(lang.id)
       

      ))}
      
      const sum = computedTotal + computedHookTotal;
      setGrandTotal(sum);
      setPreferredCreatorLanguages(allLangData)
    };

    //call the function

    fetchData().catch(console.error);
  }, [computedTotal,computedHookTotal,projectType,categoryCode,projectLanguageId]);


   
  const classes = useStyles();
  // const [total, setTotal] = useState(
  //   price
  //     ? (
  //     : 0
  // );
  const [loading, setLoading] = useState();
  const [isLoading, setIsLoading] = useState();



  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          status: "marked-for-checkout",
        },
      });

      const item = response.data.data.data;
      item.map((product) => {
        allData.push({
          id: product._id,
          //quantity: product.quantity,
          cartHolder: product.cartHolder,
          //salesPreference: product.salesPreference,
        });
      });

      setCartForCheckoutList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, [userId]);

  //get the currency name
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
      const response = await api.get(`/carts`, {
        params: {
          cartHolder: userId,
          //productLocation: location,
          product: brandId,
        },
      });

      const item = response.data.data.data;

      allData.push({
        id: item[0]._id,
        quantity: item[0].quantity,
        // location: item[0].productLocation,
        // locationCountry: item[0].locationCountry,
        cartHolder: item[0].cartHolder,
      });

      if (allData[0].quantity) {
        setProductQuantityInCart(allData[0].quantity);
      }

      if (allData[0].cartHolder) {
        setCartHolder(allData[0].cartHolder);
      }

      setSameProductAlreadyInCart(true);
      if (allData[0].id) {
        setCartId(allData[0].id);
      }
    };

    //call the function

    fetchData().catch(console.error);
  }, []);


  //get all brand new projects
  useEffect(() => {
      const fetchData = async () => {
        let allData = [];
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.get(`/projects`,
            {
                params:{
                    brand:brandId, 
                    status:"new"
                }
            });
        const workingData = response.data.data.data;
        workingData.map((project) => {
          allData.push({ 
            id: project._id,
            name: project.name, 
            
        });
        });
        setProjectsList(allData);
        
      };
  
      //call the function
  
      fetchData().catch(console.error);
    }, [brandId]);

    
    useEffect(() => {
        const fetchData = async () => {
          let allData = [];
          api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
          const response = await api.get(`/projects/${project}`);
          const workingData = response.data.data.data;
          
        if(workingData){
            setProjectType(workingData.type);
            setProjectLanguage(workingData.language[0].language);
            setProjectLanguageId(workingData.language[0].id)
        }
          
        };
    
        //call the function
    
        fetchData().catch(console.error);
      }, [project]);

      

    const handleProjectChange = (event) => {
        setProject(event.target.value);
        setQuantity(0);
        setTotal(0);
        setNewHookQuantity(0);
        setHookTotal(0);
        setHookQuantity(0);
        setComputedTotal(0);
        setComputedHookTotal(0);
        setGrandTotal(0);

        
      };
    
      
    
      //get the brand'sprojects list
      const renderProjectsList = () => {
        return projectsList.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          );
        });
      };

    

  const onQuantityChange = (e) => {
   setTotal(0);
    const newQuantity = parseFloat(e.target.value);

    const newTotal = newQuantity * parseFloat(price);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    setComputedTotal(newTotal);
    setNewQuantity(newQuantity);
    //setHookQuantity(0);
  };

  const onSoundQuantityChange = (e) => {
    setTotal(0);
    const newQuantity = parseFloat(e.target.value);

    const newTotal = newQuantity * parseFloat(audioPrice);
    setTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    setComputedTotal(newTotal);
    setNewQuantity(newQuantity);
    //setHookQuantity(0);
    
  };

  const onHookQuantityChange = (e) => {
    const newQuantity = parseFloat(e.target.value);
    
    const newTotal = newQuantity * parseFloat(hookPrice);
    setHookTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    setComputedHookTotal(newTotal);
    setHookQuantity(newQuantity);
  };

  const onSoundHookQuantityChange = (e) => {
    const newQuantity = parseFloat(e.target.value);
   
    const newTotal = newQuantity * parseFloat(soundHookPrice);
    setHookTotal(newTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    setComputedHookTotal(newTotal);
    setHookQuantity(newQuantity);
  };

  const handleWillUseFacebookChange = (event) => {  
    setWillUseFacebook(event.target.value);
  };


  const handleWillUseInstagramChange = (event) => {
    setWillUseInstagram(event.target.value);
  };

  const handleWillUseTwitterChange = (event) => {
    setWillUseTwitter(event.target.value);
  };

  const handleWillUseTiktokChange = (event) => {
    setWillUseTiktok(event.target.value);
  };

  const handleWillUseLinkedInChange = (event) => {
    setWillUseLinkedIn(event.target.value);
  };
  

  const handleWillUseBlogChange = (event) => {
    setWillUseBlog(event.target.value);
  };

  const handleAgencyServicePlanChange = (event) => {
    setAgencyServicePlan(event.target.value);
  };

  const renderProjectField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="project"
              id="project"
              value={project}
              onChange={handleProjectChange}
              // label="User"
              style={{ marginTop: 10, width: matchesMDUp ? 360 : 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              {renderProjectsList()}
            </Select>
            <FormHelperText>Select Your Campaign Project(Or Create a new one in your Dashboard)</FormHelperText>
          </FormControl>
        </Box>
      );
    };

  const renderTotalField = ({
    input,
    label,
    meta: { touched, error, invalid },
    type,
    id,
    ...custom
  }) => {
    return (
      <TextField
        error={touched && invalid}
        //placeholder="category description"
        variant="outlined"
        helperText="Amount"
        label={label}
        id={input.name}
        name={input.name}
        value={grandTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        fullWidth
        type={type}
        style={{ marginTop: 3, width: 240 }}
        onChange={input.onChange}
        InputProps={{
          inputProps: {
            min: 1,
            style: {
              height: 38,
              fontSize: "2em",
            },
            readOnly: true,
          },
        }}
      />
    );
  };


   const renderWillUseFacebookField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="willUseFacebook"
              id="willUseFacebook"
              value={willUseFacebook}
              onChange={handleWillUseFacebookChange}
              // label="User"
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Will Facebook Platform Be Used In This Campaign?</FormHelperText>
          </FormControl>
        </Box>
      );
    };

    const renderWillUseInstagramField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="willUseInstagram"
              id="willUseInstagram"
              value={willUseInstagram}
              onChange={handleWillUseInstagramChange}
              // label="User"
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Will Instagram Platform Be Used In This Campaign?</FormHelperText>
          </FormControl>
        </Box>
      );
    };



    const renderWillUseTwitterField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="willUseTwitter"
              id="willUseTwitter"
              value={willUseTwitter}
              onChange={handleWillUseTwitterChange}
              // label="User"
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Will Twitter Platform Be Used In This Campaign?</FormHelperText>
          </FormControl>
        </Box>
      );
    };



    const renderWillUseTiktokField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="willUseTiktok"
              id="willUseTiktok"
              value={willUseTiktok}
              onChange={handleWillUseTiktokChange}
              // label="User"
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Will Tiktok Platform Be Used In This Campaign?</FormHelperText>
          </FormControl>
        </Box>
      );
    };


    const renderWillUseLinkedinField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="willUseLinkedIn"
              id="willUseLinkedIn"
              value={willUseLinkedIn}
              onChange={handleWillUseLinkedInChange}
              // label="User"
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Will LinkedIn Platform Be Used In This Campaign?</FormHelperText>
          </FormControl>
        </Box>
      );
    };



     const renderWillUseBlogField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="willUseBlog"
              id="willUseBlog"
              value={willUseBlog}
              onChange={handleWillUseBlogChange}
              // label="User"
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
            <FormHelperText>Will Blog Site Be Used In This Campaign?</FormHelperText>
          </FormControl>
        </Box>
      );
    };



    const renderAgencyServicePlanField = ({
      input,
      label,
      meta: { touched, error, invalid },
      type,
      id,
      ...custom
    }) => {
      return (
        <Box>
          <FormControl variant="outlined">
            {/* <InputLabel id="vendor_city">City</InputLabel> */}
            <Select
              labelId="agencyServicePlan"
              id="agencyServicePlan"
              value={agencyServicePlan}
              onChange={handleAgencyServicePlanChange}
              // label="User"
              style={{ marginTop: 10, width: matchesMDUp ? 360 : 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              <MenuItem value={"bronze"}>Bronze</MenuItem>
              <MenuItem value={"gold"}>Gold</MenuItem>
               <MenuItem value={"platinum"}>Platinum</MenuItem>
            </Select>
            <FormHelperText>Choose Your Preferred Agency Service Plan</FormHelperText>
          </FormControl>
        </Box>
      );
    };

  
  const buttonContent = () => {
    return <React.Fragment>Add to Collection</React.Fragment>;
  };




  const selectedPlatforms = [];
  if(willUseFacebook){
    selectedPlatforms.push('facebook')
  }
  if(willUseInstagram){
    selectedPlatforms.push('instagram')
  }

  if(willUseTiktok){
    selectedPlatforms.push('tiktok')
  }
  if(willUseTwitter){
    selectedPlatforms.push('twitter')
  }
  if(willUseLinkedIn){
    selectedPlatforms.push('linkedin')
  }
  if(willUseBlog){
    selectedPlatforms.push('blog')
  }

  

   const onSubmit = (formValues) => {
    setLoading(true);

   if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);

      return;
    }    
    

    if (!project) {
      props.handleFailedSnackbar("Please select a campaign project. As a Brand, you can always create new projects in your dashboard");
      setLoading(false);

      return;
    }

    if(!preferredCreatorLanguages.includes(projectLanguageId)){
      props.handleFailedSnackbar("This influencer does not work with the language required for this project. Please select another influencer and try again");
      setLoading(false);

      return;
    }

    
     

    let data = {
      creator: creatorId,
      brand: brandId,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "INFLUENCER-" + Math.floor(Math.random() * 1000000000) + "-SOCIAL",

      project: project,
      creativeLanguage: projectLanguageId,
      cartHolder: props.userId,
      isDeleted: false,
      currency: props.currency ? props.currency[0].id : "",
      status: "unmarked-for-checkout",   
      slug: props.creator.slug,
      creatorImage: props.image,
      agencyServicePlan:agencyServicePlan,
      facebookPostQuantity:willUseFacebook ? formValues.facebookPostQuantity:0,
      instagramPostQuantity:willUseInstagram ? formValues.instagramPostQuantity:0,
      tiktokPostQuantity:willUseTiktok ? formValues.tiktokPostQuantity:0,
      twitterPostQuantity:willUseTwitter ? formValues.twitterPostQuantity:0,
      linkedInPostQuantity:willUseLinkedIn ? formValues.linkedinPostQuantity:0,
      blogPostQuantity:willUseBlog ? formValues.blogPostQuantity:0,
      //platforms: selectedPlatforms.map((platform) => platform),
      platforms: selectedPlatforms
    
      
    };

    

   
      //delete all items in this user's cart
      // cartForCheckoutList.map((cart, index) => {
      //   const createForm = async () => {
      //     api.defaults.headers.common[
      //       "Authorization"
      //     ] = `Bearer ${props.token}`;
      //     await api.delete(`/carts/${cart.id}`);
      //     dispatch({
      //       type: DELETE_CART,
      //       //payload: response2.data.data.data,
      //     });
      //     //props.cartCounterHandler(-1);
      //   };
      //   createForm().catch((err) => {
      //     //props.handleFailedSnackbar();
      //     console.log("err:", err.message);
      //   });
      // });
    
       

   
    //create a new cart and add the product
    if (data) {
      const createForm = async () => {
        api.defaults.headers.common["Authorization"] = `Bearer ${props.token}`;
        const response = await api.post(`/carts`, data);

    

        if (response.data.status === "success") {
          dispatch({
            type: CREATE_CART,
            payload: response.data.data.data,
          });

          props.handleSuccessfulCreateSnackbar(
            `Influencer successfully added to Collection. Please visit Your Collections to continue to checkout and contract initiation`
          );
          props.cartCounterHandler(1);
          history.push("/");
          setLoading(false);
        } else {
          props.handleFailedSnackbar(
            "Something went wrong, please try again!!!"
          );
        }
      };
      createForm().catch((err) => {
        props.handleFailedSnackbar();
        console.log("err:", err.message);
      });
    } else {
      props.handleFailedSnackbar("Something went wrong, please try again!!!");
    }
  };

  // computing influencer category
  let facebookInfluencerCategory = "";
  if(props.creator.platforms && props.creator.platforms.includes('facebook')){
    if(props.creator.facebookCategory === 'celebrity-influencers'){
      facebookInfluencerCategory = "Celebrity Influencer";
    }else if(props.creator.facebookCategory === 'micro-influencers'){
      facebookInfluencerCategory = "Micro Influencer";
    }else if(props.creator.facebookCategory === 'macro-influencers'){
      facebookInfluencerCategory = "Macro Influencer";
    }else if(props.creator.facebookCategory === 'mega-influencers'){
      facebookInfluencerCategory = "Mega Influencer";
    }else if(props.creator.facebookCategory === 'nano-influencers'){
      facebookInfluencerCategory = "Nano Influencer";
    }else if(props.creator.facebookCategory === 'sub-nano-influencers'){
      facebookInfluencerCategory = "Sub Nano Influencer";
    }


  }else{
    facebookInfluencerCategory = "Not Specified";
  }

  //computing the instagram influencer category
  let instagramInfluencerCategory = "";
  if(props.creator.platforms && props.creator.platforms.includes('instagram')){
    if(props.creator.instagramCategory === 'celebrity-influencers'){
      instagramInfluencerCategory = "Celebrity Influencer";
    }else if(props.creator.instagramCategory === 'micro-influencers'){
      instagramInfluencerCategory = "Micro Influencer";
    }else if(props.creator.instagramCategory === 'macro-influencers'){
      instagramInfluencerCategory = "Macro Influencer";
    }else if(props.creator.instagramCategory === 'mega-influencers'){
      instagramInfluencerCategory = "Mega Influencer";
    }else if(props.creator.instagramCategory === 'nano-influencers'){
      instagramInfluencerCategory = "Nano Influencer";
    }else if(props.creator.instagramCategory === 'sub-nano-influencers'){
      instagramInfluencerCategory = "Sub Nano Influencer";
    }
  }
  else{
    instagramInfluencerCategory = "Not Specified";
  }

  //computing the tiktok influencer category
  let tiktokInfluencerCategory = "";
  if(props.creator.platforms && props.creator.platforms.includes('tiktok')){
    if(props.creator.tiktokCategory === 'celebrity-influencers'){
      tiktokInfluencerCategory = "Celebrity Influencer";
    }else if(props.creator.tiktokCategory === 'micro-influencers'){
      tiktokInfluencerCategory = "Micro Influencer";
    }else if(props.creator.tiktokCategory === 'macro-influencers'){
      tiktokInfluencerCategory = "Macro Influencer";
    }else if(props.creator.tiktokCategory === 'mega-influencers'){
      tiktokInfluencerCategory = "Mega Influencer";
    }else if(props.creator.tiktokCategory === 'nano-influencers'){
      tiktokInfluencerCategory = "Nano Influencer";
    }else if(props.creator.tiktokCategory === 'sub-nano-influencers'){
      tiktokInfluencerCategory = "Sub Nano Influencer";
    }
  }
  else{
    tiktokInfluencerCategory = "Not Specified";
  }

  //computing the twitter influencer category
  let twitterInfluencerCategory = "";
  if(props.creator.platforms && props.creator.platforms.includes('twitter')){
    if(props.creator.twitterCategory === 'celebrity-influencers'){
      twitterInfluencerCategory = "Celebrity Influencer";
    }else if(props.creator.twitterCategory === 'micro-influencers'){
      twitterInfluencerCategory = "Micro Influencer";
    }else if(props.creator.twitterCategory === 'macro-influencers'){
      twitterInfluencerCategory = "Macro Influencer";
    }else if(props.creator.twitterCategory === 'mega-influencers'){
      twitterInfluencerCategory = "Mega Influencer";
    }else if(props.creator.twitterCategory === 'nano-influencers'){
      twitterInfluencerCategory = "Nano Influencer";
    }else if(props.creator.twitterCategory === 'sub-nano-influencers'){
      twitterInfluencerCategory = "Sub Nano Influencer";
    }
  }
  else{
    twitterInfluencerCategory = "Not Specified";
  }


  //computing linkedin influencer category
  let linkedinInfluencerCategory = "";
  if(props.creator.platforms && props.creator.platforms.includes('linkedin')){
    if(props.creator.linkedInCategory === 'celebrity-influencers'){
      linkedinInfluencerCategory = "Celebrity Influencer";
    }else if(props.creator.linkedInCategory === 'micro-influencers'){
      linkedinInfluencerCategory = "Micro Influencer";
    }else if(props.creator.linkedInCategory === 'macro-influencers'){
      linkedinInfluencerCategory = "Macro Influencer";
    }else if(props.creator.linkedInCategory === 'mega-influencers'){
      linkedinInfluencerCategory = "Mega Influencer";
    }else if(props.creator.linkedInCategory === 'nano-influencers'){
      linkedinInfluencerCategory = "Nano Influencer";
    }else if(props.creator.linkedInCategory === 'sub-nano-influencers'){
      linkedinInfluencerCategory = "Sub Nano Influencer";
    }
  }
  else{
    linkedinInfluencerCategory = "Not Specified";
  }


  //compute the blog influencer category

  let blogInfluencerCategory = "";
  if(props.creator.platforms && props.creator.platforms.includes('blog')){
    if(props.creator.blogCategory === 'celebrity-influencers'){
      blogInfluencerCategory = "Celebrity Influencer";
    }else if(props.creator.blogCategory === 'micro-influencers'){
      blogInfluencerCategory = "Micro Influencer";
    }else if(props.creator.blogCategory === 'macro-influencers'){
      blogInfluencerCategory = "Macro Influencer";
    }else if(props.creator.blogCategory === 'mega-influencers'){
      blogInfluencerCategory = "Mega Influencer";
    }else if(props.creator.blogCategory === 'nano-influencers'){
      blogInfluencerCategory = "Nano Influencer";
    }else if(props.creator.blogCategory === 'sub-nano-influencers'){
      blogInfluencerCategory = "Sub Nano Influencer";
    }
  }
  else{
    blogInfluencerCategory = "Not Specified";
  }


 

  return (
    <form id="sendCreatorToCheckoutForm">
      <Box
        sx={{
          //width: 450,
          width:matchesMDUp ? 450 : 300,
          marginLeft:10,
          marginRight:10,
          //height: 450,
        }}
        noValidate
        autoComplete="off"
      >
        {props.creator.platforms && props.creator.platforms.includes('facebook') && <Typography style={{width:matchesMDUp ? 350:300,marginTop:10, backgroundColor:"#90D1CA", fontSize:18, fontWeight:700}}><strong>Influencer Facebook Details:</strong></Typography>}  
        {props.creator.platforms && props.creator.platforms.includes('facebook') &&<Typography style={{marginTop:10}} ><strong>Influencer Category:</strong> {facebookInfluencerCategory}</Typography>}
         {props.creator.platforms && props.creator.platforms.includes('facebook') &&<Typography><strong>Total Followers:</strong> {props.creator.facebookTotalFollowers.toLocaleString()}</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('facebook') &&<Typography><strong>Engagement Rate:</strong> {props.creator.facebookEngagementRate}%</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('facebook') &&<Typography><strong>Profile Link:</strong>  <a href={props.creator.facebookProfileLink} target="_blank">{props.creator.facebookProfileLink}</a></Typography>}
           {props.creator.platforms && props.creator.platforms.includes('facebook') && props.creator.currency && props.creator.currency[0].name.toLowerCase()==='naira' && <Typography><strong>Cost Per Post: </strong>&#8358;{props.creator.facebookCostPerPost.toLocaleString()}</Typography>}
           {props.creator.platforms && props.creator.platforms.includes('facebook') && props.creator.currency && props.creator.currency[0].name.toLowerCase()!=='naira' && <Typography><strong>Cost Per Post: </strong>&#36;{props.creator.facebookCostPerPost.toLocaleString()}</Typography>}

           {props.creator.platforms && props.creator.platforms.includes('instagram') && <Typography style={{width: matchesMDUp ? 350 :300,marginTop:10, backgroundColor:"#90D1CA", fontSize:18, fontWeight:700}}><strong>Influencer Instagram Details:</strong></Typography>}  
        {props.creator.platforms && props.creator.platforms.includes('instagram') &&<Typography style={{marginTop:10}} ><strong>Influencer Category:</strong> {instagramInfluencerCategory}</Typography>}
         {props.creator.platforms && props.creator.platforms.includes('instagram') &&<Typography><strong>Total Followers:</strong> {props.creator.instagramTotalFollowers.toLocaleString()}</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('instagram') &&<Typography><strong>Engagement Rate:</strong> {props.creator.instagramEngagementRate}%</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('instagram') &&<Typography><strong>Profile Link:</strong>  <a href={props.creator.instagramProfileLink} target="_blank">{props.creator.instagramProfileLink}</a></Typography>}
           {props.creator.platforms && props.creator.platforms.includes('instagram') && props.creator.currency[0].name.toLowerCase()==='naira' && <Typography><strong>Cost Per Post: </strong>&#8358;{props.creator.instagramCostPerPost.toLocaleString()}</Typography>}
           {props.creator.platforms && props.creator.platforms.includes('instagram') && props.creator.currency[0].name.toLowerCase()!=='naira' &&<Typography><strong>Cost Per Post: </strong>&#36;{props.creator.instagramCostPerPost.toLocaleString()}</Typography>}


           {props.creator.platforms && props.creator.platforms.includes('tiktok') && <Typography style={{width:matchesMDUp ? 350:300,marginTop:10, backgroundColor:"#90D1CA", fontSize:18, fontWeight:700}}><strong>Influencer Tiktok Details:</strong></Typography>}  
        {props.creator.platforms && props.creator.platforms.includes('tiktok') &&<Typography style={{marginTop:10}} ><strong>Influencer Category:</strong> {tiktokInfluencerCategory}</Typography>}
         {props.creator.platforms && props.creator.platforms.includes('tiktok') &&<Typography><strong>Total Followers:</strong> {props.creator.tiktokTotalFollowers.toLocaleString()}</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('tiktok') &&<Typography><strong>Engagement Rate:</strong> {props.creator.tiktokEngagementRate}%</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('tiktok') &&<Typography><strong>Profile Link:</strong>  <a href={props.creator.tiktokProfileLink} target="_blank">{props.creator.tiktokProfileLink}</a></Typography>}
           {props.creator.platforms && props.creator.platforms.includes('tiktok') && props.creator.currency[0].name.toLowerCase()==='naira' &&<Typography><strong>Cost Per Post: </strong>&#8358;{props.creator.tiktokCostPerPost.toLocaleString()}</Typography>}
           {props.creator.platforms && props.creator.platforms.includes('tiktok') && props.creator.currency[0].name.toLowerCase()!=='naira' &&<Typography><strong>Cost Per Post: </strong>&#36;{props.creator.tiktokCostPerPost.toLocaleString()}</Typography>}


            {props.creator.platforms && props.creator.platforms.includes('twitter') && <Typography style={{width:matchesMDUp? 350:300,marginTop:10, backgroundColor:"#90D1CA", fontSize:18, fontWeight:700}}><strong>Influencer Twitter(X) Details:</strong></Typography>}  
        {props.creator.platforms && props.creator.platforms.includes('twitter') &&<Typography style={{marginTop:10}} ><strong>Influencer Category:</strong> {twitterInfluencerCategory}</Typography>}
         {props.creator.platforms && props.creator.platforms.includes('twitter') &&<Typography><strong>Total Followers:</strong> {props.creator.twitterTotalFollowers.toLocaleString()}</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('twitter') &&<Typography><strong>Engagement Rate:</strong> {props.creator.twitterEngagementRate}%</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('twitter') &&<Typography><strong>Profile Link:</strong>  <a href={props.creator.twitterProfileLink} target="_blank">{props.creator.twitterProfileLink}</a></Typography>}
           {props.creator.platforms && props.creator.platforms.includes('twitter') &&props.creator.currency[0].name.toLowerCase()==='naira' &&<Typography><strong>Cost Per Post: </strong>&#8358;{props.creator.twitterCostPerPost.toLocaleString()}</Typography>}
           {props.creator.platforms && props.creator.platforms.includes('twitter') &&props.creator.currency[0].name.toLowerCase()!=='naira' &&<Typography><strong>Cost Per Post: </strong>&#36;{props.creator.twitterCostPerPost.toLocaleString()}</Typography>}


            {props.creator.platforms && props.creator.platforms.includes('linkedin') && <Typography style={{width: matchesMDUp ? 350:300,marginTop:10, backgroundColor:"#90D1CA", fontSize:18, fontWeight:700}}><strong>Influencer LinkedIn Details:</strong></Typography>}  
        {props.creator.platforms && props.creator.platforms.includes('linkedin') &&<Typography style={{marginTop:10}} ><strong>Influencer Category:</strong> {linkedinInfluencerCategory}</Typography>}
         {props.creator.platforms && props.creator.platforms.includes('linkedin') &&<Typography><strong>Total Followers:</strong> {props.creator.linkedInTotalFollowers.toLocaleString()}</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('linkedin') &&<Typography><strong>Engagement Rate:</strong> {props.creator.linkedInEngagementRate}%</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('linkedin') &&<Typography><strong>Profile Link:</strong>  <a href={props.creator.linkedInProfileLink} target="_blank">{props.creator.linkedInProfileLink}</a></Typography>}
           {props.creator.platforms && props.creator.platforms.includes('linkedin') && props.creator.currency[0].name.toLowerCase()==='naira' &&<Typography><strong>Cost Per Post: </strong>&#8358;{props.creator.linkedInCostPerPost.toLocaleString()}</Typography>}
           {props.creator.platforms && props.creator.platforms.includes('linkedin') && props.creator.currency[0].name.toLowerCase()!=='naira' &&<Typography><strong>Cost Per Post: </strong>&#36;{props.creator.linkedInCostPerPost.toLocaleString()}</Typography>}


            {props.creator.platforms && props.creator.platforms.includes('blog') && <Typography style={{width: matchesMDUp ? 350:300,marginTop:10, backgroundColor:"#90D1CA", fontSize:18, fontWeight:700}}><strong>Influencer Blog Details:</strong></Typography>}  
        {props.creator.platforms && props.creator.platforms.includes('blog') &&<Typography style={{marginTop:10}} ><strong>Influencer Category:</strong> {blogInfluencerCategory}</Typography>}
         {props.creator.platforms && props.creator.platforms.includes('blog') &&<Typography><strong>Average Monthly Site Visitors :</strong> {props.creator.blogTotalVisitorsPerMonth.toLocaleString()}</Typography>}
          {props.creator.platforms && props.creator.platforms.includes('blog') &&<Typography><strong>Blog Site Link:</strong>  <a href={props.creator.blogSiteLink} target="_blank">{props.creator.blogSiteLink}</a></Typography>}
           {props.creator.platforms && props.creator.platforms.includes('blog') && props.creator.currency[0].name.toLowerCase()==='naira' &&<Typography><strong>Cost Per Post: </strong>&#8358;{props.creator.blogCostPerPost.toLocaleString()}  {props.creator.blogPostCostDuration}</Typography>}
           {props.creator.platforms && props.creator.platforms.includes('blog') && props.creator.currency[0].name.toLowerCase()!=='naira' &&<Typography><strong>Cost Per Post: </strong>&#36;{props.creator.blogCostPerPost.toLocaleString()}  {props.creator.blogPostCostDuration}</Typography>}
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>
                <Grid
                  item
                  container
                  style={{ marginTop: 10, marginBottom: 10 }}
                  justifyContent="center"
                ></Grid>
                
                
                <Field
                  label=""
                  id="project"
                  name="project"
                  type="text"
                  component={renderProjectField}
                  style={{ width: 300 }}
                />

                

                
                {props.creator.platforms && props.creator.platforms.includes('facebook') && project && <Field
                  label=""
                  id="willUseFacebook"
                  name="willUseFacebook"
                  type="text"
                  component={renderWillUseFacebookField}
                  style={{ width: 300 }}
                />}

                                    
                 
               {props.creator.platforms && props.creator.platforms.includes('facebook') && willUseFacebook && project && <Field
                  label=""
                  id="facebookPostQuantity"
                  name="facebookPostQuantity"
                  type="number"
                  //defaultValue={quantity}
                  helperText="How Many Post Will Be Made On Facebook Platform?"
                  //onChange={onQuantityChange}
                  component={renderSingleLineField}
                  min={1}
                  style={{ width: 300, marginTop: 10 }}
                />}


                 {props.creator.platforms && props.creator.platforms.includes('instagram') && project && <Field
                  label=""
                  id="willUseInstagram"
                  name="willUseInstagram"
                  type="text"
                  component={renderWillUseInstagramField}
                  style={{ width: 300 }}
                />}

                                    
                 
               {props.creator.platforms && props.creator.platforms.includes('instagram') && willUseInstagram && project && <Field
                  label=""
                  id="instagramPostQuantity"
                  name="instagramPostQuantity"
                  type="number"
                  //defaultValue={quantity}
                  helperText="How Many Post Will Be Made On Instagram Platform?"
                  //onChange={onQuantityChange}
                  component={renderSingleLineField}
                  min={1}
                  style={{ width: 300, marginTop: 10 }}
                />}

                {props.creator.platforms && props.creator.platforms.includes('twitter') && project && <Field
                  label=""
                  id="willUseTwitter"
                  name="willUseTwitter"
                  type="text"
                  component={renderWillUseTwitterField}
                  style={{ width: 300 }}
                />}

                                    
                 
               {props.creator.platforms && props.creator.platforms.includes('twitter') && willUseTwitter && project && <Field
                  label=""
                  id="twitterPostQuantity"
                  name="twitterPostQuantity"
                  type="number"
                  //defaultValue={quantity}
                  helperText="How Many Post Will Be Made On Twitter Platform?"
                  //onChange={onQuantityChange}
                  component={renderSingleLineField}
                  min={1}
                  style={{ width: 300, marginTop: 10 }}
                />}


                {props.creator.platforms && props.creator.platforms.includes('tiktok') && project && <Field
                  label=""
                  id="willUseTiktok"
                  name="willUseTiktok"
                  type="text"
                  component={renderWillUseTiktokField}
                  style={{ width: 300 }}
                />}

                                    
                 
               {props.creator.platforms && props.creator.platforms.includes('tiktok') && willUseTiktok && project && <Field
                  label=""
                  id="tiktokPostQuantity"
                  name="tiktokPostQuantity"
                  type="number"
                  //defaultValue={quantity}
                  helperText="How Many Post Will Be Made On Tiktok Platform?"
                  //onChange={onQuantityChange}
                  component={renderSingleLineField}
                  min={1}
                  style={{ width: 300, marginTop: 10 }}
                />}


                 {props.creator.platforms && props.creator.platforms.includes('linkedin') && project && <Field
                  label=""
                  id="willUseLinkedIn"
                  name="willUseLinkedIn"
                  type="text"
                  component={renderWillUseLinkedinField}
                  style={{ width: 300 }}
                />}

                                    
                 
               {props.creator.platforms && props.creator.platforms.includes('linkedin') && willUseLinkedIn && project && <Field
                  label=""
                  id="linkedinPostQuantity"
                  name="linkedinPostQuantity"
                  type="number"
                  //defaultValue={quantity}
                  helperText="How Many Post Will Be Made On LinkedIn Platform?"
                  //onChange={onQuantityChange}
                  component={renderSingleLineField}
                  min={1}
                  style={{ width: 300, marginTop: 10 }}
                />}


                 {props.creator.platforms && props.creator.platforms.includes('blog') && project && <Field
                  label=""
                  id="willUseBlog"
                  name="willUseBlog"
                  type="text"
                  component={renderWillUseBlogField}
                  style={{ width: 300 }}
                />}

                                    
                 
               {props.creator.platforms && props.creator.platforms.includes('blog') && willUseBlog && project && <Field
                  label=""
                  id="blogPostQuantity"
                  name="blogPostQuantity"
                  type="number"
                  //defaultValue={quantity}
                  helperText="How Many Post Will Be Made On The Blog Site?"
                  //onChange={onQuantityChange}
                  component={renderSingleLineField}
                  min={1}
                  style={{ width: 300, marginTop: 10 }}
                />}

                {project && <Field
                  label=""
                  id="agencyServicePlan"
                  name="agencyServicePlan"
                  type="text"
                  component={renderAgencyServicePlanField}
                  style={{ width: 300 }}
                />}

                   
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>

        {/* <Grid container direction="row">
          <Grid item style={{ width: 50, marginTop: 45, fontSize: 45 }}>
            <span style={{ color: "gre
            y" }}>&#8358;</span>
          </Grid>
          <Grid item style={{ marginLeft: 10, width: 100 }}>
            <Field
              label=""
              id="grandTotal"
              name="grandTotal"
              //defaultValue={grandTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              type="text"
              component={renderTotalField}
              style={{ width: 100 }}
            />
          </Grid>
          
        </Grid> */}
       {project && <Button
          variant="text"
          color="primary"
          className={classes.cancelButton}
          style={{ marginLeft: 20 }}
          onClick={props.handleClose} 
        >
          Learn More About The Agency Service Plans    
        </Button>}

        <Button
          variant="contained"
          className={classes.submitButton}
          onClick={props.handleSubmit(onSubmit)}
        >
          {loading ? (
            <CircularProgress size={30} color="inherit" />
          ) : (
            buttonContent()
          )}
        </Button>

        
      </Box>
    </form>
  );
}

export default reduxForm({
  form: "sendCreatorToCheckoutForm",
})(SendCreatorToCheckoutForm);
