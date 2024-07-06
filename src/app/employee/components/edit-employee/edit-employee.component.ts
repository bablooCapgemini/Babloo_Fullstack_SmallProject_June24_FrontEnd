import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../interface/employee';
import { EmployeeService } from '../../../services/employee.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  id!: number;
  emp!: Employee;
  form!: FormGroup;
  constructor(public _employeeService: EmployeeService, private router : Router, private route : ActivatedRoute ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this._employeeService.getEmployeeDetails(this.id).subscribe((data: Employee)=>{
      this.emp = data;
    }); 
      
    this.form = new FormGroup({
      firstName: new FormControl('', ([Validators.required , Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[a-zA-Z \-\']+')])),
      lastName: new FormControl('', ([Validators.required ,  Validators.minLength(3), Validators.maxLength(10), Validators.pattern('^[a-zA-Z \-\']+')])),
      email: new FormControl('',([Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])),
     phone: new FormControl('',([ Validators.required ,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])),
     salary: new FormControl('', ([Validators.required , Validators.min(5000)])),
      address: new FormControl('', Validators.required),
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this._employeeService.updateEmployee(this.id, this.form.value).subscribe((res:any) => {
         this.router.navigateByUrl('employeeList');
    })
  }

}
