import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import * as e from 'express';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  isAdmin: boolean = false;  

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService  
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.hasRole('Admin');  
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data.data;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  viewTask(taskId: number): void {
    this.router.navigate([`/tasks/view/${taskId}`]);
  }

  editTask(taskId: number): void {
    if (this.isAdmin) {
      this.router.navigate([`/tasks/edit/${taskId}`]);
    } else {
      alert('You are not authorized to edit this task.');
    }
  }

  deleteTask(taskId: any): void {
    if (this.isAdmin && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  addTask(): void {
    if (this.isAdmin) {
      this.router.navigate(['/tasks/insert']);
    } else {
      alert('You are not authorized to add a new task.');
    }
  }
}
