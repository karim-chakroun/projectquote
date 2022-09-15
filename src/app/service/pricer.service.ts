import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { stradegy } from '../model/stradegy.model';

const baseUrl = environment.backendUrl+'/api/broker/pricer';

@Injectable({
  providedIn: 'root'
})
export class PricerService {

  constructor(private http: HttpClient) { }



  askQuote(data: stradegy.AskQuoteModel): Observable<stradegy.AskQuoteModel> {
    return this.http.post<stradegy.AskQuoteModel>(`${baseUrl}/askQuote`, data);
}
}
