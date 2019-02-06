import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {token_importer,token_exporter} from '../constant';
import { Customer } from '../models/Customer';
import { Bank } from '../models/Bank';
import { LetterOfCredit } from '../models/LetterOfCredit';
import { ProductDetails } from '../models/ProductDetails';
import { Transaction } from '../models/Transaction';
import { BankEmployee } from '../models/BankEmployee';
const apiUrl = "http://192.168.0.102:3000/api/";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) { }
  getCustomer(id:string){
    return this.http.get<Customer>(apiUrl+'Customer/'+id);
  }
  getBankEmployee(empid:string){
    return this.http.get<BankEmployee>(apiUrl+'BankEmployee/'+empid);
  }
  getBank(bankId:string)
  {
    return this.http.get<Bank>(apiUrl+'Bank/'+bankId);
  }
  getLCs()
  {
    return this.http.get<LetterOfCredit[]>(apiUrl+'LetterOfCredit/');
  }
  getLC(id:string)
  {
    return this.http.get<LetterOfCredit>(apiUrl+'LetterOfCredit/'+id);
  }
  getProductDetails()
  {
    return this.http.get<ProductDetails>(apiUrl+'LetterOfCredit/');
  }
  updateCustomerDetails(): any {
    throw new Error("Method not implemented.");
  }
  getApprovedTransactions()
  {
    return this.http.get<Transaction[]>(apiUrl+'Approve');
  }
  getRejectedTransactions()
  {
    return this.http.get<Transaction[]>(apiUrl+'Reject');
  }
  postLCDetails(data:LetterOfCredit)
  {
      let result = JSON.parse(JSON.stringify(data));
      if(result['approval']!=undefined||null)
          delete result['approval'];
      if(result['issuingBank']!=undefined||null)
          delete result['issuingBank'];
      if(result['exportingBank']!=undefined||null)
          delete result['exportingBank'];
      if(result['status']!=undefined||null)
          delete result['status'];
      if(result['transactionId']!=undefined||null)
          delete result['transactionId'];
      return this.http.post(apiUrl+'InitialApplication', result);
  }
}
