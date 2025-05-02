import { RefObject, useCallback, useEffect, useRef } from "react";

/**
 * Temporarily changes the text content of a DOM element.
 * @param {React.RefObject<HTMLElement | null>} elementRef - A ref object attached to the target DOM element.
 * @param {string} temporaryText - The text content to display temporarily.
 * @param {number} duration - The time in milliseconds the temporary text should be displayed.
 * @returns {() => void} A function to trigger the temporary text content change.
 */
export const useTemporaryTextContent = (
  elementRef: RefObject<HTMLElement | null>,
  temporaryText: string,
  duration: number
): () => void => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalTextRef = useRef<string | null>(null);

  const triggerTextChange = useCallback(() => {
    if (!elementRef?.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    originalTextRef.current = elementRef.current.textContent;

    elementRef.current.textContent = temporaryText;

    timerRef.current = setTimeout(() => {
      if (elementRef.current && originalTextRef.current !== null) {
        elementRef.current.textContent = originalTextRef.current;
      }
      originalTextRef.current = null; 
    }, duration);
  }, [elementRef, temporaryText, duration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, temporaryText, elementRef]);

  return triggerTextChange;
}