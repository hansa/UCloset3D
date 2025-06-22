import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  error?: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async submit() {
    if (this.form.invalid) {
      return;
    }

    this.error = undefined;
    this.loading = true;
    const { email, password } = this.form.value;

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/upload-photo']);
    } catch {
      this.error = 'Login failed.';
    } finally {
      this.loading = false;
    }
  }
}
