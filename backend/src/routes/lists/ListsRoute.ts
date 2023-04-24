import express from 'express'
import { Validator } from 'express-json-validator-middleware'
import { ListEntity } from '../../db/entities/ListEntity'
import { requestSchema } from './ListsSchema'

const listsRouter = express.Router()

const { validate } = new Validator({ allErrors: true })

// define the home page route
listsRouter.get('/', async (req, res) => {
  try {
    const code = req.query.code
    if (code) {
      const lists = await ListEntity.find({ where: { code: String(code) }, relations: ['tasks'] })
      return res.json(lists)
    }
    res.status(400).send('Missing code query parameter')
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

listsRouter.post('/', validate({ body: requestSchema.POST }), async (req, res) => {
  try {
    const code = req.query.code
    if (!code) {
      return res.status(400).send('Missing code query parameter')
    }
    const { name } = req.body
    const list = ListEntity.create({ name: name, code: String(code), tasks: [] })
    await list.save()
    res.json(list)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})

export default listsRouter
