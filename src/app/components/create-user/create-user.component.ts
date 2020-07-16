import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public validateForm: FormGroup;
  public employee: User;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private modalService: NgbModal,
    ) {}


  ngOnInit(): void {
    this.employee = new User;
    this.initUserForm();
  }

  
  public initUserForm(): void {
    this.validateForm = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      apellido: new FormControl(null, Validators.required),
      run: new FormControl(null, Validators.required),
    })
  }

  closeResult = '';
  @ViewChild('content', {static: false}) inputNewMilestone: ElementRef; 
  
  open() {
    this.modalService.open(this.inputNewMilestone).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public createUser(): void {
    if (this.validateForm.status == 'VALID') {
      this.userService.createUser(this.employee).subscribe(data => {
          console.log(data)
          this.open();
      }, error => {
        console.log(error);
        this.open();
      });
    } else {
      alert('campos incompletos')
    }
  }



}
