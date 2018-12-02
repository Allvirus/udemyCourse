import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MessageComponent } from './message/message.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoute: Routes = [
  { path: '', component: HomeComponent },

  // 单一路由守卫服务
  // { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] },

  {
    // 统一路由使用方法
    // path: 'dummy', //localhost:4200/dummymembers
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'message', component: MessageComponent },
      { path: 'lists', component: ListsComponent }
    ]
  },

  // 缺省  通配路由
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
