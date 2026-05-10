import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../../src/redux/slices/users/userSlices";
import LoadingComponent from "../alert/LoadingComponent";
import Errormsg from "../alert/Errormsg";
import Successmsg from "../alert/Successmsg";
// Optional: You can import icons from lucide-react or heroicons if you have them installed
// import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    username: "",
  });

  // 1. Add state for visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Toggle function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginAction({ username: formData.username, password: formData.password })
    );
  };

  const { userAuth, loading, error, success } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate(`/users-private-profile/${userAuth?.userInfo?.Id}`);
    }
  }, [userAuth?.userInfo?.token, navigate, userAuth?.userInfo?.Id]);

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <img
                className="h-8 w-8 invert"
                src="https://cdn-icons-png.flaticon.com/512/1458/1458485.png"
                alt="Logo"
              />
            </div>
            <span className="text-3xl font-bold text-white tracking-tight">
              Bloggy<span className="text-indigo-400">Tech</span>
            </span>
          </Link>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 font-medium">
              Continue your developer journey.
            </p>
          </div>

          <div className="mb-6">
            {error && <Errormsg message={error.message} />}
            {success && (
              <Successmsg message="Login successful! Entering dashboard..." />
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2 ml-1">
                Username
              </label>
              <input
                className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500"
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-slate-300 text-sm font-semibold">
                  Password
                </label>
                <Link
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* 3. Wrap input in a relative container */}
              <div className="relative">
                <input
                  className="w-full px-4 py-3.5 bg-slate-800 border border-slate-700 text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder-slate-500"
                  // 4. Dynamic type attribute
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {/* 5. Toggle Button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2">
              {loading ? (
                <div className="flex justify-center">
                  <LoadingComponent />
                </div>
              ) : (
                <button
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-200"
                  type="submit"
                >
                  Login Account
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center text-slate-400 font-medium">
            Don't have an account?{" "}
            <Link
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors"
              to="/register"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
