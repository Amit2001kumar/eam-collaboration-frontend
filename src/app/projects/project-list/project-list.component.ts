// FILE: src/app/projects/project-list/project-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects: any[] = [];
  teamId: any = null;
  senderId: any = null;

  constructor(private projectSvc: ProjectService, private router: Router) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.senderId = user.id;
    this.teamId = user.teamId;

    this.load();
  }

  load() {
    this.projectSvc.getProjects(this.teamId).subscribe((res: any) => this.projects = res || []);
  }

  create() {
    this.router.navigate(['/projects/0/edit']);
  }

  edit(p: any) {
    this.router.navigate(['/projects', p.id || p._id, 'edit']);
  }
}
