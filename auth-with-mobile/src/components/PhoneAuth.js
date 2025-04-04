import React, { useState } from "react";
import { auth } from "../firebase-config"; // Import Firebase auth instance
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response) => {
          console.log("Recaptcha verified");
        },
        "expired-callback": () => {
          setMessage("Recaptcha expired. Please try again.");
        },
      });
    }
  };

  const sendOtp = async () => {
    if (!phone.startsWith("+")) {
      setMessage("Please enter phone number with country code (e.g., +91xxxxxxxxxx)");
      return;
    }

    setupRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setMessage("OTP sent! Check your phone.");
    } catch (error) {
      setMessage(`Error sending OTP: ${error.message}`);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setMessage("Enter the OTP sent to your phone.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      setMessage("Phone authentication successful! 🎉");
    } catch (error) {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Phone Authentication</h2>
      <div>
        <input
          type="tel"
          placeholder="Enter phone number (e.g., +91xxxxxxxxxx)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={sendOtp}>Send OTP</button>
      </div>

      {confirmationResult && (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}

      <div id="recaptcha-container"></div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default PhoneAuth;
