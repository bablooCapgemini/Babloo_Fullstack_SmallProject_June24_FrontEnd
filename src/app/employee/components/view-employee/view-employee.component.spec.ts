import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ViewEmployeeComponent } from './view-employee.component';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../interface/employee';
import { By } from '@angular/platform-browser';

describe('ViewEmployeeComponent', () => {
  let fixture: ComponentFixture<ViewEmployeeComponent>;
  let component: ViewEmployeeComponent;
  let service: EmployeeService;
  let route: ActivatedRoute;

  const mockEmployee: Employee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: 123 - 456 - 7890,
    salary: 50000,
    address: '123 Main St, Anytown, USA'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewEmployeeComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getEmployeeById: jest.fn().mockReturnValue(of(mockEmployee))
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: mockEmployee.id })
          }
        }]
    });
    service = TestBed.inject(EmployeeService);
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ViewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display employee details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Employee Details');
    expect(compiled.querySelector('td:nth-child(1)').textContent).toContain(1);
    expect(compiled.querySelector('td:nth-child(2)').textContent).toContain('firstName');
    expect(compiled.querySelector('td:nth-child(3)').textContent).toContain('lastName');
    expect(compiled.querySelector('td:nth-child(4)').textContent).toContain('email');
    expect(compiled.querySelector('td:nth-child(5)').textContent).toContain('phone');
    expect(compiled.querySelector('td:nth-child(6)').textContent).toContain('salary');
    expect(compiled.querySelector('td:nth-child(7)').textContent).toContain('address');
  });

  it('should navigate back to employee list', () => {
    const backButton = fixture.nativeElement.querySelector('.btn-primary');
    expect(backButton).toBeTruthy();
    expect(backButton.getAttribute('routerLink')).toBe('/employeeList');
  });

});
