import { toast } from "sonner";

export const showSuccessAlert = (message: string) => {
  toast.success(message, {
    position: "bottom-right",
  });
};

export const showErrorAlert = (message: string) => {
  toast.error(message, {
    position: "top-right",
  });
};
export const showInfoAlert = (message: string) => {
  toast.info(message, {
    position: "bottom-center",
  });
};
