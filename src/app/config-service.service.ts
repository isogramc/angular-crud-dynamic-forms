import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConfigServiceService {
  list: any;
  obj: any;
  prodString: String;
  productArray = [];
  findArr = [];
  productsApi = 'http://localhost:8090/api';

  constructor(private http: HttpClient) { }

  listProducts() {
    this.list = this.http.get(`http://localhost:8090/api/list`);
    return this.list;
  }


  createProduct(data: any): Observable<any> {
    this.productArray.push(data);
    console.log(JSON.stringify(this.productArray));
    return this.http.post<any>(`http://localhost:8090/api/create`,
      JSON.stringify(this.productArray), {headers: {'Content-Type': 'application/json'}});
  }

  editProduct(product: any): Observable<any> {
    this.findArr = [];
    this.findArr.push(product);
    console.log(product);
    return this.http.post<any>(`http://localhost:8090/api/edit`, JSON.stringify(this.findArr),
      {headers: {'Content-Type': 'application/json'}});
  }

  findById(identifier: any): Observable<any> {
    this.findArr = [];
    this.obj = {
      id: identifier
    };
    this.findArr.push(this.obj);
    return this.http.post<any>(`http://localhost:8090/api/findbyid`, JSON.stringify(this.findArr),
      {headers: {'Content-Type': 'application/json'}});
  }

  findByPrice(data: any): Observable<any> {
    this.findArr = [];
    this.obj = {
      price: data
    };
    this.findArr.push(this.obj);
    return this.http.post<any>(`http://localhost:8090/api/findbyprice`, JSON.stringify(this.findArr),
      {headers: {'Content-Type': 'application/json'}});
  }

  deleteProduct(identifier: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8090/api/delete/${identifier}`,
      {headers: new HttpHeaders(
        { 'Content-Type': 'application/json' }
        )
      });
  }
}
