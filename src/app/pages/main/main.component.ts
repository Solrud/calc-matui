import {Component, effect, inject} from '@angular/core';
import {CalculateComponent} from '../../components/calculate/calculate.component';
import {TableResultComponent} from '../../components/table-result/table-result.component';
import {EventSignalService} from '../../shared/event/event-signal.service';
import {ACalcResultDTO} from '../../shared/data/model/dto/acalc-result-dto';
import * as XLSX from 'xlsx';
import {DataForCalcDTO} from '../../shared/data/model/dto/impl/data-for-calc-dto';

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
  dataForCalc: DataForCalcDTO;

  constructor() {
    effect(() => {
      this.resultCalc = this.eventSignalService.resultCalcInTable()();
    });
    effect(() => {
      this.dataForCalc = this.eventSignalService.dataForCalcInTable()();
    });
  }

  exportToExcel(){
    const data = [
      ['Параметр', 'Значение', 'Единица измерения'], // Заголовки
      ['ширина обработки (h) =', this.dataForCalc.widthProcessing, 'мм'],
      ['глубина врезания (с) =', this.dataForCalc.depthIncision, 'мм'],
      ['удаляемая масса (m) =', this.dataForCalc.massRemovable, 'грамм'],
      ['', '', ''],
      ['Результаты расчетов', '', ''],
      [this.resultCalc.nameMethod + '=', this.resultCalc.result, this.resultCalc.unitMeasurement]
    ];

    // Создание рабочей книги и листа
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Ширина ячеек
    worksheet['!cols'] = [
      { wch: 40 },
      { wch: 15 },
      { wch: 20 }
    ];

    // Создание раб книги и добавление листа
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Выгрузка файла
    XLSX.writeFile(workbook, `Результат вычисления метода ${this.resultCalc.nameMethod}` +
      ` ${day}.${month}.${year} ${hours}-${minutes}-${seconds}.xlsx`);
  }

}
