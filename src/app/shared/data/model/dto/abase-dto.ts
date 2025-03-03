import {IBaseDTO} from './ibase-dto';

export abstract class ABaseDTO implements IBaseDTO{
  id: string;
  name: string;
}
