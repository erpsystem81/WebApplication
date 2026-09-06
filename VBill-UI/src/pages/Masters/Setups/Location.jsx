import React, {
    useState,
    useEffect
} from "react";

import PageTitle from "../../../components/common/PageTitle";
import MasterCard from "../../../components/common/MasterCard";
import FormRow from "../../../components/common/FormRow";
import FormField from "../../../components/common/FormField";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import Toast from "../../../components/common/Toast";

import {
    PrimaryButton,
    SecondaryButton,
} from "../../../components/common/ActionBtn";

import {
    getAllLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    getCountries,
    getStatesByCountry,
    getCitiesByState,
} from "../../../services/LocationService";

import T from "../../../components/common/MasterStyles";

const INITIAL_FORM = {
    name: "",
    parentLocationId: "",
    countryId: "",
    stateId: "",
    cityId: "",
    isDefaultLocation: false,
    isInactive: 0,
    status: 1,
};

export default function Location() {

    const [form, setForm] =
        useState(INITIAL_FORM);

    const [locations, setLocations] =
        useState([]);

    const [countries, setCountries] =
        useState([]);

    const [states, setStates] =
        useState([]);

    const [cities, setCities] =
        useState([]);

    const [errors, setErrors] =
        useState({});

    const [focused, setFocused] =
        useState("");

    const [toast, setToast] =
        useState(null);

    const [editId, setEditId] =
        useState(null);

    const showToast = (type, message) => {

        setToast({
            type,
            message,
        });

        setTimeout(() => {

            setToast(null);

        }, 3000);

    };

    useEffect(() => {

        loadLocations();

        loadCountries();

    }, []);

    const loadLocations = async () => {

        try {

            const response =
                await getAllLocations();

            setLocations(response);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadCountries = async () => {

        try {

            const response = await getCountries();

            const countryOptions = response.map((item) => ({
                value: item.countryId,
                label: item.countryName,
            }));

            setCountries(countryOptions);

        }

        catch (error) {

            console.log(error);

            setCountries([]);

        }

    };

    const loadStates = async (countryId) => {

        if (!countryId) {

            setStates([]);
            setCities([]);

            return;
        }

        try {

            const response = await getStatesByCountry(countryId);

            const stateOptions = response.map((item) => ({

                value: item.stateId,

                label: item.stateName,

            }));

            setStates(stateOptions);

        }

        catch (error) {

            console.log(error);

            setStates([]);

        }

    };

    const loadCities = async (stateId) => {

        if (!stateId) {

            setCities([]);

            return;

        }

        try {

            const response =
                await getCitiesByState(stateId);

            setCities(

                response.map((item) => ({
                    value: item.cityId,
                    label: item.cityName,
                }))

            );

        }

        catch (error) {

            console.log(error);

            setCities([]);

        }

    };
    const handleChange =
        (field) =>
            async (e) => {

                const value =
                    e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value;

                setErrors((prev) => ({

                    ...prev,

                    [field]: "",

                }));

                /* ---------------- COUNTRY ---------------- */

                if (field === "countryId") {

                    setForm((prev) => ({

                        ...prev,

                        countryId: value,

                        stateId: "",

                        cityId: "",

                    }));

                    setCities([]);

                    await loadStates(value);

                    return;

                }

                /* ---------------- STATE ---------------- */

                if (field === "stateId") {

                    setForm((prev) => ({

                        ...prev,

                        stateId: value,

                        cityId: "",

                    }));

                    await loadCities(value);

                    return;

                }

                /* ---------------- NORMAL ---------------- */

                setForm((prev) => ({

                    ...prev,

                    [field]: value,

                }));

            };

    const validate = () => {

        const validationErrors = {};

        if (!form.name.trim()) {

            validationErrors.name =
                "Location Name is required";

        }

        if (!form.countryId) {

            validationErrors.countryId =
                "Country is required";

        }

        if (!form.stateId) {

            validationErrors.stateId =
                "State is required";

        }

        if (!form.cityId) {

            validationErrors.cityId =
                "City is required";

        }

        return validationErrors;

    };

    /* ─────────────────────────────────────────
       SAVE
    ───────────────────────────────────────── */

    const handleSave = async () => {

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            const payload = {

                name: form.name,

                parentLocationId:
                    form.parentLocationId
                        ? Number(form.parentLocationId)
                        : null,

                countryId: Number(form.countryId),

                stateId: Number(form.stateId),

                cityId: Number(form.cityId),

                isDefaultLocation:
                    form.isDefaultLocation,

                status: form.status,

                isInactive: form.isInactive,

            };

            if (editId) {

                await updateLocation(
                    editId,
                    payload
                );

                showToast(
                    "success",
                    "Location updated successfully"
                );

            }

            else {

                await createLocation(
                    payload
                );

                showToast(
                    "success",
                    "Location created successfully"
                );

            }

            await loadLocations();

            setForm(INITIAL_FORM);

            setErrors({});

            setEditId(null);

        }

        catch (error) {

            console.log(error);

            showToast(

                "error",

                error.response?.data?.message ||

                "Something went wrong"

            );

        }

    };

    /* ─────────────────────────────────────────
       EDIT
    ───────────────────────────────────────── */

    const handleEdit = async (location) => {

        setEditId(location.locationId);

        setForm({

            name: location.name,

            parentLocationId:
                location.parentLocationId ?? "",

            countryId:
                String(location.countryId ?? ""),

            stateId:
                String(location.stateId ?? ""),

            cityId:
                String(location.cityId ?? ""),

            isDefaultLocation:
                location.isDefaultLocation,

            status:
                location.status,

            isInactive:
                location.isInactive,

        });

        if (location.countryId) {
            await loadStates(location.countryId);
        }

        if (location.stateId) {
            await loadCities(location.stateId);
        }

        setErrors({});
    };

    /* ─────────────────────────────────────────
       DELETE
    ───────────────────────────────────────── */

    const handleDelete = async (
        id
    ) => {

        try {

            await deleteLocation(id);

            await loadLocations();

            showToast(

                "success",

                "Location deleted successfully"

            );

            if (editId === id) {

                setForm(INITIAL_FORM);

                setEditId(null);

            }

        }

        catch (error) {

            console.log(error);

            showToast(

                "error",

                "Delete failed"

            );

        }

    };

    /* ─────────────────────────────────────────
       CLEAR
    ───────────────────────────────────────── */

    const handleClear = () => {

        setForm(
            INITIAL_FORM
        );

        setErrors({});

        setEditId(null);

        setStates([]);

        setCities([]);

    };

    return (

        <div
            style={{
                minHeight: "100%",
                backgroundColor: T.contentBg,
                padding: "15px",
            }}
        >

            <PageTitle
                title="Location Master"
                subtitle="Manage location configurations"
            />

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                />
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "360px 1fr",
                    gap: "20px",
                    alignItems: "start",
                }}
            >

                {/* ================= LEFT FORM ================= */}

                <MasterCard title="Location Details">

                    <FormRow>

                        <FormField
                            col={12}
                            label="Location Name"
                            required
                            error={errors.name}
                        >

                            <TextInput
                                value={form.name}
                                onChange={handleChange("name")}
                                placeholder="Enter Location"
                                focused={focused === "location"}
                                onFocus={() => setFocused("location")}
                                onBlur={() => setFocused("")}
                                error={errors.name}
                            />

                        </FormField>

                        <FormField
                            col={12}
                            label="Parent Location"
                        >

                            <SelectInput
                                value={form.parentLocationId}
                                onChange={handleChange("parentLocationId")}
                                options={(locations || [])
                                    .filter(item => item.isDefaultLocation)
                                    .map(item => ({
                                        value: item.locationId,
                                        label: item.name
                                    }))
                                }
                                placeholder="Select Parent Location"
                                focused={focused === "parent"}
                                onFocus={() => setFocused("parent")}
                                onBlur={() => setFocused("")}
                            />

                        </FormField>

                        <FormField
                            col={12}
                            md={4}
                            label="Country"
                            required
                            error={errors.countryId}
                        >

                            <SelectInput
                                value={form.countryId}
                                onChange={handleChange("countryId")}
                                options={countries || []}
                                placeholder="Country"
                                focused={focused === "country"}
                                onFocus={() => setFocused("country")}
                                onBlur={() => setFocused("")}
                            />

                        </FormField>

                        <FormField
                            col={12}
                            md={4}
                            label="State"
                            required
                            error={errors.stateId}
                        >

                            <SelectInput
                                value={form.stateId}
                                onChange={handleChange("stateId")}
                                options={states || []}
                                placeholder="State"
                                disabled={!form.countryId}
                                focused={focused === "state"}
                                onFocus={() => setFocused("state")}
                                onBlur={() => setFocused("")}
                            />

                        </FormField>

                        <FormField
                            col={12}
                            md={4}
                            label="City"
                            required
                            error={errors.cityId}
                        >

                            <SelectInput
                                value={form.cityId}
                                onChange={handleChange("cityId")}
                                options={cities || []}
                                placeholder="City"
                                disabled={!form.stateId}
                                focused={focused === "city"}
                                onFocus={() => setFocused("city")}
                                onBlur={() => setFocused("")}
                            />

                        </FormField>

                    </FormRow>

                    {/* ================= CHECKBOX ================= */}

                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            marginTop: "15px",
                            marginBottom: "20px",
                        }}
                    >

                        <label style={checkboxStyle}>

                            <input
                                type="checkbox"
                                checked={form.isDefaultLocation}
                                onChange={handleChange("isDefaultLocation")}
                            />

                            Parent Location

                        </label>

                    </div>

                    {/* ================= FOOTER ================= */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "12px",
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
                            </span>

                            {" "}are required

                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >

                            <SecondaryButton
                                onClick={handleClear}
                            >
                                Clear
                            </SecondaryButton>

                            <PrimaryButton
                                onClick={handleSave}
                            >
                                {editId
                                    ? "Update"
                                    : "Save"}
                            </PrimaryButton>

                        </div>

                    </div>

                </MasterCard>

                {/* ================= RIGHT TABLE ================= */}

                <MasterCard title="Location List">

                    <div
                        style={{
                            overflowX: "auto",
                        }}
                    >

                        <table
                            style={tableStyle}
                        >

                            <thead>

                                <tr>

                                    <th style={thStyle}>
                                        Location
                                    </th>

                                    <th style={thStyle}>
                                        Parent
                                    </th>

                                    <th style={thStyle}>
                                        Country
                                    </th>

                                    <th style={thStyle}>
                                        State
                                    </th>

                                    <th style={thStyle}>
                                        City
                                    </th>

                                    <th style={thStyle}>
                                        Default
                                    </th>

                                    <th style={thStyle}>
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {locations.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            style={emptyStyle}
                                        >
                                            No locations found
                                        </td>

                                    </tr>

                                ) : (

                                    locations.map((location) => (

                                        <tr
                                            key={location.location_id}
                                            style={trStyle}
                                        >

                                            <td style={tdStyle}>
                                                {location.name}
                                            </td>

                                            <td style={tdStyle}>
                                                {location.parentLocationName || "-"}
                                            </td>

                                            <td style={tdStyle}>
                                                {location.countryName}
                                            </td>

                                            <td style={tdStyle}>
                                                {location.stateName}
                                            </td>

                                            <td style={tdStyle}>
                                                {location.cityName}
                                            </td>

                                            <td style={tdStyle}>
                                                {location.isDefaultLocation ? "Yes" : "No"}
                                            </td>

                                            <td style={tdStyle}>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "8px",
                                                        justifyContent: "center",
                                                    }}
                                                >

                                                    <button
                                                        style={editBtnStyle}
                                                        onClick={() =>
                                                            handleEdit(location)
                                                        }
                                                    >
                                                        ✏
                                                    </button>

                                                    <button
                                                        style={deleteBtnStyle}
                                                        onClick={() =>
                                                            handleDelete(location.location_id)
                                                        }
                                                    >
                                                        🗑
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </MasterCard>

            </div>

        </div>

    );
}
/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */

const checkboxStyle = {

    display: "flex",

    alignItems: "center",

    gap: "8px",

    fontSize: "13px",

    color: T.menuText,

    fontWeight: "500",

};

const tableStyle = {

    width: "100%",

    borderCollapse: "collapse",

};

const thStyle = {

    backgroundColor: T.tableHead,

    color: T.labelColor,

    padding: "12px",

    fontSize: "12px",

    textAlign: "left",

    borderBottom: `1px solid ${T.border}`,

    whiteSpace: "nowrap",

};

const tdStyle = {

    padding: "12px",

    borderBottom: "1px solid #f0e4d0",

    fontSize: "13px",

    color: T.menuText,

};

const trStyle = {

    backgroundColor: T.white,

};

const emptyStyle = {

    padding: "40px",

    textAlign: "center",

    color: T.mutedText,

    fontSize: "13px",

};

const editBtnStyle = {

    border: "none",

    backgroundColor: "#fff3e8",

    color: T.accent,

    width: "30px",

    height: "30px",

    borderRadius: "6px",

    cursor: "pointer",

    fontSize: "14px",

    transition: "0.2s",

};

const deleteBtnStyle = {

    border: "none",

    backgroundColor: "#fff0f0",

    color: "#c0392b",

    width: "30px",

    height: "30px",

    borderRadius: "6px",

    cursor: "pointer",

    fontSize: "14px",

    transition: "0.2s",

};