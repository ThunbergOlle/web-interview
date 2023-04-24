import 'reflect-metadata' // required for typeorm
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { ValidationError } from 'express-json-validator-middleware'
import { AppDataSource } from './db/data-source'
import listsRouter from './routes/lists/ListsRoute'
import listsItemRouter from './routes/lists/tasks/ListsTasksRoute'
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

app.use((error: Error, request: Request, response: Response, next: Function) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
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
