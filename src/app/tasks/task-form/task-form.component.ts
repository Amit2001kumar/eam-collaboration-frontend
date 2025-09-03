import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['medium', Validators.required],
      status: ['to-do', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe(
        (response) => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/tasks']);
  }

  get title() {
    return this.taskForm.get('title');
  }

  get priority() {
    return this.taskForm.get('priority');
  }

  get status() {
    return this.taskForm.get('status');
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }
}
