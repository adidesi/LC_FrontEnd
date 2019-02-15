import { Injectable } from '@angular/core';
import { RestApiService } from '../providers/rest-api.service';
import { Observable, of, forkJoin, Subscription, } from 'rxjs';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { Transaction } from '../models/Transaction';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../models/Bank';
import { approve, reject, CREATE, APIURL, InitialApplicationClass } from '../constant';
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

  getTransactions(): Observable<any> {
    var initTnxObs = this.restApiService.getInitialApplicationTransactions();
    var approveTnxObs = this.restApiService.getApprovedTransactions();
    var rejectTnxObs = this.restApiService.getRejectedTransactions();
    return forkJoin([initTnxObs, approveTnxObs, rejectTnxObs]);
  }

  getTransactionsForId(id: string) {
    return this.getTransactions().pipe(
      map(
        resAllTnx => {
          let urlId = id.replace(' ', '%20');
          let LCTnxforId: Transaction[] = [];
          for (let i = 0; i < resAllTnx.length; i++) {
            for (let j = 0; j < resAllTnx[i].length; j++) {
              if (resAllTnx[i][j]['$class'].split('.')[3] == InitialApplicationClass) {
                if (resAllTnx[i][j]['letterId'] == id) {
                  LCTnxforId.push(new Transaction(resAllTnx[i][j], CREATE));
                }
              }
              else {
                if (resAllTnx[i][j]['loc'].split('#')[1] == urlId) {
                  if (resAllTnx[i][j]['$class'].split('.')[3] == 'Approve')
                    LCTnxforId.push(new Transaction(resAllTnx[i][j], approve));
                  else
                    LCTnxforId.push(new Transaction(resAllTnx[i][j], reject));
                }
              }
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


  public getLCs() {
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
