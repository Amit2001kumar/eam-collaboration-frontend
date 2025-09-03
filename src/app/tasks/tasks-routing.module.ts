import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { RoleGuard } from '../guards/role.guard'; 

const routes: Routes = [
  {
    path: 'tasks',
    component: TaskListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'] }
  },
  {
    path: 'insert',
    component: TaskFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'] }
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'], mode: 'Edit' }
  },
  {
    path: 'view/:id',
    component: TaskEditComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'], mode: 'View' }
  },
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
