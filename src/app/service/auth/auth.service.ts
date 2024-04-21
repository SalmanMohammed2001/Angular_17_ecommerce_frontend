import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";

const BASIC_URL='http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private  http:HttpClient) { }

  register(signupRequest:any):Observable<any>{
    return this.http.post(BASIC_URL+"api/v1/user/addNewUser",signupRequest)
  }

  login(email:any,password:any):Observable<any>{
    const headers=new HttpHeaders().set('Content-Type','application/json');
    const body={email,password}
    return this.http.post(BASIC_URL+"api/v1/auth/authenticate",body,{
      observe:'response' as 'body'
    }).pipe(map(data=>{
     return data;
    }));
  }

    getOrderByTrackingId(trackingId:any){

    }
}
