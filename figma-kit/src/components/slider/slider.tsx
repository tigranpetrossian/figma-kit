import React, { useRef, useState } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cx } from 'class-variance-authority';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { normalize } from '@lib/number/normalize';

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
    inverted,
    range,
    rangeAnchor,
    disabled,
    ...rootProps
  } = props;
  const rootRef = useRef<SliderElement>(null);
  const ref = useComposedRefs(rootRef, forwardedRef);
  const { onPointerDown, focusVisible } = useSliderVisibleFocus(rootRef);
  const [trackedValue, setTrackedValue] = useState(value ?? defaultValue);

  const handleValueChange = (value: number[]) => {
    onValueChange?.(value);
    setTrackedValue(value);
  };

  return (
    <RadixSlider.Root
      tabIndex={-1}
      ref={ref}
      className={cx(className, 'fp-sliderRoot')}
      defaultValue={defaultValue}
      value={value}
      onValueChange={handleValueChange}
      onPointerDown={onPointerDown}
      min={min}
      max={max}
      orientation={orientation}
      dir={dir}
      inverted={inverted}
      disabled={disabled}
      {...rootProps}
    >
      <RadixSlider.Track className="fp-sliderTrack">
        {range && (
          <Range
            dir={dir}
            value={trackedValue}
            min={min}
            max={max}
            orientation={orientation}
            inverted={inverted}
            rangeAnchor={rangeAnchor}
            disabled={disabled}
          />
        )}
      </RadixSlider.Track>
      {(value ?? defaultValue).map((v, i) => (
        <RadixSlider.Thumb key={i} className={cx('fp-sliderThumb', { 'fp-sliderThumb-focusVisible': focusVisible })} />
      ))}
    </RadixSlider.Root>
  );
});

type RangeProps = {
  min: number;
  max: number;
  value: number[];
  orientation: 'horizontal' | 'vertical';
  dir: 'ltr' | 'rtl';
  inverted?: boolean;
  rangeAnchor?: number;
  disabled?: boolean;
};

const Range = (props: RangeProps) => {
  const { min, max, value, rangeAnchor = min, orientation, dir, inverted, disabled } = props;
  const rangeStart = value.length > 1 ? Math.min(...value) : Math.min(rangeAnchor, ...value);
  const rangeEnd = value.length > 1 ? Math.max(...value) : Math.max(rangeAnchor, ...value);
  const offsetStart = normalize([min, max], [0, 100])(rangeStart);
  const offsetEnd = 100 - normalize([min, max], [0, 100])(rangeEnd);
  const edges = getOrientationEdges(orientation, dir, inverted);

  return (
    <div
      className="fp-sliderRange"
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      style={{
        [edges.startEdge]: offsetStart + '%',
        [edges.endEdge]: offsetEnd + '%',
      }}
    />
  );
};

function getOrientationEdges(
  orientation: 'horizontal' | 'vertical',
  dir: 'ltr' | 'rtl',
  inverted: boolean | undefined
) {
  const inversion = inverted ? 'inverted' : 'normal';
  const edges = {
    vertical: {
      normal: {
        startEdge: 'bottom',
        endEdge: 'top',
      },
      inverted: {
        startEdge: 'top',
        endEdge: 'bottom',
      },
    },
    horizontal: {
      normal: {
        startEdge: dir === 'ltr' ? 'left' : 'right',
        endEdge: dir === 'ltr' ? 'right' : 'left',
      },
      inverted: {
        startEdge: dir === 'ltr' ? 'right' : 'left',
        endEdge: dir === 'ltr' ? 'left' : 'right',
      },
    },
  };

  return edges[orientation][inversion];
}

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
