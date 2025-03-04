import {inject, Inject, Injectable, InjectionToken} from '@angular/core';
import {ABase} from '../abase';
import {MATERIAL_PROCESSING_TOKEN} from '../../url/baseUrl.token';
import {ISearch} from '../isearch';
import {Observable, of} from 'rxjs';
import {MaterialProcessingDTO} from '../../model/dto/impl/material-processing-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIMaterialProcessingService extends ABase implements ISearch<MaterialProcessingDTO>{
  constructor(@Inject(MATERIAL_PROCESSING_TOKEN) url: InjectionToken<string>) {
    super(url);
  }

  getAll$(): Observable<MaterialProcessingDTO[]>{
    // return this.http
    //   .get<D[]>(this.url + '/get');

    return of([new MaterialProcessingDTO(0, 'Титан', 0.0045),
      new MaterialProcessingDTO(1, 'Сталь', 0.0082)]);
  }
}
