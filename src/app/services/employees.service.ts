import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Employee } from '../models/Employee';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeesService {
  employeesCollection: AngularFirestoreCollection<Employee>;
  employeesDoc: AngularFirestoreDocument<Employee>;
  employees: Observable<Employee[]>;
  employee: Observable<Employee>;

  constructor(private afs: AngularFirestore) { 
    this.employeesCollection = this.afs.collection('employees',
    ref => ref.orderBy('lastName', 'asc'));
  }

  getEmployees(): Observable<Employee[]> {
    //Get employees with the id
    this.employees = this.employeesCollection.snapshotChanges().pipe(
    map(changes =>{
      return changes.map(action => {
        const data = action.payload.doc.data() as Employee;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.employees;
  } 

  newEmployee(employee: Employee){
    this.employeesCollection.add(employee);
  }  

  getEmployee(id: string): Observable<Employee> {
    this.employeesDoc = this.afs.doc<Employee>(`employees/${id}`);
    this.employee = this.employeesDoc.snapshotChanges().pipe(
      map(action => {
      if(action.payload.exists === false){
        return null;
      }
      else{
        const data = action.payload.data() as Employee;
        data.id = action.payload.id;
        return data;
      }
    }))
    return this.employee;
  }

  updateEmployee(employee: Employee){
    this.employeesDoc = this.afs.doc(`employees/${employee.id}`);
    this.employeesDoc.update(employee);
  }

}
