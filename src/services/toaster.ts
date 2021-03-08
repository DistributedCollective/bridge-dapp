import type { ReactNode } from 'react';
import { Position, Toaster as ToasterClass } from '@blueprintjs/core';

class Toaster {
  private _toaster = ToasterClass.create({
    position: Position.TOP,
  });

  public get toaster() {
    return this._toaster;
  }

  public success(message: ReactNode, key: string = 'success') {
    return this._toaster.show(
      {
        message,
        intent: 'success',
      },
      key,
    );
  }

  public error(message: ReactNode, key: string = 'error') {
    return this._toaster.show(
      {
        message,
        intent: 'danger',
      },
      key,
    );
  }
}

export const toaster = new Toaster();
