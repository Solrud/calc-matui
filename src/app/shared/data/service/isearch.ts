import {Observable} from 'rxjs';

export interface ISearch<D> {
  getAll$(): Observable<D[]>
}
