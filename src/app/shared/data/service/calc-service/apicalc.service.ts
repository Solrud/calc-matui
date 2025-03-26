import {inject, Inject, Injectable, InjectionToken} from '@angular/core';
import {ABase} from '../abase';
import {DATA_FOR_CALC_TOKEN} from '../../url/baseUrl.token';
import {DataForCalcDTO} from '../../model/dto/impl/data-for-calc-dto';
import {Observable, of, throwError} from 'rxjs';
import {ArcLengthLDTO} from '../../model/dto/impl/arc-length-l-dto';
import {ProtrusionCountNDTO} from '../../model/dto/impl/protrusion-count-n-dto';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APICalcService extends ABase {

  constructor(@Inject(DATA_FOR_CALC_TOKEN) url: InjectionToken<string>) {
    super(url);
  }

  calc$(data: DataForCalcDTO): Observable<ProtrusionCountNDTO | ArcLengthLDTO> {

    if (data.removingImbalanceFrom.name == 'С балансировочного бурта') {
      // return this.http
      //   .post<ArcLengthLDTO>(this.url + '/arc-length' + '/calc', data);

      const m = data.massRemovable;
      const h = data.widthProcessing;
      const c = data.depthIncision;
      const p = data.materialProcessing.hardness;
      const l = m / (p * h * c);

      if (!l) return throwError(() => new Error('Невозможно вычислить с такими данными'));

      const arcLength = new ArcLengthLDTO();
      arcLength.result = Number(l.toFixed(1));
      arcLength.unitMeasurement = 'мм';
      arcLength.nameMethod = 'длина дуги (L)'

      return of(arcLength);
    }
    if (data.removingImbalanceFrom.name == 'С выступов диска') {
      // return this.http
      //   .post<ProtrusionCountNDTO>(this.url + '/protrusion-count' + '/calc', data);

      const m = data.massRemovable;
      const h = data.widthProcessing;
      const c = data.depthIncision;
      const p = data.materialProcessing.hardness;
      const R = 12.6;

      const a = 2 * Math.acos(((R - c) / R));
      const S = (1 / 2) * Math.pow(R, 2) * (a - Math.sin(a));
      const m1 = S * h * p;
      const N = Math.round(m / m1);

      if (!N) return throwError(() => new Error('Невозможно вычислить с такими данными'));

      const protrusionCount = new ProtrusionCountNDTO();
      protrusionCount.result = N;
      protrusionCount.unitMeasurement = 'шт.';
      protrusionCount.nameMethod = 'количество выступов (N)'

      return of(protrusionCount);
    }

    return of(null);
  }
}
