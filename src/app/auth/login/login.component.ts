import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'n-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(console.log);
  }
}
