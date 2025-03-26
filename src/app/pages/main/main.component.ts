import {Component, effect, inject, OnInit} from '@angular/core';
import {CalculateComponent} from '../../components/calculate/calculate.component';
import {TableResultComponent} from '../../components/table-result/table-result.component';
import {EventSignalService} from '../../shared/event/event-signal.service';
import {ACalcResultDTO} from '../../shared/data/model/dto/acalc-result-dto';
import * as XLSX from 'xlsx';
import {DataForCalcDTO} from '../../shared/data/model/dto/impl/data-for-calc-dto';
import {TranslateService} from '@ngx-translate/core';
import {LS_APP, LS_APP_THEME, LS_APP_VERSION} from '../../shared/local-storage/local-storage-constants';
import {LocalStorageService} from '../../shared/local-storage/local-storage.service';
import {EventObserveService} from '../../shared/event/event-observe.service';
import {ThemeService} from '../../shared/theme/theme.service';
import {Theme} from '../../shared/theme/theme.enum';

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
export class MainComponent implements OnInit{
  private eventSignalService = inject(EventSignalService);
  private eventObserverService = inject(EventObserveService);
  private localStorage = inject(LocalStorageService);
  private themeService = inject(ThemeService);

  resultCalc: ACalcResultDTO;
  dataForCalc: DataForCalcDTO;

  userLocalStorageName: string = LS_APP;

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('ru')

    effect(() => {
      this.resultCalc = this.eventSignalService.resultCalcInTable()();
    });
    effect(() => {
      this.dataForCalc = this.eventSignalService.dataForCalcInTable()();
    });
  }

  ngOnInit() {
    this._changeAppVersion();
    this._changeAppTheme();

    this.initLocalStorageValues();//инициализируем значения переменных из куков
  }

  initLocalStorageValues(){
    let userLocalStorageValuesParse = JSON.parse(this.localStorage.getLocalStorage(this.userLocalStorageName));
    if (!userLocalStorageValuesParse) userLocalStorageValuesParse = {};

    //инициализация версии приложения для отображения колокольчика уведомлений
    const versionLocalStorage = userLocalStorageValuesParse[LS_APP_VERSION];
    if (versionLocalStorage) {
      this.eventObserverService.changeAppVersion(versionLocalStorage);
    } else {
      this.eventObserverService.changeAppVersion('v.0.0.0');
    }

    const themeLocalStorage = userLocalStorageValuesParse[LS_APP_THEME];
    if (themeLocalStorage) {
      this.eventObserverService.changeAppTheme(themeLocalStorage);
    } else {
      this.eventObserverService.changeAppTheme(Theme.LIGHT);
    }
  }

  _changeAppTheme(){
    this.eventObserverService.currentAppTheme$.subscribe( currentTheme => {
      if (currentTheme){
        this.localStorage.addValueLocalStorage(this.userLocalStorageName, JSON.stringify({[LS_APP_THEME]: currentTheme}));
        this.themeService.changeTheme(currentTheme);
      }
    })
  }

  //подписка на тему приложения
  _changeAppVersion() {
    this.eventObserverService.currentAppVersion$.subscribe(currentVersion => {
      if (currentVersion)
        this.localStorage.addValueLocalStorage(this.userLocalStorageName, JSON.stringify({[LS_APP_VERSION]: currentVersion}));
    })
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Лист результата');

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
