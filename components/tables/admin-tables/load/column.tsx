'use client'

import { deleteRoute, updateRoute } from '@/app/api/services'
import Order from '@/app/dashboard/(shipment)/order/page'
import { UpdateFormValue } from '@/app/dashboard/routes/page'

import RouteForm from '@/components/forms/route-form'
import UpdateOrderForm, { formatEnumKey } from '@/components/forms/uorder-form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { schemaToDate } from '@/lib/utils'
import { formSchema, ILoad, IOrders, OrderStatusEnums } from '@/types/admin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import {
  EllipsisVertical,
  Eye,
  Signature,
  SquarePen,
  Trash
} from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const columns: ColumnDef<ILoad>[] = [
  {
    accessorKey: 'shipmentNumber',
    header: 'Shipment No.',
    cell: ({ row }) => {
      return <span>{row.original.shipmentNumber}</span>
    }
  },
  {
    accessorKey: 'vendor',
    header: 'Vendor',
    cell: ({ row }) => {
      return <span>{row.original.vendor.name}</span>
    }
  },
  {
    accessorKey: 'vendorPrice',
    header: 'Vendor Price',
    cell: ({ row }) => {
      return <span>{row.original.vendorPrice}</span>
    }
  },
  {
    accessorKey: 'shipper',
    header: 'Shipper',
    cell: ({ row }) => {
      return <span>{row.original.shipper.name}</span>
    }
  },
  {
    accessorKey: 'shipperPrice',
    header: 'Shipper Price',
    cell: ({ row }) => {
      return <span>{row.original.shipperPrice}</span>
    }
  },
  {
    accessorKey: 'shipmentDate',
    header: 'Shipment Date',
    cell: ({ row }) => {
      return <span>{schemaToDate(row.original.shipmentDate)}</span>
    }
  },
  {
    accessorKey: 'truckNumber',
    header: 'Truck No.',
    cell: ({ row }) => {
      return <span>{row.original.truckNumber}</span>
    }
  }
]
