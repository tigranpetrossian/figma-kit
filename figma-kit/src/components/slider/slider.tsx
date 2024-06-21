import React, { useRef, useState } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cx } from 'class-variance-authority';
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
  const { onPointerDown, focusVisible } = useSliderVisibleFocus(rootRef);

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
          <RadixSlider.Thumb
            key={i}
            className={cx('fp-sliderThumb', { 'fp-sliderThumb-focusVisible': focusVisible })}
            onPointerDown={onPointerDown}
          />
        ))}
      </RadixSlider.Root>
    </>
  );
});

/**
 * Fix :focus-visible behavior for the slider thumb, to only show outline when not dragging with the mouse.
 * The focus will remain on the Root element afterward to enable subsequent keyboard interactions.
 */
function useSliderVisibleFocus(ref: React.RefObject<SliderElement>) {
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

  return { onPointerDown: handlePointerDown, focusVisible: !pointerDown };
}

export type { SliderProps };
export { Slider };
