export class Logger {
  static info(...args: unknown[]): void {
    console.log(...args);
  }

  static warn(...args: unknown[]): void {
    console.warn(...args);
  }

  static error(...args: unknown[]): void {
    console.error(...args);
  }
}
