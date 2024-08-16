import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from '../interface/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private apiURL = "http://localhost:8080";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private _httpClient: HttpClient) { }

  getAllEmployee(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(this.apiURL + '/employeeList')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteEmployee(id: number) {
    return this._httpClient.delete(this.apiURL + '/employeeList/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getEmployeeDetails(id: number): Observable<Employee> {
    return this._httpClient.get<Employee>(this.apiURL + '/employeeList/' + id + "/view", this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createEmployeeRecord(employee: Employee): Observable<Employee> {
    return this._httpClient.post<Employee>(this.apiURL + '/employeeList/create', JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this._httpClient.put<Employee>(this.apiURL + '/employeeList/' + id + "/edit", JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getEmployeesWithHighSalary(): Observable<any[]> {
    return this._httpClient.get<Employee[]>(this.apiURL + '/employeeList/salaryGreaterThan')
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
