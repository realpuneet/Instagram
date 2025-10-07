import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUserApi } from "../../features/actions/AuthActions";


const Login = ({ setToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      let res = await dispatch(loginUserApi(data));
    if (res) {
      navigate("/home");
    }
    console.log("logged in", res);
    
    } catch (error) {
     console.log(error);
      
    }

  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="flex items-center justify-center max-w-6xl w-full gap-16">
        {/* Left side - Phone mockup with Instagram content */}
        <div className="hidden lg:block relative">
          <div className="relative w-80 h-96 bg-gray-900 rounded-3xl border-4 border-gray-700 overflow-hidden shadow-2xl">
            {/* Phone screen content */}
            <div className="relative w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
              {/* Instagram Stories/Posts mockup */}
              <div className="absolute inset-4 space-y-4">
                {/* Story 1 */}
                <div className="bg-gray-800 rounded-2xl p-3 relative overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-32 rounded-xl relative">
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full"></div>
                    <div className="absolute bottom-2 right-2 text-white text-xs">
                      @user1
                    </div>
                  </div>
                </div>

                {/* Story 2 */}
                <div className="bg-gray-800 rounded-2xl p-3 relative overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-24 rounded-xl relative">
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating reaction icons */}
              <div className="absolute top-8 right-6">
                <div className="bg-white rounded-full p-2 shadow-lg mb-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-20 left-8">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </div>

              <div className="absolute bottom-16 right-4">
                <div className="bg-green-500 rounded-full p-2 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Bottom icons */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                <div className="w-5 h-5 border-2 border-white rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full max-w-sm">
          {/* Instagram Logo */}
          <div className="text-center mb-5 mt-15">
            <h1 className="text-white text-5xl font-thin tracking-wider italic">
              Instagram
            </h1>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            {/* Email/Username Field */}
            <div>
              <input
                {...register("emailOrUsername", {
                  required: "Phone number, username, or email is required",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters",
                  },
                })}
                type="text"
                placeholder="Phone number, username or email address"
                className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition-all"
              />
              {errors.emailOrUsername && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.emailOrUsername.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-4 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Log in"
              )}
            </button>

            {/* OR Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-400 font-medium">
                  OR
                </span>
              </div>
            </div>

            {/* Facebook Login */}
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Log in with Facebook
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-2">
              <button
                type="button"
                className="text-gray-300 hover:text-white text-sm transition-colors"
              >
                Forgotten your password?
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mb-12 pt-8 border-t border-gray-800">
              <p className="text-gray-300">
                Don't have an account?{" "}
                <button
                  onClick={() => setToggle((prev) => !prev)}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Get App Section */}
          {/* <div className="text-center mt-12">
            <p className="text-gray-400 text-sm mb-6">Get the app.</p>
            <div className="flex justify-center space-x-4">
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" 
                alt="Download on the App Store"
                className="h-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              />
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" 
                alt="Get it on Google Play"
                className="h-12 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
