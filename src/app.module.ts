import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-crgggdl6l47c73dvdceg-a.oregon-postgres.render.com',  
      port: 5432,
      username: 'esv_challange_postgressql_user',  
      password: 'zbJ0HWu71oyHR9HOsuG2aaqJ02mXnQPK',  
      database: 'esv_challange_postgressql',  
      entities: [Note],
      synchronize: true,
    }),
    NotesModule,
  ],
})
export class AppModule {}
