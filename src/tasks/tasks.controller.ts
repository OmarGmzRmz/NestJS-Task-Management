import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { ToLowerCase } from './pipes/lower-case.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks') // This will handle requests to http://localhost:3000/tasks
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getAllTasks(@Query() filterDto: GetTasksFilterDto) {
        if (Object.keys(filterDto).length) {
            return await this.tasksService.getTaskWithFilters(filterDto);
        } else {
            return await this.tasksService.getAllTasks();
        }
    }

    @Get('/:id') 
    async getTaskById(@Param('id') id: string) {
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto ){
        return await this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    async deleteTaskById(@Param('id') id: string) {
        return await this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id') id: string, 
        //@Body('status') status: TaskStatus // Get property status from body object
        @Body() updateTaskStatusDto: UpdateTaskStatusDto
    ) {
        const {status} = updateTaskStatusDto;
        return await this.tasksService.updateTaskStatus(id, status);
    } 

    @Post('/testCustomPipe')
    async testCustomPipe(
        @Body('description', ToLowerCase) description: string
    ) {
        return description;
    }
}
