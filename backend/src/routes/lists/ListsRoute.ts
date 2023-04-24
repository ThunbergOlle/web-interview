import express from 'express'
import { Validator } from 'express-json-validator-middleware'
import { ListEntity } from '../../db/entities/ListEntity'
import { requestSchema } from './ListsSchema'

const listsRouter = express.Router()
const { validate } = new Validator({ allErrors: true })

// define the home page route
listsRouter.get(
  '/',
  validate({ body: requestSchema.GET?.body, query: requestSchema.GET?.queryParams }),
  async (req, res) => {
    try {
      const code = req.query.code

      const lists = await ListEntity.find({ where: { code: String(code) }, relations: ['tasks'] })
      return res.json(lists)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
)

listsRouter.post(
  '/',
  validate({ body: requestSchema.POST?.body, query: requestSchema.POST?.queryParams }),
  async (req, res) => {
    try {
      const code = req.query.code
      const { name } = req.body

      const list = ListEntity.create({ name: name, code: String(code), tasks: [] })
      await list.save()
      res.json(list)
    } catch (e) {
      console.error(e)
      res.sendStatus(500)
    }
  }
)

export default listsRouter
