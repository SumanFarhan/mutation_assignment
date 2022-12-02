import { useMutation, QueryClient, QueryClientProvider, useQuery } from 'react-query'
import axios from 'axios'

export default function Mutate() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <MutateChild />
    </QueryClientProvider>)
}
export function MutateChild() {
  const mutation = useMutation({
    mutationFn: newTodo => {
      return axios.post('http://localhost:3000/todos', newTodo)
    }
  })

  return (
    <div>
      {mutation.isLoading ? (
        'Adding todo...'
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: 'Do Laundry' })
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  )
}