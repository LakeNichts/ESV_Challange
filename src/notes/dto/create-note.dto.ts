import { IsInt, IsOptional, IsPositive, IsString, MinLength } from 'class-validator'

export class CreateNoteDto{
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    user_id?: number;

    @IsString()
    @MinLength(1)
    title: string;
    
    @IsString()
    @MinLength(1)
    content: string;
}