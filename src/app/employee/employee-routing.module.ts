import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { NotfoundcomponentComponent } from './components/notfoundcomponent/notfoundcomponent.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const routes: Routes = [  
  { path: 'employeeList', component: EmployeeListComponent },
  { path: 'employeeList/:id/view', component: ViewEmployeeComponent },
  { path: 'employeeList/create', component: CreateEmployeeComponent },
  { path: 'employeeList/:id/edit', component: EditEmployeeComponent },
  { path: '', redirectTo: 'employeeList', pathMatch: 'full'},
  { path: '**', component: NotfoundcomponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
