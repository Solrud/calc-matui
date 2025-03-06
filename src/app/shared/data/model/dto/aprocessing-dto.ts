import {ABaseDTO} from './abase-dto';

export abstract class AProcessingDTO extends ABaseDTO{
  name: string;

  protected constructor(id: number, name: string){
    super(id);
    this.name = name;
  }
}
