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
  const originalStylesRef = useRef<Record<string, string>>({}); // To store original inline styles

  const triggerStyleChange = useCallback(() => {
    if (!elementRef?.current) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const element = elementRef.current;
    const styleKeys = Object.keys(temporaryStyles) as (keyof CSSProperties)[]; // Cast keys for type safety

    // Store original inline styles that will be overwritten
    originalStylesRef.current = {}; // Reset for this trigger
    styleKeys.forEach(key => {
      // Store the original value of the style property using getPropertyValue for consistency
      const kebabCaseKey = camelToKebabCase(key as string); // Cast to string for helper
      originalStylesRef.current[key] = element.style.getPropertyValue(
        kebabCaseKey
      );
    });

    // Apply the temporary styles
    Object.assign(element.style, temporaryStyles);

    // Set a new timer to revert the styles
    timerRef.current = setTimeout(() => {
      console.log('Attempting to revert styles...'); // Debug log
      // Ensure the element still exists before trying to remove styles
      if (elementRef.current) {
        console.log('Element ref is valid, reverting styles.'); // Debug log
        const currentElement = elementRef.current;
        // Revert styles to their original values
        Object.keys(originalStylesRef.current).forEach(key => {
          const originalValue = originalStylesRef.current[key];
          const kebabCaseKey = camelToKebabCase(key);
          console.log(
            `Reverting style "${kebabCaseKey}" from temporary to "${originalValue}"`
          ); // Debug log

          if (
            originalValue !== undefined &&
            originalValue !== null &&
            originalValue !== ''
          ) {
            // If there was an original inline style, set it back using setProperty with kebab-case
            currentElement.style.setProperty(kebabCaseKey, originalValue);
          } else {
            // If original was empty or null, remove the inline style property using removeProperty with kebab-case
            currentElement.style.removeProperty(kebabCaseKey);
          }
        });
      } else {
        console.error('Element ref is null, cannot revert styles.');
      }
      originalStylesRef.current = {}; // Clear stored styles
    }, duration);
  }, [elementRef, temporaryStyles, duration]);

  // Cleanup the timer when the component unmounts or dependencies change
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, temporaryStyles, elementRef]);

  return triggerStyleChange;
}
