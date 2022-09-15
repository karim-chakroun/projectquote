import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stradegy } from '../model/stradegy.model';


const baseUrl = environment.backendUrl+'/api/user/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http: HttpClient) { }

  sendQuote(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/askQuote`, data);
}
}
