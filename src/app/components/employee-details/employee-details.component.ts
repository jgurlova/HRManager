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
  employee_retirement = 0;
  public monthlySalary = 0;
  // Doughnut
  public doughnutChartLabels:string[] = ['Retirement', 'Taxes', 'Take Home'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';

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
      this.doughnutChartData = [employee['retirement'],employee['taxes'],( (employee['salary'] / 12) - employee['retirement'] - employee['taxes'] )]
      this.monthlySalary = employee['salary'] / 12
    })
  }

  updateSalary(){
    this.employeeService.updateEmployee(this.employee);
  }

  onDeleteClick(){
    if(confirm('Are you sure?')){
      this.employeeService.deleteEmployee(this.employee);
      }
      this.router.navigate(['/']);
  }

}
