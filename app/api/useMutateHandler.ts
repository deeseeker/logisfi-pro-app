import {
  useMutation,
  useQueryClient,
  UseMutationResult
} from '@tanstack/react-query'

type MutateProps<TData, TVariables> = {
  mutationFn: (data: TVariables) => Promise<TData> // Accepts variables and returns a Promise
  onSuccess?: (data: TData, variables: TVariables) => void // Optional success callback
  queryKeys?: string[] // Optional array of query keys
  onError?: (error: unknown) => void // Optional error handler
}

export default function useMutateHandler<TData, TVariables>({
  mutationFn,
  onSuccess,
  queryKeys,
  onError
}: MutateProps<TData, TVariables>): UseMutationResult<
  TData,
  unknown,
  TVariables
> {
  const queryClient = useQueryClient()

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (res, variables) => {
      if (onSuccess) onSuccess(res, variables) // Handle optional onSuccess callback
      if (queryKeys) {
        queryKeys.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: [query] })
        })
      }
    },
    onError
  })

  return mutation
}
