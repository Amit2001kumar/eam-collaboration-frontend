import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class TasksModule { }
