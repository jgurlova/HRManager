import { Component, OnInit } from '@angular/core';
import { Employee } from "../../models/Employee";

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

  constructor() { }

  ngOnInit() {
  }

}
