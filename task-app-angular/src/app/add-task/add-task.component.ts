import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit{
  taskForm!: FormGroup;
  editTaskId: string | null = null;

  constructor(
    private TaskService: TaskService,
    private router: Router,
    private  fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Create Form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.editTaskId = localStorage.getItem('editTaskId');

    //Load Data if Editing
    if (this.editTaskId) {
      this.TaskService.getTaskById(this.editTaskId).subscribe({
        next: (data) => {
          this.taskForm.patchValue({
            title: data.title,
            description: data.description
          });
        },
        error: (err) => console.error(err)
      });
    }

  }

  saveTask(): void {
    console.log("Saving Task");

    // VALIDATION
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const taskData = this.taskForm.value;

    if (this.editTaskId) {
      // UPDATE
      this.TaskService.updateTask(this.editTaskId, taskData).subscribe({
        next: () => {
          localStorage.removeItem('editTaskId');
          this.router.navigate(['/tasks']);
        },
        error: (err) => console.log('Error updating task:', err)
      });
    } else {
      // CREATE
      this.TaskService.addTask(taskData).subscribe({
        next: () => {
          this.taskForm.reset(); // reset form
          this.router.navigate(['/tasks']);
          console.log("Navigating....");
        },
        error: (err) => console.log('Error adding task:', err)
      });
    }
  }
}
