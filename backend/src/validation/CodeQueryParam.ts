import { AllowedSchema } from "express-json-validator-middleware";

export default {
  type: 'object',
  properties: {
    code: { type: 'string' },
  },
  required: ['code'],
} as AllowedSchema
