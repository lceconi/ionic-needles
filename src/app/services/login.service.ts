import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SETTINGS } from '../../app/settings';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private storage: Storage,
              private events: Events,
              private api: ApiService) { }

  public login(dados: object) {
    let url = SETTINGS.SERVIDOR + 'api-token-auth/';
    let formData = new FormData();
    for (let key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.post(url, formData);
  }

  public cadastro(dados: object) {
    let url = SETTINGS.API_URL + 'cadastro/';
    let formData = new FormData();
    for (let key in dados) {
      formData.append(key, dados[key]);
    }
    return this.api.post(url, formData);
  }

  public getToken() {
    return this.storage.get('token');
  }

  public sendLogoutEvent() : void {
    this.storage.clear().then(
      data => {
        this.events.publish('logout');
      }
    );
  }
}