import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPasswordPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/auth/send-otp", { phone });
      alert("OTP sent to your phone");
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
        phone,
        otp,
        newPassword,
      });
      alert("Password reset successful");
      navigate("/"); // navigate to login page
    } catch (error) {
      alert(error.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans px-4">
      <div className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 p-8 w-full max-w-sm">

        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700 tracking-wider">
          Reset Password
        </h2>

        {/* Enter Phone */}
        {!otpSent && (
          <>
            <label className="block text-gray-600 text-sm mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button
              onClick={handleSendOtp}
              className="w-full py-2 rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
            >
              Send OTP
            </button>
          </>
        )}

        {/* Enter OTP + New Password */}
        {otpSent && (
          <>
            <label className="block text-gray-600 text-sm mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />

            <label className="block text-gray-600 text-sm mb-1">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />

            <button
              onClick={handleResetPassword}
              className="w-full py-2 rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
            >
              Reset Password
            </button>
          </>
        )}

      </div>
    </div>
  );
}