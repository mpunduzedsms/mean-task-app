import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(this.taskForm.value);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.taskForm.reset();
      this.router.navigate(['/tasks']);
    }
  }
}
