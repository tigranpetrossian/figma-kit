import React, { useCallback, useId } from 'react';
import { cx } from 'class-variance-authority';
import { Text, Label as LabelPrimitive } from '@components/text';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { CheckmarkIcon } from '@components/icons';
import { CheckmarkIndeterminateIcon } from '@components/icons/checkmark-indeterminate';
import { createContext } from '@lib/react/create-context';

const [CheckboxContextProvider, useCheckboxContext] = createContext<{ id: string }>('Checkbox');

type RootElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, id: idProp, ...rootProps } = props;
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <CheckboxContextProvider id={id}>
      <div ref={ref} className={cx(className, 'fp-CheckboxRoot')} {...rootProps} />
    </CheckboxContextProvider>
  );
});

type CheckboxElement = React.ElementRef<'input'>;
type CheckboxProps = React.ComponentPropsWithoutRef<'input'> & {
  indeterminate?: boolean;
};

const Input = React.forwardRef<CheckboxElement, CheckboxProps>((props, forwardedRef) => {
  const { className, indeterminate, ...checkboxProps } = props;
  const { id } = useCheckboxContext('Input');
  const inputRef = useIndeterminateState(indeterminate);
  const ref = useComposedRefs(forwardedRef, inputRef);

  return (
    <>
      <input
        ref={ref}
        className={cx(className, 'fp-CheckboxInput')}
        id={id}
        // VoiceOver on Chrome does not announce the label when simply using htmlFor
        aria-labelledby={`checkbox-label-${id}`}
        aria-describedby={`checkbox-description-${id}`}
        {...checkboxProps}
        type="checkbox"
      />
      <Indicator />
    </>
  );
});

const Indicator = () => {
  return (
    <span className="fp-CheckboxIndicator" aria-hidden="true">
      <CheckmarkIcon className="fp-CheckboxCheckmark" size="4" />
      <CheckmarkIndeterminateIcon className="fp-CheckboxIndeterminate" size="4" />
    </span>
  );
};

type LabelElement = React.ElementRef<'label'>;
type LabelProps = React.ComponentPropsWithoutRef<'label'>;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  const { id } = useCheckboxContext('Input');
  return (
    <LabelPrimitive
      aria-hidden="true"
      ref={ref}
      className={cx(className, 'fp-CheckboxLabel')}
      htmlFor={id}
      id={`checkbox-label-${id}`}
      {...labelProps}
    />
  );
});

type DescriptionElement = React.ElementRef<'label'>;
type DescriptionProps = React.ComponentPropsWithoutRef<'label'>;

const Description = React.forwardRef<DescriptionElement, DescriptionProps>((props, ref) => {
  const { className, ...desriptionProps } = props;
  const { id } = useCheckboxContext('Description');
  return (
    <Text
      aria-hidden="true"
      ref={ref}
      className={cx(className, 'fp-CheckboxDescription')}
      id={`checkbox-description-${id}`}
      {...desriptionProps}
    />
  );
});

function useIndeterminateState(indeterminate: boolean | undefined) {
  return useCallback(
    (inputElement: HTMLInputElement) => {
      if (!inputElement) {
        return;
      }

      inputElement.indeterminate = !!indeterminate;
    },
    [indeterminate]
  );
}

export type { CheckboxProps };
export { Root, Input, Label, Description };
