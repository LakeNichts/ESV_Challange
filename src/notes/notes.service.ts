import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In  } from 'typeorm';
import { Note } from './note.entity';
import {CreateNoteDto} from './dto/create-note.dto'
import {UpdateNoteDto} from './dto/update-note.dto'
import { Tag } from '../tags/entities/tag.entity';
import { NotFoundException } from '@nestjs/common';

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
  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const { content, user_id, is_archived, tags } = updateNoteDto;
  
    // Buscar la nota existente
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['tags'], // Incluye los tags actuales
    });
  
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  
    // Manejar los tags
    if (tags && tags.length === 0) {
      // Si el array de tags está vacío, eliminar todos los tags
      note.tags = [];
    }  else if (tags && tags.length > 0) {
      // Si hay tags válidos, buscarlos en el repositorio
      const updatedTags = await this.tagRepository.findBy({
        id: In(tags), // Solo incluir los tags válidos que existan
      });
      note.tags = updatedTags;
    }
  
    // Actualizar los otros campos de la nota si se incluyen en el DTO
    note.content = content ?? note.content;
    note.user_id = user_id ?? note.user_id;
    note.is_archived = is_archived !== undefined ? is_archived : note.is_archived;
  
    // Guardar los cambios
    return this.notesRepository.save(note);
  }

  // Eliminar una nota
  async delete(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
