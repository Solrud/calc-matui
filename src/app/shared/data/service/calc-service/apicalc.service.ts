import {Inject, Injectable, InjectionToken} from '@angular/core';
import {ABase} from '../abase';
import {DATA_FOR_CALC_TOKEN} from '../../url/baseUrl.token';
import {DataForCalcDTO} from '../../model/dto/impl/data-for-calc-dto';
import {Observable} from 'rxjs';
import {ArcLengthLDTO} from '../../model/dto/impl/arc-length-l-dto';
import {ProtrusionCountNDTO} from '../../model/dto/impl/protrusion-count-n-dto';

@Injectable({
  providedIn: 'root'
})
export class APICalcService extends ABase{

  constructor(@Inject(DATA_FOR_CALC_TOKEN) url: InjectionToken<string>) {
    super(url);
  }

  calcArcLength$(data: DataForCalcDTO): Observable<ArcLengthLDTO>{
    return this.http
      .post<ArcLengthLDTO>(this.url + '/arc-length' + '/calc', data);
  }

  calcProtrusionCount$(data: DataForCalcDTO): Observable<ProtrusionCountNDTO>{
    return this.http
      .post<ProtrusionCountNDTO>(this.url + '/protrusion-count' + '/calc', data);
  }
}
