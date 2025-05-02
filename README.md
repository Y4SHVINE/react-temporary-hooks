# React Temporary Hooks

A collection of React hooks for managing temporary DOM element changes with automatic reversion.

## Demo

[Demo](https://y4shvine.github.io/react-temporary-hooks/)

## Installation

```bash
npm install react-temporary-hooks
# or
yarn add react-temporary-hooks
```

## Available Hooks

### `useTemporaryTextContent`

Temporarily changes the text content of a DOM element.

```typescript
const triggerTextChange = useTemporaryTextContent(
  elementRef,
  temporaryText,
  duration
);
```

### `useTemporaryStyle`

Applies temporary inline styles to a DOM element.

```typescript
const triggerStyleChange = useTemporaryStyle(
  elementRef,
  temporaryStyles,
  duration
);
```

### `useTemporaryClass`

Applies a CSS class to a DOM element temporarily.

```typescript
const triggerClass = useTemporaryClass(
  elementRef,
  className,
  duration
);
```

### `useTemporaryBoolean`

Manages a boolean state that temporarily becomes true and reverts to false.

```typescript
const { isTemporaryVisible, showTemporary } = useTemporaryBoolean(duration);
```

### `useTemporaryAttribute`

Applies an HTML attribute to a DOM element temporarily.

```typescript
const triggerAttribute = useTemporaryAttribute(
  elementRef,
  attributeName,
  attributeValue,
  duration
);
```

## Usage Examples

### Temporary Text Content

```typescript
import { useRef } from 'react';
import { useTemporaryTextContent } from 'react-temporary-hooks';

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const triggerTextChange = useTemporaryTextContent(buttonRef, 'Processing...', 2000);

  return (
    <button ref={buttonRef} onClick={triggerTextChange}>
      Click me
    </button>
  );
}
```

### Temporary Styles

```typescript
import { useRef } from 'react';
import { useTemporaryStyle } from 'react-temporary-hooks';

function MyComponent() {
  const divRef = useRef<HTMLDivElement>(null);
  const triggerStyleChange = useTemporaryStyle(
    divRef,
    { backgroundColor: 'red', color: 'white' },
    2000
  );

  return (
    <div ref={divRef} onClick={triggerStyleChange}>
      Click to change style
    </div>
  );
}
```

### Temporary Class

```typescript
import { useRef } from 'react';
import { useTemporaryClass } from 'react-temporary-hooks';

function MyComponent() {
  const divRef = useRef<HTMLDivElement>(null);
  const triggerClass = useTemporaryClass(divRef, 'highlight', 2000);

  return (
    <div ref={divRef} onClick={triggerClass}>
      Click to highlight
    </div>
  );
}
```

### Temporary Boolean

```typescript
import { useTemporaryBoolean } from 'react-temporary-hooks';

function MyComponent() {
  const { isTemporaryVisible, showTemporary } = useTemporaryBoolean(2000);

  return (
    <div>
      <button onClick={showTemporary}>Show Message</button>
      {isTemporaryVisible && <p>This message will disappear in 2 seconds</p>}
    </div>
  );
}
```

### Temporary Attribute

```typescript
import { useRef } from 'react';
import { useTemporaryAttribute } from 'react-temporary-hooks';

function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerAttribute = useTemporaryAttribute(
    inputRef,
    'disabled',
    'true',
    2000
  );

  return (
    <input
      ref={inputRef}
      type="text"
      onClick={triggerAttribute}
      placeholder="Click to disable temporarily"
    />
  );
}
```

## Features

- TypeScript support
- Automatic cleanup on unmount
- Preserves original values
- Simple and intuitive API
- Lightweight and performant

## Requirements

- React 16 or higher
- Node.js 10 or higher

## License

MIT © Yashvida Jayasekara
