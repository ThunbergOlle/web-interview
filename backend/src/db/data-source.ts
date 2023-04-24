import { DataSource } from "typeorm";
import { ListEntity } from "./entities/ListEntity";
import { ListRowEntity } from "./entities/ListRowEntity";
import { cwd } from "process";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: `${cwd()}/database/db.sqlite`,
    synchronize: true,
    entities: [ListEntity, ListRowEntity],
    subscribers: [],
    migrations: [],
})