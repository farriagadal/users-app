import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: any = {
  }
  public validateForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  public ngOnInit(): void {
    this.initUserForm();
  }

  public initUserForm(): void {
    this.validateForm = new FormGroup({
      email: new FormControl(null, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.required]),
      password: new FormControl(null, [Validators.pattern("^(?=.*[a-z])(?=.*[A-Z]).{8,16}$"), Validators.required]),
    })
  }

  public loginUser(): void { 
    console.log(this.user)
    this.authService.loginUser(this.user.username, this.user.password).subscribe(data => {
      console.log(data);
      this.authService.setToken(data.token);
      this.authService.setUserFromJWT(data.token)
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
      if (error.status === 500) {
        this.showInternalError();
      } else {
        this.showGeneralError();
      }
    });
  }

  private showGeneralError(): void {
    this.toastr.error('Usuario o contraseña inválida', 'Error al ingresar');
  }

  private showInternalError(): void {
    this.toastr.error('Ha ocurrido un error en el servidor', 'Error 505');
  }
  

}
