import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private api: ApiService) {}
  getTasks(projectId: string) { return this.api.getTasks(projectId); }
  createTask(data: any) { return this.api.createTask(data); }
  updateTask(id: string, data: any) { return this.api.updateTask(id, data); }
  deleteTask(id: string) { return this.api.deleteTask(id); }
}
