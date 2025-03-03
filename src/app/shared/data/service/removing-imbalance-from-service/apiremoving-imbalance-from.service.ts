import {Inject, Injectable, InjectionToken} from '@angular/core';
import {IBaseDTO} from '../../model/dto/ibase-dto';
import {ISearch} from '../isearch';
import {Observable} from 'rxjs';
import {REMOVING_IMBALANCE_FROM_TOKEN} from '../../url/baseUrl.token';
import {ABase} from '../abase';

@Injectable({
  providedIn: 'root'
})
export class APIRemovingImbalanceFromService<D extends IBaseDTO> extends ABase implements ISearch<D>{
  constructor(@Inject(REMOVING_IMBALANCE_FROM_TOKEN) url: InjectionToken<string>) {
    super(url)
  }

  getAll$(): Observable<D[]> {
    return this.http
      .get<D[]>(this.url + '/get');
  }
}
