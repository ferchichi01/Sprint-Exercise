import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ISprintList } from '../models/SprintList';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import 'rxjs/add/operator/map';


(window as any).global = window;


@Injectable()
export class SprintListService {

  auth0 = new auth0.WebAuth({
    clientID: 'wpa0n88bUfa4ydmBDLbBQGUtQKXQLk22',
    domain: 'sprint-exercise.auth0.com',
    responseType: 'token id_token',
    audience: 'https://sprint-exercise.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/sprints',
    scope: 'openid profile'
  });

  constructor(private http: Http,
    public router: Router
  ) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('user', authResult.idTokenPayload.name);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<ISprintList[]> {


    let URI = `${this.serverApi}/sprintlist/`;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <ISprintList[]>res.lists);
  }

  public deleteList(): Observable<ISprintList[]> {
    let URI = `${this.serverApi}/sprintlist/`;
    //let headers = new Headers;
    //headers.append('Content-Type', 'application/json');
    return this.http.delete(URI)
      .map(res => res.json())
      .map(res => <ISprintList[]>res.lists);
  }

  public addList(list: ISprintList) {
    let URI = `${this.serverApi}/sprintlist/`;
    let headers = new Headers;
    let body = JSON.stringify({
      name: list.name,
      duration: list.duration,
      status: list.status,
      progress: list.progress,
      description: list.description,
      notify: list.notify,
      user: list.user,
      createdAt: list.createdAt,
      startedAt: list.startedAt,
      finishedAt: list.finishedAt
    });

    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, { headers: headers })
      .map(res => res.json());
  }



}
