import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './note.entity';
import { TagsModule } from '../tags/tags.module';  // Importa el TagsModule


@Module({
  imports: [TypeOrmModule.forFeature([Note]), TagsModule ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
