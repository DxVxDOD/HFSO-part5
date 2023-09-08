import { Alert, AlertTitle } from "@mui/material";
import { useAppSelector } from "../app/hooks";

const Notification = () => {
  const message = useAppSelector((state) => state.notification);

  if (message.status === null || !message.status) {
    return null;
  } else if (message.status === "success") {
    return (
      <Alert severity={message.status}>
        <AlertTitle>Success</AlertTitle> {message.value}
      </Alert>
    );
  } else if (message.status === "error") {
    return (
      <Alert severity={`${message.status}`}>
        <AlertTitle>Error</AlertTitle> {message.value}
      </Alert>
    );
  }
};

export default Notification;
