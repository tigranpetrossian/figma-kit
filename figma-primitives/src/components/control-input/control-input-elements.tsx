import React from 'react';
import { cx } from 'class-variance-authority';

type RootElement = React.ElementRef<'label'>;
type RootProps = React.ComponentPropsWithoutRef<'label'>;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <label ref={ref} className={cx(className, 'fp-ControlInputRoot')} {...rootProps} />;
});

type LabelElement = React.ElementRef<'span'>;
type LabelProps = React.ComponentPropsWithoutRef<'span'>;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, children, ...labelProps } = props;

  return (
    <span ref={ref} className={cx(className, 'fp-controlInputLabel')} {...labelProps}>
      {children}
    </span>
  );
});

export type { RootProps, LabelProps };
export { Root, Label };
