import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ABase} from '../abase';
import {MATERIAL_PROCESSING_TOKEN} from '../../url/baseUrl.token';
import {ISearch} from '../isearch';
import {Observable} from 'rxjs';
import {IBaseDTO} from '../../model/dto/ibase-dto';

@Injectable({
  providedIn: 'root'
})
export class APIMaterialProcessingService<D extends IBaseDTO> extends ABase implements ISearch<D>{
  constructor(@Inject(MATERIAL_PROCESSING_TOKEN) url: InjectionToken<string>) {
    super(url);
  }

  getAll$(): Observable<D[]>{
    return this.http
      .get<D[]>(this.url + '/get');
  }
}
