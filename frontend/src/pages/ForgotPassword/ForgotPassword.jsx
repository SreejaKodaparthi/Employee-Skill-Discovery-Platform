import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: email.trim(),
        }
      );

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-icon">
          🔐
        </div>

        <h1>Forgot your password?</h1>

        <p className="forgot-description">
          No worries! Enter the email address associated with your
          account and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Registered Email Address</label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <Link to="/login" className="back-login">
          ← Back to Login
        </Link>

      </div>

    </div>
  );
}

export default ForgotPassword;