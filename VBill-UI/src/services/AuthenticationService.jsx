import api from "../api/api";

const BASE_URL = "/vbill/api/authentication";

/* -----------------------------
   Signup
----------------------------- */

export const signup = (data) => {
    return api.post(`${BASE_URL}/signup`, data);
};

/* -----------------------------
   Get All Users
----------------------------- */

export const getAllUsers = () => {
    return api.get(`${BASE_URL}/getAll`);
};


/* -----------------------------
   Login Email + Password
----------------------------- */

export const loginUser = (requestData) => {

    return api.post(
        "/vbill/api/authentication/login",
        requestData
    );
};


/* -----------------------------
   Send Mobile OTP
----------------------------- */

export const sendOtp = (data) => {
    return api.post(`${BASE_URL}/sendOtp`, data);
};


/* -----------------------------
   Verify Mobile OTP
----------------------------- */

export const verifyOtp = (data) => {
    return api.post(`${BASE_URL}/verifyOtp`, data);
};


/* -----------------------------
   Login Mobile + OTP
----------------------------- */

export const loginMobileOtp = (data) => {
    return api.post(
        `${BASE_URL}/loginMobileOtp`,
        data
    );
};


/* -----------------------------
   Forgot Password
----------------------------- */

export const forgotPassword = (data) => {
    return api.post(
        `${BASE_URL}/forgotPassword`,
        data
    );
};


/* -----------------------------
   Reset Password
----------------------------- */

export const resetPassword = (data) => {
    return api.post(
        `${BASE_URL}/resetPassword`,
        data
    );
};


/* -----------------------------
   Logout
----------------------------- */

export const logout = () => {

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

};

