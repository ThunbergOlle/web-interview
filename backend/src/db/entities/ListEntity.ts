import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ListTaskEntity } from './ListTaskEntity'

@Entity()
export class ListEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string

  @OneToMany(() => ListTaskEntity, row => row.list)
  tasks: ListTaskEntity[]

  @Column({ type: 'varchar', nullable: false })
  code: string
}
