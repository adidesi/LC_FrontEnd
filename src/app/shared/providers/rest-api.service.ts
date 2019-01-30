import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {token_importer,token_exporter} from '../constant';
import { Customer } from '../models/Customer';
import { Bank } from '../models/Bank';
import { LetterOfCredit } from '../models/LetterOfCredit';
const apiUrl = "http://192.168.0.102:3000/api/";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  getCustomer(id:string){
    return this.http.get<Customer>(apiUrl+'Customer/'+id);
  }
  getBank(bankId:string)
  {
    return this.http.get<Bank>(apiUrl+'Bank/'+bankId);
  }
  getLCs()
  {
    return this.http.get<LetterOfCredit>(apiUrl+'LetterOfCredit/');
  }
  getLC(id:string)
  {
    return this.http.get<LetterOfCredit>(apiUrl+'LetterOfCredit/'+id);
  }
}
