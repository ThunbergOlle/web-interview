import { RequestSchema } from '../../../types/RequestSchema'

export const requestSchema: RequestSchema = {
  GET: {},
  POST: {
    type: 'object',
    properties: {
      code: { type: 'string' },
      listId: { type: 'number' },
      text: { type: 'string' },
    },
    required: ['code', 'listId', 'text'],
  },
}
