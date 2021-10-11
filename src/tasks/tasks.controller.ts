import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/model/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './model/task.entity';
import { ToLowerCase } from './pipes/lower-case.pipe';
import { TasksService } from './tasks.service';

@Controller('tasks') // This will handle requests to http://localhost:3000/tasks
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}
    
    @Post()
    async createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task>{
        return await this.tasksService.createTask(createTaskDto, user);
    }

    @Get()
    async getTasks(
        @Query() filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ) {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id') 
    async getTaskById(
        @Param('id') id: string,
        @GetUser() user: User    
    ) {
        return await this.tasksService.getTaskById(id, user);
    }

    @Patch('/:id/status')
    async updateTaskStatus(
        @Param('id') id: string, 
        //@Body('status') status: TaskStatus // Get property status from body object
        @Body() updateTaskStatusDto: UpdateTaskStatusDto,
        @GetUser() user: User
    ) {
        const {status} = updateTaskStatusDto;
        return await this.tasksService.updateTaskStatus(id, status, user);
    } 

    @Delete('/:id')
    async deleteTaskById(@Param('id') id: string, @GetUser() user: User) {
        return await this.tasksService.deleteTaskById(id, user);
    }

    @Post('/testCustomPipe')
    async testCustomPipe(
        @Body('description', ToLowerCase) description: string
    ) {
        return description;
    }
}
