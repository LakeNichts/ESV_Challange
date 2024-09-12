import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note> {
    return this.notesService.findOne(+id);
  }

  @Post()
  create(@Body() note: Partial<Note>): Promise<Note> {
    return this.notesService.create(note);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() note: Partial<Note>): Promise<Note> {
    return this.notesService.update(+id, note);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.notesService.delete(+id);
  }
}
