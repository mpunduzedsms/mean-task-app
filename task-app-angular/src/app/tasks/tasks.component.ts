import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {

  tasks: any[] = [];

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.loadTasks();
        this.router.navigate(['/tasks']);
        this.tasks = data;
        console.log('Task from API:', data);
      },
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }



  // Delete Task
  deleteTask(id: string): void {
    console.log("Deleting ID:", id); // for Debugging
      if (confirm('Are you sure you want to delete this task?')) {
        this.taskService.deleteTask(id).subscribe({
        next: () => {
          console.log("Deleted Successfuly");
          this.loadTasks(); // Refresh tasks after deletion
        },
        error: (err) => console.error('Error deleting task:', err)
      });

      }
}

  // Edit Task
  editTask(id: string): void{
    localStorage.setItem('editTaskId', id);
    this.router.navigate(['/add-task']);
  }

  addNewTask(): void {
    localStorage.removeItem('editTaskId');
    this.router.navigate(['/add-task']);
  }
}