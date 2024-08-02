import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DocValidation } from "@/utilities/formValidation";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "../common/customDatePicker";
import commonStyle from "@/styles/common/common.module.scss";
import { vehicleNoListArr } from "@/utilities/dummyData";
import CustomSearch from "../common/customSearch";

export default function AddDocumentForm({
  setReminderModal,
  addReminderData,
  reminderData,
  isEdit,
  setIsEdit,
  updateReminderData,
}) {
  const defaultData = {
    masterNo: "",
    vehicleNo: "",
    expiryDate: "",
    alertDate: "",
  };
  const [formData, setFormData] = useState(isEdit ? reminderData : defaultData);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors: clearErrors,
    trigger,
    setValue,
  } = useForm();

  const validation = {
    masterNo: register("masterNo", DocValidation.masterNo),
    vehicleNo: register("vehicleNo", DocValidation.vehicleNo),
    expiryDate: register("expiryDate", DocValidation.expiryDate),
    // alertDate: register("alertDate", DocValidation.alertDate),
  };

  const updateSelectedForm = (type, value) => {
    const temp = { ...formData };
    temp[type] = value;
    setFormData(temp);
  };

  const onClickSubmit = () => {
    addReminderData(formData);
    console.log("formData", formData);
    setReminderModal(false);
    setIsEdit(false);

    setFormData(defaultData);
  };

  const handleExpiryDateChange = (date) => {
    clearErrors("expiryDate");
    trigger("expiryDate");
    updateSelectedForm("expiryDate", date);
    setValue("expiryDate", date);
  };

  const handleAlertDateChange = (date) => {
    updateSelectedForm("alertDate", date);
    trigger("alertDate");
    setValue("alertDate", date);
  };

  return (
    <form onSubmit={handleSubmit(onClickSubmit)}>
      <div className="mb-3">
        <label
          htmlFor="masterNo"
          className="form-label"
        >
          Master Number
        </label>
        <input
          {...validation.masterNo}
          type="text"
          placeholder="Enter master number"
          className="form-control"
          id="masterNo"
          name="masterNo"
          value={formData.masterNo}
          onChange={(e) => updateSelectedForm("masterNo", e.target.value)}
        />
        <span
          className="text-danger"
          aria-hidden="true"
        >
          {errors?.masterNo && errors.masterNo.message}
        </span>
      </div>

      <div className="mb-3">
        <label
          htmlFor="vehicleNo"
          className="form-label"
        >
          vehicleNo
        </label>
        <Controller
          control={control}
          // rules={validation.vehicleNo}
          name="vehicleNo"
          render={({ field }) => (
            <CustomSearch
              {...validation.vehicleNo}
              name="vehicleNo"
              selectedValue={formData["vehicleNo"]}
              options={vehicleNoListArr}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("vehicleNo");
                updateSelectedForm("vehicleNo", e);
              }}
              className="pdp_contact_lens_power"
              placeholder="Please Select vehicle No"
              isSearchable={true}
            />
          )}
        />
        <span
          className={commonStyle["errorMsg"]}
          aria-hidden="true"
        >
          {errors?.vehicleNo && errors.vehicleNo.message}
        </span>
      </div>

      <div className="mb-3">
        <label
          htmlFor="date"
          className="form-label"
        >
          Select Expiry Date
        </label>
        <Controller
          name="expiryDate"
          control={control}
          // rules={{ required: "Expiry date is required" }}
          render={({ field }) => (
            <CustomDatePicker
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("expiryDate");
                handleExpiryDateChange();
              }}
            />
          )}
        />
        {/* <CustomDatePicker onChange={handleExpiryDateChange} /> */}
        <span
          className={commonStyle["errorMsg"]}
          aria-hidden="true"
        >
          {errors?.expiryDate && errors.expiryDate.message}
        </span>
      </div>

      {/* <div className="mb-3">
        <label
          htmlFor="date"
          className="form-label"
        >
          Select Expiry Date
        </label>
        <CustomDatePicker onChange={handleAlertDateChange} />
        <span
          className={commonStyle["errorMsg"]}
          aria-hidden="true"
        >
          {errors?.alertDate && errors.alertDate.message}
        </span>
      </div> */}

      {!isEdit ? (
        <button
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-warning"
        >
          Update
        </button>
      )}
    </form>
  );
}
