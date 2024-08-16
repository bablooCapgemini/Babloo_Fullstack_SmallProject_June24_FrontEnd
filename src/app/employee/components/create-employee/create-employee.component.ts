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
      firstName: new FormControl('', ([Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[a-zA-Z \-\']+')])),
      lastName: new FormControl('', ([Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[a-zA-Z \-\']+')])),
      email: new FormControl('', ([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
      phone: new FormControl('', ([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])),
      salary: new FormControl('', ([Validators.required, Validators.min(1000)])),
      address: new FormControl('', Validators.required),
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    console.log(this.form.value);
    this._employeeService.createEmployeeRecord(this.form.value).subscribe((res: any) => {
      console.log("Res =>", res);      
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
