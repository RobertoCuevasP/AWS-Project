import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./user.model";
import { Transaction } from "./transaction.model";


@Injectable({ providedIn: "root" })
export class ApiService {
  private users: User[] = [];
  private usersUpdated = new Subject<User[]>();
  
  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get<User[]>(
        'https://qazuzesou2.execute-api.us-east-1.amazonaws.com/prod/users'
      )
      .pipe(map((userData) => {
        return userData.map(user => {
          return {
            pk: user.pk,
            sk: user.sk,
            ganancias_mes: user.ganancias_mes,
            nro_transacciones_dia: user.nro_transacciones_dia,
            saldo_total: user.saldo_total
          };
        });
      }))
      .subscribe(transformedUsers => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getTransactionsByUser(id: string){
    this.http
      .get<Transaction[]>(
        'https://qazuzesou2.execute-api.us-east-1.amazonaws.com/prod/transactions/'+ id
      )
      .pipe(map((transactionData) => {
        return transactionData.map(transaction => {
          return {
            pk: transaction.pk,
            sk: transaction.sk,
            amount: transaction.amount,
            anomaly: transaction.anomaly
          };
        });
      }));

  }

  postTransaction(sender: string, receiver: string, amount: string){
    const body = { sender: sender, receiver: receiver, amount: amount };
    this.http.post<any>('https://qazuzesou2.execute-api.us-east-1.amazonaws.com/prod/transaction', body)
    .subscribe(data => {
        console.log(data)
        
    }); 


  }
}

