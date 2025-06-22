import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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
      await this.authService.signup(email, password);
      this.router.navigate(['/login']);
    } catch {
      this.error = 'Sign up failed.';
    } finally {
      this.loading = false;
    }
  }
}
