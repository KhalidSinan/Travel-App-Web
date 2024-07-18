const TextFieldStyle = {
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

export default TextFieldStyle;