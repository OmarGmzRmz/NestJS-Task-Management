import { IsNotEmpty } from "class-validator";

// Class validator documantation : 

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}