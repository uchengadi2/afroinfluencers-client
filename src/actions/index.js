import { formValues } from "redux-form";
import data from "../apis/local";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CREATE_CATEGORY,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  CREATE_USER,
  FETCH_USERS,
  FETCH_USER,
  DELETE_USER,
  EDIT_USER,
  CHANGE_OWN_PASSWORD,
  CHANGE_OWN_NAME,
  CREATE_CITY,
  FETCH_CITIES,
  FETCH_CITY,
  DELETE_CITY,
  EDIT_CITY,
  CREATE_VENDOR,
  FETCH_VENDORS,
  FETCH_VENDOR,
  DELETE_VENDOR,
  EDIT_VENDOR,
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_POLICY,
  FETCH_POLICIES,
  FETCH_POLICY,
  DELETE_POLICY,
  EDIT_POLICY,
  CREATE_ORDER,
  FETCH_ORDERS,
  FETCH_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  FETCH_ASSIGNED_ORDERS,
  FETCH_COMPLETED_ORDERS,
  FETCH_ONTRANSIT_ORDERS,
  MAKE_PAYMENT,
  FETCH_PAYMENTS,
  FETCH_PAYMENT,
  DELETE_PAYMENT,
  EDIT_PAYMENT,
  CREATE_FULLFILLED_PAYMENT,
  FETCH_FULLFILLED_PAYMENTS,
  FETCH_FULLFILLED_PAYMENT,
  DELETE_FULLFILLED_PAYMENT,
  EDIT_FULLFILLED_PAYMENT,
  CREATE_PARTIAL_PAYMENT,
  FETCH_PARTIAL_PAYMENTS,
  FETCH_PARTIAL_PAYMENT,
  DELETE_PARTIAL_PAYMENT,
  EDIT_PARTIAL_PAYMENT,
  CREATE_CART,
  FETCH_CARTS,
  FETCH_CART,
  EDIT_CART,
  DELETE_CART,
  CREATE_RATE,
  FETCH_RATES,
  FETCH_RATE,
  EDIT_RATE,
  DELETE_RATE,
  CREATE_LOGISTICSPARTNER,
  FETCH_LOGISTICSPARTNERS,
  FETCH_LOGISTICSPARTNER,
  EDIT_LOGISTICSPARTNER,
  DELETE_LOGISTICSPARTNER,
  CREATE_TRANSACTION,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
  CREATE_COUNTRY,
  FETCH_COUNTRIES,
  FETCH_COUNTRY,
  DELETE_COUNTRY,
  EDIT_COUNTRY,
  CREATE_STATE,
  FETCH_STATES,
  FETCH_STATE,
  DELETE_STATE,
  EDIT_STATE,
  CREATE_CURRENCY,
  FETCH_CURRENCIES,
  FETCH_CURRENCY,
  DELETE_CURRENCY,
  EDIT_CURRENCY,
  CREATE_LOCATION,
  FETCH_LOCATIONS,
  FETCH_LOCATION,
  DELETE_LOCATION,
  EDIT_LOCATION,
  CREATE_CHANNEL,
  FETCH_CHANNEL,
  FETCH_CHANNELS,
  DELETE_CHANNEL,
  EDIT_CHANNEL,
  CREATE_PROGRAMME,
  FETCH_PROGRAMME,
  FETCH_PROGRAMMES,
  DELETE_PROGRAMME,
  EDIT_PROGRAMME,
  CREATE_INSTRUCTOR,
  FETCH_INSTRUCTORS,
  FETCH_INSTRUCTOR,
  DELETE_INSTRUCTOR,
  EDIT_INSTUCTOR,
  CREATE_ASSESSOR,
  FETCH_ASSESSOR,
  FETCH_ASSESSORS,
  DELETE_ASSESSOR,
  EDIT_ASSESSOR,
  CREATE_MENTOR,
  FETCH_MENTOR,
  FETCH_MENTORS,
  DELETE_MENTOR,
  EDIT_MENTOR,
  CREATE_COURSE_INSTRUCTOR,
  FETCH_COURSE_INSTRUCTORS,
  FETCH_COURSE_INSTRUCTOR,
  DELETE_COURSE_INSTRUCTOR,
  EDIT_COURSE_INSTRUCTOR,
  CREATE_COURSE_ASSESSOR,
  FETCH_COURSE_ASSESSORS,
  FETCH_COURSE_ASSESSOR,
  DELETE_COURSE_ASSESSOR,
  EDIT_COURSE_ASSESSOR,
  CREATE_COURSE_MENTOR,
  FETCH_COURSE_MENTORS,
  FETCH_COURSE_MENTOR,
  DELETE_COURSE_MENTOR,
  EDIT_COURSE_MENTOR,
  CREATE_COURSE_LESSON,
  FETCH_COURSE_LESSONS,
  FETCH_COURSE_LESSON,
  DELETE_COURSE_LESSON,
  EDIT_COURSE_LESSON,
  CREATE_COURSE_TOPIC,
  FETCH_COURSE_TOPICS,
  FETCH_COURSE_TOPIC,
  DELETE_COURSE_TOPIC,
  EDIT_COURSE_TOPIC,

  CREATE_LANGUAGE,
  FETCH_LANGUAGES, 
  FETCH_LANGUAGE,
  DELETE_LANGUAGE,
  EDIT_LANGUAGE,

  CREATE_NICHE,
  FETCH_NICHES,
  FETCH_NICHE,
  DELETE_NICHE,
  EDIT_NICHE,

  CREATE_PROJECT,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,

  CREATE_CREATOR,
  FETCH_CREATORS,
  FETCH_CREATOR,
  DELETE_CREATOR,
  EDIT_CREATOR,

  CREATE_BRAND,
  FETCH_BRANDS,
  FETCH_BRAND,
  DELETE_BRAND,
  EDIT_BRAND,

  CREATE_SAMPLE,
  FETCH_SAMPLES,
  FETCH_SAMPLE,
  DELETE_SAMPLE,
  EDIT_SAMPLE
  
} from "./types";

//authentication and authorization  operations

// export const signIn = (userId) => {
//   return {
//     type: SIGN_IN,
//     payload: userId,
//   };
// };

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signUp = (formValues) => {
  return async (dispatch) => {
    const response = await data.post("/users/signup", formValues);
    dispatch({ type: SIGN_UP, payload: response.data });
  };
};

export const signIn = (formValues) => {
  return async (dispatch) => {
    const response = await data.post("/users/login", formValues);

    if (response.status === 200) {
      //document.cookie = "jwt=" + response.data.token;
      //localStorage.setItem("token", JSON.stringify(response.data.token));
      // console.log("this token is:", token);
      dispatch({ type: SIGN_IN, payload: response.data });
      // history.push("/");
    } else {
      console.log("something went wrong here");
    }
  };
};
//category resources crud operations
export const createCategory = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/categories", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CATEGORY, payload: response.data });
    history.push("/");
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await data.get("/categories");
    dispatch({ type: FETCH_CATEGORIES, payload: response.data.data.data });
  };
};

export const fetchCategory = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/categories/${id}`);
    dispatch({ type: FETCH_CATEGORY, payload: response.data.data });
  };
};

export const editCategory = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/categories/${id}`, formValues);
    dispatch({ type: EDIT_CATEGORY, payload: response.data.data });
    history.push("/");
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    await data.delete(`/categories/${id}`);
    dispatch({ type: DELETE_CATEGORY, payload: id });
    history.push("/");
  };
};

//user resource crud operation
export const createUser = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/users", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_USER, payload: response.data });
    history.push("/");
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await data.get("/users");
    dispatch({ type: FETCH_USERS, payload: response.data.data.data });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/users/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const editUser = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/users/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    history.push("/users");
  };
};

export const changeOwnName = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("this is the formvalues:", formValues, "token is:", token);
  return async (dispatch) => {
    const response = await data.patch(`/users/${id}`, formValues);
    console.log("this is the response at indexjs:", response);
    dispatch({ type: CHANGE_OWN_NAME, payload: response.data.status });
    //history.push("/profile");
  };
};

export const changeOwnPassword = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/users/updateMyPassword/`, formValues);
    dispatch({ type: CHANGE_OWN_PASSWORD, payload: response.data });
    // history.push("/profile");
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await data.delete(`/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
    history.push("/");
  };
};

////////////////////////////////////////////////////////

//city resource crud operation
export const createCity = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/cities", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CITY, payload: response.data });
    history.push("/");
  };
};

export const fetchCities = () => {
  return async (dispatch) => {
    const response = await data.get("/cities");
    dispatch({ type: FETCH_CITIES, payload: response.data.data.data });
  };
};

export const fetchCity = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/cities/${id}`);
    dispatch({ type: FETCH_CITY, payload: response.data });
  };
};

export const editCity = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/cities/${id}`, formValues);
    dispatch({ type: EDIT_CITY, payload: response.data });
    history.push("/");
  };
};

export const deleteCity = (id) => {
  return async (dispatch) => {
    await data.delete(`/cities/${id}`);
    dispatch({ type: DELETE_CITY, payload: id });
    history.push("/");
  };
};

/////////////////////////////////////////////////////////////////////

//vendor resource crud operation
export const createVendor = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch) => {
    const response = await data.post("/vendors", formValues);
    console.log("this is the response from vendor creation");

    dispatch({ type: CREATE_VENDOR, payload: response.data });
    // history.push("/orders");
  };
};

export const fetchVendors = () => {
  return async (dispatch) => {
    const response = await data.get("/vendors");
    dispatch({ type: FETCH_VENDORS, payload: response.data.data.data });
  };
};

export const fetchVendor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/vendors/${id}`);
    dispatch({ type: FETCH_VENDOR, payload: response.data });
  };
};

export const editVendor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/vendors/${id}`, formValues);
    dispatch({ type: EDIT_VENDOR, payload: response.data });
    history.push("/");
  };
};

export const deleteVendor = (id) => {
  return async (dispatch) => {
    await data.delete(`/vendors/${id}`);
    dispatch({ type: DELETE_VENDOR, payload: id });
    history.push("/");
  };
};

///////////////////////////////////////////////////////////////////

//product resource crud operation
export const createProduct = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/courses", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    history.push("/");
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await data.get("/courses");
    dispatch({ type: FETCH_PRODUCTS, payload: response.data.data.data });
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/courses/${id}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
  };
};

export const editProduct = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/courses/${id}`, formValues);
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
    history.push("/");
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await data.delete(`/courses/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    history.push("/");
  };
};

//////////////////////////////////////////////////////////////////

//policy resource crud operation
export const createPolicy = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/policies", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_POLICY, payload: response.data });
    history.push("/");
  };
};

export const fetchPolicies = () => {
  return async (dispatch) => {
    const response = await data.get("/policies");
    dispatch({ type: FETCH_POLICIES, payload: response.data.data.data });
  };
};

export const fetchPolicy = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/policies/${id}`);
    dispatch({ type: FETCH_POLICY, payload: response.data });
  };
};

export const editPolicy = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/policies/${id}`, formValues);
    dispatch({ type: EDIT_POLICY, payload: response.data });
    history.push("/");
  };
};

export const deletePolicy = (id) => {
  return async (dispatch) => {
    await data.delete(`/policies/${id}`);
    dispatch({ type: DELETE_POLICY, payload: id });
    history.push("/");
  };
};

///////////////////////////////////////////////////////////////////////

//order resource crud operation
export const createOrder = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/orders", formValues);

    dispatch({ type: CREATE_ORDER, payload: response.data });
    // history.push("/orders");
  };
};

export const fetchOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({ type: FETCH_ORDERS, payload: response.data.data.data });
  };
};

export const fetchAssignedOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });
    console.log("the orders issssssnew:", response);
    dispatch({ type: FETCH_ASSIGNED_ORDERS, payload: response.data.data.data });
  };
};

export const fetchCompletedOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({
      type: FETCH_COMPLETED_ORDERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchOnTransitOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({
      type: FETCH_ONTRANSIT_ORDERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchOrder = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/orders/${id}`);
    dispatch({ type: FETCH_ORDER, payload: response.data });
  };
};

export const editOrder = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/orders/${id}`, formValues);
    dispatch({ type: EDIT_ORDER, payload: response.data });
    history.push("/");
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    await data.delete(`/orders/${id}`);
    dispatch({ type: DELETE_ORDER, payload: id });
    history.push("/");
  };
};

//////////////////////////////////////////////////////////////////////

//payment resource crud operation
export const makePayment = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: MAKE_PAYMENT, payload: response.data });
    history.push("/");
  };
};

export const fetchPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });
    console.log("the payments:", response);
    dispatch({ type: FETCH_PAYMENTS, payload: response.data.data.data });
  };
};

export const fetchPayment = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({ type: FETCH_PAYMENT, payload: response.data });
  };
};

export const editPayment = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({ type: EDIT_PAYMENT, payload: response.data });
    history.push("/");
  };
};

export const deletePayment = (id) => {
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_PAYMENT, payload: id });
    history.push("/");
  };
};

/////////////////////////////////////Completed Payments Resources ///////////////////////////////////

export const fetchCompletedPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });

    dispatch({
      type: FETCH_FULLFILLED_PAYMENTS,
      payload: response.data.data.data,
    });
  };
};

export const fetchCompletedPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({
      type: FETCH_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
  };
};

export const editCompletedPayment = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({
      type: EDIT_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/orders");
  };
};

export const deleteCompletedPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_FULLFILLED_PAYMENT, payload: id });
    //history.push("/orders");
  };
};

export const createCompletedPayment = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({
      type: CREATE_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/utilities/clusters");
  };
};

//////////////////////////////////////Partial Payments Resources ///////////////////////////////////

export const fetchPartialPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });

    dispatch({
      type: FETCH_PARTIAL_PAYMENTS,
      payload: response.data.data.data,
    });
  };
};

export const fetchPartialPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({
      type: FETCH_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
  };
};

export const editPartialPayment = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({
      type: EDIT_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/orders");
  };
};

export const deletePartialPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_PARTIAL_PAYMENT, payload: id });
    //history.push("/orders");
  };
};

export const createPartialPayment = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({
      type: CREATE_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/utilities/clusters");
  };
};

////////////////////////////////////////////////CART //////////////////////////////////

export const createCart = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch, getState) => {
    const response = await data.post("/carts", formValues);
    dispatch({ type: CREATE_CART, payload: response.data.data.data });
  };
};

export const fetchCarts = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/carts");

    dispatch({ type: FETCH_CARTS, payload: response.data.data.data });
  };
};

export const fetchCart = (id, token) => {
  return async (dispatch) => {
    const response = await data.get(`/carts/${id}`);
    dispatch({ type: FETCH_CART, payload: response.data });
  };
};

export const editCart = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/carts/${id}`, formValues);
    dispatch({ type: EDIT_CART, payload: response.data });
  };
};

export const deleteCart = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/carts/${id}`);
    dispatch({ type: DELETE_CART, payload: id });
  };
};

////////////////////////////////////////////////RATES //////////////////////////////////

export const createRate = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch, getState) => {
    const response = await data.post("/rates", formValues);
    dispatch({ type: CREATE_RATE, payload: response.data.data.data });
  };
};

export const fetchRates = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/rates");

    dispatch({ type: FETCH_RATES, payload: response.data.data.data });
  };
};

export const fetchRate = (id, token) => {
  return async (dispatch) => {
    const response = await data.get(`/rates/${id}`);
    dispatch({ type: FETCH_RATE, payload: response.data });
  };
};

export const editRate = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/rates/${id}`, formValues);
    dispatch({ type: EDIT_RATE, payload: response.data });
  };
};

export const deleteRate = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/rates/${id}`);
    dispatch({ type: DELETE_RATE, payload: id });
  };
};

////////////////////////////////// LOGISTICS PARTNERS ///////////////////////////////

//vendor resource crud operation
export const createLogisticsPartner = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/logisticspartners", formValues);

    //console.log(response);
    dispatch({
      type: CREATE_LOGISTICSPARTNER,
      payload: response.data.data.data,
    });
    //history.push("/vendors");
  };
};

export const fetchLogisticsPartners = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/logisticspartners");

    dispatch({
      type: FETCH_LOGISTICSPARTNERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchLogisticsPartner = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/logisticspartners/${id}`);
    dispatch({ type: FETCH_LOGISTICSPARTNER, payload: response.data });
  };
};

export const editLogisticsPartner = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/logisticspartners/${id}`, formValues);
    dispatch({ type: EDIT_LOGISTICSPARTNER, payload: response.data });
  };
};

export const deleteLogisticsPartner = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/logisticspartners/${id}`);
    dispatch({ type: DELETE_LOGISTICSPARTNER, payload: id });
  };
};

///////////////////////////////////////////////////////////////////////

//transaction resource crud operation
export const createTransaction = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/transactions", formValues);

    dispatch({ type: CREATE_TRANSACTION, payload: response.data });
  };
};

export const fetchTransactions = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/transactions", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({ type: FETCH_TRANSACTIONS, payload: response.data.data.data });
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/transactions/${id}`);
    dispatch({ type: FETCH_TRANSACTION, payload: response.data });
  };
};

export const editTransaction = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/transactions/${id}`, formValues);
    dispatch({ type: EDIT_TRANSACTION, payload: response.data });
  };
};

export const deleteTransaction = (id) => {
  return async (dispatch) => {
    await data.delete(`/transactions/${id}`);
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  };
};

////////////////////////////////////////Country///////////////////////////////
//country resources crud operations
export const createCountry = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/countries", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COUNTRY, payload: response.data });
    // history.push("/");
  };
};

export const fetchCountries = () => {
  return async (dispatch) => {
    const response = await data.get("/countries");
    dispatch({ type: FETCH_COUNTRIES, payload: response.data.data.data });
  };
};

export const fetchCountry = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/countries/${id}`);
    dispatch({ type: FETCH_COUNTRY, payload: response.data.data });
  };
};

export const editCountry = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/categories/${id}`, formValues);
    dispatch({ type: EDIT_COUNTRY, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCountry = (id) => {
  return async (dispatch) => {
    await data.delete(`/countries/${id}`);
    dispatch({ type: DELETE_COUNTRY, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////State///////////////////////////////
//state resources crud operations
export const createState = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/states", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_STATE, payload: response.data });
    // history.push("/");
  };
};

export const fetchStates = () => {
  return async (dispatch) => {
    const response = await data.get("/states");
    dispatch({ type: FETCH_STATES, payload: response.data.data.data });
  };
};

export const fetchState = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/states/${id}`);
    dispatch({ type: FETCH_STATE, payload: response.data.data });
  };
};

export const editState = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/states/${id}`, formValues);
    dispatch({ type: EDIT_STATE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteState = (id) => {
  return async (dispatch) => {
    await data.delete(`/states/${id}`);
    dispatch({ type: DELETE_STATE, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////currencies///////////////////////////////
//currencies resources crud operations
export const createCurrency = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/currencies", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CURRENCY, payload: response.data });
    // history.push("/");
  };
};

export const fetchCurrencies = () => {
  return async (dispatch) => {
    const response = await data.get("/currencies");
    dispatch({ type: FETCH_CURRENCIES, payload: response.data.data.data });
  };
};

export const fetchCurrency = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/currencies/${id}`);
    dispatch({ type: FETCH_CURRENCY, payload: response.data.data });
  };
};

export const editCurrency = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/currencies/${id}`, formValues);
    dispatch({ type: EDIT_CURRENCY, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCurrency = (id) => {
  return async (dispatch) => {
    await data.delete(`/currencies/${id}`);
    dispatch({ type: DELETE_CURRENCY, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////Location///////////////////////////////
//location resources crud operations
export const createLocation = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/locations", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_LOCATION, payload: response.data });
    // history.push("/");
  };
};

export const fetchLocations = () => {
  return async (dispatch) => {
    const response = await data.get("/locations");
    dispatch({ type: FETCH_LOCATIONS, payload: response.data.data.data });
  };
};

export const fetchLocation = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/locations/${id}`);
    dispatch({ type: FETCH_LOCATION, payload: response.data.data });
  };
};

export const editLocation = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/locations/${id}`, formValues);
    dispatch({ type: EDIT_LOCATION, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteLocation = (id) => {
  return async (dispatch) => {
    await data.delete(`/locations/${id}`);
    dispatch({ type: DELETE_LOCATION, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////CHANNEL///////////////////////////////
//CHANNEL resources crud operations
export const createChannel = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/channels", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CHANNEL, payload: response.data });
    // history.push("/");
  };
};

export const fetchChannels = () => {
  return async (dispatch) => {
    const response = await data.get("/channels");
    dispatch({ type: FETCH_CHANNELS, payload: response.data.data.data });
  };
};

export const fetchChannel = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/channels/${id}`);
    dispatch({ type: FETCH_CHANNEL, payload: response.data.data });
  };
};

export const editChannel = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/channels/${id}`, formValues);
    dispatch({ type: EDIT_CHANNEL, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteChannel = (id) => {
  return async (dispatch) => {
    await data.delete(`/channels/${id}`);
    dispatch({ type: DELETE_CHANNEL, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////PROGRAMME///////////////////////////////
//PROGRAMME resources crud operations
export const createProgramme = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/programmes", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_PROGRAMME, payload: response.data });
    // history.push("/");
  };
};

export const fetchProgrammes = () => {
  return async (dispatch) => {
    const response = await data.get("/programmes");
    dispatch({ type: FETCH_PROGRAMMES, payload: response.data.data.data });
  };
};

export const fetchProgramme = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/programmes/${id}`);
    dispatch({ type: FETCH_PROGRAMME, payload: response.data.data });
  };
};

export const editProgramme = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/programmes/${id}`, formValues);
    dispatch({ type: EDIT_PROGRAMME, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteProgramme = (id) => {
  return async (dispatch) => {
    await data.delete(`/programmes/${id}`);
    dispatch({ type: DELETE_PROGRAMME, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////INSTRUCTOR///////////////////////////////
//INSTRUCTOR resources crud operations
export const createInstructor = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/instructors", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_INSTRUCTOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchInstructors = () => {
  return async (dispatch) => {
    const response = await data.get("/instructors");
    dispatch({ type: FETCH_INSTRUCTORS, payload: response.data.data.data });
  };
};

export const fetchInstructor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/instructors/${id}`);
    dispatch({ type: FETCH_INSTRUCTOR, payload: response.data.data });
  };
};

export const editInstructor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/instructors/${id}`, formValues);
    dispatch({ type: EDIT_INSTUCTOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteInstructor = (id) => {
  return async (dispatch) => {
    await data.delete(`/instructors/${id}`);
    dispatch({ type: DELETE_INSTRUCTOR, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////ASSESSOR///////////////////////////////
//ASSESSOR resources crud operations
export const createAssessor = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/assessors", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_ASSESSOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchAssessors = () => {
  return async (dispatch) => {
    const response = await data.get("/assessors");
    dispatch({ type: FETCH_ASSESSORS, payload: response.data.data.data });
  };
};

export const fetchAssessor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/assessors/${id}`);
    dispatch({ type: FETCH_ASSESSOR, payload: response.data.data });
  };
};

export const editAssessor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/assessors/${id}`, formValues);
    dispatch({ type: EDIT_ASSESSOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteAssesor = (id) => {
  return async (dispatch) => {
    await data.delete(`/assessors/${id}`);
    dispatch({ type: DELETE_ASSESSOR, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////MENTOR///////////////////////////////
//MENTOR resources crud operations
export const createMentor = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/mentors", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_MENTOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchMentors = () => {
  return async (dispatch) => {
    const response = await data.get("/mentors");
    dispatch({ type: FETCH_MENTORS, payload: response.data.data.data });
  };
};

export const fetchMentor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/mentors/${id}`);
    dispatch({ type: FETCH_MENTOR, payload: response.data.data });
  };
};

export const editMentor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/mentors/${id}`, formValues);
    dispatch({ type: EDIT_MENTOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteMentor = (id) => {
  return async (dispatch) => {
    await data.delete(`/mentors/${id}`);
    dispatch({ type: DELETE_MENTOR, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////COURSE INSTRUCTOR///////////////////////////////
//COURSE INSTRUCTOR resources crud operations
export const createCourseInstructor = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/courseinstructors", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COURSE_INSTRUCTOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchCourseInstructors = () => {
  return async (dispatch) => {
    const response = await data.get("/courseinstructors");
    dispatch({
      type: FETCH_COURSE_INSTRUCTORS,
      payload: response.data.data.data,
    });
  };
};

export const fetchCourseInstructor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/courseinstructors/${id}`);
    dispatch({ type: FETCH_COURSE_INSTRUCTOR, payload: response.data.data });
  };
};

export const editCourseInstructor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/courseinstructors/${id}`, formValues);
    dispatch({ type: EDIT_COURSE_INSTRUCTOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCourseInstructor = (id) => {
  return async (dispatch) => {
    await data.delete(`/courseinstructors/${id}`);
    dispatch({ type: DELETE_COURSE_INSTRUCTOR, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////COURSE ASSESSORS///////////////////////////////
//COURSE ASSESSORS resources crud operations
export const createCourseAssessor = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/courseassessors", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COURSE_ASSESSOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchCourseAssessors = () => {
  return async (dispatch) => {
    const response = await data.get("/courseassessors");
    dispatch({
      type: FETCH_COURSE_ASSESSORS,
      payload: response.data.data.data,
    });
  };
};

export const fetchCourseAssessor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/courseassessors/${id}`);
    dispatch({ type: FETCH_COURSE_ASSESSOR, payload: response.data.data });
  };
};

export const editCourseAssessor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/courseassessors/${id}`, formValues);
    dispatch({ type: EDIT_COURSE_ASSESSOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCourseAssessor = (id) => {
  return async (dispatch) => {
    await data.delete(`/courseassessors/${id}`);
    dispatch({ type: DELETE_COURSE_ASSESSOR, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////COURSE mentors///////////////////////////////
//COURSE mentors resources crud operations
export const createCourseMentors = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/coursementors", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COURSE_MENTOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchCourseMentors = () => {
  return async (dispatch) => {
    const response = await data.get("/coursementors");
    dispatch({ type: FETCH_COURSE_MENTORS, payload: response.data.data.data });
  };
};

export const fetchCourseMentor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/coursementors/${id}`);
    dispatch({ type: FETCH_COURSE_MENTOR, payload: response.data.data });
  };
};

export const editCourseMentor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/coursementors/${id}`, formValues);
    dispatch({ type: EDIT_COURSE_MENTOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCourseMentor = (id) => {
  return async (dispatch) => {
    await data.delete(`/coursementors/${id}`);
    dispatch({ type: DELETE_COURSE_MENTOR, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////COURSE LESSONS///////////////////////////////
//COURSE LESSONS resources crud operations
export const createCourseLesson = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/courselessons", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COURSE_LESSON, payload: response.data });
    // history.push("/");
  };
};

export const fetchCourseLessons = () => {
  return async (dispatch) => {
    const response = await data.get("/courselessons");
    dispatch({ type: FETCH_COURSE_LESSONS, payload: response.data.data.data });
  };
};

export const fetchCourseLesson = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/courselessons/${id}`);
    dispatch({ type: FETCH_COURSE_LESSON, payload: response.data.data });
  };
};

export const editCourseLesson = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/courselessons/${id}`, formValues);
    dispatch({ type: EDIT_COURSE_MENTOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCourseLesson = (id) => {
  return async (dispatch) => {
    await data.delete(`/courselessons/${id}`);
    dispatch({ type: DELETE_COURSE_LESSON, payload: id });
    //history.push("/");
  };
};

////////////////////////////////////////COURSE TOPICS///////////////////////////////
//COURSE TOPICS resources crud operations
export const createCourseTopic = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/coursetopics", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_COURSE_TOPIC, payload: response.data });
    // history.push("/");
  };
};

export const fetchCourseTopics = () => {
  return async (dispatch) => {
    const response = await data.get("/coursetopics");
    dispatch({ type: FETCH_COURSE_TOPICS, payload: response.data.data.data });
  };
};

export const fetchCourseTopic = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/coursetopics/${id}`);
    dispatch({ type: FETCH_COURSE_TOPIC, payload: response.data.data });
  };
};

export const editCourseTopic = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/coursetopics/${id}`, formValues);
    dispatch({ type: EDIT_COURSE_TOPIC, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCourseTopic = (id) => {
  return async (dispatch) => {
    await data.delete(`/coursetopics/${id}`);
    dispatch({ type: DELETE_COURSE_TOPIC, payload: id });
    //history.push("/");
  };
};


////////////////////////////////////////LANGUAGE///////////////////////////////
//LANGUAGE resources crud operations
export const createLanguage = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/languages", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_LANGUAGE, payload: response.data });
    // history.push("/");
  };
};

export const fetchLanguages = () => {
  return async (dispatch) => {
    const response = await data.get("/languages");
    dispatch({ type: FETCH_LANGUAGES, payload: response.data.data.data });
  };
};

export const fetchLanguage = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/languages/${id}`);
    dispatch({ type: FETCH_LANGUAGE, payload: response.data.data });
  };
};

export const editLanguage = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/languages/${id}`, formValues);
    dispatch({ type: EDIT_LANGUAGE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteLanguage = (id) => {
  return async (dispatch) => {
    await data.delete(`/languages/${id}`);
    dispatch({ type: DELETE_LANGUAGE, payload: id });
    //history.push("/");
  };
};


////////////////////////////////////////NICHES///////////////////////////////
//NICHES resources crud operations
export const createNiche = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/niches", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_NICHE, payload: response.data });
    // history.push("/");
  };
};

export const fetchNiches = () => {
  return async (dispatch) => {
    const response = await data.get("/niches");
    dispatch({ type: FETCH_NICHES, payload: response.data.data.data });
  };
};

export const fetchNiche = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/niches/${id}`);
    dispatch({ type: FETCH_NICHE, payload: response.data.data });
  };
};

export const editNiche = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/niches/${id}`, formValues);
    dispatch({ type: EDIT_NICHE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteNiche = (id) => {
  return async (dispatch) => {
    await data.delete(`/niches/${id}`);
    dispatch({ type: DELETE_NICHE, payload: id });
    //history.push("/");
  };
};


////////////////////////////////////////PROJECTS///////////////////////////////
//PROJECTS resources crud operations
export const createProject = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/projects", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_PROJECT, payload: response.data });
    // history.push("/");
  };
};

export const fetchProjects = () => {
  return async (dispatch) => {
    const response = await data.get("/projects");
    dispatch({ type: FETCH_PROJECTS, payload: response.data.data.data });
  };
};

export const fetchProject= (id) => {
  return async (dispatch) => {
    const response = await data.get(`/projects/${id}`);
    dispatch({ type: FETCH_PROJECT, payload: response.data.data });
  };
};

export const editProject = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/projects/${id}`, formValues);
    dispatch({ type: EDIT_PROJECT, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteProject = (id) => {
  return async (dispatch) => {
    await data.delete(`/projects/${id}`);
    dispatch({ type: DELETE_PROJECT, payload: id });
    //history.push("/");
  };
};


////////////////////////////////////////BRANDS///////////////////////////////
//BRANDS resources crud operations
export const createBrand = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/brands", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_BRAND, payload: response.data });
    // history.push("/");
  };
};

export const fetchBrands = () => {
  return async (dispatch) => {
    const response = await data.get("/brands");
    dispatch({ type: FETCH_BRANDS, payload: response.data.data.data });
  };
};

export const fetchBrand= (id) => {
  return async (dispatch) => {
    const response = await data.get(`/brands/${id}`);
    dispatch({ type: FETCH_BRAND, payload: response.data.data });
  };
};

export const editBrand = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/brands/${id}`, formValues);
    dispatch({ type: EDIT_BRAND, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteBrand = (id) => {
  return async (dispatch) => {
    await data.delete(`/brands/${id}`);
    dispatch({ type: DELETE_BRAND, payload: id });
    //history.push("/");
  };
};


////////////////////////////////////////CREATORS///////////////////////////////
//CREATORS resources crud operations
export const createCreator = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/creators", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CREATOR, payload: response.data });
    // history.push("/");
  };
};

export const fetchCreators = () => {
  return async (dispatch) => {
    const response = await data.get("/creators");
    dispatch({ type: FETCH_CREATORS, payload: response.data.data.data });
  };
};

export const fetchCreator= (id) => {
  return async (dispatch) => {
    const response = await data.get(`/creators/${id}`);
    dispatch({ type: FETCH_CREATOR, payload: response.data.data });
  };
};

export const editCreator = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/creators/${id}`, formValues);
    dispatch({ type: EDIT_CREATOR, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteCreator = (id) => {
  return async (dispatch) => {
    await data.delete(`/creators/${id}`);
    dispatch({ type: DELETE_CREATOR, payload: id });
    //history.push("/");
  };
};



////////////////////////////////////////CREATOR SAMPLES///////////////////////////////
//CREATORS resources crud operations
export const createSample = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/samples", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_SAMPLE, payload: response.data });
    // history.push("/");
  };
};

export const fetchSamples = () => {
  return async (dispatch) => {
    const response = await data.get("/samples");
    dispatch({ type: FETCH_SAMPLES, payload: response.data.data.data });
  };
};

export const fetchSample= (id) => {
  return async (dispatch) => {
    const response = await data.get(`/samples/${id}`);
    dispatch({ type: FETCH_SAMPLE, payload: response.data.data });
  };
};

export const editSample = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/samples/${id}`, formValues);
    dispatch({ type: EDIT_SAMPLE, payload: response.data.data });
    //history.push("/");
  };
};

export const deleteSample = (id) => {
  return async (dispatch) => {
    await data.delete(`/samples/${id}`);
    dispatch({ type: DELETE_SAMPLE, payload: id });
    //history.push("/");
  };
};