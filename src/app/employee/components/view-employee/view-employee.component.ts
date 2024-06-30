import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../interface/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {

  id: number;
  empData: Employee;

  constructor(public _employeeService: EmployeeService, private router : Router, private route : ActivatedRoute ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];       
    this._employeeService.getEmployeeDetails(this.id).subscribe((data: Employee)=>{
      this.empData = data;
    });
  }
  
}
