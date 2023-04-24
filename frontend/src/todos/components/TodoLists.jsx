import ReceiptIcon from '@mui/icons-material/Receipt'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { baseUrl } from '../../config/baseUrl'
import { createListMutationRequest } from '../../requests/mutations'
import ErrorComponent from './ErrorComponent'
import { TodoListForm } from './TodoListForm'
export const TodoLists = ({ code }) => {
  const queryClient = useQueryClient()
  const [activeList, setActiveList] = useState()

  /* Query for getting all of the todo-lists and their tasks */
  const { isLoading, error, data, refetch } = useQuery(['listData', code], {
    queryFn: () => fetch(`${baseUrl}/lists?code=${code}`, {}).then((res) => res.json()),
  })

  const createListMutation = useMutation({
    mutationFn: createListMutationRequest,
  })

  if (isLoading) return <CircularProgress />
  if (error) return <ErrorComponent />

  const handleNewListSubmit = async (event) => {
    event.preventDefault()

    /* Get the new list name and clear the old value */
    const newListName = event.target.newListName.value
    event.target.newListName.value = ''

    createListMutation.mutate(
      { list: { name: newListName }, code: code },
      {
        onSuccess: (data) => {
          setActiveList(data)
          refetch() // refetch the lists data.
        },
      }
    )
  }

  return (
    <>
      <Card className='m-4'>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {data.map((list, index) => (
              <ListItemButton key={index} onClick={() => setActiveList(list)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={list.name} />
              </ListItemButton>
            ))}
          </List>
          <form onSubmit={handleNewListSubmit} className='flex flex-row w-full items-center'>
            <TextField
              name='newListName'
              className='flex-grow-1 w-full'
              label='I want to create a to-do list about...'
              onChange={(event) => {
                console.log(event.target.value)
              }}
            />
            <Button className='!ml-10 ' variant='contained' color='primary' type='submit'>
              Add
            </Button>
          </form>
        </CardContent>
      </Card>
      {activeList && (
        <TodoListForm
          key={activeList.name} // use key to make React recreate component to reset internal state
          todoList={activeList}
          onTaskUpdated={(updatedTaskList) => {
            /* do optimistic updates */
            queryClient.setQueriesData(['listData', code], (oldData) => {
              const index = oldData.findIndex((list) => list.id === updatedTaskList.id)
              return [...oldData.slice(0, index), updatedTaskList, ...oldData.slice(index + 1)]
            })
          }}
          code={code}
        />
      )}
    </>
  )
}
