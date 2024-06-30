import { Component } from '@angular/core';
import { Employee } from '../../../interface/employee';
// import { EmployeeService } from '../../services/employee.service';
import { EmployeeService } from '../../../services/employee.service';
import { SearchRecordPipe } from '../../search-record.pipe'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  list: Employee[] = [];
  searchText: string;
  noDate  : string;
  constructor(public _employeeService: EmployeeService) { }

  ngOnInit(): void {
    this._employeeService.getAllEmployee().subscribe((data: Employee[]) => {
      this.list = data;
      console.log(this.list);      
    })
  }
  deleteData(id: number) {
    this._employeeService.deleteEmployee(id).subscribe(res => {
      this.list = this.list.filter(item => item.id !== id);
      console.log('Employee Record deleted successfully!');
    })
  }

}
