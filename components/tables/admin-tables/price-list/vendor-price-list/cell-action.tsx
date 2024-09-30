import { deleteVPrice } from '@/app/api/services'
import { UpdateVendorPrice } from '@/components/forms/update-price/update-vendor-price'
import { ActionCell } from '../custom-cell-action'

export const VendorCellAction = ({ row }: { row: any }) => (
  <ActionCell
    row={row}
    entityKey='vendor-price-list'
    deleteFunction={deleteVPrice}
    FormComponent={<UpdateVendorPrice vendorId={row.original.id} />}
  />
)
