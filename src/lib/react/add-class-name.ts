import { cx } from 'class-variance-authority';

type ClassName<State> = string | ((state: State) => string | undefined) | undefined;

function addClassName<State>(className: ClassName<State>, value: string): ClassName<State> {
  if (typeof className === 'function') {
    return (state) => cx(className(state), value);
  }

  return cx(className, value);
}

export type { ClassName };
export { addClassName };
