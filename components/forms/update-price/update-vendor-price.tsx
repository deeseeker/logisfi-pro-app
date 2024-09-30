import { updateVPrice } from '@/app/api/services'
import UpdatePriceForm from './custom-update'

export const UpdateVendorPrice: React.FC<{ vendorId: string }> = ({
  vendorId
}) => {
  return (
    <UpdatePriceForm
      keyTitle='vendorPriceId'
      idKey={vendorId}
      mutationFn={updateVPrice}
      queryKey='vendor-price-list'
    />
  )
}
