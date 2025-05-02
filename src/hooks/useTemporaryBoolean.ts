import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Manages a boolean state that is temporarily set to true and reverts to false after a duration.
 * @param {number} duration - The time in milliseconds the state should be true.
 * @returns {{ isTemporaryVisible: boolean, showTemporary: () => void }} An object containing the boolean state and a function to trigger it.
 */
export const useTemporaryBoolean = (duration: number) => {
  const [isTemporaryVisible, setIsTemporaryVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTemporary = useCallback(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsTemporaryVisible(true);

    timerRef.current = setTimeout(() => {
      setIsTemporaryVisible(false);
    }, duration);
  }, [duration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration]);

  return { isTemporaryVisible, showTemporary };
};