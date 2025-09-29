import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

const Register = ({ setToggle }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Registration data:', data);
    alert('Registration successful!');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        
        {/* Main Registration Form */}
        <div className="bg-black border border-gray-700 rounded-lg p-10 mb-4">
          {/* Instagram Logo */}
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-thin tracking-wider italic font-[] mb-4">Instagram</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sign up to see photos and videos<br />
              from your friends.
            </p>
          </div>

          {/* Facebook Login Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Log in with Facebook
          </button>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-black text-gray-400 font-medium">OR</span>
            </div>
          </div>

          {/* Registration Form */}
          <div className="space-y-3">
            {/* Mobile/Email Field */}
            <div>
              <input
                {...register('email', {
                  required: 'Mobile number or email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="text"
                placeholder="Mobile number or email address"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition-all"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Full Name Field */}
            <div>
              <input
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Full name must be at least 2 characters'
                  }
                })}
                type="text"
                placeholder="Full Name"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition-all"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <input
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._]+$/,
                    message: 'Username can only contain letters, numbers, dots and underscores'
                  }
                })}
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gray-500 focus:bg-gray-800 transition-all"
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>
              )}
            </div>

            {/* Terms text */}
            <div className="mt-4 mb-4">
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                People who use our service may have uploaded<br />
                your contact information to Instagram.{' '}
                <a href="#" className="text-blue-400 hover:underline">Learn more</a>
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-500 text-xs text-center leading-relaxed">
                By signing up, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:underline">Terms</a>,{' '}
                <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:underline">Cookies Policy</a>.
              </p>
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing up...
                </div>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="bg-black border border-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-300 text-sm">
            Have an account?{' '}
            <button
              onClick={() => setToggle((prev) => !prev)}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Get App Section */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm mb-4">Get the app.</p>
          <div className="flex justify-center space-x-3">
            <img 
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" 
              alt="Download on the App Store"
              className="h-10 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            />
            <img 
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" 
              alt="Get it on Google Play"
              className="h-10 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-600 mb-4">
            <a href="#" className="hover:underline">Meta</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">API</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Top Accounts</a>
            <a href="#" className="hover:underline">Locations</a>
            <a href="#" className="hover:underline">Instagram Lite</a>
          </div>
          <div className="flex justify-center items-center gap-4 text-xs text-gray-600">
            <select className="bg-black border-none text-gray-600 text-xs cursor-pointer focus:outline-none">
              <option>English</option>
              <option>हिन्दी</option>
              <option>العربية</option>
            </select>
            <span>© 2024 Instagram from Meta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;