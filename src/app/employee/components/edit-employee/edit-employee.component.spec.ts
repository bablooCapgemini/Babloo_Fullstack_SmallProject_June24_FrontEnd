import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmployeeComponent } from './edit-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interface/employee';


describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;

  let mockEmployeeService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;

  const mockEmployee: Employee = {
    id: 1,
    firstName: 'Babloo',
    lastName: 'Umashankar',
    email: 'babloo.babloo@capgemini.com',
    phone: 8850491117,
    salary: 50000,
    address: '123 Mumbai'
  };

  beforeEach(() => {
    mockEmployeeService = {
      getEmployeeDetails: jest.fn().mockReturnValue(of(mockEmployee)),
      updateEmployee: jest.fn().mockReturnValue(of({}))
    };
    mockActivatedRoute = {
      snapshot: { params: { id: mockEmployee.id } }
    };
    mockRouter = {
      navigateByUrl: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [EditEmployeeComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with employee data', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.controls['firstName'].value).toBe(mockEmployee.firstName);
    expect(component.form.controls['lastName'].value).toBe(mockEmployee.lastName);
    expect(component.form.controls['email'].value).toBe(mockEmployee.email);
    expect(component.form.controls['phone'].value).toBe(mockEmployee.phone);
    expect(component.form.controls['salary'].value).toBe(mockEmployee.salary);
    expect(component.form.controls['address'].value).toBe(mockEmployee.address);
  });

  it('should validate form fields', () => {
    const controls = [
      { name: 'firstName', initialValue: 'Babloo', invalidValue: '' },
      { name: 'lastName', initialValue: 'Umashankar', invalidValue: '' },
      { name: 'email', initialValue: 'babloo.babloo@capgemini.com', invalidValue: '' },
      { name: 'phone', initialValue: 8850491117, invalidValue: '' },
      { name: 'salary', initialValue: 50000, invalidValue: '' },
      { name: 'address', initialValue: '123 Main St, Anytown, USA', invalidValue: '' }
    ];

    controls.forEach(control => {
      const formControl = component.form.controls[control.name];      
      // Test invalid value
      formControl.setValue(control.invalidValue);
      expect(formControl.valid).toBeFalsy();
      expect(formControl.errors).toBeTruthy();
      expect(formControl.errors['required']).toBeTruthy();
      
      // Test valid value
      formControl.setValue(control.initialValue);
      expect(formControl.valid).toBeTruthy();
      expect(formControl.errors).toBeNull();
    });
  });

  it('should call updateEmployee and navigate on form submit', () => {
    component.form.setValue({
      firstName: 'Babloo',
      lastName: 'Umashankar',
      email: 'babloo.babloo@capgemini.com',
      phone: 8850491117,
      salary: 50000,
      address: 'Mumbai Airoli'
    });
    component.submit();
    expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith(mockEmployee.id, component.form.value);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('employeeList');
  });


  it('should handle error on form submit', () => {
    mockEmployeeService.updateEmployee.mockReturnValue(throwError(() => new Error('Update failed')));
    component.form.setValue({
      firstName: 'Babloo',
      lastName: 'Umashankar',
      email: 'babloo.babloo@capgemini.com',
      phone: 8850491117,
      salary: 50000,
      address: 'Mumbai Airoli'
    });

    component.submit();

    expect(mockEmployeeService.updateEmployee).toHaveBeenCalledWith(mockEmployee.id, component.form.value);
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });


  it('should navigate back to employee list on back button click', () => {
    const backButton = fixture.nativeElement.querySelector('a.btn-primary');
    backButton.click();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/employeeList');
  });


});
