import {inject, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export abstract class ABase {
  protected url: InjectionToken<string>;
  protected http = inject(HttpClient);

  protected constructor(url: InjectionToken<string>) {
    this.url = url;
  }
}
