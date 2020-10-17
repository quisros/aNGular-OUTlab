import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';

import { Info } from './info';
import { INFOS } from './mock-infos';

@Injectable({
  providedIn: 'root'
})

export class InteractService {

  private getURL = 'https://cs251-outlab-6.herokuapp.com/initial_values/';
  private postURL = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/';

  constructor(private http : HttpClient, private messageService: MessageService) { }

  getInfos(): Observable<any> {
    return this.http.get<Info>(this.getURL);
  }

  postInfos(forminfo: string): Observable<any> {
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Info>(this.postURL, forminfo, {'headers':headers});
  }

  createMsg(msg: string) {
    this.messageService.add(msg);
  }

  clearMsg() {
    this.messageService.clear();
  }

  private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('An error occurred:', error.error.message);
    this.messageService.add('Error occurred in form submission!');
  } 
  else {
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
      this.messageService.add('Error occurred in form submission!');
  }
  return throwError('Something bad happened; please try again later.');
}

}
