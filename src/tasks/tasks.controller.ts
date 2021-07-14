import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks') // This will handle requests to http://localhost:3000/tasks
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(){
        return this.tasksService.getAllTasks();
    }
}
