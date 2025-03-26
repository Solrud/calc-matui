import {Component, inject, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslatePipe} from '@ngx-translate/core';
import {DEFAULT_APP_VERSION, News} from './news';
import {EventObserveService} from '../../shared/event/event-observe.service';
import {DatePipe, NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [
    TranslatePipe,
    DatePipe,
    NgTemplateOutlet
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent implements OnInit{
  activeModal = inject(NgbActiveModal);
  private eventService = inject(EventObserveService);

  oldAppVersion: string;
  currentAppVersion: string = DEFAULT_APP_VERSION;
  allNews: News[] = [];
  isFirstTimeOpened: boolean = false;



  ngOnInit(): void {
    this._currentAppVersion();
    this.packNewsList();
  }

  _currentAppVersion(){
    this.eventService.currentAppVersion$.subscribe( version => {
      if(version){
        this.oldAppVersion = version;
        if (this.oldAppVersion === 'v.0.0.0')
          this.isFirstTimeOpened = true;
      }
    })
  }

  packNewsList(){
    this.allNews = [
      // new News('v.0.1.0', this.makeDate(1,6, 2025),
      //   []),
      new News('v.1.0.0', this.makeDate(26, 3, 2025),
        ['Исправлены недочеты', 'Обработка исключения при невозможности вычисления результата']),
      new News('v.1.0.0', this.makeDate(26, 3, 2025),
        ['Релиз приложения']),
      new News('v.0.5.1', this.makeDate(25, 3, 2025),
        ['Исправление мелких багов', 'Добавлены куки для запоминания новости версии ПО и цветовой схемы темы ПО',
          'Цветовая схема таблицы работает исправно', 'Правильное название вкладки браузера']),
      new News('v.0.5.0', this.makeDate(24, 3, 2025),
        ['Добавлены новости разработки ПО', 'Добавлена возможность просмотра инструкции приложения', 'Добавлена информация о разработчиках ПО']),
      new News('v.0.4.0', this.makeDate(20, 3, 2025),
        ['Добавлена выгрузка результата-таблицы в Excel файл']),
      new News('v.0.3.1', this.makeDate(18, 3, 2025),
        ['Исправление багов связанных с изменением полей ввода']),
      new News('v.0.3.0', this.makeDate(17, 3, 2025),
        ['Добавлена возможность изменения темы ПО']),
      new News('v.0.2.0', this.makeDate(6, 3, 2025),
        ['Добавлена таблица для отображения результата', 'Исправление мелких недочетов', 'Переделаны сервисы для работы с данными']),
      new News('v.0.1.3', this.makeDate(5, 3, 2025),
        ['Исправление формул для расчета', 'Поля ввода данных работают', 'Выводится результат']),
      new News('v.0.1.2', this.makeDate(4, 3, 2025),
        ['Переопределение сервисов для работы с данными внутри приложения, без использования внешних сервисов API']),
      new News('v.0.1.1', this.makeDate(3, 3, 2025),
        ['Распределение компонентов', 'Макет приложения', 'Создание сервисов для обработки данных']),
       new News('v.0.1.0', this.makeDate(26, 2, 2025),
        ['Началась разработка ПО', 'Подключение библиотек для разработки', 'Добавление основных элементов приложения', 'Распределение полей ввода и кнопок' ])
    ]
  }

  makeDate(day: number, month: number, year: number): Date{
    return new Date(year, month - 1, day);
  }



  onClickCancel(): void {
    this.activeModal.close();
  }

}
