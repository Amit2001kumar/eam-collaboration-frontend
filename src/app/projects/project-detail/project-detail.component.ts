import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.loadProjectDetail(projectId);
  }

  loadProjectDetail(projectId: any): void {
    this.projectService.getProjectById(projectId).subscribe(
      (data:any) => {
        this.project = data;
      },
      (error) => {
        console.error('Error loading project details:', error);
      }
    );
  }
}
