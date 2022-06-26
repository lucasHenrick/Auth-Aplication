import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
// lucashenrick@vidafullstack.com
  private url: string = "http://localhost:3000";
  constructor( private http: HttpClient, private router: Router ) { }

  public sign(payload: { email: string, password: string }): Observable<any> {
    return this.http.post<{token: string}>(`${this.url}/sign`, payload).pipe(
      map((res) => {
        localStorage.removeItem('acces_token')
        localStorage.setItem('acces_token', res.token)
        return this.router.navigate(['admin'])
      }),
      catchError((err) => {
        if(err.error.message){
          return throwError('Usuário ou senha incorreta')
        }

        return throwError('No momento não estamos Conseguindo validar este dados, tente novamente mais tarde')

      })
    );
  }

  public logout(): void{
    localStorage.removeItem('acces_token');
    this.router.navigate(['']);
  }
}
