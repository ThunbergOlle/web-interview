import express from 'express'
import { ListEntity } from '../../../db/entities/ListEntity'
import { ListTaskEntity } from '../../../db/entities/ListTaskEntity'

const listsTaskRouter = express.Router()

listsTaskRouter.post('/', async (req, res) => {
  try {
    const code = req.query.code
    if (!code) {
      return res.status(400).send('Missing code query parameter')
    }
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
})
listsTaskRouter.put('/:id', async (req, res) => {
  try {
    const code = req.query.code
    const id = req.params.id

    if (!code || !id) {
      return res.status(400).send('Missing code or id query parameter')
    }

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
})

listsTaskRouter.delete('/:id', async (req, res) => {
  try {
    const code = req.query.code
    const id = req.params.id

    if (!code || !id) {
      return res.status(400).send('Missing code or id query parameter')
    }

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
