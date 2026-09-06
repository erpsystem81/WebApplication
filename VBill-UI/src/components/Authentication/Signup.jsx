import React, { useState } from "react";
import { useNavigate } from "react-router";
import MasterCard from "../common/MasterCard";
import FormRow from "../common/FormRow";
import FormField from "../common/FormField";
import TextInput from "../common/TextInput";
import Toast from "../common/Toast";
import PageTitle from "../common/PageTitle";

import {
    PrimaryButton,
    SecondaryButton
} from "../common/ActionBtn";

import T from "../common/MasterStyles";

/* =========================================================
   AUTHENTICATION SERVICE
========================================================= */

import { signup } from "../../services/AuthenticationService";

/* ────────────────────────────────────────────────────────── */

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
};

export default function Signup() {

    const [form, setForm] = useState(initialForm);

    const [focused, setFocused] = useState("");

    const [errors, setErrors] = useState({});

    const [submitted, setSubmitted] = useState(false);

    const [loading, setLoading] = useState(false);

    const [apiError, setApiError] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    const navigate = useNavigate();

    /* ───────────────────────────────────────────────────── */

    const handleChange = (field) => (e) => {

        const value = String(e.target.value);

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {

            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));

        }

        setApiError(null);
    };

    /* ───────────────────────────────────────────────────── */

    const validate = () => {

        const newErrors = {};

        /*
         * REQUIRED FIELDS
         */

        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "mobileNumber",
            "password",
            "confirmPassword",
        ];

        requiredFields.forEach((field) => {

            if (
                form[field] === null ||
                form[field] === undefined ||
                form[field].trim() === ""
            ) {

                newErrors[field] =
                    "This field is required";

            }

        });

        /*
         * EMAIL VALIDATION
         */

        if (form.email) {

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    form.email.trim()
                )
            ) {

                newErrors.email =
                    "Enter valid email address";

            }

        }

        /*
         * MOBILE VALIDATION
         */

        if (form.mobileNumber) {

            const mobile =
                form.mobileNumber.replace(/\s/g, "");

            if (!/^\d{10}$/.test(mobile)) {

                newErrors.mobileNumber =
                    "Enter valid 10 digit mobile number";

            }

        }

        /*
         * PASSWORD VALIDATION
         */

        if (form.password) {

            if (form.password.length < 8) {

                newErrors.password =
                    "Password must be at least 8 characters";

            }

        }

        /*
         * CONFIRM PASSWORD
         */

        if (
            form.password &&
            form.confirmPassword &&
            form.password !== form.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match";

        }

        return newErrors;
    };

    /* ───────────────────────────────────────────────────── */

    const handleSignup = async () => {

        /*
         * VALIDATE FORM
         */

        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {

            setErrors(newErrors);

            return;
        }

        setLoading(true);

        setApiError(null);

        setSubmitted(false);

        try {

            /*
             * PREPARE REQUEST
             */

            const payload = {

                firstName:
                    form.firstName.trim(),

                lastName:
                    form.lastName.trim(),

                email:
                    form.email.trim().toLowerCase(),

                mobileNumber:
                    form.mobileNumber.replace(/\s/g, ""),

                password:
                    form.password,

                confirmPassword:
                    form.confirmPassword,
            };

            console.log(
                "Signup Request:",
                payload
            );

            /*
             * CALL BACKEND API
             */

            const response =
                await signup(payload);

            console.log(
                "Signup Response:",
                response
            );

            /*
             * SUCCESS
             */

            setSubmitted(true);

            /*
             * Clear form after successful signup
             */

            setForm(initialForm);

            setErrors({});

            setShowPassword(false);

            setShowConfirmPassword(false);

            /*
             * Hide success message
             */

            setTimeout(() => {

                setSubmitted(false);

            }, 3000);

        } catch (err) {

            console.error(
                "Signup API Error:",
                err
            );

            /*
             * Handle API error
             */

            let message =
                "Unable to create account.";

            if (err?.response?.data) {

                const data =
                    err.response.data;

                if (typeof data === "string") {

                    message = data;

                } else if (data.message) {

                    message = data.message;

                } else if (data.error) {

                    message = data.error;

                }

            } else if (err?.message) {

                message = err.message;

            }

            setApiError(message);

        } finally {

            setLoading(false);

        }

    };

    /* ───────────────────────────────────────────────────── */

    const handleClear = () => {

        setForm(initialForm);

        setErrors({});

        setApiError(null);

        setSubmitted(false);

        setShowPassword(false);

        setShowConfirmPassword(false);

    };

    /* ───────────────────────────────────────────────────── */

    const handleLogin = () => {

        navigate("/login");

    };

    /* ───────────────────────────────────────────────────── */

    return (

        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: T.contentBg,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                padding: "20px 15px",

                boxSizing: "border-box",

                fontFamily: "'Segoe UI', sans-serif",
            }}
        >

            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}

            <div
                style={{
                    width: "100%",
                    maxWidth: "760px",
                    margin: "0 auto",
                }}
            >

                {/* =====================================================
                    SIGNUP HEADER
                ====================================================== */}

                {/* <div
                    style={{
                        textAlign: "center",
                        marginBottom: "14px",
                    }}
                >

                    <div
                        style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            color: T.menuText,
                            marginBottom: "4px",
                        }}
                    >
                        V-Bill
                    </div>

                    <div
                        style={{
                            fontSize: "13px",
                            color: T.mutedText,
                        }}
                    >
                        Create your account to get started.
                    </div>

                </div> */}
                <PageTitle
                title="V-Bill"
                subtitle="Create your account to get started."
            />


                {/* =====================================================
                    SIGNUP CARD
                ====================================================== */}

                <MasterCard title="Create Account">

                    {/* SUCCESS MESSAGE */}

                    {submitted && (
                        <Toast
                            type="success"
                            message="Account created successfully."
                        />
                    )}


                    {/* ERROR MESSAGE */}

                    {apiError && (
                        <Toast
                            type="error"
                            message={apiError}
                        />
                    )}


                    {/* =================================================
                        FORM - EXACTLY 2 FIELDS PER ROW
                    ================================================== */}

                  {/* =================================================
    FORM
================================================== */}

<div
    style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxSizing: "border-box",
    }}
>

    {/* =================================================
        ROW 1 - FIRST NAME / LAST NAME
    ================================================== */}

    <div
        style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            boxSizing: "border-box",
        }}
    >

        {/* FIRST NAME */}

        <div
            style={{
                minWidth: 0,
                width: "100%",
            }}
        >

            <FormField
                label="First Name"
                required
                error={errors.firstName}
            >

                <TextInput
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    placeholder="Enter first name"
                    focused={focused === "firstName"}
                    onFocus={() =>
                        setFocused("firstName")
                    }
                    onBlur={() =>
                        setFocused("")
                    }
                />

            </FormField>

        </div>


        {/* LAST NAME */}

        <div
            style={{
                minWidth: 0,
                width: "100%",
            }}
        >

            <FormField
                label="Last Name"
                required
                error={errors.lastName}
            >

                <TextInput
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    placeholder="Enter last name"
                    focused={focused === "lastName"}
                    onFocus={() =>
                        setFocused("lastName")
                    }
                    onBlur={() =>
                        setFocused("")
                    }
                />

            </FormField>

        </div>

    </div>


    {/* =================================================
        ROW 2 - EMAIL / MOBILE NUMBER
    ================================================== */}

    <div
        style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            boxSizing: "border-box",
        }}
    >

        {/* EMAIL */}

        <div
            style={{
                minWidth: 0,
                width: "100%",
            }}
        >

            <FormField
                label="Email Address"
                required
                error={errors.email}
            >

                <TextInput
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="example@email.com"
                    focused={focused === "email"}
                    onFocus={() =>
                        setFocused("email")
                    }
                    onBlur={() =>
                        setFocused("")
                    }
                />

            </FormField>

        </div>


        {/* MOBILE NUMBER */}

        <div
            style={{
                minWidth: 0,
                width: "100%",
            }}
        >

            <FormField
                label="Mobile Number"
                required
                error={errors.mobileNumber}
            >

                <TextInput
                    type="tel"
                    value={form.mobileNumber}
                    onChange={handleChange("mobileNumber")}
                    placeholder="Enter 10 digit mobile number"
                    focused={focused === "mobileNumber"}
                    onFocus={() =>
                        setFocused("mobileNumber")
                    }
                    onBlur={() =>
                        setFocused("")
                    }
                />

            </FormField>

        </div>

    </div>


    {/* =================================================
        ROW 3 - PASSWORD / CONFIRM PASSWORD
    ================================================== */}

    <div
        style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            boxSizing: "border-box",
        }}
    >

        {/* PASSWORD */}

        <div
            style={{
                minWidth: 0,
                width: "100%",
            }}
        >

            <FormField
                label="Password"
                required
                error={errors.password}
            >

                <div
                    style={{
                        position: "relative",
                        width: "100%",
                    }}
                >

                    <TextInput
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        value={form.password}
                        onChange={handleChange("password")}
                        placeholder="Enter password"
                        focused={focused === "password"}
                        onFocus={() =>
                            setFocused("password")
                        }
                        onBlur={() =>
                            setFocused("")
                        }
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                (prev) => !prev
                            )
                        }
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform:
                                "translateY(-50%)",
                            border: "none",
                            background: "transparent",
                            color: T.mutedText,
                            cursor: "pointer",
                            fontSize: "12px",
                            padding: "4px",
                        }}
                    >
                        {showPassword
                            ? "Hide"
                            : "Show"}
                    </button>

                </div>

            </FormField>

        </div>


        {/* CONFIRM PASSWORD */}

        <div
            style={{
                minWidth: 0,
                width: "100%",
            }}
        >

            <FormField
                label="Confirm Password"
                required
                error={errors.confirmPassword}
            >

                <div
                    style={{
                        position: "relative",
                        width: "100%",
                    }}
                >

                    <TextInput
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        value={form.confirmPassword}
                        onChange={handleChange(
                            "confirmPassword"
                        )}
                        placeholder="Confirm password"
                        focused={
                            focused ===
                            "confirmPassword"
                        }
                        onFocus={() =>
                            setFocused(
                                "confirmPassword"
                            )
                        }
                        onBlur={() =>
                            setFocused("")
                        }
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                (prev) => !prev
                            )
                        }
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform:
                                "translateY(-50%)",
                            border: "none",
                            background: "transparent",
                            color: T.mutedText,
                            cursor: "pointer",
                            fontSize: "12px",
                            padding: "4px",
                        }}
                    >
                        {showConfirmPassword
                            ? "Hide"
                            : "Show"}
                    </button>

                </div>

            </FormField>

        </div>

    </div>

</div>

                    {/* =================================================
                        BOTTOM SECTION
                    ================================================== */}

                    <div
                        style={{
                            marginTop: "16px",
                            paddingTop: "12px",
                            borderTop:
                                `1px solid ${T.border}`,
                        }}
                    >

                        {/* REQUIRED TEXT */}

                        <div
                            style={{
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >

                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "11px",
                                    color: T.mutedText,
                                }}
                            >
                                Fields marked{" "}

                                <span
                                    style={{
                                        color: T.accent,
                                        fontWeight: "700",
                                    }}
                                >
                                    *
                                </span>{" "}

                                are required
                            </p>

                        </div>


                        {/* BUTTONS */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "10px",
                                marginBottom: "10px",
                            }}
                        >

                            <SecondaryButton
                                onClick={handleClear}
                            >
                                Clear
                            </SecondaryButton>

                            <PrimaryButton
                                onClick={handleSignup}
                                loading={loading}
                            >
                                {loading
                                    ? "Creating..."
                                    : "Create Account"}
                            </PrimaryButton>

                        </div>


                        {/* LOGIN */}

                        <div
                            style={{
                                textAlign: "center",
                            }}
                        >

                            <span
                                style={{
                                    fontSize: "12px",
                                    color: T.mutedText,
                                }}
                            >
                                Already have an account?{" "}
                            </span>

                            <span
                                onClick={handleLogin}
                                style={{
                                    color: T.accent,
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                Login
                            </span>

                        </div>

                    </div>

                </MasterCard>


                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "12px",
                        fontSize: "11px",
                        color: T.mutedText,
                    }}
                >
                    © 2026 V-Bill Billing Software
                </div>

            </div>

        </div>

    );

}