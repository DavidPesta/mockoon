import { Injectable } from '@angular/core';
import { Store } from 'src/app/stores/store';
import * as uuid from 'uuid/v1';

export type ToastTypes = 'error' | 'success' | 'warning';
export type Toast = { UUID: string, message: string, type: ToastTypes };

@Injectable()
export class ToastsService {
  constructor(private store: Store) { }

  /**
   * Display a toast
   *
   * @param type - type of toast
   * @param message - text message to display
   */
  public addToast(type: ToastTypes, message: string) {
    const newToast: Toast = {
      UUID: uuid(),
      type,
      message
    };

    this.store.update({ type: 'ADD_TOAST', item: newToast });

    // schedule automatic toast deletion
    setTimeout(() => {
      this.removeToast(newToast.UUID);
    }, 5000);
  }

  /**
   * Remove a toast
   *
   * @param toastUUID
   */
  public removeToast(toastUUID: string) {
    this.store.update({ type: 'REMOVE_TOAST', UUID: toastUUID });
  }
}
