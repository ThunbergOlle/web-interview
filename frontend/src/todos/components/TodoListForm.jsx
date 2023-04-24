import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { createTaskMutationRequest, deleteTaskMutationRequest, saveTaskMutationRequest } from '../../requests/mutations'

export const TodoListForm = ({ todoList, onTaskUpdated, code }) => {
  const queryClient = useQueryClient()
  const [tasks, setTasks] = useState(todoList.tasks)

  const createTaskMutation = useMutation({
    mutationFn: createTaskMutationRequest,
  })
  const saveTaskMutation = useMutation({
    mutationFn: saveTaskMutationRequest,
  })
  const deleteTaskMutation = useMutation({
    mutationFn: deleteTaskMutationRequest
  })

  const createTask = (task) => {
    // This is a new task
    createTaskMutation.mutate(
      { task: { text: task.text, listId: todoList.id }, code: code },
      {
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['listData', code] })
        },
        onSuccess: (data) => {
          setTasks([...tasks, data])
          onTaskUpdated({ ...todoList, tasks })
        },
      }
    )
  }
  const saveTask = (task) => {
    // existing task
    saveTaskMutation.mutate(
      { task: task, code: code },
      {
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['listData', code] })
        },
        onSuccess: (data) => {
          const index = tasks.findIndex((t) => t.id === task.id)
          setTasks([
            // immutable update
            ...tasks.slice(0, index),
            data,
            ...tasks.slice(index + 1),
          ])
          onTaskUpdated({ ...todoList, tasks })
        },
      }
    )
  }
  const deleteTask = (task) => {
    // existing task
    deleteTaskMutation.mutate(
      { task: task, code: code },
      {
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['listData', code] })
        },
        onSuccess: () => {
          const index = tasks.findIndex((t) => t.id === task.id)
          setTasks([
            // immutable update
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
          ])
          console.log(tasks)
          onTaskUpdated({ ...todoList, tasks })
        },
      }
    )
  }

  return (
    <Card className='m-4'>
      <CardContent>
        <Typography component='h2'>{todoList.name}</Typography>

        {tasks.map((task, index) => (
          <div key={index} className='flex items-center'>
            <Typography className='!m-2' variant='h6'>
              {index + 1}
            </Typography>
            <TextField
              className='flex-grow-1 !mt-4 w-full'
              label='What to do?'
              value={task.text}
              onChange={(event) => {
                setTasks([
                  // immutable update
                  ...tasks.slice(0, index),
                  { ...task, text: event.target.value },
                  ...tasks.slice(index + 1),
                ])
              }}
              onBlur={() => {
                saveTask(task)
              }}
            />
            <Button
              className='!mt-4'
              size='small'
              color='secondary'
              onClick={() => {
                deleteTask(task)
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
        <CardActions>
          <Button
            type='button'
            color='primary'
            onClick={() => {
              createTask({ text: '', listId: todoList.id })
            }}
          >
            Add Todo <AddIcon />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
