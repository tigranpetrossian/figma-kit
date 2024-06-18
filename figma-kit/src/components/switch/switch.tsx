import * as RadixSwitch from '@radix-ui/react-switch';
import React from 'react';
import { cx } from 'class-variance-authority';

type RootElement = React.ElementRef<typeof RadixSwitch.Root>;
type RootProps = RadixSwitch.SwitchProps;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <RadixSwitch.Root ref={ref} className={cx(className, 'fp-switchRoot')} {...rootProps} />;
});

type ThumbElement = React.ElementRef<typeof RadixSwitch.Thumb>;
type ThumbProps = RadixSwitch.SwitchThumbProps;

const Thumb = React.forwardRef<ThumbElement, ThumbProps>((props, ref) => {
  const { className, ...thumbProps } = props;
  return <RadixSwitch.Thumb ref={ref} className={cx(className, 'fp-switchThumb')} {...thumbProps} />;
});

export type { RootProps, ThumbProps };
export { Root, Thumb };
