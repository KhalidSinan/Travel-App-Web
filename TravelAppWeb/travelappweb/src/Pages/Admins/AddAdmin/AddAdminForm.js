import {
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import styles from "./AddAdminForm.module.css";
import { useContext, useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import CustomTextField from "../../../helper/Components/CustomTextField/CustomTextField";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import TextFieldStyle from "../../../helper/Styles/TextFieldStyle";
import TextFieldInvalidStyle from "../../../helper/Styles/TextFieldInvalidStyle";
import { useNavigate } from "react-router-dom";
import AutohideSnackbar from "../../../helper/snackbar";
import { AuthLogin } from "../../../Context/login_context";

const roles = [
  {
    value: "Admin",
    label: "Admin",
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
const buttonStyle = {
  "&.MuiIconButton-root": {
    color: "var(--secondary-color)",
  },
};


const AddAdminForm = (props) => {
  const navigator = useNavigate();
  const loginContext = useContext(AuthLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfrim] = useState('');
  const [role, setRole] = useState(null);
  const [adminNameTouched, setAdminNameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmTouched, setPasswordConfrimTouched] = useState(false);
  const [roleTouched, setRoleTouched] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  
  const adminNameNotValid = adminNameTouched && adminName.length < 3;
  const passwordNotValid = password.length < 8 && passwordTouched;
  const passwordConfirmNotValid = passwordConfirmTouched && (passwordConfirm.length < 8 || passwordConfirm !== password);
  const roleNotValid = roleTouched && role === null;
  const formNotValid = adminNameNotValid || passwordConfirmNotValid || passwordNotValid || roleNotValid;
  
  const adminNameChange = (event) => {
    touchAdminName()
    setAdminName(event.target.value);
  };

  const passwordChange = (event) => {
    touchPassword()
    setPassword(event.target.value);
  };

  const passwordConfirmChange = (event) => {
    touchPasswordConfirm()
    setPasswordConfrim(event.target.value);
  };

  const roleChange = (event) => {
    touchRole()
    setRole(event.target.value);
  };
  const toggleShowPassword = () => setShowPassword((show) => !show);
  const toggleShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

  const touchAdminName = () => setAdminNameTouched(true);
  const touchPassword = () => setPasswordTouched(true);
  const touchPasswordConfirm = () => setPasswordConfrimTouched(true);
  const touchRole = () => setRoleTouched(true);

  const addAdmin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/dashboard/admin'`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginContext.Token}`,
            "ngrok-skip-browser-warning": "69420",

          },
          body: JSON.stringify({
            "username" : adminName,
            "password" : password,
            "password_confirmation": passwordConfirm,
            "role" : role,
          }),
      });
      if(!response.ok){
        if(response.status === 400){
          const data = await response.json();
          const field = Object.keys(data.message)[0];
          throw new Error(data.message[field][0]);
        }
        throw new Error('An Error occured when adding the admin');
      }
      const data = await response.json();
      navigator('/admins');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <div className={styles["add-admin-fields"]}>
      <CustomTextField
        id="username"
        label="Username"
        onChange={adminNameChange}
        value={adminName}
        error={adminNameNotValid}
        errText="Admin name must be at least 3 characters"
      />
      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        required
        sx={TextFieldStyle}
        error={passwordNotValid}
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
        {passwordNotValid ? <FormHelperText>
          Password must be at least 8 characters
        </FormHelperText> : null}
      </FormControl>

      <FormControl
        variant="outlined"
        fullWidth
        margin="normal"
        required
        sx={TextFieldStyle}
        error={passwordConfirmNotValid}
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
        {passwordConfirmTouched && passwordConfirm.length < 8 ? <FormHelperText>
          Password Confirmation must be at least 8 characters
        </FormHelperText> : null}
        {passwordConfirmTouched && passwordConfirm.length >= 8 && passwordConfirm !== password ? <FormHelperText>
          Password Confirmation must match password
        </FormHelperText> : null}
      </FormControl>

      <CustomTextField
        id="admin-roles"
        label="Select Admin Role"
        onChange={roleChange}
        value={role}
        isSelect
        error={roleNotValid}
        errText="Admin Role must not be empty"
      >
        {roles.map((role) => (
          <MenuItem key={role.value} value={role.value}>
            {role.label}
          </MenuItem>
        ))}
      </CustomTextField>
      {isLoading ? <CircularProgress /> 
      :<CustomButton
        name="Add Admin"
        classes={`${styles["add-admin-btn"]}`}
        onClick={addAdmin}
        error={roleNotValid}
      />}
      {error ? <AutohideSnackbar message={error} /> : null}
    </div>
  );
};

export default AddAdminForm;
