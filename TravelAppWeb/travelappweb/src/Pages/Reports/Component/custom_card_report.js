import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ExpandMore, Delete, Email, CheckCircle } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import CustomDialog from "../../../helper/dialog";
import AutohideSnackbar from "../../../helper/snackbar";

const CustomCard = styled(Card)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(5, 0),
  borderRadius: theme.shape.borderRadius,
  position: "relative",
  border: "3px solid var(--secondary-color)",
  boxShadow: `0 4px 8px 0 var(--secondary-color), 0 6px 20px 0 var(--secondary-color)`,
  "&:hover": {
    boxShadow: `0 8px 16px 0 var(--secondary-color), 0 12px 30px 0 var(--secondary-color)`,
  },
}));

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  width: "100%",
  boxShadow: "none",
  "&:before": {
    display: "none",
  },
}));

const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem', 
  fontWeight: '600',
  color: "var(--primary-color)",
}));

const ReportDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem', 
  color: theme.palette.text.secondary, 
  marginLeft: theme.spacing(2),
}));

const ReportCount = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem', 
  fontWeight: '500', 
  padding: theme.spacing(1, 0), 
  textAlign: 'left',
  color:  "var(--primary-color)", 
}));

const ReportBody = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  padding: theme.spacing(1, 0), 
  textAlign: 'left',
  lineHeight: 1.75, 
  color: theme.palette.text.primary, 
}));

const ButtonGroup = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: "flex",
  gap: theme.spacing(1),
  zIndex: 10,
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.error.dark,
  },
}));

const EmailButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "var(--primary-color)",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "rgb(30, 136, 229)",
  },
}));

const CheckButton = styled(IconButton)(({ theme }) => ({
  backgroundColor:  "var(--primary-color)",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor:"var(--primary-color)",
  },
}));

const AccordionCard = ({
  senderName,
  reportTitle,
  reportBody,
  reportDate,
  onDelete,
  repliedTo,
  onEmail,
  message,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [messageDelete, setMessageDelete] = useState(message);
  const [emailMessage, setEmailMessage] = useState("");

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete();
      handleCloseDialog();
      console.log(messageDelete);
      setMessageDelete(messageDelete || "Report deleted successfully");
    } catch (error) {
      setMessageDelete("Failed to delete the report");
    }
  };

  const handleOpenEmailDialog = () => {
    setEmailDialogOpen(true);
  };

  const handleCloseEmailDialog = () => {
    setEmailDialogOpen(false);
  };

  const handleConfirmEmail = async () => {
    try {
      await onEmail();
      handleCloseEmailDialog();
      setEmailMessage("Email sent successfully");
    } catch (error) {
      setEmailMessage("Failed to send email");
    }
  };

  return (
    <CustomCard>
      <ButtonGroup>
        <DeleteButton onClick={handleOpenDialog}>
          <Delete />
        </DeleteButton>
        {repliedTo ? (
          <CheckButton >
            <CheckCircle />
          </CheckButton>
        ) : (
          <EmailButton onClick={handleOpenEmailDialog}>
            <Email />
          </EmailButton>
        )}
      </ButtonGroup>
      <CustomAccordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <CardHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
              <CardTitle>Report From {senderName}</CardTitle>
              <ReportDate>{reportDate}</ReportDate>
            </div>
          </CardHeader>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            <ReportCount>{reportTitle}</ReportCount>
            <ReportBody variant="body2" color= "var(--primary-color)" component="p">
              {reportBody}
            </ReportBody>
          </CardContent>
        </AccordionDetails>
      </CustomAccordion>
      <CustomDialog
        open={dialogOpen}
        handleClose={handleCloseDialog}
        handelAgree={handleConfirmDelete}
        content="Are you sure you want to delete this report?"
      />
      <CustomDialog
        open={emailDialogOpen}
        handleClose={handleCloseEmailDialog}
        handelAgree={handleConfirmEmail}
        content="Are you sure you want to send this email?"
      />
      {messageDelete && <AutohideSnackbar message={messageDelete} />}
      {emailMessage && <AutohideSnackbar message={emailMessage} />}
    </CustomCard>
  );
};

export default AccordionCard;
