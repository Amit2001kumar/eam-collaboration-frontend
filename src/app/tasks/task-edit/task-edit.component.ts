import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent {
  EdittaskForm!: FormGroup;
  isLoading: boolean = false;
  error: string = '';
  mode: string = '';
  task: any;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    this.mode = this.route.snapshot.data['mode'] || 'Edit';

    if (taskId) {
      this.isLoading = true;

      this.taskService.getTaskById(taskId).subscribe(
        (response) => {
          this.task = response.data;
          this.initializeForm();

          if (this.mode === 'View') {
            this.EdittaskForm.disable();
          }

          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.error = 'Error fetching task data. Please try again.';
          console.error('Error fetching task data', error);
        }
      );
    }
  }

  initializeForm(): void {
    this.EdittaskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      description: [this.task?.description || '', Validators.required],
      priority: [this.task?.priority || '', Validators.required],
      status: [this.task?.status || '', Validators.required],
      dueDate: [this.task?.dueDate || '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.EdittaskForm.invalid) {
      return;  
    }

    if (this.mode === 'Edit') {
      this.isLoading = true;

      const updateTask = {
        ...this.EdittaskForm.value,
        id: this.task.id,
        userId: this.authService.getUserDetails()?.id
      };

      this.taskService.updateTask(this.task.id, updateTask).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/tasks']);  
        },
        (error) => {
          this.isLoading = false;
          this.error = 'Error updating task. Please try again.';
          console.error('Error updating task:', error);
        }
      );
    }
  }

  onCancel(): void {
    if (this.EdittaskForm.dirty) {
      const confirmCancel = confirm('You have unsaved changes. Do you want to discard them?');
      if (confirmCancel) {
        this.router.navigate(['/tasks/tasks']);
      }
    } else {
      this.router.navigate(['/tasks/tasks']);
    }
  }
}
