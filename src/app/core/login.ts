import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Login {
  private http = inject(HttpClient);
  private baseUri = "https://finchat.kod3.com.br/v1/login/verification-code/generate";

  sendCode(telefone: string): Observable<boolean> {
    console.log(telefone)
    return this.http.post<void>(this.baseUri, { telefone }, { observe: 'response' }).pipe(
      map((response: HttpResponse<void>) => {
        return response.status === 201;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }


  validateCodeAndGetToken(telefone: string, code: string): Observable<string> {
    return this.http.post<TokenDto>(this.baseUri, { telefone, code }, { observe: 'response' }).pipe(
      map((response: HttpResponse<TokenDto>) => {
        if (response.body?.token) {
          return response.body.token;
        }
        return '';
      }),
      catchError(() => {
        return of('');
      })
    );
  }

}

type TokenDto = {
  token: string
}