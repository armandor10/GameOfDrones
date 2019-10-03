import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Response } from './shared/response';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl = environment.baseUrl;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  constructor(private http: HttpClient) { }

  getGame(id): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + "/game/" + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getGameRound(id): Observable<Response> {
    return this.http.get<Response>(this.baseUrl + "/game/" + id + "/rounds")
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createGame(game) {
    return this.http.post(this.baseUrl + '/game', JSON.stringify(game), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createRound(round) {
    return this.http.post(this.baseUrl + '/round', JSON.stringify(round), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    console.log(error.message);
    return throwError('A data error occurred, please try again.')
  }

}
