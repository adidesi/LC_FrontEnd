import { Injectable } from '@angular/core';
import { RestApiService } from '../providers/rest-api.service';
import { Observable, of, forkJoin, Subscription, } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Transaction } from '../models/Transaction';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../models/Bank';
import { APIURL } from '../constant';
import { Customer } from '../models/Customer';
import { SessionGuardService } from './session-gaurd.service';

@Injectable({
  providedIn: 'root'
})
export class RestGuardService {

  constructor(private restApiService: RestApiService, private http: HttpClient, private sessionGuardService: SessionGuardService) { }

  status: {};
  // getTransactionsForId(id:string):Observable<any>{
  //   var observable1 =this.restApiService.getApprovedTransactions();
  //   var observable2 = this.restApiService.getRejectedTransactions();
  //   forkJoin([observable1,observable2]).subscribe(result=>{
  //     console.log('R',result[1]);
  //     this.status=result[0];
  //     console.log('result[0]',result[0],'result[1]',result[1],'this.status',this.status);
  //   })
  //   // observable1.subscribe(data=>{
  //   //   console.log('DATA', data);
  //   // });
  //   return ;
  // }
  getTransactionsForId(id: string): Observable<any> {
    var observable1 = this.restApiService.getApprovedTransactions();
    var observable2 = this.restApiService.getRejectedTransactions();

    return forkJoin([observable1, observable2]);
  }

  getCustomerDetails(id: string):any {
    const customerObservable = new Observable(observer => {
      observer.next(this.restApiService.getCustomer('alice'))
      console.log(observer)
      //return observer;
    })
    return customerObservable;
  }

  public getCustomerWithBank(id: string)
  {
    console.log('in getCustomerWithBank', id)
     if(id !== null && id !== undefined)
     {
        return  this.http.get<Customer>(APIURL + 'Customer/' + id)
        .pipe(
          switchMap((response) => {
          if(response)
          {
            console.log(response)
            return this.http.get<Bank>(APIURL + 'Bank/' + response['bank'].split('#')[1])
            .pipe(map(bank => {
              
              console.log(response,'in switch');
              console.log(bank);
              return bank
            }));
          }
          else 
          {
            return null;
          }
        })); 
     }
  }
  //.subscribe(resultdata=>{
      //   console.log('BRG',resultdata);
      // }));
      // console.log('RG',observer);
    //   this.restApiService.getCustomer(id).subscribe((res: Customer) => {
    //   let customer = new Customer(res);
    //   this.restApiService.getBank(customer.getBank()).subscribe((resBank: Bank) => {
    //     let bank_name = resBank["name"];
    //     if (resBank["name"] === "Bank of Dinero") {
    //       customer.setBankObj(new Bank(resBank, 'BKDOIT60', 'IT60 9876 5321 9090'));
    //       customer.setIsImporter(true);
    //       this.sessionGuardService.storeUser(customer);
    //       this.sessionGuardService.storeBank(customer.getBankObj());
    //     }
    //     else {
    //       customer.setBankObj(new Bank(resBank, 'EWBKUS22', 'US22 1234 5678 0101'));
    //       customer.setIsImporter(false);
    //       this.sessionGuardService.storeUser(customer);
    //       this.sessionGuardService.storeBank(customer.getBankObj());
    //     }
        
    //   });
    // });
   
  
  


}
