import {computed, Injectable, signal} from '@angular/core';
import {DataForCalcDTO} from '../data/model/dto/impl/data-for-calc-dto';
import {ACalcResultDTO} from '../data/model/dto/acalc-result-dto';

@Injectable({
  providedIn: 'root'
})
export class EventSignalService {
  // * Данные ввода в инпуты для отображения в таблице
  private _dataForCalcInTable = signal<DataForCalcDTO | null>(null);
  readonly dataForCalcInTable = computed(() => this._dataForCalcInTable);
  updateDataForCalcInTable(data: DataForCalcDTO): void {
    this._dataForCalcInTable.set(data);
  }

  // * Результат обработки для отображения в таблице
  private _resultCalcInTable = signal<ACalcResultDTO>(null);
  readonly resultCalcInTable = computed(() => this._resultCalcInTable);
  updateResultCalcInTable(result: ACalcResultDTO): void {
    this._resultCalcInTable.set(result);
  }

}
