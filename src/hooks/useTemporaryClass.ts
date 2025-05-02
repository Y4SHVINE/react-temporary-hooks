import { RefObject, useCallback, useEffect, useRef } from 'react';

/**
 * Applies a CSS class to a DOM element for a temporary duration.
 * @param {React.RefObject<HTMLElement | null>} elementRef - A ref object attached to the target DOM element.
 * @param {string} className - The CSS class name to apply temporarily.
 * @param {number} duration - The time in milliseconds the class should be applied.
 * @returns {() => void} A function to trigger the temporary class application.
 */
export const useTemporaryClass = (
  elementRef: RefObject<HTMLElement | null>,
  className: string,
  duration: number
): (() => void) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerClass = useCallback(() => {
    if (!elementRef?.current) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Add the class
    elementRef.current.classList.add(className);

    // Set a new timer to remove the class
    timerRef.current = setTimeout(() => {
      if (elementRef.current) {
        elementRef.current.classList.remove(className);
      }
    }, duration);
  }, [elementRef, className, duration]);

  // Cleanup the timer when the component unmounts or dependencies change
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, className, elementRef]);

  return triggerClass;
};
