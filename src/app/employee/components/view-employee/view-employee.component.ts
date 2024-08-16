import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../interface/employee';
import { EmployeeService } from '../../../services/employee.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {


  empId: number;
  empData: Employee | null = null; // Initialize empData as null to avoid undefined issues

  constructor(private _employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['id'];
    console.log("Route parameter ID =>", this.empId);

    this._employeeService.getEmployeeDetails(this.empId).subscribe(data => {
      console.log("Fetched Employee Data =>", data);
      this.empData = data;
      this.cd.detectChanges(); // Ensure Angular updates the view
      console.log("Employee ID =>", data.id);
      this.empId = data.id;
    }, error => {
      console.error("Error fetching employee details:", error);
    });
  }

}
