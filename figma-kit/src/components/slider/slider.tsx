import React, { useEffect, useRef, useState } from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { cx } from 'class-variance-authority';
import { isDeepEqual } from 'remeda';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { normalize } from '@lib/number/normalize';

const SNAP_PERCENTAGE_THRESHOLD = 2;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_ORIENTATION = 'horizontal';
const DEFAULT_DIRECTION = 'ltr';

type SliderElement = React.ElementRef<typeof RadixSlider.Root>;

type SliderOwnProps = {
  range?: boolean;
  rangeAnchor?: number;
  baseValue?: number;
  hints?: number[];
};
type SliderProps = Omit<RadixSlider.SliderProps, 'asChild' | 'children'> & SliderOwnProps;

const Slider = React.forwardRef<SliderElement, SliderProps>((props, forwardedRef) => {
  const {
    className,
    min = DEFAULT_MIN,
    max = DEFAULT_MAX,
    defaultValue = [min],
    value,
    onValueChange,
    orientation = DEFAULT_ORIENTATION,
    dir = DEFAULT_DIRECTION,
    inverted,
    disabled,
    range = true,
    rangeAnchor,
    baseValue,
    hints,
    ...rootProps
  } = props;
  const rootRef = useRef<SliderElement>(null);
  const ref = useComposedRefs(rootRef, forwardedRef);
  const { onPointerDown, focusVisible } = useSliderVisibleFocus(rootRef);
  const [trackedValue, setTrackedValue] = useState(value ?? defaultValue);
  const prevValueRef = useRef(value);
  const prevDefaultValueRef = useRef(defaultValue);

  // Internally tracking a value even in uncontrolled mode.
  // This is required for range and hints to work.
  useEffect(() => {
    if (isDeepEqual(value, prevValueRef.current) && isDeepEqual(defaultValue, prevDefaultValueRef.current)) {
      return;
    }

    setTrackedValue(value ?? defaultValue);
  }, [value, defaultValue]);

  // Radix adjusts the thumb position by default to align with the track edges at min/max positions.
  // This behavior is removed via a patch (see: patches/@radix-ui__react-slider@1.2.0.patch) and replaced it with a CSS solution.
  // Additionally, we override the transform of the thumb to ensure it aligns with hints.
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty(
        '--radix-slider-thumb-transform',
        getThumbTransform(orientation, dir, inverted)
      );
    }
  }, [rootRef, orientation, dir, inverted]);

  const handleValueChange = (value: number[]) => {
    const snappedValue = value.map((value) => getSnappedValue(value, hints, min, max));

    onValueChange?.(snappedValue);
    setTrackedValue(snappedValue);
  };

  return (
    <RadixSlider.Root
      tabIndex={-1}
      ref={ref}
      className={cx(className, 'fp-SliderRoot')}
      value={trackedValue}
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
      <RadixSlider.Track className="fp-SliderTrack" />

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

      {hints &&
        hints.map((hint) => (
          <Hint
            key={hint}
            hint={hint}
            baseValue={baseValue}
            min={min}
            max={max}
            orientation={orientation}
            dir={dir}
            inverted={inverted}
          />
        ))}

      {trackedValue.map((v, i) => (
        <RadixSlider.Thumb
          key={i}
          className={cx('fp-SliderThumb', {
            'fp-SliderThumb-focusVisible': focusVisible,
            'fp-SliderThumb-modified': v !== baseValue,
          })}
        />
      ))}
    </RadixSlider.Root>
  );
});

Slider.displayName = 'Slider';

type HintProps = {
  hint: number;
  baseValue?: number;
  min: number;
  max: number;
  orientation: 'horizontal' | 'vertical';
  dir: 'ltr' | 'rtl';
  inverted?: boolean;
};

const Hint = (props: HintProps) => {
  const { baseValue, dir, inverted, max, min, orientation, hint } = props;
  const { startEdge } = getOrientationEdges(orientation, dir, inverted);
  const offset = normalize([min, max], [0, 100])(hint);
  const HINT_WIDTH = 4;

  return (
    <>
      <span
        className={cx('fp-SliderHint', { 'fp-SliderHint-baseValue': hint === baseValue })}
        data-orientation={orientation}
        style={{ [startEdge]: `calc(${offset}% - ${HINT_WIDTH / 2}px)` }}
      />
    </>
  );
};

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
    <span
      className="fp-SliderRange"
      data-orientation={orientation}
      data-disabled={disabled ? '' : undefined}
      style={{
        [edges.startEdge]: `${offsetStart}%`,
        [edges.endEdge]: `${offsetEnd}%`,
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

function getThumbTransform(orientation: 'horizontal' | 'vertical', dir: 'ltr' | 'rtl', inverted: boolean | undefined) {
  const inversion = inverted ? 'inverted' : 'normal';
  const transform = {
    vertical: {
      normal: 'translateY(50%)',
      inverted: 'translateY(-50%)',
    },
    horizontal: {
      normal: dir === 'ltr' ? 'translateX(-50%)' : 'translateX(50%)',
      inverted: dir === 'ltr' ? 'translateX(50%)' : 'translateX(-50%)',
    },
  };
  return transform[orientation][inversion];
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

function getSnappedValue(value: number, hints: number[] | undefined, min: number, max: number) {
  // TODO: snappingFactor is eyeballed to work well for most sizes, but is counterintutive.
  //       It should ideally be calculated from the width of the track, with pixel threshold of ~10.
  const snappingFactor = normalize([0, 100], [0, max - min])(SNAP_PERCENTAGE_THRESHOLD);
  const closestHint = hints?.find((hint) => Math.abs(hint - value) <= snappingFactor);
  if (typeof closestHint === 'number') {
    return closestHint;
  }

  return value;
}

export type { SliderProps };
export { Slider };
