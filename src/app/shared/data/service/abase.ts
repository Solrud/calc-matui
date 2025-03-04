import {InjectionToken} from '@angular/core';

export abstract class ABase {
  protected url: InjectionToken<string>;

  protected constructor(url: InjectionToken<string>) {
    this.url = url;
  }
}
