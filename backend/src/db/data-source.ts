import { DataSource } from 'typeorm'
import { ListEntity } from './entities/ListEntity'
import { cwd } from 'process'
import { ListTaskEntity } from './entities/ListTaskEntity'

/* Using SQLite for ease of use. */
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `${cwd()}/database/db.sqlite`,
  synchronize: true,
  entities: [ListEntity, ListTaskEntity],
  subscribers: [],
  migrations: [],
})
