import React from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { addClassName } from '@lib/react/add-class-name';

type SwitchElement = React.ElementRef<typeof BaseSwitch.Root>;
type SwitchProps = BaseSwitch.Root.Props;

const Switch = React.forwardRef<SwitchElement, SwitchProps>((props, ref) => {
  const { className, ...switchProps } = props;

  return (
    <BaseSwitch.Root ref={ref} className={addClassName(className, 'fp-switchRoot')} {...switchProps}>
      <BaseSwitch.Thumb className="fp-switchThumb" />
    </BaseSwitch.Root>
  );
});

Switch.displayName = 'Switch';

export type { SwitchProps };
export { Switch };
