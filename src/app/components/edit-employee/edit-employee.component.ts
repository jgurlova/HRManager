import { Component, OnInit } from '@angular/core';
import { EmployeesService } from "../../services/employees.service";
import { Employee } from "../../models/Employee";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id: string;
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    salary: 0

  }

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService, 
  ) { }

  ngOnInit() {
        //Get ID from URL
        this.id = this.route.snapshot.params['id'];
        //Get client
        this.employeeService.getEmployee(this.id).subscribe(employee => this.employee = employee);        
  }

  onSubmit({value, valid}: {value: Employee, valid: boolean}) {
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      //Add id to employee
      value.id = this.id;

      //Update employee
      this.employeeService.updateEmployee(value);

      this.router.navigate(['/employee/details/'+this.id]);//This is not rerouting correctly
    }

  }
}
