import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  //Inject the form builder service
  constructor(
    private fb : FormBuilder, private cookie:CookieService, private router:Router
  ){}

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

  //Create an array to hold list cards
  public List:any[] = [];


  //Get all the lists
  public getAllList(){
    //Fetch all the list cards
    fetch(`https://http-status-dog-api.vercel.app/getAllList`)
    .then((res)=>res.json())
    .then((data)=>{
      this.List = data;
    });
  }

  public UserName:any = '';
  ngOnInit(): void {
    this.getAllList();

    //Give cookie Username
    this.UserName = this.cookie.get('Username');
  }

  // This will filter out the cards based on the statusCode which is searched
  public handleSearch(obj:any):void{
    //Make GET API call for searching the particular card based on statusCode
    fetch(`https://http-status-dog-api.vercel.app/getListsByCode/${obj.StatusCode}`)
    .then((res)=>res.json())
    .then((data)=>{
      //re-initialize the dogs array with filtered data
      this.List = data;
    });
  }

  //Method to delete items from list based on status code
  public deleteFromList(code:any){
    //Make a DELETE mode REST API Call to delete the item from list
    fetch(`https://http-status-dog-api.vercel.app/deleteListByCode/${code}`, {method: "DELETE"})
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      alert('Item Deleted From List :)');
      //Load the List items again
      this.getAllList();
    })
    .catch((err)=>{
      console.error(err);
      alert('Deletion Failed :(');
    })
  }
}
