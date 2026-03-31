import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}


  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    this.tasks = savedTasks ? JSON.parse(savedTasks) : [];

    console.log('Tasks loaded:', this.tasks);
  }



  // Delete Task
  deleteTask(index: number) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

      tasks.splice(index, 1) //remove task
      localStorage.setItem('tasks', JSON.stringify(tasks));

      this.tasks = tasks; // Refresh UI

}

  // Edit Task
  editTask(index: number) {

    localStorage.setItem('editTaskIndex', index.toString());
    this.router.navigate(['/add-task']);
  }
}