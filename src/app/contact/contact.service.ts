import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

class FlaggedReplaySubject<T> {
  public rs: ReplaySubject<T>;
  public emitted: boolean;
  constructor(bufferSize = 1) {
    this.emitted = false;
    this.rs = new ReplaySubject<T>(bufferSize);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  /** The base route for all email requests */
  private _emailRoute = 'email/';
  /** Emits the status of the clients current sent email session - If email has been recently sent */
  private _recentEmailStatus: FlaggedReplaySubject<{ status: boolean }>;

  constructor(
    private _http: HttpClient
  ) {
    this._recentEmailStatus = new FlaggedReplaySubject<{ status: boolean }>();
  }

  /** Send the POST request to the server for emailing the contact email */
  sendContactEmail(name: string, email: string, message: string): Observable<{ success: boolean, errors: any[] }> {
    return this._http.post<any>(`${this._emailRoute}contact`, { name, email, message }).pipe(
      tap(res => res.success && this._recentEmailStatus.rs.next({ status: true })),
      map(_ => ({ success: true, errors: undefined })),
      catchError(err => of({ success: false, errors: err.status === 422 ? err.error : undefined }))
    )
  }

  /** Get the status of the clients current recent email session */
  get recentEmailStatus(): Observable<{ status: boolean }> {
    if (!this._recentEmailStatus.emitted) {
      this._recentEmailStatus.emitted = true;
      this._http.get<boolean>(`${this._emailRoute}recentpost`).subscribe(status => this._recentEmailStatus.rs.next({ status }));
    }
    return this._recentEmailStatus.rs.asObservable();
  }
}
