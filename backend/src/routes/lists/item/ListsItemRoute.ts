import express from 'express'
import { ListEntity } from '../../../db/entities/ListEntity'
import { ListRowEntity } from '../../../db/entities/ListRowEntity'

const listsItemRouter = express.Router()

listsItemRouter.post('/lists/item', async (req, res) => {
  try {
    const { listId, text, code } = req.body
    // check if list exists
    const list = await ListEntity.findOne({ where: { id: listId, code } })
    if (!list) {
      return res.status(400).send('List not found')
    }
    // create row
    const row = ListRowEntity.create({ text, list })
    await row.save()
    res.json(row)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
})
listsItemRouter.delete('/lists/item/:id', async (req, res) => {
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
    const row = await ListRowEntity.findOne({ where: { id: Number(id) } })
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
export default listsItemRouter
