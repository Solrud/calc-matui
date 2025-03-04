import {Component, inject, OnInit} from '@angular/core';
import {RemovingImbalanceFromList} from "../../shared/data/removing-imbalance-from";
import {MaterialProcessingList} from "../../shared/data/material-processing";
import {
  RemovingImbalanceFromService
} from '../../shared/data/service/removing-imbalance-from-service/removing-imbalance-from.service';

@Component({
  selector: 'app-calculate',
  imports: [],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss'
})
export class CalculateComponent implements OnInit{
  removalImbalanceFromList = RemovingImbalanceFromList;
  materialProcessingList = MaterialProcessingList;

  removingImbalanceService = inject(RemovingImbalanceFromService);

  ngOnInit() {
    this.removingImbalanceService.loadRemovingImbalanceFrom();
    console.log(this.removingImbalanceService.removingImbalanceFromList$);
  }

}
