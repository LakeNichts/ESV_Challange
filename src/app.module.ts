import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal:true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,  
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,  
      password: process.env.POSTGRES_PASSWORD,  
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,  
      synchronize: true,
      ssl: process.env.POSTGRES_SSL === "TRUE",
      extra:{
        ssl:
        process.env.POSTGRES_SSL === "TRUE" ? {
          rejectUnauthorized : false,
        }
        :
        null
      }
    }),
    NotesModule,
  ],
})
export class AppModule {}
