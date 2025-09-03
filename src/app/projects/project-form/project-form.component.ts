import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import * as e from 'express';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  isLoading: boolean = false;
  error: string = '';
  teamMembers: string[] = ['John Doe', 'Jane Smith', 'Alice Brown'];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['open', Validators.required],
      teamMember: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formData = {
      ...this.projectForm.value,
      userId: this.authService.getUserDetails()?.id
    };

    this.projectService.createProject(formData).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/projects/projects']);
        } else {
          this.error = response.message
        }

      },
      error: (error) => {
        console.error('Error creating project:', error);
      }
    });
  }
}
