import React, { useState } from "react";
import "@/styles/formStyles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const InputWithVoice = ({ label, note, setNote }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");

  const handleSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false; // Stop recognition after a single phrase
    recognition.interimResults = true;
    recognition.lang = "en-US"; // Change to "mr-IN" for Marathi

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
    <div className="form-group ">
      <label
        htmlFor="note"
        className="form-label me-2"
      >
        {label}
      </label>

      <div className="d-flex align-items-center">
        <input
          type="text"
          value={note}
          name="note"
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type or speak your note here..."
          className="form-control me-2"
        />
        <button
          type="button"
          onClick={handleSpeechRecognition}
          disabled={isListening}
          className="btn "
        >
          {isListening ? (
            <span className="animate-pulse">🎤</span>
          ) : (
            <span>
              <FontAwesomeIcon
                icon={faMicrophone}
                className="me-2"
              />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
