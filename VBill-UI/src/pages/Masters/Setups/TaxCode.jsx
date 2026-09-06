import React, { useState, useCallback, useMemo, useEffect } from "react";

import PageTitle from "../../../components/common/PageTitle";
import MasterCard from "../../../components/common/MasterCard";
import FormRow from "../../../components/common/FormRow";
import FormField from "../../../components/common/FormField";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import Toast from "../../../components/common/Toast";
import {
  getAllTaxCodes,
  getTaxCodeById,
  createTaxCode,
  updateTaxCode,
  deleteTaxCode,
  getAllTaxCodeDetails,
  getTaxCodeDetailById,
  createTaxCodeDetail,
  updateTaxCodeDetail,
  deleteTaxCodeDetail
} from "../../../services/TaxCodeService";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/common/ActionBtn";

import T from "../../../components/common/MasterStyles";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const INITIAL_CODE_FORM = {
  taxCodeName: "",
  taxCodeRate: "",
  taxType: "",
  status: 1,
  isInactive: 0,
};

const INITIAL_DETAIL_FORM = {
  taxComponent: "",
  taxRate: "",
  status: 1,
  isInactive: 0
};


/* ─────────────────────────────────────────────
   UTIL
───────────────────────────────────────────── */

const formatRate = (val) => {
  const num = parseFloat(val);

  return isNaN(num)
    ? val
    : num.toFixed(2);
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const taxTypeS = [
  { value: "GST", label: "GST" },
  { value: "VAT", label: "VAT" },
  { value: "IGST", label: "IGST" },
];
export default function TaxCodeMaster() {

  const [taxCodes, setTaxCodes] = useState([]);

  const [selectedCode, setSelectedCode] = useState(null);
  const [taxDetails, setTaxDetails] = useState([]);

  const [codeForm, setCodeForm] =
    useState(INITIAL_CODE_FORM);

  const [detailForm, setDetailForm] =
    useState(INITIAL_DETAIL_FORM);

  const [codeErrors, setCodeErrors] =
    useState({});

  const [detailErrors, setDetailErrors] =
    useState({});

  const [focused, setFocused] =
    useState("");

  const [toast, setToast] =
    useState(null);

  const [editCodeId, setEditCodeId] = useState(null);

  const [editDetailId, setEditDetailId] =
    useState(null);

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

  const loadTaxCodes = async () => {
    try {

      const response =
        await getAllTaxCodes();

      setTaxCodes(response.data);

    } catch (error) {

      console.log(error);

      showToast(
        "error",
        "Unable to load tax codes"
      );

    }
  };

  const loadTaxCodeDetails = async () => {

    try {

        const response =
            await getAllTaxCodeDetails();

        setTaxDetails(response);

    } catch (error) {

        console.log(error);

    }

};

  useEffect(() => {
    loadTaxCodes();
    loadTaxCodeDetails();
  }, []);

  /* ───────────────────────────────────────── */

  const activeDetails = useMemo(() => {

    if (!selectedCode)
        return [];

    return taxDetails.filter(
        x => x.taxCodeId === selectedCode.taxCodeId
    );

}, [selectedCode, taxDetails]);
  /* ───────────────────────────────────────── */

  const handleCodeChange =
    useCallback(
      (field) => (e) => {

        setCodeForm((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));

        setCodeErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      },
      []
    );

  /* ───────────────────────────────────────── */

  const handleDetailChange =
    useCallback(
      (field) => (e) => {

        setDetailForm((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));

        setDetailErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      },
      []
    );

  /* ───────────────────────────────────────── */

  const validate = () => {

    const newErrors = {};

    if (!codeForm.taxCodeName.trim()) {

      newErrors.taxCodeName =
        "Tax Code Name is required";

    }

    const duplicate = taxCodes.some(
      (item) =>
        item.taxCodeName.toLowerCase() ===
        codeForm.taxCodeName.trim().toLowerCase() &&
        item.taxCodeId !== editCodeId
    );

    if (duplicate) {

      newErrors.taxCodeName =
        "Tax Code already exists";

    }

    return newErrors;

  };

  /* ───────────────────────────────────────── */

  const validateDetail = () => {

    const newErrors = {};

    if (
      !detailForm.taxComponent.trim()
    ) {
      newErrors.taxComponent =
        "Component name required";
    }

    if (!detailForm.taxRate.trim()) {
      newErrors.taxRate =
        "Rate is required";
    } else if (
      isNaN(detailForm.taxRate)
    ) {
      newErrors.taxRate =
        "Enter valid rate";
    }

    const duplicate =
      activeDetails.some(
        (d) =>
          d.taxComponent.toLowerCase() ===
          detailForm.taxComponent
            .trim()
            .toLowerCase() &&
          d.taxCodeId !== editDetailId
      );

    if (duplicate) {
      newErrors.taxComponent =
        "Component already exists";
    }

    return newErrors;
  };

  /* ───────────────────────────────────────── */

  const handleCodeSave = async () => {

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {

      setCodeErrors(validationErrors);

      return;

    }

    try {

      if (editCodeId) {

        await updateTaxCode(
          editCodeId,
          codeForm
        );

        showToast(
          "success",
          "Tax Code updated successfully"
        );

      } else {

        console.log(codeForm);
        await createTaxCode(codeForm);

        showToast(
          "success",
          "Tax Code created successfully"
        );

      }

      await loadTaxCodes();

      setCodeForm(INITIAL_CODE_FORM);

      setEditCodeId(null);

      setCodeErrors({});

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

  const handleDetailSave = async () => {

    if (!selectedCode) {

        showToast("error", "Select Tax Code first");

        return;
    }

    const validationErrors = validateDetail();

    if (Object.keys(validationErrors).length > 0) {

        setDetailErrors(validationErrors);

        return;
    }

    const payload = {

        taxComponent: detailForm.taxComponent,

        taxRate: Number(detailForm.taxRate),

        taxCodeId: selectedCode.taxCodeId,

        status: 1,

        isInactive: 0,

    };

    try {

        if (editDetailId) {

            await updateTaxCodeDetail(
                editDetailId,
                payload
            );

            showToast(
                "success",
                "Tax Component updated successfully"
            );

        } else {

            await createTaxCodeDetail(payload);

            showToast(
                "success",
                "Tax Component added successfully"
            );

        }

        handleDetailClear();

        loadTaxCodeDetails();

    } catch (error) {

        console.log(error);

        showToast(
            "error",
            "Unable to save Tax Component"
        );

    }

};

  /* ───────────────────────────────────────── */

  const handleCodeEdit = async (id) => {

    try {

      const response = await getTaxCodeById(id);

      const data = response.data;

      setEditCodeId(data.taxCodeId);

      setCodeForm({
        taxCodeName: data.taxCodeName,
        taxCodeRate: data.taxCodeRate ?? "",
        taxType: data.taxType ?? "",
        status: data.status,
        isInactive: data.isInactive,
      });

      setCodeErrors({});

    } catch (error) {

      console.log(error);

      showToast(
        "error",
        "Unable to load Tax Code."
      );

    }

  };

  /* ───────────────────────────────────────── */

  const handleDetailEdit = (
    detail
  ) => {

    setDetailForm({

    taxComponent: detail.taxComponent,

    taxRate: detail.taxRate,

    status: detail.status,

    isInactive: detail.isInactive,

});

setEditDetailId(detail.taxComponentId);

    setDetailErrors({});
  };

  /* ───────────────────────────────────────── */

  const handleCodeDelete = async (taxCodeId) => {

    try {

      await deleteTaxCode(taxCodeId);

      await loadTaxCodes();

      showToast(
        "success",
        "Tax Code deleted successfully"
      );

      if (editCodeId === taxCodeId) {

        setCodeForm(INITIAL_CODE_FORM);

        setEditCodeId(null);

      }

    } catch (error) {

      console.log(error);

      showToast(
        "error",
        "Delete failed"
      );

    }

  };
  /* ───────────────────────────────────────── */

  const handleDetailDelete = async (id) => {

    try {

        await deleteTaxCodeDetail(id);

        loadTaxCodeDetails();

        showToast(
            "success",
            "Deleted Successfully"
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

  const handleCodeClear = () => {

    setCodeForm(
      INITIAL_CODE_FORM
    );

    setEditCodeId(null);

    setCodeErrors({});
  };

  /* ───────────────────────────────────────── */

  const handleDetailClear =
    () => {

      setDetailForm(
        INITIAL_DETAIL_FORM
      );

      setEditDetailId(null);

      setDetailErrors({});
    };

  /* ───────────────────────────────────────── */

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor:
          T.contentBg,
        padding: "15px",
      }}
    >

      <PageTitle
        title="Tax Code Master"
        subtitle="Manage tax code and tax details"
      />

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
        />
      )}

      {/* ───────────── TAX CODE ───────────── */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "360px 1fr",
          gap: "20px",
          marginBottom: "24px",
          alignItems: "start",
        }}
      >

        {/* LEFT FORM */}

        <MasterCard title="Tax Code Details">

          <FormRow>

            <FormField
              col={12}
              label="Tax Code Name"
              required
              error={codeErrors.taxCodeName}
            >
              <TextInput
                value={codeForm.taxCodeName}
                onChange={handleCodeChange("taxCodeName")}
                placeholder="GST 18"
                focused={focused === "name"}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
              />
            </FormField>

            <FormField
              col={12}
              md={6}
              label="Rate"
              required
              error={codeErrors.rate}
            >
              <TextInput
                type="number"
                value={codeForm.taxCodeRate ?? ""}
                onChange={handleCodeChange(
                  "taxCodeRate"
                )}
                placeholder="18.00"
                focused={
                  focused === "rate"
                }
                onFocus={() =>
                  setFocused("rate")
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={6}
              label="Tax Type"
            >
              <SelectInput
                value={codeForm.taxType}
                onChange={handleCodeChange(
                  "taxType"
                )}
                options={taxTypeS}
                placeholder="Select Type"
                focused={
                  focused === "type"
                }
                onFocus={() =>
                  setFocused("type")
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

          </FormRow>

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
                onClick={
                  handleCodeClear
                }
              >
                Clear
              </SecondaryButton>

              <PrimaryButton
                onClick={
                  handleCodeSave
                }
              >
                {editCodeId
                  ? "Update"
                  : "Save"}
              </PrimaryButton>

            </div>

          </div>

        </MasterCard>

        {/* RIGHT TABLE */}

        <MasterCard title="Tax Code List">

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
                    Tax Code
                  </th>

                  <th style={thStyle}>
                    Rate
                  </th>

                  <th style={thStyle}>
                    Type
                  </th>

                  <th style={thStyle}>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {taxCodes.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={
                        emptyStyle
                      }
                    >
                      No tax codes added yet
                    </td>
                  </tr>
                ) : (
                  taxCodes.map(
                    (code) => (
                      <tr
                        key={
                          code.taxCodeId
                        }
                        onClick={() => setSelectedCode(code)}
                        style={
                          trStyle
                        }
                      >

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            code.taxCodeName
                          }
                        </td>

                        <td style={tdStyle}>{code.taxCodeRate}</td>

                        <td style={tdStyle}>{code.taxType}</td>

                        <td style={tdStyle}>
                          <div style={{
                              display:"flex",
                              gap: "8px", 
                              justifyContent:"center"}}>
                            <button style={editBtnStyle}
                              onClick={() => handleCodeEdit(code.taxCodeId)}>
                              ✏
                            </button>

                            <button
                              style={
                                deleteBtnStyle
                              }
                              onClick={() =>
                                handleCodeDelete(
                                  code.taxCodeId
                                )
                              }
                            >
                              🗑
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

      {/* ───────────── TAX DETAILS ───────────── */}

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

        <MasterCard title="Tax Detail">

          <FormRow>

            <FormField
  col={12}
  label="Tax Code"
  required
>
  <SelectInput
    value={selectedCode?.taxCodeId || ""}
    onChange={(e) => {
      const id = Number(e.target.value);

      const code = taxCodes.find(
        (x) => x.taxCodeId === id
      );

      setSelectedCode(code || null);
    }}
    options={taxCodes.map((item) => ({
      value: item.taxCodeId,
      label: item.taxCodeName,
    }))}
    placeholder="Select Tax Code"
    focused={focused === "taxCode"}
    onFocus={() => setFocused("taxCode")}
    onBlur={() => setFocused("")}
  />
</FormField>
            <FormField
              col={12}
              label="Component Name"
              required
              error={
                detailErrors.taxComponent
              }
            >
              <TextInput
                value={
                  detailForm.taxComponent
                }
                onChange={handleDetailChange(
                  "taxComponent"
                )}
                placeholder="CGST"
                disabled={
                  !selectedCode
                }
                focused={
                  focused ===
                  "taxComponent"
                }
                onFocus={() =>
                  setFocused(
                    "taxComponent"
                  )
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              label="Rate"
              required
              error={
                detailErrors.taxRate
              }
            >
              <TextInput
                type="number"
                value={
                  detailForm.taxRate
                }
                onChange={handleDetailChange(
                  "taxRate"
                )}
                placeholder="9.00"
                disabled={
                  !selectedCode
                }
                focused={
                  focused ===
                  "detailRate"
                }
                onFocus={() =>
                  setFocused(
                    "detailRate"
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

            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color:
                  T.mutedText,
              }}
            >
              {selectedCode
                ? `Selected : ${selectedCode.taxCodeName}`
                : "Select tax code first"}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >

              <SecondaryButton
                onClick={
                  handleDetailClear
                }
              >
                Clear
              </SecondaryButton>

              <PrimaryButton
                onClick={
                  handleDetailSave
                }
              >
                {editDetailId
                  ? "Update"
                  : "Save"}
              </PrimaryButton>

            </div>

          </div>

        </MasterCard>

        {/* RIGHT TABLE */}

        <MasterCard title="Tax Detail List">

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
                    Component
                  </th>

                  <th style={thStyle}>
                    Rate
                  </th>

                  <th style={thStyle}>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {!selectedCode ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={
                        emptyStyle
                      }
                    >
                      Select tax code
                      to view details
                    </td>
                  </tr>
                ) : activeDetails.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={
                        emptyStyle
                      }
                    >
                      No details added yet
                    </td>
                  </tr>
                ) : (
                  activeDetails.map(
                    (detail) => (
                      <tr
                        key={
                          detail.taxComponentId
                        }
                        style={
                          trStyle
                        }
                      >

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            detail.taxComponent
                          }
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {
                            detail.taxRate
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
                              justifyContent:
                                "center",
                            }}
                          >

                            <button
                              style={
                                editBtnStyle
                              }
                              onClick={() =>
                                handleDetailEdit(
                                  detail
                                )
                              }
                            >
                              ✏
                            </button>

                            <button
                              style={
                                deleteBtnStyle
                              }
                              onClick={() =>
                                handleDetailDelete(
                                  detail.taxComponentId
                                )
                              }
                            >
                              🗑
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

    </div>
  );
}

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor:
    T.tableHead,
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