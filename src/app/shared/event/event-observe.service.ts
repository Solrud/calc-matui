import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Theme} from '../theme/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class EventObserveService {

  currentAppVersion$ = new BehaviorSubject<string>(null);          //* текущая версия приложения
  changeAppVersion(currentAppVersion: string) {
    this.currentAppVersion$.next(currentAppVersion);
  }

  currentAppTheme$ = new BehaviorSubject<Theme>(null);            //* тема приложения
  changeAppTheme(currentAppTheme: Theme) {
    this.currentAppTheme$.next(currentAppTheme);
  }
}
