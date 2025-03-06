import {AProcessingDTO} from '../aprocessing-dto';

export class MaterialProcessingDTO extends AProcessingDTO{
  hardness: number;

  constructor(id: number, name: string, hardness: number) {
    super(id, name);
    this.hardness = hardness;
  }
}
