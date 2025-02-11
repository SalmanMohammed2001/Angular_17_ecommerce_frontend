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

  applyCoupon(code:any){
    const userId= StorageService.getUserId()
    return this.http.get(BASIC_URL+`api/v1/cart/coupon/${userId}/${code}`,{
      headers:this.createAuthorizationHeader()
    });
  }

  increasedProduct(productId:any) {
    const cartDto = {
      userId: StorageService.getUserId(),
      productId: productId
    }
    return this.http.post(BASIC_URL + `api/v1/cart/addition`, cartDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  decreasedProduct(productId:any) {
    const cartDto = {
      userId: StorageService.getUserId(),
      productId: productId
    }
    return this.http.post(BASIC_URL + `api/v1/cart/deduction`, cartDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  placeOrder(orderDto:any) {
    orderDto.userId=StorageService.getUserId()
    return this.http.post(BASIC_URL+`api/v1/cart/placeOrder`,orderDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  getOrderByUserId():Observable<any> {
    const userId=StorageService.getUserId()
    return this.http.get(BASIC_URL+`api/v1/cart/myOrders/${userId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  getOrdersProduct(orderId:any):Observable<any>{
    return this.http.get(BASIC_URL+`api/v1/review/${orderId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  giveReview(reviewDto:any):Observable<any>{
    return this.http.post(BASIC_URL+`api/v1/review/save`,reviewDto,{
      headers:this.createAuthorizationHeader()
    })
  }

  getProductDetailsById(productId:any):Observable<any>{
    return this.http.get(BASIC_URL+`api/v1/customer/product/${productId}`,{
      headers:this.createAuthorizationHeader()
    })
  }
  addProductWishList(wishListDto:any):Observable<any>{
    return this.http.post(BASIC_URL+`api/v1/wishList/save`,wishListDto,{
      headers:this.createAuthorizationHeader(),
    })
  }
  getWishListByUserId():Observable<any>{
    const userId=StorageService.getUserId()
    return this.http.get(BASIC_URL+`api/v1/wishList/find/${userId}`,{
      headers:this.createAuthorizationHeader()
    })
  }

  private createAuthorizationHeader() {
    return new HttpHeaders().set(
      "Authorization","Bearer "+StorageService.getToken()
    )
  }
}
