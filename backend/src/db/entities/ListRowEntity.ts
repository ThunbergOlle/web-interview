import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ListEntity } from './ListEntity'

@Entity()
export class ListRowEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => ListEntity, (list) => list.rows)
  list: ListEntity

  @Column({ type: 'varchar', length: 1000, nullable: false })
  text: string
}
