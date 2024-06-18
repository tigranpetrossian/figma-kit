type FocusableTarget = HTMLElement | { focus(): void };

function isSelectableInput(element: unknown): element is FocusableTarget & { select: () => void } {
  return (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) && 'select' in element;
}

/**
 * Focus a given element and optionally select its content if it is a selectable input.
 *
 * @param element - The element to focus. Optional.
 * @param options
 * @param options.select - Whether to select the content of the element if it is a selectable input (default: false).
 */
export function focus(element?: FocusableTarget | null, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;

  if (element && element.focus) {
    element.focus();
  }

  if (element !== previouslyFocusedElement && isSelectableInput(element) && select) {
    element.select();
  }
}
