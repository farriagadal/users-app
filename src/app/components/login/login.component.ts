import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
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
      alert('error');
      console.log(error)
    });
  }
  

}
