import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  public employees: User[] = [];
  public employees_data: User[];
  public page = 1;
  public pageSize = 4;
  public collectionSize: number;
  public isLoading: boolean = true;

  constructor(
    private userService: UserService
  ) { }

  public ngOnInit(): void {
    this.getUsersList();
    this.subscribeToEmployeesPost(); 
  }

  public subscribeToEmployeesPost(): void {
    this.userService.updateList.subscribe(data => {
        if (data !== null){
          this.getUsersList();
        }   
      });
  }

  public refreshEmployees(): void {
    this.employees = this.employees_data
      .map((employee, i) => ({id: i + 1, ...employee}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      this.isLoading = false;
  }

  public getUsersList() : void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data)
     this.employees_data = data.empleados;
     this.collectionSize = this.employees_data.length;
     this.refreshEmployees();
   });
  }
   
}
