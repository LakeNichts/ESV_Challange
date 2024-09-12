import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In  } from 'typeorm';
import { Note } from './note.entity';
import {CreateNoteDto} from './dto/create-note.dto'
import {UpdateNoteDto} from './dto/update-note.dto'
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  // Crear una nueva nota
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { content, user_id, is_archived, tags } = createNoteDto;
    const existingTags = await this.tagRepository.findBy({
      id: In(tags), // Aquí recibes el array de IDs de tags
    });

    const note = this.notesRepository.create({
      content,
      user_id,
      is_archived: is_archived || false,
      tags: existingTags, // Asignar los tags encontrados
    });

    return this.notesRepository.save(note);
  }

  // Obtener todas las notas
  findAll(): Promise<Note[]> {
    return this.notesRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  // Obtener una nota por ID
  findOne(id: number): Promise<Note> {
    return this.notesRepository.findOneBy({ id });
  }

  async getNoteWithTags(noteId: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: ['tags'],
    });

    return note;
  }

  // Actualizar una nota
  async update(id: number, updateNoteDto: UpdateNoteDto) {
    //await this.notesRepository.update(id, updateNoteDto);
    //return this.notesRepository.findOneBy({ id });
    return `This action updates a #${id} tag`;
  }

  // Eliminar una nota
  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
