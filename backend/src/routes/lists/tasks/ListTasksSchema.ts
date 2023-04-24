import { RequestSchema } from '../../../types/RequestSchema'
import CodeQueryParam from '../../../validation/CodeQueryParam'

export const requestSchema: RequestSchema = {
  GET: {
    body: {},
    queryParams: CodeQueryParam,
  },
  POST: {
    body: {
      type: 'object',
      properties: {
        listId: { type: 'number' },
        text: { type: 'string' },
      },
      required: ['listId', 'text'],
    },
    queryParams: CodeQueryParam,
  },
  PUT: {
    body: {
      type: 'object',
      properties: {
        text: { type: 'string' },
      },
      required: ['text'],
    },
    queryParams: CodeQueryParam,
  },
  DELETE: {
    body: {},
    queryParams: CodeQueryParam,
  },
}
