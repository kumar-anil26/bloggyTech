import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../redux/slices/users/userSlices";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import Errormsg from "../alert/Errormsg";
import Successmsg from "../alert/Successmsg";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  // Store data
  const { error, success, loading } = useSelector((state) => state.users);

  const [email, setEmail] = useState("");

  const handlerChange = (e) => {
    setEmail(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return alert("Email is required");
    }
    console.log('email is send ',email);
    dispatch(forgotPasswordAction({ email }));
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
        {/* Header Decor */}
        <div className="h-2 bg-indigo-600 w-full" />

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl mb-4">
              <FiMail size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Forgot Password?
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              Don't worry, it happens. Enter your email and we'll send you a
              reset link.
            </p>
          </div>

          {/* Feedback Messages */}
          <div className="mb-6 space-y-2">
            {error && <Errormsg message={error.message} />}
            {success && (
              <Successmsg message="Check your inbox! We've sent a link to your registered email." />
            )}
          </div>

          <form className="space-y-5" onSubmit={handlerSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="name@example.com"
                  className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-gray-900 placeholder:text-gray-400"
                  onChange={handlerChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl text-white font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <FiArrowLeft /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
