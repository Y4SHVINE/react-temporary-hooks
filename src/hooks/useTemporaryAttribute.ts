// 3. useTemporaryAttribute Hook

import { RefObject, useCallback, useEffect, useRef } from "react";

/**
 * Applies an HTML attribute to a DOM element for a temporary duration.
 * @param {React.RefObject<T>} elementRef - A ref object attached to the target DOM element.
 * @param {string} attributeName - The name of the HTML attribute to apply.
 * @param {string} attributeValue - The value of the HTML attribute to apply.
 * @param {number} duration - The time in milliseconds the attribute should be applied.
 * @returns {() => void} A function to trigger the temporary attribute application.
 */
export const useTemporaryAttribute = (elementRef: RefObject<HTMLElement | null>, attributeName: string, attributeValue: string, duration: number): () => void => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const originalAttributeValueRef = useRef<string | null>(null); // To store the original attribute value
  
    const triggerAttribute = useCallback(() => {
      if (!elementRef?.current) return;
  
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
  
      // Store the original attribute value
      originalAttributeValueRef.current = elementRef.current.getAttribute(attributeName);
  
      // Set the temporary attribute
      elementRef.current.setAttribute(attributeName, attributeValue);
  
      // Set a new timer to remove or revert the attribute
      timerRef.current = setTimeout(() => {
        if (elementRef.current) {
          if (originalAttributeValueRef.current !== null) {
            // Revert to original value if it existed
            elementRef.current.setAttribute(attributeName, originalAttributeValueRef.current);
          } else {
            // Otherwise, remove the attribute
            elementRef.current.removeAttribute(attributeName);
          }
        }
        originalAttributeValueRef.current = null; // Clear stored value
      }, duration);
    }, [elementRef, attributeName, attributeValue, duration]);
  
    // Cleanup the timer when the component unmounts or dependencies change
    useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }, [duration, attributeName, attributeValue, elementRef]);
  
    return triggerAttribute;
  }