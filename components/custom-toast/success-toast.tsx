import { toast } from '@/components/ui/use-toast' // Import ShadCN's toast hook
import { CircleCheck } from 'lucide-react' // Import default icon or any icon library

// Reusable Toast Function
export const successModal = ({
  title = 'Success',
  description = 'Action completed successfully.',
  Icon = CircleCheck,
  iconClassName = 'fill-green-500 text-white h-7 w-7'
}) => {
  toast({
    title: (
      <div className='flex items-center mr-2'>
        <Icon className={iconClassName} />
        <span>{title}</span>
      </div>
    ),
    description: <div className='flex items-center'>{description}</div>
  })
}
