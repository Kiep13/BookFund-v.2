import { DELAY } from '../constants';
import { AlertTypes } from '../enums';
import { IAlert } from '../interfaces';

class AlertService {
  private alerts: IAlert[] =[];
  private subscriberFunctions: Function[] = [];

  public subscribe(subscriberFunction: Function): void {
    this.subscriberFunctions.push(subscriberFunction);
  }

  public getAlerts(): IAlert[] {
    return this.alerts;
  }

  public addInfo(message: string): void {
    this.addAlert(message, AlertTypes.INFO);
  }

  public addSuccess(message: string): void {
    this.addAlert(message, AlertTypes.SUCCESS);
  }

  public addWarning(message: string): void {
    this.addAlert(message, AlertTypes.WARNING);
  }

  public addError(message: string): void {
    this.addAlert(message, AlertTypes.ERROR);
  }

  private addAlert(message: string, type: AlertTypes): void {
    const newAlert: IAlert = {
      id: Date.now(),
      message,
      type: type,
      delay: DELAY,
      closable: false
    }

    this.alerts.push(newAlert);

    const timeout = setTimeout(() => {
      this.removeAlert(newAlert.id);
      clearTimeout(timeout);
    }, newAlert.delay);

    this.notify();
  }

  private removeAlert(id: number): void {
    this.alerts = this.alerts.filter((alert: IAlert) => alert.id !== id);
    this.notify();
  }

  private notify(): void {
    this.subscriberFunctions.forEach((notify: Function) => {
      notify();
    })
  }
}

export const alertService = new AlertService();
