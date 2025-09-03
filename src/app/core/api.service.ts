
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private get headers() {
    const token = localStorage.getItem('jwt_token') || '';
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  // Teams (extend as needed)
  getTeams(): Observable<any> { return this.http.get(`${this.baseUrl}/teams`, this.headers); }

  // Projects
  getProjects(teamId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/projects?teamId=${teamId}`, this.headers);
  }
  createProject(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/projects`, data, this.headers);
  }
  updateProject(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/projects/${id}`, data, this.headers);
  }
  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/projects/${id}`, this.headers);
  }

  // Tasks
  getTasks(projectId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tasks?projectId=${projectId}`, this.headers);
  }
  createTask(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tasks`, data, this.headers);
  }
  updateTask(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/tasks/${id}`, data, this.headers);
  }
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/tasks/${id}`, this.headers);
  }

  // Messages
  getMessages(teamId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages?teamId=${teamId}`, this.headers);
  }
  sendMessage(team_id: string, content: string, sender_id?: string): Observable<any> {
    console.log(team_id, content, sender_id);
    return this.http.post(`${this.baseUrl}/messages`, { team_id, content, sender_id }, this.headers);
  }

  // Assistant
  askAssistant(prompt: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/assistant/ask`, { prompt }, this.headers);
  }

  // Auth (backing endpoints)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }
  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, { name, email, password, role });
  }
}
