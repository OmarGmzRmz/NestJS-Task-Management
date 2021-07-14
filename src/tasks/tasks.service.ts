import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Array<Task> = [
        {
            id: '1',
            title: 'Math',
            description: 'hacer las ecuaciones',
            status: TaskStatus.OPEN
        }
    ];
    async getAllTasks(): Promise<Array<Task>> {
        return this.tasks;
    }
}
