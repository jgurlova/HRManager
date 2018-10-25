import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Employee } from "../../models/Employee";
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  id: string;
  employee: Employee;
  showSalaryUpdateInput: boolean = false;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit() {
    //Get ID from URL
    this.id = this.route.snapshot.params['id'];
    //Get client
    this.employeeService.getEmployee(this.id).subscribe(employee => {
      this.employee = employee;
    })
  }

  updateSalary(){
    this.employeeService.updateEmployee(this.employee);
  }

}
