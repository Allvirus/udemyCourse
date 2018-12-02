import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
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
      },
      // http请求通用,类似 try catch fanilly方法
      () => {
        this.router.navigate(['/members']);
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
    this.router.navigate(['/homr']);
  }
}
