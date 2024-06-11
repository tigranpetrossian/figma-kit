import React from 'react';
import { cx } from 'class-variance-authority';

type RootElement = React.ElementRef<'label'>;
type RootProps = React.ComponentPropsWithoutRef<'label'>;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <label ref={ref} className={cx(className, 'fp-ControlInputRoot')} {...rootProps} />;
});

export type { RootProps };
export { Root };
