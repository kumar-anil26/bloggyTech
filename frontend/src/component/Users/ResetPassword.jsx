import React, { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordAction } from "../../redux/slices/users/userSlices";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import Swal from "sweetalert2";
import Errormsg from "../alert/Errormsg";
import Successmsg from "../alert/Successmsg";
import { resetSuccessAction } from "../../redux/slices/globalSlices/GlobalSlice";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  // Get state from Redux
  const { error, success, loading } = useSelector((state) => state?.users);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // 1. Handle Redirect & Success Notification
  
  const handlerChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handlerSubmit = async (e) => {
   e.preventDefault();

   if (formData.password !== formData.confirmPassword) {
     return Swal.fire({ icon: "error", title: "Passwords do not match!" });
   }

   try {
     // We "unwrap" the thunk to handle the result locally
     await dispatch(
       resetPasswordAction({
         password: formData.password,
         resetToken,
       })
     ).unwrap();

     // If we reach here, it was successful
     Swal.fire({
       icon: "success",
       title: "Success!",
       text: "Redirecting...",
       timer: 2000,
       showConfirmButton: false,
     });

     setTimeout(() => {
       dispatch(resetSuccessAction());
       navigate("/login");
     }, 2000);
   } catch (err) {
     // Error is handled by your global state or caught here
     console.error("Failed to reset:", err);
   }
 };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gray-50/50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden">
        {/* Visual Accent */}
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 w-full" />

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4">
              <FiLock size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Set New Password
            </h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">
              Almost there! Choose a strong password to secure your account.
            </p>
          </div>

          {/* Feedback Section */}
          <div className="mb-6 space-y-2">
            {error && <Errormsg message={error?.message || error} />}
            {success && (
              <Successmsg message="Password reset successful! Redirecting to login..." />
            )}
          </div>

          <form onSubmit={handlerSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handlerChange}
                  className="block w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FiCheckCircle />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handlerChange}
                  className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-xs text-red-500 font-medium">
                    Passwords do not match yet.
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                loading || success
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-100"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
