import { baseUrl } from '../config/baseUrl'
import { defaultHeaders } from '../config/defaultHeaders'

export const createListMutationRequest = ({ list, code }) => {
  return fetch(`${baseUrl}/lists?code=${code}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  }).then((res) => res.json())
}

export const createTaskMutationRequest = ({ task, code }) => {
  return fetch(`${baseUrl}/lists/tasks?code=${code}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(task),
  }).then((res) => res.json())
}

export const saveTaskMutationRequest = ({ task, code }) => {
  return fetch(`${baseUrl}/lists/tasks/${task.id}?code=${code}`, {
    method: 'PUT',
    headers: defaultHeaders,
    body: JSON.stringify(task),
  }).then((res) => res.json())
}

export const deleteTaskMutationRequest = ({ task, code }) => {
  return fetch(`${baseUrl}/lists/tasks/${task.id}?code=${code}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  })
}
