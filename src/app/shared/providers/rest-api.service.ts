import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { token_importer, token_exporter, APIURL,CustomerClass } from '../constant';
import { Customer } from '../models/Customer';
import { Bank } from '../models/Bank';
import { LetterOfCredit } from '../models/LetterOfCredit';
import { ProductDetails } from '../models/ProductDetails';
import { Transaction } from '../models/Transaction';
import { BankEmployee } from '../models/BankEmployee';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) { }
  getCustomer(id: string) {
    return this.http.get<Customer>(APIURL + 'Customer/' + id);
  }
  getBankEmployee(empid: string) {
    return this.http.get<BankEmployee>(APIURL + 'BankEmployee/' + empid);
  }
  getBank(bankId: string) {
    return this.http.get<Bank>(APIURL + 'Bank/' + bankId);
  }
  getLCs() {
    return this.http.get<LetterOfCredit[]>(APIURL + 'LetterOfCredit/');
  }
  getLC(id: string) {
    return this.http.get<LetterOfCredit>(APIURL + 'LetterOfCredit/' + id);
  }
  getProductDetails() {
    return this.http.get<ProductDetails>(APIURL + 'LetterOfCredit/');
  }
  updateCustomerDetails(): any {
    throw new Error("Method not implemented.");
  }
  getApprovedTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'Approve?filter=%7B%22where%22%3A%7B%22loc%22%3A%22resource%3Aorg.example.loc.LetterOfCredit%23'+locUrl+'%22%7D%7D');
  }
  getRejectedTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'Reject?filter=%7B%22where%22%3A%7B%22loc%22%3A%22resource%3Aorg.example.loc.LetterOfCredit%23'+locUrl+'%22%7D%7D');
  }
  getInitialApplicationTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'InitialApplication?filter=%7B%22where%22%3A%7B%22letterId%22%3A%22'+locUrl+'%22%7D%7D');
  }
  getShipProductTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'ShipProduct?filter=%7B%22where%22%3A%7B%22loc%22%3A%22resource%3Aorg.example.loc.LetterOfCredit%23'+locUrl+'%22%7D%7D');
  }
  getReceivedProductTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'ReceiveProduct?filter=%7B%22where%22%3A%7B%22loc%22%3A%22resource%3Aorg.example.loc.LetterOfCredit%23'+locUrl+'%22%7D%7D');
  }
  getReadyForPaymentTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'ReadyForPayment?filter=%7B%22where%22%3A%7B%22loc%22%3A%22resource%3Aorg.example.loc.LetterOfCredit%23'+locUrl+'%22%7D%7D');
  }
  getCloseLCTransactions(locUrl) {
    return this.http.get<Transaction[]>(APIURL + 'Close?filter=%7B%22where%22%3A%7B%22loc%22%3A%22resource%3Aorg.example.loc.LetterOfCredit%23'+locUrl+'%22%7D%7D');
  }
  postLCDetails(data: LetterOfCredit) {
    let result = JSON.parse(JSON.stringify(data));
   //console.log('dataLC'+JSON.stringify(data));
    if (result['approval'] != undefined || null)
      delete result['approval'];
    if (result['issuingBank'] != undefined || null)
      delete result['issuingBank'];
    if (result['exportingBank'] != undefined || null)
      delete result['exportingBank'];
    if (result['status'] != undefined || null)
      delete result['status'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['transactions'] != undefined || null)
      delete result['transactions'];

    return this.http.post(APIURL + 'InitialApplication', result);
  }

  approveLCData(resultData: Transaction) {
    let result = JSON.parse(JSON.stringify(resultData));
    if (result['timestamp'] != undefined || null)
      delete result['timestamp'];
    if (result['date'] != undefined || null)
      delete result['date'];
    if (result['time'] != undefined || null)
      delete result['time'];
    if (result['closeReason'] != undefined || null)
      delete result['closeReason'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['status'] != undefined || null)
      delete result['status'];

    //console.log("result", result);
    return this.http.post(APIURL + 'Approve', result);
  }
  rejectLCData(resultData: Transaction) {
    let result = JSON.parse(JSON.stringify(resultData));
    if (result['timestamp'] != undefined || null)
      delete result['timestamp'];
    if (result['date'] != undefined || null)
      delete result['date'];
    if (result['time'] != undefined || null)
      delete result['time'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['status'] != undefined || null)
      delete result['status'];

    //console.log("result", result);
    return this.http.post(APIURL + 'Reject', result);
  }
  shipProduct(data:Transaction){
    let result = JSON.parse(JSON.stringify(data));
    if (result['timestamp'] != undefined || null)
      delete result['timestamp'];
    if (result['date'] != undefined || null)
      delete result['date'];
    if (result['time'] != undefined || null)
      delete result['time'];
    if (result['closeReason'] != undefined || null)
      delete result['closeReason'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['status'] != undefined || null)
      delete result['status'];

    //console.log("result", result);
    return this.http.post(APIURL + 'ShipProduct', result);
  }
  receiveProduct(data:Transaction){
    let result = JSON.parse(JSON.stringify(data));
    if (result['timestamp'] != undefined || null)
      delete result['timestamp'];
    if (result['date'] != undefined || null)
      delete result['date'];
    if (result['time'] != undefined || null)
      delete result['time'];
    if (result['closeReason'] != undefined || null)
      delete result['closeReason'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['status'] != undefined || null)
      delete result['status'];
    if (result['evidence'] != undefined || null)
      delete result['evidence'];

    //console.log("result", result);
    return this.http.post(APIURL + 'ReceiveProduct', result);
  }
  readyForPayment(data:Transaction){
    let result = JSON.parse(JSON.stringify(data));
    if (result['timestamp'] != undefined || null)
      delete result['timestamp'];
    if (result['date'] != undefined || null)
      delete result['date'];
    if (result['time'] != undefined || null)
      delete result['time'];
    if (result['closeReason'] != undefined || null)
      delete result['closeReason'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['status'] != undefined || null)
      delete result['status'];
    if (result['evidence'] != undefined || null)
      delete result['evidence'];

    //console.log("result", result);
    return this.http.post(APIURL + 'ReadyForPayment', result);
  }
  closeLC(data:Transaction){
    let result = JSON.parse(JSON.stringify(data));
    if (result['timestamp'] != undefined || null)
      delete result['timestamp'];
    if (result['date'] != undefined || null)
      delete result['date'];
    if (result['time'] != undefined || null)
      delete result['time'];
    if (result['transactionId'] != undefined || null)
      delete result['transactionId'];
    if (result['status'] != undefined || null)
      delete result['status'];
    if (result['evidence'] != undefined || null)
      delete result['evidence'];

    //console.log("result", result);
    return this.http.post(APIURL + 'Close', result);
  }
}
