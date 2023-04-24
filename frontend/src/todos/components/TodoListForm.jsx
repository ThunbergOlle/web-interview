import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

export const TodoListForm = ({ todoList, onTaskUpdated, code }) => {
  const queryClient = useQueryClient()
  const [tasks, setTasks] = useState(todoList.tasks)

  const postTaskMutation = useMutation({
    mutationFn: (newTask) => {
      return fetch(`http://localhost:3001/lists/tasks?code=${code}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      }).then((res) => res.json())
    },
  })
  const putTaskMutation = useMutation({
    mutationFn: (task) => {
      return fetch(`http://localhost:3001/lists/tasks/${task.id}/?code=${code}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      }).then((res) => res.json())
    },
  })

  const saveTask = (task) => {
    // is the task new or existing?
    if (task.id !== -1) {
      // existing task
      const index = tasks.findIndex((t) => t.id === task.id)
      putTaskMutation.mutate(task, {
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ['listData', code] })
        },
        onSuccess: (data) => {
          setTasks([
            // immutable update
            ...tasks.slice(0, index),
            data,
            ...tasks.slice(index + 1),
          ])
          onTaskUpdated({ ...todoList, tasks })
        },
      })
    } else {
      // This is a new task
      postTaskMutation.mutate(
        { text: task.text, listId: todoList.id },
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
                setTasks([
                  // immutable delete
                  ...tasks.slice(0, index),
                  ...tasks.slice(index + 1),
                ])
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
              setTasks([...tasks, { id: -1, text: '' }])
            }}
          >
            Add Todo <AddIcon />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
