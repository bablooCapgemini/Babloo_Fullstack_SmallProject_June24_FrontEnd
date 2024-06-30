import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  form!: FormGroup;

  constructor(
    public _employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this._employeeService.createEmployeeRecord(this.form.value).subscribe((res:any) => {         
         this.router.navigateByUrl('employeeList');
    })
    // this._employeeService.createEmployeeRecord(this.form.value).subscribe({
    //   next: (res) => {
    //     this.router.navigateByUrl('employeeList');
    //     console.log(res);
    //     // this.submitted = true;
    //   },
    // })
 }
}
