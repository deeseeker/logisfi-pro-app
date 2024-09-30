import { deletePrice } from '@/app/api/services'
import { ActionCell } from '../custom-cell-action'
import { UpdateShipperPrice } from '@/components/forms/update-price/update-shipper-price'

export const ShipperCellAction = ({ row }: { row: any }) => (
  <ActionCell
    row={row}
    entityKey='shipper-price-list'
    deleteFunction={deletePrice}
    FormComponent={<UpdateShipperPrice shipperId={row.original.id} />}
  />
)
