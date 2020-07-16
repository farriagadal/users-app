import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private modalService: NgbModal,
    private authService: AuthService
    ) {}

  open() {
    const modalRef = this.modalService.open(CreateUserComponent);
    modalRef.componentInstance.name = 'World';
  }

  public logOut(): void {
    this.authService.logoutUser();
  }

  ngOnInit(): void {
  }

}
