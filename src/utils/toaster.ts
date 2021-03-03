import { Toaster } from '@blueprintjs/core';

export const toaster = Toaster.create({
  position: 'bottom',
});

export function showError(message: string) {
  toaster.show(
    {
      intent: 'danger',
      message,
    },
    'error',
  );
}

export function showSuccess(message: string) {
  toaster.show(
    {
      intent: 'success',
      message,
    },
    'success',
  );
}
