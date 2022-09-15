import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MailModel } from '../model/MailModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MailService {

  baseURL = environment.URL;
  constructor(private http:HttpClient) { }


  public sendMail(mailModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(mailModel);
    console.log(body)
    return this.http.post(this.baseURL + 'email', body,{'headers':headers})  
  }
  public bbva(mailModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(mailModel);
    console.log(body)
    return this.http.post(this.baseURL + 'bbva', body,{'headers':headers})  
  }
  public citi(citiModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(citiModel);
    console.log(body)
    return this.http.post(this.baseURL + 'citi', body,{'headers':headers})  
  }
  public citiAutocallClassic(citiModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(citiModel);
    console.log(body)
    return this.http.post(this.baseURL + 'citi_classic', body,{'headers':headers})  
  }
  public citiAutocallPhx(citiModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(citiModel);
    console.log(body)
    return this.http.post(this.baseURL + 'citi_phx', body,{'headers':headers})  
  }
  public citiAutocallRCB(citiModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(citiModel);
    console.log(body)
    return this.http.post(this.baseURL + 'autocall_citi', body,{'headers':headers})  
  }
  public sgcib(sgcibModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(sgcibModel);
    console.log(body)
    return this.http.post(this.baseURL + 'sgcib', body,{'headers':headers})  
  }
  public leonteq(leonteqModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(leonteqModel);
    console.log(body)
    return this.http.post(this.baseURL + 'leonteq', body,{'headers':headers})  
  }
  public leonteqAutocall(leonteqModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(leonteqModel);
    console.log(body)
    return this.http.post(this.baseURL + 'leonteq_autocall', body,{'headers':headers})  
  }
  public bnp(leonteqModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(leonteqModel);
    console.log(body)
    return this.http.post(this.baseURL + 'bnp', body,{'headers':headers})  
  }
  public bnpAutocall(leonteqModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(leonteqModel);
    console.log(body)
    return this.http.post(this.baseURL + 'bnp_autocall', body,{'headers':headers})  
  }
  public gs(leonteqModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(leonteqModel);
    console.log(body)
    return this.http.post(this.baseURL + 'gs', body,{'headers':headers})  
  }
  public gsAutocall(leonteqModel : MailModel) : Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(leonteqModel);
    console.log(body)
    return this.http.post(this.baseURL + 'gs_autocall', body,{'headers':headers})  
  }
}