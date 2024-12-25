import { updatePrice } from "@/app/api/services";
import UpdatePriceForm from "./custom-update";

export const UpdateShipperPrice: React.FC<{ data: any; handleOpen: any }> = ({
  data,
  handleOpen,
}) => {
  return (
    <UpdatePriceForm
      keyTitle="shipperPriceId"
      dataSource={data}
      mutationFn={updatePrice}
      queryKey="shipper-price-list"
      onOpen={handleOpen}
    />
  );
};
