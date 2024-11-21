import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private fb : FormBuilder, private cookie:CookieService, private router:Router
  ){}

  //Array to store the users
  public Users:any[] = [{}];

  ngOnInit(): void {
    //Load all the users
    fetch('https://http-status-dog-api.vercel.app/getAllUsers')
    .then((res)=>res.json())
    .then((data)=>{
      this.Users = data;
    })
  }

  //Create the reactive form
  public frmLogin = this.fb.group({
    Username : this.fb.control('', [Validators.required,Validators.minLength(4)]),
    Password : this.fb.control('', [Validators.required,Validators.minLength(4)])
  })
  //Create 2 getters to get controls as FormControl to access all control options
  get Username(){
    return this.frmLogin.get('Username') as FormControl;
  }
  get Password(){
    return this.frmLogin.get('Password') as FormControl;
  }

  public handleSubmit = (obj:any):void=>{
    console.log(JSON.stringify(obj));

    //Create a boolean to track login success or failed
    let flag:boolean = false;

    //For user check if the username and pwd matching or not
    for(var user of this.Users){
      if((user.Username == obj.Username) && (user.Password == obj.Password)){
        //If matches then set Cookie 
        this.cookie.set("Username",obj.Username);

        //Open up a pop up message or Snackbar of success login
        alert('Login Success :)');

        //& navigate to the redirectUrl page the User requested for which
        this.router.navigate(['/home']);

        //Toogle the boolean and mark as Success Login
        flag = true;
        break;
      }
    }
    //Now check if the flag is false that means Login error
    if(!flag){
      //Take some time and then show the Login Error msg in a Dialog
      setTimeout(()=>{
        alert(`Login Error, Try again! :(`)
      },500);

      this.router.navigate(['/login']);
    }
  }
}
