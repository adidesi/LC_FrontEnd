import { Injectable } from '@angular/core';
import { RestApiService } from '../providers/rest-api.service';
import { Observable, of, forkJoin, Subscription, combineLatest, } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Transaction } from '../models/Transaction';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../models/Bank';
import { approve, reject, CREATE, APIURL, InitialApplicationClass, SHIP, RECEIVE, PAYMENT, CLOSE } from '../constant';
import { Customer } from '../models/Customer';
import { SessionGuardService } from './session-guard.service';
import { BankEmployee } from '../models/BankEmployee';
import { LetterOfCredit } from '../models/LetterOfCredit';

@Injectable({
  providedIn: 'root'
})
export class RestGuardService {

  constructor(private restApiService: RestApiService, private http: HttpClient,
    private sessionGuardService: SessionGuardService) { }

  getTransactions(id: string): Observable<any> {
    let urlId = id.replace(' ', '%20');
    var initTnxObs = this.restApiService.getInitialApplicationTransactions(urlId);
    var approveTnxObs = this.restApiService.getApprovedTransactions(urlId.replace('%', '%25'));
    var rejectTnxObs = this.restApiService.getRejectedTransactions(urlId.replace('%', '%25'));
    var shipTnxObs = this.restApiService.getShipProductTransactions(urlId.replace('%', '%25'));
    var receivetnxobs = this.restApiService.getReceivedProductTransactions(urlId.replace('%', '%25'));
    var paymentTnxObs = this.restApiService.getReadyForPaymentTransactions(urlId.replace('%', '%25'));
    var closeTnxObs = this.restApiService.getCloseLCTransactions(urlId.replace('%', '%25'));
    return combineLatest([initTnxObs, approveTnxObs, rejectTnxObs, shipTnxObs, receivetnxobs, paymentTnxObs, closeTnxObs]);
  }

  getTransactionsForId(id: string) {
    return this.getTransactions(id).pipe(
      map(
        resAllTnx => {
          //console.log('transactions',resAllTnx);
          let LCTnxforId: Transaction[] = [];
          for (let i = 0; i < resAllTnx.length; i++) {
            for (let j = 0; j < resAllTnx[i].length; j++) {
              LCTnxforId.push(new Transaction(resAllTnx[i][j], resAllTnx[i][j]['$class'].split('.')[3]));
            }
          }
          return LCTnxforId;
        }
      )
    );
  }

  public getCustomerWithBank(id: string) {
    if (id !== null && id !== undefined) {
      return this.restApiService.getCustomer(id)
        .pipe(
          switchMap((resCust) => {
            if (resCust) {
              return this.restApiService.getBank(resCust['bank'].split('#')[1])
                .pipe(map(resBank => {
                  let bank = new Bank(resBank);
                  let customer = new Customer(resCust);
                  if (resBank["name"] === "Bank of Dinero") {
                    customer.setBankObj(new Bank(resBank, 'BKDOIT60', 'IT60 9876 5321 9090'));
                    customer.setIsImporter(true);
                  }
                  else {
                    customer.setBankObj(new Bank(resBank, 'EWBKUS22', 'US22 1234 5678 0101'));
                    customer.setIsImporter(false);
                  }
                  return customer;
                }));
            }
            else {
              return null;
            }
          }));
    }
  }
  public getBankEmployee(id: string) {
    if (id != null || id != undefined) {
      return this.restApiService.getBankEmployee(id).pipe(
        switchMap((resBankEmp) => {
          if (resBankEmp) {
            return this.restApiService.getBank(resBankEmp['bank'].split('#')[1])
              .pipe(map(resBank => {
                let bank = new Bank(resBank);
                let bankEmp = new BankEmployee(resBankEmp);
                if (resBank["name"] === "Bank of Dinero") {
                  bankEmp.setBankObj(new Bank(resBank, 'BKDOIT60', 'IT60 9876 5321 9090'));
                  bankEmp.setIsIssuingBank(true);
                }
                else {
                  bankEmp.setBankObj(new Bank(resBank, 'EWBKUS22', 'US22 1234 5678 0101'));
                  bankEmp.setIsIssuingBank(false);
                }
                return bankEmp;
              }
              ));
          }
          else {
            return null;
          }
        }))
    }
  }


  getLCs() {
    return this.restApiService.getLCs().pipe(
      map(resLCs => {
        let LCs: LetterOfCredit[] = [];
        for (var i = 0; i < resLCs.length; i++) {
          LCs.push(new LetterOfCredit(resLCs[i]));
        }
        return LCs;
      })
    );
  }

  getLCbyID(id: string) {
    let urlId = id.replace(' ', '%20');
    return this.restApiService.getLC(urlId).pipe(
      mergeMap(resLC => {
        return this.getTransactionsForId(id).pipe(
          map(resTnx => {
            let LC = new LetterOfCredit(resLC);
            LC.setTransactions(resTnx);
            return LC;
          })
        );
      })
    );
  }


}
