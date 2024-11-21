import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
      
  }

  constructor(private fb : FormBuilder, private router:Router){}

  /*Design the reactive form*/
  public frmRegister = this.fb.group({
    Username : this.fb.control('',[Validators.required, Validators.minLength(4)]),
    Password : this.fb.control('',[Validators.required, Validators.minLength(4)]),
    Age : this.fb.control(15,[Validators.required]),
    Email : this.fb.control('',[Validators.required])
  })
  //Create accessors to get FormControls
  get Username(){
    return this.frmRegister.get('Username') as FormControl;
  }
  get Password(){
    return this.frmRegister.get('Password') as FormControl;
  }
  get Age(){
    return this.frmRegister.get('Age') as FormControl;
  }
  get Email(){
    return this.frmRegister.get('Email') as FormControl;
  }

  //On submit or register click register the user in DATABASE 
  public handleSubmit(obj:any){
    console.log(JSON.stringify(obj));

    //Make API Call to send the form data as Request Body and insert that in database
    fetch(`https://http-status-dog-api.vercel.app/registerUsers`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj) // Convert form data to JSON string
    }).then((res)=>res.json())
    .then((data)=>{
      console.log(data.code);
      if(data.code == 201){
        //Open the alert
        alert(`Registered Successfully :)`);

        //And Navigate to the Login page Dynamically with in 1sec
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1000);
      }else{
        //Open error alert
        alert(`Registration Failed, Try Again! :(`);

        //And then navigate to the Register page itself
        setTimeout(()=>{
          this.router.navigate(['/register']);
        },1000);
      }
    })
  }
}
