import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { Exclude } from 'class-transformer';

export class Mission {
  id?: number;

  @IsString({ message: 'description must be a string' })
  @IsNotEmpty({ message: 'description must not be an empty string' })
  description: string;

  @IsBoolean({ message: 'complete must be a boolean' })
  complete: boolean;

  @Exclude()
  created: string;

  constructor(partial: Partial<Mission>) {
    Object.assign(this, partial);
  }
}
