import React, { CSSProperties, useRef } from 'react';
import {
  useTemporaryBoolean,
  useTemporaryClass,
  useTemporaryAttribute,
  useTemporaryStyle,
  useTemporaryTextContent,
} from 'react-temporary-hooks';
import './App.css';

// Example using useTemporaryBoolean
function ExampleUseTemporaryBoolean() {
  // Use the hook to get the state and the trigger function
  const { isTemporaryVisible, showTemporary } = useTemporaryBoolean(3000); // State is true for 3 seconds

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">
        useTemporaryBoolean Example
      </h3>
      <p>State is: {isTemporaryVisible ? 'True' : 'False'}</p>
      <button
        onClick={showTemporary}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Set State Temporarily
      </button>
    </div>
  );
}

// Example using useTemporaryClass
function ExampleUseTemporaryClass() {
  const elementRef = useRef<HTMLParagraphElement>(null); // Specify element type
  // Use the hook to get the trigger function
  const triggerHighlight = useTemporaryClass(elementRef, 'bg-yellow-300', 1000); // Add 'bg-yellow-300' class for 1 second

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">useTemporaryClass Example</h3>
      <p
        ref={elementRef}
        className="inline-block transition-colors duration-300"
      >
        This text will change its background color.
      </p>
      <button
        onClick={triggerHighlight}
        className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Highlight Temporarily
      </button>
    </div>
  );
}

// Example using useTemporaryAttribute
function ExampleUseTemporaryAttribute() {
  const elementRef = useRef<HTMLButtonElement>(null); // Specify element type
  // Use the hook to get the trigger function
  const triggerDisable = useTemporaryAttribute(
    elementRef,
    'disabled',
    'true',
    2000
  ); // Add 'disabled' attribute for 2 seconds

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">
        useTemporaryAttribute Example
      </h3>
      <button
        ref={elementRef}
        onClick={() => console.log('Button clicked')}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition"
      >
        I'm getting disabled
      </button>
      <button
        onClick={triggerDisable}
        className="ml-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
      >
        Trigger Disable
      </button>
    </div>
  );
}

// Example using useTemporaryTextContent
function ExampleUseTemporaryTextContent() {
  const elementRef = useRef<HTMLSpanElement>(null); // Specify element type
  // Use the hook to get the trigger function
  const triggerTextChange = useTemporaryTextContent(
    elementRef,
    'Copied!',
    1200
  ); // Change text to 'Copied!' for 1.2 seconds

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">
        useTemporaryTextContent Example
      </h3>
      <span ref={elementRef}>Copy this text</span>
      <button
        onClick={triggerTextChange}
        className="ml-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition"
      >
        Copy
      </button>
    </div>
  );
}

// Example using useTemporaryStyle
function ExampleUseTemporaryStyle() {
  const elementRef = useRef<HTMLParagraphElement>(null); // Specify element type
  const temporaryStyles: CSSProperties = {
    // Specify type for styles object
    color: 'red',
    fontWeight: 'bold',
    transition: 'color 0.5s, font-weight 0.5s', // Add transition for smoother effect
  };
  // Use the hook to get the trigger function
  const triggerStyleChange = useTemporaryStyle(
    elementRef,
    temporaryStyles,
    1500
  ); // Apply styles for 1.5 seconds

  return (
    <div className="p-4 border rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">useTemporaryStyle Example</h3>
      <p ref={elementRef}>This text will change its style.</p>
      <button
        onClick={triggerStyleChange}
        className="ml-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
      >
        Apply Temporary Style
      </button>
    </div>
  );
}


function App() {
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-6">react-temporary-hooks Examples</h1>
    <ExampleUseTemporaryBoolean />
    <ExampleUseTemporaryClass />
    <ExampleUseTemporaryAttribute />
    <ExampleUseTemporaryTextContent />
    <ExampleUseTemporaryStyle />
  </div>

  );
}

export default App;
