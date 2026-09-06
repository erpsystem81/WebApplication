import React, { useState } from "react";

import PageTitle from "../../components/common/PageTitle";
import MasterCard from "../../components/common/MasterCard";
import FormRow from "../../components/common/FormRow";
import FormField from "../../components/common/FormField";
import TextInput from "../../components/common/TextInput";
import Toast from "../../components/common/Toast";
import {
    PrimaryButton,
    SecondaryButton,
} from "../../components/common/ActionBtn";

import T from "../../components/common/MasterStyles";

const INITIAL_FORM = {
    customerName: "",
    company: "",
    phone: "",
    email: "",
    taxId: "",
};

export default function Customer() {

    const [customers, setCustomers] = useState([
        {
            customerId: 1,
            customerName: "Amit Wadekar",
            company: "",
            phone: "2929292929",
            email: "",
            taxId: "",
        },
        {
            customerId: 2,
            customerName: "Krishna Wadekar",
            company: "",
            phone: "90",
            email: "",
            taxId: "",
        },
    ]);

    const [form, setForm] = useState(INITIAL_FORM);

    const [selectedId, setSelectedId] = useState(null);
    const [editId, setEditId] = useState(null);

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [errors, setErrors] = useState({});

    const [toast, setToast] = useState(null);


    // =========================================================
    // TOAST
    // =========================================================

    const showToast = (type, message) => {

        setToast({
            type,
            message,
        });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };


    // =========================================================
    // HANDLE CHANGE
    // =========================================================

    const handleChange = (field) => (e) => {

        const value = e.target.value;

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };


    // =========================================================
    // VALIDATION
    // =========================================================

    const validate = () => {

        const validationErrors = {};

        if (!form.customerName.trim()) {
            validationErrors.customerName =
                "Customer Name is required";
        }

        if (!form.phone.trim()) {
            validationErrors.phone =
                "Phone is required";
        }

        return validationErrors;
    };


    // =========================================================
    // SAVE CUSTOMER
    // =========================================================

    const handleSave = async () => {

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;
        }

        try {

            const payload = {
                customerName: form.customerName,
                company: form.company,
                phone: form.phone,
                email: form.email,
                taxId: form.taxId,
            };

            console.log("Customer Payload:", payload);


            // =================================================
            // UPDATE
            // =================================================

            if (editId) {

                setCustomers((prev) =>
                    prev.map((customer) =>
                        customer.customerId === editId
                            ? {
                                  ...customer,
                                  ...payload,
                              }
                            : customer
                    )
                );

                showToast(
                    "success",
                    "Customer updated successfully"
                );

            }

            // =================================================
            // CREATE
            // =================================================

            else {

                const newCustomer = {
                    customerId: Date.now(),
                    ...payload,
                };

                setCustomers((prev) => [
                    ...prev,
                    newCustomer,
                ]);

                showToast(
                    "success",
                    "Customer created successfully"
                );
            }


            // Reset

            setForm(INITIAL_FORM);
            setEditId(null);
            setErrors({});
            setShowForm(false);
            setSelectedId(null);

        } catch (error) {

            console.log(error);

            showToast(
                "error",
                "Something went wrong"
            );
        }
    };


    // =========================================================
    // NEW CUSTOMER
    // =========================================================

    const handleNewCustomer = () => {

        setForm(INITIAL_FORM);

        setEditId(null);

        setSelectedId(null);

        setErrors({});

        setShowForm(true);
    };


    // =========================================================
    // EDIT CUSTOMER
    // =========================================================

    const handleEdit = () => {

        if (!selectedId) {
            return;
        }

        const customer = customers.find(
            (item) =>
                item.customerId === selectedId
        );

        if (!customer) {
            return;
        }

        setEditId(customer.customerId);

        setForm({
            customerName: customer.customerName || "",
            company: customer.company || "",
            phone: customer.phone || "",
            email: customer.email || "",
            taxId: customer.taxId || "",
        });

        setErrors({});

        setShowForm(true);
    };


    // =========================================================
    // DELETE CUSTOMER
    // =========================================================

    const handleDelete = () => {

        if (!selectedId) {
            return;
        }

        const customer = customers.find(
            (item) =>
                item.customerId === selectedId
        );

        if (!customer) {
            return;
        }

        if (
            !window.confirm(
                `Delete customer "${customer.customerName}"?`
            )
        ) {
            return;
        }

        try {

            setCustomers((prev) =>
                prev.filter(
                    (item) =>
                        item.customerId !== selectedId
                )
            );

            setSelectedId(null);

            showToast(
                "success",
                "Customer deleted successfully"
            );

        } catch (error) {

            console.log(error);

            showToast(
                "error",
                "Delete failed"
            );
        }
    };


    // =========================================================
    // CLEAR FORM
    // =========================================================

    const handleClear = () => {

        setForm(INITIAL_FORM);

        setEditId(null);

        setErrors({});
    };


    // =========================================================
    // FILTER
    // =========================================================

    const filteredCustomers =
        customers.filter((customer) => {

            const searchText =
                search.toLowerCase();

            return (
                (customer.customerName || "")
                    .toLowerCase()
                    .includes(searchText) ||

                (customer.company || "")
                    .toLowerCase()
                    .includes(searchText) ||

                (customer.phone || "")
                    .toLowerCase()
                    .includes(searchText) ||

                (customer.email || "")
                    .toLowerCase()
                    .includes(searchText) ||

                (customer.taxId || "")
                    .toLowerCase()
                    .includes(searchText)
            );
        });


    // =========================================================
    // RENDER
    // =========================================================

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
                    gap: "15px",
                    flexWrap: "wrap",
                }}
            >

                <PageTitle
                    title="Customer List"
                    subtitle="Manage your customers and their details"
                />

                <PrimaryButton
                    onClick={handleNewCustomer}
                >
                    + New Customer
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
                ADD / EDIT CUSTOMER FORM
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
                                ? "Edit Customer"
                                : "Add New Customer"
                        }
                    >

                        <FormRow>

                            {/* CUSTOMER NAME */}

                            <FormField
                                col={12}
                                md={4}
                                label="Customer Name"
                                required
                                error={
                                    errors.customerName
                                }
                            >

                                <TextInput
                                    value={
                                        form.customerName
                                    }
                                    onChange={handleChange(
                                        "customerName"
                                    )}
                                    placeholder="Enter Customer Name"
                                />

                            </FormField>


                            {/* COMPANY */}

                            <FormField
                                col={12}
                                md={4}
                                label="Company"
                            >

                                <TextInput
                                    value={
                                        form.company
                                    }
                                    onChange={handleChange(
                                        "company"
                                    )}
                                    placeholder="Enter Company"
                                />

                            </FormField>


                            {/* PHONE */}

                            <FormField
                                col={12}
                                md={4}
                                label="Phone"
                                required
                                error={errors.phone}
                            >

                                <TextInput
                                    value={
                                        form.phone
                                    }
                                    onChange={handleChange(
                                        "phone"
                                    )}
                                    placeholder="Enter Phone"
                                />

                            </FormField>


                            {/* EMAIL */}

                            <FormField
                                col={12}
                                md={4}
                                label="Email"
                            >

                                <TextInput
                                    type="email"
                                    value={
                                        form.email
                                    }
                                    onChange={handleChange(
                                        "email"
                                    )}
                                    placeholder="Enter Email"
                                />

                            </FormField>


                            {/* TAX ID */}

                            <FormField
                                col={12}
                                md={4}
                                label="Tax ID"
                            >

                                <TextInput
                                    value={
                                        form.taxId
                                    }
                                    onChange={handleChange(
                                        "taxId"
                                    )}
                                    placeholder="Enter Tax ID"
                                />

                            </FormField>

                        </FormRow>


                        {/* FORM BUTTONS */}

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
                                    ? "Update Customer"
                                    : "Save Customer"}
                            </PrimaryButton>

                        </div>

                    </MasterCard>

                </div>
            )}


            {/* =================================================
                CUSTOMER LIST
            ================================================= */}

            <MasterCard title="Customer List">

                {/* =================================================
                    TOOLBAR
                ================================================= */}

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

                    {/* LEFT BUTTONS */}

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                        }}
                    >

                        <PrimaryButton
                            onClick={handleNewCustomer}
                        >
                            + New Customer
                        </PrimaryButton>


                        <button
                            type="button"
                            onClick={handleEdit}
                            disabled={!selectedId}
                            style={
                                selectedId
                                    ? editBtnStyle
                                    : disabledBtnStyle
                            }
                        >
                            Edit
                        </button>


                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={!selectedId}
                            style={
                                selectedId
                                    ? deleteBtnStyle
                                    : disabledBtnStyle
                            }
                        >
                            Delete
                        </button>

                    </div>


                    {/* SEARCH */}

                    <div
                        style={{
                            width: "280px",
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
                            placeholder="Search customer..."
                        />

                    </div>

                </div>


                {/* =================================================
                    TABLE
                ================================================= */}

                <div
                    style={{
                        overflowX: "auto",
                    }}
                >

                    <table style={tableStyle}>

                        <thead>

                            <tr>

                                <th style={thStyle}>
                                    Customer Name
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

                            </tr>

                        </thead>


                        <tbody>

                            {filteredCustomers.length ===
                            0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign:
                                                "center",
                                            padding:
                                                "30px",
                                            color:
                                                "#777",
                                        }}
                                    >
                                        No Customers Found
                                    </td>

                                </tr>

                            ) : (

                                filteredCustomers.map(
                                    (customer) => {

                                        const isSelected =
                                            selectedId ===
                                            customer.customerId;

                                        return (

                                            <tr
                                                key={
                                                    customer.customerId
                                                }
                                                onClick={() =>
                                                    setSelectedId(
                                                        customer.customerId
                                                    )
                                                }
                                                style={{
                                                    cursor:
                                                        "pointer",
                                                    backgroundColor:
                                                        isSelected
                                                            ? "#fff3e8"
                                                            : "transparent",
                                                }}
                                            >

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        customer.customerName
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        customer.company ||
                                                        ""
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        customer.phone
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        customer.email ||
                                                        ""
                                                    }
                                                </td>

                                                <td
                                                    style={
                                                        tdStyle
                                                    }
                                                >
                                                    {
                                                        customer.taxId ||
                                                        ""
                                                    }
                                                </td>

                                            </tr>

                                        );
                                    }
                                )

                            )}

                        </tbody>

                    </table>

                </div>


                {/* =================================================
                    FOOTER / PAGINATION
                ================================================= */}

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                        gap: "15px",
                        flexWrap: "wrap",
                    }}
                >

                    <div
                        style={{
                            fontSize: "14px",
                            color: "#555",
                        }}
                    >
                        Total Records :{" "}
                        <strong>
                            {filteredCustomers.length}
                        </strong>
                    </div>


                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                        }}
                    >

                        <button
                            type="button"
                            disabled
                            style={
                                paginationDisabledStyle
                            }
                        >
                            ‹ Previous
                        </button>


                        <span
                            style={{
                                fontSize: "14px",
                                fontWeight: "600",
                            }}
                        >
                            Page 1 of 1
                        </span>


                        <button
                            type="button"
                            disabled
                            style={
                                paginationDisabledStyle
                            }
                        >
                            Next ›
                        </button>

                    </div>

                </div>

            </MasterCard>

        </div>
    );
}


/* =============================================================
   TABLE STYLES
============================================================= */

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "750px",
};


const thStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f5f5f5",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
};


const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
    fontSize: "14px",
};


/* =============================================================
   EDIT BUTTON
============================================================= */

const editBtnStyle = {
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#555",
    padding: "8px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
};


/* =============================================================
   DELETE BUTTON
============================================================= */

const deleteBtnStyle = {
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    color: "#c0392b",
    padding: "8px 18px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
};


/* =============================================================
   DISABLED BUTTON
============================================================= */

const disabledBtnStyle = {
    border: "1px solid #eee",
    backgroundColor: "#f8f8f8",
    color: "#bbb",
    padding: "8px 18px",
    borderRadius: "5px",
    cursor: "not-allowed",
    fontSize: "14px",
};


/* =============================================================
   PAGINATION
============================================================= */

const paginationDisabledStyle = {
    border: "none",
    backgroundColor: "transparent",
    color: "#aaa",
    cursor: "not-allowed",
    fontSize: "14px",
};