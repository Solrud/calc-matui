import {IBaseDTO} from './ibase-dto';

export class ACalcResultDTO implements IBaseDTO{
  result: number;
  unitMeasurement: string;
  nameMethod: string;
}
