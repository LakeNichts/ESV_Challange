import { IsInt, IsOptional, IsPositive, IsString, MinLength, IsArray  } from 'class-validator'

export class CreateNoteDto{
    
    @IsInt()
    @IsPositive()
    @IsOptional()
    user_id?: number;
    
    @IsString()
    @MinLength(1)
    content: string;

    @IsOptional()
    is_archived?: boolean;

    @IsArray()
    @IsInt({ each: true })  
    @IsOptional()           
    tags?: number[];         
}