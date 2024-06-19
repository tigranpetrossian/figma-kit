import * as RadixSwitch from '@radix-ui/react-switch';
import React from 'react';
import { cx } from 'class-variance-authority';

type SwitchElement = React.ElementRef<typeof RadixSwitch.Switch>;
type SwitchProps = Omit<RadixSwitch.SwitchProps, 'asChild'>;

const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  const { className, ...switchProps } = props;
  return (
    <RadixSwitch.Root ref={ref} className={cx(className, 'fp-switchRoot')} {...switchProps}>
      <RadixSwitch.Thumb ref={ref} className={cx(className, 'fp-switchThumb')} />
    </RadixSwitch.Root>
  );
});

export type { SwitchProps };
export { Switch };
