import React from 'react';
import { cx } from 'class-variance-authority';
import { createContext } from '@lib/react/create-context';

type ValueFieldScrubTarget = {
  disabled: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  startScrub: () => void;
  scrub: (movementX: number, event: PointerEvent) => void;
};

type ValueFieldContext = {
  disabled?: boolean;
  scrubbing: boolean;
  scrubTargetsRef: React.MutableRefObject<ValueFieldScrubTarget[]>;
  registerScrubTarget: (target: ValueFieldScrubTarget | null) => () => void;
  setScrubbing: (scrubbing: boolean) => void;
};

const [ValueFieldProvider, useValueFieldContext] = createContext<ValueFieldContext | null>('ValueFieldProvider', null);

type RootElement = React.ElementRef<'label'>;
type RootProps = React.ComponentPropsWithoutRef<'label'> & {
  disabled?: boolean;
};

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, disabled, ...rootProps } = props;
  const context = useValueFieldContext('Root');
  const providerValue = useValueFieldProviderValue(disabled, context);

  return (
    <ValueFieldProvider {...providerValue}>
      <label
        ref={ref}
        className={cx(className, 'fp-ValueFieldRoot')}
        data-disabled={providerValue.disabled ? '' : undefined}
        data-scrubbing={providerValue.scrubbing ? '' : undefined}
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
  const context = useValueFieldContext('Multi');
  const providerValue = useValueFieldProviderValue(disabled, context);

  return (
    <ValueFieldProvider {...providerValue}>
      <div
        ref={ref}
        className={cx(className, 'fp-ValueFieldMulti')}
        data-disabled={providerValue.disabled ? '' : undefined}
        data-scrubbing={providerValue.scrubbing ? '' : undefined}
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

Root.displayName = 'ValueField.Root';
Label.displayName = 'ValueField.Label';
Multi.displayName = 'ValueField.Multi';

function useValueFieldProviderValue(disabled: boolean | undefined, context: ValueFieldContext | null) {
  const [scrubbing, setScrubbing] = React.useState(false);
  const scrubTargetsRef = React.useRef<ValueFieldScrubTarget[]>([]);
  const inheritedDisabled = disabled || context?.disabled ? true : undefined;

  const registerScrubTarget = React.useCallback((target: ValueFieldScrubTarget | null) => {
    if (!target) {
      return () => {};
    }

    scrubTargetsRef.current = [...scrubTargetsRef.current.filter((item) => item !== target), target];

    return () => {
      scrubTargetsRef.current = scrubTargetsRef.current.filter((item) => item !== target);
    };
  }, []);

  return React.useMemo(
    () => ({
      disabled: inheritedDisabled,
      scrubbing,
      scrubTargetsRef,
      registerScrubTarget,
      setScrubbing,
    }),
    [inheritedDisabled, registerScrubTarget, scrubbing]
  );
}

export type { RootProps, LabelProps, MultiProps, ValueFieldContext, ValueFieldScrubTarget };
export { Root, Label, Multi, useValueFieldContext };
