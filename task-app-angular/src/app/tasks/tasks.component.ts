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
  allTasks: any[] = [];
  searchText: string = '';


  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  testNav() {
    console.log('BUTTON CLICKED')
    this.router.navigate(['/add-task']);
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.allTasks = [...data]; // Store full list
        console.log('Task from API:', data);
      },
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  filterTasks() {
    const text = this.searchText.toLowerCase();
    this.tasks = this.allTasks.filter(task =>
      task.title.toLowerCase().includes(text) ||
      task.description.toLowerCase().includes(text)
    );
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