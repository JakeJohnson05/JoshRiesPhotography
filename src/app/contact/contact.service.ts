import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  /** The base route for all email requests */
  private _emailRoute = 'email/';
  
  constructor(
    private _http: HttpClient
  ) { }

  /** Send the POST request to the server for emailing the contact email */
  sendContactEmail(name: string, email: string, message: string): Observable<{ success: boolean, errors: any[] }> {
    return this._http.post<any>(`${this._emailRoute}contact`, { name, email, message }).pipe(
      map(_ => ({ success: true, errors: undefined })),
      catchError(err => of({ success: false, errors: err.status === 422 ? err.error : undefined }))
    )
  }
}
