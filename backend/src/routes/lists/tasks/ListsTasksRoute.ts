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
      const row = ListTaskEntity.create({ text, list })
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

      // check if row exists
      const row = await ListTaskEntity.findOne({ where: { id: Number(id) } })
      if (!row) {
        return res.status(400).send('Row not found')
      }

      // update row
      const { text } = req.body
      row.text = text
      await row.save()
      res.json(row)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
)

listsTaskRouter.delete('/:id', validate({ body: requestSchema.DELETE?.body, query: requestSchema.DELETE?.queryParams }),async (req, res) => {
  try {
    const code = req.query.code
    const id = req.params.id

    // check if list exists
    const list = await ListEntity.findOne({ where: { code: String(code) } })
    if (!list) {
      return res.status(400).send('List not found')
    }

    // check if row exists
    const row = await ListTaskEntity.findOne({ where: { id: Number(id) } })
    if (!row) {
      return res.status(400).send('Row not found')
    }

    // delete row
    await row.remove()
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})
export default listsTaskRouter
