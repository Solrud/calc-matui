import {Component, inject, OnInit} from '@angular/core';
import {
  RemovingImbalanceFromService
} from '../../shared/data/service/removing-imbalance-from-service/removing-imbalance-from.service';
import {
  MaterialProcessingService
} from '../../shared/data/service/material-processing-service/material-processing.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RemovingImbalanceFromDTO} from '../../shared/data/model/dto/impl/removing-imbalance-from-dto';
import {DataForCalcDTO} from '../../shared/data/model/dto/impl/data-for-calc-dto';
import {MaterialProcessingDTO} from '../../shared/data/model/dto/impl/material-processing-dto';
import {CalcService} from '../../shared/data/service/calc-service/calc.service';
import {EventSignalService} from '../../shared/event/event-signal.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-calculate',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    CommonModule,
    TranslatePipe
  ],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss'
})
export class CalculateComponent implements OnInit{
  removingImbalanceService = inject(RemovingImbalanceFromService);
  readonly removingImbalanceFromList$ = this.removingImbalanceService.removingImbalanceFromList$;

  materialProcessingService = inject(MaterialProcessingService);
  readonly materialProcessingList$ = this.materialProcessingService.materialProcessingList$;

  calcService = inject(CalcService);
  eventSignalService = inject(EventSignalService);

  fgCalc: FormGroup;
  selectedRemovingImbalanceFrom: RemovingImbalanceFromDTO;
  selectedMaterialProcessing: MaterialProcessingDTO;
  newDataForCalc: DataForCalcDTO;

  calcResult: number;

  ngOnInit() {
    this._loadData();
    this.initFgCalc();

    this._subscribeFcRemovingImbalanceFrom();
    this._subscribeFcMaterialProcessing();
    this._subscribeValidFgCalc();
  }

  _loadData(){
    this.removingImbalanceService.loadRemovingImbalanceFrom();
    this.materialProcessingService.loadMaterialsProcessing();
  }

  getCorrectValueFromField(_field: string): string | null{
    return '';
  }

  initFgCalc(){
    this.fgCalc = new FormGroup({
      removingImbalanceFrom: new FormControl(
        {value: this.getCorrectValueFromField('removingImbalanceFrom'), disabled: false}, Validators.required), // ! выбор удаления дисбаланса откуда
      materialProcessing: new FormControl(
        {value: null, disabled: true}, Validators.required),                                                    // ! Выбор материала обработки
      widthProcessing: new FormControl(
        {value: null, disabled: true}, Validators.required),                                                    // ! ширина обработки h
      depthIncision: new FormControl(
        {value: null, disabled: true}, Validators.required),                                                    // ! глубина врезания c
      massRemovable: new FormControl(
        {value: null, disabled: true}, Validators.required),                                                    // ! удаляемая масса m
    });
  }

  _subscribeValidFgCalc(): void{
    this.fgCalc.statusChanges.subscribe((status) => {
      if (status === 'INVALID'){
        this.eventSignalService.updateResultCalcInTable(null);
        this.eventSignalService.updateDataForCalcInTable(null);
      }
    })
  }

  _subscribeFcRemovingImbalanceFrom(): void{
    this.fgCalc.get('removingImbalanceFrom').valueChanges.subscribe( result => {

      this.selectedRemovingImbalanceFrom = this.removingImbalanceFromList$.source['_value'][result];

      this.fgCalc.get('materialProcessing').setValue(null);
      this.fgCalc.get('widthProcessing').setValue(null);
      this.fgCalc.get('depthIncision').setValue(null);
      this.fgCalc.get('massRemovable').setValue(null);

      if (result){
        this.fgCalc.get('materialProcessing').enable();
        this.fgCalc.get('widthProcessing').enable();
        this.fgCalc.get('depthIncision').enable();
        this.fgCalc.get('massRemovable').enable();
      }
      if (!result){
        this.calcResult = null;
        this.fgCalc.get('materialProcessing').disable();
        this.fgCalc.get('widthProcessing').disable();
        this.fgCalc.get('depthIncision').disable();
        this.fgCalc.get('massRemovable').disable();
      }

    })
  }
  _subscribeFcMaterialProcessing(): void{
    this.fgCalc.get('materialProcessing').valueChanges.subscribe( result => {
      this.selectedMaterialProcessing = this.materialProcessingList$.source['_value'][result];
    })
  }

  //получить идентификаторы обязательности заполнения поля
  fcFieldIsRequired(fcName: string, returnBoolean: boolean = false): any {
    let fcRequired = this.fgCalc.controls[fcName].hasValidator(Validators.required)
    return returnBoolean ? fcRequired : (fcRequired ? ' *' : '');
  }

  createNewDataForCalc(){
    this.newDataForCalc = new DataForCalcDTO();
    this.newDataForCalc.removingImbalanceFrom = this.selectedRemovingImbalanceFrom;
    this.newDataForCalc.materialProcessing = this.selectedMaterialProcessing;
    this.newDataForCalc.widthProcessing = this.fgCalc.get('widthProcessing').value;
    this.newDataForCalc.depthIncision = this.fgCalc.get('depthIncision').value;
    this.newDataForCalc.massRemovable = this.fgCalc.get('massRemovable').value;
  }

  onClickCalc(){
    this.createNewDataForCalc();

    this.calcService.calc(this.newDataForCalc)
      .subscribe( result => {
        this.calcResult = result.result;

        this.eventSignalService.updateDataForCalcInTable(this.newDataForCalc);
        this.eventSignalService.updateResultCalcInTable(result)
    })
  }
}
