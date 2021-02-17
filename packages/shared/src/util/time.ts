export class Time {
  static UTC_SECONDS(): number {
    return Date.parse(new Date().toUTCString());
  }

  static UTC_MILLIS(): number {
    return this.UTC_SECONDS() * 1000;
  }
}
