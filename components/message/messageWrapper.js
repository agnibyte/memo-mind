import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@/styles/messageStyle.module.css";

export default function MessageWrapper() {
  const contacts = [
    { id: "01", contactNo: "148368765873", name: "John Doe" },
    { id: "02", contactNo: "248368765873", name: "Jane Doe" },
    { id: "03", contactNo: "348368765873", name: "Rick Roe" },
  ];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);

  const onSubmit = async (data) => {
    if (!data.contacts || data.contacts.length === 0) {
    //   errors.contacts = {
    //     type: "required",
    //     message: "Please select at least one contact.",
    //   };
      console.log('errors', errors)

      return;
    }

    setLoading(true);

    // Simulated API call
    setTimeout(() => {
      console.log("Submitted Data:", data);
      setFormData(data);
      setLoading(false);
      alert("Message sent successfully!");
    }, 1500);
  };

  console.log("errors", errors);
  return (
    <form
      className={styles.container}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Left side: message & previous messages */}
      <div className={styles.messageSection}>
        <div className={styles.messageWrapper}>
          <h3 className={styles.heading}>Message</h3>
          <textarea
            {...register("message", { required: true })}
            className={styles.textArea}
            placeholder="Type a message..."
          />
          {errors.message && (
            <span style={{ color: "red", fontSize: "0.9rem" }}>
              Message is required.
            </span>
          )}
          <button
            className={styles.sendButton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

        <div className={styles.prevMessages}>
          <h4 className={styles.subHeading}>Prev messages</h4>
          <div className={styles.prevBubble} />
          <div className={styles.prevBubble} />
        </div>
      </div>

      {/* Right side: contacts */}
      <div className={styles.contactSection}>
        <button
          type="button"
          className={styles.importButton}
        >
          Import
        </button>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${styles.active}`}
          >
            Contacts
          </button>
          <button
            type="button"
            className={styles.tab}
          >
            Groups
          </button>
        </div>

        <div className={styles.contactList}>
          {contacts.map((contact, i) => (
            <label
              key={contact.id}
              className={styles.contactItem}
            >
              <input
                type="checkbox"
                value={contact.contactNo}
                {...register("contacts")}
              />
              {contact.name}
            </label>
          ))}
        </div>
      </div>
    </form>
  );
}
