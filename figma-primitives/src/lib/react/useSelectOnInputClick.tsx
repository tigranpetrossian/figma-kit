import type React from 'react';
import { useState } from 'react';

const MAX_CURSOR_DRIFT = 5;

/**
 * Selects the target element's contents on click, unless the cursor is dragged beyond the threshold,
 * indicating a manual selection intention from the user.
 * */
export function useSelectOnInputClick(ref: React.RefObject<HTMLInputElement>) {
  const [cursorX, setCursorX] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setCursorX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!ref.current) {
      return;
    }

    if (cursorX === null || Math.abs(e.clientX - cursorX) < MAX_CURSOR_DRIFT) {
      ref.current.select();
      setCursorX(null);
    }
  };

  return {
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
}
