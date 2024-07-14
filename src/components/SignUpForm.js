import React from "react";
import {Button, TextField} from '@mui/material'
import PasswordStr from "./PasswordStr";
import {Link} from "react-router-dom"
import "../styles/partials/_signupform.scss";

const SignUpForm = ({
  history,
  onSubmit,
  onChange,
  errors,
  user,
  score,
  btnTxt,
  type,
  pwMask,
  onPwChange
}) => {
    // const handleSubmit = () => {
    //     alert('success!')
    // }

  return (
    <div className="loginBox">
      <h1>Sign Up</h1>
      {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}

      <form onSubmit={onSubmit}>
        <TextField
          name="username"
          floatingLabelText="user name"
          value={user.username}
          onChange={onChange}
          errorText={errors.username}
          placeholder="User Name"
        />
        <TextField
          name="email"
          floatingLabelText="email"
          value={user.email}
          onChange={onChange}
          errorText={errors.email}
          placeholder="Email"
        />
        <TextField
          type={type}
          name="password"
          floatingLabelText="password"
          value={user.password}
          onChange={onPwChange}
          errorText={errors.password}
          placeholder="Password"
        />

        <div className="pwStrRow">
          {score >= 1 && (
            <div>
              <PasswordStr score={score} /> 
              <Button 
                className="pwShowHideBtn" 
                label={btnTxt} onClick={pwMask} 
                style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} 
              />
            </div>
            )} 
        </div>
        <TextField
          type={type}
          name="pwconfirm"
          floatingLabelText="confirm password"
          value={user.pwconfirm}
          onChange={onChange}
          errorText={errors.pwconfirm}
          placeholder="Password Confirmation"
        />
        <br />
        <Button 
            variant="contained" 
            className='signUpSubmit' 
            // onClick={handleSubmit}
        >
                Sign Up
        </Button>
      </form>
      <p>
        Aleady have an account? <br />
        <Link to="/signin">Log in here</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
