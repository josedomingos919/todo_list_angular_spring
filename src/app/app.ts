import { NgFor, NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NgFor, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('todo_list_angular_spring');

  todoList: TodoItem[] = [];
  newTask: string = '';

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        completed: false,
        task: this.newTask,
      };

      this.todoList.push(newTodoItem);

      this.newTask = '';
    }
  }

  addTaskByEnter(event: KeyboardEvent) {
    if (event.key == 'Enter') this.addTask();
  }

  toggleComplete(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed;
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter((e) => e.id !== id);
  }
}
