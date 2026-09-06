import React, { useState, useEffect } from "react";

import PageTitle from "../../components/common/PageTitle";
import MasterCard from "../../components/common/MasterCard";
import FormRow from "../../components/common/FormRow";
import FormField from "../../components/common/FormField";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import Toast from "../../components/common/Toast";
import {
    PrimaryButton,
    SecondaryButton,
} from "../../components/common/ActionBtn";

import T from "../../components/common/MasterStyles";

// import {
//     getAllVendors,
//     createVendor,
//     updateVendor,
//     deleteVendor,
//     getAllCities,
//     getAllStates,
//     getAllCountries,
// } from "../../services/VendorService";


const INITIAL_FORM = {
    vendorName: "",
    company: "",
    phone: "",
    email: "",
    taxId: "",
    address: "",

    cityId: "",
    stateId: "",
    countryId: "",

    status: 1,
    isInactive: 0,
};


export default function Vendor() {

    const [form, setForm] = useState(INITIAL_FORM);

    const [vendors, setVendors] = useState([]);

    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);

    const [errors, setErrors] = useState({});

    const [toast, setToast] = useState(null);

    const [editId, setEditId] = useState(null);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);


    // =====================================================
    // TOAST
    // =====================================================

    const showToast = (type, message) => {

        setToast({
            type,
            message,
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadVendors();
        loadCities();
        loadStates();
        loadCountries();

    }, []);


    // =====================================================
    // LOAD VENDORS
    // =====================================================

    const loadVendors = async () => {

        try {

            const response = await getAllVendors();

            setVendors(response || []);

        } catch (error) {

            console.log(error);

        }
    };


    // =====================================================
    // LOAD CITIES
    // =====================================================

    const loadCities = async () => {

        try {

            const response = await getAllCities();

            setCities(
                response.data.map((city) => ({
                    value: city.cityId,
                    label: city.cityName,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };


    // =====================================================
    // LOAD STATES
    // =====================================================

    const loadStates = async () => {

        try {

            const response = await getAllStates();

            setStates(
                response.data.map((state) => ({
                    value: state.stateId,
                    label: state.stateName,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };


    // =====================================================
    // LOAD COUNTRIES
    // =====================================================

    const loadCountries = async () => {

        try {

            const response = await getAllCountries();

            setCountries(
                response.data.map((country) => ({
                    value: country.countryId,
                    label: country.countryName,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (field) => (e) => {

        const value =
            e.target.type === "checkbox"
                ? e.target.checked
                : e.target.value;

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };


    // =====================================================
    // VALIDATION
    // =====================================================

    const validate = () => {

        const validationErrors = {};


        if (!form.vendorName.trim()) {

            validationErrors.vendorName =
                "Vendor Name is required";
        }


        if (!form.phone.trim()) {

            validationErrors.phone =
                "Phone is required";
        }


        if (
            form.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {

            validationErrors.email =
                "Enter a valid email";
        }


        return validationErrors;
    };


    // =====================================================
    // SAVE / UPDATE
    // =====================================================

    const handleSave = async () => {

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;
        }


        try {

            const payload = {

                vendorName: form.vendorName,

                company: form.company,

                phone: form.phone,

                email: form.email,

                taxId: form.taxId,

                address: form.address,

                cityId: form.cityId
                    ? Number(form.cityId)
                    : null,

                stateId: form.stateId
                    ? Number(form.stateId)
                    : null,

                countryId: form.countryId
                    ? Number(form.countryId)
                    : null,

                status: form.status,

                isInactive: form.isInactive,
            };


            console.log("Vendor Payload:", payload);


            if (editId) {

                await updateVendor(editId, payload);

                showToast(
                    "success",
                    "Vendor updated successfully"
                );

            } else {

                await createVendor(payload);

                showToast(
                    "success",
                    "Vendor created successfully"
                );
            }


            await loadVendors();


            setForm({
                ...INITIAL_FORM,
            });

            setEditId(null);

            setErrors({});

            setShowForm(false);


        } catch (error) {

            console.log(error);

            showToast(
                "error",
                "Something went wrong"
            );
        }
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = (vendor) => {

        setEditId(vendor.vendorId);

        setShowForm(true);


        setForm({

            vendorName:
                vendor.vendorName || "",

            company:
                vendor.company || "",

            phone:
                vendor.phone || "",

            email:
                vendor.email || "",

            taxId:
                vendor.taxId || "",

            address:
                vendor.address || "",

            cityId:
                vendor.cityId || "",

            stateId:
                vendor.stateId || "",

            countryId:
                vendor.countryId || "",

            status:
                vendor.status ?? 1,

            isInactive:
                vendor.isInactive ?? 0,
        });
    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this vendor?")) {

            return;
        }


        try {

            await deleteVendor(id);

            await loadVendors();

            showToast(
                "success",
                "Vendor deleted successfully"
            );

        } catch (error) {

            console.log(error);

            showToast(
                "error",
                "Delete failed"
            );
        }
    };


    // =====================================================
    // CLEAR
    // =====================================================

    const handleClear = () => {

        setForm({
            ...INITIAL_FORM,
        });

        setEditId(null);

        setErrors({});
    };


    // =====================================================
    // FILTER
    // =====================================================

    const filteredVendors = vendors.filter((vendor) => {

        const searchText =
            search.toLowerCase();

        return (

            (vendor.vendorName || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (vendor.company || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (vendor.phone || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (vendor.email || "")
                .toLowerCase()
                .includes(searchText)

            ||

            (vendor.taxId || "")
                .toLowerCase()
                .includes(searchText)
        );
    });


    // =====================================================
    // UI
    // =====================================================

    return (

        <div
            style={{
                minHeight: "100%",
                backgroundColor: T.contentBg,
                padding: "15px",
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >

                <PageTitle
                    title="Vendor List"
                    subtitle="Manage your vendors and their details"
                />


                <PrimaryButton
                    onClick={() => {

                        handleClear();

                        setShowForm(true);
                    }}
                >
                    + New Vendor
                </PrimaryButton>

            </div>


            {/* =================================================
                TOAST
            ================================================= */}

            {toast && (

                <Toast
                    type={toast.type}
                    message={toast.message}
                />

            )}


            {/* =================================================
                ADD / EDIT FORM
            ================================================= */}

            {showForm && (

                <div
                    style={{
                        marginBottom: "20px",
                    }}
                >

                    <MasterCard
                        title={
                            editId
                                ? "Edit Vendor"
                                : "Add New Vendor"
                        }
                    >

                        <FormRow>


                            {/* Vendor Name */}

                            <FormField
                                col={12}
                                md={4}
                                label="Vendor Name"
                                required
                                error={errors.vendorName}
                            >

                                <TextInput
                                    value={form.vendorName}
                                    onChange={handleChange(
                                        "vendorName"
                                    )}
                                    placeholder="Enter Vendor Name"
                                />

                            </FormField>


                            {/* Company */}

                            <FormField
                                col={12}
                                md={4}
                                label="Company"
                            >

                                <TextInput
                                    value={form.company}
                                    onChange={handleChange(
                                        "company"
                                    )}
                                    placeholder="Enter Company"
                                />

                            </FormField>


                            {/* Phone */}

                            <FormField
                                col={12}
                                md={4}
                                label="Phone"
                                required
                                error={errors.phone}
                            >

                                <TextInput
                                    value={form.phone}
                                    onChange={handleChange(
                                        "phone"
                                    )}
                                    placeholder="Enter Phone Number"
                                />

                            </FormField>


                            {/* Email */}

                            <FormField
                                col={12}
                                md={4}
                                label="Email"
                                error={errors.email}
                            >

                                <TextInput
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange(
                                        "email"
                                    )}
                                    placeholder="Enter Email"
                                />

                            </FormField>


                            {/* Tax ID */}

                            <FormField
                                col={12}
                                md={4}
                                label="Tax ID"
                            >

                                <TextInput
                                    value={form.taxId}
                                    onChange={handleChange(
                                        "taxId"
                                    )}
                                    placeholder="Enter Tax ID"
                                />

                            </FormField>


                            {/* Country */}

                            <FormField
                                col={12}
                                md={4}
                                label="Country"
                            >

                                <SelectInput
                                    value={form.countryId}
                                    onChange={handleChange(
                                        "countryId"
                                    )}
                                    options={countries}
                                    placeholder="Select Country"
                                />

                            </FormField>


                            {/* State */}

                            <FormField
                                col={12}
                                md={4}
                                label="State"
                            >

                                <SelectInput
                                    value={form.stateId}
                                    onChange={handleChange(
                                        "stateId"
                                    )}
                                    options={states}
                                    placeholder="Select State"
                                />

                            </FormField>


                            {/* City */}

                            <FormField
                                col={12}
                                md={4}
                                label="City"
                            >

                                <SelectInput
                                    value={form.cityId}
                                    onChange={handleChange(
                                        "cityId"
                                    )}
                                    options={cities}
                                    placeholder="Select City"
                                />

                            </FormField>


                            {/* Address */}

                            <FormField
                                col={12}
                                label="Address"
                            >

                                <textarea
                                    rows="3"
                                    value={form.address}
                                    onChange={handleChange(
                                        "address"
                                    )}
                                    placeholder="Enter Address"
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border:
                                            "1px solid #ddd",
                                        borderRadius: "6px",
                                        resize: "vertical",
                                        boxSizing:
                                            "border-box",
                                    }}
                                />

                            </FormField>


                            {/* Status */}

                            <FormField col={12}>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "25px",
                                        flexWrap: "wrap",
                                        marginTop: "10px",
                                    }}
                                >

                                    <label>

                                        <input
                                            type="checkbox"
                                            checked={
                                                form.isInactive ===
                                                1
                                            }
                                            onChange={(e) =>
                                                setForm(
                                                    (prev) => ({
                                                        ...prev,
                                                        isInactive:
                                                            e.target
                                                                .checked
                                                                ? 1
                                                                : 0,
                                                    })
                                                )
                                            }
                                        />

                                        {" "}Inactive

                                    </label>

                                </div>

                            </FormField>

                        </FormRow>


                        {/* BUTTONS */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "10px",
                                marginTop: "20px",
                            }}
                        >

                            <SecondaryButton
                                onClick={() => {

                                    handleClear();

                                    setShowForm(false);
                                }}
                            >
                                Cancel
                            </SecondaryButton>


                            <PrimaryButton
                                onClick={handleSave}
                            >

                                {editId
                                    ? "Update Vendor"
                                    : "Save Vendor"}

                            </PrimaryButton>

                        </div>

                    </MasterCard>

                </div>

            )}


            {/* =================================================
                VENDOR LIST
            ================================================= */}

            <MasterCard title="Vendor List">


                {/* SEARCH */}

                <div
                    style={{
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "15px",
                        flexWrap: "wrap",
                    }}
                >

                    <div
                        style={{
                            width: "300px",
                            maxWidth: "100%",
                        }}
                    >

                        <TextInput
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search vendor..."
                        />

                    </div>


                    <div
                        style={{
                            fontSize: "13px",
                            color: "#666",
                        }}
                    >

                        Total Records :{" "}
                        {filteredVendors.length}

                    </div>

                </div>


                {/* TABLE */}

                <div
                    style={{
                        overflowX: "auto",
                    }}
                >

                    <table style={tableStyle}>

                        <thead>

                            <tr>

                                <th style={thStyle}>
                                    Vendor Name
                                </th>

                                <th style={thStyle}>
                                    Company
                                </th>

                                <th style={thStyle}>
                                    Phone
                                </th>

                                <th style={thStyle}>
                                    Email
                                </th>

                                <th style={thStyle}>
                                    Tax ID
                                </th>

                                <th style={thStyle}>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredVendors.length ===
                            0 ? (

                                <tr>

                                    <td
                                        colSpan="6"
                                        style={{
                                            textAlign:
                                                "center",
                                            padding:
                                                "25px",
                                        }}
                                    >
                                        No Vendors Found
                                    </td>

                                </tr>

                            ) : (

                                filteredVendors.map(
                                    (vendor) => (

                                        <tr
                                            key={
                                                vendor.vendorId
                                            }
                                        >

                                            <td
                                                style={
                                                    tdStyle
                                                }
                                            >
                                                {
                                                    vendor.vendorName
                                                }
                                            </td>


                                            <td
                                                style={
                                                    tdStyle
                                                }
                                            >
                                                {
                                                    vendor.company
                                                }
                                            </td>


                                            <td
                                                style={
                                                    tdStyle
                                                }
                                            >
                                                {
                                                    vendor.phone
                                                }
                                            </td>


                                            <td
                                                style={
                                                    tdStyle
                                                }
                                            >
                                                {
                                                    vendor.email
                                                }
                                            </td>


                                            <td
                                                style={
                                                    tdStyle
                                                }
                                            >
                                                {
                                                    vendor.taxId
                                                }
                                            </td>


                                            <td
                                                style={
                                                    tdStyle
                                                }
                                            >

                                                <div
                                                    style={{
                                                        display:
                                                            "flex",
                                                        gap: "8px",
                                                    }}
                                                >

                                                    <button
                                                        style={
                                                            editBtnStyle
                                                        }
                                                        onClick={() =>
                                                            handleEdit(
                                                                vendor
                                                            )
                                                        }
                                                        title="Edit"
                                                    >

                                                        <i className="fas fa-edit"></i>

                                                    </button>


                                                    <button
                                                        style={
                                                            deleteBtnStyle
                                                        }
                                                        onClick={() =>
                                                            handleDelete(
                                                                vendor.vendorId
                                                            )
                                                        }
                                                        title="Delete"
                                                    >

                                                        <i className="fas fa-trash"></i>

                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </MasterCard>

        </div>
    );
}


// =====================================================
// TABLE STYLES
// =====================================================

const tableStyle = {

    width: "100%",

    borderCollapse: "collapse",
};


const thStyle = {

    padding: "10px",

    borderBottom:
        "1px solid #ddd",

    textAlign: "left",

    whiteSpace: "nowrap",
};


const tdStyle = {

    padding: "10px",

    borderBottom:
        "1px solid #eee",
};


// =====================================================
// EDIT BUTTON
// =====================================================

const editBtnStyle = {

    border: "none",

    backgroundColor: "#fff3e8",

    color: T.accent,

    width: "30px",

    height: "30px",

    borderRadius: "6px",

    cursor: "pointer",

    fontSize: "14px",
};


// =====================================================
// DELETE BUTTON
// =====================================================

const deleteBtnStyle = {

    border: "none",

    backgroundColor: "#fff0f0",

    color: "#c0392b",

    width: "30px",

    height: "30px",

    borderRadius: "6px",

    cursor: "pointer",

    fontSize: "14px",
};