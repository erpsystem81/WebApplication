import { useState, useEffect } from "react";

import MasterCard from "../../../components/common/MasterCard";
import PageTitle from "../../../components/common/PageTitle";
import FormRow from "../../../components/common/FormRow";
import FormField from "../../../components/common/FormField";
import TextInput from "../../../components/common/TextInput";
import SelectInput from "../../../components/common/SelectInput";
import Toast from "../../../components/common/Toast";
import CommonTable from "../../../components/common/CommonTable";

import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/common/ActionBtn";
import {
  getCountries,
  saveCountry,
  getStates,
  saveState,
  getCities,
  saveCity
} from "../../../services/RegionalSettingsService";

import T from "../../../components/common/MasterStyles";

/* ───────────────────────────────────────────── */

const TABS = ["Country", "State", "City"];

/* ───────────────────────────────────────────── */

export default function RegionalSettings() {
  const [activeTab, setActiveTab] =
    useState("Country");

  const [toast, setToast] = useState(null);

  /* COUNTRY */

  const [countries, setCountries] = useState([]);

  const [countryForm, setCountryForm] =
    useState({
      name: "",
      code: "",
    });

  /* STATE */

  const [states, setStates] = useState([]);

  const [stateForm, setStateForm] = useState({
    name: "",
    country: "",
  });

  /* CITY */

  const [cities, setCities] = useState([]);

  const [cityForm, setCityForm] = useState({
    name: "",
    state: "",
    country: "",
  });

  /* ERRORS */

  const [errors, setErrors] = useState({});

  /* ───────────────────────────────────────────── */

  const showToast = (type, message) => {
    setToast({
      type,
      message,
    });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const loadCountries = async () => {
    try {
      const data = await getCountries();

      setCountries(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);

      showToast(
        "error",
        "Failed to load countries."
      );
    }
  };

  const loadStates = async () => {
    try {
      const data = await getStates();

      console.log("State API:", data);

      setStates(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log(error);
      showToast("error", "Failed to load states.");
    }
  };

  const loadCities = async () => {
    try {
      const data = await getCities();

      console.log("Cities API Response:", data);

      setCities(Array.isArray(data) ? data : []);

    } catch (error) {
      console.log(error);

      showToast(
        "error",
        "Failed to load cities."
      );
    }
  };

  useEffect(() => {
    loadCountries();
    loadStates();
    loadCities();
  }, []);

  /* ───────────────────────────────────────────── */

  const handleCountrySave = async () => {
    const newErrors = {};

    if (!countryForm.name.trim()) {
      newErrors.name = "Country name is required";
    }

    if (!countryForm.code.trim()) {
      newErrors.code = "Country code is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;

    try {

      const payload = {
        countryName: countryForm.name,
        phoneCode: countryForm.code,
        status: 1,
        isInactive: 0
      };

      await saveCountry(payload);

      await loadCountries();

      setCountryForm({
        name: "",
        code: "",
      });

      setErrors({});

      showToast(
        "success",
        "Country added successfully."
      );

    } catch (error) {

      // console.error(error);

      showToast(
        "error",
        "Failed to save country."
      );
    }
  };

  /* ───────────────────────────────────────────── */

  const handleStateSave = async () => {

    const newErrors = {};

    if (!stateForm.name.trim()) {
      newErrors.stateName = "State name is required";
    }

    if (!stateForm.country) {
      newErrors.stateCountry = "Country is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;

    try {

      const payload = {
        stateName: stateForm.name,
        countryId: stateForm.country,
        status: 1,
        isInactive: 0,
      };

      await saveState(payload);

      await loadStates();

      setStateForm({
        name: "",
        country: "",
      });

      setErrors({});

      showToast(
        "success",
        "State added successfully."
      );

    } catch (error) {

      showToast(
        "error",
        "Failed to save state."
      );
    }
  };

  /* ───────────────────────────────────────────── */

  const handleCitySave = async () => {

    const newErrors = {};

    if (!cityForm.name.trim()) {
      newErrors.cityName = "City name is required";
    }

    if (!cityForm.country) {
      newErrors.cityCountry = "Country is required";
    }

    if (!cityForm.state) {
      newErrors.cityState = "State is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;

    try {

      const payload = {
        cityName: cityForm.name,
        stateId: cityForm.state,
        countryId: cityForm.country,
        status: 1,
        isInactive: 0,
      };

      await saveCity(payload);

      await loadCities();

      setCityForm({
        name: "",
        state: "",
        country: "",
      });

      setErrors({});

      showToast(
        "success",
        "City added successfully."
      );

    } catch (error) {

      showToast(
        "error",
        "Failed to save city."
      );
    }
  };

  /* ───────────────────────────────────────────── */

  return (
    <div
      style={{
        minHeight: "100%",
        backgroundColor: T.contentBg,
        padding: "",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <PageTitle
        title="Regional Settings"
        subtitle="Manage countries, states and cities"
      />

      <MasterCard title="Regional Settings">
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
          />
        )}

        {/* TABS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "24px",
            borderBottom: `1px solid ${T.border}`,
            paddingBottom: "14px",
          }}
        >
          {TABS.map((tab) => {
            const isActive =
              activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                style={{
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "0.2s",
                  backgroundColor: isActive
                    ? T.accent
                    : "#f3f4f6",
                  color: isActive
                    ? T.white
                    : T.menuText,
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* COUNTRY */}

        {activeTab === "Country" && (
          <>
            <FormRow>
              <FormField
                col={4}
                label="Country Name"
                required
                error={errors.name}
              >
                <TextInput
                  value={countryForm.name}
                  onChange={(e) =>
                    setCountryForm({
                      ...countryForm,
                      name: e.target.value,
                    })
                  }
                />
              </FormField>

              <FormField
                col={3}
                label="Country Code"
                required
                error={errors.code}
              >
                <TextInput
                  value={countryForm.code}
                  onChange={(e) =>
                    setCountryForm({
                      ...countryForm,
                      code: e.target.value,
                    })
                  }
                />
              </FormField>

              <div className="col-md-5 d-flex align-items-end gap-2">
                <PrimaryButton
                  onClick={handleCountrySave}
                >
                  Save
                </PrimaryButton>

                <SecondaryButton
                  onClick={() =>
                    setCountryForm({
                      name: "",
                      code: "",
                    })
                  }
                >
                  Clear
                </SecondaryButton>
              </div>
            </FormRow>

            <CommonTable
              columns={[
                {
                  key: "countryName",
                  label: "Country Name",
                },
                {
                  key: "phoneCode",
                  label: "Phone Code",
                },
              ]}
              data={countries}
            />
          </>
        )}

        {/* STATE */}

        {activeTab === "State" && (
          <>
            <FormRow>
              <FormField
                col={4}
                label="State Name"
                required
                error={errors.stateName}
              >
                <TextInput
                  value={stateForm.name}
                  onChange={(e) =>
                    setStateForm({
                      ...stateForm,
                      name: e.target.value,
                    })
                  }
                />
              </FormField>

              <FormField
                col={4}
                label="Country"
                required
                error={errors.stateCountry}
              >
                <SelectInput
                  value={stateForm.country}
                  onChange={(e) =>
                    setStateForm({
                      ...stateForm,
                      country: e.target.value,
                    })
                  }
                  options={countries.map((c) => ({
                    label: c.countryName,
                    value: c.countryId,
                  }))}
                  placeholder="Select Country"
                />
              </FormField>

              <div className="col-md-4 d-flex align-items-end gap-2">
                <PrimaryButton
                  onClick={handleStateSave}
                >
                  Save
                </PrimaryButton>

                <SecondaryButton
                  onClick={() =>
                    setStateForm({
                      name: "",
                      country: "",
                    })
                  }
                >
                  Clear
                </SecondaryButton>
              </div>
            </FormRow>

            <CommonTable
              columns={[
                {
                  key: "stateName",
                  label: "State Name",
                },
                {
                  key: "countryName",
                  label: "Country",
                },
              ]}
              data={states}
            />
          </>
        )}

        {/* CITY */}

        {activeTab === "City" && (
          <>
            <FormRow>
              <FormField
                col={3}
                label="City Name"
                required
                error={errors.cityName}
              >
                <TextInput
                  value={cityForm.name}
                  onChange={(e) =>
                    setCityForm({
                      ...cityForm,
                      name: e.target.value,
                    })
                  }
                />
              </FormField>

              <FormField
                col={3}
                label="Country"
                required
                error={errors.cityCountry}
              >
                <SelectInput
                  value={cityForm.country}
                  onChange={(e) =>
                    setCityForm({
                      ...cityForm,
                      country: e.target.value,
                    })
                  }
                  options={countries.map((c) => ({
                    label: c.countryName,
                    value: c.countryId,
                  }))}
                  placeholder="Select Country"
                />
              </FormField>

              <FormField
                col={3}
                label="State"
                required
                error={errors.cityState}
              >
                <SelectInput
                  value={cityForm.state}
                  onChange={(e) =>
                    setCityForm({
                      ...cityForm,
                      state: e.target.value,
                    })
                  }
                  options={states.map((s) => ({
                    label: s.stateName,
                    value: s.stateId,
                  }))}
                  placeholder="Select State"
                />
              </FormField>

              <div className="col-md-3 d-flex align-items-end gap-2">
                <PrimaryButton
                  onClick={handleCitySave}
                >
                  Save
                </PrimaryButton>

                <SecondaryButton
                  onClick={() => {
                    setCityForm({
                      name: "",
                      state: "",
                      country: "",
                    });

                    setErrors({});
                  }}
                >
                  Clear
                </SecondaryButton>
              </div>
            </FormRow>

            <CommonTable
              columns={[
                {
                  key: "cityName",
                  label: "City Name",
                },
                {
                  key: "stateName",
                  label: "State",
                },
                {
                  key: "countryName",
                  label: "Country",
                },
              ]}
              data={cities}
            />
          </>
        )}

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
        </div>
      </MasterCard>
    </div>
  );
}