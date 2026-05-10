import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../../redux/slices/users/userSlices";
import Errormsg from "../alert/Errormsg";
import Successmsg from "../alert/Successmsg";
import LoadingComponent from "../alert/LoadingComponent";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Using react-icons for the toggle

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // New Field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    // Basic Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    dispatch(
      registerAction({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
    );
    // Don't clear confirmPassword if you want the user to see the error,
    // but here we clear on success/attempt as per your original logic
    setFormData({ email: "", password: "", username: "", confirmPassword: "" });
  };

  const { user, error, success, loading } = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.status === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [user?.status, navigate]);

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={handlerSubmit}
        className="flex flex-col p-8 md:p-12 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl transition-all duration-300 hover:border-indigo-500/30"
      >
        {/* Form Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl text-white font-bold tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-400 mt-1 font-medium">
              Join 10,000+ developers sharing logic.
            </p>
          </div>
        </div>

        {/* Status Alerts */}
        <div className="mb-6">
          {error && <Errormsg message={error.message} />}
          {success && (
            <Successmsg message="Registration successful! Redirecting to login..." />
          )}
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-slate-300 text-sm font-semibold ml-1">
              Username
            </label>
            <input
              className="py-3.5 px-4 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all"
              type="text"
              placeholder="dev_pioneer"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 text-slate-300 text-sm font-semibold ml-1">
              Email Address
            </label>
            <input
              className="py-3.5 px-4 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all"
              placeholder="hello@bloggytech.io"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="mb-2 text-slate-300 text-sm font-semibold ml-1">
              Secure Password
            </label>
            <div className="relative">
              <input
                className="w-full py-3.5 px-4 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="mb-2 text-slate-300 text-sm font-semibold ml-1">
              Confirm Password
            </label>
            <input
              className={`py-3.5 px-4 bg-slate-800/50 border ${
                formData.confirmPassword &&
                formData.password !== formData.confirmPassword
                  ? "border-red-500"
                  : "border-slate-700"
              } text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl transition-all`}
              type={showPassword ? "text" : "password"} // Syncs with the toggle above
              placeholder="••••••••"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <span className="text-red-500 text-xs mt-1 ml-1">
                  Passwords do not match
                </span>
              )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center">
              <LoadingComponent />
            </div>
          ) : (
            <button
              className="w-full py-4 text-white font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.99]"
              type="submit"
            >
              Get Started Now
            </button>
          )}
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-slate-400 font-medium">
          Already have an account?{" "}
          <Link
            className="text-indigo-400 font-semibold hover:text-indigo-300 underline underline-offset-4"
            to="/login"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
