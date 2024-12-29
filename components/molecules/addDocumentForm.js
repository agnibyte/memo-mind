import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DocValidation } from "@/utilities/formValidation";
import { Controller, useForm } from "react-hook-form";
import CustomDatePicker from "../common/customDatePicker";
import commonStyle from "@/styles/common/common.module.scss";
import { DOCUMENTS_TYPE_LIST, vehicleNoListArr } from "@/utilities/dummyData";
import CustomSearch from "../common/customSearch";
import moment from "moment";
import "../../styles/formStyles.module.scss";

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
    documentType: "",
    expiryDate: moment(),
    alertDate: "",
  };

  const [formData, setFormData] = useState(isEdit ? reminderData : defaultData);
  const [expiryDateError, setExpiryDateError] = useState("");
  const [expiryDate, setExpiryDate] = useState(
    isEdit ? reminderData.expiryDate : defaultData.expiryDate
  );

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
    documentType: register("documentType", DocValidation.documentType),
    // expiryDate: register("expiryDate", DocValidation.expiryDate),
    // alertDate: register("alertDate", DocValidation.alertDate),
  };

  const updateSelectedForm = (type, value) => {
    const temp = { ...formData };
    temp[type] = value;
    setFormData(temp);
  };

  // const onChangeExpiryDate = (e) => {
  //   // clearErrors("expiryDate");
  //   // handleExpiryDateChange();
  //   console.log({ e });
  //   updateSelectedForm("expiryDate", e);
  //   if (e == null) {
  //     setExpiryDateError("Please enter the expiry date");
  //   } else {
  //     setExpiryDateError("");
  //   }
  // };
  const onChangeExpiryDate = (date) => {
    if (date == null) {
      setExpiryDateError("Please enter the expiry date");
    } else {
      setExpiryDateError("");
      setExpiryDate(moment(date).toISOString()); // Save the updated date in ISO format
    }
  };

  const onClickSubmit = () => {
    if (formData.expiryDate == null) {
      setExpiryDateError("Please enter the expiry date");
      return;
    }
    addReminderData(formData);
    setReminderModal(false);
    setIsEdit(false);

    setFormData(defaultData);
  };

  useEffect(() => {
    if (isEdit) {
      setValue("vehicleNo", reminderData.vehicleNo);
      setValue("documentType", reminderData.documentType);
      setFormData((prev) => ({
        ...prev,
        expiryDate: "2024-10-14T16:32:34.000Z",
      }));
      // setValue("expiryDate", moment(reminderData.expiryDate));
    }
  }, [isEdit, setValue]);

  const onClickEdit = () => {
    updateReminderData(formData);
    setReminderModal(false);
    setIsEdit(false);
    setFormData(defaultData);
  };

  return (
    <form
      onSubmit={handleSubmit(onClickSubmit)}
      className="form-container"
    >
      <div className="form-group">
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
          className={`form-control ${errors?.masterNo ? "is-invalid" : ""}`}
          id="masterNo"
          name="masterNo"
          value={formData.masterNo}
          onChange={(e) => updateSelectedForm("masterNo", e.target.value)}
        />
        {errors?.masterNo && (
          <div className="invalid-feedback">{errors.masterNo.message}</div>
        )}
      </div>

      <div className="form-group  mt-3">
        <label
          htmlFor="vehicleNo"
          className="form-label"
        >
          Vehicle Number
        </label>
        <Controller
          control={control}
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
              className="form-control"
              placeholder="Please Select Vehicle Number"
              isSearchable={true}
            />
          )}
        />
        {errors?.vehicleNo && (
          <div className="text-danger">{errors.vehicleNo.message}</div>
        )}
      </div>

      <div className="form-group  mt-3">
        <label
          htmlFor="documentType"
          className="form-label"
        >
          Document Type
        </label>
        <Controller
          control={control}
          name="documentType"
          render={({ field }) => (
            <CustomSearch
              {...validation.documentType}
              name="documentType"
              selectedValue={formData["documentType"]}
              options={DOCUMENTS_TYPE_LIST}
              onChange={(e) => {
                field.onChange(e);
                clearErrors("documentType");
                updateSelectedForm("documentType", e);
              }}
              className="form-control"
              placeholder="Please Select Document Type"
              isSearchable={true}
            />
          )}
        />
        {errors?.documentType && (
          <div className="text-danger">{errors.documentType.message}</div>
        )}
      </div>

      <div className="form-group  mt-3">
        <label
          htmlFor="date"
          className="form-label"
        >
          Select Expiry Date
        </label>
        <CustomDatePicker
          value={expiryDate ? moment(expiryDate) : null}
          onChange={onChangeExpiryDate}
          className="form-control"
        />
        {expiryDateError && (
          <div className="text-danger">{expiryDateError}</div>
        )}
      </div>

      <div className="form-actions mt-3">
        {!isEdit ? (
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-warning"
            onClick={onClickEdit}
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
}
