import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import cityReducer from "./cityReducer";
import orderReducer from "./orderReducer";
import paymentReducer from "./paymentReducer";
import paymentCompleteReducer from "./paymentCompleteReducer";
import paymentPartialReducer from "./paymentPartialReducer";
import policyReducer from "./policyReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";
import vendorReducer from "./vendorReducer";
import ordersAssignedReducer from "./ordersAssignedReducer";
import ordersCompletedReducer from "./ordersCompletedReducer";
import orderOnTransitReducer from "./orderOnTransitReducer";
import transactionReducer from "./transactionReducer";
import instructorReducer from "./instructorReducer";
import assessorReducer from "./assessorReducer";
import mentorReducer from "./mentorReducer";
import courseInstructorReducer from "./courseInstructorReducer";
import courseAssessorReducer from "./courseAssessorReducer";
import courseMentorReducer from "./courseMentorReducer";
import courseLessonReducer from "./courseLessonReducer";
import courseTopicReducer from "./courseTopicReducer";
import languageReducer from "./languageReducer";
import nicheReducer from "./nicheReducer";
import projectReducer from "./projectReducer";
import creatorReducer from "./creatorReducer";
import brandReducer from "./brandReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  category: categoryReducer,
  city: cityReducer,
  order: orderReducer,
  orderAssigned: ordersAssignedReducer,
  orderCompleted: ordersCompletedReducer,
  orderOnTransit: orderOnTransitReducer,
  payment: paymentReducer,
  paymentComplete: paymentCompleteReducer,
  paymentPartial: paymentPartialReducer,
  policy: policyReducer,
  product: productReducer,
  user: userReducer,
  vendor: vendorReducer,
  transaction: transactionReducer,
  instructor: instructorReducer,
  assessor: assessorReducer,
  mentor: mentorReducer,
  courseInstructor: courseInstructorReducer,
  courseAssessor: courseAssessorReducer,
  courseMentor: courseMentorReducer,
  courseLesson: courseLessonReducer,
  courseTopic: courseTopicReducer,
  language: languageReducer,
  niche: nicheReducer,
  project: projectReducer,
  creator: creatorReducer,
  brand: brandReducer,
});
