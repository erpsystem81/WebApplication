import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import MasterCard from "../../../components/common/MasterCard";
import FormRow from "../../../components/common/FormRow";
import FormField from "../../../components/common/FormField";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import Toast from "../../../components/common/Toast";
import PageTitle from "../../../components/common/PageTitle";

import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/common/ActionBtn";

import T from "../../../components/common/MasterStyles";
import {
  SaveBusinessInfo,
  getCountries,
  getStatesByCountry,
  getCitiesByState,
} from "../../../services/BusinessInformationService";

/* ────────────────────────────────────────────────────────── */

const initialForm = {
  businessName: "",
  mobileNumber: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  address1: "",
  country: "",
  state: "",
  city: "",
  zipCode: "",
  gstinNumber: "",
  businessLogo: "",
  termsAndConditions: ""
};

export default function BusinessInformation() {
  const [form, setForm] = useState(initialForm);

  const [focused, setFocused] = useState("");

  const [errors, setErrors] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const [countries, setCountries] = useState([]);

  const [availableStates, setAvailableStates] = useState([]);

  const [availableCities, setAvailableCities] = useState([]);

  const [loading, setLoading] = useState(false);

  const [apiError, setApiError] = useState(null);

  const fetchCountries = async () => {
    try {

      const data = await getCountries();

      console.log("Countries API Response:", data);

      setCountries(data);

    } catch (err) {

      console.log(err);

      setApiError("Failed to load countries.");
    }
  };

  const fetchStates = useCallback(async (countryId) => {
    try {

      const data = await getStatesByCountry(countryId);

      console.log("States API:", data);

      setAvailableStates(
        Array.isArray(data) ? data : []
      );

      setAvailableCities([]);

    } catch (err) {

      console.log(err);

      setAvailableStates([]);
    }
  }, []);

  const fetchCities = useCallback(async (stateId) => {
    try {

      const data = await getCitiesByState(stateId);

      console.log("Cities API:", data);

      setAvailableCities(
        Array.isArray(data) ? data : []
      );

    } catch (err) {

      console.log(err);

      setAvailableCities([]);
    }
  }, []);

  /* ───────────────────────────────────────────────────── */

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (form.country) {
      fetchStates(form.country);
    } else {
      setAvailableStates([]);
      setAvailableCities([]);
    }
  }, [form.country]);

  useEffect(() => {
    if (form.state) {
      fetchCities(form.state);
    } else {
      setAvailableCities([]);
    }
  }, [form.state]);

  /* ───────────────────────────────────────────────────── */

  const handleChange = (field) => (e) => {
    const value = String(e.target.value);

    setForm((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (field === "country") {
        updated.state = "";
        updated.city = "";
      }

      if (field === "state") {
        updated.city = "";
      }

      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const requiredFields = [
    "businessName",
    "mobileNumber",
    "firstName",
    "lastName",
    "email",
    "address1",
    "country",
    "state",
    "city",
    "zipCode",
  ];

  const validate = () => {

    const newErrors = {};

    requiredFields.forEach((f) => {

      if (
        form[f] === null ||
        form[f] === undefined ||
        form[f] === ""
      ) {
        newErrors[f] = "This field is required";
      }

    });

    if (
      form.mobileNumber &&
      !/^\d{10}$/.test(
        form.mobileNumber.replace(/\s/g, "")
      )
    ) {
      newErrors.mobileNumber =
        "Enter valid 10 digit mobile number";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email =
        "Enter valid email address";
    }

    if (
      form.zipCode &&
      !/^\d{4,10}$/.test(form.zipCode)
    ) {
      newErrors.zipCode =
        "Enter valid ZIP code";
    }

    if (
      form.gstinNumber &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        form.gstinNumber
      )
    ) {
      newErrors.gstinNumber =
        "Enter valid GSTIN";
    }

    return newErrors;
  };

  const handleSave = async () => {

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    setApiError(null);

    try {

      const payload = {
        name: form.businessName,

        ownerFirstName: form.firstName,
        ownerLastName: form.lastName,

        taxId: form.gstinNumber,

        phoneNo: form.mobileNumber,
        altPhoneNo: form.phoneNumber,

        email: form.email,
        address: form.address1,
        zipCode: form.zipCode,

        termsAndConditions: form.termsAndConditions,
        businessLogo: form.businessLogo,

        countryId: Number(form.country),
        stateId: Number(form.state),
        cityId: Number(form.city),
      };

      await SaveBusinessInfo(payload);

      clearForm();

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (err) {

      setApiError(
        err?.message ||
        "Failed to save business information."
      );

    } finally {

      setLoading(false);
    }
  };

  const clearForm = () => {
    setForm(initialForm);
    setErrors({});
    setAvailableStates([]);
    setAvailableCities([]);
  };

  const handleClear = () => {
    clearForm();
    setSubmitted(false);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {

        const result = reader.result;

        // remove prefix
        const base64 = result.split(",")[1];

        resolve(base64);
      };

      reader.onerror = (error) => reject(error);
    });
  };
  /* ───────────────────────────────────────────────────── */

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: T.contentBg,
        padding: "15px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <PageTitle
        title="Business Information"
        subtitle="Manage company business details"
      />
      <MasterCard title="Business Information">
        {submitted && (
          <Toast
            type="success"
            message="Business information Saved successfully."
          />
        )}

        {apiError && (
          <Toast
            type="error"
            message={apiError}
          />
        )}



        {/* FORM */}

        <FormRow>
          <FormField col={4}
            label="Business Name"
            required
            error={errors.businessName}
          >
            <TextInput
              value={form.businessName}
              onChange={handleChange("businessName")}
              focused={focused === "businessName"}
              onFocus={() =>
                setFocused("businessName")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            label="First Name"
            required
            error={errors.firstName}
          >
            <TextInput
              value={form.firstName}
              onChange={handleChange("firstName")}
              focused={focused === "firstName"}
              onFocus={() =>
                setFocused("firstName")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            label="Last Name"
            required
            error={errors.lastName}
          >
            <TextInput
              value={form.lastName}
              onChange={handleChange("lastName")}
              focused={focused === "lastName"}
              onFocus={() =>
                setFocused("lastName")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            col={4}
            label="Email Address"
            required
            error={errors.email}
          >
            <TextInput
              type="email"
              value={form.email || ""}
              onChange={handleChange("email")}
              placeholder="example@company.com"
              focused={focused === "email"}
              onFocus={() =>
                setFocused("email")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>
          <FormField col={4}
            label="Mobile Number"
            required
            error={errors.mobileNumber}
          >
            <TextInput
              type="tel"
              value={form.mobileNumber}
              onChange={handleChange("mobileNumber")}
              focused={focused === "mobileNumber"}
              onFocus={() =>
                setFocused("mobileNumber")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField col={4}
            label="Alternate Mobile Number"

          >
            <TextInput
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
              focused={focused === "phoneNumber"}
              onFocus={() =>
                setFocused("phoneNumber")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            label="Address"
            required
            error={errors.address1}
          >
            <TextInput
              value={form.address1}
              onChange={handleChange("address1")}
              focused={focused === "address1"}
              onFocus={() =>
                setFocused("address1")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            label="Country"
            required
            error={errors.country}
          >
            <SelectInput
              value={String(form.country || "")}
              onChange={handleChange("country")}
              options={countries.map((c) => ({
                label: c.countryName,
                value: String(c.countryId),
              }))}
            />
          </FormField>

          <FormField
            label="State"
            required
            error={errors.state}
          >
            <SelectInput
              value={String(form.state || "")}
              onChange={handleChange("state")}
              options={
                Array.isArray(availableStates)
                  ? availableStates.map((s) => ({
                    label: s.stateName,
                    value: String(s.stateId),
                  }))
                  : []
              }
            />
          </FormField>

          <FormField
            label="City"
            required
            error={errors.city}
          >
            <SelectInput
              value={String(form.city || "")}
              onChange={handleChange("city")}
              options={
                Array.isArray(availableCities)
                  ? availableCities.map((c) => ({
                    label: c.cityName,
                    value: String(c.cityId),
                  }))
                  : []
              }
              placeholder="Select City"
              focused={focused === "city"}
              onFocus={() => setFocused("city")}
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            label="ZIP Code"
            required
            error={errors.zipCode}
          >
            <TextInput
              value={form.zipCode}
              onChange={handleChange("zipCode")}
              focused={focused === "zipCode"}
              onFocus={() =>
                setFocused("zipCode")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            label="GSTIN Number"
            error={errors.gstinNumber}
          >
            <TextInput
              value={form.gstinNumber}
              onChange={handleChange("gstinNumber")}
              placeholder="27AABCU9603R1ZX"
              focused={focused === "gstinNumber"}
              onFocus={() =>
                setFocused("gstinNumber")
              }
              onBlur={() => setFocused("")}
            />
          </FormField>

          <FormField
            col={4}
            label="Business Logo"
            error={errors.businessLogo}
          >
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];

                if (!file) return;

                const base64 = await convertToBase64(file);

                setForm((prev) => ({
                  ...prev,
                  businessLogo: base64,
                }));
              }}
              onFocus={() =>
                setFocused("businessLogo")
              }
              onBlur={() => setFocused("")}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: `1px solid ${focused === "businessLogo"
                  ? T.accent
                  : T.border
                  }`,
                borderRadius: "6px",
                backgroundColor: T.inputBg,
                color: T.menuText,
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            {form.businessLogo && (
              <div
                style={{
                  marginTop: "8px",
                }}
              >
                <img
                  src={`data:image/png;base64,${form.businessLogo}`}
                  alt="Business Logo"
                  style={{
                    width: "70px",
                    height: "70px",
                    objectFit: "contain",
                    border: `1px solid ${T.border}`,
                    borderRadius: "6px",
                    padding: "4px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            )}
          </FormField>

          <FormField
            col={12}
            label="Terms and Conditions"
            error={errors.termsAndConditions}
          >
            <textarea
              value={form.termsAndConditions || ""}
              onChange={handleChange("termsAndConditions")}
              placeholder="Enter terms and conditions..."
              onFocus={() =>
                setFocused("termsAndConditions")
              }
              onBlur={() => setFocused("")}
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "10px 12px",
                border: `1px solid ${focused === "termsAndConditions"
                  ? T.accent
                  : T.border
                  }`,
                borderRadius: "6px",
                backgroundColor: T.inputBg,
                color: T.menuText,
                fontSize: "13px",
                outline: "none",
                boxSizing: "border-box",
                resize: "vertical",
                fontFamily: "'Segoe UI', sans-serif",
              }}
            />
          </FormField>
        </FormRow>



        {/* ACTION BUTTONS */}
        {/* FOOTER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >

          {/* LEFT SIDE */}
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

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <SecondaryButton onClick={handleClear}>
              Clear
            </SecondaryButton>

            <PrimaryButton
              onClick={handleSave}
              loading={loading}
            >
              {loading ? "Saving..." : "Save"}
            </PrimaryButton>
          </div>

        </div>
      </MasterCard>
    </div>
  );
}