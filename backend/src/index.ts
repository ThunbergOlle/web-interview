import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-json-validator-middleware'
import 'reflect-metadata' // required for typeorm
import { AppDataSource } from './db/data-source'
import listsRouter from './routes/lists/ListsRoute'
import listsTaskRouter from './routes/lists/tasks/ListsTasksRoute'

dotenv.config()

/* Initialize database connection */
AppDataSource.initialize().catch((error) => {
  console.error('fatal error when initializing the database:', error)
  process.exit(1)
})

const app = express()

/* Middleware that are run on every API call */
app.use(cors())
app.use(express.json())

app.use('/lists', listsRouter)
app.use('/lists/tasks', listsTaskRouter)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // return a response with the validation error details
    response.status(400).send(error.validationErrors)
    next()
  } else {
    // Pass error on if not a validation error
    next(error)
  }
})
app.listen(process.env.PORT, () =>
  console.log(`Todo app listening on port ${process.env.PORT}! 📝`)
)
