import { Injectable } from '@angular/core';
import {APIMaterialProcessingService} from './apimaterial-processing.service';
import {MaterialProcessingDTO} from '../../model/dto/impl/material-processing-dto';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialProcessingService {
  private readonly materialProcessing$ = new BehaviorSubject<MaterialProcessingDTO[] | null>(null);

  constructor(
    private readonly apiMaterialProcessingService: APIMaterialProcessingService)
  { }

  get materialProcessingList$(): Observable<MaterialProcessingDTO[] | null>{
    return this.materialProcessing$.asObservable();
  }

  loadMaterialsProcessing(): void{
    this.apiMaterialProcessingService.getAll$().subscribe( materials => {
      this.materialProcessing$.next(materials);
    })
  }
}
