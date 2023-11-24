import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from 'actions';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    username: "",
    password: "",
    fullname: "",
    email: "",
    phone: ""
  });

  const handleChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Basic validation for required fields
    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (form.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.trim().length < 8 || form.password.trim().length > 12) {
      newErrors.password = "Password must be between 8 and 12 characters";
      valid = false;
    }

    if (!form.fullname.trim()) {
      newErrors.fullname = "Full name is required";
      valid = false;
    } else if (form.fullname.trim().length < 5) {
      newErrors.fullname = "Full name must be at least 5 characters";
      valid = false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.trim() && !emailRegex.test(form.email.trim())) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Phone number validation
    // Phone number validation
    const phoneRegex = /^\d+$/;
    if (form.phone.trim()) {
      if (!phoneRegex.test(form.phone.trim())) {
        newErrors.phone = "Phone number must contain only digits";
        valid = false;
      } else if (form.phone.trim().length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits";
        valid = false;
      } else if (/(\d)\1{9}/.test(form.phone.trim())) {
        newErrors.phone = "Phone number cannot be a repetitive sequence (e.g., 1111111111)";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  // handle sign up
// handle sign up
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        // Dispatch the signup action
        await dispatch(Actions.signUpAccount(form));
        // Redirect to "/" after successful signup
        navigate("/");
      } catch (error) {
        // Handle any errors if needed
        console.error("Signup failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
      <div className="w-full md:max-w-[440px] mx-auto text-center">
        <div className="font-bold text-5xl mb-4">Create an account</div>
        <div className="text-lg">
          Already a member ?{" "}
          <Link className="text-blue-500 underline" to={"/auth/sign-in"}>
            Sign in
          </Link>
        </div>

        <form
            autoComplete="off"
            className="w-full md:max-w-[360px] mx-auto mt-[48px] mb-[24px]"
            onSubmit={handleSignUp}
        >
          {/* fullname input */}
          <FormControl className="my-[12px]" variant="outlined" fullWidth>
            <InputLabel>Your name</InputLabel>
            <OutlinedInput
                label="Your name"
                name="fullname"
                value={form.fullname}
                onChange={handleChangeForm}
                spellCheck={false}
            />
            {errors.fullname && (
                <div className="text-red-500">{errors.fullname}</div>
            )}
          </FormControl>
          {/* username input */}
          <FormControl className="my-[12px]" variant="outlined" fullWidth>
            <InputLabel>Username</InputLabel>
            <OutlinedInput
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChangeForm}
                spellCheck={false}
            />
            {errors.username && (
                <div className="text-red-500">{errors.username}</div>
            )}
          </FormControl>
          {/* password input  */}
          <FormControl className="my-[12px]" variant="outlined" fullWidth>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChangeForm}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                spellCheck={false}
            />
            {errors.password && (
                <div className="text-red-500">{errors.password}</div>
            )}
          </FormControl>
          {/* email input */}
          <FormControl className="my-[12px]" variant="outlined" fullWidth>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChangeForm}
                spellCheck={false}
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </FormControl>
          {/* phone input */}
          <FormControl className="my-[12px]" variant="outlined" fullWidth>
            <InputLabel>Phone number</InputLabel>
            <OutlinedInput
                label="Phone number"
                name="phone"
                value={form.phone}
                onChange={handleChangeForm}
                spellCheck={false}
            />
            {errors.phone && <div className="text-red-500">{errors.phone}</div>}
          </FormControl>
          {/* sign up button  */}
          <Button
              type="submit"
              className="bg-indigo-700 font-bold text-lg normal-case text-white my-[12px] py-3 rounded-full disabled:bg-slate-300"
              fullWidth
              disabled={!(form.username && form.password && form.fullname) || loading}
          >
            Sign Up
          </Button>
        </form>
      </div>
  );
};

export default SignUp;
