import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// General toast notification utility functions
export const showToast = (message, type = "default") => {
  console.log("Toast triggered:", type, message);
  
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast.info(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};

export const showConfirm = (message) => {
  return new Promise((resolve) => {
    const toastId = toast(
      <div className="flex flex-col justify-center items-center">
        <p className="mb-4">{message}</p>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              resolve(true);
            }}
            className="bg-green-500 text-white py-1 px-3 rounded"
          >
            Yes
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
      }
    );
  });
};