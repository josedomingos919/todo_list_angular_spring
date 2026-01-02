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

  ngOnInit() {
    const saved = localStorage.getItem('@todoList');

    if (saved) {
      this.todoList = JSON.parse(saved);
    }
  }

  addTask(): void {
    if (this.newTask.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        completed: false,
        task: this.newTask,
      };

      this.todoList.push(newTodoItem);
      this.newTask = '';

      localStorage.setItem('@todoList', JSON.stringify(this.todoList));
    }
  }

  addTaskByEnter(event: KeyboardEvent) {
    if (event.key == 'Enter') this.addTask();
  }

  toggleComplete(index: number): void {
    this.todoList[index].completed = !this.todoList[index].completed;
    localStorage.setItem('@todoList', JSON.stringify(this.todoList));
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter((e) => e.id !== id);
    localStorage.setItem('@todoList', JSON.stringify(this.todoList));
  }
}
