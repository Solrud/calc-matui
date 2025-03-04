import {ABaseDTO} from '../abase-dto';

export class MaterialProcessingDTO extends ABaseDTO{
  hardness: number;

  constructor(id: number, name: string, hardness: number) {
    super(id, name);
    this.hardness = hardness;
  }
}
