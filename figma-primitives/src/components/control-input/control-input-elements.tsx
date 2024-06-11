import React from 'react';
import { cx } from 'class-variance-authority';

type RootElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <div ref={ref} className={cx(className, 'fp-ControlInputRoot')} {...rootProps} />;
});

export { Root };
