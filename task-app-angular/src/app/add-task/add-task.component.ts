import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  task = {
    title: '',
    description: ''
  };

  editTaskId: string | null = null;

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.editTaskId = localStorage.getItem('editTaskId');

    if (this.editTaskId) {
      this.taskService.getTaskById(this.editTaskId).subscribe({
        next: (data) => {
          this.task = data;
        },
        error: (err) => console.error(err)
      });
    }
  }

  saveTask(): void{
    console.log("Saving Task")

    if (this.editTaskId) {
      // UPDATE existing task
      this.taskService.updateTask(this.editTaskId, this.task).subscribe({
        next: () => {
          localStorage.removeItem('editTaskId');
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.error('Error updating task:', err)
      });
    } else {
      // CREATE new task
      this.taskService.addTask(this.task).subscribe({
        next: () => {
          this.task = { title: '', description: '' };

          this.router.navigate(['/tasks']);
          console.log("Navigating...");
        },
        error: (err) => console.error('Error adding task:', err)
      });
    }
  }
}
