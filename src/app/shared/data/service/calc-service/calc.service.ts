import {inject, Injectable} from '@angular/core';
import {APICalcService} from './apicalc.service';
import {DataForCalcDTO} from '../../model/dto/impl/data-for-calc-dto';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ArcLengthLDTO} from '../../model/dto/impl/arc-length-l-dto';
import {ProtrusionCountNDTO} from '../../model/dto/impl/protrusion-count-n-dto';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  constructor(private readonly apiCalcService: APICalcService)
  { }

  calcArcLength(data: DataForCalcDTO): Observable<ArcLengthLDTO>{
   return this.apiCalcService.calcArcLength$(data);
  }

  calcProtrusionCount(data: DataForCalcDTO): Observable<ProtrusionCountNDTO>{
    return this.apiCalcService.calcProtrusionCount$(data);
  }
}
