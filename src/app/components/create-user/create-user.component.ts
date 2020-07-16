import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
  ) {}


  public ngOnInit(): void {
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

  public createUser(): void {
    if (this.validateForm.status == 'VALID') {
      this.userService.createUser(this.employee).subscribe(data => {
          console.log(data)
          this.showSuccessCreation();
      }, error => {
        console.log(error);
        if (error.status === 500) {
          this.showInternalError();
        } else if (error.status === 401) {
          this.showUnauthorizedError();
        } else {
          this.showGeneralError();
        }
      });
      this.activeModal.dismiss();
    } else {
      this.showInputRequired()
    }
  }

  private showGeneralError(): void {
    this.toastr.error('Error', 'Ha ocurrido un error en el servidor');
  }

  private showUnauthorizedError(): void {
    this.toastr.error('Error 401', 'Su sesión ha expirado');
  }

  private showInternalError(): void {
    this.toastr.error('Error 505', 'Ha ocurrido un error en el servidor');
  }

  private showSuccessCreation(): void {
    this.toastr.success('Empleado Creado', 'Se ha creado un empleado con exito!');
  }

  private showInputRequired(): void {
    this.toastr.info('Ingrese todos los datos', 'Debe ingresar correctamente los datos');
  }

}
