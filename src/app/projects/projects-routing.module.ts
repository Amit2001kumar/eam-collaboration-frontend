import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'] }
  },
  {
    path: 'insert',
    component: ProjectFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin' }
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'] }
  },
  {
    path: 'edit/:id',
    component: ProjectEditComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'Admin', mode: 'Edit' }
  },
  {
    path: 'view/:id',
    component: ProjectEditComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: ['Admin', 'User'], mode: 'View' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
