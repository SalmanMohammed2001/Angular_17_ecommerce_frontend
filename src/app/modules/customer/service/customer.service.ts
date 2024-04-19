import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../../service/stroge/storage.service";

const BASIC_URL='http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private  http:HttpClient) {

  }





  allProduct():Observable<any>{
    return this.http.get(BASIC_URL+"api/v1/customer/list",{
      headers:this.createAuthorizationHeader()
    });
  }
  allProductByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL+`api/v1/customer/search/${name}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  addToCart(productId:any) {
    const cartDto = {
      userId: StorageService.getUserId(),
      productId: productId
    }
    return this.http.post(BASIC_URL + `api/v1/cart/save`, cartDto, {
      headers: this.createAuthorizationHeader()
    });

  }
   getCartByUserId():Observable<any>{
    const userId= StorageService.getUserId()
    return this.http.get(BASIC_URL+`api/v1/cart/${userId}`,{
      headers:this.createAuthorizationHeader()
    });

  }


  private createAuthorizationHeader() {
    return new HttpHeaders().set(
      "Authorization","Bearer "+StorageService.getToken()
    )
  }
}
