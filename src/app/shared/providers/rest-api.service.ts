import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {token_importer,token_exporter} from '../constant';
import { Customer } from '../models/Customer';
import { Bank } from '../models/Bank';
const apiUrl = "http://192.168.0.102:3000/api/";
@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }
  getCustomer(id){
    return this.http.get<Customer>(apiUrl+'Customer/'+id);
  }
  getBank(bankId)
  {
    return this.http.get<Bank>(apiUrl+'Bank/'+bankId);
  }
}
