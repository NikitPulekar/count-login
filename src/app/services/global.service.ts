import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  baseUrl = environment.baseUrl;
  userDetails: any;
  constructor(private http: HttpClient) {
    this.userDetails = localStorage.getItem('currentUser');
  }



  async get(url: any) {
    let response = await this.http.get(this.baseUrl + url).toPromise();
    return response;
  }

  async post(url: any, body: any) {
    let response = await this.http.post(this.baseUrl + url, body).toPromise();
    return response;

  }


}
