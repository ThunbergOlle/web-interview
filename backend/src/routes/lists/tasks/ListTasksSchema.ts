import { RequestSchema } from '../../../types/RequestSchema'

export const requestSchema: RequestSchema = {
  GET: {},
  POST: {
    type: 'object',
    properties: {
      listId: { type: 'number' },
      text: { type: 'string' },
    },
    required: ['listId', 'text'],
  },
}
