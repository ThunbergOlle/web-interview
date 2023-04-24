import { AllowedSchema } from 'express-json-validator-middleware'

export interface RequestSchema {
  GET: AllowedSchema
  POST: AllowedSchema
}
