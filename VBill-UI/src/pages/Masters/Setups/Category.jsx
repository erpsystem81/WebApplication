import React, {
  useState,
  useCallback,
  useMemo,
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
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/CategoryService";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/common/ActionBtn";

import T from "../../../components/common/MasterStyles";

/* ─────────────────────────────────────────────
   INITIAL FORM
───────────────────────────────────────────── */

const INITIAL_FORM = {
  categoryName: "",
  parentCategoryId: "",
  status: 1,
  isInactive: 0,
};

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */

function buildTree(items = []) {

    if (!Array.isArray(items)) {
        return [];
    }

    const map = {};
    const roots = [];

    items.forEach(item => {
        map[item.categoryId] = {
            ...item,
            children: []
        };
    });

    items.forEach(item => {
        if (
            item.parentCategoryId &&
            map[item.parentCategoryId]
        ) {
            map[item.parentCategoryId].children.push(
                map[item.categoryId]
            );
        } else {
            roots.push(map[item.categoryId]);
        }
    });

    return roots;
}

function getDescendantIds(
  items,
  id
) {
  const children = items.filter(
    (i) => i.parentCategoryId === id
  );

  return children.flatMap((c) => [
    c.categoryId,
    ...getDescendantIds(items, c.categoryId),
  ]);
}

/* ─────────────────────────────────────────────
   TREE ROW
───────────────────────────────────────────── */

function TreeNode({
  node,
  depth,
  expandedIds,
  toggleExpand,
  onEdit,
  onDelete,
}) {
  const hasChildren =
    node.children?.length > 0;

  const isExpanded =
    expandedIds.has(node.categoryId);

  return (
    <>
      <tr style={trStyle}>
        <td
          style={{
            ...tdStyle,
            paddingLeft: `${18 + depth * 24
              }px`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {hasChildren ? (
              <button
                onClick={() =>
                  toggleExpand(node.categoryId)
                }
                style={expandBtnStyle}
              >
                {isExpanded ? "−" : "+"}
              </button>
            ) : (
              <div
                style={{
                  width: "20px",
                }}
              />
            )}

            <span
              style={{
                fontWeight:
                  depth === 0
                    ? "700"
                    : "500",
                color:
                  depth === 0
                    ? T.menuText
                    : "#3b1f0e",
              }}
            >
              {node.categoryName}
            </span>
          </div>
        </td>

        <td
          style={{
            ...tdStyle,
            textAlign: "center",
          }}
        >
          <span
            style={{
              padding:
                "5px 12px",
              borderRadius:
                "20px",
              fontSize: "11px",
              fontWeight: "700",
              backgroundColor:
                node.isInactive
                  ? "#fff0f0"
                  : "#f0faf0",
              color:
                node.isInactive
                  ? "#c0392b"
                  : "#2d6e2d",
            }}
          >
            {node.isInactive
              ? "Inactive"
              : "Active"}
          </span>
        </td>

        <td
          style={{
            ...tdStyle,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
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
                onEdit(node)
              }
            >
              ✏
            </button>

            <button
              style={
                deleteBtnStyle
              }
              onClick={() =>
                onDelete(node.categoryId)
              }
            >
              🗑
            </button>
          </div>
        </td>
      </tr>

      {hasChildren &&
        isExpanded &&
        node.children.map(
          (child) => (
            <TreeNode
              key={child.categoryId}
              node={child}
              depth={depth + 1}
              expandedIds={
                expandedIds
              }
              toggleExpand={
                toggleExpand
              }
              onEdit={onEdit}
              onDelete={
                onDelete
              }
            />
          )
        )}
    </>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export default function CategoryMaster() {
  const [form, setForm] =
    useState(INITIAL_FORM);

  const [errors, setErrors] =
    useState({});

  const [focused, setFocused] =
    useState("");

  const [toast, setToast] =
    useState(null);

  const [editId, setEditId] =
    useState(null);

  const [expandedIds, setExpandedIds] =
    useState(new Set());

  const [categories, setCategories] = useState([]);

  /* ───────────────────────────────────────── */

  const tree = useMemo(
    () => buildTree(categories),
    [categories]
  );

  /* ───────────────────────────────────────── */

  const parentOptions = useMemo(() => {

    const excluded = new Set(
        editId
            ? [
                editId,
                ...getDescendantIds(categories, editId),
            ]
            : []
    );

    return categories.filter(
        (c) =>
            c.parentCategoryId === null &&
            !excluded.has(c.categoryId)
    );

}, [categories, editId]);

  /* ───────────────────────────────────────── */

  const showToast = (
    type,
    message
  ) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };




 const loadCategories = async () => {
    try {
        const response = await getAllCategories();
        setCategories(response.data);
    } catch (error) {
        console.log(error);
        setCategories([]);
    }
};

  useEffect(() => {
    loadCategories();
  }, []);
  /* ───────────────────────────────────────── */

  const handleChange =
    useCallback(
      (field) => (e) => {
        const value =
          e.target.type ===
            "checkbox"
            ? e.target.checked
            : field ===
              "parentCategoryId"
              ? e.target.value
                ? Number(
                  e.target.value
                )
                : ""
              : e.target.value;

        setForm((prev) => ({
          ...prev,
          [field]: value,
        }));

        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      },
      []
    );

  /* ───────────────────────────────────────── */

  const validate = () => {
    const newErrors = {};

    if (!form.categoryName.trim()) {
      newErrors.categoryName =
        "Category name is required";
    }

    const duplicate =
      categories.some(
        (c) =>
          c.categoryName.toLowerCase() ===
          form.categoryName.trim().toLowerCase() &&
          c.parentCategoryId === form.parentCategoryId &&
          c.categoryId !== editId
      );

    if (duplicate) {
      newErrors.categoryName =
        "Category already exists";
    }

    return newErrors;
  };

  /* ───────────────────────────────────────── */

 const handleSave = async () => {

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const payload = {
        categoryName: form.categoryName,
        parentCategoryId: form.parentCategoryId || null,
        status: form.status,
        isInactive: form.isInactive,
    };

    try {

        if (editId) {

            await updateCategory(editId, payload);

            showToast(
                "success",
                "Category updated successfully"
            );

        } else {

            await createCategory(payload);

            showToast(
                "success",
                "Category created successfully"
            );

        }

        await loadCategories();

        setForm(INITIAL_FORM);

        setEditId(null);

        setErrors({});

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

  const handleEdit = (category) => {

    setEditId(category.categoryId);

    setForm({

        categoryName: category.categoryName,

        parentCategoryId:
            category.parentCategoryId ?? "",

        status: category.status,

        isInactive: category.isInactive,

    });

    setErrors({});
};

  /* ───────────────────────────────────────── */

  const handleDelete = async (id) => {

    try {

      await deleteCategory(id);

      await loadCategories();

      showToast(
        "success",
        "Category deleted successfully"
      );

      if (editId === id) {

        setForm(INITIAL_FORM);

        setEditId(null);

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

  const handleClear = () => {
    setForm(INITIAL_FORM);

    setErrors({});

    setEditId(null);
  };

  /* ───────────────────────────────────────── */

  const toggleExpand = (
    id
  ) => {
    setExpandedIds((prev) => {
      const next =
        new Set(prev);

      next.has(id)
        ? next.delete(id)
        : next.add(id);

      return next;
    });
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
        title="Category Master"
        subtitle="Manage category hierarchy and structure"
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

        <MasterCard title="Category Details">
          <FormRow>
            <FormField
              col={12}
              md={12}
              label="Category Name"
              required
              error={errors.categoryName}
            >
              <TextInput
                value={form.categoryName}
                onChange={handleChange(
                  "categoryName"
                )}
                placeholder="Enter category name"
                focused={
                  focused ===
                  "name"
                }
                onFocus={() =>
                  setFocused(
                    "name"
                  )
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>

            <FormField
              col={12}
              md={12}
              label="Parent Category"
            >
              <SelectInput
                value={
                  form.parentCategoryId || ""
                }
                onChange={handleChange(
                  "parentCategoryId"
                )}
                options={parentOptions.map((c) => ({
                  value: c.categoryId,
                  label: c.categoryName,
                }))}
                placeholder="Select Parent"
                focused={
                  focused ===
                  "parentId"
                }
                onFocus={() =>
                  setFocused(
                    "parentId"
                  )
                }
                onBlur={() =>
                  setFocused("")
                }
              />
            </FormField>
          </FormRow>

          {/* CHECKBOX */}

          <div
            style={{
              marginTop: "10px",
              marginBottom:
                "20px",
            }}
          >
            <label
              style={
                checkboxStyle
              }
            >
              <input
                type="checkbox"
                checked={
                  form.isInactive === 1
                }
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isInactive: e.target.checked ? 1 : 0,
                  }))
                }
              />
              Inactive
            </label>
          </div>

          {/* FOOTER */}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems:
                "center",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                margin: 0,
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
                  handleClear
                }
              >
                Clear
              </SecondaryButton>

              <PrimaryButton
                onClick={
                  handleSave
                }
              >
                {editId
                  ? "Update"
                  : "Save"}
              </PrimaryButton>
            </div>
          </div>
        </MasterCard>

        {/* RIGHT TABLE */}

        <MasterCard title="Category Tree">
          <div
            style={{
              overflowX: "auto",
            }}
          >
            <table
              style={
                tableStyle
              }
            >
              <thead>
                <tr>
                  <th
                    style={
                      thStyle
                    }
                  >
                    Category Name
                  </th>

                  <th
                    style={{
                      ...thStyle,
                      textAlign:
                        "center",
                    }}
                  >
                    Status
                  </th>

                  <th
                    style={{
                      ...thStyle,
                      textAlign:
                        "center",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {tree.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      style={
                        emptyStyle
                      }
                    >
                      No categories added yet
                    </td>
                  </tr>
                ) : (
                  tree.map(
                    (node) => (
                      <TreeNode
                        key={
                          node.categoryId
                        }
                        node={
                          node
                        }
                        depth={0}
                        expandedIds={
                          expandedIds
                        }
                        toggleExpand={
                          toggleExpand
                        }
                        onEdit={
                          handleEdit
                        }
                        onDelete={
                          handleDelete
                        }
                      />
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

const expandBtnStyle = {
  border: "none",
  backgroundColor: "#fff3e8",
  color: T.accent,
  width: "22px",
  height: "22px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "700",
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