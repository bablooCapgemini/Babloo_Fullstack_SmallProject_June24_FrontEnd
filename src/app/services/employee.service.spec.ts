import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { EmployeeService } from './employee.service';
import { Employee } from '../interface/employee'

describe('EmployeeService', () => {
  // let fixture: ComponentFixture<EmployeeService>;
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    const ObjEmployees: Employee[] = [];

    service.getAllEmployee().subscribe(employees => {
      expect(employees.length).toBe(2);
      expect(employees).toEqual(ObjEmployees);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/employeeList/`);
    expect(req.request.method).toBe('GET');
    req.flush(ObjEmployees);
  });

  it('should delete an employee', () => {
    const employeeId = 1;

    service.deleteEmployee(employeeId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['apiURL']}/employeeList/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should fetch employee details', () => {
    const ObjEmployee: Employee = { id: 1, firstName: 'John', lastName : 'Doe', email : '', phone: 999, salary : 20000, address : '' };

    service.getEmployeeDetails(ObjEmployee.id).subscribe(employee => {
      expect(employee).toEqual(ObjEmployee);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/employeeList/${ObjEmployee.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(ObjEmployee);
  });

  it('should create a new employee record', () => {
    const newEmployee: Employee = { id: 1, firstName: 'John', lastName : 'Doe', email : '', phone: 999, salary : 20000, address : '' };;

    service.createEmployeeRecord(newEmployee).subscribe(employee => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/employeeList/`);
    expect(req.request.method).toBe('POST');
    req.flush(newEmployee);
  });

  it('should update an existing employee record', () => {
    const updatedEmployee: Employee = { id: 1, firstName: 'John', lastName : 'Doe', email : '', phone: 999, salary : 20000, address : '' };

    service.updateEmployee(updatedEmployee.id, updatedEmployee).subscribe(employee => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(`${service['apiURL']}/employeeList/${updatedEmployee.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEmployee);
  });

  it('should handle errors', () => {
    const errorMessage = 'deliberate 404 error';

    service.getAllEmployee().subscribe(
      () => fail('expected an error, not employees'),
      error => {
        expect(error).toContain('404');
      }
    );

    const req = httpMock.expectOne(`${service['apiURL']}/employeeList/`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });



});
