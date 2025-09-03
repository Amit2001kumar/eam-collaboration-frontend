import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';


const routes: Routes = [
  // Route to display the list of users
  { path: 'users', component: UserListComponent },

  // Route to display the user form for creating a new user
  { path: 'users/create', component: UserFormComponent },

  // Route to display the user details based on user ID
  // { path: 'users/:id', component: UserDetailComponent },

  // Route to edit user details based on user ID
  // { path: 'users/edit/:id', component: UserEditComponent },

  // Default route, can be redirected to user list or another page
  { path: '', redirectTo: '/users', pathMatch: 'full' },

  // Fallback route for unknown paths (optional)
  { path: '**', redirectTo: '/users' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
