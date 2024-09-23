import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'

interface IDialog {
  triggerText: string
  title: string
  description: string
  FormComponent: any
  formKey: number
  onSubmit: (data: any) => void
  mutation: any
  form: any
}
const CustomDialog = ({
  triggerText,
  title,
  description,
  FormComponent,
  formKey,
  onSubmit,
  mutation,
  form
}: IDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-transparent text-black text-xs md:text-sm overflow-hidden rounded-md py-2 font-normal hover:bg-accent hover:text-accent-foreground'>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <FormComponent
          key={formKey}
          onSubmit={onSubmit}
          mutation={mutation}
          form={form}
        />
      </DialogContent>
    </Dialog>
  )
}

export default CustomDialog
