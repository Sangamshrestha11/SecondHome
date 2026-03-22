import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/send-otp", { email });
      alert("OTP sent to your email");
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) {
      alert("Please enter OTP and new password");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      alert("Password reset successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(15,23,42)] font-sans px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Reset Password
        </h2>

        {!otpSent && (
          <>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />

            <button
              onClick={handleSendOtp}
              className="w-full py-2 text-white bg-blue-600 rounded-md"
            >
              Send OTP
            </button>
          </>
        )}

        {otpSent && (
          <>
            <label>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />

            <label>New Password</label>
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded-md"
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-2 text-white bg-blue-600 rounded-md"
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}