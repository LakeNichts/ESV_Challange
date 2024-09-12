import { Entity, Column, PrimaryGeneratedColumn,ManyToMany  } from 'typeorm';
import { Note } from '../../notes/note.entity';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @ManyToMany(() => Note, (note) => note.tags)
    notes: Note[];
}
