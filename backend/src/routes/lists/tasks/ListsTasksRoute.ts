import express from 'express'
import { ListEntity } from '../../../db/entities/ListEntity'
import { ListTaskEntity } from '../../../db/entities/ListTaskEntity'
import { Validator } from 'express-json-validator-middleware'
import { requestSchema } from './ListTasksSchema'

const listsTaskRouter = express.Router()
const { validate } = new Validator({ allErrors: true })

listsTaskRouter.post(
  '/',
  validate({ body: requestSchema.POST?.body, query: requestSchema.POST?.queryParams }),
  async (req, res) => {
    try {
      const code = req.query.code
      const { listId, text } = req.body
      // check if list exists
      const list = await ListEntity.findOne({ where: { id: listId, code: String(code) } })
      if (!list) {
        return res.status(400).send('List not found')
      }
      // create row
      const row = ListTaskEntity.create({ text, list, completed: false })
      await row.save()
      res.json(row)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
)

listsTaskRouter.put(
  '/:id',
  validate({ body: requestSchema.PUT?.body, query: requestSchema.PUT?.queryParams }),
  async (req, res) => {
    try {
      const code = req.query.code
      const id = req.params.id

      // check if list exists
      const list = await ListEntity.findOne({ where: { code: String(code) } })
      if (!list) {
        return res.status(400).send('List not found')
      }

      // check if task exists
      const task = await ListTaskEntity.findOne({ where: { id: Number(id) } })
      if (!task) {
        return res.status(400).send('Task not found')
      }

      // update task
      const { text, completed } = req.body
      task.text = text
      task.completed = completed
      await task.save()
      res.json(task)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
)

listsTaskRouter.delete(
  '/:id',
  validate({ body: requestSchema.DELETE?.body, query: requestSchema.DELETE?.queryParams }),
  async (req, res) => {
    try {
      const code = req.query.code
      const id = req.params.id

      // check if list exists
      const list = await ListEntity.findOne({ where: { code: String(code) } })
      if (!list) {
        return res.status(400).send('List not found')
      }

      // check if task exists
      const task = await ListTaskEntity.findOne({ where: { id: Number(id) } })
      if (!task) {
        return res.status(400).send('Task not found')
      }

      // delete task
      await task.remove()
      res.sendStatus(200)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
)
export default listsTaskRouter
