import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './model/task.entity';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { User } from 'src/auth/model/user.entity';
import { identity } from 'rxjs';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    private tasks: Array<Task> = [
     /*    {
            id: uuid(),
            title: 'Math',
            description: 'resolver las ecuaciones',
            status: TaskStatus.OPEN
        } */
    ];

    /* async getAllTasks(): Promise<Array<Task>> {
        return this.tasks;
    }

    async getTaskWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        let tasks = await this.getAllTasks();
        if (status) {
            tasks = tasks.filter((task: Task) => task.status === status);
        }
        if (search) {
            tasks = tasks.filter((task: Task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()));
        }
        return tasks;
    } */

    async getTasks(filterDto: GetTasksFilterDto, user : User): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto, user);
    }

    async createTask(createTaskDto: CreateTaskDto, user : User): Promise<Task> {
        /* const id = uuid();
        const newTask: Task = {
            id: id.toString(),
            title: createTaskDto.title,
            description: createTaskDto.description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(newTask);
        return newTask; */
        return this.tasksRepository.createTask(createTaskDto, user);
    }

    async getTaskById(taskId : string, user: User): Promise<Task> {
        /* const found = this.tasks.find((task: Task) => task.id === taskId);
        if (!!found) {
            return this.tasks.find((task: Task) => task.id === taskId);
        } else {
            throw new NotFoundException(`Cannot retrieve task. Task with id ${taskId} not found`);
            
        } */

        const found =  this.tasksRepository.findOne({ where: {id: taskId, user}});
        if (!found) {
            throw new NotFoundException(`Task with id ${taskId} not found`);
        }
        return found;
    }

    async deleteTaskById(taskId: string, user: User): Promise<Task> {
       /*  const task =  this.tasks.find((x: Task) => x.id === taskId);
        if (task) {
            this.tasks = this.tasks.filter((x: Task) => x.id !== taskId);
            return task;
        } else {
            throw new NotFoundException(`Cannot delete task. Task with id ${taskId} not found`);       
        } */
        const task = await this.getTaskById(taskId, user);
        if (task) {
            const result: DeleteResult = await this.tasksRepository.delete(taskId);
            if (result.affected == 1) {
                return task;
            } else {
                throw new NotFoundException(`Cannot delete task. None or more than one row would be affected`);
            }
        } else {
            throw new NotFoundException(`Cannot delete task. Task with id ${taskId} not found`);
            
        }
    
    } 

   /*  async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(taskId);
        task.status = status;
        return task;
    } */

    async updateTaskStatus(taskId: string, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(taskId, user);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    /* private getNewId(): number {
        return this.tasks.length + 1;
    } */
}
