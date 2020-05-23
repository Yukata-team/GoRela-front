import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DetailComponent } from './components/detail/detail.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AccountComponent } from './components/account/account.component';
import { CreateComponent } from './components/create/create.component';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TopComponent } from './components/top/top.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
  {
    path: 'ranking',
    component: RankingComponent,
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: 'account/:id',
    component: AccountComponent,
  },
  {
    path: 'account/edit/:id',
    component: UserEditComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
