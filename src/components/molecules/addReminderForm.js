import { reminderValidation } from "@/utilities/formValidation";
import commonStyle from "@/styles/common/common.module.scss";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomSearch from "../common/customSearch";
import CustomDatePicker from "../common/customDatePicker";
import moment from "moment";

const AddReminderForm = ({}) => {
  const onSubmit = (data) => {
    addReminder(data);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors: clearErrors,
  } = useForm();

  const validation = {
    title: register("title", reminderValidation.title),
    description: register("description", reminderValidation.description),
    date: register("date", reminderValidation.date),
    priority: register("priority", reminderValidation.priority),
    // gender: register("gender", reminderValidation.gender),
  };
  const defaultData = {
    title: "",
    description: "",
    date: "",
    priority: "",
  };
  const [formData, setFormData] = useState(defaultData);

  const updateSelectedForm = (type, value) => {
    const temp = { ...formData };
    temp[type] = value;
    setFormData(temp);
  };

  const submitform = () => {
    console.log("New Reminder:", formData);
    setFormData(defaultData);
  };

  const priorityListArr = [
    {
      label: "Low",
      value: "low",
    },
    {
      label: "Medium",
      value: "medium",
    },
    {
      label: "High",
      value: "high",
    },
  ];

  const handleDateChange = (date) => {
    updateSelectedForm("date", date);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit(submitform)}>
            <div className="mb-3">
              <label
                htmlFor="title"
                className="form-label"
              >
                Title
              </label>
              <input
                {...validation.title}
                type="text"
                placeholder="Enter title"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={(e) => updateSelectedForm("title", e.target.value)}
                required
              />

              <span
                className={commonStyle["errorMsg"]}
                aria-hidden="true"
              >
                {errors?.title && errors.title.message}
              </span>
            </div>
            <div className="mb-3">
              <label
                htmlFor="description"
                className="form-label"
              >
                Description
              </label>
              <textarea
                {...validation.description}
                className="form-control"
                id="description"
                name="description"
                placeholder="Enter description"
                rows="2"
                value={formData.description}
                onChange={(e) =>
                  updateSelectedForm("description", e.target.value)
                }
                required
              ></textarea>
              <span
                className={commonStyle["errorMsg"]}
                aria-hidden="true"
              >
                {errors?.description && errors.description.message}
              </span>
            </div>
            <div className="mb-3">
              <CustomDatePicker onChange={handleDateChange} />
              <span
                className={commonStyle["errorMsg"]}
                aria-hidden="true"
              >
                {errors?.date && errors.date.message}
              </span>
            </div>
            <div className="mb-3">
              <label
                htmlFor="priority"
                className="form-label"
              >
                Priority
              </label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <CustomSearch
                    {...validation.priority}
                    name="priority"
                    selectedValue={formData["priority"]}
                    options={priorityListArr}
                    onChange={(e) => {
                      field.onChange(e);
                      clearErrors("priority");
                      updateSelectedForm("priority", e);
                    }}
                    className="pdp_contact_lens_power"
                    placeholder="Please Select"
                    isSearchable={true}
                  />
                )}
              />
              <span
                className={commonStyle["errorMsg"]}
                aria-hidden="true"
              >
                {errors?.priority && errors.priority.message}
              </span>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Reminder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReminderForm;
