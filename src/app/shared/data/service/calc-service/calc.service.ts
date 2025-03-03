import { Injectable } from '@angular/core';
import {APICalcService} from './apicalc.service';
import {DataForCalcDTO} from '../../model/dto/impl/data-for-calc-dto';

@Injectable({
  providedIn: 'root'
})
export class CalcService {

  constructor(private readonly apiCalcService: APICalcService)
  { }

  calcArcLength(data: DataForCalcDTO){
   this.apiCalcService.calcArcLength$(data);
  }

  calcProtrusionCount$(data: DataForCalcDTO){
    this.apiCalcService.calcProtrusionCount$(data);
  }
}
