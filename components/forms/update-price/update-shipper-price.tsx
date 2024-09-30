import { updatePrice } from '@/app/api/services'
import UpdatePriceForm from './custom-update'

export const UpdateShipperPrice: React.FC<{ shipperId: string }> = ({
  shipperId
}) => {
  return (
    <UpdatePriceForm
      keyTitle='shipperPriceId'
      idKey={shipperId}
      mutationFn={updatePrice}
      queryKey='shipper-price-list'
    />
  )
}
