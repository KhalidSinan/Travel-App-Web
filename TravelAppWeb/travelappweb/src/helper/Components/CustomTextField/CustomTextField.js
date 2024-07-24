import { TextField } from "@mui/material";
import TextFieldStyle from "../../Styles/TextFieldStyle";
import TextFieldInvalidStyle from "../../Styles/TextFieldInvalidStyle";

const CustomTextField = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  children,
  isSelect = false,
  error = false,
  errText,
  focused = false,
}) => {
  return (
    <TextField
      required
      focused={focused}
      select={isSelect}
      autoFocus
      fullWidth
      variant="outlined"
      margin="normal"
      id={id}
      label={label}
      name={label}
      autoComplete={label}
      value={value}
      sx={TextFieldStyle}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={error ? errText : null}
    >
      {children}
    </TextField>
  );
};

export default CustomTextField;
