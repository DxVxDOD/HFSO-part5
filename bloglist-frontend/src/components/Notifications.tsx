import { useAppSelector } from "../app/hooks";

const Notification = () => {
  const message = useAppSelector((state) => state.notification);

  if (message.status === null) {
    return null;
  } else if (message.status === "success") {
    return <div className={message.status}>{message.value}</div>;
  }
  return <div className={message.status}>{message.value}</div>;
};

export default Notification;
