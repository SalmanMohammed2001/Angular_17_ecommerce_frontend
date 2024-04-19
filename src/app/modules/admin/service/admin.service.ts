import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "../../../service/stroge/storage.service";

const BASIC_URL='http://localhost:8080/'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private  http:HttpClient) {

  }


  addCategory(category:any):Observable<any>{
    return this.http.post(BASIC_URL+"api/v1/category/save",category,{
      headers:this.createAuthorizationHeader(),
    })
  }


   allCategory():Observable<any>{
    return this.http.get(BASIC_URL+"api/v1/category/list",{
      headers:this.createAuthorizationHeader()
    });
  }

   addProduct(productDto:any):Observable<any>{
    return this.http.post(BASIC_URL+"api/v1/product/save",productDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
   allProduct():Observable<any>{
    return this.http.get(BASIC_URL+"api/v1/product/list",{
      headers:this.createAuthorizationHeader()
    });
  }
  allProductByName(name:any):Observable<any>{
    return this.http.get(BASIC_URL+`api/v1/product/search/${name}`,{
      headers:this.createAuthorizationHeader()
    });
  }
  deleteProduct(id:any):Observable<any>{
    return this.http.delete(BASIC_URL+`api/v1/product/delete?id=${id}`,{
      headers:this.createAuthorizationHeader()
    });
  }
  addCoupon(couponDto:any){
    return this.http.post(BASIC_URL+"api/v1/admin/coupon/save",couponDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  getAllCoupon():Observable<any>{
    return this.http.get(BASIC_URL+"api/v1/admin/coupon/list",{
      headers:this.createAuthorizationHeader(),
    })
  }

  private createAuthorizationHeader() {
    return new HttpHeaders().set(
      "Authorization","Bearer "+StorageService.getToken()
    )
  }



}
