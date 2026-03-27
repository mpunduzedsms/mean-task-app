import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; // placeholder

  constructor(private http: HttpClient) {}
  private tasks: any[] = [];

  getTasks() {
    this.tasks;
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(task: any): Observable<any>{
    this.tasks.push(task);
    return this.http.post<any>(this.apiUrl, task);
  }

  saveTasks(tasks: any[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
