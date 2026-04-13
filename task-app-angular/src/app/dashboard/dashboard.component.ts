import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: any[] = [];

  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;

      this.totalTasks = data.length;
      this.completedTasks = data.filter((t: any) => t.status === 'completed').length;
      this.pendingTasks = data.filter((t: any) => t.status !== 'completed').length;
    });
  }
}
