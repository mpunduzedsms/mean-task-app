import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

interface Task {
  title: string;
  description: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];

    console.log('Tasks loaded:', this.tasks);
  }



  // Delete Task
  deleteTask(index: number) {
      this.tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}