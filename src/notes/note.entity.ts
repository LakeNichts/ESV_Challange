import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Tag } from '../tags/entities/tag.entity';

@Entity('notes') // nombre de la tabla en la base de datos
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 1})
  user_id: number;

  @Column('text')
  content: string;

  @Column({ default: false })
  is_archived: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(() => Tag, tag => tag.notes)
  @JoinTable({ name: "notetags" })
  tags: Tag[];
}
