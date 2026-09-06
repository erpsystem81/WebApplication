import React, { useState, useEffect } from "react";

import PageTitle from "../../components/common/PageTitle";
import MasterCard from "../../components/common/MasterCard";
import FormRow from "../../components/common/FormRow";
import FormField from "../../components/common/FormField";
import TextInput from "../../components/common/TextInput";
import SelectInput from "../../components/common/SelectInput";
import Toast from "../../components/common/Toast";
import { PrimaryButton, SecondaryButton } from "../../components/common/ActionBtn";

import T from "../../components/common/MasterStyles";

// Replace with your actual services
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getAllLocations,
    getAllCategories,
    getAllUnits,
    getAllTaxCodes,
    getAllItemTypes,
} from "../../services/ItemService";

const INITIAL_FORM = {
    itemName: "",
    barcode: "",
    purchasePrice: "",
    salePrice: "",
    mrp: "",
    description: "",
    minStock: "",

    item_type_id: "",
    categoryId: "",
    baseUnitId: "",
    taxCodeId: "",
    locationId: "",

    isTaxIncluded: false,
    isBatchEnabled: false,

    status: 1,
    isInactive: 0,
};

export default function Item() {

    const [form, setForm] = useState(INITIAL_FORM);

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [locations, setLocations] = useState([]);
    const [taxCodes, setTaxCodes] = useState([]);
    const [itemTypes, setItemTypes] = useState([]);
    const [errors, setErrors] = useState({});
    const [toast, setToast] = useState(null);
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const showToast = (type, message) => {

        setToast({ type, message });

        setTimeout(() => {
            setToast(null);
        }, 3000);
    };

    useEffect(() => {
        loadItems();
        loadCategories();
        loadUnits();
        loadLocations();
        loadTaxCodes();
        loadItemTypes();
    }, []);

    const loadItems = async () => {
        try {
            const response = await getAllItems();
            setItems(response || []);
        } catch (error) {
            console.log(error);
        }
    };

    const loadCategories = async () => {

        try {

            const response = await getAllCategories();

            setCategories(
                response.data.map((category) => ({
                    value: category.categoryId,
                    label: category.categoryName,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };

    const loadUnits = async () => {

        try {

            const response = await getAllUnits();

            setUnits(
                response.data.map((unit) => ({
                    value: unit.unitId,
                    label: unit.unitName,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };

    const loadLocations = async () => {

        try {

            const response = await getAllLocations();

            setLocations(
                response.data.map((location) => ({
                    value: location.locationId,
                    label: location.name,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };

    const loadTaxCodes = async () => {

        try {

            const response = await getAllTaxCodes();

            setTaxCodes(
                response.data.map((tax) => ({
                    value: tax.taxCodeId,
                    label: tax.taxCodeName,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };

    const loadItemTypes = async () => {

        try {

            const response = await getAllItemTypes();

            // console.log(response.data);

            setItemTypes(
                response.data.map((itemType) => ({
                    value: itemType.item_type_id,
                    label: itemType.item_type,
                }))
            );

        } catch (error) {

            console.log(error);

        }
    };

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

    const validate = () => {

        const validationErrors = {};

        if (!form.itemName.trim()) {
            validationErrors.itemName = "Item Name is required";
        }

        if (!form.categoryId) {
            validationErrors.categoryId = "Category is required";
        }

        if (!form.baseUnitId) {
            validationErrors.baseUnitId = "Unit is required";
        }

        if (!form.salePrice) {
            validationErrors.salePrice = "Sale Price is required";
        }

        return validationErrors;
    };

    const handleSave = async () => {

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const payload = {

                itemName: form.itemName,
                barcode: form.barcode,

                purchasePrice: Number(form.purchasePrice || 0),
                salePrice: Number(form.salePrice || 0),
                mrp: Number(form.mrp || 0),
                minStock: Number(form.minStock || 0),

                description: form.description,

                isTaxIncluded: form.isTaxIncluded,
                isBatchEnabled: form.isBatchEnabled,

                status: form.status,
                isInactive: form.isInactive,

                itemTypeId: Number(form.item_type_id),
                categoryId: Number(form.categoryId),
                baseUnitId: Number(form.baseUnitId),
                taxCodeId: Number(form.taxCodeId),
                locationId: Number(form.locationId),
            };

              console.log("Payload:",payload);

            if (editId) {

                await updateItem(editId, payload);

                showToast(
                    "success",
                    "Item updated successfully"
                );

            } else {

                await createItem(payload);

                showToast(
                    "success",
                    "Item created successfully"
                );
            }

            await loadItems();

            setForm(INITIAL_FORM);
            setEditId(null);
            setErrors({});

        } catch (error) {

            console.log(error);

            showToast(
                "error",
                "Something went wrong"
            );
        }
    };

    const handleEdit = (item) => {

        setEditId(item.itemId);

        setShowForm(true);

        setForm({

            itemName: item.itemName,
            barcode: item.barcode,

            purchasePrice: item.purchasePrice,
            salePrice: item.salePrice,
            mrp: item.mrp,
            minStock: item.minStock,

            description: item.description,

            item_type_id: item.itemTypeId,
            categoryId: item.categoryId,
            baseUnitId: item.baseUnitId,
            taxCodeId: item.taxCodeId,
            locationId: item.locationId,

            isTaxIncluded: item.isTaxIncluded,
            isBatchEnabled: item.isBatchEnabled,

            status: item.status,
            isInactive: item.isInactive,
        });
    };
    const handleDelete = async (id) => {

        if (!window.confirm("Delete this item?")) {
            return;
        }

        try {

            await deleteItem(id);

            await loadItems();

            showToast(
                "success",
                "Item deleted successfully"
            );

        } catch (error) {

            console.log(error);

            showToast(
                "error",
                "Delete failed"
            );
        }
    };

    const handleClear = () => {

        setForm(INITIAL_FORM);
        setEditId(null);
        setErrors({});
    };

    const filteredItems = items.filter((item) =>
        (item.itemName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div
            style={{
                minHeight: "100%",
                backgroundColor: T.contentBg,
                padding: "15px",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <PageTitle
                    title="Item Master"
                    subtitle="Manage products, prices and stock"
                />

                <PrimaryButton
                    onClick={() => {
                        handleClear();
                        setShowForm(true);
                    }}
                >
                    + Add Item
                </PrimaryButton>
            </div>

            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                />
            )}

            {/* Add/Edit Form */}
            {showForm && (
                <div style={{ marginBottom: "20px" }}>
                    <MasterCard
                        title={
                            editId
                                ? "Edit Item"
                                : "Add New Item"
                        }
                    >
                        <FormRow>

                            <FormField
                                col={12}
                                md={4}
                                label="Item Name"
                                required
                                error={errors.itemName}
                            >
                                <TextInput
                                    value={form.itemName}
                                    onChange={handleChange("itemName")}
                                    placeholder="Enter Item Name"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Barcode"
                            >
                                <TextInput
                                    value={form.barcode}
                                    onChange={handleChange("barcode")}
                                    placeholder="Barcode"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Item Type"
                                required
                                error={errors.item_type_id}
                            >
                                <SelectInput
                                    value={form.item_type_id}
                                    onChange={handleChange("item_type_id")}
                                    options={itemTypes}
                                    placeholder="Select Item Type"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Category"
                                required
                                error={errors.categoryId}
                            >
                                <SelectInput
                                    value={form.categoryId}
                                    onChange={handleChange("categoryId")}
                                    options={categories}
                                    placeholder="Select Category"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Unit"
                                required
                                error={errors.baseUnitId}
                            >
                                <SelectInput
                                    value={form.baseUnitId}
                                    onChange={handleChange("baseUnitId")}
                                    options={units}
                                    placeholder="Select Base Unit"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Tax Code"
                            >
                                <SelectInput
                                    value={form.taxCodeId}
                                    onChange={handleChange("taxCodeId")}
                                    options={taxCodes}
                                    placeholder="Select Tax Code"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Purchase Price"
                            >
                                <TextInput
                                    type="number"
                                    value={form.purchasePrice}
                                    onChange={handleChange("purchasePrice")}
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Sale Price"
                                required
                                error={errors.salePrice}
                            >
                                <TextInput
                                    type="number"
                                    value={form.salePrice}
                                    onChange={handleChange("salePrice")}
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="MRP"
                            >
                                <TextInput
                                    type="number"
                                    value={form.mrp}
                                    onChange={handleChange("mrp")}
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Minimum Stock"
                            >
                                <TextInput
                                    type="number"
                                    value={form.minStock}
                                    onChange={handleChange("minStock")}
                                />
                            </FormField>

                            <FormField
                                col={12}
                                md={4}
                                label="Location"
                            >
                                <SelectInput
                                    value={form.locationId}
                                    onChange={handleChange("locationId")}
                                    options={locations}
                                    placeholder="Select Location"
                                />
                            </FormField>

                            <FormField
                                col={12}
                                label="Description"
                            >
                                <textarea
                                    rows="3"
                                    value={form.description}
                                    onChange={handleChange("description")}
                                    style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                    }}
                                />
                            </FormField>
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
                                            checked={form.isTaxIncluded}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    isTaxIncluded: e.target.checked,
                                                }))
                                            }
                                        />
                                        {" "}Tax Included
                                    </label>

                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={form.isBatchEnabled}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    isBatchEnabled: e.target.checked,
                                                }))
                                            }
                                        />
                                        {" "}Batch Enabled
                                    </label>

                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={form.isInactive === 1}
                                            onChange={(e) =>
                                                setForm((prev) => ({
                                                    ...prev,
                                                    isInactive: e.target.checked ? 1 : 0,
                                                }))
                                            }
                                        />
                                        {" "}Inactive
                                    </label>
                                </div>
                            </FormField>

                        </FormRow>

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
                                    ? "Update Item"
                                    : "Save Item"}
                            </PrimaryButton>
                        </div>
                    </MasterCard>
                </div>
            )}

            {/* Item List */}
            <MasterCard title="Item List">

                <div
                    style={{
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{ width: "300px" }}>
                        <TextInput
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search Item..."
                        />
                    </div>

                    <div
                        style={{
                            fontSize: "13px",
                            color: "#666",
                        }}
                    >
                        Total Items : {filteredItems.length}
                    </div>
                </div>

                <div style={{ overflowX: "auto" }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Item Name</th>
                                <th style={thStyle}>Barcode</th>
                                <th style={thStyle}>Category</th>
                                <th style={thStyle}>Unit</th>
                                <th style={thStyle}>Sale Price</th>
                                <th style={thStyle}>MRP</th>
                                <th style={thStyle}>Stock</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredItems.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        style={{
                                            textAlign: "center",
                                            padding: "25px",
                                        }}
                                    >
                                        No Items Found
                                    </td>
                                </tr>
                            ) : (
                                filteredItems.map((item) => (
                                    <tr key={item.itemId}>
                                        <td style={tdStyle}>
                                            {item.itemName}
                                        </td>

                                        <td style={tdStyle}>
                                            {item.barcode}
                                        </td>

                                        <td style={tdStyle}>
                                            {item.categoryName}
                                        </td>

                                        <td style={tdStyle}>
                                            {item.baseUnitName}
                                        </td>

                                        <td style={tdStyle}>
                                            ₹ {item.salePrice}
                                        </td>

                                        <td style={tdStyle}>
                                            ₹ {item.mrp}
                                        </td>

                                        <td style={tdStyle}>
                                            {item.minStock}
                                        </td>

                                        <td style={tdStyle}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "8px",
                                                }}
                                            >
                                                <button
                                                    style={editBtnStyle}
                                                    onClick={() =>
                                                        handleEdit(item)
                                                    }
                                                >
                                                    ✏
                                                </button>

                                                <button
                                                    style={deleteBtnStyle}
                                                    onClick={() =>
                                                        handleDelete(item.itemId)
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
    );
}

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
};

const thStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
};

const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #eee",
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
};