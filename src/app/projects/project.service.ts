import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  constructor(private api: ApiService) {}

  getProjects(teamId: string) { return this.api.getProjects(teamId); }
  createProject(data: any) { return this.api.createProject(data); }
  updateProject(id: string, data: any) { return this.api.updateProject(id, data); }
  deleteProject(id: string) { return this.api.deleteProject(id); }
}
