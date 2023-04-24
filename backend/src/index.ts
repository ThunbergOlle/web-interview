import 'reflect-metadata' // required for typeorm
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './db/data-source'
import { ListEntity } from './db/entities/ListEntity'
import dotenv from 'dotenv'
import listsRouter from './routes/lists/ListsRoute'
import listsItemRouter from './routes/lists/item/ListsItemRoute'

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
app.use('/lists/item', listsItemRouter)

app.listen(process.env.PORT, () =>
  console.log(`Todo app listening on port ${process.env.PORT}! 📝`)
)
