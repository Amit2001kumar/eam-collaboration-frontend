import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  id: string | null = null;
  name = '';
  description = '';
  teamId: any = null;
  senderId: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private projectSvc: ProjectService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.senderId = user.id;
    this.teamId = user.teamId;
  }

  save() {
    const payload = { teamId: this.teamId, name: this.name, description: this.description };
    if (!this.id || this.id === '0') {
      this.projectSvc.createProject(payload).subscribe(() => this.router.navigate(['/projects']));
    } else {
      this.projectSvc.updateProject(this.id, payload).subscribe(() => this.router.navigate(['/projects']));
    }
  }
}
