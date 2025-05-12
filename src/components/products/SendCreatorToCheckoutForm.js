import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import CircularProgress from "@material-ui/core/CircularProgress";
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
     
      {props.creatorLanguages.map((lang, index) => (
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
              style={{ marginTop: 10, width: 300, height: 38, marginLeft:0,marginRight:0 }}
              //{...input}
            >
              {renderProjectsList()}
            </Select>
            <FormHelperText>Select Your Project(Or Create a new one in your Dashboard)</FormHelperText>
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

  
  const buttonContent = () => {
    return <React.Fragment>Proceed to Hire</React.Fragment>;
  };

 console.log('props:',props)

   const onSubmit = (formValues) => {
    setLoading(true);

   if (props.token === undefined) {
      props.handleMakeOpenLoginFormDialogStatus();
      setLoading(false);

      return;
    }    
    

    if (!project) {
      props.handleFailedSnackbar("Please select a project. You can create new projects in your dashboard");
      setLoading(false);

      return;
    }

    if(!preferredCreatorLanguages.includes(projectLanguageId)){
      props.handleFailedSnackbar("This creator does not work with the language required for this project. Please select another creator and try again");
      setLoading(false);

      return;
    }

    if(!isCreatorSkillSuitableForProject){
      props.handleFailedSnackbar(`This creator is not skillful to handle this type of project. Please select another creator and try again`);
      setLoading(false);

      return;
    }

  
    if (newQuantity <= 0) {
      if(projectType === 'video'){
        props.handleFailedSnackbar(
          "The number of marketing videos required cannot be 0"
        );
        setLoading(false);
  
        return;

      }
      if(projectType === 'audio'){
        props.handleFailedSnackbar(
          "The number of marketing jingles required cannot be 0"
        );
        setLoading(false);
  
        return;

      }
    }

     

    const data = {
      creator: creatorId,
      brand: brandId,
      brandName: brandName,
      brandCountry: brandCountry,
      refNumber: formValues.refNumber
        ? formValues.refNumber
        : "CREATOR-" + Math.floor(Math.random() * 1000000000) + "-CT",

      creativeQuantity: newQuantity,
      creativeHookQuantity: hookQuantity,
      creativeType: projectType,
      project: project,
      creativeLanguage: projectLanguageId,
      creatorCategoryCode: categoryCode,
      creatorCategoryName: categoryName,
      grandTotal: grandTotal, 

      cartHolder: props.userId,
      isDeleted: false,
      creativeUnitPrice: price,
      creativeHookUnitPrice: hookPrice,
      createiveDeliveryDays: projectType === 'video' ? videoDeliveryDays:soundDeliveryDays,
      currency: props.currency ? props.currency[0].id : "",
      currencyName: props.currency ? props.currency[0].name :"",
      status: "marked-for-checkout",      
      category: props.creator ?props.creator.category[0].id :"",      
      slug: props.creator.slug,
      creatorImage: props.image,
            
      
    };

   
      //delete all items in this user's cart
      cartForCheckoutList.map((cart, index) => {
        const createForm = async () => {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${props.token}`;
          await api.delete(`/carts/${cart.id}`);
          dispatch({
            type: DELETE_CART,
            //payload: response2.data.data.data,
          });
          //props.cartCounterHandler(-1);
        };
        createForm().catch((err) => {
          //props.handleFailedSnackbar();
          console.log("err:", err.message);
        });
      });
    
       

   
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

          // props.handleSuccessfulCreateSnackbar(
          //   `item(s) successfully added to cart. Please visit the cart to continue to checkout and payment`
          // );
          history.push(`/checkouts`);
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

 

  return (
    <form id="sendCreatorToCheckoutForm">
      <Box
        sx={{
          width: 200,
          marginLeft:20
          //height: 450,
        }}
        noValidate
        autoComplete="off"
      >
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
        {project && <Typography style={{width:350,marginTop:10}}><strong>Project Type:</strong>&nbsp;{projectType}, <strong>Project Language:</strong>&nbsp;{projectLanguage}</Typography>}            

       
        {projectType ==='video' && <Typography style={{width:350,marginTop:10}}><strong>Cost per Marketing Video:</strong><span style={{fontSize:19, fontWeight:700}}>&#8358;{videoPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span></Typography>}
        {projectType ==='audio' && <Typography style={{width:350,marginTop:10}}><strong>Cost per Marketing Jingle:</strong>&nbsp;<span style={{fontSize:19, fontWeight:700}}>&#8358;{soundPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</span></Typography>} 
          
                 
               {projectType ==="video" && <Field
                  label=""
                  id="quantity"
                  name="quantity"
                  type="number"
                  defaultValue={quantity}
                  helperText="How Many Of this Marketing Videos do you need?"
                  onChange={onQuantityChange}
                  component={renderRequestedQuantityField}
                  min={0}
                  style={{ width: 300, marginTop: 10 }}
                />}
                {projectType ==="audio" && <Field
                  label=""
                  id="quantity"
                  name="quantity"
                  type="number"
                  defaultValue={quantity}
                  helperText="How Many Of this Marketing Jingles do you need?"
                  onChange={onSoundQuantityChange}
                  component={renderRequestedQuantityField}
                  min={0}
                  style={{ width: 300, marginTop: 10 }}
                />}

        {projectType ==='video' && <Typography style={{width:350,marginTop:10}}><strong>Cost per Extra Video Hook:</strong>&nbsp;&#8358;{videoHookPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Typography>}
        {projectType ==='audio' && <Typography style={{width:350,marginTop:10}}><strong>Cost per Extra Audio Hook:</strong>&nbsp; &#8358;{soundHookPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</Typography>}     
       
        {projectType === 'video' &&<Field
                  label=""
                  id="hookQuantity"
                  name="hookQuantity"
                  type="number"
                  defaultValue={hookQuantity}
                  helperText="How Many Extra Video Hook do you need?" 
                  onChange={onHookQuantityChange}
                  component={renderRequestedHookQuantityField}
                  min={0}
                  style={{ width: 300, marginTop: 10 }}
                />}
            {projectType === 'audio' &&<Field
                  label=""
                  id="hookQuantity"
                  name="hookQuantity"
                  type="number"
                  defaultValue={hookQuantity}
                  helperText="How Many Extra Sound Hook do you need?"
                  onChange={onSoundHookQuantityChange}
                  component={renderRequestedHookQuantityField}
                  min={0}
                  style={{ width: 300, marginTop: 10 }}
                />}      
        <Grid
          item
          container
          style={{ marginTop: 10, marginBottom: 10 }}
          justifyContent="center"
        ></Grid>

        <Grid container direction="row">
          <Grid item style={{ width: 50, marginTop: 45, fontSize: 45 }}>
            <span style={{ color: "grey" }}>&#8358;</span>
          </Grid>
          <Grid item style={{ marginLeft: 10, width: 100 }}>
            <Field
              label=""
              id="grandTotal"
              name="grandTotal"
              defaultValue={grandTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              type="text"
              component={renderTotalField}
              style={{ width: 100 }}
            />
          </Grid>
          
        </Grid>

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
