import type React from 'react';
import { useCallback, useState } from 'react';

/**
 * Selects the target element's contents on click, unless the user is selecting manually.
 * */
export function useSelectOnInputClick() {
  const [mustSelect, setMustSelect] = useState(true);

  const handleFocus = useCallback(() => {
    setMustSelect(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMustSelect(false);
  }, []);

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      if (mustSelect && event.currentTarget.selectionStart === event.currentTarget.selectionEnd) {
        event.currentTarget.select();
        setMustSelect(false);
      }
    },
    [mustSelect]
  );

  return {
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onFocus: handleFocus,
  };
}
