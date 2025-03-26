export class News {
  version: string;
  date: Date;
  description: string[];

  constructor(version: string, date: Date, description: string[] = null) {
    this.version = version;
    this.date = date;
    this.description = description;
  }
}


export const DEFAULT_APP_VERSION = 'v.1.0.1';
