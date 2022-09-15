import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Underling } from '../model/UnderlingModel';


@Injectable({
  providedIn: 'root'
})
export class UnderlingService {

  baseURL = environment.URL + 'tickers/';

  formModel = this.formBuilder.group({
    name: [, [Validators.required]],
    isin: [, [Validators.required]],
    eodCode: [, [Validators.required]],
    bbgCode: [, [Validators.required]],
    type: [, [Validators.required]],
    quotable: [, [Validators.required]]


  })
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder) { }

  public create(underling: Underling): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(underling);
    console.log(body)
    return this.http.post(this.baseURL + 'add', body, { 'headers': headers })
  }

  public update(id: number): Observable<any> {
    var body = {
      id: id,
      name: this.formModel.value.name,
      isin: this.formModel.value.isin,
      eodCode: this.formModel.value.eodCode,
      bbgCode: this.formModel.value.bbgCode,
      type: this.formModel.value.type,
      quotable: this.formModel.value.quotable


    };
    return this.http.put(this.baseURL + 'update', body)
  }

  public verifHoliday(date:string) {
    var body = {
      
      holiday: date

    };
    return this.http.post(this.baseURL + 'verifHoliday', body)
  }

  public delete(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(this.baseURL + 'delete/?id=' + id, { 'headers': headers })
  }


  public findOne(id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.get(this.baseURL + 'findone/?id=' + id)
  }

  public findAll(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.http.get(this.baseURL + 'findall', { 'headers': headers })
  }
  upload(file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:8080/upload', formData);
  }

}
