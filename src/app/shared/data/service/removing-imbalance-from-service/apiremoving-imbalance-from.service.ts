import {inject, Inject, Injectable, InjectionToken} from '@angular/core';
import {ISearch} from '../isearch';
import {Observable, of} from 'rxjs';
import {REMOVING_IMBALANCE_FROM_TOKEN} from '../../url/baseUrl.token';
import {ABase} from '../abase';
import {RemovingImbalanceFromDTO} from '../../model/dto/impl/removing-imbalance-from-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIRemovingImbalanceFromService extends ABase implements ISearch<RemovingImbalanceFromDTO>{
  constructor(@Inject(REMOVING_IMBALANCE_FROM_TOKEN) url: InjectionToken<string>) {
    super(url);
  }

  getAll$(): Observable<RemovingImbalanceFromDTO[]> {
    // return this.http
    //   .get<D[]>(this.url + '/get');

    return of([new RemovingImbalanceFromDTO(0, 'С выступов диска'),
      new RemovingImbalanceFromDTO(1, 'С балансировочного бурта')])
  }
}
