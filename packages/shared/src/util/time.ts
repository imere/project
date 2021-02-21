export class UTC {
  static MILLIS(): number {
    return Date.parse(new Date().toUTCString());
  }
}
