import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UCloset3D';
  showNav = true;

  constructor(private router: Router, private auth: AuthService) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(event => {
        this.showNav = event.urlAfterRedirects !== '/login';
      });
  }

  logout(): void {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
