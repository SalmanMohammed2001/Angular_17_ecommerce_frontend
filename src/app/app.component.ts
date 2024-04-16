import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {StorageService} from "./service/stroge/storage.service";

const TOKEN = "ecom-token"
const USER = "ecom-user"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'E-com_Angular_17';

  constructor(private  router:Router) {
  }
  ngOnInit(): void {
    console.log(StorageService.getRole())
  }

  logout(){
    StorageService.signOut()
    this.router.navigateByUrl("/login").then();
  }

  protected readonly StorageService = StorageService;
}
