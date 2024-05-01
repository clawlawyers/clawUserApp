import { CHANGEVARIABLE } from './type';

export const changeVariable = (key, value) => ({
  type: CHANGEVARIABLE,
  payload: { key, value },
});

export const productionFlag = false;


// USER API ENDPOINTS
export const REGISTER_URL = "https://claw-backend.onrender.com/api/v1/client/register";
export const PHONE_VERIFY_URL = 'https://claw-backend.onrender.com/api/v1/client/verify';
export const USER_PROFILE_URL = "https://claw-backend.onrender.com/api/v1/client/auth/me";

// LEGALGPT ENDPOINTS

export const NEW_USER_URL = "https://claw-backend.onrender.com/api/v1/gpt/user";
export const NEW_SESSION_URL = "https://claw-backend.onrender.com/api/v1/gpt/session/";
export const NEW_MESSAGE_URL = "https://claw-backend.onrender.com/api/v1/gpt/session/prompt";
export const RETREIVE_SESSIONS = "https://claw-backend.onrender.com/api/v1/gpt/sessions/legalGPT";
export const RETREIVE_MESSAGES = "https://claw-backend.onrender.com/api/v1/gpt/session/";
export const TOKEN_URL = "https://claw-backend.onrender.com/api/v1/gpt/user"; 


export const CASE_SEARCH_URL = "https://claw-backend.onrender.com/api/v1/gpt/case/search"
export const CASE_RETREIVAL_URL = "https://claw-backend.onrender.com/api/v1/gpt/case/";

// REFERRAL CODE ENDPOINTS
export const CODE_REDEEM_URL = "https://claw-backend.onrender.com/api/v1/gpt/referralCode/redeem";
export const CODE_GENERATE_URL = "https://claw-backend.onrender.com/api/v1/gpt/referralCode/generate";

// NEWS ENDPOINT

export const NEWS_URL = "https://claw-backend.onrender.com/api/v1/news";

// PAYMENT ENDPOINTS
export const CREATE_PAYMENT_DEV = "https://claw-app-dev.onrender.com/api/v1/payment/create-payment-order";
export const CREATE_PAYMENT_PROD = "https://claw-backend.onrender.com/api/v1/payment/create-payment-order";

export const PUBLISHABLE_KEY ="pk_test_51P0LtFSA4IzTuBkCjkRkujJAnG6HmdiJX6We0G9502KzaY9uPtnabMOgW21vPM0FdboI9qvaCfJb1i53y3xS3iA400kApsBbxo";

