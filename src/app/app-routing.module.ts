import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppguardGuard } from './guards/appguard.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListComponent } from './components/list/list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:"home", component:HomeComponent, canActivate:[AppguardGuard]},
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"login",component:LoginComponent},
  {path:"list", component:ListComponent, canActivate:[AppguardGuard]},
  {path:"register", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
