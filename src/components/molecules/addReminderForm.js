import { reminderValidation } from "@/utilities/formValidation";
import commonStyle from "@/styles/common/common.module.scss";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  } = useForm();

  const validation = {
    title: register("title", reminderValidation.title),
    description: register("description", reminderValidation.description),
    date: register("date", reminderValidation.date),
    priority: register("priority", reminderValidation.priority),
    // gender: register("gender", reminderValidation.gender),
  };
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitform = (e) => {
    e.preventDefault();
    console.log("New Reminder:", formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      priority: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-light">
          <h2 className="h5 mb-0">Add New Reminder</h2>
        </div>
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
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
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
              <label
                htmlFor="date"
                className="form-label"
              >
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
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
              <select
                className="form-control"
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
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
