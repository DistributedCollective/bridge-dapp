import { toaster } from '../services/toaster';

export function showError(message: string) {
  toaster.error(message, 'error');
}
