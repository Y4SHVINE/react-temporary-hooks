import {
  CSSProperties,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { camelToKebabCase } from '../helpers/camelToKebabCase';

/**
 * Applies temporary inline styles to a DOM element for a specified duration.
 * @param {React.RefObject<HTMLElement | null>} elementRef - A ref object attached to the target DOM element.
 * @param {React.CSSProperties} temporaryStyles - An object containing the inline styles to apply temporarily.
 * @param {number} duration - The time in milliseconds the temporary styles should be applied.
 * @returns {() => void} A function to trigger the temporary style application.
 */
export const useTemporaryStyle = (
  elementRef: RefObject<HTMLElement | null>,
  temporaryStyles: CSSProperties,
  duration: number
): () => void => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const originalStylesRef = useRef<Record<string, string>>({});

  const triggerStyleChange = useCallback(() => {
    if (!elementRef?.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const element = elementRef.current;
    const styleKeys = Object.keys(temporaryStyles) as (keyof CSSProperties)[]; 

    originalStylesRef.current = {};
    styleKeys.forEach(key => {
      const kebabCaseKey = camelToKebabCase(key as string);
      originalStylesRef.current[key] = element.style.getPropertyValue(
        kebabCaseKey
      );
    });

    Object.assign(element.style, temporaryStyles);

    timerRef.current = setTimeout(() => {
      if (elementRef.current) {
        const currentElement = elementRef.current;
        Object.keys(originalStylesRef.current).forEach(key => {
          const originalValue = originalStylesRef.current[key];
          const kebabCaseKey = camelToKebabCase(key);

          if (
            originalValue !== undefined &&
            originalValue !== null &&
            originalValue !== ''
          ) {
            currentElement.style.setProperty(kebabCaseKey, originalValue);
          } else {
            currentElement.style.removeProperty(kebabCaseKey);
          }
        });
      } else {
        console.error('Element ref is null, cannot revert styles.');
      }
      originalStylesRef.current = {}; 
    }, duration);
  }, [elementRef, temporaryStyles, duration]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, temporaryStyles, elementRef]);

  return triggerStyleChange;
}
