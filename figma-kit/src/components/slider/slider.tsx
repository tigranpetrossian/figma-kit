import React, { useRef, useState } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cx, cva } from 'class-variance-authority';
import { useComposedRefs } from '@lib/react/use-compose-refs';

type SliderElement = React.ElementRef<typeof RadixSlider.Root>;

type SliderOwnProps = {
  range?: boolean;
  rangeAnchor?: number;
};
type SliderProps = Omit<RadixSlider.SliderProps, 'asChild' | 'children'> & SliderOwnProps;

const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const {
    className,
    min = 0,
    max = 100,
    defaultValue = [min],
    value,
    onValueChange,
    orientation = 'horizontal',
    dir = 'ltr',
    ...rootProps
  } = props;
  const rootRef = useRef<SliderElement>(null);
  const ref = useComposedRefs(rootRef, forwardedRef);
  const { onPointerDown, pointerDown } = useSliderFocusVisible(rootRef);

  return (
    <>
      <RadixSlider.Root
        tabIndex={-1}
        onPointerDown={onPointerDown}
        ref={ref}
        className={cx(className, 'fp-sliderRoot')}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        orientation={orientation}
        dir={dir}
        {...rootProps}
      >
        <RadixSlider.Track className="fp-sliderTrack">
          <div className="fp-sliderRange" data-orientation={orientation} />
        </RadixSlider.Track>
        {(value ?? defaultValue).map((v, i) => (
          <RadixSlider.Thumb key={i} className={thumb({ pointerDown })} onPointerDown={onPointerDown} />
        ))}
      </RadixSlider.Root>
    </>
  );
});

const thumb = cva('fp-sliderThumb', {
  variants: {
    pointerDown: {
      true: 'fp-sliderThumb-pointerDown',
    },
  },
});

/**
 * Match the :focus-visible behavior of the slider thumb to that of normal buttons.
 * The thumb, a span with tabindex="0", displays an outline ring even when dragged with a mouse.
 * This fix only shows the focus ring when the pointer isn't down.
 * After mouse use, focus remains on the Root element to enable subsequent keyboard interactions.
 */
function useSliderFocusVisible(ref: React.RefObject<SliderElement>) {
  const [pointerDown, setPointerDown] = useState(false);

  const handleGlobalUp = () => {
    setPointerDown(false);
    window.removeEventListener('pointerup', handleGlobalUp);
    ref.current?.focus();
  };

  const handlePointerDown = () => {
    setPointerDown(true);
    window.addEventListener('pointerup', handleGlobalUp);
  };

  return { onPointerDown: handlePointerDown, pointerDown };
}

export type { SliderProps };
export { Slider };
