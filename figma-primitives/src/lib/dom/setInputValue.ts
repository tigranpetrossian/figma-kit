/**
 * Set the value of an HTMLInputElement and optionally dispatch an input event.
 *
 * @param inputElement - The HTMLInputElement to set the value for.
 * @param value - The value to set on the input element.
 * @param dispatchEvent - Whether to dispatch an input event (default: true).
 */
export const setInputElementValue = (inputElement: HTMLInputElement | null, value: string, dispatchEvent = true) => {
  if (!inputElement) return;

  inputElement.value = value;

  if (dispatchEvent) {
    inputElement.dispatchEvent(
      new Event('input', {
        bubbles: true,
        cancelable: true,
      })
    );
  }
};
