import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import styles from "./AddAdminForm.module.css";
import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { SubmitButton } from "../../Login/styledForm";
import CustomTextField from "../../../helper/Components/CustomTextField/CustomTextField";

const roles = [
  {
    value: "super",
    label: "Super",
  },
  {
    value: "announcement",
    label: "Announcements",
  },
  {
    value: "reports",
    label: "Reports",
  },
  {
    value: "organizers",
    label: "Organizers",
  },
  {
    value: "dashboard",
    label: "Dashboard",
  },
  {
    value: "admins",
    label: "Admins",
  },
];


const textFieldStyle = {
  "&:hover": {
    "& .MuiInputLabel-outlined": {
      color: "grey",
    },
  },
  "& .MuiOutlinedInput-root": {
    // the whole input
    marginBottom: "12px",
    transitionDuration: "400ms",
    color: "var(--text-color)",

    "& .MuiOutlinedInput-notchedOutline": {
      // the input border
      borderColor: "var(--primary-color)",
      borderWidth: "3px",
      borderRadius: "10px",
    },

    "& .MuiSelect-icon": {
      color: "var(--secondary-color)", // Set your desired color here
    },

    "&:hover:not(.Mui-focused)": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "gray",
        borderRadius: "15px",
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--primary-color)",
        borderRadius: "10px",
        borderWidth: "3px",
      },
    },
  },
  "&.MuiSelect-icon": {
    color: "white",
  },
  "& .MuiInputLabel-outlined": {
    // the label
    color: "var(--secondary-color)",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "var(--secondary-color)",
    },
  },
};


const buttonStyle = {
  "&.MuiIconButton-root": {
    color: "var(--secondary-color)",
  },
};

const AddAdminForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [adminName, setAdminName] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfrim] = useState(null);
  const [role, setRole] = useState(null);

  const adminNameChange = (event) => {
    setAdminName(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const passwordConfirmChange = (event) => {
    setPasswordConfrim(event.target.value);
  };

  const roleChange = (event) => {
    setRole(event.target.value);
  };
  const toggleShowPassword = () => setShowPassword((show) => !show);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  return (
    <div className={styles["add-admin-fields"]}>
      <CustomTextField 
      id="username"
      label="Username" 
      onChange={adminNameChange}
       value={adminName} >

       </CustomTextField>
      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        required
        sx={textFieldStyle}
      >
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment>
              <IconButton
                sx={buttonStyle}
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          value={password}
          onChange={passwordChange}
        />
      </FormControl>

      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        required
        sx={textFieldStyle}
      >
        <InputLabel htmlFor="confirm-password">
          Password Confirmation
        </InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={showPasswordConfirm ? "text" : "password"}
          endAdornment={
            <InputAdornment>
              <IconButton
                sx={buttonStyle}
                aria-label="toggle password confirmation visibility"
                onClick={toggleShowPasswordConfirm}
                edge="end"
              >
                {showPasswordConfirm ? <MdVisibilityOff /> : <MdVisibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password Confirmation"
          value={passwordConfirm}
          onChange={passwordConfirmChange}
        />
      </FormControl>

      <CustomTextField 
      id="admin-roles" 
      label="Select Admin Role"
      onChange={roleChange}
      value={role}
      isSelect
      >
        {roles.map((role) => (
          <MenuItem key={role.value} value={role.value}>
            {role.label}
          </MenuItem>
        ))}
      </CustomTextField>
      <SubmitButton type="submit" fullWidth variant="contained" color="primary">
        Submit
      </SubmitButton>
    </div>
  );
};

export default AddAdminForm;
