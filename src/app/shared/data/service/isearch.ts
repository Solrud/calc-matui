import {Observable} from 'rxjs';
import {IBaseDTO} from '../model/dto/ibase-dto';

export interface ISearch<D extends IBaseDTO> {
  getAll$(): Observable<D[]>
}
