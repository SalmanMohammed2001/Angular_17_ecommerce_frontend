import { Injectable } from '@angular/core';

const TOKEN = "ecom-token"
const USER = "ecom-user"

@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

  public saveToken(token: any) {
    window.localStorage.removeItem(TOKEN)
    window.localStorage.setItem(TOKEN, token)
  }

  public saveUser(user: any) {
    window.localStorage.removeItem(USER)
    window.localStorage.setItem(USER, JSON.stringify(user))
  }

  static getToken() {
    return localStorage.getItem(TOKEN)
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(USER)!)
  }

  static getUserId() {
    const user=this.getUser()
    if(user ==null){
      return "";
    }
    return  user.uuid;
  }
  static getRole() {
    const user=this.getUser()
    if(user ==null){
      return "";
    }
    return  user.userRoles;
  }
  static getEmail() {
    const user=this.getUser()
    if(user ==null){
      return "";
    }
    return  user.email;
  }

  static getName() {
   const user=this.getUser()
    if(user ==null){
      return "";
    }
    return  user.name;
  }

  static isAdminLoggedIn():boolean{
    if(this.getToken()==null){
      return false;
    }
    const role:string=this.getRole();
    return role== "ADMIN";
  }

  static isCustomerLoggedIn():boolean{
    if(this.getToken()==null){
      return false;
    }
    const role:string=this.getRole();
    return role== "USER";
  }

  static signOut(){
    window.localStorage.removeItem(TOKEN)
    window.localStorage.removeItem(USER)

  }/**/

}
