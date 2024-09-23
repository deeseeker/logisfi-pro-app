import { updateVPrice } from '@/app/api/services'
import UpdatePriceForm from './update-price-form'

export const UpdateVendorPrice: React.FC<{ vendorId: string }> = ({
  vendorId
}) => {
  return (
    <UpdatePriceForm
      idKey={vendorId}
      mutationFn={updateVPrice}
      queryKey='vendor-price-list'
    />
  )
}
