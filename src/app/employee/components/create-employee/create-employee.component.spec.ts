import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEmployeeComponent } from './create-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';


describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let fixture: ComponentFixture<CreateEmployeeComponent>;
  let employeeService: EmployeeService;
  let router: Router;
  class MockEmployeeService {
    createEmployeeRecord() {
      return of({});
    }
  }
  class MockRouter {
    navigateByUrl(url: string) { return url; }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEmployeeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService },
        { provide: Router, useClass: MockRouter }
      ]
    });
    fixture = TestBed.createComponent(CreateEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize the form with empty values and required validators', () => {
    const form = component.form;
    expect(form).toBeDefined();
    expect(form.get('firstName').value).toBe('');
    expect(form.get('firstName').hasError('required')).toBe(true);
    expect(form.get('lastName').value).toBe('');
    expect(form.get('lastName').hasError('required')).toBe(true);
    expect(form.get('email').value).toBe('');
    expect(form.get('email').hasError('required')).toBe(true);
    expect(form.get('phone').value).toBe('');
    expect(form.get('phone').hasError('required')).toBe(true);
    expect(form.get('salary').value).toBe('');
    expect(form.get('salary').hasError('required')).toBe(true);
    expect(form.get('address').value).toBe('');
    expect(form.get('address').hasError('required')).toBe(true);
    
  });

  it('should invalidate the form if required fields are missing', () => {
    component.form.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      salary: '',
      address: ''
    });
    expect(component.form.valid).toBeFalsy();
  });

  it('should validate the form if all required fields are provided', () => {
    component.form.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      salary: '',
      address: ''
    });
    expect(component.form.valid).toBeTruthy();
  });

  it('should call createEmployeeRecord and navigate to employeeList on form submit', () => {
    const employeeData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      salary: '',
      address: ''
    };

    component.form.patchValue(employeeData);
    // const createEmployeeRecordSpy = jest.spyOn(employeeService, 'createEmployeeRecord').mockReturnValue(of(employeeData));
    const createEmployeeRecordSpy = jest.spyOn(employeeService, 'createEmployeeRecord');
    const navigateByUrlSpy = jest.spyOn(router, 'navigateByUrl');
    component.submit();
    expect(createEmployeeRecordSpy).toHaveBeenCalledWith(employeeData);
    expect(navigateByUrlSpy).toHaveBeenCalledWith('employeeList');
  });
});
