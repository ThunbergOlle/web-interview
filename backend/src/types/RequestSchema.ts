import { AllowedSchema } from 'express-json-validator-middleware'

export interface RequestSchema {
  GET?: {
    body: AllowedSchema
    queryParams: AllowedSchema
  }
  POST?: {
    body: AllowedSchema
    queryParams: AllowedSchema
  }
  PUT?: {
    body: AllowedSchema
    queryParams: AllowedSchema
  }
  DELETE?: {
    body: AllowedSchema
    queryParams: AllowedSchema
  }
}
