import {IBaseDTO} from './ibase-dto';

export abstract class ABaseDTO implements IBaseDTO{
  id: number;

  protected constructor(id: number) {
    this.id = id;
  }
}
