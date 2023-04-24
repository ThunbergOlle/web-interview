import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ListRowEntity } from './ListRowEntity'

@Entity()
export class ListEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @OneToMany(() => ListRowEntity, row => row.list)
  rows: ListRowEntity[]

  @Column({ type: 'varchar', nullable: false })
  code: string
}
