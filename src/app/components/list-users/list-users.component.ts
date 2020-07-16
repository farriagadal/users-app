import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  employees: any[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsersList();
    this.subscribeToEmployeesPost();
  }

  public subscribeToEmployeesPost(): void {
    // this.childMessage.subscribe(data => {
    //   if (data !== null){
    //     this.getUsersList();
    //   }   
    // });
    this.userService.updateList.subscribe(data => {
        if (data !== null){
          this.getUsersList();
        }   
      });
  }


  public getUsersList() : void {
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data)
     this.employees = data.empleados;
   });
  }
   
  // countries = [
  //   {
  //     id: 1,
  //     name: 'Russia',
  //     flag: 'f/f3/Flag_of_Russia.svg',
  //     area: 17075200,
  //     population: 146989754
  //   },
  //   {
  //     id: 2,
  //     name: 'Canada',
  //     flag: 'c/cf/Flag_of_Canada.svg',
  //     area: 9976140,
  //     population: 36624199
  //   },
  //   {
  //     id: 3,
  //     name: 'United States',
  //     flag: 'a/a4/Flag_of_the_United_States.svg',
  //     area: 9629091,
  //     population: 324459463
  //   },
  //   {
  //     id: 4,
  //     name: 'China',
  //     flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
  //     area: 9596960,
  //     population: 1409517397
  //   }
  // ];
  

}
