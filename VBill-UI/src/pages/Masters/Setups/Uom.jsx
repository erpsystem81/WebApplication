import React, { useState, useCallback } from "react";

import PageTitle from "../../../components/common/PageTitle";
import MasterCard from "../../../components/common/MasterCard";
import FormRow from "../../../components/common/FormRow";
import FormField from "../../../components/common/FormField";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import { useEffect } from "react";
import Toast from "../../../components/common/Toast";
import {
  getAllUnits,
  createUnit,
  updateUnit,
  deleteUnit,
} from "../../../services/UnitService";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/common/ActionBtn";

import T from "../../../components/common/MasterStyles";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */

const unitTypeS = [
  { value: "Simple", label: "Simple" },
  { value: "Compound", label: "Compound" },
  { value: "Derived", label: "Derived" },
  { value: "Volume", label: "Volume" },
  { value: "Length", label: "Length" },
  { value: "Count", label: "Count" }
];

const INITIAL_FORM = {
  unitName: "",
  unitCode: "",
  unitType: "",
  baseUnitId: "",
  conversionFactor: "",
  decimalPlaces: "",
  isBaseUnit: false,
  allowFraction: false,
  status: 1,
  isInactive: 0,
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function UnitMaster() {

  const [form, setForm] = useState(INITIAL_FORM);

  const [units, setUnits] = useState([]);

  const [errors, setErrors] = useState({});

  const [focused, setFocused] = useState("");

  const [toast, setToast] = useState(null);

  const [editId, setEditId] = useState(null);

  /* ───────────────────────────────────────── */

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
    loadUnits();
  }, []);

  const loadUnits = async () => {
    try {
      const response = await getAllUnits();
      setUnits(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  /* ───────────────────────────────────────── */

  const handleChange =
    (field) =>
      (e) => {

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

  /* ───────────────────────────────────────── */

  const validate = () => {

    const errors = {};

    if (!form.unitName.trim()) {
      errors.unitName = "Unit Name is required";
    }

    if (!form.unitCode.trim()) {
      errors.unitCode = "Unit Code is required";
    }

    if (!form.unitType) {
      errors.unitType = "Unit Type is required";
    }

    if (!form.isBaseUnit) {

      if (!form.baseUnitId) {
        errors.baseUnitId = "Base Unit is required";
      }

      if (!form.conversionFactor) {
        errors.conversionFactor =
          "Conversion Factor is required";
      }

    }

    return errors;
  };

  /* ───────────────────────────────────────── */

  const handleSave = async () => {

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {

      if (editId) {

        await updateUnit(editId, form);

        showToast(
          "success",
          "Unit updated successfully"
        );

      } else {

        await createUnit(form);

        showToast(
          "success",
          "Unit created successfully"
        );
      }

      loadUnits();

      setForm(INITIAL_FORM);

      setEditId(null);

    } catch (error) {

      console.log(error);

      showToast(
        "error",
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  /* ───────────────────────────────────────── */

  const handleEdit = (unit) => {

    setEditId(unit.unitId);

    setForm({

      unitName: unit.unitName,

      unitCode: unit.unitCode,

      unitType: unit.unitType,

      baseUnitId: unit.baseUnitId || "",

      conversionFactor: unit.conversionFactor || "",

      decimalPlaces: unit.decimalPlaces || "",

      isBaseUnit: unit.isBaseUnit,

      allowFraction: unit.allowFraction,

      status: unit.status,

      isInactive: unit.isInactive,

    });

  };

  /* ───────────────────────────────────────── */

  const handleDelete = async (unitId) => {

    try {

      await deleteUnit(unitId);

      loadUnits();

      showToast(
        "success",
        "Unit deleted successfully"
      );

    } catch (error) {

      console.log(error);

      showToast(
        "error",
        "Delete failed"
      );
    }

  };

  /* ───────────────────────────────────────── */

  const handleClear = () => {

    setForm(INITIAL_FORM);

    setErrors({});

    setEditId(null);
  };

  /* ───────────────────────────────────────── */

  const baseUnitOptions =
    units
      .filter((u) => u.isBaseUnit)
      .map((u) => ({
        value: u.unitId,
        label: u.unitName,
      }));
  /* ───────────────────────────────────────── */

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: T.contentBg,
        padding: "15px",
      }}
    >

      <PageTitle
        title="Unit Master"
        subtitle="Manage unit configurations"
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
          gridTemplateColumns:
            "360px 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >

        {/* LEFT FORM */}

        <MasterCard title="Unit Details">

          <FormRow>
            <FormField
              col={12}
              md={6}
              label="Unit Name"
              required
              error={errors.unitName}
            >
              <TextInput
                value={form.unitName}
                onChange={handleChange("unitName")}
                placeholder="Enter unit name"
                focused={focused === "name"}
                onFocus={() =>
                  setFocused("name")
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={6}
              label="Unit Code"
              required
              error={errors.unitCode}
            >
              <TextInput
                value={form.unitCode}
                onChange={handleChange("unitCode")}
                placeholder="KG"
                focused={focused === "code"}
                onFocus={() =>
                  setFocused("code")
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={6}
              label="Unit Type"
              required
              error={errors.unitType}
            >
              <SelectInput
                value={form.unitType}
                onChange={handleChange("unitType")}
                options={unitTypeS}
                placeholder="Select Type"
                focused={focused === "type"}
                onFocus={() =>
                  setFocused("type")
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={6}
              label="Base Unit"
              required={!form.isBaseUnit}
              error={errors.baseUnitId}
            >
              <SelectInput
                value={form.baseUnitId}

                onChange={handleChange("baseUnitId")}

                disabled={form.isBaseUnit}
                options={baseUnitOptions}
                placeholder="Select Base Unit"

                focused={focused === "baseUnit"}
                onFocus={() =>
                  setFocused("baseUnit")
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={6}

              label="Conversion Factor"
              required={!form.isBaseUnit}

              error={errors.conversionFactor}

            >
              <TextInput
                type="number"
                value={form.conversionFactor}

                onChange={handleChange("conversionFactor")}

                disabled={form.isBaseUnit}
                placeholder="1000"
                focused={
                  focused ===
                  "conversionFactor"
                }
                onFocus={() =>
                  setFocused(
                    "conversionFactor"
                  )
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={6}
              label="Decimal Places"
            >
              <TextInput
                type="number"
                value={form.decimalPlaces}

                onChange={handleChange("decimalPlaces")}
                placeholder="2"
                focused={
                  focused ===
                  "decimalPlaces"
                }
                onFocus={() =>
                  setFocused(
                    "decimalPlaces"
                  )
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>
          </FormRow>

          {/* CHECKBOXES */}

          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "8px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >

            <label
              style={checkboxStyle}
            >
              <input
                type="checkbox"
                checked={form.isBaseUnit}

                onChange={handleChange("isBaseUnit")}
              />
              Is Base Unit
            </label>

            <label
              style={checkboxStyle}
            >
              <input
                type="checkbox"
                checked={form.allowFraction}

                onChange={handleChange("allowFraction")}
              />
              Allow Fraction
            </label>

          </div>

          {/* FOOTER */}

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

        {/* RIGHT TABLE */}

        <MasterCard title="Unit List">

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
                    Name
                  </th>

                  <th style={thStyle}>
                    Code
                  </th>

                  <th style={thStyle}>
                    Type
                  </th>

                  <th style={thStyle}>
                    Base Unit
                  </th>

                  <th style={thStyle}>
                    Factor
                  </th>

                  <th style={thStyle}>
                    Decimal
                  </th>

                  <th style={thStyle}>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {units.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      style={emptyStyle}
                    >
                      No units added yet
                    </td>
                  </tr>
                ) : (
                  units.map((unit) => (
                    <tr
                      key={unit.unitId}
                      style={trStyle}
                    >

                      <td style={tdStyle}>
                        {unit.unitName}
                      </td>

                      <td style={tdStyle}>
                        {unit.unitCode}
                      </td>

                      <td style={tdStyle}>
                        {unit.unitType}
                      </td>

                      <td style={tdStyle}>
                        {unit.isBaseUnit
                          ? "-"
                          : unit.baseUnitName}
                      </td>

                      <td style={tdStyle}>
                        {unit.isBaseUnit
                          ? "1"
                          : unit.conversionFactor}
                      </td>

                      <td style={tdStyle}>
                        {unit.decimalPlaces || "-"}
                      </td>

                      <td style={tdStyle}>

                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                            justifyContent:
                              "center",
                          }}
                        >

                          <button
                            style={editBtnStyle}
                            onClick={() =>
                              handleEdit(unit)
                            }
                          >
                            ✏
                          </button>

                          <button
                            style={deleteBtnStyle}
                            onClick={() =>
                              handleDelete(unit.unitId)
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
};

const tdStyle = {
  padding: "12px",
  borderBottom:
    "1px solid #f0e4d0",
  fontSize: "13px",
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