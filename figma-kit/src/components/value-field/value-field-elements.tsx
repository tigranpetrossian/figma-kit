import React from 'react';
import { cx } from 'class-variance-authority';
import { createContext } from '@lib/react/create-context';

const [ValueFieldProvider, useValueFieldContext] = createContext<{ disabled?: boolean } | null>(
  'ValueFieldProvider',
  null
);

type RootElement = React.ElementRef<'label'>;
type RootProps = React.ComponentPropsWithoutRef<'label'> & {
  disabled?: boolean;
};

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, disabled, ...rootProps } = props;
  const context = useValueFieldContext('Root');

  return (
    <ValueFieldProvider disabled={disabled}>
      <label
        ref={ref}
        className={cx(className, 'fp-ValueFieldRoot')}
        data-disabled={disabled || context?.disabled ? '' : undefined}
        {...rootProps}
      />
    </ValueFieldProvider>
  );
});

type MultiElement = React.ElementRef<'div'>;
type MultiProps = React.ComponentPropsWithoutRef<'div'> & {
  disabled?: boolean;
};

const Multi = React.forwardRef<MultiElement, MultiProps>((props, ref) => {
  const { className, disabled, ...multiProps } = props;

  return (
    <ValueFieldProvider disabled={disabled}>
      <div
        ref={ref}
        className={cx(className, 'fp-ValueFieldMulti')}
        data-disabled={disabled ? '' : undefined}
        {...multiProps}
      />
    </ValueFieldProvider>
  );
});

type LabelElement = React.ElementRef<'span'>;
type LabelProps = React.ComponentPropsWithoutRef<'span'>;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  const context = useValueFieldContext('Root');

  return (
    <span
      ref={ref}
      className={cx(className, 'fp-ValueFieldLabel')}
      data-disabled={context?.disabled ? '' : undefined}
      {...labelProps}
    />
  );
});

export type { RootProps, LabelProps, MultiProps };
export { Root, Label, Multi, useValueFieldContext };
