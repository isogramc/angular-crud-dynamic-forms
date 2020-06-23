import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ImageService {

  constructor(private http: HttpClient) {}

  public uploadImage(formData: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8090/api/addImage`,
      formData);
  }

}
