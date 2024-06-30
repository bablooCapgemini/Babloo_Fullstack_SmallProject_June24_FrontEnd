import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../../../services/employee.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { SearchRecordPipe } from '../../search-record.pipe'


describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  let employeeService: EmployeeService;

  const mockEmployeeList = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '1234567890', salary: 50000, address: '123 Main St' },
    { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', phone: '0987654321', salary: 60000, address: '456 Main St' }
  ];

  class MockEmployeeService {
    getAllEmployee() {
      return of(mockEmployeeList);
    }
    deleteEmployee(id: number) {
      return of({});
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent, SearchRecordPipe],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: EmployeeService, useClass: MockEmployeeService }
      ]
    });
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a list of employees', () => {
    expect(component.list.length).toBe(2);
    expect(component.list).toEqual(mockEmployeeList);
  });

  it('should render employee records in the table', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(2);
    expect(rows[0].nativeElement.textContent).toContain('John');
    expect(rows[1].nativeElement.textContent).toContain('Jane');
  });

  it('should filter employee records based on search text', () => {
    component.searchText = 'Jane';
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1); // Only one record matches the search
    expect(rows[0].nativeElement.textContent).toContain('Jane');
  });

  it('should call deleteEmployee and remove the employee from the list', () => {
    const initialLength = component.list.length;
    const deleteEmployeeSpy = jest.spyOn(employeeService, 'deleteEmployee').mockReturnValue(of({}));
    component.deleteData(1);
    expect(deleteEmployeeSpy).toHaveBeenCalledWith(1);
    expect(component.list.length).toBe(initialLength - 1);
  });

  it('should display "No record found" when the list is empty', () => {
    component.list = [];
    fixture.detectChanges();
    const noRecordMessage = fixture.debugElement.query(By.css('tbody tr td h4'));
    expect(noRecordMessage.nativeElement.textContent).toContain('No record found');
  });

});
