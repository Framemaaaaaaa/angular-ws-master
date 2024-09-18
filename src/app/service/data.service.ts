import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiEndpoint = 'http://localhost/webapi';
  countries:any;
  selectedlanmark:any;
  constructor() { }
}
