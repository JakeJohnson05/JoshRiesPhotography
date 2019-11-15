import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


/** Simply a replay subject with a flag for if it has been emitted */
class FlaggedReplaySubject<T> {
  public rs: ReplaySubject<T>;
  public emitted: boolean;
  constructor(bufferSize = 1) {
    this.emitted = false;
    this.rs = new ReplaySubject<T>(bufferSize);
  }
}

/** The response type when submiting an contact request */
export class SendContactEmailRes {
  success: boolean;
  errors: {
    value: string;
    msg: string;
    param: string;
    location: string;
  }[]
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  /** The base route for all email requests */
  private _emailRoute = 'email/';
  /** Emits the status of the clients current sent email session - If email has been recently sent */
  private _recentEmailStatus: FlaggedReplaySubject<{ sent: number }>;

  constructor(
    private _http: HttpClient
  ) {
    this._recentEmailStatus = new FlaggedReplaySubject<{ sent: number }>();
  }

  /** Send the POST request to the server for emailing the contact email */
  sendContactEmail(name: string, email: string, message: string): Observable<SendContactEmailRes> {
    return this._http.post<any>(`${this._emailRoute}contact`, { name, email, message }).pipe(
      tap(res => res.success && this._recentEmailStatus.rs.next({ sent: res.emailsSent || 1 })),
      map(_ => ({ success: true, errors: undefined })),
      catchError(err => {
        if (err.status === 420) this._recentEmailStatus.rs.next({ sent: 2 });
        return of({ success: false, errors: err.status === 422 ? err.error : undefined });
      })
    )
  }

  /** Get the status of the clients current recent email session */
  get recentEmailStatus(): Observable<{ sent: number }> {
    if (!this._recentEmailStatus.emitted) {
      this._recentEmailStatus.emitted = true;
      this._http.get<number>(`${this._emailRoute}recentpost`)
        .subscribe(sent => this._recentEmailStatus.rs.next({ sent }));
    }
    return this._recentEmailStatus.rs.asObservable();
  }
}
