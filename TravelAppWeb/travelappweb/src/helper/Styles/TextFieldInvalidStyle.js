const TextFieldInvalidStyle = {
    "&:hover": {
      "& .MuiInputLabel-outlined": {
        color: "#FF204E",
      },
    },
    "& .MuiOutlinedInput-root": {
      // the whole input
      marginBottom: "12px",
      transitionDuration: "400ms",
      color: "var(--text-color)",
  
      "& .MuiOutlinedInput-notchedOutline": {
        // the input border
        borderColor: "var(--danger)",
        borderWidth: "3px",
        borderRadius: "10px",
      },
  
      "& .MuiSelect-icon": {
        color: "var(--danger)", // Set your desired color here
      },
  
      "&:hover:not(.Mui-focused)": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FF204E",
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
      color: "var(--danger)",
      fontWeight: "bold",
      "&.Mui-focused": {
        color: "var(--secondary-color)",
      },
    },
  };


  export default TextFieldInvalidStyle;