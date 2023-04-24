import { RequestSchema } from '../../types/RequestSchema'

export const requestSchema: RequestSchema = {
  GET: {},
  POST: {
    type: 'object',
    properties: {
      name: { type: 'string' },
    },
    required: ['name'],
  },
}

