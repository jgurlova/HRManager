import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: AdminDashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'employee/add', component: AddEmployeeComponent, canActivate:[AuthGuard]},
  {path: 'employee/edit', component: EditEmployeeComponent, canActivate:[AuthGuard]},
  {path: 'employee/details', component: EmployeeDetailsComponent, canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
