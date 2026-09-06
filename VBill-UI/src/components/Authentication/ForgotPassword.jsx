import React, { useEffect, useState } from "react";

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

/* ──────────────────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────────────────── */

const OTP_EXPIRY_TIME = 60;

/* ──────────────────────────────────────────────────────────
   INITIAL FORM
────────────────────────────────────────────────────────── */

const initialForm = {
    emailOrMobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
};

/* ──────────────────────────────────────────────────────────
   COMPONENT
────────────────────────────────────────────────────────── */

export default function ForgotPassword() {

    const navigate = useNavigate();

    /*
     * STEP
     *
     * 1 = Email / Mobile
     * 2 = OTP
     * 3 = Reset Password
     */
    const [step, setStep] = useState(1);

    const [form, setForm] =
        useState(initialForm);

    const [focused, setFocused] =
        useState("");

    const [errors, setErrors] =
        useState({});

    const [submitted, setSubmitted] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [resending, setResending] =
        useState(false);

    const [apiError, setApiError] =
        useState(null);

    const [secondsLeft, setSecondsLeft] =
        useState(OTP_EXPIRY_TIME);

    const [showPassword, setShowPassword] =
        useState(false);

    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    /*
     * Reset token returned by backend
     * after successful OTP verification.
     *
     * Currently empty because API is not
     * connected yet.
     */
    const [resetToken, setResetToken] =
        useState("");

    /* ─────────────────────────────────────────────────────
       OTP COUNTDOWN
    ───────────────────────────────────────────────────── */

    useEffect(() => {

        /*
         * Countdown only runs on Step 2
         */
        if (step !== 2) {
            return;
        }

        if (secondsLeft <= 0) {
            return;
        }

        const timer = setInterval(() => {

            setSecondsLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(timer);

                    return 0;
                }

                return prev - 1;

            });

        }, 1000);

        return () =>
            clearInterval(timer);

    }, [step, secondsLeft]);

    /* ─────────────────────────────────────────────────────
       FORMAT TIMER
    ───────────────────────────────────────────────────── */

    const formatTime = (seconds) => {

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    /* ─────────────────────────────────────────────────────
       HANDLE CHANGE
    ───────────────────────────────────────────────────── */

    const handleChange = (field) => (e) => {

        let value =
            String(e.target.value);

        /*
         * OTP should contain numbers only
         */
        if (field === "otp") {

            value =
                value.replace(/\D/g, "");

            value =
                value.substring(0, 6);
        }

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        /*
         * Clear field error
         */
        if (errors[field]) {

            setErrors((prev) => ({
                ...prev,
                [field]: "",
            }));

        }

        /*
         * Clear API error
         */
        setApiError(null);

        /*
         * Clear success message
         */
        setSubmitted(false);
    };

    /* ─────────────────────────────────────────────────────
       STEP 1 VALIDATION
    ───────────────────────────────────────────────────── */

    const validateEmailOrMobile = () => {

        const newErrors = {};

        if (
            !form.emailOrMobile ||
            form.emailOrMobile.trim() === ""
        ) {

            newErrors.emailOrMobile =
                "Email or mobile number is required";

            return newErrors;
        }

        const value =
            form.emailOrMobile.trim();

        /*
         * EMAIL
         */
        if (value.includes("@")) {

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    value
                )
            ) {

                newErrors.emailOrMobile =
                    "Enter valid email address";
            }

        }
        /*
         * MOBILE
         */
        else {

            const mobile =
                value.replace(/\s/g, "");

            if (!/^\d{10}$/.test(mobile)) {

                newErrors.emailOrMobile =
                    "Enter valid 10 digit mobile number";
            }
        }

        return newErrors;
    };

    /* ─────────────────────────────────────────────────────
       STEP 2 VALIDATION
    ───────────────────────────────────────────────────── */

    const validateOTP = () => {

        const newErrors = {};

        if (!form.otp) {

            newErrors.otp =
                "OTP is required";

        }
        else if (form.otp.length !== 6) {

            newErrors.otp =
                "Enter valid 6 digit OTP";

        }

        if (secondsLeft <= 0) {

            newErrors.otp =
                "OTP has expired. Please resend OTP.";

        }

        return newErrors;
    };

    /* ─────────────────────────────────────────────────────
       STEP 3 VALIDATION
    ───────────────────────────────────────────────────── */

    const validatePassword = () => {

        const newErrors = {};

        /*
         * PASSWORD
         */
        if (
            !form.password ||
            form.password.trim() === ""
        ) {

            newErrors.password =
                "Password is required";

        }
        else if (form.password.length < 8) {

            newErrors.password =
                "Password must be at least 8 characters";

        }

        /*
         * CONFIRM PASSWORD
         */
        if (
            !form.confirmPassword ||
            form.confirmPassword.trim() === ""
        ) {

            newErrors.confirmPassword =
                "Confirm password is required";

        }
        else if (
            form.password !==
            form.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match";

        }

        return newErrors;
    };

    /* ─────────────────────────────────────────────────────
       STEP 1
       SEND OTP
    ───────────────────────────────────────────────────── */

    const handleSendOTP = async () => {

        const newErrors =
            validateEmailOrMobile();

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

            /*
             * =================================================
             * API - SEND OTP
             * =================================================
             *
             * Later:
             *
             * const response =
             *     await forgotPassword(
             *         form.emailOrMobile
             *     );
             *
             * Backend should generate and
             * send OTP.
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            /*
             * Reset OTP
             */
            setForm((prev) => ({
                ...prev,
                otp: "",
            }));

            setErrors({});

            /*
             * Start OTP timer
             */
            setSecondsLeft(
                OTP_EXPIRY_TIME
            );

            /*
             * Move to Step 2
             */
            setStep(2);

            setSubmitted(true);

        }
        catch (err) {

            setApiError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to send OTP."
            );

        }
        finally {

            setLoading(false);
        }
    };

    /* ─────────────────────────────────────────────────────
       STEP 2
       VERIFY OTP
    ───────────────────────────────────────────────────── */

    const handleVerifyOTP = async () => {

        const newErrors =
            validateOTP();

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

            /*
             * =================================================
             * API - VERIFY OTP
             * =================================================
             *
             * Later:
             *
             * const response =
             *     await verifyOTP({
             *         emailOrMobile:
             *             form.emailOrMobile,
             *         otp:
             *             form.otp
             *     });
             *
             * Backend should return:
             *
             * {
             *     resetToken: "..."
             * }
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            /*
             * Temporary reset token.
             *
             * REMOVE this when API is connected.
             */
            setResetToken("TEMP_RESET_TOKEN");

            /*
             * Move to Step 3
             */
            setStep(3);

            setErrors({});

            setSubmitted(true);

        }
        catch (err) {

            setApiError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to verify OTP."
            );

        }
        finally {

            setLoading(false);
        }
    };

    /* ─────────────────────────────────────────────────────
       RESEND OTP
    ───────────────────────────────────────────────────── */

    const handleResendOTP = async () => {

        /*
         * Don't allow resend before
         * timer expires
         */
        if (secondsLeft > 0) {
            return;
        }

        setResending(true);

        setApiError(null);

        setSubmitted(false);

        try {

            /*
             * =================================================
             * API - RESEND OTP
             * =================================================
             *
             * Later:
             *
             * await resendOTP({
             *     emailOrMobile:
             *         form.emailOrMobile
             * });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            /*
             * Clear old OTP
             */
            setForm((prev) => ({
                ...prev,
                otp: "",
            }));

            setErrors({});

            /*
             * Restart timer
             */
            setSecondsLeft(
                OTP_EXPIRY_TIME
            );

            setSubmitted(true);

        }
        catch (err) {

            setApiError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to resend OTP."
            );

        }
        finally {

            setResending(false);
        }
    };

    /* ─────────────────────────────────────────────────────
       STEP 3
       RESET PASSWORD
    ───────────────────────────────────────────────────── */

    const handleResetPassword = async () => {

        const newErrors =
            validatePassword();

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

            /*
             * =================================================
             * API - RESET PASSWORD
             * =================================================
             *
             * Later:
             *
             * const response =
             *     await resetPassword({
             *
             *         resetToken:
             *             resetToken,
             *
             *         emailOrMobile:
             *             form.emailOrMobile,
             *
             *         password:
             *             form.password,
             *
             *         confirmPassword:
             *             form.confirmPassword
             *     });
             */

            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            setSubmitted(true);

            /*
             * After successful password reset,
             * go to Login.
             */
            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }
        catch (err) {

            setApiError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to reset password."
            );

        }
        finally {

            setLoading(false);
        }
    };

    /* ─────────────────────────────────────────────────────
       BACK TO PREVIOUS STEP
    ───────────────────────────────────────────────────── */

    const handleBack = () => {

        setApiError(null);

        setSubmitted(false);

        setErrors({});

        /*
         * Step 2 → Step 1
         */
        if (step === 2) {

            setStep(1);

            setForm((prev) => ({
                ...prev,
                otp: "",
            }));

            return;
        }

        /*
         * Step 3 → Step 2
         */
        if (step === 3) {

            setStep(2);

            return;
        }

    };

    /* ─────────────────────────────────────────────────────
       CLEAR CURRENT STEP
    ───────────────────────────────────────────────────── */

    const handleClear = () => {

        if (step === 1) {

            setForm((prev) => ({
                ...prev,
                emailOrMobile: "",
            }));

        }

        if (step === 2) {

            setForm((prev) => ({
                ...prev,
                otp: "",
            }));

        }

        if (step === 3) {

            setForm((prev) => ({
                ...prev,
                password: "",
                confirmPassword: "",
            }));

        }

        setErrors({});

        setApiError(null);

        setSubmitted(false);
    };

    /* ─────────────────────────────────────────────────────
       BACK TO LOGIN
    ───────────────────────────────────────────────────── */

    const handleBackToLogin = () => {

        navigate("/login");

    };

    /* ─────────────────────────────────────────────────────
       STEP TITLE
    ───────────────────────────────────────────────────── */

    const getCardTitle = () => {

        if (step === 1) {
            return "Forgot Password";
        }

        if (step === 2) {
            return "OTP Verification";
        }

        return "Reset Password";
    };

    /* ─────────────────────────────────────────────────────
       RENDER
    ───────────────────────────────────────────────────── */

   return (
    <div
        style={{
            minHeight: "100vh",
            backgroundColor: T.contentBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            fontFamily: "'Segoe UI', sans-serif",
            boxSizing: "border-box",
        }}
    >

        <div
            style={{
                width: "100%",
                maxWidth: "850px",
            }}
        >

            <PageTitle
                title="Forgot Password"
                subtitle="Reset your V-Bill account password"
            />

            <div
                style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow:
                        "0 4px 18px rgba(0, 0, 0, 0.10)",
                    overflow: "hidden",
                }}
            >

                <MasterCard
                    title={getCardTitle()}
                >

                    {/* ─────────────────────────────────────
                        STEP INDICATOR
                    ───────────────────────────────────── */}

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "20px",
                            width: "100%",
                        }}
                    >

                        {/* STEP 1 */}

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >

                            <div
                                style={{
                                    width: "26px",
                                    height: "26px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    backgroundColor:
                                        step >= 1
                                            ? T.accent
                                            : T.mutedText,
                                    color: "#fff",
                                    flexShrink: 0,
                                }}
                            >
                                1
                            </div>

                            <span
                                style={{
                                    marginLeft: "7px",
                                    fontSize: "11px",
                                    fontWeight:
                                        step === 1
                                            ? "700"
                                            : "500",
                                    color:
                                        step === 1
                                            ? T.accent
                                            : T.mutedText,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Account
                            </span>

                            <div
                                style={{
                                    flex: 1,
                                    height: "1px",
                                    margin: "0 10px",
                                    backgroundColor:
                                        step > 1
                                            ? T.accent
                                            : "#ddd",
                                }}
                            />

                        </div>

                        {/* STEP 2 */}

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >

                            <div
                                style={{
                                    width: "26px",
                                    height: "26px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    backgroundColor:
                                        step >= 2
                                            ? T.accent
                                            : "#ddd",
                                    color:
                                        step >= 2
                                            ? "#fff"
                                            : T.mutedText,
                                    flexShrink: 0,
                                }}
                            >
                                2
                            </div>

                            <span
                                style={{
                                    marginLeft: "7px",
                                    fontSize: "11px",
                                    fontWeight:
                                        step === 2
                                            ? "700"
                                            : "500",
                                    color:
                                        step === 2
                                            ? T.accent
                                            : T.mutedText,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Verify OTP
                            </span>

                            <div
                                style={{
                                    flex: 1,
                                    height: "1px",
                                    margin: "0 10px",
                                    backgroundColor:
                                        step > 2
                                            ? T.accent
                                            : "#ddd",
                                }}
                            />

                        </div>

                        {/* STEP 3 */}

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >

                            <div
                                style={{
                                    width: "26px",
                                    height: "26px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    backgroundColor:
                                        step >= 3
                                            ? T.accent
                                            : "#ddd",
                                    color:
                                        step >= 3
                                            ? "#fff"
                                            : T.mutedText,
                                    flexShrink: 0,
                                }}
                            >
                                3
                            </div>

                            <span
                                style={{
                                    marginLeft: "7px",
                                    fontSize: "11px",
                                    fontWeight:
                                        step === 3
                                            ? "700"
                                            : "500",
                                    color:
                                        step === 3
                                            ? T.accent
                                            : T.mutedText,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                Reset
                            </span>

                        </div>

                    </div>

                    {/* SUCCESS */}

                    {submitted && (
                        <Toast
                            type="success"
                            message={
                                step === 1
                                    ? "OTP sent successfully."
                                    : step === 2
                                        ? "OTP verified successfully."
                                        : "Password reset successfully."
                            }
                        />
                    )}

                    {/* ERROR */}

                    {apiError && (
                        <Toast
                            type="error"
                            message={apiError}
                        />
                    )}

                    {/* ═════════════════════════════════════
                        STEP 1
                    ═════════════════════════════════════ */}

                    {step === 1 && (
                        <>
                            <FormRow>

                                <FormField
                                    col={6}
                                    label="Email or Mobile Number"
                                    required
                                    error={errors.emailOrMobile}
                                >

                                    <TextInput
                                        value={form.emailOrMobile}
                                        onChange={handleChange(
                                            "emailOrMobile"
                                        )}
                                        placeholder="Enter email or 10 digit mobile number"
                                        focused={
                                            focused ===
                                            "emailOrMobile"
                                        }
                                        onFocus={() =>
                                            setFocused(
                                                "emailOrMobile"
                                            )
                                        }
                                        onBlur={() =>
                                            setFocused("")
                                        }
                                    />

                                </FormField>

                            </FormRow>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    marginTop: "20px",
                                    flexWrap: "wrap",
                                    gap: "12px",
                                }}
                            >

                                <div>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "11px",
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        Enter the email or mobile
                                        number associated with
                                        your account.
                                    </p>

                                    <p
                                        style={{
                                            margin:
                                                "6px 0 0 0",
                                            fontSize: "12px",
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        Remember your password?{" "}

                                        <span
                                            onClick={
                                                handleBackToLogin
                                            }
                                            style={{
                                                color:
                                                    T.accent,
                                                fontWeight:
                                                    "600",
                                                cursor:
                                                    "pointer",
                                            }}
                                        >
                                            Login
                                        </span>

                                    </p>

                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "12px",
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
                                            handleSendOTP
                                        }
                                        loading={loading}
                                    >
                                        {loading
                                            ? "Sending..."
                                            : "Send OTP"}
                                    </PrimaryButton>

                                </div>

                            </div>
                        </>
                    )}

                    {/* ═════════════════════════════════════
                        STEP 2
                    ═════════════════════════════════════ */}

                    {step === 2 && (
                        <>
                            <div
                                style={{
                                    marginBottom: "15px",
                                    fontSize: "12px",
                                    color:
                                        T.mutedText,
                                }}
                            >
                                OTP has been sent to{" "}

                                <strong
                                    style={{
                                        color: T.text,
                                    }}
                                >
                                    {form.emailOrMobile}
                                </strong>
                            </div>

                            <FormRow>

                                <FormField
                                    col={6}
                                    label="Enter OTP"
                                    required
                                    error={errors.otp}
                                >

                                    <TextInput
                                        value={form.otp}
                                        onChange={handleChange(
                                            "otp"
                                        )}
                                        placeholder="Enter 6 digit OTP"
                                        inputMode="numeric"
                                        maxLength={6}
                                        focused={
                                            focused === "otp"
                                        }
                                        onFocus={() =>
                                            setFocused("otp")
                                        }
                                        onBlur={() =>
                                            setFocused("")
                                        }
                                    />

                                </FormField>

                            </FormRow>

                            <div
                                style={{
                                    marginTop: "5px",
                                    fontSize: "12px",
                                }}
                            >
                                {secondsLeft > 0 ? (
                                    <span
                                        style={{
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        OTP expires in{" "}
                                        <strong
                                            style={{
                                                color:
                                                    T.accent,
                                            }}
                                        >
                                            {formatTime(
                                                secondsLeft
                                            )}
                                        </strong>
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            color:
                                                T.danger ||
                                                "#dc3545",
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        OTP has expired.
                                    </span>
                                )}
                            </div>

                            <div
                                style={{
                                    marginTop: "8px",
                                    fontSize: "12px",
                                }}
                            >
                                Didn't receive OTP?{" "}

                                {secondsLeft > 0 ? (
                                    <span
                                        style={{
                                            color:
                                                T.mutedText,
                                            fontWeight:
                                                "600",
                                        }}
                                    >
                                        Resend available after{" "}
                                        {formatTime(
                                            secondsLeft
                                        )}
                                    </span>
                                ) : (
                                    <span
                                        onClick={
                                            !resending
                                                ? handleResendOTP
                                                : undefined
                                        }
                                        style={{
                                            color:
                                                T.accent,
                                            fontWeight:
                                                "600",
                                            cursor:
                                                resending
                                                    ? "default"
                                                    : "pointer",
                                        }}
                                    >
                                        {resending
                                            ? "Sending..."
                                            : "Resend OTP"}
                                    </span>
                                )}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    marginTop: "20px",
                                    flexWrap: "wrap",
                                    gap: "12px",
                                }}
                            >

                                <div>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "11px",
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        Enter the OTP received
                                        on your registered
                                        email or mobile number.
                                    </p>

                                    <p
                                        style={{
                                            margin:
                                                "6px 0 0 0",
                                            fontSize: "12px",
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        Wrong email or mobile?{" "}

                                        <span
                                            onClick={
                                                handleBack
                                            }
                                            style={{
                                                color:
                                                    T.accent,
                                                fontWeight:
                                                    "600",
                                                cursor:
                                                    "pointer",
                                            }}
                                        >
                                            Go Back
                                        </span>

                                    </p>

                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "12px",
                                    }}
                                >

                                    <SecondaryButton
                                        onClick={
                                            handleBack
                                        }
                                    >
                                        Back
                                    </SecondaryButton>

                                    <PrimaryButton
                                        onClick={
                                            handleVerifyOTP
                                        }
                                        loading={loading}
                                    >
                                        {loading
                                            ? "Verifying..."
                                            : "Verify OTP"}
                                    </PrimaryButton>

                                </div>

                            </div>
                        </>
                    )}

                    {/* ═════════════════════════════════════
                        STEP 3
                    ═════════════════════════════════════ */}

                    {step === 3 && (
                        <>
                            <div
                                style={{
                                    marginBottom: "15px",
                                    fontSize: "12px",
                                    color:
                                        T.mutedText,
                                }}
                            >
                                Create a new password for{" "}

                                <strong
                                    style={{
                                        color: T.text,
                                    }}
                                >
                                    {form.emailOrMobile}
                                </strong>
                            </div>

                            <FormRow>

                                <FormField
                                    col={6}
                                    label="New Password"
                                    required
                                    error={errors.password}
                                >

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
                                            placeholder="Enter new password"
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
                                                right: "10px",
                                                top: "50%",
                                                transform:
                                                    "translateY(-50%)",
                                                border: "none",
                                                background:
                                                    "transparent",
                                                color:
                                                    T.mutedText,
                                                cursor:
                                                    "pointer",
                                                fontSize:
                                                    "12px",
                                                padding:
                                                    "4px",
                                            }}
                                        >
                                            {showPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </FormField>

                                <FormField
                                    col={6}
                                    label="Confirm Password"
                                    required
                                    error={
                                        errors.confirmPassword
                                    }
                                >

                                    <div
                                        style={{
                                            position:
                                                "relative",
                                        }}
                                    >

                                        <TextInput
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                form.confirmPassword
                                            }
                                            onChange={
                                                handleChange(
                                                    "confirmPassword"
                                                )
                                            }
                                            placeholder="Confirm new password"
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
                                                    (prev) =>
                                                        !prev
                                                )
                                            }
                                            style={{
                                                position:
                                                    "absolute",
                                                right: "10px",
                                                top: "50%",
                                                transform:
                                                    "translateY(-50%)",
                                                border: "none",
                                                background:
                                                    "transparent",
                                                color:
                                                    T.mutedText,
                                                cursor:
                                                    "pointer",
                                                fontSize:
                                                    "12px",
                                                padding:
                                                    "4px",
                                            }}
                                        >
                                            {showConfirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </button>

                                    </div>

                                </FormField>

                            </FormRow>

                            <div
                                style={{
                                    marginTop: "5px",
                                    fontSize: "11px",
                                    color:
                                        T.mutedText,
                                }}
                            >
                                Password must contain at least
                                8 characters.
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                    marginTop: "20px",
                                    flexWrap: "wrap",
                                    gap: "12px",
                                }}
                            >

                                <div>

                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "11px",
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        Make sure your new password
                                        is different from your
                                        previous password.
                                    </p>

                                    <p
                                        style={{
                                            margin:
                                                "6px 0 0 0",
                                            fontSize: "12px",
                                            color:
                                                T.mutedText,
                                        }}
                                    >
                                        Remember your password?{" "}

                                        <span
                                            onClick={
                                                handleBackToLogin
                                            }
                                            style={{
                                                color:
                                                    T.accent,
                                                fontWeight:
                                                    "600",
                                                cursor:
                                                    "pointer",
                                            }}
                                        >
                                            Login
                                        </span>

                                    </p>

                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "12px",
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
                                            handleResetPassword
                                        }
                                        loading={loading}
                                    >
                                        {loading
                                            ? "Resetting..."
                                            : "Reset Password"}
                                    </PrimaryButton>

                                </div>

                            </div>
                        </>
                    )}

                </MasterCard>

            </div>

        </div>

    </div>
);
}