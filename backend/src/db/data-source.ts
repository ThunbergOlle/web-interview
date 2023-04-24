import { DataSource } from 'typeorm'
import { ListEntity } from './entities/ListEntity'
import { cwd } from 'process'
import { ListTaskEntity } from './entities/ListTaskEntity'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `${cwd()}/database/db.sqlite`,
  synchronize: true,
  entities: [ListEntity, ListTaskEntity],
  subscribers: [],
  migrations: [],
})
