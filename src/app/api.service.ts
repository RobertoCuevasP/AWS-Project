import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "./user.model";


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

  getTransactionsByUser(user: string){

  }

  postTransaction(sender: string, receiver: string, amount: string){

  }
}