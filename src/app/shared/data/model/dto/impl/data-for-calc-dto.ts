import {MaterialProcessingDTO} from './material-processing-dto';
import {RemovingImbalanceFromDTO} from './removing-imbalance-from-dto';

export class DataForCalcDTO {
  materialProcessing: MaterialProcessingDTO;
  removingImbalanceFrom: RemovingImbalanceFromDTO;
  widthProcessing: number;
  depthIncision: number;
  massRemovable: number;
}
