import {IBaseDTO} from './ibase-dto';

export abstract class ABaseDTO implements IBaseDTO{
  id: number;
  name: string;

  protected constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
