import {inject, Inject, Injectable, InjectionToken} from '@angular/core';
import {ABase} from '../abase';
import {DATA_FOR_CALC_TOKEN} from '../../url/baseUrl.token';
import {DataForCalcDTO} from '../../model/dto/impl/data-for-calc-dto';
import {Observable, of} from 'rxjs';
import {ArcLengthLDTO} from '../../model/dto/impl/arc-length-l-dto';
import {ProtrusionCountNDTO} from '../../model/dto/impl/protrusion-count-n-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APICalcService extends ABase{

  constructor(@Inject(DATA_FOR_CALC_TOKEN) url: InjectionToken<string>) {
    super(url);
  }

  calcArcLength$(data: DataForCalcDTO): Observable<ArcLengthLDTO>{
    // return this.http
    //   .post<ArcLengthLDTO>(this.url + '/arc-length' + '/calc', data);

    const m = data.massRemovable;
    const h = data.widthProcessing;
    const c = data.depthIncision;
    const p = data.materialProcessing.hardness;
    const arcLength = new ArcLengthLDTO();
    arcLength.L = m / (p * h * c);

    return of(arcLength);
  }

  calcProtrusionCount$(data: DataForCalcDTO): Observable<ProtrusionCountNDTO>{
    // return this.http
    //   .post<ProtrusionCountNDTO>(this.url + '/protrusion-count' + '/calc', data);

    const m = data.massRemovable;
    const h = data.widthProcessing;
    const c = data.depthIncision;
    const p = data.materialProcessing.hardness;
    const R = 12.6;

    const a = 2 * Math.acos(((R - c) / R));
    const S = (1/2) * Math.pow(R, 2) * (a - Math.sin(a));
    const m1 = S * h * p;
    const N = Math.round(m/m1);

    const protrusionCount = new ProtrusionCountNDTO();
    protrusionCount.N = N;

    return of(protrusionCount);
  }
}
