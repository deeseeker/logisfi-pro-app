import { updateVPrice } from "@/app/api/services";
import UpdatePriceForm from "./custom-update";

export const UpdateVendorPrice: React.FC<{ data: any; handleOpen: any }> = ({
  data,
  handleOpen,
}) => {
  return (
    <UpdatePriceForm
      keyTitle="vendorPriceId"
      dataSource={data}
      mutationFn={updateVPrice}
      queryKey="vendor-price-list"
      onOpen={handleOpen}
    />
  );
};
