import { toast } from "sonner";

function toAlertMessage(message: unknown) {
  if (typeof message === "string" && message.trim()) {
    return message;
  }
  if (message == null) {
    return "Request failed";
  }
  return String(message);
}

export const showSuccessAlert = (message: unknown) => {
  toast.success(toAlertMessage(message), {
    position: "top-right",
  });
};

export const showErrorAlert = (message: unknown) => {
  toast.error(toAlertMessage(message), {
    position: "top-right",
  });
};
export const showInfoAlert = (message: unknown) => {
  toast.info(toAlertMessage(message), {
    position: "bottom-center",
  });
};
