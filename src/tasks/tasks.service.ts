import { HttpException, Injectable } from '@nestjs/common';

import { TASKS } from '../mocks/tasks.mock';
import { Task } from './models/tasks.model';
import { AddTaskInput } from './dto/add-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
  tasks: Task[] = TASKS;

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  async addTask(input: AddTaskInput): Promise<Task[]> {
    const lastTask = this.tasks.slice(-1).pop();
    const task: Task = {
      id: (Number(lastTask.id) + 1).toString(),
      title: input.title,
      description: input.description,
      completed: false,
    };

    this.tasks.push(task);
    return this.tasks;
  }

  updateTask({ id, completed }: UpdateTaskInput): Task {
    const taskIndex = this.tasks.findIndex(item => item.id === id);

    if (taskIndex === -1) {
      throw new HttpException('Task not found', 404);
    }

    this.tasks[taskIndex].completed = completed;
    console.log('this.tasks[taskIndex] >', this.tasks[taskIndex]);
    return this.tasks[taskIndex];
  }

  deleteTask(id: string): Task[] {
    const taskIndex = this.tasks.findIndex(item => item.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', 404);
    }

    this.tasks.splice(taskIndex, 1);
    return this.tasks;
  }
}
