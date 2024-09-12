import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import {CreateNoteDto} from './dto/create-note.dto'
import {UpdateNoteDto} from './dto/update-note.dto'

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Note> {
    return this.notesService.getNoteWithTags(+id);
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.notesService.delete(id);
  }
}
