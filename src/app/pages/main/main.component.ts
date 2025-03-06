import {Component, effect, inject} from '@angular/core';
import {CalculateComponent} from '../../components/calculate/calculate.component';
import {TableResultComponent} from '../../components/table-result/table-result.component';
import {EventSignalService} from '../../shared/event/event-signal.service';
import {ACalcResultDTO} from '../../shared/data/model/dto/acalc-result-dto';

@Component({
  selector: 'app-main',
  imports: [
    CalculateComponent,
    TableResultComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  host: {'class': "d-flex flex-grow-1 soft-white-gray-bg"}
})
export class MainComponent {
  private eventSignalService = inject(EventSignalService);
  resultCalc: ACalcResultDTO;

  constructor() {
    effect(() => {
      this.resultCalc = this.eventSignalService.resultCalcInTable()();
    });
  }


}
