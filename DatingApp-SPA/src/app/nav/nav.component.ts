import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        this.alertify.success('登陆成功');
        console.log('登陆成功');
      },
      error => {
        this.alertify.error(error);
        console.log(error);
      }
    );
  }

  loggenIn() {
    return this.authService.loggendIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('登出');
    console.log('登出');
  }
}
