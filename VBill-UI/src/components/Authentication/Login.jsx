import React, { useEffect, useState } from "react";
import {
    useNavigate,
} from "react-router-dom";

import TextInput from "../common/TextInput";
import Toast from "../common/Toast";

import {
    PrimaryButton,
    SecondaryButton
} from "../common/ActionBtn";

import T from "../common/MasterStyles";
import {
    loginUser
} from "../../services/AuthenticationService";

import PageTitle from "../common/PageTitle";


/* =========================================================
   INITIAL FORM
========================================================= */

const initialForm = {
    email: "",
    password: "",
    mobileNumber: "",
    otp: "",
};


/* =========================================================
   LOGIN
========================================================= */

export default function Login() {

    const navigate = useNavigate();


    /* =====================================================
       STATE
    ===================================================== */

    const [form, setForm] =
        useState(initialForm);

    const [loginType, setLoginType] =
        useState("email");

    const [focused, setFocused] =
        useState("");

    const [errors, setErrors] =
        useState({});

    const [loading, setLoading] =
        useState(false);

    const [otpLoading, setOtpLoading] =
        useState(false);

    const [otpSent, setOtpSent] =
        useState(false);

    const [apiError, setApiError] =
        useState(null);

    const [submitted, setSubmitted] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);


    /* =====================================================
       CHECK EXISTING SESSION
       
       If user is already logged in and opens /login,
       send them directly to dashboard.
    ===================================================== */

    useEffect(() => {

        let token = null;

        try {

            token =
                sessionStorage.getItem("token");

        } catch (error) {

            console.warn(
                "Unable to access sessionStorage:",
                error
            );

        }

        if (token) {

            navigate(
                "/dashboard",
                {
                    replace: true
                }
            );

        }

    }, [navigate]);


    /* =====================================================
       HANDLE CHANGE
    ===================================================== */

    const handleChange =
        (field) => (e) => {

            const value =
                String(e.target.value);

            setForm((prev) => ({
                ...prev,
                [field]: value,
            }));


            /* Clear field error */

            if (errors[field]) {

                setErrors((prev) => ({
                    ...prev,
                    [field]: "",
                }));

            }


            /* Clear API error */

            setApiError(null);

        };


    /* =====================================================
       CHANGE LOGIN TYPE
    ===================================================== */

    const handleLoginTypeChange =
        (type) => {

            setLoginType(type);

            setForm(initialForm);

            setErrors({});

            setApiError(null);

            setSubmitted(false);

            setOtpSent(false);

            setFocused("");

            setShowPassword(false);

        };


    /* =====================================================
       VALIDATION
    ===================================================== */

    const validate = () => {

        const newErrors = {};


        /* =================================================
           EMAIL LOGIN
        ================================================= */

        if (loginType === "email") {

            if (
                !form.email ||
                form.email.trim() === ""
            ) {

                newErrors.email =
                    "Email address is required";

            } else if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    form.email.trim()
                )
            ) {

                newErrors.email =
                    "Enter valid email address";

            }


            if (
                !form.password ||
                form.password.trim() === ""
            ) {

                newErrors.password =
                    "Password is required";

            }

        }


        /* =================================================
           MOBILE LOGIN
        ================================================= */

        if (loginType === "mobile") {

            if (
                !form.mobileNumber ||
                form.mobileNumber.trim() === ""
            ) {

                newErrors.mobileNumber =
                    "Mobile number is required";

            } else if (
                !/^\d{10}$/.test(
                    form.mobileNumber.replace(/\s/g, "")
                )
            ) {

                newErrors.mobileNumber =
                    "Enter valid 10 digit mobile number";

            }


            /*
             * OTP is required only after OTP has
             * been sent.
             */

            if (otpSent) {

                if (
                    !form.otp ||
                    form.otp.trim() === ""
                ) {

                    newErrors.otp =
                        "OTP is required";

                } else if (
                    !/^\d{6}$/.test(
                        form.otp.trim()
                    )
                ) {

                    newErrors.otp =
                        "Enter valid 6 digit OTP";

                }

            }

        }


        return newErrors;

    };


    /* =====================================================
       CREATE LOGIN SESSION
       
       Keep ALL sessionStorage logic in one place.
    ===================================================== */

    const createLoginSession =
        (data) => {

            if (!data?.token) {

                throw new Error(
                    "Login successful, but JWT token was not received."
                );

            }


            const userData = {

                userAccountId:
                    data.userAccountId,

                firstName:
                    data.firstName,

                lastName:
                    data.lastName,

                email:
                    data.email,

                mobileNumber:
                    data.mobileNumber,

                loginType:
                    data.loginType

            };


            try {

                /*
                 * Store JWT
                 */

                sessionStorage.setItem(
                    "token",
                    data.token
                );


                /*
                 * Store logged-in user
                 */

                sessionStorage.setItem(
                    "user",
                    JSON.stringify(userData)
                );


                /*
                 * Verify storage
                 */

                const savedToken =
                    sessionStorage.getItem("token");

                const savedUser =
                    sessionStorage.getItem("user");


                console.log(
                    "SESSION TOKEN SAVED:",
                    !!savedToken
                );

                console.log(
                    "SESSION USER SAVED:",
                    !!savedUser
                );


                if (!savedToken) {

                    throw new Error(
                        "JWT token could not be saved."
                    );

                }


                if (!savedUser) {

                    throw new Error(
                        "User session could not be saved."
                    );

                }


                console.log(
                    "Login session created successfully."
                );

            } catch (storageError) {

                console.error(
                    "SESSION STORAGE ERROR:",
                    storageError
                );

                throw new Error(
                    "Unable to create browser session."
                );

            }

        };


    /* =====================================================
       LOGIN
    ===================================================== */

    const handleLogin =
        async () => {

            /* ---------------------------------------------
               VALIDATE
            --------------------------------------------- */

            const newErrors =
                validate();


            if (
                Object.keys(newErrors).length > 0
            ) {

                setErrors(newErrors);

                return;

            }


            setLoading(true);

            setApiError(null);

            setSubmitted(false);


            try {

                /* -----------------------------------------
                   REQUEST DATA
                ----------------------------------------- */

                const requestData = {

                    loginType:
                        loginType === "email"
                            ? "EMAIL"
                            : "MOBILE",

                    email:
                        loginType === "email"
                            ? form.email
                                .trim()
                                .toLowerCase()
                            : null,

                    password:
                        loginType === "email"
                            ? form.password
                            : null,

                    mobileNumber:
                        loginType === "mobile"
                            ? form.mobileNumber
                                .replace(/\s/g, "")
                            : null,

                    otp:
                        loginType === "mobile"
                            ? form.otp.trim()
                            : null

                };


                console.log(
                    "Login Request:",
                    requestData
                );


                /* -----------------------------------------
                   API CALL
                ----------------------------------------- */

                const response =
                    await loginUser(
                        requestData
                    );


                console.log(
                    "Login Response:",
                    response.data
                );


                const data =
                    response?.data;


                /* -----------------------------------------
                   CHECK RESPONSE
                ----------------------------------------- */

                if (
                    data?.success !== true
                ) {

                    setSubmitted(false);

                    setApiError(
                        data?.message ||
                        "Unable to login."
                    );

                    return;

                }


                /* -----------------------------------------
                   CREATE SESSION
                ----------------------------------------- */

                createLoginSession(data);


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                setSubmitted(true);

                setApiError(null);


                /*
                 * Redirect to dashboard
                 */

                navigate(
                    "/dashboard",
                    {
                        replace: true
                    }
                );

            } catch (err) {

                console.error(
                    "Login API Error:",
                    err
                );


                setSubmitted(false);


                /*
                 * Backend error
                 */

                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Unable to login.";


                setApiError(message);

            } finally {

                setLoading(false);

            }

        };


    /* =====================================================
       SEND OTP
       
       CURRENTLY TEMPORARY.
       
       Your backend OTP flow will be connected separately.
    ===================================================== */

    const handleSendOtp =
        async () => {

            const newErrors = {};


            if (
                !form.mobileNumber ||
                form.mobileNumber.trim() === ""
            ) {

                newErrors.mobileNumber =
                    "Mobile number is required";

            } else if (
                !/^\d{10}$/.test(
                    form.mobileNumber.replace(/\s/g, "")
                )
            ) {

                newErrors.mobileNumber =
                    "Enter valid 10 digit mobile number";

            }


            if (
                Object.keys(newErrors).length > 0
            ) {

                setErrors(newErrors);

                return;

            }


            setOtpLoading(true);

            setApiError(null);


            try {

                /*
                 * TEMPORARY
                 *
                 * Backend OTP API will be connected
                 * in the next step.
                 */

                await new Promise(
                    (resolve) =>
                        setTimeout(
                            resolve,
                            500
                        )
                );


                setOtpSent(true);

            } catch (err) {

                setApiError(
                    err?.message ||
                    "Unable to send OTP."
                );

            } finally {

                setOtpLoading(false);

            }

        };


    /* =====================================================
       FORGOT PASSWORD
    ===================================================== */

    const handleForgotPassword =
        () => {

            navigate(
                "/forgotpassword"
            );

        };


    /* =====================================================
       SIGNUP
    ===================================================== */

    const handleSignup =
        () => {

            navigate(
                "/signup"
            );

        };


    /* =====================================================
       CLEAR
    ===================================================== */

    const handleClear =
        () => {

            setForm(initialForm);

            setErrors({});

            setApiError(null);

            setSubmitted(false);

            setOtpSent(false);

            setFocused("");

            setShowPassword(false);

        };


    /* =====================================================
       FIELD STYLES
    ===================================================== */

    const fieldContainerStyle = {

        flex: 1,

        minWidth: 0,

    };


    const labelStyle = {

        display: "block",

        marginBottom: "7px",

        fontSize: "12px",

        fontWeight: "600",

        color: T.menuText,

    };


    const requiredStyle = {

        color: T.accent,

        marginLeft: "3px",

    };


    const errorStyle = {

        marginTop: "5px",

        fontSize: "11px",

        color: "#dc3545",

    };


    /* =====================================================
       UI
    ===================================================== */

    return (

        <div
            style={{
                minHeight: "100vh",

                width: "100%",

                backgroundColor:
                    T.contentBg,

                display: "flex",

                alignItems: "center",

                justifyContent:
                    "center",

                padding:
                    "30px 15px",

                boxSizing:
                    "border-box",

                fontFamily:
                    "'Segoe UI', sans-serif",
            }}
        >

            <div
                style={{
                    width: "100%",

                    maxWidth: "520px",

                }}
            >

                {/* =================================================
                    HEADER
                ================================================== */}

                <PageTitle
                    title="V-Bill"
                    subtitle="Welcome back! Please login to continue."
                />


                {/* =================================================
                    LOGIN CARD
                ================================================== */}

                <div
                    style={{
                        backgroundColor:
                            T.inputBg,

                        border:
                            `1px solid ${T.border}`,

                        borderRadius:
                            "12px",

                        padding:
                            "28px",

                        boxSizing:
                            "border-box",

                        boxShadow:
                            "0 8px 25px rgba(0,0,0,0.06)",
                    }}
                >

                    {/* =================================================
                        TITLE
                    ================================================== */}

                    <div
                        style={{
                            textAlign:
                                "center",

                            marginBottom:
                                "22px",
                        }}
                    >

                        <div
                            style={{
                                fontSize:
                                    "20px",

                                fontWeight:
                                    "600",

                                color:
                                    T.menuText,
                            }}
                        >
                            Login
                        </div>

                    </div>


                    {/* =================================================
                        SUCCESS
                    ================================================== */}

                    {submitted && (

                        <div
                            style={{
                                marginBottom:
                                    "15px",
                            }}
                        >

                            <Toast
                                type="success"
                                message="Login successful."
                            />

                        </div>

                    )}


                    {/* =================================================
                        ERROR
                    ================================================== */}

                    {apiError && (

                        <div
                            style={{
                                marginBottom:
                                    "15px",
                            }}
                        >

                            <Toast
                                type="error"
                                message={apiError}
                            />

                        </div>

                    )}


                    {/* =================================================
                        LOGIN TYPE
                    ================================================== */}

                    <div
                        style={{
                            display:
                                "flex",

                            justifyContent:
                                "center",

                            gap:
                                "25px",

                            marginBottom:
                                "25px",
                        }}
                    >

                        <button
                            type="button"
                            onClick={() =>
                                handleLoginTypeChange(
                                    "email"
                                )
                            }
                            style={{
                                border:
                                    "none",

                                borderBottom:
                                    loginType === "email"
                                        ? `2px solid ${T.accent}`
                                        : "2px solid transparent",

                                backgroundColor:
                                    "transparent",

                                color:
                                    loginType === "email"
                                        ? T.accent
                                        : T.mutedText,

                                padding:
                                    "7px 3px",

                                cursor:
                                    "pointer",

                                fontSize:
                                    "13px",

                                fontWeight:
                                    "600",

                                transition:
                                    "all 0.2s ease",
                            }}
                        >
                            Email + Password
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                handleLoginTypeChange(
                                    "mobile"
                                )
                            }
                            style={{
                                border:
                                    "none",

                                borderBottom:
                                    loginType === "mobile"
                                        ? `2px solid ${T.accent}`
                                        : "2px solid transparent",

                                backgroundColor:
                                    "transparent",

                                color:
                                    loginType === "mobile"
                                        ? T.accent
                                        : T.mutedText,

                                padding:
                                    "7px 3px",

                                cursor:
                                    "pointer",

                                fontSize:
                                    "13px",

                                fontWeight:
                                    "600",

                                transition:
                                    "all 0.2s ease",
                            }}
                        >
                            Mobile + OTP
                        </button>

                    </div>


                    {/* =================================================
                        EMAIL LOGIN
                    ================================================== */}

                    {loginType === "email" && (

                        <div
                            style={{
                                display:
                                    "flex",

                                gap:
                                    "16px",

                                flexWrap:
                                    "wrap",
                            }}
                        >

                            {/* EMAIL */}

                            <div
                                style={
                                    fieldContainerStyle
                                }
                            >

                                <label
                                    style={
                                        labelStyle
                                    }
                                >

                                    Email Address

                                    <span
                                        style={
                                            requiredStyle
                                        }
                                    >
                                        *
                                    </span>

                                </label>


                                <TextInput
                                    type="email"
                                    value={
                                        form.email
                                    }
                                    onChange={
                                        handleChange(
                                            "email"
                                        )
                                    }
                                    placeholder="abc@gmail.com"
                                    focused={
                                        focused ===
                                        "email"
                                    }
                                    onFocus={() =>
                                        setFocused(
                                            "email"
                                        )
                                    }
                                    onBlur={() =>
                                        setFocused("")
                                    }
                                />


                                {errors.email && (

                                    <div
                                        style={
                                            errorStyle
                                        }
                                    >
                                        {
                                            errors.email
                                        }
                                    </div>

                                )}

                            </div>


                            {/* PASSWORD */}

                            <div
                                style={
                                    fieldContainerStyle
                                }
                            >

                                <label
                                    style={
                                        labelStyle
                                    }
                                >

                                    Password

                                    <span
                                        style={
                                            requiredStyle
                                        }
                                    >
                                        *
                                    </span>

                                </label>


                                <div
                                    style={{
                                        position:
                                            "relative",
                                    }}
                                >

                                    <TextInput
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            form.password
                                        }
                                        onChange={
                                            handleChange(
                                                "password"
                                            )
                                        }
                                        placeholder="Enter password"
                                        focused={
                                            focused ===
                                            "password"
                                        }
                                        onFocus={() =>
                                            setFocused(
                                                "password"
                                            )
                                        }
                                        onBlur={() =>
                                            setFocused("")
                                        }
                                    />


                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) =>
                                                    !prev
                                            )
                                        }
                                        style={{
                                            position:
                                                "absolute",

                                            right:
                                                "10px",

                                            top:
                                                "50%",

                                            transform:
                                                "translateY(-50%)",

                                            border:
                                                "none",

                                            background:
                                                "transparent",

                                            color:
                                                T.mutedText,

                                            cursor:
                                                "pointer",

                                            fontSize:
                                                "11px",

                                            padding:
                                                "4px",
                                        }}
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>


                                {errors.password && (

                                    <div
                                        style={
                                            errorStyle
                                        }
                                    >
                                        {
                                            errors.password
                                        }
                                    </div>

                                )}

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        FORGOT PASSWORD
                    ================================================== */}

                    {loginType === "email" && (

                        <div
                            style={{
                                textAlign:
                                    "right",

                                marginTop:
                                    "10px",
                            }}
                        >

                            <span
                                onClick={
                                    handleForgotPassword
                                }
                                style={{
                                    color:
                                        T.accent,

                                    fontSize:
                                        "12px",

                                    fontWeight:
                                        "600",

                                    cursor:
                                        "pointer",
                                }}
                            >
                                Forgot Password?
                            </span>

                        </div>

                    )}


                    {/* =================================================
                        MOBILE LOGIN
                    ================================================== */}

                    {loginType === "mobile" && (

                        <div
                            style={{
                                display:
                                    "flex",

                                gap:
                                    "16px",

                                flexWrap:
                                    "wrap",
                            }}
                        >

                            {/* MOBILE NUMBER */}

                            <div
                                style={
                                    fieldContainerStyle
                                }
                            >

                                <label
                                    style={
                                        labelStyle
                                    }
                                >

                                    Mobile Number

                                    <span
                                        style={
                                            requiredStyle
                                        }
                                    >
                                        *
                                    </span>

                                </label>


                                <TextInput
                                    type="tel"
                                    value={
                                        form.mobileNumber
                                    }
                                    onChange={
                                        handleChange(
                                            "mobileNumber"
                                        )
                                    }
                                    placeholder="10 digit mobile number"
                                    focused={
                                        focused ===
                                        "mobileNumber"
                                    }
                                    onFocus={() =>
                                        setFocused(
                                            "mobileNumber"
                                        )
                                    }
                                    onBlur={() =>
                                        setFocused("")
                                    }
                                />


                                {errors.mobileNumber && (

                                    <div
                                        style={
                                            errorStyle
                                        }
                                    >
                                        {
                                            errors.mobileNumber
                                        }
                                    </div>

                                )}

                            </div>


                            {/* OTP */}

                            <div
                                style={
                                    fieldContainerStyle
                                }
                            >

                                <label
                                    style={
                                        labelStyle
                                    }
                                >

                                    OTP

                                    {otpSent && (

                                        <span
                                            style={
                                                requiredStyle
                                            }
                                        >
                                            *
                                        </span>

                                    )}

                                </label>


                                <div
                                    style={{
                                        display:
                                            "flex",

                                        gap:
                                            "7px",
                                    }}
                                >

                                    <div
                                        style={{
                                            flex:
                                                1,

                                            minWidth:
                                                0,
                                        }}
                                    >

                                        <TextInput
                                            type="text"
                                            value={
                                                form.otp
                                            }
                                            onChange={
                                                handleChange(
                                                    "otp"
                                                )
                                            }
                                            placeholder={
                                                otpSent
                                                    ? "Enter OTP"
                                                    : "Send OTP first"
                                            }
                                            focused={
                                                focused ===
                                                "otp"
                                            }
                                            onFocus={() =>
                                                setFocused(
                                                    "otp"
                                                )
                                            }
                                            onBlur={() =>
                                                setFocused("")
                                            }
                                            disabled={
                                                !otpSent
                                            }
                                        />

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            handleSendOtp
                                        }
                                        disabled={
                                            otpLoading
                                        }
                                        style={{
                                            border:
                                                "none",

                                            borderRadius:
                                                "6px",

                                            padding:
                                                "0 12px",

                                            backgroundColor:
                                                T.accent,

                                            color:
                                                "#fff",

                                            cursor:
                                                otpLoading
                                                    ? "not-allowed"
                                                    : "pointer",

                                            fontSize:
                                                "11px",

                                            fontWeight:
                                                "600",

                                            whiteSpace:
                                                "nowrap",

                                            opacity:
                                                otpLoading
                                                    ? 0.7
                                                    : 1,
                                        }}
                                    >
                                        {otpLoading
                                            ? "Sending..."
                                            : otpSent
                                                ? "Resend OTP"
                                                : "Send OTP"}
                                    </button>

                                </div>


                                {errors.otp && (

                                    <div
                                        style={
                                            errorStyle
                                        }
                                    >
                                        {
                                            errors.otp
                                        }
                                    </div>

                                )}

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        BOTTOM SECTION
                    ================================================== */}

                    <div
                        style={{
                            marginTop:
                                "28px",

                            paddingTop:
                                "20px",

                            borderTop:
                                `1px solid ${T.border}`,
                        }}
                    >

                        {/* REQUIRED */}

                        <div
                            style={{
                                textAlign:
                                    "center",

                                marginBottom:
                                    "16px",
                            }}
                        >

                            <p
                                style={{
                                    margin:
                                        0,

                                    fontSize:
                                        "11px",

                                    color:
                                        T.mutedText,
                                }}
                            >

                                Fields marked{" "}

                                <span
                                    style={{
                                        color:
                                            T.accent,

                                        fontWeight:
                                            "700",
                                    }}
                                >
                                    *
                                </span>

                                {" "}are required

                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div
                            style={{
                                display:
                                    "flex",

                                justifyContent:
                                    "center",

                                gap:
                                    "10px",

                                marginBottom:
                                    "16px",
                            }}
                        >

                            <SecondaryButton
                                onClick={
                                    handleClear
                                }
                            >
                                Clear
                            </SecondaryButton>


                            <PrimaryButton
                                onClick={
                                    handleLogin
                                }
                                loading={
                                    loading
                                }
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </PrimaryButton>

                        </div>


                        {/* SIGNUP */}

                        <div
                            style={{
                                textAlign:
                                    "center",
                            }}
                        >

                            <span
                                style={{
                                    fontSize:
                                        "12px",

                                    color:
                                        T.mutedText,
                                }}
                            >
                                Don't have an account?{" "}
                            </span>


                            <span
                                onClick={
                                    handleSignup
                                }
                                style={{
                                    color:
                                        T.accent,

                                    fontSize:
                                        "12px",

                                    fontWeight:
                                        "600",

                                    cursor:
                                        "pointer",
                                }}
                            >
                                Create Account
                            </span>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    FOOTER
                ================================================== */}

                <div
                    style={{
                        textAlign:
                            "center",

                        marginTop:
                            "18px",

                        fontSize:
                            "11px",

                        color:
                            T.mutedText,
                    }}
                >
                    © 2026 V-Bill Billing Software
                </div>

            </div>

        </div>

    );

}