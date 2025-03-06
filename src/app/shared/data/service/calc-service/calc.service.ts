import {Injectable} from '@angular/core';
import {APICalcService} from './apicalc.service';
import {DataForCalcDTO} from '../../model/dto/impl/data-for-calc-dto';
import {Observable} from 'rxjs';
import {ArcLengthLDTO} from '../../model/dto/impl/arc-length-l-dto';
import {ProtrusionCountNDTO} from '../../model/dto/impl/protrusion-count-n-dto';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  constructor(private readonly apiCalcService: APICalcService) {
  }

  calc(data: DataForCalcDTO): Observable<ProtrusionCountNDTO | ArcLengthLDTO> {
    return this.apiCalcService.calc$(data);
  }
}
