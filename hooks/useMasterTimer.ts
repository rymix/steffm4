import { useCallback, useEffect, useRef } from 'react';

type TimerCallback = () => void;
type TimerSubscription = {
  id: string;
  callback: TimerCallback;
  interval: number;
  lastRun: number;
};

/**
 * Master timer hook to consolidate multiple timers into a single setInterval
 * This reduces the number of concurrent timers and improves performance
 */
export const useMasterTimer = () => {
  const subscriptions = useRef<Map<string, TimerSubscription>>(new Map());
  const masterTimer = useRef<NodeJS.Timeout | null>(null);

  const startMasterTimer = useCallback(() => {
    if (masterTimer.current) return;

    masterTimer.current = setInterval(() => {
      const now = Date.now();
      subscriptions.current.forEach((subscription) => {
        if (now - subscription.lastRun >= subscription.interval) {
          subscription.callback();
          subscription.lastRun = now;
        }
      });
    }, 100); // Check every 100ms for better precision
  }, []);

  const stopMasterTimer = useCallback(() => {
    if (masterTimer.current) {
      clearInterval(masterTimer.current);
      masterTimer.current = null;
    }
  }, []);

  const subscribe = useCallback((id: string, callback: TimerCallback, interval: number) => {
    subscriptions.current.set(id, {
      id,
      callback,
      interval,
      lastRun: Date.now(),
    });

    if (subscriptions.current.size === 1) {
      startMasterTimer();
    }

    return () => {
      subscriptions.current.delete(id);
      if (subscriptions.current.size === 0) {
        stopMasterTimer();
      }
    };
  }, [startMasterTimer, stopMasterTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMasterTimer();
      subscriptions.current.clear();
    };
  }, [stopMasterTimer]);

  return { subscribe };
};

export default useMasterTimer;