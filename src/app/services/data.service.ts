import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RewardResponse } from '../models/reward';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiURL = 'assets/data/mock-data.json';
  constructor(private http: HttpClient) {}

  getProductsData(): Observable<RewardResponse> {
    return this.http.get<RewardResponse>(this.apiURL);
  }
}
