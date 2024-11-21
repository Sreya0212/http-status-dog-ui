import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    private fb : FormBuilder, private cookie:CookieService, private router:Router
  ){}

  public UserName:any = '';

  //To hold the statusDogs cards
  public dogs:any[] = [];
  ngOnInit(): void {
    fetch(`https://http-status-dog-api.vercel.app/getAllDogs`)
    .then((res)=>res.json())
    .then((data)=>{
      this.dogs = data;
    });

    //Give cookie Username
    this.UserName = this.cookie.get('Username');
  }

  //remove cookie and navigate to login page
  public signOut(){
    this.cookie.delete('Username');

    this.router.navigate(['/login']);
  }

  //Create the reactive form
  public frmSearch = this.fb.group({
    //Define proper REGEX Pattern for the input field
    StatusCode : this.fb.control('', [Validators.required,Validators.minLength(3), Validators.pattern('^[1-5][0-9x]{2}$')]),
  });
  get StatusCode(){
    return this.frmSearch.get('StatusCode') as FormControl;
  }

  // This will filter out the cards based on the statusCode which is searched
  public handleSearch(obj:any):void{
    //Make GET API call for searching the particular card based on statusCode
    fetch(`https://http-status-dog-api.vercel.app/getDogsByCode/${obj.StatusCode}`)
    .then((res)=>res.json())
    .then((data)=>{
      //re-initialize the dogs array with filtered data
      this.dogs = data;
    });

    alert(obj.StatusCode);
  }

  //On this button click we will make an API call will get the card related to the code
  //And then we will add that returned card into another list collection
  public addToList(code:number){
    //Make GET API call for searching the particular card based on statusCode
    fetch(`https://http-status-dog-api.vercel.app/getDogsByCode/${code}`)
    .then((res)=>res.json())
    .then((data)=>{
      //Post the data array to another insert POST API through request body, to insert in another list
      fetch(`https://http-status-dog-api.vercel.app/insertList`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Pass the array as a JSON string through Req Body
      })
      .then((res)=>res.json())
      .then((data)=>{
        //toggle the flag
        alert('Inserted in List :)');
        console.log(data);
      }).catch((err)=>{
        alert(`Failed to Insert in List :(`);
        console.error(err);
      })
    });
  }
}
