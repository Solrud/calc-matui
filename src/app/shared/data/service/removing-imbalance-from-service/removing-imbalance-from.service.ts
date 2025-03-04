import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RemovingImbalanceFromDTO} from '../../model/dto/impl/removing-imbalance-from-dto';
import {APIRemovingImbalanceFromService} from './apiremoving-imbalance-from.service';

@Injectable({
  providedIn: 'root'
})
export class RemovingImbalanceFromService {
  private readonly removingImbalanceFrom$
    = new BehaviorSubject<RemovingImbalanceFromDTO[] | null>(null);

  constructor(private readonly apiRemovingImbalanceFromService: APIRemovingImbalanceFromService)
  { }

  get removingImbalanceFromList$(): Observable<RemovingImbalanceFromDTO[] | null>{
    return this.removingImbalanceFrom$.asObservable();
  }

  loadRemovingImbalanceFrom(){
    this.apiRemovingImbalanceFromService.getAll$().subscribe( removingImbalanceFrom => {
      this.removingImbalanceFrom$.next(removingImbalanceFrom);
    })
  }

}
