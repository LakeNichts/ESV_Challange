import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  // Crear una nueva nota
  create(note: Partial<Note>): Promise<Note> {
    const newNote = this.notesRepository.create(note);
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
  async update(id: number, note: Partial<Note>): Promise<Note> {
    await this.notesRepository.update(id, note);
    return this.notesRepository.findOneBy({ id });
  }

  // Eliminar una nota
  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
