import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ISprintList } from '../models/SprintList';

import 'rxjs/add/operator/map';

@Injectable()
export class SprintListService {

  constructor(private http: Http) { }

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
