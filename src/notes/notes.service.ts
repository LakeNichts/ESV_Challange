import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import {CreateNoteDto} from './dto/create-note.dto'
import {UpdateNoteDto} from './dto/update-note.dto'


@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  // Crear una nueva nota
  create(createNoteDto: CreateNoteDto) {
    const newNote = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(newNote);
  }

  // Obtener todas las notas
  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  // Obtener una nota por ID
  findOne(id: number): Promise<Note> {
    return this.notesRepository.findOneBy({ id });
  }

  // Actualizar una nota
  async update(id: number, updateNoteDto: UpdateNoteDto) {
    await this.notesRepository.update(id, updateNoteDto);
    return this.notesRepository.findOneBy({ id });
  }

  // Eliminar una nota
  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
