/**
 * Toast Notification Utility
 * 
 * Centralized toast notification functions for consistent UX.
 * Uses react-toastify for beautiful, non-blocking notifications.
 */

import { toast as reactToast } from 'react-toastify';

export const toast = {
  /**
   * Show success notification
   */
  success: (message: string, options?: { duration?: number }) => {
    reactToast.success(message, {
      position: 'top-right',
      autoClose: options?.duration || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show error notification
   */
  error: (message: string, options?: { duration?: number }) => {
    reactToast.error(message, {
      position: 'top-right',
      autoClose: options?.duration || 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show info notification
   */
  info: (message: string, options?: { duration?: number }) => {
    reactToast.info(message, {
      position: 'top-right',
      autoClose: options?.duration || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show warning notification
   */
  warning: (message: string, options?: { duration?: number }) => {
    reactToast.warning(message, {
      position: 'top-right',
      autoClose: options?.duration || 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  /**
   * Show loading notification (returns toast ID for updating)
   */
  loading: (message: string) => {
    return reactToast.loading(message, {
      position: 'top-right',
    });
  },

  /**
   * Update existing toast (useful for loading -> success/error)
   */
  update: (toastId: string | number, message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    reactToast.update(toastId, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 5000,
    });
  },

  /**
   * Dismiss toast
   */
  dismiss: (toastId?: string | number) => {
    reactToast.dismiss(toastId);
  },
};

