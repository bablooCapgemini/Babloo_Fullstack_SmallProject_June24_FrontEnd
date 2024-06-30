import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRecordPipe } from './search-record.pipe';
import { NotfoundcomponentComponent } from './components/notfoundcomponent/notfoundcomponent.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    CreateEmployeeComponent,
    ViewEmployeeComponent,
    EditEmployeeComponent,
    SearchRecordPipe,
    NotfoundcomponentComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
