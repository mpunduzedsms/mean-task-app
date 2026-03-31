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

    const editIndex = localStorage.getItem('editTaskIndex');

    if (editIndex !== null) {
      const tasks: any[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const index = Number(editIndex);
      const task = tasks[index];

      if (task) {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description
        });
      }
    }
  }

  onSubmit() {

    if (this.taskForm.valid) {

      const tasks: any[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const editIndex = localStorage.getItem('editTaskIndex');
      if (editIndex !== null) {
      //Edit Mode
      tasks[Number(editIndex)] = this.taskForm.value;
      localStorage.removeItem('editTaskIndex');
    } else {
      // Add Mode
      tasks.push(this.taskForm.value);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Saved Tasks:', tasks);

    this.taskForm.reset();
    this.router.navigate(['/tasks']);
  }
}
}