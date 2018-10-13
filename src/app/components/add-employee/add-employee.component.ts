import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from "../../models/Employee";
import { FlashMessagesService } from "angular2-flash-messages";
import { EmployeesService } from "../../services/employees.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    salary: 0
  }  

  @ViewChild('employeeForm') form: any;
  
  constructor(
    private flashMessage: FlashMessagesService, 
    private employeeService: EmployeesService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  onSubmit({value, valid}: {value: Employee, valid: boolean}) {
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      this.employeeService.newEmployee(value);

      this.router.navigate(['/']);
    }

  }

}
