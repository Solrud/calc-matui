import {InjectionToken} from '@angular/core';
import {environment} from '../../../../environments/environment';

export const AUTH_URL_TOKEN = new InjectionToken('url auth', {
  providedIn: 'root',
  factory: () => environment.backendURL + '/auth',
})
export const MATERIAL_PROCESSING_TOKEN = new InjectionToken('Materials url', {
  providedIn: 'root',
  factory: () => environment.backendURL,
})
export const REMOVING_IMBALANCE_FROM_TOKEN = new InjectionToken('Removing imbalance from url', {
  providedIn: 'root',
  factory: () => environment.backendURL,
})
export const DATA_FOR_CALC_TOKEN = new InjectionToken('Data for calc url', {
  providedIn: 'root',
  factory: () => environment.backendURL,
})
