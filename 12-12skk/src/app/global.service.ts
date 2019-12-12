import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  constructor(private Http:HttpClient) { }

  song(path): Observable<any> {
    console.log(path,'${this.Global}songs')
    return this.Http.get(path).pipe(
      map(this.extractData));;
  } 

  postData(path,userdata): Observable<any> {
    return this.Http.post<any>(path, userdata);
  }

  review(path): Observable<any> {
    console.log(path,'${this.Global}review')
    return this.Http.get(path).pipe(
      map(this.extractData));;
  }
  playList(path): Observable<any> {
    console.log(path,'${this.Global}playList')
    return this.Http.get(path).pipe(
      map(this.extractData));;
  }
}
