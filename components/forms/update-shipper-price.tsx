import { updatePrice } from '@/app/api/services'
import UpdatePriceForm from './update-price-form'

export const UpdateShipperPrice: React.FC<{ shipperId: string }> = ({
  shipperId
}) => {
  return (
    <UpdatePriceForm
      idKey={shipperId}
      mutationFn={updatePrice}
      queryKey='price-list'
    />
  )
}
