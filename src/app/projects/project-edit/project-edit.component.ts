import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  EditprojectForm!: FormGroup;
  project: any;
  isLoading: boolean = false;
  error: string = '';
  mode: string = '';
  teamMembers: string[] = ['John Doe', 'Jane Smith', 'Alice Brown'];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.data['mode'];

    if (projectId) {
      this.isLoading = true;

      this.projectService.getProjectById(projectId).subscribe(
        (response) => {
          this.project = response.data[0];
          this.initializeForm();

          if (this.mode === 'View') {
            this.EditprojectForm.disable();
          }

          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          console.error('Error fetching project data', error);
        }
      );
    }
  }

  initializeForm(): void {
    this.EditprojectForm = this.fb.group({
      name: [this.project?.name || '', Validators.required],
      description: [this.project?.description || '', Validators.required],
      startDate: [this.project?.startDate || '', Validators.required],
      dueDate: [this.project?.dueDate || '', Validators.required],
      status: [this.project?.status || '', Validators.required],
      teamMember: [this.project?.teamMember || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.EditprojectForm.valid && this.mode === 'Edit') {
      this.isLoading = true;

      const updatedProject = {
        ...this.EditprojectForm.value,
        id: this.project.id,
        userId: this.authService.getUserDetails()?.id
      };

      this.projectService.updateProject(this.project.id, updatedProject).subscribe(
        (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/projects/projects']);
          } else {
            this.error = response.message;
          }
        },
        (error) => {
          this.isLoading = false;
          console.error('Error updating project', error);
        }
      );
    }
  }
}
