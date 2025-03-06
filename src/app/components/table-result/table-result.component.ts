import {Component, effect, inject} from '@angular/core';
import {EventSignalService} from '../../shared/event/event-signal.service';
import {DataForCalcDTO} from '../../shared/data/model/dto/impl/data-for-calc-dto';
import {ACalcResultDTO} from '../../shared/data/model/dto/acalc-result-dto';

@Component({
  selector: 'app-table-result',
  imports: [],
  templateUrl: './table-result.component.html',
  styleUrl: './table-result.component.scss'
})
export class TableResultComponent{
  dataForCalc: DataForCalcDTO;
  resultCalc: ACalcResultDTO;

  private eventSignalService = inject(EventSignalService);

  constructor() {
    effect(() => {
      this.dataForCalc = this.eventSignalService.dataForCalcInTable()();
    });
    effect(() => {
      this.resultCalc = this.eventSignalService.resultCalcInTable()();
    });
  }
}
