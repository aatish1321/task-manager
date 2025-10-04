import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)

        //Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error){
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-dark-text mb-2">Welcome Back</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Please enter your details to log in to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            required
            error={error && error.includes('email') ? error : null}
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
            error={error && error.includes('password') ? error : null}
          />

          {error && !error.includes('email') && !error.includes('password') && (
            <div className="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-700 rounded-xl">
              <p className="text-sm text-error-600 dark:text-error-400 text-center">{error}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <input type="checkbox" className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
              Remember me
            </label>
            <button type="button" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Sign In
          </button>

          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Don't have an account?{" "}
              <Link 
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200" 
                to="/signUp"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
