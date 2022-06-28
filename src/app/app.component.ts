import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { Transaction } from './transaction.model';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BankTransactions';
  users: User[] = [];
  transactions: Transaction[] = [];
  private userSub: Subscription;
  private transactionSub: Subscription; 

  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.apiService.getUsers();/*.subscribe((users: User[]) => {
      console.log(users);
      this.users = users;
    });*/
    this.userSub = this.apiService.getUserUpdateListener()
      .subscribe((users: User[]) => {
        console.log(users);
        this.users = users
      });

      this.transactionSub = this.apiService.getTransactionUpdateListener()
      .subscribe((transactions: Transaction[]) => {
        console.log(transactions);
        this.transactions = transactions
      });
  }





}
