import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventObserveService {

  currentAppVersion$ = new BehaviorSubject<string>(null);          //* текущая версия приложения
  changeAppVersion(currentAppVersion: string) {
    this.currentAppVersion$.next(currentAppVersion);
  }

}
