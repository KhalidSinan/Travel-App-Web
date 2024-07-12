import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
const StyledForm = styled('form')(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
  }));
  
 export const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"rgb(32,94,97)",
  }));


  export default StyledForm;