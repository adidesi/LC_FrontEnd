import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import {Storage} from '@ionic/storage';
import { Platform } from '@ionic/angular';
import {token_importer,token_exporter} from '../constant'
const TOKEN_KEY='auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticationState=new BehaviorSubject(false);
  tokenState = new BehaviorSubject(null);
  constructor(private storage:Storage,private plt: Platform) {
      this.plt.ready().then(()=>{
        this.checkToken();
      });
   }

   login(id:string)
   {  
      return this.storage.set(TOKEN_KEY, id).then(res=> {
        this.tokenState.next(id);
        this.authenticationState.next(true);
      });
   }
   logout()
   {
    return this.storage.remove(TOKEN_KEY).then(()=> {
      this.authenticationState.next(false);
    });
   }
   isAuthenticate()
   {
      return this.authenticationState.value;
   }
   checkToken()
   {
    return this.storage.get(TOKEN_KEY).then(res=> {
      if(res){
        return res.toString();
      }
    });
  }
}
