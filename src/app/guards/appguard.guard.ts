import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppguardGuard implements CanActivate {
  //Inject the cookieService to check cookies
  //Inject the Router module to navigate dynamically among pages
  constructor(private cookie:CookieService, private router:Router){}

  //Create a method to open the Dialog 
  openDialog() {
    alert(`Invalid Login Credentials! Please check or SignUp.`)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.cookie.check("Username")){
      //return true so that Agent page comes
      return true;
    }else{
      //Store the attempted url as a localstorage to later redirect to it
      localStorage.setItem('redirectUrl',state.url); //store current URL

      //Give an alert for login
      this.openDialog();

      //navigate to /login page as cookie is not present with some delay
      setTimeout(()=>{
        this.router.navigate(['/login']);
      },400);

      //Restrict the agent route access
      return false;
    }
  }
}
