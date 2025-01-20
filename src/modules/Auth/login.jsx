import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApiMutation from "../../api/hooks/useApiMutation";
import { useDispatch } from "react-redux";
import { setKuduUser } from "../../reducers/userSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useApiMutation();

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate({
      url: "/auth/login",
      method: "POST",
      data: data,
      onSuccess: (response) => {
        delete response.data.data.password;
        localStorage.setItem("kuduUserToken", response.data.data.token);
        dispatch(setKuduUser(response.data.data))
        navigate("/");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{
        backgroundImage: `
  url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736942330/Sign_Up_1_og6gq5.jpg
`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      {/* Logo Section */}
      <div className="my-6">
        <img
          src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/kudu1_rarauu.png"
          alt="Kudu Logo"
          className="h-12"
        />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-lg px-6 py-6 bg-white/20 backdrop-blur-lg rounded-lg">
        <div className="w-full max-w-lg px-8 py-10 bg-white rounded-lg ">
          <h2 className="text-2xl font-bold mb-6 text-black-800">Sign In</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <div>
              <label
                className="block text-md font-semibold mb-3"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Your email address"
                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                style={{ outline: "none" }}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-md font-semibold mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                  style={{ outline: "none" }}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                      alt="Hide Password"
                      className="w-5"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                      alt="Show Password"
                      className="w-5"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-between items-center text-sm mb-4">
              <a className="text-orange-500 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-kuduOrange disabled:bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Sign In →
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 leading-loose">
              Don’t have an account? <br />
              <Link
                to={"/sign-up"}
                className="text-orange-500 font-semibold hover:underline leading-loose"
              >
                Sign Up →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
