import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessageComponent } from './message/message.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditlResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';

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
      {
        path: 'members',
        component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id',
        component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        resolve: { user: MemberEditlResolver },
        canDeactivate: [PreventUnsavedChanges]
      },
      { path: 'message', component: MessageComponent },
      { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver } },
    ]
  },

  // 缺省  通配路由
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
