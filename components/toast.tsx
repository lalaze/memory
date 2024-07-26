import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const showToast = (message: string, type: string) => {
  const options = {
    position: "top-right" as ToastPosition,
    hideProgressBar: true
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options);
  }
};

export default showToast;
