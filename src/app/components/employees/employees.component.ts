import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/Employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeesService) { }

  ngOnInit() {
    this.employeeService.getEmployee().subscribe(employees => console.log(employees));
  }

}
