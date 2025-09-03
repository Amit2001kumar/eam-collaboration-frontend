import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  allProjects: any[] = [];
  projects: any[] = [];
  isAdmin = false;
  errorMessage: string = '';
  teamMembers: string[] = ['John Doe', 'Jane Smith', 'Alice Brown'];

  filters = {
    status: '',
    teamMember: '',
    dueDate: ''
  };

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getUserDetails();
    this.isAdmin = user?.role === 'Admin';
    // this.loadProjects();
    this.fetchProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data: any) => {
        this.projects = data;
      },
      (error) => {
        this.errorMessage = 'An error occurred while loading projects. Please try again later.';
        console.error('Error loading projects:', error);
      }
    );
  }

  fetchProjects(): void {
    this.projectService.getAllProjects().subscribe((res: any) => {
      this.allProjects = res.data;
      this.projects = [...this.allProjects];
      this.extractUniqueTeamMembers();
    });
  }

  extractUniqueTeamMembers(): void {
    const members = this.allProjects.map(p => p.teamMember).filter(Boolean);
    this.teamMembers = Array.from(new Set(members));
  }

  applyFilters(): void {
    this.projects = this.allProjects.filter(project => {
      const matchStatus = !this.filters.status || project.status === this.filters.status;
      const matchMember = !this.filters.teamMember || project.teamMember === this.filters.teamMember;
      const matchDate = !this.filters.dueDate || project.dueDate === this.filters.dueDate;
      return matchStatus && matchMember && matchDate;
    });
  }

  clearFilters(): void {
    this.filters = { status: '', teamMember: '', dueDate: '' };
    this.projects = [...this.allProjects];
  }

  viewProject(projectId: string): void {
    this.router.navigate([`/projects/view/${projectId}`]);
  }

  editProject(projectId: string): void {
    if (this.isAdmin) {
      this.router.navigate([`/projects/edit/${projectId}`]);
    } else {
      alert('You are not authorized to edit this project.');
    }
  }

  deleteProject(projectId: string): void {
    if (this.isAdmin && confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe(
        () => {
          this.loadProjects();
          alert('Project deleted successfully');
        },
        (error) => {
          this.errorMessage = 'Failed to delete the project. Please try again later.';
          console.error('Error deleting project:', error);
        }
      );
    } else if (!this.isAdmin) {
      alert('You are not authorized to delete this project.');
    }
  }

  addProject(): void {
    if (this.isAdmin) {
      this.router.navigate(['/projects/insert']);
    } else {
      alert('You are not authorized to add a new project.');
    }
  }
}
