import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiBaseUrl}/tasks`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Common method to generate auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Get all tasks
  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/list`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get task by ID
  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getById/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Create new task
  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/insert`, task, {
      headers: this.getAuthHeaders()
    });
  }

  // Update task by ID
  updateTask(id: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, task, {
      headers: this.getAuthHeaders()
    });
  }

  // Delete task by ID
  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get task summary
  getTaskSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`, {
      headers: this.getAuthHeaders()
    });
  }

  // Get upcoming deadlines
  getUpcomingDeadlines(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/upcoming-deadlines`, {
      headers: this.getAuthHeaders()
    });
  }
}
