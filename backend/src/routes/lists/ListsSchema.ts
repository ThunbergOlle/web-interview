import { RequestSchema } from '../../types/RequestSchema'
import CodeQueryParam from '../../validation/CodeQueryParam'

export const requestSchema: RequestSchema = {
  GET: {
    body: {},
    queryParams: CodeQueryParam,
  },
  POST: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
      required: ['name'],
    },
    queryParams: CodeQueryParam,
  },
}
