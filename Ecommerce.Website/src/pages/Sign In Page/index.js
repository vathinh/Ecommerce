import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
	Button,
	Checkbox,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from "@mui/material";
import * as Actions from 'actions';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);

  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  const [isStaySignedIn, setStaySignedIn] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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

  //handle sign in
  const handleSignIn = async (e) => {
	e.preventDefault();
	setLoading(true);
	dispatch(Actions.signInAccount(form));
	setLoading(false);
  };

  useEffect(() => {
	if(isLogedIn) {
	  navigate("/")
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogedIn])

  return (
    <div className="w-full md:max-w-[440px] mx-auto text-center">
      <div className="font-bold text-5xl mb-4">Hello</div>
      <div className="text-lg">
        Sign in to eNTP or{" "}
        <Link className="text-blue-500 underline" to={"/auth/sign-up"}>
          create an account
        </Link>
      </div>

      <form autoComplete="off" className="w-full md:max-w-[360px] mx-auto mt-[48px] mb-[24px]" onSubmit={handleSignIn}>
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
        </FormControl>
        {/* stay signed in */}
        <div className="inline-flex items-center my-[12px]">
          <Checkbox
            checked={isStaySignedIn}
            onChange={(e) => setStaySignedIn(e.target.checked)}
            className="mr-[2px] text-indigo-700"
          />
          Stay signed in
        </div>
        {/* sign in button  */}
        <Button
		  type="submit"
          className="bg-indigo-700 font-bold text-lg normal-case text-white my-[12px] py-3 rounded-full disabled:bg-slate-300"
          fullWidth
          disabled={!(form.username && form.password) || loading}
        >
          Sign in
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
