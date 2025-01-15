import React, { useState } from "react";
import "@/styles/formStyles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
// import styles from "./inputWithVoice.module.scss";
import styles from "@/styles/formStyles.module.scss";

export const InputWithVoice = ({ label, note, setNote }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  const handleSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        }
      }
      setNote(transcript);
    };

    recognition.onerror = (event) => {
      setError("Error occurred in recognition: " + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className={styles.formGroup}>
      <label
        htmlFor="note"
        className={styles.label}
      >
        {label}
      </label>

      <div className={`${styles.inputGroup} d-flex align-items-center`}>
        <input
          type="text"
          value={note}
          name="note"
          onChange={(e) => setNote(e.target.value)}
          placeholder={
            isListening ? "Listening..." : "Type or speak your note here..."
          }
          className={`${styles.input} form-control`}
        />
        <Tooltip
          title={isListening ? "Listening..." : "Start voice input"}
          arrow
        >
          <button
            type="button"
            onClick={handleSpeechRecognition}
            disabled={isListening}
            className={`${styles.voiceButton} btn`}
            
          >
            <span
              className={styles.svgIcon}
              style={{ display: "inline-flex" }}
            >
              <svg
                fill="#000000"
                width="20px"
                height="20px"
                viewBox="-3.5 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m8.4 16.8c2.65-.003 4.797-2.15 4.8-4.8v-7.2c0-2.651-2.149-4.8-4.8-4.8s-4.8 2.149-4.8 4.8v7.2c.003 2.65 2.15 4.797 4.8 4.8z" />
                <path d="m16.8 12v-2.4c0-.663-.537-1.2-1.2-1.2s-1.2.537-1.2 1.2v2.4c0 3.314-2.686 6-6 6s-6-2.686-6-6v-2.4c0-.663-.537-1.2-1.2-1.2s-1.2.537-1.2 1.2v2.4c.007 4.211 3.11 7.695 7.154 8.298l.046.006v1.296h-3.6c-.663 0-1.2.537-1.2 1.2s.537 1.2 1.2 1.2h9.6c.663 0 1.2-.537 1.2-1.2s-.537-1.2-1.2-1.2h-3.6v-1.296c4.09-.609 7.193-4.093 7.2-8.303z" />
              </svg>
            </span>
          </button>
        </Tooltip>
      </div>

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};
