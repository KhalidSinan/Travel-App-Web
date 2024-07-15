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
import { useEffect, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { SubmitButton } from "../../Login/styledForm";


const roles = [
    {
      value: 'super',
      label: 'Super',
    },
    {
      value: 'announcement',
      label: 'Announcements',
    },
    {
      value: 'reports',
      label: 'Reports',
    },
    {
      value: 'organizers',
      label: 'Organizers',
    },
    {
      value: 'dashboard',
      label: 'Dashboard',
    },
    {
      value: 'admins',
      label: 'Admins',
    },
  ];

const AddAdminForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [adminName, setAdminName] = useState(null);
  const [password,setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfrim] = useState(null); 
  const [role, setRole] = useState(null);

  const adminNameChange = (event) => {
    setAdminName(event.target.value);
  }

  const passwordChange = (event) => {
    setPassword(event.target.value);
  }

  const passwordConfirmChange = (event) => {
    setPasswordConfrim(event.target.value);
  }

  const roleChange = (event) => {
    setRole(event.target.value);
  }
  const toggleShowPassword = () => setShowPassword((show) => !show);
  const toggleShowPasswordConfirm = () =>
    setShowPasswordConfirm((show) => !show);

  return (
    <div className={styles["add-admin-fields"]}>
      <TextField
        required
        autoFocus
        fullWidth
        variant="outlined"
        margin="normal"
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={adminName}
        onChange={adminNameChange}
      />
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment>
              <IconButton
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
      <FormControl variant="outlined" fullWidth margin="normal" required>
        <InputLabel htmlFor="confirm-password">
          Password
        </InputLabel>
        <OutlinedInput
          id="confirm-password"
          type={showPasswordConfirm ? "text" : "password"}
          endAdornment={
            <InputAdornment>
              <IconButton
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
      <TextField
          id="admin-roles"
          select
          label="Select Admin Role"
          fullWidth
          required
          margin="normal"
          value={role}
          onChange={roleChange}
        >
          {roles.map((role) => (
            <MenuItem key={role.value} value={role.value}>
              {role.label}
            </MenuItem>
          ))}
        </TextField>
        <SubmitButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
      >
        Submit
      </SubmitButton>
    </div>
  );
};

export default AddAdminForm;
