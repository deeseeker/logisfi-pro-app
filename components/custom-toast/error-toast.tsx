import { toast } from "@/components/ui/use-toast"; // Import ShadCN's toast hook
import { CircleCheck } from "lucide-react"; // Import default icon or any icon library

// Reusable Toast Function
export const ErrorModal = ({
  title = "Error",
  description = "Action failed.",
  Icon = CircleCheck,
  iconClassName = "fill-red-600 text-white h-7 w-7",
}) => {
  toast({
    title: (
      <div className="flex gap-2 items-center mr-2">
        <Icon className={iconClassName} />
        <span>{title}</span>
      </div>
    ),
    description: <div className="flex items-center">{description}</div>,
  });
};
